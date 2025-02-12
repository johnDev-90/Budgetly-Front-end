import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  formatearDinero,
  formatFechaToYYYYMMDD,
} from "../helpers/FormatMoney.js";
import { Link } from "react-router-dom";
import FormPresupuesto from "./FormPresupuesto.jsx";

import { useState, useEffect } from "react";


const ColumncircularBar = ({ data, totalGastado }) => {
  const [presupuesto, setPresupuesto] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [transaccionesReciente, setTransaccionesRecientes] = useState([]);



  useEffect(() => {
    if (data.length > 0) {
      const sumaPressupuesto = data.reduce(
        (counter, item) => Number(item.presupuesto) + counter,
        0,
      );
      setPresupuesto(sumaPressupuesto);
    }
  }, [data]);

  useEffect(() => {
    if (presupuesto > 0 && totalGastado >= 0) {
      const calculatePercentage = (totalGastado / presupuesto) * 100;
      setPercentage(Number(calculatePercentage.toFixed(2)));
    }
  }, [presupuesto, totalGastado]);

  useEffect(() => {
    rederRecentTransactions();
  }, []);

  const todaysDate = new Date();

  const formatedFate = formatFechaToYYYYMMDD(todaysDate);

  async function rederRecentTransactions() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/gasto/recentTransactions`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const result = await response.json();

      const sortedData = result.data.sort(
        (a, b) =>
          formatFechaToYYYYMMDD(a.created_at) -
          formatFechaToYYYYMMDD(b.created_at),
      );

      setTransaccionesRecientes(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-100 h-4/5 mt-16">
      <div className="w-100  flex justify-center ">
        <div style={{ width: "20rem", height: "20rem" }}>
          {" "}
      
          {presupuesto > 0 ? (<CircularProgressbar
            value={percentage}
            styles={buildStyles({
              pathColor:
                percentage > 80
                  ? "#f76c6c" 
                  : percentage > 50
                    ? "#ffd56b" 
                    : "#85e085", 
              trailColor: "#d3d3d3",
              textSize: "12px",
              textColor:
                percentage > 80
                  ? "#f76c6c"
                  : percentage > 50
                    ? "#ffd56b"
                    : "#85e085",
            })}
            text={`${percentage}%`}
          />):(

            <div className="w-full flex text-center items-center justify-center">
                             <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 animate-bounce"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
    />
  </svg>
            </div>

          )}
          <Link
         
             id={"addPresupuesto"}
            className="flex flex-row w-60 mx-auto p-3 bg-blue-500 rounded-lg gap-4 text-center justify-center items-center text-white mt-4 font-bold"
            to={"/presupuesto"}
          >
            Agregar/sumar presupuesto
          </Link>
          <div className="mt-4 w-100 p-4 text-center">
            <p className="text-base">
              Presupuesto:{" "}
              <span className="text-xl text-blue-400 ">
                {formatearDinero(presupuesto)}
              </span>{" "}
            </p>
            <div></div>

            <p className="text-base">
              Total gastado:{" "}
              <span className="text-xl  text-red-500">
                -{formatearDinero(totalGastado)}
              </span>{" "}
            </p>
            <p className="text-base">
              Disponible:{" "}
              <span className="text-xl text-green-400 ">
                {formatearDinero(presupuesto - totalGastado)}
              </span>{" "}
            </p>
          </div>
          <div className="w-full  mx-auto text-center mt-4 ">
            <h2 className="text-xl mb-12">Transacciones recientes</h2>

            <div className="h-40 overflow-y-auto scroll-m-3">
              <div className="w-full flex flex-col gap-2 ">
                {transaccionesReciente.length > 0 ? (
                  transaccionesReciente.map((transaction) =>
                    transaction.gastoId ? (
                      <div
                        key={transaction.gastoId}
                        className="w-full flex flex-row gap-4 border-b"
                      >
                        <div className="text-red-500 w-4 text-xl ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                            />
                          </svg>
                        </div>
                        <div className=" flex w-full gap-4 font-bold justify-center  text-sm">
                          <p className="w-100">{transaction.lugarDeCompra}</p>
                          <p className="w-100">
                            {formatearDinero(transaction.monto)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-row gap-4">
                        <div className="text-green-500 w-4 text-xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="size-7"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                            />
                          </svg>
                        </div>
                        <div className="flex w-full gap-4 justify-center font-bold  text-sm">
                          <p className="w-100">
                            {formatFechaToYYYYMMDD(transaction.created_at)}
                          </p>
                          <p className="w-100">
                            {formatearDinero(transaction.presupuesto)}
                          </p>
                        </div>
                        
                      </div>
                      
                    ),
                  )
                ) : (
                  <h1>No hay transacciones de hoy</h1>
                )}
                
              </div>
             
            </div>
          </div>
          
        </div>
        
      </div>
      
    </div>
  );
};

export default ColumncircularBar;
