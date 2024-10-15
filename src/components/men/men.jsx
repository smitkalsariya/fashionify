
import './men.scss';
import React, { useState, useMemo } from "react";
import shirtbanner from '../../assets/image/shirts banner.webp';
import poster from '../../assets/image/men-poster.webp';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import categoryApi from '../../categoryApi/categoryApi';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Men() {
    const [searchTerm, setSearchTerm] = useState("");

    // Log the categoryApi data to check if it's populated
    console.log("categoryApi data:", categoryApi);

    // Handle search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter products based on the search term
    const filteredProducts = useMemo(() => {
        // If categoryApi is undefined or empty, return an empty array
        if (!categoryApi || !categoryApi[0] || !categoryApi[0].product) {
            console.error("categoryApi is undefined or empty");
            return [];
        }

        // Filter the products based on the search term
        return categoryApi[0].product.filter(
            (product) =>
                product.name &&
                product.name.toUpperCase().includes(searchTerm.toUpperCase())
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
            console.log('Item already in cart'); // Error handling
            toast.error("Item already in cart");
        } else {
            cartData.push(id);
            localStorage.setItem('cartData', JSON.stringify(cartData));
            console.log('Successfully added to cart'); // Success handling
            toast.success("Successfully added to cart");
        }
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

                            <div>
                                <Link
                                    to={`/product`}
                                    onClick={() => openDetails(item.id)}
                                    key={item.id}
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
