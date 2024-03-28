import {useState} from "react";
import styles from './popup.module.scss';
import {Input} from "../../../utils/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../../reducers/fileReducer";
import {createDir} from "../../../actions/file";

export const Popup = () => {
    const [dirName, setDirName] = useState('')
    const display = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector((state) => state.files.currentDir)
    const dispatch = useDispatch()

    const popupClose = () => {
        dispatch(setPopupDisplay('none'))
        setDirName('')
    }

    const createDirHandler = () => {
        dispatch(createDir(currentDir, dirName))
        popupClose()
    }


    return (
        <div className={styles.popup} style={{display: display}} onClick={popupClose}>
            <div className={styles.popup__content} onClick={(event => event.stopPropagation())}>
                <div className={styles.popup__header}>
                    <div className={styles.popup__title}>Создать папку</div>
                    <button className={styles.popup__close} onClick={popupClose}>X</button>
                </div>
                <Input
                    value={dirName}
                    type='text'
                    placeholder='Введите название папки...'
                    setValue={setDirName}/>
                <button className={styles.popup__create}
                        disabled={!dirName.length}
                        onClick={createDirHandler}
                        style={{opacity: !dirName.length ? 0.5 : 1}}
                >
                    Создать
                </button>
            </div>
        </div>
    );
};
