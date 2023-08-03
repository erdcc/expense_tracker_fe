import axios from "axios";


export default () => {
    const token = localStorage.getItem("token")
    return axios.create({
        baseURL: "https://tracker.toolgen.dev:5000",
        headers: {
            Authorization: token
        }
    })
}