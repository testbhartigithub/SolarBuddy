import axios from "axios";
var serverurl = "http://192.168.1.10:5000"
const postData = async (url, body) => {

    try {
        var response = await axios.post(`${serverurl}/${url}`, body)
        var result = response.data
        return result

    }
    catch (e) {
        return null;

    }

}


const getData = async (url) => {

    try {
        var response = await axios.get(`${serverurl}/${url}`)
        var result = response.data
        return result
    }
    catch (e) {
        return null;
    }

}


export { serverurl, postData, getData }