import React from 'react';
import './footer.scss';
import Insta from '../../assets/icon/white-insta.svg'
import Fac from '../../assets/icon/white-facebook.svg';
import Twi from  '../../assets/icon/white-twitter.svg'
export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer-bg'>
        <div className='footer-grid'>
          <div className='footer-sec'>
            <h3>Policies</h3>
            <div>
              <a>Terms and Conditions</a>
            </div>
            <div>
              <a>Delivery & Shipping</a>
            </div>
            <div>
              <a>Return Policy</a>
            </div>
            <div>
              <a>Privacy Policy</a>
            </div>
            <div>
              <a>Frequently Asked Questions</a>
            </div>
          </div>
          <div className='footer-sec-2'>
            <h3>Let Us Help You</h3>
            <div>
              <a>Contact Us</a>
            </div>
          </div>
          <div className='footer-sec-3'>
            <h3>About Us</h3>
              <div>
                <a>Our Story</a>
              </div>
          </div>
          <div className='footer-sec-4'>
            <h3>Follow Us</h3>
            <div className='footer-sec-4-icon'>
              <img src={Insta} alt="Instagram"></img>
              <img src={Fac} alt="Facebook"></img>
              <img src={Twi} alt="Twitter"></img>
            </div>
          <div>
            <h3>Connect</h3>
            </div>
            <p>Join our mailing list for updates</p>
            <div className='footer-singup'>
            <input type="email" name="contact[email]" id="footer-EMAIL" placeholder="Enter Email Address"></input>
            <input type="submit" id="footer-subscribe" value="Join"></input>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  )
}
