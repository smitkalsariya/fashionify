
import React, { useState } from "react";
import './sport.scss';
import categoryApi from '../../categoryApi/categoryApi';
import Posterimg from '../../assets/image/sport-poster.webp';
import { BsSearch } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from 'react-icons/md'; // Example of using a different icon if needed

export default function Sport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(categoryApi[3].product);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = categoryApi[3].product.filter(
      (product) =>
        product.name && product.name.toUpperCase().includes(term.toUpperCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="sport">
      {/* <div className="sport-poster-img"> */}
        {/* <img src={Posterimg} alt="Sport Poster" /> */}
      {/* </div> */}
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
      <div className='sport-item'>
        <div className='sport-grid'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div key={item.name} className='sport-card'>
                <div
                  className='sport-img'
                  style={{ backgroundImage: `url(${item.backgroundImage})` }}
                >
                  <img src={item.image} alt={item.name} />
                </div>
                <div className='sport-price-part'>
                  <h3 className='sport-title'>{item.name}</h3>
                </div>
                <div className='sport-price-felx'>
                  <p className='sport-price'>{item.original_price}</p>
                </div>
                <div className="sport-size">
                  <p>S</p><p>M</p><p>L</p><p>XL</p><p>XXL</p><p>XXXL</p>
                </div>
                <div className='add-button'>
                  <button className='btn-footwear'>{item.cart}</button>
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
