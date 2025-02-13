import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FormPresupuesto = () => {
  const navigate = useNavigate();

  const [presupuesto, setPresupuesto] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();

    if (presupuesto === 0 || isNaN(presupuesto)) {
      Swal.fire({
        text: "El presumuesto debe ser mayor a 0!",
        icon: "error",
      });

      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/presupuesto`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ presupuesto }),
          credentials: "include",
        },
      );

      const resultado = await response.json();

      console.log(resultado);
      if (response.ok) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-40">
      <form onSubmit={(e) => handleSubmit(e)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg mx-auto font-bold">
              Digite su presupuesto
            </span>
          </label>
          <input
            onChange={(e) => setPresupuesto(+e.target.value)}
            min={0}
            type="number"
            className="input input-bordered"
          />
        </div>

        <div className="form-control mt-6">
          <button id="presupuestoForm" className="btn btn-primary">
            Guarda Presupuesto
          </button>
        </div>
        <div className="form-control mt-2">
          <Link to={"/dashboard"} className="btn ">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormPresupuesto;
