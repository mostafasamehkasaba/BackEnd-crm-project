import express from 'express';
import multer from 'multer';
import * as companyController from './setting.controller.js';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/', companyController.getCompany);
router.put('/', upload.single('logo'), companyController.updateCompany);

export default router;