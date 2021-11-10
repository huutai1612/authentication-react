export const SIGN_UP = `sign-up`;
export const SIGN_IN = `sign-in`;

const useHttp = async (setting) => {
	let url = '';

	if (setting.type === SIGN_UP) {
		url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYgRd8jQ0QeSi3hwCZHJuWsfI-xex62Z4`;
	}
	if (setting.type === SIGN_IN) {
		url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYgRd8jQ0QeSi3hwCZHJuWsfI-xex62Z4`;
	}

	const response = await fetch(url, setting.option);
	return response.json();
};

export default useHttp;
