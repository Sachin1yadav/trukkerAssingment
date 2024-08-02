import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <>
    <div className="fixed top-0 w-full bg-gray-200 shadow-lg z-50 mb-[100px]">
      <div className="flex items-center justify-between h-16 px-4">
        <Link to="/">
        <div className="font-bold   cursor-pointer">Nayi App</div>
        </Link>
        
        <div className="fixed top-24 w-52 text-right"></div>
      </div>
    </div>
    </>
  );
};

export default NavbarComponent;
