import * as companyService from './setting.service.js';

export const getCompany = async (req, res) => {
  try {
    const company = await companyService.getCompanyInfo();
    return res.status(200).json(company || {});
  } catch (error) {
    return res.status(500).json({ error: 'حدث خطأ أثناء جلب بيانات الشركة' });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { companyName, email } = req.body;

    if (!companyName || !email) {
      return res.status(400).json({ error: 'اسم الشركة والبريد الإلكتروني حقول مطلوبة' });
    }

    const updatedData = await companyService.updateCompanyInfo(req.body);
    
    return res.status(200).json({
      message: 'تم حفظ الإعدادات بنجاح',
      data: updatedData
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'حدث خطأ أثناء حفظ البيانات' });
  }
};