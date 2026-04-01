import { Body, Head, Html, Preview, Tailwind } from '@react-email/components';
import { Container } from 'lucide-react';
import { EmailFooter } from './email-footer';

type EmailContainerProps = {
  previewText: string;
  children?: React.ReactNode;
};

function EmailContainer({ previewText, children }: EmailContainerProps) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>{previewText}</Preview>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-xl p-8 max-w-150 mx-auto">
            {children}
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

EmailContainer.defaultProps = {
  previewText: 'Default preview text - replace with actual content',
};

export default EmailContainer;
