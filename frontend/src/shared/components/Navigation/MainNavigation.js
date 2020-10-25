import React,{useState} from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import PlaceIcon from "@material-ui/icons/Place";

const MainNavigation = (props) => {
    const [drawerIsOpen,setDrawerIsOpen]=useState(false)
     const openDrawerHandler = () => {
       setDrawerIsOpen(true);
     };

     const closeDrawerHandler = () => {
       setDrawerIsOpen(false);
     };
  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <IconButton
          className="main-navigation__menu-btn"
          edge="start"
          aria-label="open drawer"
          onClick={openDrawerHandler}
          style={{ color: "white" }}
        >
          <MenuIcon className="main-navigation__menu-btn-menu" />
        </IconButton>

        <h1 className="main-navigation__title">
          <Link to="/">
            <PlaceIcon/>{" "}
            Place visité
          </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
