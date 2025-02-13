import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const HorizontalBarChart = ({ categoriasTotales }) => {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    getGastos();
  }, []);

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
      setGastos(result);
    } catch (error) {
      console.log(error);
    }
  }

  // Obtener mes y año de una fecha
  const obtenerMesYAnio = (fecha) => {
    const date = new Date(fecha);
    return { mes: date.getMonth(), anio: date.getFullYear() };
  };

  const hoy = new Date();
  const mesActual = hoy.getMonth();
  const anioActual = hoy.getFullYear();
  const mesPasado = mesActual === 0 ? 11 : mesActual - 1;
  const anioPasado = mesActual === 0 ? anioActual - 1 : anioActual;

  // Filtrar los gastos por mes y año
  const gastosMesActual = gastos.filter((gasto) => {
    const { mes, anio } = obtenerMesYAnio(gasto.created_at);
    return mes === mesActual && anio === anioActual;
  });

  const gastosMesPasado = gastos.filter((gasto) => {
    const { mes, anio } = obtenerMesYAnio(gasto.created_at);
    return mes === mesPasado && anio === anioPasado;
  });

  // Agrupar por categoría
  const agruparPorCategoria = (gastos) => {
    return gastos.reduce((acumulador, gasto) => {
      acumulador[gasto.categoria] =
        (acumulador[gasto.categoria] || 0) + parseFloat(gasto.monto);
      return acumulador;
    }, {});
  };

  const categoriasActuales = agruparPorCategoria(gastosMesActual);
  const categoriasPasadas = agruparPorCategoria(gastosMesPasado);

  // Preparar datos para el gráfico
  const categorias = [
    ...new Set([
      ...Object.keys(categoriasActuales),
      ...Object.keys(categoriasPasadas),
    ]),
  ];

  const datosActuales = categorias.map(
    (categoria) => categoriasActuales[categoria] || 0,
  );
  const datosPasados = categorias.map(
    (categoria) => categoriasPasadas[categoria] || 0,
  );

  const datos = {
    labels: categorias, // Etiquetas son las categorías
    datasets: [
      {
        label: "Gastos Actuales",
        data: datosActuales, // Datos de categorías actuales
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Gastos Anteriores",
        data: datosPasados, // Datos de categorías pasadas
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const opciones = {
    indexAxis: "y", // Barras horizontales
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Comparativa de Gastos por Categoría",
      },
    },
  };

  return (
    <div
      className={
        categorias.length > 0
          ? "mt-[5rem] w-full text-center h-[30rem] md:mt-12"
          : "mt-16 w-full text-center h-[30rem] p-8 md:mt-12"
      }
    >
      <h2>Comparativa de Gastos por Categoría</h2>
      {categorias.length > 0 ? (
        <Bar className="mt-8" data={datos} options={opciones} />
      ) : (
        <p className="text-sm mt-10">
          Los datos se mostrarán automáticamente en esta página una vez que
          hayas agregado información o realizado registros en el sistema.
        </p>
      )}
    </div>
  );
};

export default HorizontalBarChart;
