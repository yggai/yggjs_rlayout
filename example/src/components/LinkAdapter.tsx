import { Link } from 'react-router-dom';

interface LinkAdapterProps {
  to: string;
  className?: string;
  children?: React.ReactNode;
}

export const LinkAdapter: React.FC<LinkAdapterProps> = ({
  to,
  className,
  children,
}) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};