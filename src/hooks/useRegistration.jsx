import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import DataContext from "../Context/DataContext";
import {
    createUserWithEmailAndPassword, updateProfile
} from 'firebase/auth';
import { auth } from '../hooks/firebase_config';
import useFunction from '../../hooks/useFunction';

const useRegistration = () => {
    const { fetchMessages } = useFunction();
    const { setLogin, setUser } = useContext(DataContext)
    const navigation = useNavigate()
   

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let validationErrors = {};
        if (!formData.username.trim()) {
            validationErrors.username = "Incorrect Username.";
        }
        if (!formData.email) {
            validationErrors.email = "Require email.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Invalid email.";
        }
        if (!formData.password) {
            validationErrors.password = "Require password.";
        } else if (formData.password.length < 6) {
            validationErrors.password = "Pass must have 6 character.";
        }
        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = "Incorrect pass.";
        }
        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

        } else {
            try {

                setErrors({});

               // if (checkForMach(formData)) { return }

                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                await updateProfile(userCredential.user, {
                    displayName: formData.username,  // Запазваме потребителското име
                });

                setUser({
                    name: userCredential.user.displayName || "No Name",
                    email: userCredential.user.email,
                    id: userCredential.user.uid,
                    userName: userCredential.user.displayName,
                })
                setSuccessMessage("Successful registration!");
             
                setShowPassword(false)
                setLogin(true)
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                

                setTimeout(() => {
                    navigation('/')
                    setSuccessMessage("");
                }, 1000)
            } catch (err) {
                const message = err.code.slice(5)
                setSuccessMessage(message)
                setFormData({
                    username: formData.username,
                    email: "",
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                });
                console.log(err.message);
                
            }
        }
    };


    return {
        errors, successMessage, showPassword,
        handleChange, handleSubmit, setShowPassword,
        formData
    }
}

export default useRegistration;