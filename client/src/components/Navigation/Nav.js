import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../logo.png";
import "./Navbar.css";


const Nav = () => {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const [value, setValue]= useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else {
      setActive("nav__menu");
    }
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  return (
    <nav className="nav">
      <div className="nav-side-div">
        <div
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
            window.location.reload();
          }}
        >
          <img className="nav-brand-logo" src={logo} alt="logo" />
          <h3 className="nav-brand-title">AnimeHashira</h3>
        </div>
        <FontAwesomeIcon
          className="magnify-icon"
          icon={faMagnifyingGlass}
        ></FontAwesomeIcon>
        <input
          onInput={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (e.target.value === ""){
                alert("Input cannot be empty!");
              }else{
                navigate(`/search/${e.target.value}`);
              }
            }
          }}
          placeholder="Search for anime"
          className="searchbar"
          type="text"
          value={value}
        ></input>
        <ul className={active}>
          <li className="nav__item">
            <span
              onClick={(e) => {
                e.preventDefault();
                navigate("/popular");
              }}
              className="nav__link"
            >
              Popular
            </span>
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              navigate("/trending");
            }}
            className="nav__item"
          >
            <span className="nav__link">Trending</span>
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              navigate("/genres");
            }}
            className="nav__item"
          >
            <span className="nav__link">Genres</span>
          </li>
        </ul>
      </div>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};
export default Nav;
