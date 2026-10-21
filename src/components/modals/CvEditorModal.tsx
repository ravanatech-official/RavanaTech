import React, { useState, useEffect } from 'react';
import type { UserCvProfile } from '../../types.ts';

interface CvEditorModalProps {
  isOpen: boolean;
  userProfile: UserCvProfile;
  onSave: (updatedProfile: UserCvProfile) => void;
  onReset: () => void;
  onClose: () => void;
}

export const CvEditorModal: React.FC<CvEditorModalProps> = ({
  isOpen,
  userProfile,
  onSave,
  onReset,
  onClose,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [title, setTitle] = useState(userProfile.title);
  const [phone, setPhone] = useState(userProfile.phone);
  const [email, setEmail] = useState(userProfile.email);
  const [location, setLocation] = useState(userProfile.location);
  const [profile, setProfile] = useState(userProfile.profile);
  const [experienceText, setExperienceText] = useState('');
  const [educationText, setEducationText] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [rawCv, setRawCv] = useState(userProfile.rawCv || '');

  useEffect(() => {
    setName(userProfile.name);
    setTitle(userProfile.title);
    setPhone(userProfile.phone);
    setEmail(userProfile.email);
    setLocation(userProfile.location);
    setProfile(userProfile.profile);
    setRawCv(userProfile.rawCv || '');

    if (Array.isArray(userProfile.experience)) {
      setExperienceText(
        userProfile.experience
          .map(
            (e) =>
              `${e.role} | ${e.company} (${e.dates}):\n${(e.bullets || []).map((b) => '- ' + b).join('\n')}`
          )
          .join('\n\n')
      );
    } else {
      setExperienceText(userProfile.experience || '');
    }

    if (Array.isArray(userProfile.education)) {
      setEducationText(userProfile.education.join('\n'));
    } else {
      setEducationText(userProfile.education || '');
    }

    if (Array.isArray(userProfile.skills)) {
      setSkillsText(userProfile.skills.join('\n'));
    } else {
      setSkillsText(userProfile.skills || '');
    }
  }, [userProfile, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserCvProfile = {
      ...userProfile,
      name: name.trim(),
      title: title.trim(),
      phone: phone.trim(),
      email: email.trim(),
      location: location.trim(),
      profile: profile.trim(),
      experience: experienceText.trim(),
      education: educationText.split('\n').map((s) => s.trim()).filter(Boolean),
      skills: skillsText.split('\n').map((s) => s.trim()).filter(Boolean),
      rawCv: rawCv.trim(),
    };
    onSave(updated);
  };

  return (
    <div
      className={`cv-editor-modal ${isOpen ? 'active' : ''}`}
      id="cv-real-editor-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Real CV Editor Modal"
    >
      <div className="cv-editor-backdrop" id="cv-editor-backdrop" onClick={onClose} />

      <div className="cv-editor-dialog">
        <div className="cv-editor-header">
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>CUSTOMIZE REAL CV &amp; CANDIDATE PROFILE</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--rt-cyan)', fontFamily: 'var(--font-mono)' }}>
              UPDATES REFLECTED INSTANTLY ACROSS ALL TEMPLATES &amp; CLIPBOARD EXPORTS
            </span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            id="btn-close-cv-editor"
            onClick={onClose}
            aria-label="Close CV Editor"
          >
            <i className="bx bx-x" />
          </button>
        </div>

        <form onSubmit={handleSubmit} id="real-cv-form" className="cv-editor-form">
          <div className="cv-form-row">
            <div className="form__group">
              <label htmlFor="cv-input-name">FULL NAME</label>
              <input
                type="text"
                id="cv-input-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form__group">
              <label htmlFor="cv-input-title">PROFESSIONAL TITLE</label>
              <input
                type="text"
                id="cv-input-title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="cv-form-row">
            <div className="form__group">
              <label htmlFor="cv-input-phone">PHONE / WHATSAPP</label>
              <input
                type="text"
                id="cv-input-phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form__group">
              <label htmlFor="cv-input-email">EMAIL ADDRESS</label>
              <input
                type="email"
                id="cv-input-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form__group">
              <label htmlFor="cv-input-location">LOCATION / RELOCATION</label>
              <input
                type="text"
                id="cv-input-location"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="form__group">
            <label htmlFor="cv-input-profile">EXECUTIVE SUMMARY / PROFILE</label>
            <textarea
              id="cv-input-profile"
              rows={3}
              required
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label htmlFor="cv-input-skills">CORE SKILLS (ONE PER LINE)</label>
            <textarea
              id="cv-input-skills"
              rows={3}
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label htmlFor="cv-input-experience">EXPERIENCE DETAILS</label>
            <textarea
              id="cv-input-experience"
              rows={4}
              value={experienceText}
              onChange={(e) => setExperienceText(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label htmlFor="cv-input-education">EDUCATION &amp; CERTIFICATIONS (ONE PER LINE)</label>
            <textarea
              id="cv-input-education"
              rows={2}
              value={educationText}
              onChange={(e) => setEducationText(e.target.value)}
            />
          </div>

          <div className="form__group">
            <label htmlFor="cv-input-raw">OR PASTE CUSTOM RAW CV TEXT</label>
            <textarea
              id="cv-input-raw"
              rows={3}
              placeholder="Optional: Paste complete text from your existing CV document..."
              value={rawCv}
              onChange={(e) => setRawCv(e.target.value)}
            />
          </div>

          <div className="cv-editor-actions">
            <button type="submit" className="button">
              <i className="bx bx-check-circle" /> SAVE PROFILE
            </button>
            <button
              type="button"
              className="button button-outline"
              id="btn-reset-real-cv"
              onClick={onReset}
            >
              <i className="bx bx-reset" /> RESET TO DEFAULT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
