import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { userOrganization } from "@prisma/client";

import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";
import { Divider } from "@tremor/react";
import { Button } from "primereact/button";
import { useToast } from "../../../Context/ToastContext";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const SearchModal = ({ isOpen, setIsOpen }: Props) => {
  const showToast = useToast();

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-9999" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed  inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Search
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Search for a user or organization
                  </p>
                </div>
                <div className="mt-4">
                  <div className="relative hidden w-full  sm:block">
                    <label htmlFor="icon" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full rounded-lg focus:border-blue-500 focus:bg-gray-100 focus:ring-blue-500 active:border-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex w-full items-center pl-4">
                        <svg
                          className="h-4 w-4 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="icon"
                        name="icon"
                        className="block w-full  rounded-md border-gray-200 py-2 px-4 pl-11 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:bg-gray-100 focus:ring-blue-500   "
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <div className="mt-4  h-96 w-full">
                    <span className="text-sm text-gray-500">
                      Search results
                    </span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SearchModal;
