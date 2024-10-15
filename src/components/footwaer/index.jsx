import './footwear.scss';
import React, { useState, useMemo, useEffect } from 'react';
import Img from '../../assets/image/footwear_WEB_BANNER.webp';
import Add from '../../assets/image/shoes-4.webp';
import categoryApi from '../../categoryApi/categoryApi';
import { BsSearch } from 'react-icons/bs';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md'; // Imported icon for wishlist
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Footwear() {
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState(() => {
    // Retrieve wishlist from localStorage when the component loads
    return JSON.parse(localStorage.getItem("wishlistData")) || [];
  });

  // Sync wishlist with local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlistData", JSON.stringify(wishlist));
  }, [wishlist]);

  // Log the categoryApi data to check if it's populated
  console.log("categoryApi data:", categoryApi);

  // Filter products based on the search term using useMemo for optimization
  const filteredProducts = useMemo(() => {
    if (!categoryApi || !categoryApi[2] || !categoryApi[2].product) {
      console.error("categoryApi is undefined or empty");
      return [];
    }
    return categoryApi[2].product.filter(
      (product) =>
        product.name && product.name.toUpperCase().includes(searchTerm.toUpperCase())
    );
  }, [searchTerm]);

  // Log the filtered products to check if filtering is working correctly
  console.log("Filtered Products:", filteredProducts);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openDetails = (id) => {
    if (id) {
      localStorage.setItem("id", JSON.stringify(id));
    }
  };

  const handleAddToCart = (id) => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    if (cartData.includes(id)) {
      toast.error("Item already in cart");
    } else {
      cartData.push(id);
      localStorage.setItem('cartData', JSON.stringify(cartData));
      toast.success("Successfully added to cart");
    }
  };

  // Add or remove item from the wishlist
  const toggleWishlist = (id) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.includes(id)
        ? prevWishlist.filter((itemId) => itemId !== id) // Remove item from wishlist
        : [...prevWishlist, id]; // Add item to wishlist
      
      toast.success(prevWishlist.includes(id) ? "Removed from wishlist" : "Added to wishlist");
      return updatedWishlist;
    });
  };

  return (
    <div className='footwear'>
      <div>
        <img src={Img} alt="Footwear Banner" />
      </div>

      <div className='footwear-title'>
        <h3>Handpicked Selections</h3>
      </div>

      <div className='add-part'>
        <img src={Add} alt="Add Banner" />
      </div>

      <div className='shoes-item'>
        <h3>Find Your Style</h3>
      </div>

      <div className='men-search-main'>
        <div className="men-search">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
          <p className="men-search-icon">
            <BsSearch />
          </p>
        </div>
      </div>

      <div className='footwear-shoes-item'>
        <div className='footwear-shoes-grid'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item.id}>
                <Link to={`/product`} onClick={() => openDetails(item.id)} className='footwear-shoes-card'>
                  <div className='footwear-shoes-img' style={{ backgroundImage: `url(${item.backgroundImage || item.image})` }}>
                    <img src={item.image} alt={item.name || "Product"} />
                  </div>
                </Link>
                <div className='shoes-price-part'>
                  <h3 className='shoes-title'>{item.name || "Unknown Product"}</h3>
                </div>
                <div className='shoes-price-felx'>
                  <p className='shoes-price'>{item.discounted_price || "N/A"}</p>
                  <del>{item.original_price || "N/A"}</del>
                  <span>{item.offer || "No offer"}</span>
                </div>
                <div className="shoes-size">
                  <p>UK 7</p><p>UK 8</p><p>UK 9</p><p>UK 10</p>
                </div>
                <div className='add-button'>
                  <button className='btn-footwear' onClick={() => handleAddToCart(item.id)}>{item.cart || "Add to Cart"}</button>
                  <div className='like-icon' onClick={() => toggleWishlist(item.id)}>
                    {wishlist.includes(item.id) ? (
                      <MdFavorite className="wishlist-icon active" /> // Filled heart when in wishlist
                    ) : (
                      <MdOutlineFavoriteBorder className="wishlist-icon" /> // Empty heart when not in wishlist
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found for the search term.</p>
          )}
        </div>
      </div>
    </div>
  );
}
