import styled from './uploadFile.module.scss';
import {useDispatch} from "react-redux";
import {removeUploadFile} from "../../../reducers/uploadReducer";

export const UploadFile = ({file}) => {
    const dispatch = useDispatch()


    const removeUploadFileHandler = () => {
        dispatch(removeUploadFile(file.id))
    }
    
    return (
        <div className={styled.upload__file}>
            <div className={styled.upload__file__header}>
                <div className={styled.upload__file__name}>
                    {file.name}
                </div>
                <button onClick={removeUploadFileHandler}>X</button>
            </div>
            <div className={styled.upload__file__progress__bar}>
                <div style={{width: `${file.progress}%`}} className={styled.upload__file__upload__bar}/>
                <div className={styled.upload__file__percent}>
                    {file.progress}%
                </div>
            </div>
        </div>
    );
};
