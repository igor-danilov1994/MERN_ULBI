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
                throw new Error('Directory already exists');
            }
        } catch (error) {
            throw new Error(`Error creating directory: ${error.message}`);
        }
    }
}

export default new FileService();
