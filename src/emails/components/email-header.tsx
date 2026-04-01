import { Heading, Section, Text } from '@react-email/components';

type EmailHeaderProps = {
  title: string;
  introText?: string;
};

export function EmailHeader({ title, introText }: EmailHeaderProps) {
  return (
    <Section className="text-center mb-8">
      <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-2">
        {title}
      </Heading>
      {introText && (
        <Text className="text-[16px] text-gray-600 m-0">{introText}</Text>
      )}
    </Section>
  );
}
