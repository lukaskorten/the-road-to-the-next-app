import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { EmailFooter } from '../components/email-footer';

type VerificationCodeEmailProps = {
  toName: string;
  code: string;
};

function VerificationCodeEmail({ toName, code }: VerificationCodeEmailProps) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-xl p-8 max-w-150 mx-auto">
            <Section className="mb-8">
              <Text className="text-[16px] text-gray-700 m-0 mb-2">
                Hello {toName || ''}, please use the following code to verify
                your email address:
              </Text>

              <Section className="text-center mb-6">
                <Text className="bg-black text-white px-8 py-3 text-[16px] font-semibold box-border">
                  {code}
                </Text>
              </Section>
            </Section>
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

VerificationCodeEmail.PreviewProps = {
  toName: 'Lukas Korten',
  code: '123456',
};

export default VerificationCodeEmail;
