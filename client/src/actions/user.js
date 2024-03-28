import axios from 'axios'
import {setUser} from "../reducers/userRecucers";

const BASE_URL = `http://localhost:5001/api`

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/registration`, {
            email,
            password
        })
        alert((await response).data.message)
    } catch (e) {
        alert(e.response.data.message)
    }

}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            // alert(e.response.data.message)
        }
    }
}
export const auth = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')

            if (token) {
                const response = await axios.get(`${BASE_URL}/auth/auth`, {
                    headers: {Authorization: `Bearer ${token}`}
                })

                dispatch(setUser(response.data.user))
                localStorage.setItem('token', response.data.token)
            }
        } catch (e) {
            // console.log(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}
