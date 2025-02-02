import { useUser } from "../contextApi/UserProvider.jsx";
import marcador from "../img/caategoriasPic/marcador.jpg";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [avatar, setAvatar] = useState(user.imageUrl);




  function controlCambiodeImg(e) {
   

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("userId", user.userId);



    try {
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/editProfile`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        },
      );

      const response = await result.json();
      if (result.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          navigate("/dashboard");
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

async function deleteimg(avatar) {

  const url = avatar




  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/deleteImg`,{
          method:'DELETE',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify({url:avatar}),
          credentials:'include'
        })
    
        const result = await response.json()
        
      } catch (error) {
        console.log(error)
      }
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });

 
  
}

  return (
    <div className="absolute w-full md:relative md:flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg shadow-lg rounded-lg p-8">
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          {/* Título */}
          <div className="text-center">
            <p className="font-bold text-lg mb-4">Foto de perfil</p>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                className="rounded-full w-20 md:w-36"
                src={
                  avatar !== null && avatar !== undefined ? avatar : marcador
                }
                alt="imagen de perfil"
              />
              <div className="flex gap-4">
                {/* Botón que activa el input file */}
                <button
                  type="button"
                  className="btn btn-info p-2"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Cambiar imagen
                </button>
                <button
                
                onClick={(e) => deleteimg(avatar)}
                type="button" className="btn btn-secondary p-2">
                  Borrar Imagen
                </button>
                <input
                  onChange={(e) => controlCambiodeImg(e)}
                  name="imgProfile"
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Campos del formulario */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-base font-semibold" htmlFor="nombre">
                Nombre
              </label>
              <input
                name="nombre"
                defaultValue={user.name}
                className="rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Nombre"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-base font-semibold" htmlFor="apellido">
                Apellido
              </label>
              <input
                defaultValue={user.lastName}
                name="apellido"
                className="rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Apellido"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-base font-semibold" htmlFor="email">
                Email
              </label>
              <input
                defaultValue={user.email}
                name="email"
                className="rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Email"
              />
            </div>
          </div>

          {/* Botón de enviar */}
          <div className="text-center mt-6 flex flex-col gap-2">
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
              type="submit"
            >
              Guardar
            </button>
            <Link to={'/dashboard'} className="btn btn-ghost w-full text-lg">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
