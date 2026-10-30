interface Inquiry {
  name: string;
  email: string;
  service: string;
  message: string;
}

// Used by the Express-backed React client, not the static Hosting form.
export async function postInquiry(inquiry: Inquiry, fetchImpl: typeof fetch = fetch): Promise<string> {
  const response = await fetchImpl('/api/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...inquiry, source: 'react_website_contact_form' }),
  });
  const result = await response.json();
  if (!response.ok || result?.success !== true || typeof result.leadId !== 'string' || !result.leadId.trim()) {
    throw new Error('Inquiry was not acknowledged by the server.');
  }
  return result.leadId;
}
