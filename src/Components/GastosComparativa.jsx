import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const GastosComparativa = ({ gastos }) => {
  console.log("Gastos originales:", gastos);

  // Función para obtener el mes y el año de una fecha
  const obtenerMesYAnio = (fecha) => {
    const date = new Date(fecha);
    return { mes: date.getMonth(), anio: date.getFullYear() }; // 0 = enero, 11 = diciembre
  };

  // Obtener el mes y año actuales
  const hoy = new Date();
  const mesActual = hoy.getMonth(); // Mes actual (0 = enero)
  const anioActual = hoy.getFullYear();

  // Mes y año anteriores
  const mesPasado = mesActual === 0 ? 11 : mesActual - 1; // Si es enero, el mes pasado es diciembre
  const anioPasado = mesActual === 0 ? anioActual - 1 : anioActual;

  // Filtrar gastos por mes y año
  const gastosMesActual = gastos.filter((gasto) => {
    const { mes, anio } = obtenerMesYAnio(gasto.created_at);
    return mes === mesActual && anio === anioActual;
  });

  const gastosMesPasado = gastos.filter((gasto) => {
    const { mes, anio } = obtenerMesYAnio(gasto.created_at);
    return mes === mesPasado && anio === anioPasado;
  });

  console.log("Gastos mes actual (febrero):", gastosMesActual);
  console.log("Gastos mes pasado (enero):", gastosMesPasado);

  // Calcular gastos totales para el mes
  const calcularTotalGastos = (gastos) =>
    gastos.reduce((total, gasto) => total + parseFloat(gasto.monto), 0);

  const totalGastosMesActual = calcularTotalGastos(gastosMesActual);
  const totalGastosMesPasado = calcularTotalGastos(gastosMesPasado);

  console.log(totalGastosMesActual);

  // Datos para la gráfica
  const datos = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ], // Etiquetas de los meses
    datasets: [
      {
        label: "Gastos Mes pasado",
        data: [0, totalGastosMesPasado], // Solo se registra en febrero
        fill: false,
        borderColor: "rgba(255,99,132,1)", // Línea verde
        tension: 0.1,
      },
      {
        label: "Gastos mMs Actual",
        data: [0, totalGastosMesActual], // Solo se registra en enero
        fill: false,
        borderColor: "rgba(75,192,192,1)", // Línea roja
        tension: 0.1,
      },
    ],
  };

  // Opciones para la gráfica
  const opciones = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Comparativa de Gastos Mensuales",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  // Renderizar la gráfica
  return (
    <div
      className={
        gastos.length > 0
          ? "mt-[20rem] w-100 text-center h-auto md:mt-12"
          : "mt-16 w-100 text-center h-auto p-8 md:mt-12"
      }
    >
      <h2>Comparativa de Gastos Mensuales</h2>
      {gastos.length > 0 ? (
        <Line className="mt-8" data={datos} options={opciones} />
      ) : (
        <p className="text-sm mt-10">
          Los datos se mostrarán automáticamente en esta página una vez que
          hayas agregado información o realizado registros en el sistema.
        </p>
      )}
    </div>
  );
};

export default GastosComparativa;
