import { ZXCVBNResult } from 'zxcvbn';

type PasswordStrengthProps = {
  strength: ZXCVBNResult;
};

const strengthLabels = ['Very Weak', 'Weak', 'Okay', 'Good', 'Strong'];
const strengthColors = [
  'text-red-500',
  'text-orange-500',
  'text-yellow-500',
  'text-green-500',
  'text-green-500',
];

export function PasswordStrength({ strength }: PasswordStrengthProps) {
  const { score } = strength;
  const { warning, suggestions } = strength.feedback;
  return (
    <div className="text-sm text-muted-foreground mb-2">
      <p className="mb-2">
        <span>Password Strength:</span>{' '}
        <span className={`${strengthColors[score]} font-semibold`}>
          {strengthLabels[score]}
        </span>
      </p>
      {warning && <p className="mb-2">{warning}.</p>}
      {suggestions.length > 0 && (
        <ul className="list-disc list-inside">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
