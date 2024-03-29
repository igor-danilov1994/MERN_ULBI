import {useEffect, useState} from "react";
import styles from "./disk.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import {FileList} from "./fileList/FileList";
import {Popup} from "./popup/Popup";
import {setCurrentDir, setPopupDisplay} from "../../reducers/fileReducer";

export const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector((state) => state.files.currentDir)
    const stack = useSelector((state) => state.files.dirStack)
    const [dragEnter, setDragEnter] = useState(false)

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

    const onChangeInput = (e) => {
        const files = [...e.target.files]
        files.forEach((file) => dispatch(uploadFile(file, currentDir)))
    }

    const stopBehaviorBrowser = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const onDragEnterHandler = (e) => {
        stopBehaviorBrowser(e)
        setDragEnter(true)

    }

    const onDragLeaveHandler = (e) => {
        stopBehaviorBrowser(e)
        setDragEnter(true)
    }

    const onDragOverHandler = (e) => {
        stopBehaviorBrowser(e)
        setDragEnter(true)
    }

    const onDropHandler = (e) => {
        stopBehaviorBrowser(e)
        let files = [...e.dataTransfer.files]
        files.forEach((file) => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    return (
        !dragEnter ?
        <div
            className={styles.disk}
            onDragEnter={onDragEnterHandler}
            onDragLeave={onDragLeaveHandler}
            onDragOver={onDragOverHandler}
        >
            <div className={styles.disk__btns}>
                {currentDir && (
                    <button className={styles.disk__back}
                        onClick={() => backClickHandler()}
                    >Назад</button>
                )}
                <button className={styles.disk__create} onClick={() => openPopup()}>
                    Создать папку
                </button>
                <div className={styles.disk__upload}>
                    <label htmlFor='disk__upload-input' className={styles.disk__upload_label}>Загрузить файл</label>
                    <input
                        multiple
                        type="file"
                        id='disk__upload-input'
                        className={styles.disk__upload_input}
                        onChange={(e) => onChangeInput(e)}/>
                </div>
            </div>
            <FileList/>
            <Popup/>
        </div>
            :
        <div
            className={styles.drop_area}
            onDragEnter={onDragEnterHandler}
            onDragLeave={onDragLeaveHandler}
            onDragOver={onDragOverHandler}
            onDrop={onDropHandler}
        >
            Перетащите файлы сюда
        </div>
    );
};
