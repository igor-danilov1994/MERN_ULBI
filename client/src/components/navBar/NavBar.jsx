import styles from './navbar.module.scss'
import logo from '../../assets/img/logo.svg'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userRecucers";

export const NavBar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar__block__logo}>
                <img src={logo} alt="" className={styles.navbar__logo}/>
                <div className={styles.navbar__header}>MERN CLOUD</div>
            </div>
            <div className={styles.navbar__auth}>
                {!isAuth &&
                    <div className={styles.navbar__login}>
                        <NavLink to='/login'>
                            Войти
                        </NavLink>
                    </div>
                }
                {!isAuth && <div className={styles.navbar__login}>
                    <NavLink to='/registration'>
                        Зарегестрироваться
                    </NavLink>
                </div>
                }
                {isAuth && (
                    <div className={styles.navbar__logout} onClick={() => dispatch(logout())}
                    >Выйти</div>)}
            </div>
        </div>
    );
};
