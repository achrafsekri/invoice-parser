import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className=" select-none font-bold text-gray-900">
      Invoice<span className="text-blue-700">Captin</span>
    </Link>
  );
};

export default Logo;
