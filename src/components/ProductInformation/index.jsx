import React, { useState, useEffect } from 'react';
import categoryApi from '../../categoryApi/categoryApi';
import './ProductInformation.scss';
import { IoChevronBackOutline } from "react-icons/io5";
import toast from 'react-hot-toast';

const ProductPage = () => {
    const [activeTab, setActiveTab] = useState('details');
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        // Fetch product ID from localStorage
        const id = JSON.parse(localStorage.getItem('id'));
        console.log('Product ID from localStorage:', id);

        // Check if categoryApi is available and contains products
        if (!categoryApi || categoryApi.length === 0) {
            console.error('Category API data is missing or invalid.');
            return;
        }

        // Loop through categoryApi to find the product by ID
        let data = null;
        for (let i = 0; i < categoryApi.length; i++) {
            const products = categoryApi[i]?.product || [];
            data = products.find((item) => item.id === id);
            if (data) break;  // Exit loop if product is found
        }

        console.log('Fetched Product Data:', data);

        // Set product data or handle case where no product is found
        if (data) {
            setProductData(data);
        } else {
            console.log('No product found with the given ID.');
        }

        // Optionally, remove the ID from localStorage
        localStorage.removeItem('id');
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const backButton = () => {
        window.history.back(); // Or use a routing method if using a router
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

    if (!productData) {
        return ;  // Show a loading message or spinner
    }

    return (
        <>
            <div className="back-btn">
                <IoChevronBackOutline onClick={backButton} />
            </div>

            <div className="product-page">
                <div className="gallery">
                    <div className="main-image">
                        <img src={productData.image} alt="Product Main" />
                    </div>
                    <div className="thumbnail-images">
                        <img src={productData.image} alt="Product Thumbnail 1" />
                        <img src={productData.image} alt="Product Thumbnail 2" />
                        <img src={productData.image} alt="Product Thumbnail 3" />
                    </div>
                </div>
                <div className="product-info">
                    <h1>{productData.name}</h1>
                    <p className="price">{productData.discounted_price}</p>
                    <p className="description">
                        {productData.description || "No description available."}
                    </p>
                    <div className="size-selection">
                        <label htmlFor="size">Select Size</label>
                        <select id="size">
                            <option value="">Select your size</option>
                            <option value="8">M</option>
                            <option value="9">S</option>
                            <option value="10">L</option>
                            <option value="11">XL</option>
                            <option value="12">XXL</option>
                        </select>
                    </div>
                    <button className="add-to-cart" onClick={() => handleAddToCart(productData.id)}>Add to Cart</button>
                    <div className="tab-container">
                        <button onClick={() => handleTabClick('details')} className={activeTab === 'details' ? 'active' : ''}>
                            Composition & Care
                        </button>
                        <button onClick={() => handleTabClick('reviews')} className={activeTab === 'reviews' ? 'active' : ''}>
                            Reviews
                        </button>
                        <div className="tab-content">
                            {activeTab === 'details' && (
                                <div className="details">
                                    <h3>Composition & Care</h3>
                                    <ul>
                                        <li>| 100% Cotton | Machine wash</li>
                                    </ul>
                                </div>
                            )}
                            {activeTab === 'reviews' && (
                                <div className="reviews">
                                    <h3>Customer Reviews</h3>
                                    <p>No reviews yet.</p>
                                </div>
                            )}
                            <div className='return'>
                                <h3>Return policy</h3>
                                <li>How to return this item: Submit a return request within 15 days of purchasing the product and it will be picked up by us. The product must be unwashed, undamaged, and with tags intact. See FAQs on our Returns Policy for more.</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductPage;
