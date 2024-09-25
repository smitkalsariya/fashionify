import { useEffect } from 'react';
import Img from '../../../assets/image/home.webp';
import './herobanner.scss';

export default function HeroBanner() {
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = Img;
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return (
        <div>
            <div className='banner'>
                <img src={Img} alt="Home banner" />
            </div>
        </div>
    );
}