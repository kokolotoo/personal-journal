import React from 'react';
import styles from './homePage.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '@/hooks/firebase_config';
import { useContext, useState } from 'react';
import DataContext from '@/Context/DataContext';

const HomeWithLogin = () => {
    const { setUser, setLogin } = useContext(DataContext);
    const navigate = useNavigate();

    const handleExit = async () => {
        try {
            await signOut(auth);
            setUser(null)
            navigate('/')
            setLogin(false)
            sessionStorage.removeItem('loginData')
        } catch (err) {
            console.log(err.message);
        }
    }

    return (

        <ul className={styles.login_container}>
            <li><Link to='/task'>Task List</Link></li>
            <li><Link to='/notes'>Notes</Link></li>
            <li><Link to='/calendar'>Calendar</Link></li>
            <li><Link to='/topic'>Topics</Link></li>
            <li onClick={handleExit}>Exit</li>
        </ul>

    );
}

export default HomeWithLogin;
