import Img from '../../../assets/image/home.webp';
import './herobanner.scss';

export default function HeroBanner() {
    return (
        <div>
            <div className='banner'>
                <img src={Img} alt="Home banner" />
            </div>
        </div>
    );
}