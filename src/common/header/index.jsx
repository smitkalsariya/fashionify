import React, { useState, useEffect } from 'react';
import Logo from "../../assets/logo/Logo.webp";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
      setCartCount(cartData.length);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartChange', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartChange', updateCartCount);
    };
  }, []);

  const openNav = () => {
    setIsNavOpen(true);
    document.body.style.overflowY = "hidden";
  };

  const closeNav = () => {
    document.body.style.overflowY = "auto";
    setIsNavOpen(false);
  };

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
            <Link to={'/'} aria-label="Home">
              <img src={Logo} alt="USPA Logo" width="150" height="50" /> 
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
              {/* <Link to="/offers" aria-label="Offers">
                <BiSolidOffer className='header-flex-grid-user-icon-offer' />
              </Link> */}
            </div>
            <div className='header-flex-grid-user'>
              <Link to="/wishlist" aria-label="Wishlist">
                <FaRegHeart className='header-flex-grid-user-icon' />
              </Link>
            </div>
            <div className='header-flex-grid-user'>
              <Link to='/cart' aria-label={`Shopping Cart (${cartCount} items)`}>
                <FiShoppingCart className='header-flex-grid-user-icon' />
                <div className="header-cart-count">{cartCount}</div>
              </Link>
            </div>
            <div className='header-flex-grid-user'>
              <Link to='/Signup' aria-label="User Profile">
                <FaRegUser className='header-flex-grid-user-icon' />
              </Link>
            </div>
            <button 
            className='header-menu' onClick={openNav} aria-label="Open Navigation Menu">
              <MdOutlineMenu className='header-menu-icon' />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
