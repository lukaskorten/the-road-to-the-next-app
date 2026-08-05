import { Separator } from './ui/separator';

type HeadingProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

function Heading({ title, description, actions }: HeadingProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-x-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          {description && <p className="text-sm ">{description}</p>}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <Separator />
    </>
  );
}

export { Heading };
