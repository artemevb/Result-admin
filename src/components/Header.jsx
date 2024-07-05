import React from 'react';
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Header = () => {
  function toTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <div className='px-[100px]'>
        <header className="flex justify-between items-center  bg-white">
          <div className="flex items-center">
            <img
              className="w-[5.45rem] h-[3.125rem] xs:w-[7.5rem] xs:h-[4rem] lg:h-[94px] lg:w-[169px]"
              src={Logo}
              alt="Логотип"
            />
          </div>
          <Link
            onClick={() => toTop()}
            to={`/Main`}
            className="bg-button-color text-white py-2 px-4 rounded-full hover:bg-purple-600">
            главная страница ред.
          </Link>
          <div className="flex items-center">
            <button className="border border-uslugi-text text-uslugi-text py-2 px-4 rounded-full hover:bg-purple-600 hover:text-white">
              Русский
            </button>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
