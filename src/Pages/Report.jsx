import { useEffect, useState } from "react";
import ReportCard from "../Components/Auth/ReportCard";
import HistorialCards from "../Components/HistorialCards.jsx";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  formatearDinero,
  formatFechaToYYYYMMDD,
} from "../helpers/FormatMoney.js";

const Report = () => {
  const [data, setData] = useState([]);
  const [arregloDeGastos, setArregloDEGastos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [gastos, setGastos] = useState([]); // Datos filtrados
  const [gastosOriginales, setGastosOriginales] = useState([]); // Datos originales

  const [date, setDate] = useState("");
  const [clearFilter, setClearFilter] = useState(false);
  const [totalGastado, setTotalGastado] = useState(0);

  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, `${fileName}.xlsx`);
  };

  const handleExport = () => {
    const datosPAraExcel = gastos.map((gasto, index) => ({
      N: index + 1,
      Categoria: gasto.categoria,
      Fecha: formatFechaToYYYYMMDD(gasto.created_at),
      Lugar: gasto.lugarDeCompra,
      Monto: formatearDinero(gasto.monto),
    }));

    exportToExcel(datosPAraExcel, "Reporte de Gastos");
  };

  useEffect(() => {
    getGastos();
  }, []);

  useEffect(() => {
    const total = gastos.reduce(
      (counter, item) => Number(item.monto) + counter,
      0,
    );
    setTotalGastado(total);
  }, [gastos]);

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
    <div>
      <div className="form-control w-full max-w-xs mx-auto mt-12 md:mt-0">
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

        <button
          disabled={gastos.length > 0 ? false : true}
          onClick={handleExport}
          className="btn roun btn-success mt-4"
        >
          Exportar Excel
        </button>
      </div>

      <div className="w-full h-[65%] overflow-y-auto mt-24 ">
        {/* Contenedor de encabezados */}
        <div className="w-full h-auto flex mx-auto justify-between border-b-2 text-xs md:text-lg md:w-1/2 mb-4 sticky top-0 bg-slate-800 z-10">
          <p className="text-center"></p>
          <p className="text-center w-1/5">Categoria</p>
          <p className="text-center w-1/5">Fecha</p>
          <p className="text-center w-1/5">Lugar de la compra</p>
          <p className="text-center w-1/5">Descripcion</p>
          <p className="text-center w-1/5">Monto</p>
        </div>

        {gastos.length > 0 ? (
          gastos.map((gasto, index) => (
            <HistorialCards key={gasto.gastoId} index={index} gasto={gasto} />
          ))
        ) : (
          <h2 className="text-center">No hay datos para mostrar</h2>
        )}
      </div>
      <div className="text-end w-1/2 mx-auto text-lg p-2 font-bold">
        <p>
          Total: <span>{formatearDinero(totalGastado)}</span>
        </p>
      </div>
    </div>
  );
};

export default Report;
