import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

type CardComponentProps = {
  title: string;
  description: string;
  content: React.ReactElement;
  footer?: React.ReactElement;
  className?: string;
};

export function CardCompact({
  title,
  description,
  content,
  footer,
  className,
}: CardComponentProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
