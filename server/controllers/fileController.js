import File from '../models/File.js'
import fileService from '../serveces/fileService.js'

class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File({name, type, parent, user: req.user.id})
            const parentFile = await File.findOne({_id: parent})

            if (!parentFile) {
                file.path = name
            } else {
                file.path = parentFile.path ? `${parentFile.path}/${file.name}` : file.name
                parentFile.childs.push(file._id)
                await parentFile.save()
            }

            await fileService.createDir(file)
            await file.save()
            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getFiles(req, res) {
        console.log(req.query)
        try {
            const files = await File.find({user: req.user.id, parent: req.query.parent})
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    }
}

export default new FileController()
