import { useEffect, useContext, useState } from 'react';
import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';
import useHttp from '../../hooks/use-http';
import AuthContext from '../../store/auth-context';

const UserProfile = () => {
	const fetchUser = useHttp;
	const authContext = useContext(AuthContext);
	const userToken = authContext.token;
	const [userEmail, setUserEmail] = useState(null);

	useEffect(() => {
		const option = {
			method: 'POST',
			body: JSON.stringify({
				idToken: userToken,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCYgRd8jQ0QeSi3hwCZHJuWsfI-xex62Z4`;

		if (userToken) {
			fetchUser({ url, option })
				.then((response) => {
					if (response && response.error && response.error.message) {
						// show error
						throw new Error(response.error.message);
					}
					return response;
				})
				.then((userData) => {
					setUserEmail(userData.users[0].email);
				})
				.catch((error) => alert(error.message));
		}
	}, [fetchUser, userToken]);

	return (
		<section className={classes.profile}>
			<h1>Your User Profile</h1>
			{userEmail && <h2>{userEmail}</h2>}
			<ProfileForm />
		</section>
	);
};

export default UserProfile;
