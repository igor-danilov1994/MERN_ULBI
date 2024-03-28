import React, {useState} from 'react';
import styles from './login.module.scss'
import {Input} from "../../utils/input/Input";
import {useDispatch} from "react-redux";
import {login} from "../../actions/user";

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const loginHandler = (email, password) => {
        dispatch(login(email, password))
    }

    return (
        <div className={styles.registration}>
            <div className={styles.registration__header}>Войти</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className={styles.registration__btn} onClick={() => dispatch(login(email, password))}>
                Войти
            </button>
        </div>
    )
}
