import Link from 'next/link';
import { ticketsPath } from './paths';

const HomePage = () => {
  return (
    <div>
      <h2 className="text-lg">Home Page</h2>
      <Link href={ticketsPath()} className="underline text-sm">
        Tickets
      </Link>
    </div>
  );
};

export default HomePage;
