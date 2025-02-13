import { useEffect, useState } from "react";
import { formatFechaToYYYYMMDD } from "../helpers/FormatMoney";
import { formatearDinero } from "../helpers/FormatMoney";
import TransactionsPresupuestoCard from "../Components/TransactionsPresupuestoCard.jsx";
import TransactionsGastos from "../Components/TransactionsGastos.jsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Transacciones = () => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getAlltransactions();
  }, []);

  useEffect(() => {
    const entrada = transactions.reduce((acc, item) => {
      return item.type === "Entrada" ? acc + Number(item.presupuesto) : acc;
    }, 0);

    const salidas = transactions.reduce((acc, item) => {
      return item.type === "salida" ? acc + Number(item.monto) : acc;
    }, 0);

    setTotal(entrada - salidas);
  }, [transactions]);

  async function getAlltransactions() {
    try {
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/transacciones`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const response = await result.json();

      sortTransactionsBydate(response.resultado);
    } catch (error) {
      console.log(error);
    }
  }

  function sortTransactionsBydate(params) {
    const updatedArray = params.map((transac) => {
      if (!transac.gastoId) {
        return (transac = { ...transac, type: "Entrada" });
      }

      return (transac = { ...transac, type: "salida" });
    });

    const sortedTransactions = updatedArray.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at),
    );
    setTransactions(sortedTransactions);
  }

  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, `${fileName}.xlsx`);
  };

  const handleExport = () => {
    const datosPAraExcel = transactions.map((transaction, index) => ({
      N: index + 1,
      Tipo: transaction.type,
      Fecha: formatFechaToYYYYMMDD(transaction.created_at),
      Categoria: transaction.categoria || "NA",
      Lugar: transaction.lugarDeCompra || "NA",
      Descripcion: transaction.description || "NA",
      Monto: Number(-transaction.monto || transaction.presupuesto),
    }));

    exportToExcel(datosPAraExcel, "Reporte de Transacciones");
  };

  return (
    <>
      <table className="w-full md:w-[70%]  mt-16 text-center mx-auto ">
        <thead className="min-w-full">
          <tr className="">
            <th></th>
            <th>Fecha</th>
            <th className="hidden sm:table-cell">Tipo</th>
            <th className="hidden sm:table-cell">Categoria</th>
            <th className="hidden sm:table-cell">Lugar de compra</th>
            <th>Descripcion</th>
            <th>Monto</th>
          </tr>
        </thead>

        {transactions.map((items, index) =>
          items.type === "Entrada" ? (
            <TransactionsPresupuestoCard
              key={items.gastoId}
              items={items}
              index={index}
            />
          ) : (
            <TransactionsGastos key={items.id} items={items} index={index} />
          ),
        )}
      </table>
      <div className="mx-auto w-ful md:w-[70%] mt-8 flex flex-row-reverse justify-center items-center gap-20">
        <p className=" text-right font-bold text-lg">
          Total: <span>{formatearDinero(total)}</span>
        </p>
        <button onClick={handleExport} className="btn btn-outline btn-accent">
          Exportar a Excel
        </button>
      </div>
    </>
  );
};

export default Transacciones;
