import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';

function App() {
	const authContext = useContext(AuthContext);

	return (
		<Layout>
			<Switch>
				<Route path='/' exact>
					<HomePage />
				</Route>
				{/* in here we can use auth context to make sure this page
        is only show when the user is logged in*/}
				{!authContext.isLogin && (
					<Route path='/auth'>
						<AuthPage />
					</Route>
				)}
				{authContext.isLogin && (
					<Route path='/profile'>
						<UserProfile />
					</Route>
				)}
				<Route path='*'>
					<Redirect to='/' />
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
