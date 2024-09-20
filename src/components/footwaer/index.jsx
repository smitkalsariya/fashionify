import React, { useState, useEffect } from 'react';
import './footwear.scss';
import Img from '../../assets/image/footwear_WEB_BANNER.webp';
import Imgone from '../../assets/image/shoes-1.webp';
import Imgtwo from '../../assets/image/shoes-2.webp';
import Imgthree from '../../assets/image/shoes-3.webp';
import Add from '../../assets/image/shoes-4.webp';
import Imgfour from '../../assets/image/shoes-5.webp';
import Imgfive from '../../assets/image/shoes-6.webp';
import Imgsix from '../../assets/image/shoes-7.webp';
import Imgseven from '../../assets/image/shoes-8.webp';
import Imgeight from '../../assets/image/shoes-10.webp';
import Imgnine from '../../assets/image/shoes-11.webp';
import Imgten from '../../assets/image/shoes-9.webp';
import categoryApi from '../../categoryApi/categoryApi';
import { BsSearch } from 'react-icons/bs';
import { MdOutlineFavoriteBorder } from 'react-icons/md'; // Imported icon directly
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Footwear() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(categoryApi[2].product);

  useEffect(() => {
    const filtered = categoryApi[2].product.filter(
      (product) =>
        product.name && product.name.toUpperCase().includes(searchTerm.toUpperCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const openDetails = (id) => {
    localStorage.setItem("id", id);
    console.log(id);
  };

  const handleAddToCart = (product) => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    if (cartData.find((el) => el.id === product.id)) {
      toast.error('Already added to cart');
    } else {
      cartData.push(product);
      localStorage.setItem('cartData', JSON.stringify(cartData));
      toast.success('Successfully added to cart');
      window.location.reload();
    }
  };

  return (
    <div className='footwear'>
      <div>
        <img src={Img} alt="Footwear Banner" />
      </div>
      <div className='footwear-title'>
        <h3>Handpicked Selections</h3>
      </div>
      <div className='footwear-grid'>
        <div className='footwear-grid-first'>
          <img src={Imgone} alt="Work Smart, Walk Smart" />
          <h3>WORK SMART, WALK SMART</h3>
          <button className='btn-footwear'>Shop Now</button>
        </div>
        <div className='footwear-grid-first'>
          <img src={Imgtwo} alt="Classic Whites" />
          <h3>CLASSIC WHITES</h3>
          <button className='btn-footwear'>Shop Now</button>
        </div>
        <div className='footwear-grid-first'>
          <img src={Imgthree} alt="Rain Ready" />
          <h3>RAIN READY</h3>
          <button className='btn-footwear'>Shop Now</button>
        </div>
      </div>
      <div className='add-part'>
        <img src={Add} alt="Add Banner" />
      </div>
      <div className='shoes-item'>
        <h3>Find Your Style</h3>
      </div>
      <div className='shoes-grid'>
        <div className='shoes-grid-first'>
          <img src={Imgfour} alt="Shoe 4" />
        </div>
        <div className='shoes-grid-first'>
          <img src={Imgfive} alt="Shoe 5" />
        </div>
        <div className='shoes-grid-first'>
          <img src={Imgsix} alt="Shoe 6" />
        </div>
        <div className='shoes-grid-first'>
          <img src={Imgseven} alt="Shoe 7" />
        </div>
        <div className='shoes-grid-first'>
          <img src={Imgeight} alt="Shoe 8" />
        </div>
        <div className='shoes-grid-first'>
          <img src={Imgnine} alt="Shoe 9" />
        </div>
      </div>
      <div className='add-part-two'>
        <img src={Imgten} alt="Add Banner Two" />
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
          <p className="men-search-icon">
            <BsSearch />
          </p>
        </div>
      </div>

      <div className='footwear-shoes-item'>
        <div className='footwear-shoes-grid'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <Link to={`/product`} onClick={() => openDetails(item.id)} key={item.id || `${item.name}-${index}`} className='footwear-shoes-card'>
                <div
                  className='footwear-shoes-img'
                  style={{ backgroundImage: `url(${item.backgroundImage || item.image})` }}
                >
                  <img src={item.image} alt={item.name} />
                </div>
                <div className='shoes-price-part'>
                  <h3 className='shoes-title'>{item.name}</h3>
                </div>
                <div className='shoes-price-felx'>
                  <p className='shoes-price'>{item.discounted_price}</p>
                  <del>{item.original_price}</del>
                  <span>{item.offer}</span>
                </div>
                <div className="shoes-size">
                  <p>UK 7</p><p>UK 8</p><p>UK 9</p><p>UK 10</p>
                </div>
                <div className='add-button'>
                  <button className='btn-footwear' onClick={() => handleAddToCart(item)}>{item.cart}</button>
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
