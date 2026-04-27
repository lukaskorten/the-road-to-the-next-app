import {
  Body,
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

type AdminReportEmailProps = {
  from: Date;
  to: Date;
  registeredUsersCount: number;
  createdTicketsCount: number;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export default function AdminReportEmail({
  from,
  to,
  registeredUsersCount,
  createdTicketsCount,
}: AdminReportEmailProps) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>TicketBounty admin report</Preview>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-xl p-8 max-w-150 mx-auto">
            <EmailHeader
              title="Admin Report"
              introText={`${formatDate(from)} - ${formatDate(to)}`}
            />

            <Section className="mb-8">
              <Text className="text-[16px] text-gray-700 m-0 mb-2">
                Registered users: {registeredUsersCount}
              </Text>
              <Text className="text-[16px] text-gray-700 m-0 mb-2">
                Created tickets: {createdTicketsCount}
              </Text>
            </Section>

            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

AdminReportEmail.PreviewProps = {
  from: new Date('2026-04-26T08:00:00.000Z'),
  to: new Date('2026-04-27T08:00:00.000Z'),
  registeredUsersCount: 12,
  createdTicketsCount: 34,
};
