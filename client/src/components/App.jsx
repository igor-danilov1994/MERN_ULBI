import {useEffect} from "react";
import {NavBar} from "./navBar/NavBar";
import styles from "./app.module.scss"
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import {Registration} from "./registration/Registration";
import {BrowserRouter, Redirect} from "react-router-dom";
import {Login} from "./login/Login";
import {useDispatch, useSelector} from "react-redux";
import {Disk} from "./disk/Disk";
import {auth} from "../actions/user";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, []);

    return (
        <BrowserRouter>
            <div className={styles.app}>
                <NavBar/>
                <div className={styles.wrap}>
                    {!isAuth ? (
                        <Switch>
                            <Route path="/registration" component={Registration}/>
                            <Route path="/login" component={Login}/>
                            <Redirect to="/login"/>
                        </Switch>
                    ) : (
                        <Switch>
                            <Route exact path="/" component={Disk}/>
                            <Redirect to="/"/>
                        </Switch>
                    )}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
