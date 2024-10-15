import './men.scss';
import React, { useState, useMemo, useEffect } from "react";
import shirtbanner from '../../assets/image/shirts banner.webp';
import poster from '../../assets/image/men-poster.webp';
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import categoryApi from '../../categoryApi/categoryApi';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Men() {
    const [searchTerm, setSearchTerm] = useState("");
    const [wishlist, setWishlist] = useState(() => {
        // Retrieve wishlist from localStorage when the component loads
        return JSON.parse(localStorage.getItem("wishlistData")) || [];
    });

    // Sync wishlist with local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("wishlistData", JSON.stringify(wishlist));
    }, [wishlist]);

    // Handle search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter products based on the search term
    const filteredProducts = useMemo(() => {
        if (!categoryApi || !categoryApi[0] || !categoryApi[0].product) {
            console.error("categoryApi is undefined or empty");
            return [];
        }

        return categoryApi[0].product.filter(
            (product) =>
                product.name &&
                product.name.toUpperCase().includes(searchTerm.toUpperCase())
        );
    }, [searchTerm]);

    const openDetails = (id) => {
        if (id) {
            localStorage.setItem("id", JSON.stringify(id));
        }
    };

    const handleAddToCart = (id) => {
        const cartData = JSON.parse(localStorage.getItem('CartData')) || [];
        if (cartData.includes(id)) {
            console.error('Item already in cart'); // Error handling
            toast.error("Item already in cart");
        } else {
            cartData.push(id);
            localStorage.setItem('CartData', JSON.stringify(cartData));
            console.log('Successfully added to cart'); // Success handling
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
        <div className='men'>
            <div className='shirts-banner'>
                <img src={shirtbanner} alt="Shirts Banner" />
            </div>

            <div className='poster'>
                <img src={poster} alt="Men's Poster" />
            </div>

            <div className="men-search-main">
                <div className="men-search">
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <p className="men-search-icon"><BsSearch /></p>
                </div>
            </div>

            {/* Product Grid */}
            <div className='Men-item'>
                <div className='Men-grid'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                            <div key={item.id}>
                                <Link
                                    to={`/product`}
                                    onClick={() => openDetails(item.id)}
                                    className='Men-card'>
                                    <div className='Men-img' style={{ backgroundImage: `url(${item.backgroundImage || item.image})` }}>
                                        <img src={item.image} alt={item.name || "Product"} />
                                    </div>
                                </Link>
                                <div className='Men-price-part'>
                                    <h3 className='Men-title'>{item.name || "Unknown Product"}</h3>
                                </div>
                                <div className='Men-price-felx'>
                                    <p className='Men-price'>{item.discounted_price || "N/A"}</p>
                                    <del>{item.original_price || "N/A"}</del>
                                    <span>{item.offer || "No offer"}</span>
                                </div>
                                <div className="Men-size">
                                    <p>39</p><p>40</p><p>42</p><p>44</p><p>46</p>
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
