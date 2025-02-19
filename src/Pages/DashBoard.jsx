import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import Cards from "../Components/Cards.jsx";
import "react-circular-progressbar/dist/styles.css";

//**IMPORT COMPONENTS */
import ListExpenses from "../Components/ListExpenses.jsx";
import ExpenseCard from "../Components/ExpenseCard.jsx";
import GridCategoria from "../Components/GridCategoria.jsx";
import ColumncircularBar from "../Components/Column1.jsx";
import FormPresupuesto from "../Components/FormPresupuesto.jsx";
import Column2 from "../Components/Column2.jsx";
import NewExpenseForm from "../Components/NewExpenseForm.jsx";
import GastosComparativa from "../Components/GastosComparativa.jsx";
import HorizontalBarChart from "../Components/HorizontalBarChart.jsx";
import Columna3 from "../Components/Columna3.jsx";

//**IMPORT COMPONENTS END */

const DashBoard = ({}) => {
  const [data, setData] = useState({});
  const [gastos, setGastos] = useState([]);
  const [totalGastado, setTotalGAstado] = useState(0);
  const [categoriasTotales, setCategoriasTotales] = useState([]);

  useEffect(() => {
    getPresupuesto();
    getGastp();
  }, []);

  useEffect(() => {
    calulateTotalGastado();
  }, [gastos]);

  function calulateTotalGastado() {
    const total = gastos.reduce((counter, item) => +item.monto + counter, 0);

    setTotalGAstado(total);
  }

  async function getPresupuesto() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/presupuesto`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const result = await response.json();

      if (response.ok) {
        setData(result.result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getGastp() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/gastos`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        setGastos(result);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="md:grid grid-cols-3 h-screen gap-20">
  <div className="w-full h-full">
    <ColumncircularBar data={data} totalGastado={totalGastado} />
  </div>
  <div className="w-full h-full">
    <Column2 setCategoriasTotales={setCategoriasTotales} />
  </div>
  <div className="w-full h-full">
    <Columna3 gastos={gastos} categoriasTotales={categoriasTotales} />
  </div>
</div>

  );
};

export default DashBoard;
