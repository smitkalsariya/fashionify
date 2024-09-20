import React, { useEffect, useState } from 'react';
import './backtotop.scss';
function BackToTop() {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <button
        className={`backtotop ${showButton ? 'show' : ''}`}
        onClick={scrollToTop}
      >
        ↑
      </button>
    </>
  );
}
export default BackToTop;