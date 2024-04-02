import styled from './uploadFile.module.scss';
import {useDispatch} from "react-redux";
import {hideUploader, removeUploadFile} from "../../../reducers/uploadReducer";
import {useEffect} from "react";

export const UploadFile = ({file}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (file.progress === 100) {
            setTimeout(() => {
                dispatch(hideUploader())
            }, 3000)
        }
    }, [file]);

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
