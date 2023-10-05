import React from "react";
import Logo from "../../shared/Logo";
import SimpleRoute from "./sidebar_routes/SimpleRoute";
import ComplexRoute from "./sidebar_routes/ComplexRoute";
import { routes } from "../../shared/routes";

const SideBar = () => {
  return (
    <div className="">
      {/* <!-- Sidebar Toggle --> */}
      <div className="sticky flex flex-row inset-x-0 top-0 z-20 border-y bg-white px-4   sm:px-6 md:px-8 lg:hidden">
        <div className="flex items-center py-4">
          {/* <!-- Navigation Toggle --> */}
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600"
            data-hs-overlay="#application-sidebar"
            aria-controls="application-sidebar"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              className="h-5 w-5"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
          {/* <!-- End Navigation Toggle --> */}

          {/* <!-- Breadcrumb --> */}
          <ol
            className="ml-3 flex min-w-0 items-center whitespace-nowrap"
            aria-label="Breadcrumb"
          >
            <li className="flex items-center text-sm text-gray-800 ">
              Application Layout
              <svg
                className="mx-3 h-2.5 w-2.5 flex-shrink-0 overflow-visible text-gray-400 "
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </li>
            <li
              className="truncate text-sm font-semibold text-gray-800 "
              aria-current="page"
            >
              Dashboard
            </li>
          </ol>
          {/* <!-- End Breadcrumb --> */}
        </div>
      </div>
      {/* <!-- End Sidebar Toggle --> */}

      {/* <!-- Sidebar --> */}
      <div
        id="application-sidebar"
        className="hs-overlay scrollbar-y  fixed bottom-0 left-0 top-0 z-[60] hidden w-64 -translate-x-full transform overflow-y-auto border-r border-gray-200 bg-white pb-10 pt-7 transition-all duration-300 hs-overlay-open:translate-x-0   lg:bottom-0 lg:right-auto lg:block lg:translate-x-0"
      >
        <div className="px-6">
          {/* <!-- Logo --> */}
          <Logo />
        </div>

        <nav
          className="hs-accordion-group flex w-full flex-col flex-wrap p-6"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            {routes.map((route, index) => {
              if (route.type === "complex") {
                return <ComplexRoute key={index} route={route} />;
              } else {
                return <SimpleRoute key={index} route={route} />;
              }
            })}
          </ul>
        </nav>
        <img
          src="https://cdn.discordapp.com/attachments/999628671608438894/1159637920894943312/B_A-logo-removebg-preview.png?ex=6531bff9&is=651f4af9&hm=ad4eeb9d749d25a49010148bc1703a7b25da7645e64c94fedafb4c40996696d2&"
          alt="company"
          className="mx-auto mt-10 w-3/4 mt-64 align-end"
        />
      </div>
      {/* <!-- End Sidebar --> */}
    </div>
  );
};

export default SideBar;
