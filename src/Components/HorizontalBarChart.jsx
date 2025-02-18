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


  const obtenerMesYAnio = (fecha) => {
    const date = new Date(fecha);
    return { mes: date.getMonth(), anio: date.getFullYear() };
  };

  const hoy = new Date();
  const mesActual = hoy.getMonth();
  const anioActual = hoy.getFullYear();
  const mesPasado = mesActual === 0 ? 11 : mesActual - 1;
  const anioPasado = mesActual === 0 ? anioActual - 1 : anioActual;


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
    labels: categorias, 
    datasets: [
      {
        label: "Gastos Actuales",
        data: datosActuales, 
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Gastos Anteriores",
        data: datosPasados, 
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const opciones = {
    indexAxis: "y",
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
    <div className="flex justify-center items-center w-full mt-20">
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
      <h2 className="text-center font-bold">Comparativa de Gastos por Categoría</h2>
      {categorias.length > 0 ? (
        <Bar data={datos} options={{ ...opciones, maintainAspectRatio: false }} />
      ) : (
        <p className="text-sm mt-10 text-center">
          Los datos se mostrarán automáticamente en esta página una vez que hayas agregado información o realizado registros en el sistema.
        </p>
      )}
    </div>
  </div>
  
  );
};

export default HorizontalBarChart;
