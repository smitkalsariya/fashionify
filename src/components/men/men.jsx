
import './men.scss';
import React, { useState, useMemo } from "react";
import Slider from "react-slick";
// import Banner from '../../assets/image/men-banner.webp';
import sale from '../../assets/image/sale.webp';
import nwe from '../../assets/image/new arrlvals.webp';
import shirts from '../../assets/image/shirts.webp';
import polo from '../../assets/image/polo shirts.webp';
import tshirts from '../../assets/image/t-shirts.webp';
import jeans from '../../assets/image/jeans.webp';
import shorts from '../../assets/image/shorts.webp';
import outerwear from '../../assets/image/outerwear.webp';
import shirtbanner from '../../assets/image/shirts banner.webp';
import shirtadd from '../../assets/image/grid-1.webp';
import tshirt from '../../assets/image/grid-2.webp';
import shirtlogo from '../../assets/image/grid-3.webp';
import poster from '../../assets/image/men-poster.webp';
import jenas1 from '../../assets/image/men-jens-1.webp';
import jenas2 from '../../assets/image/men-jens-2.webp';
import jenas3 from '../../assets/image/men-jens-3.webp';
import jenas4 from '../../assets/image/men-jens-4.webp';
import jenas5 from '../../assets/image/men-jens-5.webp';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import categoryApi from '../../categoryApi/categoryApi';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

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
        const cartData = JSON.parse(localStorage.getItem("CartData")) || [];

        if (cartData.find((el) => el === id)) {
            console.error("Item already in cart");
        } else {
            cartData.push(id);
            localStorage.setItem("CartData", JSON.stringify(cartData));
            console.log("Item added to cart:", id);
        }
    };

    // Slider settings
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const slider = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <div className='men'>
            <div className='men-banner'>
                {/* <img src={Banner} alt="Men's Banner" /> */}
            </div>

            {/* Slider Section */}
            <Slider {...settings}>
                <div><img src={sale} alt="Sale Banner" /></div>
                <div><img src={nwe} alt="New Arrivals" /></div>
                <div><img src={shirts} alt="Shirts" /></div>
                <div><img src={polo} alt="Polo Shirts" /></div>
                <div><img src={tshirts} alt="T-Shirts" /></div>
                <div><img src={jeans} alt="Jeans" /></div>
                <div><img src={shorts} alt="Shorts" /></div>
                <div><img src={outerwear} alt="Outerwear" /></div>
            </Slider>

            {/* Shirt Banner */}
            <div className='shirts-banner'>
                <img src={shirtbanner} alt="Shirts Banner" />
            </div>

            {/* Grid Section */}
            <div className='men-grid'>
                <div className='men-grid-first'><img src={shirtadd} alt="Shirt Add" /></div>
                <div className='men-grid-first'><img src={tshirt} alt="T-Shirt Add" /></div>
                <div className='men-grid-first'><img src={shirtlogo} alt="Shirt Logo" /></div>
            </div>

            {/* Poster Section */}
            <div className='poster'>
                <img src={poster} alt="Men's Poster" />
            </div>

            {/* Jeans Slider */}
            <div className='jens-slider'>
                <Slider {...slider}>
                    <div><img src={jenas1} alt="Jeans 1" /></div>
                    <div><img src={jenas2} alt="Jeans 2" /></div>
                    <div><img src={jenas3} alt="Jeans 3" /></div>
                    <div><img src={jenas4} alt="Jeans 4" /></div>
                    <div><img src={jenas5} alt="Jeans 5" /></div>
                </Slider>
            </div>

            {/* Search Bar */}
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
                            <Link
                                to={`/product`}
                                onClick={() => openDetails(item.id)}
                                key={item.id}
                                className='Men-card'>
                                <div className='Men-img' style={{ backgroundImage: `url(${item.backgroundImage || item.image})` }}>
                                    <img src={item.image} alt={item.name || "Product"} />
                                </div>
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
                            </Link>
                        ))
                    ) : (
                        <p>No products found for the search term.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
