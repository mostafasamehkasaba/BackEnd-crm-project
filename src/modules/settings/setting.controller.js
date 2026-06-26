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
    // ✅ كله بـ companyName زي الـ model
    const { companyName, email, taxNumber, commercialRegister, mainActivity, phoneNumber, address } = req.body;

    if (!companyName || !email) {
      return res.status(400).json({ error: 'اسم الشركة والبريد الإلكتروني حقول مطلوبة' });
    }

    let logoUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "company_logos",
      });
      logoUrl = result.secure_url;
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