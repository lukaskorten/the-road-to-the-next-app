import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { EmailFooter } from '../components/email-footer';
import { EmailHeader } from '../components/email-header';

type WelchomeEmailProps = {
  toName: string;
  loginUrl: string;
};

function WelcomeEmail({ toName, loginUrl }: WelchomeEmailProps) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Welcome to TicketBounty!</Preview>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-xl p-8 max-w-150 mx-auto">
            <EmailHeader title="Welcome" />
            <Section className="mb-8">
              <Text className="text-[16px] text-gray-700 m-0 mb-2">
                Hello {toName || ''}, welcome to TicketBounty!
              </Text>
              <Text className="text-[16px] text-gray-700 m-0 mb-2">
                We’re excited to have you on board. Let us know if you ever have
                questions!
              </Text>

              <Section className="text-center mb-6">
                <Button
                  href={loginUrl}
                  className="bg-blue-600 text-white px-8 py-3 rounded-[6px] text-[16px] font-semibold no-underline box-border"
                >
                  Get Started
                </Button>
              </Section>
            </Section>
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

WelcomeEmail.PreviewProps = {
  toName: 'Lukas Korten',
  loginUrl: 'https://example.com/login',
};

export default WelcomeEmail;
