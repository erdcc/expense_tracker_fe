import axios from "axios";

const token = localStorage.getItem("token")

export default axios.create({
    baseURL: "http://173.82.58.139:5000",
    headers: {
        Authorization: token
    }
})