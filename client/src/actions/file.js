import axios from 'axios'
import {addFile, setFiles} from "../reducers/fileReducer";

const BASE_URL = `http://localhost:5001/api`

export const getFiles = (dirId) => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')
            const getFilesUrl = `${BASE_URL}/files${dirId ? '?parent=' + dirId : ''}`

            const response = await axios.get(getFilesUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            console.log(e, "Error get file")
        }
    }
}

export const createDir = (dirId, name) => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')
            const getFilesUrl = `${BASE_URL}/files`

            const response = await axios.post(getFilesUrl, {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(addFile(response.data))
        } catch (e) {
            console.log(e, "Error get file")
        }
    }
}

export const uploadFile = (file, dirId) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            if (dirId){
                formData.append('parent', dirId)
            }

            const token = localStorage.getItem('token')
            const getFilesUrl = `${BASE_URL}/files/upload`

            const response = await axios.post(getFilesUrl, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                onUploadProgress: progressEvent => {
                    const totalLength =  progressEvent.event.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');

                    console.log('total', totalLength)

                    if (totalLength){
                        let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        console.log(progress, 'progress')
                    }
                }
            })
            dispatch(addFile(response.data))
        } catch (e) {
            console.log(e, "Error get file")
        }
    }
}

export  const downloadFile = async (file) => {
    try {
        const token = localStorage.getItem('token')

        const response = await fetch(`${BASE_URL}/files/download?id=${file._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })

        if (response.status === 200){
            const blob = await response.blob()
            const downloadUrl = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = file.name
            document.body.appendChild(link)
            link.click()
            link.remove()
        }
    } catch (e) {
        console.log(e)
    }

}

