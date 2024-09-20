import React, { useState } from 'react';
import categoryApi from '../../categoryApi/categoryApi';
import '../../components/ProductInformation/ProductInformation.scss';
import { IoChevronBackOutline } from "react-icons/io5";

const Cart = () => {
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cartData")) || []
  );

  // Combine all products from different indices of categoryApi
  const products = categoryApi.reduce((acc, category) => {
    return acc.concat(category.product || []);
  }, []);

  // Filter products based on cartData
  const data = products.filter((item) => cartData.includes(item.id));

  // Function to handle removing item from the cart
  const handleRemove = (id) => {
    const updatedCart = cartData.filter((cartItemId) => cartItemId !== id);
    setCartData(updatedCart);
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
  };

  return (
    <>
      {/* Check if there are any items in the cart */}
      {data.length === 0 ? (
        <p className='empty'>Your cart is empty.</p>
      ) : (
        data.map((item, i) => (
          <div key={i} className="product-page">
            {/* Product Gallery Section */}
            <div className="gallery">
              <div className="main-image">
                <img src={item.image} alt="Product Main" />
              </div>
              <div className="thumbnail-images">
                <img src={item.image} alt="Product Thumbnail 1" />
                <img src={item.image} alt="Product Thumbnail 2" />
                <img src={item.image} alt="Product Thumbnail 3" />
              </div>
            </div>

            {/* Product Info Section */}
            <div className="product-info">
              <h1>{item.name}</h1>
              <p className="price">{item.discounted_price}</p>
              <p className="description">
                {item.description || "No description available."}
              </p>

              {/* Size Selection */}
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

              {/* Order and Remove Buttons */}
              <button className="add-to-cart">Order Now</button>
              <button className="remove-from-cart" onClick={() => handleRemove(item.id)}>Remove from Cart</button>

              {/* Product Details and Reviews Tabs */}
              <div className="tab-container">
                <button>Composition & Care</button>
                <button>Reviews</button>
                <div className="tab-content">
                  <div className="details">
                    <h3>Composition & Care</h3>
                    <ul>
                      <li>| 100% Cotton | Machine wash</li>
                    </ul>
                  </div>
                  <div className="reviews">
                    <h3>Customer Reviews</h3>
                    <p>No reviews yet.</p>
                  </div>
                  <div className="return">
                    <h3>Return policy</h3>
                    <li>Submit a return request within 15 days. The product must be unwashed, undamaged, and with tags intact.</li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Cart;
