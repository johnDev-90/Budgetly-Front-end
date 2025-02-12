import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Loader from "../Utilities/Loader.jsx";

import { useAuth } from "../../contextApi/AuthProvider.jsx";


const Login = ({ setuser }) => {
  const { setIsAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function hanldeSubmit(e) {
    e.preventDefault();

    if (email === '' || password === '') {
      Swal.fire({
        text: "Todos los campos son obligatorios",
        icon: "error",
      });
      return;
    }

    console.log(email)
    console.log(password)

    const userCredentials = { email, password };

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(userCredentials),
        credentials:"include",
      });

      const result = await response.json();

      setuser(result.user);

      if (!response.ok) {
        Swal.fire({
          text: result.message,
          icon: "error",
        });
        setLoading(false);
        return;
      }

      setLoading(false);
      setIsAuthenticated(true);
      Swal.fire({
        text: result.message,
        icon: "success",
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6 text-2xl">
            <span className="font-bold">Budgelty</span> te ayuda a organizar tus
            finanzas al simplificar el seguimiento de ingresos y gastos. Con
            herramientas como gráficos y alertas, puedes identificar hábitos,
            optimizar tu presupuesto y alcanzar tus metas financieras con
            facilidad..
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form
            onSubmit={(e) => hanldeSubmit(e)}
            type="submit"
            className="card-body"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <Link to={'/forgotPassword'} className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">
                {loading ? <Loader /> : "Login"}
              </button>
            </div>
            <div className="form-control mt-2">
              <Link to={"/register"} className="">
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
