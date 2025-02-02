import { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Icono de burger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden z-10 absolute top-4 left-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
          />
        </svg>
      </button>

      {/* Menú */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-base-200 p-4 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:relative sm:flex sm:flex-col z-20`}
      >
        {/* Botón para cerrar el menú en pantallas pequeñas */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary sm:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <ul className="menu space-y-4 mt-12">
          <li>
            <Link to="/dashboard/" onClick={() => setIsOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25a2.25 2.25 0 0 0 2.25 2.25H11.25V3H3.75zM11.25 20.25V21H18a2.25 2.25 0 0 0 2.25-2.25V12.75H11.25v7.5zM13.5 9.75V3h6.75A2.25 2.25 0 0 1 22.5 5.25V9.75h-9zM3.75 17.25v3.75a2.25 2.25 0 0 0 2.25 2.25H9V17.25H3.75z"
                />
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
        
          </li>
          <li>
            <Link to={"/dashboard/expenses"} onClick={() => setIsOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Lista de Gastos
            </Link>
          </li>
          <li>
            <Link to={"/dashboard/report"}
             onClick={() => setIsOpen(false)}
            >
           
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Historial de gastos
            </Link>
          </li>

          <li>
            <Link to={"/dashboard/transacciones"}
             onClick={() => setIsOpen(false)}
            >
           
           <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  class="w-6 h-6"
>
  <path d="M3 12a9 9 0 1 1 9 9" />
  <path d="M3 12H7M12 7v5l4 2" />
</svg>

              Transacciones
            </Link>
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div
        className={`ml-0 ${isOpen ? "ml-64" : ""} transition-all duration-300 ease-in-out`}
      >
        {/* Aquí va el contenido principal */}
      </div>
    </div>
  );
};

export default Menu;
