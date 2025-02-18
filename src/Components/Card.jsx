import marcador from "../img/caategoriasPic/marcador.jpg";
import { formatFechaMySQL } from "../helpers/FormatMoney.js";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";

const Card = ({ gasto, imagenes, index, getGastos }) => {
  const [confirmation, setconfirmation] = useState(false);
  const [categoria, setCategoria] = useState("");

  async function deleteGasto(id) {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borralo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/gasto/borrar/${id}`,
            {
              method: "DELETE",
              credentials: "include",
            },
          );

          const result = await response.json();

      
          Swal.fire({
            title: "Deleted!",
            text: result.message,
            icon: "success",
          });
          getGastos();
        } catch (error) {
          console.log(error);

   
          Swal.fire({
            title: "Error",
            text: "There was a problem deleting the item.",
            icon: "error",
          });
        }
      }
    });
  }

  return (
    <div className="w-full max-w-md mx-auto rounded-lg shadow-md p-4">

    <div className="flex items-center gap-4">
      {/* Imagen circular */}
      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={imagenes[gasto.categoria]}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </div>
  
      {/* Contenido de texto */}
      <div className="flex-1">
        <p className="text-sm md:text-lg font-bold">
          Categoría:{" "}
          <span className="font-semibold md:font-extrabold">
            {gasto.categoria}
          </span>
        </p>
        <p className="text-sm font-bold">
          Lugar de compra: <span className="font-normal">{gasto.lugarDeCompra}</span>
        </p>
        <p className="text-sm font-bold">
          Fecha: <span className="font-normal">{formatFechaMySQL(gasto.created_at)}</span>
        </p>
        <p className="text-lg font-bold text-green-500">${gasto.monto}</p>
      </div>
    </div>
  
 
    <div className="flex justify-end gap-2 mt-4">
      <Link
        to={`/gastos/editarGasto/${gasto.gastoId}`}
        className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </Link>
  
      <button
        onClick={() => deleteGasto(gasto.gastoId)}
        className="p-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  </div>
  
  );
};

export default Card;
