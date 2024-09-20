import './women.scss';
import Banner from '../../assets/image/w-banner.webp';
import Bannertwo from '../../assets/image/women-banner-two.webp';
import categoryApi from '../../categoryApi/categoryApi';
export default function Women() {
    const category = categoryApi[1].product;
    return (
        <div className='women'>
            <div className='women-banner'>
                <img src={Banner}></img>
            </div>
            <div className='women-banner-two'>
                <img src={Bannertwo}></img>
            </div>

            <div className='Women-item'>
                <div className='Women-grid'>
                    {category.map((item) => (
                        <div key={item.name} className='Women-card'>
                            <div
                                className='Women-img'
                                style={{ backgroundImage: `url(${item.backgroundImage})` }}
                            >
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className='Women-price-part'>
                                <h3 className='Women-title'>{item.name}</h3>
                            </div>
                            <div className='Women-price-felx'>
                                <p className='Women-price'>{item.discounted_price}</p>
                                <del>{item.original_price}</del>
                                <span>{item.offer}</span>
                            </div>
                            <div class="Women-size"><p>39</p><p>40</p><p>42</p><p>44</p><p>46</p></div>
                            <div className='add-button'>
                                <button className='btn-footwear'>{item.cart}</button>
                                <div className='like-icon'>
                                    <item.favicon />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}