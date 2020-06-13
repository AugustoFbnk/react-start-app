import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:4000/'
})

const wrapper = async (params) => {
    const onSuccess = function (response) {
        console.debug('Request Successful!', response);
        return response.data;
    }

    const onError = function (error) {
        console.error('Request Failed:', error.config);

        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);

        } else {
            console.error('Error Message:', error.message);
        }

        return Promise.reject(error.response || error.message);
    }
    try {
        const response = await client(params);
        return onSuccess(response);
    }
    catch (error) {
        return onError(error);
    }
}
export default wrapper;