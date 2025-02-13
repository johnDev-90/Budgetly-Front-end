import { formatFechaToYYYYMMDD } from "../helpers/FormatMoney";
import { formatearDinero } from "../helpers/FormatMoney";
const TransactionsPresupuestoCard = ({ items, index }) => {
  return (
    <tbody className="min-w-full text-center">
      <tr>
        <td>{index + 1}</td>
        <td className="text-xs sm:text-base">
          {formatFechaToYYYYMMDD(items.created_at)}
        </td>
        <td className="hidden sm:table-cell text-green-600">{items.type}</td>
        <td className="text-gray-600 hidden sm:table-cell">N/A</td>
        <td className="text-gray-600 hidden sm:table-cell">N/A</td>
        <td>Ingreso</td>
        <td className="text-xs sm:text-base">
          {formatearDinero(items.presupuesto)}
        </td>
      </tr>
    </tbody>
  );
};

export default TransactionsPresupuestoCard;
