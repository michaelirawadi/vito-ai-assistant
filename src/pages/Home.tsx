import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type Menu = {
  label: string;
  link: string;
};

const menuItems: Menu[] = [
  { label: "Feature 1", link: "/Feature1_1" },
  { label: "Feature 2", link: "/Feature2_1" },
  { label: "Feature 3", link: "/Feature3_1" },
  { label: "Feature 4", link: "/Feature4_1" },
];

const Home = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="home-menu-list">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            className="bg-blue-500 px-10 py-3 rounded-lg text-white hover:bg-blue-400"
            to={item.link}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
