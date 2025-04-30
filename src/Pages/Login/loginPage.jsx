import styles from './login.module.css'
import React, { useState, useContext } from 'react';
import DataContext from '@/Context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import { googleProvider, auth } from '../../hooks/firebase_config';
import { signInWithPopup, signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from 'firebase/auth';


const loginPage = () => {

    const { setUser, setLogin, login } = useContext(DataContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState("");

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const newUser = {
                name: userCredential.user.displayName || "No Name",
                email: userCredential.user.email,
                id: userCredential.user.uid
            };
            setUser(newUser);
            setLogin(true);
            setLoginError(`Welcome ${userCredential.user.displayName}`);
            sessionStorage.setItem('loginData', JSON.stringify(newUser));
            navigate('/');

        } catch (err) {
            console.log(err.message);
            const errorCode = err.code;
            const errorMessages = {
                "auth/invalid-credential": "Invalid email or password",
                "auth/user-not-found": "No account found with this email.",
                "auth/wrong-password": "Incorrect password. Try again!",
                "auth/too-many-requests": "Too many failed attempts. Please try again later.",
            };

            setLoginError(errorMessages[errorCode] || "An error occurred. Try again!");
        }
    };

    const logInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const newUser = {
                name: userCredential.user.displayName || "No Name",
                email: userCredential.user.email,
                id: userCredential.user.uid
            };
            setUser(newUser);
            setLoginError(`Welcomme ${userCredential.user.displayName}`)
            setLogin(true)
            sessionStorage.setItem('loginData', JSON.stringify(newUser));
            navigate('/');

        } catch (err) {
            console.log(err.message);
            const errorMatch = err.message.match(/\(auth\/(.*?)\)/);
            setLoginError('Invalid email or password');
            console.log(errorMatch);
        }
    }



    return (
        <main className={styles.page_container}>
            <section className='login-container'>

                <form onSubmit={signIn}>
                    <div>
                        <label htmlFor="email">Email:</label><br />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>
                    <div>
                        <label htmlFor="password">Password:</label><br />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    {loginError && <p className={styles.p}>{loginError}</p>}
                    <button type="submit">Login</button>
                    <button type="button" onClick={logInWithGoogle}>Login with Google</button>

                    <footer className={styles.footer}>
                        <Link to='/registration' >Don't have an account!</Link>
                        <Link to='/forgot-page' >Forgot password or email </Link>
                    </footer>

                </form>

            </section>

        </main>
    );
}

export default loginPage;
