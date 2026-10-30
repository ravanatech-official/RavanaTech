// One submission at a time; only a confirmed remote write is a success.
const boundForms = new WeakMap();

function showFeedback(feedback, type, message, inquiry, documentRef) {
    feedback.className = `form__status-msg ${type}`;
    feedback.textContent = message;
    if (!inquiry) return;

    const link = documentRef.createElement('a');
    const text = `Hello Ravana Tech! I would like to discuss a project.\n\nName: ${inquiry.name}\nEmail: ${inquiry.email}\nService: ${inquiry.system}\n\n${inquiry.message}`;
    link.href = `https://wa.me/94788470610?text=${encodeURIComponent(text)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'form__contact-link';
    link.textContent = 'Contact us on WhatsApp';
    feedback.appendChild(link);
}

export function bindContactForm(form, feedback, {
    saveInquiry = (inquiry) => {
        if (typeof globalThis.saveInquiryToFirestore !== 'function') {
            throw new Error('Inquiry service is unavailable.');
        }
        return globalThis.saveInquiryToFirestore(inquiry);
    },
    isOnline = () => globalThis.navigator?.onLine !== false,
    pendingNoticeMs = 10000,
} = {}) {
    if (!form || !feedback) return null;
    if (boundForms.has(form)) return boundForms.get(form);

    const documentRef = form.ownerDocument;
    const fields = ['sender-name', 'sender-email', 'sender-system', 'sender-message']
        .map((id) => form.querySelector(`#${id}`));
    const button = form.querySelector('button[type="submit"]');
    if (fields.some((field) => !field) || !button) return null;
    const originalButtonHtml = button.innerHTML;
    let submitting = false;

    const submit = async (event) => {
        event.preventDefault();
        if (submitting) return;

        const [name, email, system, message] = fields.map((field) => field.value.trim());
        const inquiry = { name, email, system, message };
        if (!name || !email || !message || !form.checkValidity()) {
            showFeedback(feedback, 'error', 'Please complete the required fields with a valid email address.', null, documentRef);
            form.reportValidity();
            return;
        }
        if (!isOnline()) {
            showFeedback(feedback, 'error', 'You appear to be offline. Your message is still here. Reconnect and try again, or contact us on WhatsApp.', inquiry, documentRef);
            return;
        }

        submitting = true;
        const disabledStates = [...fields, button].map((control) => control.disabled);
        for (const control of [...fields, button]) control.disabled = true;
        form.setAttribute('aria-busy', 'true');
        button.textContent = 'Sending inquiry…';
        showFeedback(feedback, 'pending', 'Sending your inquiry. Waiting for confirmation…', null, documentRef);

        // A Firestore write can remain pending while offline. A slow write is
        // not a confirmed failure: retain the same request and prevent retries
        // from creating duplicate inquiries until it settles.
        const slowNotice = setTimeout(() => {
            showFeedback(feedback, 'pending', 'We are still waiting for confirmation. Your message is kept here; please keep this page open or contact us on WhatsApp.', inquiry, documentRef);
        }, pendingNoticeMs);

        try {
            const result = await saveInquiry(inquiry);
            if (result?.success !== true || typeof result.id !== 'string' || !result.id.trim()) {
                throw new Error('Inquiry was not acknowledged.');
            }
            const text = `Thank you, ${name}! Your inquiry for ${system} has been received. Reference: ${result.id}. We will get back to you.`;
            showFeedback(feedback, 'success', text, inquiry, documentRef);
            form.reset();
        } catch {
            showFeedback(feedback, 'error', 'We could not confirm delivery. Your message is still here. Please try again or contact us on WhatsApp.', inquiry, documentRef);
        } finally {
            clearTimeout(slowNotice);
            [...fields, button].forEach((control, index) => { control.disabled = disabledStates[index]; });
            button.innerHTML = originalButtonHtml;
            form.setAttribute('aria-busy', 'false');
            submitting = false;
        }
    };

    form.addEventListener('submit', submit);
    boundForms.set(form, submit);
    return submit;
}

if (typeof document !== 'undefined') {
    bindContactForm(document.getElementById('contact-form'), document.getElementById('form-feedback'));
}
