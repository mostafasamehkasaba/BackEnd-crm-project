import * as companyService from './setting.service.js';

export const getCompany = async (req, res) => {
  try {
    const company = await companyService.getCompanyInfo();
    
    // لو الـ company بـ null أو undefined، هيرجع أوبجكت فاضي فوراً مع حالة 200
    return res.status(200).json(company || {});
  } catch (error) {
    console.error("Error in getCompany:", error);
    // لو دخل هنا يبقى في مشكلة حقيقية في الاتصال بالداتا بيس نفسها
    return res.status(500).json({ error: 'مشكلة في الاتصال بقاعدة البيانات' });
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