import fs from 'fs';
import path from 'path';

const FILES_PATH = '/Users/igordanilov/Desktop/courses/mern_ulbi/server/files';

class FileService {
    async createDir(file) {
        const {name, user, parent} = file;
        const userPath = String(user);
        const parentPath = parent ? String(parent) : '';
        const filePath = path.join(FILES_PATH, userPath, parentPath, name);

        try {
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true});
                return {message: 'Directory created successfully'};
            } else {
                console.log('Directory already exists')
                return {message: 'Directory already exists'};
            }
        } catch (error) {
            throw new Error(`Error creating directory: ${error.message}`);
        }
    }

    deleteFile(file) {
        const path = this.getPath(file)

        if (file.type === 'dir'){
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(file) {
        return FILES_PATH + '/' + file.user + '/' + file.path;
    }
}

export default new FileService();
