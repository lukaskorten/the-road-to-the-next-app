import { Route } from 'next';
import Link from 'next/link';
import { Fragment } from 'react/jsx-runtime';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

type Item = {
  title: string;
  href?: Route;
};

type BreadcrumbsProps = {
  items: Item[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb className="pb-4">
      <BreadcrumbList>
        {items.map((item, index) => {
          let breadcrumbItem = <BreadcrumbPage>{item.title}</BreadcrumbPage>;

          if (item.href) {
            breadcrumbItem = (
              <BreadcrumbLink asChild>
                <Link href={item.href}>{item.title}</Link>
              </BreadcrumbLink>
            );
          }

          const isLast = index === items.length - 1;
          return (
            <Fragment key={item.title}>
              <BreadcrumbItem>{breadcrumbItem}</BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
