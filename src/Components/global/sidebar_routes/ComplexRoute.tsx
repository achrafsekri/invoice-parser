import React from "react";
import { Route } from "../../../shared/routes";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";

type Props = {
  route: Route;
};

const ComplexRoute = ({ route }: Props) => {
  const subroute: Route[] = route.subMenu;
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <li className="hs-accordion " id="users-accordion">
      <a
        className="hs-accordion-toggle flex items-center gap-x-3.5 rounded-md py-2 px-2.5 text-sm text-slate-700 hover:bg-gray-100 hs-accordion-active:font-semibold    "
        href="javascript:;"
      >
        <span className="material-symbols-rounded ">{route.icon}</span>

        {route.lable}
        <svg
          className="ml-auto hidden h-3 w-3 text-gray-600 group-hover:text-gray-500 hs-accordion-active:block "
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          ></path>
        </svg>
        <svg
          className="ml-auto block h-3 w-3 text-gray-600 group-hover:text-gray-500 hs-accordion-active:hidden "
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          ></path>
        </svg>
      </a>

      <div
        id="users-accordion-child"
        className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
      >
        <ul
          className="hs-accordion-group pl-3 pt-2"
          data-hs-accordion-always-open
        >
          {subroute.map((subroute, index) => (
            <li className="hs-accordion" key={index}>
              <Link
                className={clsx(
                  " flex items-center gap-x-3.5 rounded-md py-2 px-2.5 text-sm  hover:bg-gray-100    ",
                  subroute.href === currentRoute
                    ? "bg-gray-100 text-blue-700"
                    : "text-slate-700 hover:bg-gray-100"
                )}
                href={subroute.href}
              >
                {/* <span className="material-symbols-rounded">
                  {subroute.icon}
                </span> */}
                {subroute.lable}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default ComplexRoute;
