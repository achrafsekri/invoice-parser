"use client";

import { Fragment, useRef } from "react";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { MdLogout, MdPayment, MdPersonPinCircle } from "react-icons/md";
import SearchBar from "./SearchBar";
import Logo from "  /shared/Logo";

const Header = () => {
  const router = useRouter();
  const user = useSession().data?.user as User;
  return (
    <>
      <header className="sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap border-b bg-white py-2.5 text-sm   sm:flex-nowrap sm:justify-start sm:py-4 lg:pl-64">
        <nav
          className="mx-auto flex w-full basis-full items-center px-4 sm:px-6 md:px-8"
          aria-label="Global"
        >
          <div className="mr-5 lg:mr-0 lg:hidden">
            <Logo />
          </div>

          <div className="ml-auto flex w-full items-center justify-end sm:order-3 sm:justify-between sm:gap-x-3">
            <div className="sm:hidden">
              <button
                type="button"
                className="inline-flex h-[2.375rem] w-[2.375rem] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-white align-middle text-xs font-medium text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white  "
              >
                <svg
                  className="h-3.5 w-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>

            <SearchBar />

            <div className="flex flex-row items-center justify-end gap-2">
              <button
                type="button"
                className="inline-flex h-[2.375rem] w-[2.375rem] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-white align-middle text-xs font-medium text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white  "
              >
                <svg
                  className="h-3.5 w-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                </svg>
              </button>
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex h-[2.375rem] w-[2.375rem] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-white align-middle text-xs font-medium text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white  "
                data-hs-offcanvas="#hs-offcanvas-right"
              >
                <svg
                  className="h-3.5 w-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" />
                  <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                </svg>
              </button>

              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                {/* <button
                  id="hs-dropdown-with-header"
                  type="button"
                  className="hs-dropdown-toggle inline-flex h-[2.375rem] w-[2.375rem] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-white align-middle text-xs font-medium text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white  "
                >
                  <Image
                    className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white "
                    src={
                      user.image
                        ? user.image
                        : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80"
                    }
                    width={38}
                    height={38}
                    alt="Image Description"
                  />
                </button> */}

                {/* <div
                  className="hs-dropdown-menu duration hidden min-w-[15rem] rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100  "
                  aria-labelledby="hs-dropdown-with-header"
                >
                  <div className="-m-2 rounded-t-lg bg-gray-100 px-5 py-3 ">
                    <p className="text-sm text-gray-500 ">Signed in as</p>
                    <p className="text-sm font-medium text-gray-800 ">
                      {user.email}
                    </p>
                  </div>
                  <div className="mt-2 py-2 first:pt-0 last:pb-0">
                    <button
                      className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500  "
                      onClick={() => {
                        signOut().catch((err) => console.log(err));
                      }}
                    >
                       <LogoutIcon className="mr-2 h-5 w-5 text-gray-400" /> 
                      Sign out
                    </button>
                    <button
                      className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500  "
                      onClick={() => {
                        console.log("âyeme");
                      }}
                    >
                      <MdPayment className="mr-2 h-5 w-5 text-gray-400" />
                      Payment
                    </button>
                  </div>
                </div> */}
                <button
                  className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500  "
                  onClick={() => {
                    signOut().catch((err) => console.log(err));
                  }}
                >
                  {/* <LogoutIcon className="mr-2 h-5 w-5 text-gray-400" /> */}
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
