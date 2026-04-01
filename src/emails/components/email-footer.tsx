import { Link, Section, Text } from '@react-email/components';

export function EmailFooter() {
  return (
    <Section className="border-t border-solid border-gray-200 pt-6">
      <Text className="text-[12px] text-gray-500 text-center m-0 mb-2">
        This email was sent from a notification-only address that cannot accept
        incoming email.
      </Text>
      <Text className="text-[12px] text-gray-500 text-center m-0 mb-2">
        © 2026 TicketBounty. All rights reserved.
      </Text>
      <Text className="text-[12px] text-gray-500 text-center m-0 mb-2">
        123 Business Street, Bad Aibling, DE 83043
      </Text>
      <Text className="text-[12px] text-gray-500 text-center m-0">
        <Link href="#" className="text-gray-500 underline">
          Unsubscribe
        </Link>{' '}
        |
        <Link href="#" className="text-gray-500 underline ml-1">
          Privacy Policy
        </Link>{' '}
        |
        <Link href="#" className="text-gray-500 underline ml-1">
          Contact Support
        </Link>
      </Text>
    </Section>
  );
}
