import styles from './uploader.module.scss';
import {UploadFile} from "./uploadFile/UploadFile";
import {useDispatch, useSelector} from "react-redux";
import {hideUploader} from "../../reducers/uploadReducer";
import {useEffect} from "react";

export const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isVisible && !files.length) {
            closeUploaderHandler()
        }
    }, [files, isVisible])

    const closeUploaderHandler = () => {
        dispatch(hideUploader())
    };
    return (isVisible && <div className={styles.uploader}>
            <div className={styles.uploader__header}>
                <div className={styles.uploader__title}>Загрузки</div>
                <div
                    className={styles.uploader__close}
                    onClick={closeUploaderHandler}
                >
                    Х
                </div>
            </div>
            {files.map(file => <UploadFile file={file} key={file.id}/>)}
        </div>
    );
};
