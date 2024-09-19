// HeaderContent.js
import React from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
 const HeaderContent = ({
 

  

  isHidden,
  isSticky,
  headerRef,
  toggleMenu,
  isMenuOpen,
  selectedNavItem,
  handleNavClick,
  handlelogout,
  setUserAuth,
  userauth,
  handlenavigate,
  cartlength

}
 

   ) => {
    const naviagte = useNavigate()
  return (
    <header
      ref={headerRef}
  
      className={` header ${isHidden ? 'header--hidden' : ''}  ${isSticky ? 'header--sticky' : ''}`}
    >
      <div className='header-left'>
        <div className='logo'>Hair Cycles</div>
        <div className='nav-links'>
          <a href='#shop'>Shop</a>
          <a href='#read'>Read</a>
          <a href='#stores'>Stores</a>
        </div>
        <button className='search-button'>
          <FaSearch />
        </button>
      </div>

      <div className='header-right'>
        <div className='user-icons'>
        {!userauth ? 
        <Link to="/login"><a>Login</a></Link>
        : <a style={{cursor:'pointer'}}
        onClick={handlelogout }>Logout</a> }

          <a href='#read'>Cabinet</a>
  <Link to="/cart"><a>Cart {cartlength ? <small style={{color :"green"}} >{cartlength}</small> :''} </a></Link>
        </div>
        <FaBars className='menu-icon' onClick={toggleMenu} />
      </div>
      {/* className={`header ${isHidden ? 'header--hidden' : ''} ${isSticky ? 'header--sticky' : ''}`} */}
      <div className={`mobile-menu-content ${isMenuOpen ? 'open' : 'close'}`}>
        <IoMdClose className='close-icon' onClick={toggleMenu} />
        <div className='mobile-nav-links'>
          
          <Link to='/'
  
            className={selectedNavItem === 'home' ? 'selected' : ''}
            onClick={() => handleNavClick('home')}
          
>
            Home
            </Link>

            <Link to='/cart'
            className={selectedNavItem === 'cart' ? 'selected' : ''}
            onClick={() => handleNavClick('cart')}
          >
           Cart {cartlength ? <small style={{color :"green"}} >{cartlength}</small> :''}
          </Link>
        
          <a
            href='#shop'
            className={selectedNavItem === 'shop' ? 'selected' : ''}
            onClick={() => handleNavClick('shop')}
          >
            Shop
          </a>

   {!userauth ? 
          <a
          style={{cursor:'pointer'}}
            className={selectedNavItem === 'Login' ? 'selected' : ''}
            onClick={() => naviagte('/login')}
          >
            Login
          </a>
          :
          <a
           style={{cursor:'pointer'}}
            onClick={handlelogout }
          >
            Logout
          </a>
   }

          <a
            href='#stores'
            className={selectedNavItem === 'stores' ? 'selected' : ''}
            onClick={() => handleNavClick('stores')}
          >
            Stores
          </a>
          <a
            href='#user'
            className={selectedNavItem === 'user' ? 'selected' : ''}
            onClick={() => handleNavClick('user')}
          >
            User
          </a>
          <a
         
            className={selectedNavItem === 'cabinet' ? 'selected' : ''}
            onClick={() => handleNavClick('cabinet')}
          >
           cabinet
          </a>
      
         
        </div>
      </div>
    </header>
  );
};


export default HeaderContent