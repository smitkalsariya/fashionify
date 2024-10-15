import './women.scss';
import React, { useState, useMemo } from 'react';
import Banner from '../../assets/image/w-banner.webp';
import Bannertwo from '../../assets/image/women-banner-two.webp';
import categoryApi from '../../categoryApi/categoryApi';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import toast from 'react-hot-toast';

export default function Women() {
    const [searchTerm, setSearchTerm] = useState("");

    // Log the categoryApi data to check if it's populated
    console.log("categoryApi data:", categoryApi);

    // Handle search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter products based on the search term
    const filteredProducts = useMemo(() => {
        if (!categoryApi || !categoryApi[1] || !categoryApi[1].product) {
            console.error("categoryApi is undefined or empty");
            return [];
        }

        return categoryApi[1].product.filter(
            (product) =>
                product.name && product.name.toUpperCase().includes(searchTerm.toUpperCase())
        );
    }, [searchTerm]);

    // Log the filtered products to check if filtering is working correctly
    console.log("Filtered Products:", filteredProducts);

    const openDetails = (id) => {
        if (id) {
            localStorage.setItem("id", JSON.stringify(id));
        }
    };

    const handleAddToCart = (id) => {
        const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
        if (cartData.includes(id)) {
            console.log('Item already in cart');
            toast.error("Item already in cart");
        } else {
            cartData.push(id);
            localStorage.setItem('cartData', JSON.stringify(cartData));
            console.log('Successfully added to cart');
            toast.success("Successfully added to cart");
        }
    };

    return (
        <div className='women'>
            <div className='women-banner'>
                <img src={Banner} alt="Women Banner" />
            </div>
            <div className='women-banner-two'>
                <img src={Bannertwo} alt="Women Banner Two" />
            </div>

            {/* Search Bar */}
            <div className="women-search-main">
                <div className="women-search">
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <p className="women-search-icon"><BsSearch /></p>
                </div>
            </div>

            {/* Product Grid */}
            <div className='women-item'>
                <div className='women-grid'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                            <div key={item.id}>
                                <Link
                                    to={`/product`}
                                    onClick={() => openDetails(item.id)}
                                    className='women-card'>
                                    <div className='women-img' style={{ backgroundImage: `url(${item.backgroundImage || item.image})` }}>
                                        <img src={item.image} alt={item.name || "Product"} />
                                    </div>
                                </Link>
                                <div className='women-price-part'>
                                    <h3 className='women-title'>{item.name || "Unknown Product"}</h3>
                                </div>
                                <div className='women-price-flex'>
                                    <p className='women-price'>{item.discounted_price || "N/A"}</p>
                                    <del>{item.original_price || "N/A"}</del>
                                    <span>{item.offer || "No offer"}</span>
                                </div>
                                <div className="women-size">
                                    <p>39</p><p>40</p><p>42</p><p>44</p><p>46</p>
                                </div>
                                <div className='add-button'>
                                    <button className='btn-footwear' onClick={() => handleAddToCart(item.id)}>{item.cart || "Add to Cart"}</button>
                                    <div className='like-icon'>
                                        <MdOutlineFavoriteBorder />
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
