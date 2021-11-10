import { useState, useRef } from 'react';
import useHttp, { SIGN_UP, SIGN_IN } from '../../hooks/use-http';

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
	const sendRequest = useHttp;

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		setIsLoading(true);
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
			const option = {
				method: `POST`,
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			};
			sendRequest({ type: SIGN_IN, option }).then((dataResponse) => {
				setIsLoading(false);
				if (dataResponse && dataResponse.error && dataResponse.error.message) {
					// show error
					alert(dataResponse.error.message);
				} else {
					console.log(dataResponse);
				}
			});
		} else {
			const option = {
				method: `POST`,
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			};
			sendRequest({ type: SIGN_UP, option }).then((dataResponse) => {
				setIsLoading(false);
				/*This is all possible option we can use to check conditions
        if don't have error dataResponse.error and dataResponse.error.message will be undefined */
				if (dataResponse && dataResponse.error && dataResponse.error.message) {
					// show error
					alert(dataResponse.error.message);
				} else {
					setIsLogin((prevState) => !prevState);
					emailInputRef.current.value = '';
					passwordInputRef.current.value = '';
				}
			});
		}
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
