import alertError from "./alertError";

export default function logError(error, sourceName = null) {
    if (sourceName)
        console.log('error from: ', sourceName)
    if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.response.config);

    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    alertError(error)
    console.log(error.stack)
}
