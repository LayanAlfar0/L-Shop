import React, { useState } from 'react'
import './SendCode.css'
import axios from 'axios'
import { Slide, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
export default function SendCode() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setEmail(e.target.value);
    };
    const sendCode = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, { email }, {});
            console.log(data);
            if (data.message == 'success') {
                toast.success('Code Sended Successfully! ,Check your email ', {
                    position: "bottom-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
                navigate('/forgetPassword');
            }
        } catch (err) {
            toast.success('something went error, please try again', {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        }
    }

    return (
        <div className="sendCode">
            <div className="row">
                <h1>Forgot Password</h1>
                <h6 className="information-text">Enter your registered email to reset your password.</h6>
                <div className="form-group">
                    <form id="signInForm" onSubmit={sendCode}>
                        <p><label htmlFor="email">Email</label></p>
                        <input type="email" name="email" required value={email} onChange={handleChange} />
                        <button type="submit">Send Code</button>
                    </form>
                </div>
                <div className="footer">
                    <h5>New here? <Link to='/signup'>Sign Up.</Link></h5>
                    <h5>Already have an account? <Link to='/signup'>Sign In.</Link></h5></div>
            </div>
        </div>
    )
}
