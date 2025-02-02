const ReportCard = ({ index, datos }) => {
  return (
    <>
      <tr>
        <th>{index}</th>
        <td>{datos.lugarDeCompra}</td>
        <td>{datos.description}</td>
        <td>{datos.categoria}</td>
        <td>${datos.monto}</td>
      </tr>
    </>
  );
};

export default ReportCard;
