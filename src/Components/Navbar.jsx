import React from "react";
import { useState, useEffect } from "react";
import marcador from "../img/caategoriasPic/marcador.jpg";
import { useAuth } from "../contextApi/AuthProvider.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contextApi/UserProvider.jsx";

const Navbar = () => {
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  const { user, setUser } = useUser();

  useEffect(() => {
    setAvatar(user.imageUrl);
    setName(user.name);
  }, [user]);

  const [color, setColor] = useState("");

  function hadleClick(e) {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    const newThem = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newThem);

    setColor(currentTheme);
  }

  async function logOut(e) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        setIsAuthenticated(false);
        setUser({});
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="navbar  bg-base-100 justify-center ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Budgetly</a>
      </div>

      <ul className="menu menu-horizontal bg-base-200 rounded-box mr-16">
        <li>
          <a onClick={hadleClick}>
            {color === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            )}
          </a>
        </li>
      </ul>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div className="w-full">
            <span className="mr-4 font-bold text-xl">
              {name ? name : "User"}
            </span>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-full rounded-full ">
              <img
                className=" w-20 h-20"
                alt="Tailwind CSS Navbar component"
                src={
                  (avatar !== null) & (avatar !== undefined) ? avatar : marcador
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/profile"} className="justify-between text-lg">
                Profile
              </Link>
            </li>

            <li>
              <Link className="text-lg" onClick={(e) => logOut(e)}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
