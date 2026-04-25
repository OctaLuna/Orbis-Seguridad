import React from 'react';

const RULES = [
  { label: 'Mínimo 8 caracteres',                  test: (p) => p.length >= 8 },
  { label: 'Al menos una letra mayúscula',           test: (p) => /[A-Z]/.test(p) },
  { label: 'Al menos una letra minúscula',           test: (p) => /[a-z]/.test(p) },
  { label: 'Al menos un número',                    test: (p) => /[0-9]/.test(p) },
  { label: 'Al menos un carácter especial (!@#$%…)', test: (p) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p) },
];

const STRENGTH_LABEL = ['', 'Muy débil', 'Débil', 'Regular', 'Buena', 'Fuerte'];
const STRENGTH_COLOR = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];

const PasswordChecklist = ({ password }) => {
  if (!password) return null;

  const results = RULES.map((rule) => ({ label: rule.label, ok: rule.test(password) }));
  const score = results.filter((r) => r.ok).length;

  return (
    <div className="mt-2 space-y-1 text-left">
      {results.map((r, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="text-sm font-bold w-4 text-center transition-colors duration-200"
            style={{ color: r.ok ? '#22c55e' : '#9ca3af' }}
          >
            {r.ok ? '✓' : '○'}
          </span>
          <span
            className="text-sm font-miles transition-colors duration-200"
            style={{ color: r.ok ? '#22c55e' : '#9ca3af' }}
          >
            {r.label}
          </span>
        </div>
      ))}

      {score > 0 && (
        <div className="mt-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="h-1.5 flex-1 rounded-full transition-all duration-300"
                style={{ backgroundColor: n <= score ? STRENGTH_COLOR[score] : '#e5e7eb' }}
              />
            ))}
          </div>
          <p
            className="text-xs mt-1 font-miles font-semibold transition-colors duration-300"
            style={{ color: STRENGTH_COLOR[score] }}
          >
            Fortaleza: {STRENGTH_LABEL[score]}
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordChecklist;
