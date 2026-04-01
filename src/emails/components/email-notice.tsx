import { Section, Text } from '@react-email/components';
type EmailNoticeProps = {
  title: string;
  message: string;
};

export function EmailNotice({ title, message }: EmailNoticeProps) {
  return (
    <Section className="bg-gray-50 p-4 rounded-[6px] border-l-4 border-solid border-orange-400">
      <Text className="text-[14px] text-gray-700 m-0 mb-2 font-semibold">
        {title}
      </Text>
      <Text className="text-[14px] text-gray-600 m-0">{message}</Text>
    </Section>
  );
}
