import React from "react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
};

const ActionButton = ({ children, href, onClick }: Props) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white transition inline-block"
    >
      {children}
    </Link>
  );
};

export default ActionButton;
