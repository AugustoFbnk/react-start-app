import wrapper from '../wrapper'

const getAll = async () => {

    try {
        var resp = await wrapper({
            method: 'get',
            url: '/s3/'
        });
        return resp;
    } catch (error) {
        console.log('erro:' + error)
    }
}

export default getAll;