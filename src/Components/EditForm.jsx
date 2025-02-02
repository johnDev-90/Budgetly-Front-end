import React from "react";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

const EditForm = () => {
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescription] = useState("");
  const [lugar, setLugar] = useState("");
  const [amount, setAmount] = useState(0);

  const [gastoId, setGastoid] = useState("");
  const [userId, setUserId] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/gasto/editarGasto/${+id}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const result = await response.json();

        if (!response.ok) {
   
          return;
        }



        setCategoria(result.categoria);
        setDescription(result.description);
        setLugar(result.lugarDeCompra);
        setAmount(result.monto);
        setGastoid(result.gastoId);
        setUserId(result.userId);
        setCreatedAt(result.created_at);
      } catch (error) {
        console.error("Error fetching gasto:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      userId,
      gastoId,
      categoria,
      lugar,
      descripcion,
      amount,
      createdAt,
    };

    if (Object.values(data).includes("")) {
      Swal.fire({
        text: "Campos vacios..!",
        icon: "error",
      });
      return;
    }



    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/gasto/update/${gastoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        Swal.fire({
          title: result.message,
          text: result.error.sqlMessage,
          icon: "error",
        });
        return;
      }

      Swal.fire({
        text: result.message,
        icon: "success",
      }).then(() => {
        setCategoria("");
        setAmount(0);
        setDescription("");
        setLugar("");
        setCreatedAt("");
        setGastoid("");
        setUserId("");

        navigate("/dashboard/expenses");
      });
    } catch (error) {

    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full  md:w-1/2 mx-auto mt-24 p-6 bg-base-200 shadow-md rounded-md"
    >
      {/* Categoría */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-bold">Categoría</span>
        </label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="select select-bordered"
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          <option value="Gastos fijos">Gastos fijos</option>
          <option value="Gastos variables">Gastos variables</option>
          <option value="Ahorro e inversión">Ahorro e inversión</option>
          <option value="Deudas y pagos">Deudas y pagos</option>
          <option value="Salud y bienestar">Salud y bienestar</option>
          <option value="Educación y desarrollo">Educación y desarrollo</option>
          <option value="Otros gastos o imprevistos">
            Otros gastos o imprevistos
          </option>
        </select>
      </div>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-bold">Lugar</span>
        </label>
        <input
          value={lugar}
          onChange={(e) => setLugar(e.target.value)}
          type="text"
          placeholder="Lugar de la compra"
          className="input input-bordered"
        />
      </div>

      {/* Descripción */}
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-bold">Descripción</span>
        </label>
        <input
          value={descripcion}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Añade una descripción"
          className="input input-bordered"
        />
      </div>

      {/* Monto */}
      <div className="form-control mb-6">
        <label className="label">
          <span className="label-text font-bold">Monto</span>
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Ingrese el monto"
          className="input input-bordered"
          min="0.01"
          step="0.01"
        />
      </div>

      {/* Botones */}
      <div className="form-control flex flex-col justify-between gap-4">
        <button type="submit" className="btn btn-primary w-full">
          Guardar Cambios
        </button>
        <button
          onClick={() => navigate("/dashboard/expenses")}
          type="button"
          className="btn btn-ghost w-full"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditForm;
