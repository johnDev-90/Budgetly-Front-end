import { formatearDinero } from "../helpers/FormatMoney.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const CardTotalCate = ({ totalCategoria }) => {
  const [presupuesto, setPresupuesto] = useState(0);
  const [percentage, sertPercentage] = useState(0);

  useEffect(() => {
    getPresupuesto();

    const clculatedPercentage = (totalCategoria.total / presupuesto) * 100;

    sertPercentage(Number(clculatedPercentage.toFixed(2)));
  }, [presupuesto]);

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
        const presupuestoTotal = result.result.reduce(
          (counter, item) => Number(item.presupuesto) + counter,
          0,
        );
        setPresupuesto(presupuestoTotal);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" md:w-full h-full hover:bg-violet-600  cursor-pointer leading-7 text-sm  p-2 flex flex-col gap-2 rounded-lg justify-center relative  shadow-md shadow-black">
      <Link
        className="flex flex-col-reverse items-center"
        to={`/byCategory/${totalCategoria.categoria}`}
      >
        <div className=" w-full h-full">
          <p>
            {totalCategoria.categoria} <span className="">{percentage}%</span>
          </p>

          <p>
            Total Gastado: <span>{formatearDinero(totalCategoria.total)}</span>
          </p>
        </div>
        <div className="w-14 h-14  md:w-20 h-20">
          <CircularProgressbar
            value={percentage}
            styles={buildStyles({
              pathColor:
                percentage > 80
                  ? "#f76c6c"
                  : percentage > 50
                    ? "#ffd56b"
                    : percentage > 30
                      ? "#85e085"
                      : "#a0c4ff",
              trailColor: "#d3d3d3",
              textSize: "22px",
              textColor:
                percentage > 80
                  ? "#f76c6c"
                  : percentage > 50
                    ? "#ffd56b"
                    : percentage > 30
                      ? "#85e085"
                      : "#a0c4ff",
            })}
            text={`${percentage}%`}
          />
        </div>
      </Link>
    </div>
  );
};

export default CardTotalCate;
