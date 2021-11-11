import { useState } from 'react';
import AuthContext from './auth-context';

const AuthContextProvider = (props) => {
	const initialTokenState = localStorage.getItem('token');
	const [token, setToken] = useState(initialTokenState);

	const isUserLoggedIn = !!token;

	const login = (token) => {
		setToken(token);
		localStorage.setItem('token', token);
	};

	const logout = () => {
		setToken(null);
		localStorage.removeItem('token');
	};

	const contextValue = {
		token,
		isLogin: isUserLoggedIn,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
