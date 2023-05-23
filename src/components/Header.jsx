import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getEventsByName } from "../redux/actions/eventsActions";
import { signout } from "../redux/actions/usersActions";
import rave from "../assets/logo3.png";

const Header = (props) => {
  const { isLogin, userData, signout } = props;
  const { getEventsByName } = props;
  const [opacity, setOpacity] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [name, setName] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > window.innerHeight * 0.4) {
      setOpacity(0.7);
    } else {
      setOpacity(window.pageYOffset / (window.innerHeight * 0.4) / 1.42);
    }
  };

  const headerStyle = {
    backgroundColor: `rgba(2, 6, 23, ${opacity})`,
  };

  const handleOptionClick = () => {
    setShowDropdown(false);
  };

  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.classList.contains("navLinkDropdown")
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(hideTimeout);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => {
      setShowDropdown(true);
    }, 100);
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const navigate = useNavigate();

  const handleSearchsubmit = (event) => {
    event.preventDefault();
    navigate("/search");
    getEventsByName(name.trim());
    setName("");
  };

  const handleSignOut = () => {
    isLogin && signout();
    navigate("/");
  };

  const handleHomeClick = () => {
    // Implementa la lógica necesaria para manejar el estado de currentPage si es necesario
    // ...
  };

  return (
    <div
      className="grid grid-cols-3 w-screen h-16 fixed top-0 z-10 font-medium px-2"
      style={headerStyle}
    >
      <div className="flex justify-self-start items-center ml-4">
        <Link to="/">
          <img className="w-48" src={rave} alt="Rave Motion Logo" />
        </Link>
      </div>
      <div className="flex justify-self-center items-center">
        <form onSubmit={handleSearchsubmit}>
          <input
            className="w-96 input"
            type="text"
            placeholder="Buscar evento"
            onChange={handleInputChange}
            value={name}
          />
        </form>
      </div>
      <div className="flex w-fit justify-self-end justify-center my-2 items-center gap-6 py-2 px-4 bg-secondary rounded-full border border-secondaryBorder">
        <Link to="/" className="navLink" onClick={handleHomeClick}>
          Home
        </Link>
        <Link to="/about" className="navLink">
          Nosotros
        </Link>
        {isLogin ? (
          <>
            <div className="inline-block relative" ref={dropdownRef}>
              <button
                onClick={handleDropdownClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="btnPrimary py-0 px-4 w-fit border-none"
              >
                Tu cuenta
              </button>
              <div
                onClick={handleDropdownClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`z-20 bg-secondary rounded-md w-40 left-[-2rem] top-[2rem] text-center ${
                  showDropdown ? "block" : "hidden"
                }`}
                style={{ position: "absolute" }}
              >
                <div className="dropDownItem">
                  <Link
                    className="navLinkDropdown"
                    onClick={handleOptionClick}
                  >
                    {userData.firstName}
                  </Link>
                </div>
                <div className="dropDownItem border-b-2 border-secondaryBorder">
                  <Link
                    className="navLinkDropdown"
                    to="/tickets"
                    onClick={handleOptionClick}
                  >
                    Mis tickets
                  </Link>
                </div>
                {userData.accessType === "producer" && (
                  <>
                    <div className="dropDownItem">
                      <Link
                        className="navLinkDropdown"
                        to="/create"
                        onClick={handleOptionClick}
                      >
                        Crear evento
                      </Link>
                    </div>
                    <div className="dropDownItem border-b-2 border-secondaryBorder">
                      <Link
                        className="navLinkDropdown"
                        to="/dashboard"
                        onClick={handleOptionClick}
                      >
                        Mis Eventos
                      </Link>
                    </div>
                  </>
                )}
                <div className="dropDownItem">
                  <div
                    onClick={handleSignOut}
                    className="navLinkDropdown"
                  >
                    Cerrar Sesión
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/signin" className="navLink ">
              Iniciar Sesión
            </Link>
            <Link to="/signup" className="navLink">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout()),
    getEventsByName: (name) => dispatch(getEventsByName(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);