import { useState } from 'react';
import AuthContext from './auth-context';

const AuthContextProvider = (props) => {
	const [token, setToken] = useState(null);

	const isUserLoggedIn = !!token;

	const login = (token) => setToken(token);

	const logout = () => setToken(null);

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
