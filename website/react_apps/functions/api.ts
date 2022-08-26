import axios from 'axios'
export default {
    medicateNetwork: async (params) => await axios.get('/medicateNetwork/search', { params: params }),
    fetchBase64DataFromUrl: async (params) => await axios.get('/medicateNetwork/search', { params: params }),
}