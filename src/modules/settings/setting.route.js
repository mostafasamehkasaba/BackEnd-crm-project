import express from 'express';
import * as companyController from './setting.controller.js';

const router = express.Router();

router.get('/', companyController.getCompany);
router.put('/', companyController.updateCompany);

export default router;