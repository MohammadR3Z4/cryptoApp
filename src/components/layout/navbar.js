import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { faMenuItems } from "@/src/data/data";

function Navbar() {
  // Home ,
  const [currentPage, setCurrentPage] = useState();

  const handleClick = (item) => {
    setCurrentPage(item);
  };

  const logo = require("@/src/assets/images/logo.png");

  return (
    <div className="container flex flex-col mx-auto bg-white">
      <div
        className="group/sidebar flex md:flex-col flex-row shrink-0 lg:w-[300px] md:w-[250px] md:h-auto h-20
         transition-all duration-300 ease-in-out m-0 fixed z-40 md:inset-y-0 md:left-0 top-0 inset-x-0 bg-dark border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start"
        id="sidenav-main"
      >
        <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

        <div className="flex items-center justify-between md:px-8 px-3 md:py-5 py-2">
          <div className="flex items-center md:mr-5 mr-2">
            <div className="mr-0">
              <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                <Image
                  className="w-[80px] h-[80px] hidden shrink-0 md:inline-block rounded-[.95rem]"
                  src={logo}
                  alt="avatar image"
                />
              </div>
            </div>
            <div className="mr-0">
              <Link
                href="/"
                className="dark:hover:text-primary text-2xl hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-400/90 text-secondary-inverse"
              >
                CryptoApp
              </Link>
            </div>
          </div>
          <Link
            className="inline-flex relative items-center group justify-end text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-transparent shadow-none border-0"
            href="#"
          ></Link>
        </div>

        <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

        <div className="relative flex justify-center items-center md:pl-3 md:my-5 my-2 w-full md:me-0 me-4">
          <div className="flex md:flex-col flex-row justify-between md:gap-0 w-full font-medium">
            {faMenuItems.map((item, index) => (
              <div className="flex justify-between" key={index}>
                <span
                onClick={() => handleClick(item.label)}
                  className={`${
                    currentPage === item.label ? "bg-blue-900" : ""
                  } select-none flex items-center gap-3 text-white md:px-4 md:py-[.775rem] cursor-pointer 
                  md:my-[.4rem] rounded-[.95rem]`}
                >
                  <span className="md:flex hidden">{item.icon}</span>
                  <Link
                    href={item.path}
                    className="flex items-center flex-grow text-[1.15rem] "
                  >
                    {item.label}
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
