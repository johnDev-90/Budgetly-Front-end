import Menu from "./Menu.jsx";
import Navbar from "./Navbar.jsx";
import Cards from "./Cards.jsx";
import Footer from "./Footer.jsx";
import { useAuth } from "../contextApi/AuthProvider.jsx";
import { useLocation } from "react-router-dom";

const Layout = ({ children, user }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Navbar user={user} />
      <main className="w-full h-screen  grid grid-cols-[0.5fr_4fr]">
        <div>{isAuthenticated && <Menu />}</div>
        <div className="w-full h-screen absolute pt-0 pr-2 pl-2  md:relative  mr-16 md:overflow-hidden">
          {children}
        </div>
      </main>

    </div>
  );
};

export default Layout;
