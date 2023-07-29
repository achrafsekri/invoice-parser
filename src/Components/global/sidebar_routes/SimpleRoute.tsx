import React from "react";
import { Route } from "../../../shared/routes";
import clsx from "clsx";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  route: Route;
};

const SimpleRoute = ({ route }: Props) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <li>
      <Link
        className={clsx(
          "flex items-center gap-x-3.5 rounded-md py-2 px-2.5 text-sm hover:bg-gray-100",
          currentRoute === route.href
            ? "bg-gray-100 text-blue-700"
            : "text-slate-700 hover:bg-gray-100"
        )}
        href={route.href}
      >
        <span className="material-symbols-rounded">{route.icon}</span>
        {route.lable}
      </Link>
    </li>
  );
};

export default SimpleRoute;
