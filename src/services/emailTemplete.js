
export const getVerifyEmailTemplate = (verifyLink) => {
  const currentYear = new Date().getFullYear();

  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>تأكيد البريد الإلكتروني</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f6f9;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }
        .email-container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          border: 1px solid #eef2f5;
        }
        .header {
          background-color: #1e293b; /* كحلي احترافي لـ CRM */
          padding: 30px;
          text-align: center;
          color: #ffffff;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 40px 30px;
          color: #334155;
          line-height: 1.6;
          text-align: right;
        }
        .content h2 {
          color: #0f172a;
          margin-top: 0;
          font-size: 20px;
        }
        .btn-container {
          text-align: center;
          margin: 35px 0;
        }
        .btn {
          background-color: #2563eb; /* أزرق براند نشط */
          color: #ffffff !important;
          text-decoration: none;
          padding: 14px 30px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 6px;
          display: inline-block;
          box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
        }
        .footer {
          background-color: #f8fafc;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #64748b;
          border-top: 1px solid #e2e8f0;
        }
        .footer a {
          color: #2563eb;
          text-decoration: none;
        }
      </style>
    </head>
    <body>

      <div class="email-container">
        <div class="header">
          <h1>مرحباً بك في نظام CRM</h1>
        </div>

        <div class="content">
          <h2>تأكيد عنوان بريدك الإلكتروني 👋</h2>
          <p>شكراً لتسجيلك معنا. خطوة واحدة تفصلك عن تفعيل حسابك والبدء في إدارة عملائك بذكاء.</p>
          <p>يرجى الضغط على الزر أدناه لتأكيد بريدك الإلكتروني:</p>
          
          <div class="btn-container">
            <a href="${verifyLink}" class="btn">تأكيد الحساب والبريد</a>
          </div>

          <p style="font-size: 13px; color: #94a3b8; margin-top: 25px;">
            إذا لم تقم بإنشاء هذا الحساب، يمكنك تجاهل هذا الإيميل بأمان. هذا الرابط صلاحيته محدودة.
          </p>
        </div>

        <div class="footer">
          <p>© ${currentYear} CRM Platform. جميع الحقوق محفوظة.</p>
          <p>تحتاج مساعدة؟ <a href="mailto:support@yourdomain.com">تواصل مع الدعم الفني</a></p>
        </div>
      </div>

    </body>
    
    </html>
  `;
};