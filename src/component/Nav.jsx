import React from "react";
import boxmateLogo from "../image/boxmateLogo1.jpg";

function Nav() {
  return (
    <nav className="bg-[#1B00BF] w-[100%] h-auto   ">
      <div
        className="container mx-auto max-w-[1320px] h-auto p-10 flex flex-col
                      md:flex-row md:justify-between flex items-center md:h-[80px] md:items-center"
      >
        <div>
          <img className="size-50 h-[400%]" src={boxmateLogo} />
        </div>
        <div className=" items-center text-[#e2ffab] font-medium text-xl flex w-full flex-col mx-2  md:my-1 md:flex-1 md:h-[80px] md:flex-row md:items-center">
          <ul className="flex flex-col md:justify-items-start md:flex-row items-center">
            <li className="my-2 md:my-4 md:mx-3">
              <a href="#">Service</a>
            </li>
            <li className="my-2 md:my-4 md:mx-3">
              <a href="#">Package</a>
            </li>
            <li className="my-2 md:my-4 md:mx-3">
              <a href="#">About</a>
            </li>
          </ul>

          <ul className="flex md:ml-auto ">
            <li className="flex my-2 md:mx-4 items-center">
              <a href="#">Sign up</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
