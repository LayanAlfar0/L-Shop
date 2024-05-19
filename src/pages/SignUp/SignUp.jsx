import React, { useState } from 'react'
import './SignUp.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { object, string } from 'yup';
import swal from 'sweetalert';

export default function SignUp() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const validateData = async () => {
        let userSchema = object({
            userName: string().min(5, 'user name Should Contain at least 5 Characters').max(20, 'userName Should Contain maximum 20 Characters').required('this field is required '),
            password: string().required('this field is required ').min(8, 'password Should Contain at least 8 Characters').max(20, 'password Should Contain maximum 20 Characters'),
            email: string().email('invalid email').required('this field is required '),
            phone: string(),
            address: string(),
            image: string().required('this field is required '),
        });
        try {
            await userSchema.validate(user, { abortEarly: false });
            return true;
        } catch (error) {
            const validationErrors = {};
            error.inner.forEach(err => {
                validationErrors[err.path] = err.message;
                setErrors(validationErrors);
            });
            return false;
        }
    }
    const [user, setUser] = useState({
        userName: '',
        password: '',
        email: '',
        gender: '',
        phone: '',
        address: '',
        image: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(
            {
                ...user,
                [name]: value,
            }
        )
        validateData();
    };
    const handleChangeImage = (e) => {
        const { name, files } = e.target;
        setUser(
            {
                ...user,
                [name]: files[0],
            }
        )
        validateData();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (await validateData()) {
            const formData = new FormData();
            formData.append('userName', user.userName);
            formData.append('password', user.password);
            formData.append('email', user.email);
            formData.append('gender', user.gender);
            formData.append('phone', user.phone);
            formData.append('address', user.address);
            formData.append('image', user.image);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData);
            console.log(data);
            swal({
                text: "Congratulations, your account has been successfully created !",
            });
            navigate('/')
            setUser({
                userName: '',
                password: '',
                email: '',
                gender: '',
                phone: '',
                address: '',
                image: ' ',
            });
            e.target.reset();
        }
    }
    return (
        <div className="SignUp">
            <div className="registration-form">
                <form className="regForm" onSubmit={handleSubmit} >
                    <h2>Sign Up</h2>
                    <div className="regContainer">
                        <div className="input-group">
                            <label htmlFor="userName">User Name</label>
                            <input type="text" name="userName" required value={user.userName} onChange={handleChange} />
                            <p>{errors.userName}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" required value={user.password} onChange={handleChange} />
                            <p>{errors.password}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" required value={user.email} onChange={handleChange} />
                            <p>{errors.email}</p>
                        </div>
                        <div className="input-group">
                            <label htmlFor="gender">Gender</label>
                            <select id="gender" name="gender" value={user.gender} onChange={handleChange} >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" name="phone" value={user.phone} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" name="address" value={user.address} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="image ">Image </label>
                            <input type="file" name="image" requiredvalue={user.image} onChange={handleChangeImage} />
                            <p>{errors.image}</p>
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
                <p className="loginhere">
                    Have an account ? <Link to="/signin" className="loginhere-link">Sign In here</Link>
                </p>
            </div>
        </div>
    )
}
