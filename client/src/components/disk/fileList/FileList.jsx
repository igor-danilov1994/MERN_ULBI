import {useSelector} from "react-redux";
import {File} from "./file/File/File";
import styles from './fileList.module.scss';
import {CSSTransition, TransitionGroup} from "react-transition-group";

export const FileList = () => {
    const files = useSelector(state => state.files.files)

    return (
        <>{files.length ? (
            <div className={styles.fileList}>
                <div className={styles.fileList__header}>
                    <div className={styles.fileList__name}>Название</div>
                    <div className={styles.fileList__date}>Дата</div>
                    <div className={styles.fileList__size}>Размер</div>
                </div>
                <TransitionGroup>
                    {files.map(file =>
                        <CSSTransition
                            key={file._id}
                            timeout={500}
                            classNames={styles.file}
                            exit={false}
                        >
                            <File file={file}/>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        ) : (
            <span>Файлов нет</span>
        )}</>
    );
};
