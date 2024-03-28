import {useSelector} from "react-redux";
import {File} from "./file/File/File";
import styles from './fileList.module.scss';

export const FileList = () => {
    const files = useSelector(state => state.files.files).map(file => <File key={file.id} file={file}/>)

    return (
        <>{files.length ? (
            <div className={styles.fileList}>
                <div className={styles.fileList__header}>
                    <div className={styles.fileList__name}>Название</div>
                    <div className={styles.fileList__date}>Дата</div>
                    <div className={styles.fileList__size}>Размер</div>
                </div>
                {files}
            </div>
        ) : (
            <span>Файлов нет</span>
        )}</>
    );
};
