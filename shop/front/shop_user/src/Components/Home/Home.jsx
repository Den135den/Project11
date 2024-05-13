import React, { useState, useEffect } from 'react';
import Logo from '../img/Logo.png'
import './Home.css'

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [modalClose, SetShowModal] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true); 
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    
    if (authToken) {
      fetch('http://localhost:5000/api', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        console.error('Помилка при отриманні даних користувача:', error);
      });
    }
  }, []);



  const getBackgroundColor = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16); // Генерація випадкового кольору
    return `#${randomColor}`;
  };

  const getInitials = () => {
    if (userData && userData.username) {
      const username = userData.username.trim();
      return username.charAt(0).toUpperCase(); // Перша буква логіна
    }
    return '';
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    SetShowModal(true);
    setButtonVisible(false); 
  };

  const close =  () =>{
    setIsOpen(false) 
    setButtonVisible(true)
  }

  return (
    <div>
      {buttonVisible && ( 
        <div>
          <button className="burger-menu burger-menu-toggle" onClick={toggleMenu}>
            <span className="burger-menu-icon"></span>
          </button>
        </div>
      )}

      <div className={`burger-menu-content ${isOpen ? 'open' : ''}`}>
          {modalClose &&
            <span className="close" onClick={close}>
              &times;
            </span>
          }
         
          {userData ? (
            <div>
    
              <img src={Logo} alt='logo' className='logo' />
              <div className="main-block">
                <div className='backgroundItems'>
                  <div className="content-width">
                    <div className="user-icon"  style={{backgroundColor: getBackgroundColor()}}>
                    {getInitials()}
                    </div>
                  </div>
                  <div className="data-user">
                    <div className='data-style-login'>{userData.username} {userData.login}</div>
                    <div>{userData.email}</div>
                  </div>
                </div>              
              </div>
            </div>
          ) : (
            <p>Завантаження...</p>
          )}
        
      </div>
    </div>
  );
};

export default Home;
