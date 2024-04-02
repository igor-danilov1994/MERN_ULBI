import {useEffect, useState} from "react";
import styles from "./disk.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getFiles, searchFiles, uploadFile} from "../../actions/file";
import {FileList} from "./fileList/FileList";
import {Popup} from "./popup/Popup";
import {setCurrentDir, setPopupDisplay} from "../../reducers/fileReducer";
import {Uploader} from "../upload/Uploader";
import {Input} from "../../utils/input/Input";

export const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector((state) => state.files.currentDir)
    const stack = useSelector((state) => state.files.dirStack)
    const loader = useSelector((state) => state.appLoader.loader)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')
    const [search, setSearch] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    const searchHandler = (value) => {
        setSearch(value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }

        if (value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value))
            }, 1000, value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

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

    if (loader) {
        return (
            <div className={styles.loader}>
                <div className={styles.lds_dual_ring}></div>
            </div>
        )
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
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className={styles.disk__select}
                    >
                        <option value="name">По имени</option>
                        <option value="type">По типу</option>
                        <option value="date">По дате</option>
                    </select>

                    <div className={styles.search}>
                        <Input
                            type='text'
                            value={search}
                            setValue={searchHandler}
                            placeholder='Поиск...'
                        />
                    </div>
                </div>
                <FileList/>
                <Popup/>
                <Uploader/>
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
