import React from 'react';
import style from './Footer.module.css';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSignHanging } from '@fortawesome/free-solid-svg-icons';


function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.links}>
          <div className={style.linksWrapper}>
            <div className={style.linkItems}>
              <h2>About Us</h2>
              <Link to='/'>How it works</Link>
              <Link to='/'>Testimonials</Link>
              <Link to='/'>Careers</Link>
              <Link to='/'>Investors</Link>
              <Link to='/'>Terms of Service</Link>
            </div>
            <div className={style.linkItems}>
              <h2>Contact Us</h2>
              <Link to='/'>Contact</Link>
              <Link to='/'>Support</Link>
              <Link to='/'>Destinations</Link>
              <Link to='/'>Sponsorships</Link>
            </div>
        
            <div className={style.linkItems}>
              <h2>Videos</h2>
              <Link to='/'>Submit Video</Link>
              <Link to='/'>Ambassadors</Link>
              <Link to='/'>Agency</Link>
              <Link to='/'>Influencer</Link>
            </div>
            <div className={style.linkItems}>
              <h2>Social Media</h2>
              <Link >Instagram</Link>
              <Link to='/'>Facebook</Link>
              <Link to='/'>Youtube</Link>
              <Link to='/'>Twitter</Link>
              <Link to='/'>LinkedIn</Link>
            </div>
          </div>
        </div>
        <section className={style.socialMedia}>
          <div className={style.socialMediaWrapper}>
            <div className={style.logo}>
              <Link to='/' className={style.socialLogo}>
                Home Findr
                <FontAwesomeIcon icon={faSignHanging} className={style.iconLogo} />
              </Link>
            </div>
            <small className={style.websiteRights}>Home Findr © 2023</small>
            
            <div className={style.socialIcons}>
              <Link
                to='http://facebook.com'
                target='_blank'
                aria-label='Facebook'
              >
                <i className='fab fa-facebook-f' />
              </Link>
              <Link
                to='http://instagram.com'
                target='_blank'
                aria-label='Instagram'
              >
                <i className='fab fa-instagram' />
              </Link>
              <Link
                to='http://youtube.com'
                target='_blank'
                aria-label='Youtube'
              >
                <i className='fab fa-youtube' />
              </Link>
              <Link
                to='https://twitter.com/'
                target='_blank'
                aria-label='Twitter'
              >
                <i className='fab fa-twitter' />
              </Link>
              <Link
                to='http://linkedin.com'
                target='_blank'
                aria-label='LinkedIn'
              >
                <i className='fab fa-linkedin' />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
