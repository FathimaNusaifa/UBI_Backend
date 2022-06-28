import express from 'express';
import multer from 'multer';
import path from 'path';

// Middleware
import authenticated from '../middlewares/auth.js';

// Models
import { User } from '../models/Users.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'storage/images/')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
})

router.post('/', authenticated, upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).send('No image in the request');

        //const fileName = file.filename;
        const filePath = req.file.path;
        const host = '192.168.8.126:3000/';
        const basePath = `${req.protocol}://${host}`;
        const fullPath = `${basePath}${filePath}`;

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).send('Cannot Find Your Profile!');

        user.imageUrl = fullPath;
        await user.save();

        res.send(fullPath);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

export default router