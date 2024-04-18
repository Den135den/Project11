import React, { useState, useEffect } from 'react';
import './Home.css'
const Home = () => {
  const [userData, setUserData] = useState(null);

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


  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  return (
  

    <div className="burger-menu">
    {/* Кнопка бургер-меню */}
    <button className="burger-menu-toggle" onClick={toggleMenu}>
      <span className="burger-menu-icon"></span>
    </button>

    {/* Меню */}
    <div className={`burger-menu-content ${isOpen ? 'open' : ''}`}>
      <ul>
      {userData ? (
            <div>
              
              <p>Ім'я: {userData.username}</p>
              <p>Email: {userData.email}</p>
              <p>Login: {userData.login}</p>
              {/* <img src={} alt="Random image" /> */}
              
              {/* Інші дані користувача */}
            </div>
          ) : (
            <p>Завантаження...</p>
          )}
        {/* Додайте інші пункти меню, які вам потрібно */}
      </ul>
    </div>
    </div>
      );
    };

export default Home;
