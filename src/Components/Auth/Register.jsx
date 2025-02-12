import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const Register = () => {
  const [fileName, setFilename] = useState(null);

  const navgate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);

  function controlCambiodeImg(e) {
    const archivo = e.target.files[0];

    if (archivo) {
      const fileName = archivo.name;
      setFilename(fileName);
    } else {
      setFilename(null);
    }
  }

  async function hanldeSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    // formData.append("file", fileName);
    const data = Object.fromEntries(formData.entries());

    console.log(import.meta.env.VITE_API_URL)

  

    if (Object.values(data).includes("")) {
      Swal.fire({
        text: "Campos vacios..",
        icon: "error",
      });
    } else {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",

        body: formData,

      });

      const response = await result.json();
      if (!result.ok) {
        const { message, error } = response;

        Swal.fire({
          title: response.message,
          text: error.sqlMessage,
          icon: "error",
        });

        return;
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        navgate("/login");
      });
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content w-3/4">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form
            onSubmit={(e) => hanldeSubmit(e)}
            type="submit"
            className="card-body"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="FirstName"
                type="text"
                placeholder="First Name"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Last name</span>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="LastName"
                type="text"
                placeholder="Last name"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
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
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile pic.</span>
              </label>
              <input
                onChange={(e) => controlCambiodeImg(e)}
                name="imgProfile"
                type="file"
                className="input input-bordered"
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
            <div className="form-control mt-6">
              <Link to={"/login"} className="btn btn-primary">
                I have an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
