import React from 'react';
import { Link } from 'react-router-dom';
//import useRegistration from '../../hooks/useRegistration';
import '../Login/login.css'
import useRegistration from '@/hooks/useRegistration';


const Registration = () => {

    const { errors, successMessage, showPassword,
        handleChange, handleSubmit, setShowPassword, formData
    } = useRegistration()

    return (
        <main className='page_container_login'>

            {successMessage && <h3 className='message'>{successMessage}</h3>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label><br />
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder='Username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label><br />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label><br />
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm password:</label><br />
                    <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder='Confirm password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <p style={{ color: "red" }}>{errors.confirmPassword}</p>
                    )}
                    <div >
                        <div className='shown_pass'>
                            <label htmlFor="showPassword" >Shown pass:</label>
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                        </div>

                    </div>
                    {errors.read && <p style={{ color: "red", textAlign: 'end' }}>{errors.read}</p>}
                </div>
                <button type="submit">Create Account</button>
                <Link to='/login'>I have account</Link>
            </form>


        </main>
    );
}

export default Registration;
