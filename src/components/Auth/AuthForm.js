import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const isNotEmpty = (enteredData) => enteredData.trim() !== '';
const validateEmail = (enteredEmail) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(enteredEmail).toLowerCase());
};

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const authContext = useContext(AuthContext);
	const history = useHistory();
	const sendRequest = useHttp;

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		setIsLoading(true);
		let url = '';

		const formData = {
			email: emailInputRef.current.value,
			password: passwordInputRef.current.value,
			returnSecureToken: true,
		};

		if (
			!isNotEmpty(formData.email) ||
			!isNotEmpty(formData.password) ||
			!validateEmail(formData.email)
		) {
			alert(`Something went wrong`);
			return;
		}

		if (isLogin) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYgRd8jQ0QeSi3hwCZHJuWsfI-xex62Z4`;
		} else {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYgRd8jQ0QeSi3hwCZHJuWsfI-xex62Z4`;
		}

		const option = {
			method: `POST`,
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json',
			},
		};
		sendRequest({ url, option })
			.then((response) => {
				setIsLoading(false);
				/*This is all possible option we can use to check conditions
      			if don't have error dataResponse.error and dataResponse.error.message will be undefined */
				if (response && response.error && response.error.message) {
					// show error
					throw new Error(response.error.message);
				}
				return response;
			})
			.then((data) => {
				if (isLogin) {
					console.log(data.idToken);
					authContext.login(data.idToken);
					history.push('/');
				} else {
					setIsLogin((prevState) => !prevState);
					emailInputRef.current.value = '';
					passwordInputRef.current.value = '';
				}
			})
			.catch((error) => alert(error.message));
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' required ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='password'>Your Password</label>
					<input
						type='password'
						id='password'
						required
						ref={passwordInputRef}
					/>
				</div>
				<div className={classes.actions}>
					{!isLoading && (
						<button>{isLogin ? 'Login' : 'Create Account'}</button>
					)}
					{isLoading && <p>Sending Request .....................</p>}
					<button
						type='button'
						className={classes.toggle}
						onClick={switchAuthModeHandler}>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
