import React from 'react';
import './footer.scss';
import Insta from '../../assets/icon/white-insta.svg'
import Fac from '../../assets/icon/white-facebook.svg';
import Twi from  '../../assets/icon/white-twitter.svg'

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-bg'>
        <div className='footer-grid'>
          <div className='footer-sec'>
            <h3>Policies</h3>
            <div>
              <a href="/terms-and-conditions">Terms and Conditions</a>
            </div>
            <div>
              <a href="/delivery-and-shipping">Delivery & Shipping</a>
            </div>
            <div>
              <a href="/return-policy">Return Policy</a>
            </div>
            <div>
              <a href="/privacy-policy">Privacy Policy</a>
            </div>
            <div>
              <a href="/faq">Frequently Asked Questions</a>
            </div>
          </div>
          <div className='footer-sec-2'>
            <h3>Let Us Help You</h3>
            <div>
              <a href="/contact-us">Contact Us</a>
            </div>
          </div>
          <div className='footer-sec-3'>
            <h3>About Us</h3>
              <div>
                <a href="/our-story">Our Story</a>
              </div>
          </div>
          <div className='footer-sec-4'>
            <h3>Follow Us</h3>
            <div className='footer-sec-4-icon'>
              {/* Social media links */}
            </div>
            <div>
              <h3>Connect</h3>
            </div>
            <p>Join our mailing list for updates</p>
            <form className='footer-signup' onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                name="contact[email]" 
                id="footer-EMAIL" 
                placeholder="Enter Email Address" 
                aria-label="Email address for newsletter" 
              />
              <button 
                type="submit" 
                id="footer-subscribe" 
                aria-label="Subscribe to newsletter"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}

