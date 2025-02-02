import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Swal from "sweetalert2";
import { formatFechaToYYYYMMDD } from "../helpers/FormatMoney.js";

import salud from "../img/caategoriasPic/salud.avif";
import ahorro from "../img/caategoriasPic/ahorro.avif";
import deudas from "../img/caategoriasPic/deudas.avif";
import educacion from "../img/caategoriasPic/educacion.avif";
import gastosFijos from "../img/caategoriasPic/gastosFijos.avif";
import gastosVariables from "../img/caategoriasPic/gastosVariables.avif";
import imprevistos from "../img/caategoriasPic/imprevistos.png";

const ExpenseCard = () => {
  const [loading, setLoading] = useState(false);
  const [gastos, setGastos] = useState([]); // Datos filtrados
  const [gastosOriginales, setGastosOriginales] = useState([]); // Datos originales

  const [date, setDate] = useState("");
  const [clearFilter, setClearFilter] = useState(false);

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
  }, []);

  useEffect(() => {
    if (date) {
      filterByDate();
    } else {
      setGastos(gastosOriginales); // Restablece los datos originales si no hay fecha seleccionada
    }
  }, [date]);

  async function getGastos() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/gastos`, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        console.log("Ocurrió un error.");
        return;
      }

      const sorteGstos = result.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      setGastosOriginales(sorteGstos);
      setGastos(sorteGstos);
    } catch (error) {
      console.log(error);
    }
  }

  function filterByDate() {
    const filteredArray = gastosOriginales.filter(
      (gasto) => formatFechaToYYYYMMDD(gasto.created_at) === date,
    );
    setGastos(filteredArray);
  }

  function handleClearFilter() {
    setDate("");
    setGastos(gastosOriginales);
  }

  return (
    <div className="w-full mt-12">
      <div className="form-control w-full max-w-xs mx-auto">
        <div className="flex flex-row w-full">
          {/* Filtro por fecha */}
          <div className="form-control mt-12 flex flex-row w-full">
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              value={date}
              className="input input-bordered w-full"
            />
            <div className="form-control">
              <button
                onClick={handleClearFilter}
                className="btn btn-primary text-sm font-bold"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        <Link
          to={"/dashboard/newExpense"}
          className="btn roun btn-success mt-4"
        >
          + Crear gasto
        </Link>
      </div>

      <h2 className="text-center p-4 mt-8 text-xl font-bold">
        Lista de gastos
      </h2>

      <div className="w-full h-[40rem] overflow-y-auto">
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
          <div className="w-full h-1/2 flex flex-col items-center text-xl font-bold justify-center">
            <h2 className="text-center">
              Por el momento, no hay datos disponibles para mostrar.
            </h2>
            <p className="text-sm mt-10 text-center">
              Los datos se mostrarán automáticamente en esta página una vez que
              hayas agregado información o realizado registros en el sistema.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseCard;
