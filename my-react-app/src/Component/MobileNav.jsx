import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import "./MobileNav.css";
import { CgProfile } from "react-icons/cg";
import { IoHomeSharp } from "react-icons/io5";
import { TbBrandBooking } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { TbLayoutDashboard } from "react-icons/tb";
import { GrEdit } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { logout } from "../redux/Auth/Auth.actions";
import { ToastContainer, toast } from "react-toastify";
import { RiArrowGoBackLine } from "react-icons/ri";

const MobileNav = () => {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const dispatch = useDispatch();
  const username = localStorage.getItem("username") || "";
  const navigate = useNavigate();
  return (
    <>
      <div className="mobile-nav">
        <Link to="/Salons" className="nav-item">
          <IoHomeSharp />
        </Link>
        <Link to="/search-salons" className="nav-item">
          <IoSearch />
        </Link>

        <Link to="/my-bookingg" className="nav-item">
          <TbBrandBooking />
        </Link>
        <button onClick={openDrawer} className="nav-item">
          <CgProfile />
        </button>
         <button  onClick={() => navigate(-1)} className="nav-item">
        <RiArrowGoBackLine />
        </button>
      </div>
      <Drawer open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            {username}
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <List>
          <Link to="/">
            {" "}
            <ListItem>
              <ListItemPrefix>
                <IoHomeSharp />
              </ListItemPrefix>
              Home
            </ListItem>
          </Link>
          <Link to="/search-salons">
            <ListItem>
              <ListItemPrefix>
                <IoSearch />
              </ListItemPrefix>
              Search
            </ListItem>
          </Link>
          <ListItem>
            <ListItemPrefix>
              <TbBrandBooking />
            </ListItemPrefix>
            MyBooking
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <TbLayoutDashboard />
            </ListItemPrefix>
            DashBoard
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <GrEdit />
            </ListItemPrefix>
            Edit Profile
          </ListItem>

         

        </List>
        <button
          onClick={() => dispatch(logout())}
          className="bg-red-700 text-white p-[10px] rounded-lg  w-[100px]   transition-transform duration-300 ease-in-out hover:scale-105"
        >
          Logout
        </button>
      </Drawer>
      <ToastContainer />
    </>
  );
};

export default MobileNav;
