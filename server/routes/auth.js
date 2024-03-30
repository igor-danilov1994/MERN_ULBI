import {Router} from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {check, validationResult} from "express-validator"
import fileService from "../serveces/fileService.js"
import File from '../models/File.js'
import authMiddleware from "../middleware/auth.middleware.js";

const router = new Router()

const validateData = [
    check('email', "Uncorrected email"),
    check('password', "Password will be min 3, and max 12").isLength({min: 3, max: 12})
]

router.post('/registration',
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({min: 3, max: 12})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request", errors})
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: `User with email ${email} already exist`})
            }
            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({email, password: hashPassword})
            await user.save()
            await fileService.createDir(new File({user: user.id, name: ''}))
            res.json({message: "User was created"})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })


router.post('/login',
    async (req, res) => {
        try {
            const {email, password} = req.body

            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({
                    message: "User was nof found"
                })
            }

            const isPassValid = bcrypt.compareSync(password, user.password)

            if (!isPassValid) {
                return res.status(400).json({
                    message: "Wrong login or password"
                })
            }

            let payload = { id : user.id};
            const token = jwt.sign(payload, 'secret')

            return res.status(200).json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                },
                message: 'Login success!'
            })

        } catch (e) {
            console.log(e)
            res.send({message: 'Server error'})
        }
    })


router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user._id}, 'secret', {expiresIn: '30d'})

            return res.status(200).json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                },
                message: 'Login success!'
            })
        } catch (e) {
            console.log(e)
            res.send({message: 'Server error'})
        }
    })

export default router;
