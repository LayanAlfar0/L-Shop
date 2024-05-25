import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';

export default function ForgetPass() {
    const navigate = useNavigate();
	const [user, setUser] = useState({
		email: '',
		password: '',
        code:'',
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser(
			{
				...user,
				[name]: value,
			}
		)
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
        try {
            const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, { ...user }, {});
            console.log(data);
            if(data.message == 'success'){
                toast.success('Password Changed Successfully!', {
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
                navigate('/signin');
            }
        } catch (error) {
            toast.error(error.response.data.message, {
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
        // <div className="signin">
        //     <div className="signin-form">
        //         <form id="signInForm" onSubmit={handleSubmit}>
        //             <h2>Sign In</h2>
        //             <div className="signinContainer">
        //                 <div className="input-group-signin">
        //                     <input type="email" name="email" required placeholder='Email' value={user.email} onChange={handleChange} />
        //                 </div>
        //                 <div className="input-group-signin">
        //                     <input type="password" name="password" required placeholder='new password' value={user.password} onChange={handleChange} />
        //                 </div>
        //                 <div className="input-group-signin">
        //                     <input type="text" name="code" required placeholder='enter the code' value={user.code} onChange={handleChange} />
        //                 </div>
        //                 <button type="submit">Reset Password</button>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        
                <div className="sendCode resetPass">
            <div className="row">
                <h1>Reset Password</h1>
                <div className="form-group">
                    <form id="signInForm" onSubmit={handleSubmit}>
                        <p><label htmlFor="email">Email</label></p>
                        <input type="email" name="email" required value={user.email} onChange={handleChange} placeholder='Enter your registered email to reset your password.' />
                        <p><label htmlFor="password">Password</label></p>
                        <input type="password" name="password" required placeholder='new password' value={user.password} onChange={handleChange} />
                        <p><label htmlFor="code">Code</label></p>
                        <input type="text" name="code" required placeholder='enter the code' value={user.code} onChange={handleChange} />
                        <button type="submit">Reset Password</button>
                    </form>
                </div>
                <div className="footer">
                    <h5>New here? <Link to='/signup'>Sign Up.</Link></h5>
                    <h5>Already have an account? <Link to='/signup'>Sign In.</Link></h5></div>
            </div>
        </div>
        
    )
}
