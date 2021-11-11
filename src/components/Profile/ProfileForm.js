import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const isValid = (value) => value.trim().length >= 6;

const ProfileForm = () => {
	const sendRequest = useHttp;
	const authContext = useContext(AuthContext);
	const passwordInputRef = useRef();
	const history = useHistory();

	const idToken = authContext.token;

	const submitHandler = (event) => {
		event.preventDefault();
		const enteredPassword = passwordInputRef.current.value;

		if (!isValid(enteredPassword)) {
			alert(
				`Invalid password: Password length must be greater than 6 characters`,
			);
			return;
		}

		const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCYgRd8jQ0QeSi3hwCZHJuWsfI-xex62Z4`;

		const option = {
			method: 'POST',
			body: JSON.stringify({
				idToken,
				password: enteredPassword,
				returnSecureToken: false,
			}),
		};

		sendRequest({ url, option })
			.then((response) => {
				if (response && response.error && response.error.message) {
					throw new Error(response.error.message);
				}

				return response;
			})
			.then((data) => {
				authContext.logout();
				alert(`Successfully update new password, Please re login again`);
				history.replace('/auth');
			})
			.catch((error) => alert(error.message));
	};

	return (
		<form onSubmit={submitHandler} className={classes.form}>
			<div className={classes.control}>
				<label htmlFor='new-password'>New Password</label>
				<input
					minLength='6'
					ref={passwordInputRef}
					type='password'
					id='new-password'
				/>
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
