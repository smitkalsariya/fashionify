import Img from '../../../assets/image/home.png';
import './herobanner.scss';
export default function HeroBanner() {

    return (
        <div>
            <div className='banner'>
                <img src={Img}></img>
            </div>
        </div>
    )
}