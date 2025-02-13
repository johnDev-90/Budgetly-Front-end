import { useAuth } from "../contextApi/AuthProvider.jsx";
import { Navigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { useUser } from "../contextApi/UserProvider.jsx";

const Private = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Memorizar la función para que no se recree en cada render
  const authenticateUser = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/authenticate`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok) {
        setIsAuthenticated(false);
      } else {
        const result = await response.json();
        setUser(result.result);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
      setIsAuthenticated(false);
      Swal.fire({
        title: "Error en la autenticación. Inicia sesión nuevamente.",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, [setIsAuthenticated, setUser]);

  // ✅ Ejecutar `authenticateUser` solo al montar el componente
  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]); // Se ejecuta solo si `authenticateUser` cambia (lo que no pasará debido a `useCallback`)

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Private;
