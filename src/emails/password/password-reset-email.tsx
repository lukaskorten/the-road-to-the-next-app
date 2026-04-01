import { Button, Link, Section, Text } from '@react-email/components';
import EmailContainer from '../components/email-container';
import { EmailHeader } from '../components/email-header';
import { EmailNotice } from '../components/email-notice';

type PasswordResetEmailProps = {
  toName: string;
  userEmail: string;
  resetUrl: string;
};

function PasswordResetEmail({
  toName,
  userEmail,
  resetUrl,
}: PasswordResetEmailProps) {
  return (
    <EmailContainer previewText="Reset your password - Action required">
      <EmailHeader
        title="Password Reset Request"
        introText="We received a request to reset your password"
      />

      <Section className="mb-8">
        <Text className="text-[16px] text-gray-700 m-0 mb-2">
          Hello {toName || ''},
        </Text>
        <Text className="text-[16px] text-gray-700 m-0 mb-2">
          We received a request to reset the password for your account
          associated with <strong>{userEmail}</strong>.
        </Text>
        <Text className="text-[16px] text-gray-700 m-0 mb-4">
          Click the button below to create a new password. This link will expire
          in 24 hours for security reasons.
        </Text>

        <Section className="text-center mb-6">
          <Button
            href={resetUrl}
            className="bg-blue-600 text-white px-8 py-3 rounded-[6px] text-[16px] font-semibold no-underline box-border"
          >
            Reset Password
          </Button>
        </Section>

        <Text className="text-[14px] text-gray-600 m-0 mb-2">
          If the button doesn&apos;t work, copy and paste this link into your
          browser:
        </Text>
        <Text className="text-[14px] text-blue-600 m-0 mb-6 break-all">
          <Link href={resetUrl} className="text-blue-600 underline">
            {resetUrl}
          </Link>
        </Text>

        <EmailNotice
          title="Security Notice:"
          message="If you didn't request this password reset, please ignore this email or contact our support team if you have concerns about your account security."
        />
      </Section>
    </EmailContainer>
  );
}

PasswordResetEmail.PreviewProps = {
  userEmail: 'mail@lukas-korten.de',
  toName: 'Lukas Korten',
  resetUrl: 'https://example.com/reset-password?token=abc123def456',
};

export default PasswordResetEmail;
