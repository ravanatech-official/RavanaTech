import React from 'react';

export interface ToastMessage {
  id: string;
  message: string;
  icon?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
}

export const Toast: React.FC<ToastProps> = ({ toasts }) => {
  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '4.5rem',
        right: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        zIndex: 999999,
        pointerEvents: 'none'
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="lab-toast"
          style={{
            background: 'rgba(2, 18, 30, 0.95)',
            border: '1px solid var(--rt-cyan-bright)',
            color: 'var(--rt-text)',
            padding: '0.65rem 1.2rem',
            borderRadius: '4px',
            boxShadow: '0 0 20px rgba(24, 200, 255, 0.4)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            animation: 'fadeInToast 0.25s ease'
          }}
        >
          <i className={`bx ${t.icon || 'bx-check-circle'}`} style={{ color: 'var(--rt-cyan-bright)', fontSize: '1.2rem' }}></i>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
};
