
// import React, { useState } from "react";
// import './sport.scss';
// import categoryApi from '../../categoryApi/categoryApi';
// import Posterimg from '../../assets/image/sport-poster.webp';
// import { BsSearch } from "react-icons/bs";
// import { MdOutlineFavoriteBorder } from 'react-icons/md'; // Example of using a different icon if needed

// export default function Sport() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState(categoryApi[3].product);

//   const handleSearch = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     const filtered = categoryApi[3].product.filter(
//       (product) =>
//         product.name && product.name.toUpperCase().includes(term.toUpperCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   return (
//     <div className="sport">
//       {/* <div className="sport-poster-img"> */}
//         {/* <img src={Posterimg} alt="Sport Poster" /> */}
//       {/* </div> */}
//       <div className="men-search-main">
//         <div className="men-search">
//           <input
//             type="text"
//             placeholder="Search"
//             className="search-input"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <p className="men-search-icon">
//             <BsSearch />
//           </p>
//         </div>
//       </div>
//       <div className='sport-item'>
//         <div className='sport-grid'>
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((item) => (
//               <div key={item.name} className='sport-card'>
//                 <div
//                   className='sport-img'
//                   style={{ backgroundImage: `url(${item.backgroundImage})` }}
//                 >
//                   <img src={item.image} alt={item.name} />
//                 </div>
//                 <div className='sport-price-part'>
//                   <h3 className='sport-title'>{item.name}</h3>
//                 </div>
//                 <div className='sport-price-felx'>
//                   <p className='sport-price'>{item.original_price}</p>
//                 </div>
//                 <div className="sport-size">
//                   <p>S</p><p>M</p><p>L</p><p>XL</p><p>XXL</p><p>XXXL</p>
//                 </div>
//                 <div className='add-button'>
//                   <button className='btn-footwear'>{item.cart}</button>
//                   <div className='like-icon'>
//                     <MdOutlineFavoriteBorder />
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No products found for the search term.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useMemo } from "react";
import './sport.scss';
import categoryApi from '../../categoryApi/categoryApi';
import Posterimg from '../../assets/image/sport-poster.webp';
import { BsSearch } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function Sport() {
    const [searchTerm, setSearchTerm] = useState("");

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

        if (cartData.find((el) => el === id)) {
            console.error("Item already in cart");
        } else {
            cartData.push(id);
            localStorage.setItem("CartData", JSON.stringify(cartData));
            console.log("Item added to cart:", id);
        }
    };

    return (
        <div className="sport">
            {/* Poster Section */}
            {/* <div className="poster">
                <img src={Posterimg} alt="Sport Poster" />
            </div> */}

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
                    <p className="men-search-icon">
                        <BsSearch />
                    </p>
                </div>
            </div>

            {/* Product Grid */}
            <div className='sport-item'>
                <div className='sport-grid'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                            <Link
                                to={`/product`}
                                onClick={() => openDetails(item.id)}
                                key={item.id}
                                className='sport-card'>
                                <div className='sport-img' style={{ backgroundImage: `url(${item.backgroundImage || item.image})` }}>
                                    <img src={item.image} alt={item.name || "Product"} />
                                </div>
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
