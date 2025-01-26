import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordRule {
  id: number;
  rule: string;
  test: () => boolean;
}

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const passwordRules: PasswordRule[] = [
    { id: 1, rule: 'Au moins 8 caractères', test: () => password.length >= 8 },
    { id: 2, rule: 'Au moins une majuscule', test: () => /[A-Z]/.test(password) },
    { id: 3, rule: 'Au moins une minuscule', test: () => /[a-z]/.test(password) },
    { id: 4, rule: 'Au moins un chiffre', test: () => /[0-9]/.test(password) },
    { id: 5, rule: 'Au moins un caractère spécial', test: () => /[!@#$%^&*]/.test(password) }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-md">
      <h4 className="text-sm font-medium text-gray-800 mb-3">
        Règles du mot de passe
      </h4>
      <ul className="space-y-2">
        {passwordRules.map(({ id, rule, test }) => (
          <li key={id} className="flex items-center text-sm">
            {test() ? (
              <Check className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <X className="h-4 w-4 text-red-500 mr-2" />
            )}
            <span className={test() ? 'text-green-700' : 'text-gray-700'}>
              {rule}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}