import { formatearDinero } from "../helpers/FormatMoney";
import { formatFechaToYYYYMMDD } from "../helpers/FormatMoney";
import { useEffect } from "react";
const HistorialCards = ({ gasto, index }) => {
  const { categoria, created_at, description, lugarDeCompra, monto } = gasto;

  return (
    <div className="border-b w-full h-auto flex mx-auto justify-between text-xs md:text-base md:w-1/2">
      <p className="text-center pl-1">{index + 1}</p>
      <p className="text-center w-1/5">{categoria}</p>
      <p className="text-center w-1/5">{formatFechaToYYYYMMDD(created_at)}</p>
      <p className="text-center w-1/5">{lugarDeCompra}</p>
      <p className="text-center w-1/5">{description}</p>
      <p className="text-center w-1/5">{formatearDinero(monto)}</p>
    </div>
  );
};

export default HistorialCards;
