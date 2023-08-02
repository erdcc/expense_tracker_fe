import axios from "axios";


export default () => {
    const token = localStorage.getItem("token")
    return axios.create({
        baseURL: "http://173.82.58.139:443",
        headers: {
            Authorization: token
        }
    })
}