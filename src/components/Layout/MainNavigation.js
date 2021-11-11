import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';

import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
	const authContext = useContext(AuthContext);
	const isLogin = authContext.isLogin;
	const history = useHistory();

	const logOutHandler = () => {
		authContext.logout();
		history.replace('/');
	};

	return (
		<header className={classes.header}>
			<Link to='/'>
				<div className={classes.logo}>React Auth</div>
			</Link>
			<nav>
				<ul>
					{!isLogin && (
						<li>
							<Link to='/auth'>Login</Link>
						</li>
					)}
					{isLogin && (
						<li>
							<Link to='/profile'>Profile</Link>
						</li>
					)}
					{isLogin && (
						<li>
							<button onClick={logOutHandler}>Logout</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
