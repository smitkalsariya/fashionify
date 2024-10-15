import React, { useState, useEffect } from "react";
// import './wishlist.scss';
import './wishlist.scss';
import categoryApi from '../../categoryApi/categoryApi';
import { Link } from 'react-router-dom';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import toast from 'react-hot-toast';

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from localStorage when the component mounts
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlistData")) || [];
        setWishlist(storedWishlist);
    }, []);

    // Get all products from categoryApi
    const allProducts = categoryApi.flatMap(category => category.product);

    // Filter products that are in the wishlist
    const wishlistProducts = allProducts.filter((product) => wishlist.includes(product.id));

    const handleRemoveFromWishlist = (id) => {
        const updatedWishlist = wishlist.filter(itemId => itemId !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlistData", JSON.stringify(updatedWishlist));
        toast.success("Removed from wishlist");
    };

    return (
        <div className="wishlist-page">
            <h2>Your Wishlist</h2>
            {wishlistProducts.length > 0 ? (
                <div className="wishlist-grid">
                    {wishlistProducts.map((item) => (
                        <div key={item.id} className="wishlist-card">
                            <div className="card-image">
                                <img src={item.image} alt={item.name || "Product"} />
                            </div>
                            <div className="card-content">
                                <h3>{item.name || "Unknown Product"}</h3>
                                <p className="price">{item.original_price || "N/A"}</p>
                                <div className="card-actions">
                                   
                                    <button 
                                        className="remove-btn"
                                        onClick={() => handleRemoveFromWishlist(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your wishlist is empty. Start adding some items!</p>
            )}
        </div>
    );
}
