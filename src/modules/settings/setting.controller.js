import configureCloudinary from '../../config/cloudinary.js';
import * as companyService from './setting.service.js';
import { v2 as cloudinary } from 'cloudinary';

export const getCompany = async (req, res) => {
  try {
    const company = await companyService.getCompanyInfo();
    return res.status(200).json(company?.[0] || {});
  } catch (error) {
    return res.status(500).json({ error: 'مشكلة في الاتصال بقاعدة البيانات' });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { companyName, email, taxNumber, commercialRegister, mainActivity, phoneNumber, address } = req.body;

    if (!companyName || !email) {
      return res.status(400).json({ error: 'اسم الشركة والبريد الإلكتروني حقول مطلوبة' });
    }

    let logoUrl;

    // ✅ نضيف الصورة بس لو موجودة
    if (req.file) {

      const cloudinaryInstance = configureCloudinary();
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinaryInstance.uploader.upload_stream(
          { folder: "company_logos" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });
      logoUrl = uploadResult.secure_url;
    }

    const dataToSave = {
      companyName,
      taxNumber,
      commercialRegister,
      mainActivity,
      email,
      phoneNumber,
      address,
      ...(logoUrl && { logoUrl })
    };

    const updatedData = await companyService.updateCompanyInfo(dataToSave);

    return res.status(200).json({
      message: 'تم حفظ الإعدادات بنجاح',
      data: updatedData
    });

  } catch (error) {
    console.error("updateCompany error:", error);
    return res.status(500).json({ error: error.message || 'حدث خطأ أثناء حفظ البيانات' });
  }
};