import React from 'react';

const AuthContext = React.createContext({
	token: '',
	isLogin: false,
	login(token) {},
	logout() {},
});

export default AuthContext;
