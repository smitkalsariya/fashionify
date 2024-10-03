

// import './women.scss';
// import Banner from '../../assets/image/w-banner.webp';
// import Bannertwo from '../../assets/image/women-banner-two.webp';
// import categoryApi from '../../categoryApi/categoryApi';
// import { useState, useEffect } from 'react';
// import { BsSearch } from 'react-icons/bs';

// export default function Women() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filteredProducts, setFilteredProducts] = useState(categoryApi[1].product);

//     useEffect(() => {
//         const filtered = categoryApi[1].product.filter(
//             (product) =>
//                 product.name && product.name.toUpperCase().includes(searchTerm.toUpperCase())
//         );
//         setFilteredProducts(filtered);
//     }, [searchTerm]);

//     return (
//         <div className='women'>
//             <div className='women-banner'>
//                 <img src={Banner} alt="Banner" />
//             </div>
//             <div className='women-banner-two'>
//                 <img src={Bannertwo} alt="Banner Two" />
//             </div>
//             <div className="women-search-main">
//                 <div className="women-search">
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         className="search-input"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <p className="women-search-icon">
//                         <BsSearch />
//                     </p>
//                 </div>
//             </div>
//             <div className='women-item'>
//                 <div className='women-grid'>
//                     {filteredProducts.length > 0 ? (
//                         filteredProducts.map((item) => (
//                             <div key={item.name} className='women-card'>
//                                 <div
//                                     className='women-img'
//                                     style={{ backgroundImage: `url(${item.backgroundImage})` }}
//                                 >
//                                     <img src={item.image} alt={item.name} />
//                                 </div>
//                                 <div className='women-price-part'>
//                                     <h3 className='women-title'>{item.name}</h3>
//                                 </div>
//                                 <div className='women-price-flex'>
//                                     <p className='women-price'>{item.discounted_price}</p>
//                                     <del>{item.original_price}</del>
//                                     <span>{item.offer}</span>
//                                 </div>
//                                 <div className="women-size">
//                                     <p>39</p><p>40</p><p>42</p><p>44</p><p>46</p>
//                                 </div>
//                                 <div className='add-button'>
//                                     <button className='btn-footwear'>{item.cart}</button>
//                                     <div className='like-icon'>
//                                         <item.favicon />
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


import './women.scss';
import Banner from '../../assets/image/w-banner.webp';
import Bannertwo from '../../assets/image/women-banner-two.webp';
import categoryApi from '../../categoryApi/categoryApi';
import { useState, useMemo } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { MdOutlineFavoriteBorder } from "react-icons/md";

export default function Women() {
    const [searchTerm, setSearchTerm] = useState("");

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

    const openDetails = (id) => {
        if (id) {
            localStorage.setItem("id", JSON.stringify(id));
        }
    };

    const handleAddToCart = (id) => {
        const cartData = JSON.parse(localStorage.getItem("CartData")) || [];
        if (!cartData.includes(id)) {
            cartData.push(id);
            localStorage.setItem("CartData", JSON.stringify(cartData));
            console.log("Item added to cart:", id);
        } else {
            console.error("Item already in cart");
        }
    };

    return (
        <div className='women'>
            <div className='women-banner'>
                <img src={Banner} alt="Banner" />
            </div>
            <div className='women-banner-two'>
                <img src={Bannertwo} alt="Banner Two" />
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
                            <Link
                                to={`/product`}
                                onClick={() => openDetails(item.id)}
                                key={item.id}
                                className='women-card'>
                                <div className='women-img' style={{ backgroundImage: `url(${item.backgroundImage || item.image})` }}>
                                    <img src={item.image} alt={item.name || "Product"} />
                                </div>
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
