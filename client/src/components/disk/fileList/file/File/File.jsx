import styles from './file.module.scss';
import dirLogo from '../../../../../assets/img/dir.svg';
import fileLogo from '../../../../../assets/img/file.svg';
import {useDispatch, useSelector} from "react-redux";
import {pushFromStack, setCurrentDir} from "../../../../../reducers/fileReducer";

export const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const src = file.type === 'dir' ? dirLogo : fileLogo
    const typeFile = file.type === 'dir'

    const openDirHandler = () => {
        dispatch(pushFromStack(currentDir))
        dispatch(setCurrentDir(file._id))
    }

    return (
        <div className={styles.file}
             onClick={() => typeFile ? openDirHandler() : undefined}
        >
            <img src={`${src}`} alt="" className={styles.file__img}/>
            <div className={styles.file__name}>{file.name}</div>
            <div className={styles.file__date}>{file.date.slice(0, 10)}</div>
            <div className={styles.file__size}>{file.size}</div>
        </div>
    );
};
