import { useAuth } from "../contextApi/AuthProvider.jsx";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useUser } from "../contextApi/UserProvider.jsx";

const Private = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { setUser } = useUser();
  const hasAuthenticated = useRef(false); // Evita ejecuciones repetidas

  useEffect(() => {
    if (!hasAuthenticated.current) {
      authenticateUser();
      hasAuthenticated.current = true;
    }
  }, []);

  async function authenticateUser() {
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
        // Swal.fire({
        //   title: "La sesión expiró. Inicia sesión nuevamente.",
        //   showClass: {
        //     popup: "animate__animated animate__fadeInUp animate__faster",
        //   },
        //   hideClass: {
        //     popup: "animate__animated animate__fadeOutDown animate__faster",
        //   },
        // });
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
      setIsLoading(false); // Terminamos de verificar.
    }
  }

  if (isLoading) {
    // Muestra un mensaje de carga o un spinner mientras verificas el token.
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Private;
