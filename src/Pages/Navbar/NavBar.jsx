import React, { useState, useEffect } from 'react';
import styles from './navBar.module.css'
import { FaRegUser } from "react-icons/fa"
import { HiOutlineHome } from "react-icons/hi2";
import DataContext from '@/Context/DataContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import useFunction from '../../hooks/useFunction';



const NavBar = () => {

  const { user, login, messages, setMessages } = useContext(DataContext);
  const { fetchMessages } = useFunction();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messagesArray = await fetchMessages();
        setMessages(messagesArray);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  },[])

  return (
    <div className={styles.navContainer}>
      <Link to='/'>
        <HiOutlineHome className={styles.user_home_icon} title='Home' />
      </Link>
      {
        login ?
            <p className={styles.user_button}>{user?.name}</p>
          :
          <Link to='/login'>
            <FaRegUser className={styles.user_icon} title='Sign In' />
          </Link>

      }
    </div>
  );
}

export default NavBar;
