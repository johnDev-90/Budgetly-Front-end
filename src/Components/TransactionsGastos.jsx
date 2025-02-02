import { formatFechaToYYYYMMDD } from "../helpers/FormatMoney"
import { formatearDinero } from "../helpers/FormatMoney"

const TransactionsGastos = ({items,index}) => {
  return (
    <tbody className="min-w-full text-center">
    <tr>
       <td>{index +1}</td>
       <td className="text-xs sm:text-base">{formatFechaToYYYYMMDD(items.created_at)}</td>
       <td className="hidden sm:table-cell  text-red-500">{items.type}</td>
        <td className="hidden sm:table-cell">{items.categoria}</td>
        <td className="hidden sm:table-cell">{items.lugarDeCompra}</td>
        <td className="text-xs sm:text-base">{items.description}</td>
        <td className="text-xs sm:text-base">-{formatearDinero(items.monto)}</td>
    </tr>
    
</tbody>
  )
}

export default TransactionsGastos
