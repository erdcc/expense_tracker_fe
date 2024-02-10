import axios from "axios";


export default () => {
    const token = localStorage.getItem("token")
    return axios.create({
        baseURL: "https://api-tracker.toolgen.dev",
        headers: {
            Authorization: token
        }
    })
}