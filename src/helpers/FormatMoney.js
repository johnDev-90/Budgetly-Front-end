export function formatFechaMySQL(fechaMySQL) {
  const fecha = new Date(fechaMySQL); // Convierte la fecha ISO a un objeto Date
  const opciones = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", opciones).format(fecha);
}

export function formatFechaToYYYYMMDD(fecha) {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Agregar cero si es necesario
  const day = String(date.getDate()).padStart(2, "0"); // Agregar cero si es necesario
  return `${year}-${month}-${day}`;
}

export const formatearDinero = (valor) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(valor);
};
