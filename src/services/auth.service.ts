import axios from 'axios'
import {API_URL} from "../utils/constants";
import {ILogin, IRegister} from "../types/auth";

const login = (data:ILogin) => {
    return axios
        .post(`${API_URL}/auth/login`, data)
        .then(response => {
            if(response.data.token) localStorage.setItem('token', JSON.stringify(response.data.token))
            if(response.data.user) localStorage.setItem('user', JSON.stringify(response.data.user))
            return response.data
        })
}

const signup = (data:IRegister) => {
    return axios
        .post(`${API_URL}/auth/register`, data)
        .then(response => {
            if(response.data.token) localStorage.setItem('token', JSON.stringify(response.data.token))
            if(response.data.user) localStorage.setItem('user', JSON.stringify(response.data.user))
            return response.data
        })
}

const logout = () => {
    localStorage.removeItem('token')
}

const AuthService = {login, logout, signup}
export default AuthService
