import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const SetnewPasswordForm = () => {
  const [newPasword, setNewPassword] = useState("");
  const [confirmeNewPassword, setConfirmNewPassword] = useState("");
  const [tokenUrl, setTokenUrl] = useState('');
  const [ismatch, setIsMatch] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation(); // 🔹 Se mueve aquí

  useEffect(() => {
    getToken();
  }, [location]); // 🔹 Se agrega location como dependencia

  function getToken() {
    const urlParams = new URLSearchParams(location.search); // 🔹 Se usa location directamente
    const token = urlParams.get("token");

    console.log("Token extraído:", token);
    
    if (!token) {
      console.error("Token no encontrado en la URL");
    } else {
      setTokenUrl(token);
    }
  }

  useEffect(() => {
    (confirmeNewPassword !== "") & (confirmeNewPassword === newPasword)
      ? setIsMatch(true)
      : setIsMatch(false);
  }, [confirmeNewPassword]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (newPasword === "") {
      Swal.fire({
        text: "Debes ingresar una contraseña!",
        icon: "error",
      });
    } else if (confirmeNewPassword === "") {
      Swal.fire({
        text: "Debes confirmar la contraseña!",
        icon: "error",
      });
    } else if (confirmeNewPassword !== newPasword) {
      Swal.fire({
        text: "La contraseña no coincide. Intenta de nuevo!",
        icon: "error",
      });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/setNewPassword`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ newPasword, tokenUrl }),
          credentials: "include",
        }
      );

      const result = await response.json();

      console.log(result.token);

      if (response.ok) {
        Swal.fire({
          text: result.message,
          icon: "success",
        }).then(() => {
          navigate("/login");
        });
        return;
      }

      Swal.fire({
        text: result.message,
        icon: "error",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full">
      <div className="text-center mt-12 flex flex-col items-center gap-4 p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="30"
          height="30"
        >
          <path d="M12 2C9.24 2 7 4.24 7 7V10H6C4.9 10 4 10.9 4 12V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V12C20 10.9 19.1 10 18 10H17V7C17 4.24 14.76 2 12 2ZM9 7C9 5.34 10.34 4 12 4C13.66 4 15 5.34 15 7V10H9V7ZM12 14C13.1 14 14 14.9 14 16C14 16.78 13.59 17.47 13 17.87V19C13 19.55 12.55 20 12 20C11.45 20 11 19.55 11 19V17.87C10.41 17.47 10 16.78 10 16C10 14.9 10.9 14 12 14Z" />
        </svg>

        <h2 className="text-xl">¿Olvidaste tu contraseña?</h2>
        <p className="mt-4 w-[20rem]">
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña.
        </p>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto ">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="card-body w-full  mt-4"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nueva contraseña</span>
            </label>
            <input
              value={newPasword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder="Nueva contraseña"
              className="input input-bordered newPassword"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirmar contraseña</span>
            </label>
            <input
              className={`input input-bordered ${
                ismatch === true ? "border-green-600" : "border-red-500"
              } `}
              value={confirmeNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              type="password"
              placeholder="Confirmar contraseña"
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Cambiar contraseña</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetnewPasswordForm;

