import salud from "../img/caategoriasPic/salud.avif";
import ahorro from "../img/caategoriasPic/ahorro.avif";
import deudas from "../img/caategoriasPic/deudas.avif";
import educacion from "../img/caategoriasPic/educacion.avif";
import gastosFijos from "../img/caategoriasPic/gastosFijos.avif";
import gastosVariables from "../img/caategoriasPic/gastosVariables.avif";
import imprevistos from "../img/caategoriasPic/imprevistos.png";
import { formatearDinero } from "../helpers/FormatMoney.js";

import { Link } from "react-router-dom";

import Card from "./Card.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ByCategoriasComponent = () => {
  const { category } = useParams();
  const [gastos, setGastos] = useState([]);
  const [totalGastado, setTotalGastado] = useState(0);

  const imagenes = {
    "Gastos fijos": gastosFijos,
    "Gastos variables": gastosVariables,
    "Ahorro e inversión": ahorro,
    "Deudas y pagos": deudas,
    "Salud y bienestar": salud,
    "Educación y desarrollo": educacion,
    "Otros gastos o imprevistos": imprevistos,
  };

  useEffect(() => {
    getGastos();
  }, [category]);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (counter, item) => Number(item.monto) + counter,
      0,
    );
    setTotalGastado(totalGastado);
  }, [gastos]);

  async function getGastos() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/gastos/category/${category}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        console.log("Ocurrió un error.");
        return;
      }

      setGastos(result.resultado);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="justify-center w-full flex flex-row mt-20 shadow-md gap-10 shadow-black p-4 md:w-1/2">
        <div>
          <h2 className="text-lg font-bold">Detalles</h2>
          <p className="font-bold text-blue-400 text-lg">
            Categoria:{" "}
            <span className="text-lg text-orange-500 font-bold">
              {category}
            </span>
          </p>
          <p className="font-bold text-blue-400 text-lg">
            Total gastado:{" "}
            <span className="text-lg font-bold text-red-500">
              {formatearDinero(totalGastado)}
            </span>
          </p>
        </div>

        <div>
          <Link to={"/dashboard"} className="font-bold hover:font-extrabold">
            Salir
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="size-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="w-full h-1/2 overflow-y-auto mt-8">
        {gastos.length > 0 ? (
          gastos.map((gasto, index) => (
            <Card
              key={gasto.gastoId}
              gasto={gasto}
              imagenes={imagenes}
              index={index}
              getGastos={getGastos}
            />
          ))
        ) : (
          <p>Aún no hay gastos registrados...</p>
        )}
      </div>
    </div>
  );
};

export default ByCategoriasComponent;
