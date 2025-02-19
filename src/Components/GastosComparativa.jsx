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



 
  const calcularTotalGastos = (gastos) =>
    gastos.reduce((total, gasto) => total + parseFloat(gasto.monto), 0);

  const totalGastosMesActual = calcularTotalGastos(gastosMesActual);
  const totalGastosMesPasado = calcularTotalGastos(gastosMesPasado);



  
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
    ], 
    datasets: [
      {
        label: "Gastos Mes pasado",
        data: [0, totalGastosMesPasado], 
        fill: false,
        borderColor: "rgba(255,99,132,1)", 
        tension: 0.1,
      },
      {
        label: "Gastos mMs Actual",
        data: [0, totalGastosMesActual],
        fill: false,
        borderColor: "rgba(75,192,192,1)", 
        tension: 0.1,
      },
    ],
  };

 
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


  return (
    <div className="flex justify-center items-center w-full mt-12">
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px]">
      <h2 className="text-center font-bold">Comparativa de Gastos Mensuales</h2>
      {gastos.length > 0 ? (
        <Line data={datos} options={{ ...opciones, maintainAspectRatio: false }} />
      ) : (
        <p className="text-sm mt-10 text-center font-bold">
          Los datos se mostrarán automáticamente en esta página una vez que hayas agregado información o realizado registros en el sistema.
        </p>
      )}
    </div>
  </div>
  );
};

export default GastosComparativa;
