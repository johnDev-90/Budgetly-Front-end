import { useState, useEffect } from "react";
import { formatearDinero } from "../helpers/FormatMoney.js";
import CardTotalCate from "./CardTotalCate.jsx";

const Column2 = ({ setCategoriasTotales }) => {
  const [loading, setLoading] = useState(false);
  const [gastos, setGastos] = useState([]); // Datos filtrados
  const [gastosOriginales, setGastosOriginales] = useState([]); // Datos originales

  const [date, setDate] = useState("");
  const [clearFilter, setClearFilter] = useState(false);

  const [groups, setGroups] = useState({});

  useEffect(() => {
    getGastos();
    getGastosbyCategorrias();
  }, []);

  useEffect(() => {
    getGastosbyCategorrias();
  }, [gastos]);

  useEffect(() => {
    if (date) {
      filterByDate();
    } else {
      setGastos(gastosOriginales);
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

  function getGastosbyCategorrias() {
    const totalesPorCategoria = gastos.reduce((acc, gasto) => {
      const { categoria, monto } = gasto;

      if (!acc[categoria]) {
        acc[categoria] = 0;
      }

      acc[categoria] += Number(monto);

      return acc;
    }, {});

    const resultado = Object.entries(totalesPorCategoria).map(
      ([categoria, total]) => ({
        categoria,
        total,
      }),
    );

    setGroups(resultado);
    setCategoriasTotales(resultado);
  }

  return (
    <div className="text-center mt-12 md:mt-12">
      <h2 className="text-center text-xl font-bold">Gasto por categoria</h2>
      <div
        className={
          groups.length
            ? `mt-11 grid grid-cols-2 h-52 gap-3 m-0 md:mt-11 mb-16`
            : `flex flex-row h-full`
        }
      >
        {groups.length ? (
          groups.map((totalCategoria, index) => (
            <CardTotalCate key={index} totalCategoria={totalCategoria} />
          ))
        ) : (
          <div className="w-full h-1/2 flex flex-col items-center text-xl font-bold justify-center p-4">
            <h2 className="">No hay datos</h2>
            <p className="text-sm mt-10">
              Los datos se mostrarán automáticamente en esta página una vez que
              hayas agregado información o realizado registros en el sistema.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column2;
