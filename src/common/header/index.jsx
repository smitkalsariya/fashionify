import React, { useState, useEffect } from 'react';
import Logo from "../../assets/logo/Logo.png";
import './header.scss';
import { FaCaretDown, FaRegUser } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import clothesApi from '../../categoryApi/categoryApi';
import { Link } from 'react-router-dom';
import { MdOutlineMenu } from "react-icons/md";

const categoryName = clothesApi;

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);


  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    setCartCount(cartData.length);
  }, []);

  const openNav = () => {
    setIsNavOpen(true);
    document.body.style.overflowY = "hidden";
  };

  const closeNav = () => {
    document.body.style.overflowY = "auto";
    setIsNavOpen(false);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className='header'>
      <div className='container'>


        <div className={`sidenav ${isNavOpen ? "open" : ""}`}>
          <div className="closebtn" onClick={closeNav}>
            &times;
          </div>
          <Link className="menu-item" to={"/"}>Home</Link>
          <div className="menu-item category" onClick={toggleDropdown}>
            Category <FaCaretDown />
          </div>
          <div className={`dropdown-category ${dropdownOpen ? "open" : ""}`}>
            {clothesApi.map((item, index) => (
              <Link to={item.path} key={index} onClick={closeNav}>
                {item.category}
              </Link>
            ))}
          </div>
          <Link className="menu-item" to={"/shop"} onClick={closeNav}>Shop</Link>
          <Link className="menu-item" to={"/profile"} onClick={closeNav}>Profile</Link>
        </div>

        <div className='header-flex'>
          <div className='header-flex-logo'>
            <Link to={'/'}>
              <img src={Logo} alt="USPA Logo" /> 
            </Link>
          </div>
          <div className='header-flex-grid'>
            {categoryName.map((i, index) => (
              <div key={index} className='header-flex-grid-item'>
                <Link to={i.path}>{i.category}</Link>
              </div>
            ))}
          </div>
          <div className='header-flex-grid-page'>
            <div className='header-flex-grid-user'>
              <BiSolidOffer className='header-flex-grid-user-icon-offer' />
            </div>
            <div className='header-flex-grid-user'>
              <FaRegHeart className='header-flex-grid-user-icon' />
            </div>
            <div className='header-flex-grid-user'>
            <FiShoppingCart className='header-flex-grid-user-icon' />
            <Link to={'/cart'}><div className="header-cart-count">{cartCount}</div></Link>
          </div>
          
            <div className='header-flex-grid-user'>
              <Link to={'/Signup'}>
                <FaRegUser className='header-flex-grid-user-icon' />
              </Link>
            </div>
            <div className='header-menu' onClick={openNav}>
              <MdOutlineMenu className='header-menu-icon' />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
