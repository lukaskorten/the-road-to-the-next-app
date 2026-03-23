import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

type EmailPasswordResetProps = {
  toName: string;
  url: string;
};

export default function EmailPasswordReset({
  toName,
  url,
}: EmailPasswordResetProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans m-8 text-center">
          <Container>
            <Section>
              <Text>
                Hello {toName}, you have requested to reset your password.
                Please click the button below to reset it:
              </Text>
            </Section>
            <Section>
              <Button
                href={url}
                className="bg-black py-2 px-4 rounded text-white"
              >
                Reset Password
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

EmailPasswordReset.PreviewProps = {
  toName: 'Lukas Korten',
  url: 'https://example.com/reset-password',
};
