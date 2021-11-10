const useHttp = async (setting) => {
	const response = await fetch(setting.url, setting.option);
	return response.json();
};

export default useHttp;
