import React, {useState} from 'react';
import {registration} from "../../actions/user";
import styles from './registation.module.scss'
import {Input} from "../../utils/input/Input";

export const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const registrationHandler = (email, password) => {
        registration(email, password)
    }

    return (
        <div className={styles.registration}>
            <div className={styles.registration__header}>Регистрация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className={styles.registration__btn} onClick={() => registrationHandler(email, password)}>
                Зарегестрироваться
            </button>
        </div>
    )
}
