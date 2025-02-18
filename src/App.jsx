import "./index.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthProvider from "./contextApi/AuthProvider";
import UserProvider from "./contextApi/UserProvider.jsx";

/**IMPORT COMPONENTS STARTS */
import Navbar from "./Components/Navbar";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import DashBoard from "./Pages/DashBoard";
import Private from "./Components/Private.jsx";
import Cards from "./Components/Cards.jsx";
import Layout from "./Components/Layout.jsx";
import Hero2 from "./Components/Hero2.jsx";
import NewExpenseForm from "./Components/NewExpenseForm.jsx";
import ExpenseCard from "./Components/ExpenseCard.jsx";
import EditForm from "./Components/EditForm.jsx";
import Report from "./Pages/Report.jsx";
import FormPresupuesto from "./Components/FormPresupuesto.jsx";
import ByCategoriasComponent from "./Components/ByCategoriasComponent.jsx";
import Profile from "./Components/Profile.jsx";
import { JoyrideProvider } from "./Pages/JoyrideConfig.jsx";
import Transacciones from "./Pages/Transacciones.jsx";
import ResetPassword from "./Components/Auth/ResetPassword.jsx";
import SetnewPasswordForm from "./Components/Auth/SetnewPasswordForm.jsx";

/**IMPORT COMPONENTS ENDS */

function App() {
  const [user, setuser] = useState({});

  return (
    <div>
      <AuthProvider>
        <UserProvider>
          <Router>
            <Layout user={user}>
              <Routes>
                <Route path="/" element={<Login setuser={setuser} />} />
                <Route path="/login" element={<Login setuser={setuser} />} />

                <Route path="/register" element={<Register />} />
                <Route path="/forgotPassword" element={<ResetPassword />} />
                <Route path="/passwordreset" element={<SetnewPasswordForm />} />
                <Route
                  path="/profile"
                  element={
                    <Private>
                      <Profile />
                    </Private>
                  }
                />
                <Route path="/presupuesto"element={<Private> <FormPresupuesto /></Private>}/>
                <Route
                  path="/dashboard/expenses"
                  element={
                    <Private>
                      <ExpenseCard />
                    </Private>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <Private>
                      {" "}
                      <DashBoard />
                    </Private>
                  }
                />
                <Route
                  path="/dashboard/newExpense"
                  element={
                    <Private>
                      <NewExpenseForm />
                    </Private>
                  }
                />
                <Route
                  path="/gastos/editarGasto/:id"
                  element={
                    <Private>
                      <EditForm />
                    </Private>
                  }
                />
                <Route
                  path="/dashboard/report"
                  element={
                    <Private>
                      <Report />
                    </Private>
                  }
                />
                <Route
                  path="/dashboard/transacciones"
                  element={
                    <Private>
                      <Transacciones />
                    </Private>
                  }
                />
                <Route
                  path="/byCategory/:category"
                  element={
                    <Private>
                      <ByCategoriasComponent />
                    </Private>
                  }
                />
              </Routes>
            </Layout>
          </Router>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
