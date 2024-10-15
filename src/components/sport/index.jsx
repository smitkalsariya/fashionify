// import React, { useState, useMemo } from "react";
// import './sport.scss';
// import categoryApi from '../../categoryApi/categoryApi';
// import Posterimg from '../../assets/image/sport-poster.webp';
// import { BsSearch } from "react-icons/bs";
// import { MdOutlineFavoriteBorder } from 'react-icons/md';
// import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast';

// export default function Sport() {
//     const [searchTerm, setSearchTerm] = useState("");

//     // Handle search input
//     const handleSearch = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     // Filter products based on the search term
//     const filteredProducts = useMemo(() => {
//         if (!categoryApi || !categoryApi[3] || !categoryApi[3].product) {
//             console.error("categoryApi is undefined or empty");
//             return [];
//         }

//         return categoryApi[3].product.filter(
//             (product) =>
//                 product.name &&
//                 product.name.toUpperCase().includes(searchTerm.toUpperCase())
//         );
//     }, [searchTerm]);

//     const openDetails = (id) => {
//         if (id) {
//             localStorage.setItem("id", JSON.stringify(id));
//         }
//     };

//     const handleAddToCart = (id) => {
//         const cartData = JSON.parse(localStorage.getItem("CartData")) || [];

//         if (cartData.find((el) => el === id)) {
//             console.error("Item already in cart");
//             toast.error("Item already in cart");
//         } else {
//             cartData.push(id);
//             localStorage.setItem("CartData", JSON.stringify(cartData));
//             console.log("Item added to cart:", id);
//             toast.success("Item added to cart");
//         }
//     };

//     return (
//         <div className="sport">
//             {/* Poster Section */}
//             <div className="sport-poster">
//                 <img src={Posterimg} alt="Sport Poster" />
//             </div>

//             {/* Search Bar */}
//             <div className="sport-search-main">
//                 <div className="sport-search">
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         className="search-input"
//                         value={searchTerm}
//                         onChange={handleSearch}
//                     />
//                     <p className="sport-search-icon">
//                         <BsSearch />
//                     </p>
//                 </div>
//             </div>

//             {/* Product Grid */}
//             <div className='sport-item'>
//                 <div className='sport-grid'>
//                     {filteredProducts.length > 0 ? (
//                         filteredProducts.map((item) => (
                            
//                             <div> <Link
//                             to={`/product`}
//                             onClick={() => openDetails(item.id)}
//                             key={item.id}
//                             className='sport-card'>
//                                 <div className='sport-img' style={{ backgroundImage: `url(${item.backgroundImage || item.image})` }}>
//                                     <img src={item.image} alt={item.name || "Product"} />
//                                 </div>
//                                 </Link>
//                                 <div className='sport-price-part'>
//                                     <h3 className='sport-title'>{item.name || "Unknown Product"}</h3>
//                                 </div>
//                                 <div className='sport-price-felx'>
//                                     <p className='sport-price'>{item.original_price || "N/A"}</p>
//                                 </div>
//                                 <div className="sport-size">
//                                     <p>S</p><p>M</p><p>L</p><p>XL</p><p>XXL</p><p>XXXL</p>
//                                 </div>
//                                 <div className='add-button'>
//                                     <button className='btn-footwear' onClick={() => handleAddToCart(item.id)}>{item.cart || "Add to Cart"}</button>
//                                     <div className='like-icon'>
//                                         <MdOutlineFavoriteBorder />
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No products found for the search term.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useState, useMemo } from "react";
import './sport.scss';
import categoryApi from '../../categoryApi/categoryApi';
import Posterimg from '../../assets/image/sport-poster.webp';
import { BsSearch } from "react-icons/bs";
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md'; // Added MdFavorite for "added to wishlist" icon
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Sport() {
    const [searchTerm, setSearchTerm] = useState("");
    const [wishlist, setWishlist] = useState(() => {
        // Retrieve wishlist from localStorage when the component loads
        return JSON.parse(localStorage.getItem("wishlistData")) || [];
    });

    // Handle search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter products based on the search term
    const filteredProducts = useMemo(() => {
        if (!categoryApi || !categoryApi[3] || !categoryApi[3].product) {
            console.error("categoryApi is undefined or empty");
            return [];
        }

        return categoryApi[3].product.filter(
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
        const cartData = JSON.parse(localStorage.getItem("CartData")) || [];

        if (cartData.includes(id)) {
            console.error("Item already in cart");
            toast.error("Item already in cart");
        } else {
            cartData.push(id);
            localStorage.setItem("CartData", JSON.stringify(cartData));
            toast.success("Item added to cart");
        }
    };

    // Add or remove item from the wishlist
    const toggleWishlist = (id) => {
        let updatedWishlist = [...wishlist];

        if (updatedWishlist.includes(id)) {
            // If the item is already in the wishlist, remove it
            updatedWishlist = updatedWishlist.filter((itemId) => itemId !== id);
            toast.success("Removed from wishlist");
        } else {
            // Otherwise, add the item to the wishlist
            updatedWishlist.push(id);
            toast.success("Added to wishlist");
        }

        setWishlist(updatedWishlist);
        localStorage.setItem("wishlistData", JSON.stringify(updatedWishlist)); // Update localStorage
    };

    return (
        <div className="sport">
            {/* Poster Section */}
            <div className="sport-poster">
                <img src={Posterimg} alt="Sport Poster" />
            </div>

            {/* Search Bar */}
            <div className="sport-search-main">
                <div className="sport-search">
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <p className="sport-search-icon">
                        <BsSearch />
                    </p>
                </div>
            </div>

            {/* Product Grid */}
            <div className='sport-item'>
                <div className='sport-grid'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                            <div key={item.id} className='sport-card'>
                                <Link
                                    to={`/product`}
                                    onClick={() => openDetails(item.id)}
                                    className='sport-card'>
                                    <div className='sport-img' style={{ backgroundImage: `url(${item.backgroundImage || item.image})` }}>
                                        <img src={item.image} alt={item.name || "Product"} />
                                    </div>
                                </Link>
                                <div className='sport-price-part'>
                                    <h3 className='sport-title'>{item.name || "Unknown Product"}</h3>
                                </div>
                                <div className='sport-price-felx'>
                                    <p className='sport-price'>{item.original_price || "N/A"}</p>
                                </div>
                                <div className="sport-size">
                                    <p>S</p><p>M</p><p>L</p><p>XL</p><p>XXL</p><p>XXXL</p>
                                </div>
                                <div className='add-button'>
                                    <button className='btn-footwear' onClick={() => handleAddToCart(item.id)}>
                                        {item.cart || "Add to Cart"}
                                    </button>
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
