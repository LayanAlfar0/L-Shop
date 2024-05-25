import React, { useContext, useState } from 'react'
import './SignIn.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
import { UserContext } from '../../Components/Contex/User';

export default function SignIn() {
	const { setUserToken } = useContext(UserContext);
	const navigate = useNavigate();
	const [user, setUser] = useState({
		email: '',
		password: '',
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
			const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, user);
			// console.log(data);
			localStorage.setItem('userToken', data.token);
			swal({
				text: "Congratulations, Sign In Successfully !",
			});
			setUserToken(data.token);
			navigate('/')
			setUser({
				password: '',
				email: '',
			});
		} catch (error) {
			swal({
				text: "Invalid Username or Password, Please try again.",
				icon: "error",
			});
		}
	};
	return (
		<div className="signin">
			<div className="signin-form">
				<form id="signInForm" onSubmit={handleSubmit}>
					<h2>Sign In</h2>
					<div className="signinContainer">
						<div className="input-group-signin">
							<input type="email" name="email" required placeholder='Email' value={user.email} onChange={handleChange} />
						</div>
						<div className="input-group-signin">
							<input type="password" name="password" required placeholder='Password' value={user.password} onChange={handleChange} />
						</div>
						<button type="submit">Sign In</button>
						<div className="likns">
							<p className="redirect">Don't have an account?
								<Link to="/signup" > Sign Up here</Link>
							</p>
							<p className="forget"><Link to="/sendCode" >forget your password?</Link></p></div>

					</div>
				</form>
			</div>
		</div>
	)
}
