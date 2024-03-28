import {useEffect} from "react";
import styles from "./disk.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../actions/file";
import {FileList} from "./fileList/FileList";
import {Popup} from "./popup/Popup";
import {setCurrentDir, setPopupDisplay} from "../../reducers/fileReducer";

export const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector((state) => state.files.currentDir)
    const stack = useSelector((state) => state.files.dirStack)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    const openPopup = () => {
        dispatch(setPopupDisplay('flex'))
    }

    const backClickHandler = () => {
        const lastDirId = stack.pop()
        dispatch(setCurrentDir(lastDirId))
    }

    return (
        <div className={styles.disk}>
            <div className={styles.disk__btns}>
                {currentDir && (
                    <button
                        className={styles.disk__back}
                        onClick={() => backClickHandler()}
                    >
                        Назад
                    </button>
                )}
                <button className={styles.disk__create} onClick={() => openPopup()}>
                    Создать папку
                </button>
            </div>
            <FileList/>
            <Popup/>
        </div>
    );
};
