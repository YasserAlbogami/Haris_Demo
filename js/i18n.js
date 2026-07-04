// ===== Language Toggle (Arabic / English) =====
(function () {
  const STORAGE_KEY = "harisLang";

  const translations = {
    ar: {
      "meta.title.home": "حريص - محرك التحقق الذكي من الاستبيانات",
      "meta.title.liveSurvey": "حريص - إدخال الاستمارة المباشر",
      "meta.title.batchUpload": "حريص - التحقق من الملفات",

      "banner.text": "موقع تجريبي لنموذج حريص",
      "banner.icon.alt": "شعار الحكومة السعودية",
      "nav.gastat.alt": "الهيئة العامة للإحصاء",
      "nav.haris.alt": "حريص",
      "nav.home": "الرئيسية",
      "nav.liveSurvey": "إدخال مباشر",
      "nav.batchUpload": "التحقق من الملفات",
      "nav.langToggle": "English",

      "footer.text": "حريص © 2025 — محرك التحقق الذكي من الاستبيانات | الهيئة العامة للإحصاء",

      "home.hero.title": "حريص",
      "home.hero.subtitle": "محرك التحقق الذكي من الاستبيانات",
      "home.hero.desc":
        "منصة ذكاء اصطناعي متقدمة للتحقق من صحة واتساق بيانات الاستبيانات الإحصائية بشكل آني ودفعي، مصممة لدعم جودة البيانات في الهيئة العامة للإحصاء.",
      "home.card1.title": "إدخال الاستمارة المباشر",
      "home.card1.desc":
        "تحقق فوري أثناء إدخال البيانات مع مراقبة مستمرة لمستوى المخاطر والتناقضات في الوقت الحقيقي.",
      "home.card1.cta": "ابدأ الآن",
      "home.card2.title": "التحقق من الملفات",
      "home.card2.desc":
        "رفع ملفات Excel ومعالجتها عبر نموذج حريص للكشف عن الأخطاء والتناقضات في البيانات.",
      "home.card2.cta": "رفع ملف",

      "breadcrumb.home": "الرئيسية",
      "liveSurvey.breadcrumb.current": "إدخال الاستمارة المباشر",
      "liveSurvey.pageTitle": "إدخال الاستمارة المباشر",
      "liveSurvey.panel.formTitle": "نموذج الاستبيان",
      "form.nationalId.label": "رقم الهوية",
      "form.nationalId.placeholder": "مثال: 1XXXXXXXXX",
      "form.age.label": "العمر",
      "form.age.placeholder": "مثال: 35",
      "form.education.label": "المستوى التعليمي",
      "option.choose": "-- اختر --",
      "option.education.primary": "ابتدائي",
      "option.education.intermediate": "متوسط",
      "option.education.secondary": "ثانوي",
      "option.education.bachelor": "بكالوريوس",
      "option.education.master": "ماجستير",
      "option.education.phd": "دكتوراه",
      "form.nationality.label": "الجنسية",
      "option.nationality.saudi": "سعودي",
      "option.nationality.nonSaudi": "غير سعودي",
      "form.gender.label": "الجنس",
      "option.gender.male": "ذكر",
      "option.gender.female": "أنثى",
      "form.maritalStatus.label": "الحالة الاجتماعية",
      "option.marital.single": "أعزب",
      "option.marital.married": "متزوج",
      "option.marital.divorced": "مطلق",
      "option.marital.widowed": "أرمل",
      "form.jobTitle.label": "المسمى الوظيفي",
      "form.jobTitle.placeholder": "مثال: مهندس برمجيات",
      "form.usualHours.label": "ساعات العمل الاعتيادية أسبوعياً",
      "form.usualHours.placeholder": "مثال: 40",
      "form.experience.label": "سنوات الخبرة",
      "form.experience.placeholder": "مثال: 10",
      "form.salary.label": "الراتب الشهري",
      "liveSurvey.panel.monitorTitle": "لوحة المراقبة",
      "liveSurvey.stat.latency": "زمن الاستجابة (ms)",
      "liveSurvey.stat.risk": "درجة المخاطر",
      "liveSurvey.alert.idle": "في انتظار إدخال البيانات...",
      "liveSurvey.details.title": "تفاصيل التحقق",
      "liveSurvey.alert.critical": "تحذير حرج — تناقضات عالية في البيانات",
      "liveSurvey.alert.warningStrong": "تحذير قوي — يوجد تناقضات محتملة",
      "liveSurvey.alert.warningMild": "تحذير بسيط — تحقق من البيانات",
      "liveSurvey.alert.success": "البيانات متسقة — لا توجد مشكلات",
      "liveSurvey.alert.connError": "خطأ في الاتصال بالخادم",

      "batchUpload.breadcrumb.current": "التحقق من الملفات",
      "batchUpload.pageTitle": "التحقق من الملفات",
      "batchUpload.panel.uploadTitle": "رفع ملف CSV أو Excel",
      "batchUpload.upload.instructions":
        'اسحب ملف <strong>.csv</strong> أو <strong>.xlsx</strong> هنا أو اضغط للاختيار',
      "batchUpload.btn.process": "معالجة عبر حريص",
      "batchUpload.spinner.text": "جاري معالجة الملف... يرجى الانتظار",
      "batchUpload.panel.resultsTitle": "نتائج التحقق",
      "batchUpload.table.row": "الصف",
      "batchUpload.table.recordId": "معرف السجل (f_m_id)",
      "batchUpload.table.risk": "درجة المخاطر",
      "batchUpload.table.issues": "المشكلات المكتشفة",
      "batchUpload.err.invalidFile": "يرجى رفع ملف بصيغة .csv أو .xlsx فقط",
      "batchUpload.err.processFailed": "فشل التحقق من الملف",
      "batchUpload.err.serverConn":
        "خطأ في الاتصال بالخادم. تأكد من تشغيل الخادم على المنفذ 8000.",
      "batchUpload.results.none": "لا توجد نتائج",
      "batchUpload.results.noIssues": "✅ لا توجد مشكلات",
    },
    en: {
      "meta.title.home": "Haris - Smart Survey Verification Engine",
      "meta.title.liveSurvey": "Haris - Live Form Entry",
      "meta.title.batchUpload": "Haris - File Verification",

      "banner.text": "Demo site for the Haris model",
      "banner.icon.alt": "Saudi Government emblem",
      "nav.gastat.alt": "General Authority for Statistics",
      "nav.haris.alt": "Haris",
      "nav.home": "Home",
      "nav.liveSurvey": "Live Entry",
      "nav.batchUpload": "File Verification",
      "nav.langToggle": "العربية",

      "footer.text": "Haris © 2025 — Smart Survey Verification Engine | General Authority for Statistics",

      "home.hero.title": "Haris",
      "home.hero.subtitle": "Smart Survey Verification Engine",
      "home.hero.desc":
        "An advanced AI platform for real-time and batch validation and consistency-checking of statistical survey data, designed to support data quality at the General Authority for Statistics.",
      "home.card1.title": "Live Form Entry",
      "home.card1.desc":
        "Instant validation while entering data, with continuous real-time monitoring of risk level and inconsistencies.",
      "home.card1.cta": "Start Now",
      "home.card2.title": "File Verification",
      "home.card2.desc":
        "Upload Excel files and process them through the Haris model to detect errors and inconsistencies in the data.",
      "home.card2.cta": "Upload File",

      "breadcrumb.home": "Home",
      "liveSurvey.breadcrumb.current": "Live Form Entry",
      "liveSurvey.pageTitle": "Live Form Entry",
      "liveSurvey.panel.formTitle": "Survey Form",
      "form.nationalId.label": "National ID",
      "form.nationalId.placeholder": "e.g. 1XXXXXXXXX",
      "form.age.label": "Age",
      "form.age.placeholder": "e.g. 35",
      "form.education.label": "Education Level",
      "option.choose": "-- Select --",
      "option.education.primary": "Primary",
      "option.education.intermediate": "Intermediate",
      "option.education.secondary": "Secondary",
      "option.education.bachelor": "Bachelor's",
      "option.education.master": "Master's",
      "option.education.phd": "PhD",
      "form.nationality.label": "Nationality",
      "option.nationality.saudi": "Saudi",
      "option.nationality.nonSaudi": "Non-Saudi",
      "form.gender.label": "Gender",
      "option.gender.male": "Male",
      "option.gender.female": "Female",
      "form.maritalStatus.label": "Marital Status",
      "option.marital.single": "Single",
      "option.marital.married": "Married",
      "option.marital.divorced": "Divorced",
      "option.marital.widowed": "Widowed",
      "form.jobTitle.label": "Job Title",
      "form.jobTitle.placeholder": "e.g. Software Engineer",
      "form.usualHours.label": "Usual Weekly Working Hours",
      "form.usualHours.placeholder": "e.g. 40",
      "form.experience.label": "Years of Experience",
      "form.experience.placeholder": "e.g. 10",
      "form.salary.label": "Monthly Salary",
      "liveSurvey.panel.monitorTitle": "Monitoring Panel",
      "liveSurvey.stat.latency": "Response Time (ms)",
      "liveSurvey.stat.risk": "Risk Score",
      "liveSurvey.alert.idle": "Waiting for data entry...",
      "liveSurvey.details.title": "Validation Details",
      "liveSurvey.alert.critical": "Critical warning — high data inconsistencies",
      "liveSurvey.alert.warningStrong": "Strong warning — possible inconsistencies detected",
      "liveSurvey.alert.warningMild": "Mild warning — please check the data",
      "liveSurvey.alert.success": "Data is consistent — no issues found",
      "liveSurvey.alert.connError": "Server connection error",

      "batchUpload.breadcrumb.current": "File Verification",
      "batchUpload.pageTitle": "File Verification",
      "batchUpload.panel.uploadTitle": "Upload a CSV or Excel File",
      "batchUpload.upload.instructions":
        'Drag a <strong>.csv</strong> or <strong>.xlsx</strong> file here or click to select',
      "batchUpload.btn.process": "Process via Haris",
      "batchUpload.spinner.text": "Processing file... please wait",
      "batchUpload.panel.resultsTitle": "Verification Results",
      "batchUpload.table.row": "Row",
      "batchUpload.table.recordId": "Record ID (f_m_id)",
      "batchUpload.table.risk": "Risk Score",
      "batchUpload.table.issues": "Detected Issues",
      "batchUpload.err.invalidFile": "Please upload a file in .csv or .xlsx format only",
      "batchUpload.err.processFailed": "File verification failed",
      "batchUpload.err.serverConn":
        "Server connection error. Make sure the server is running on port 8000.",
      "batchUpload.results.none": "No results",
      "batchUpload.results.noIssues": "✅ No issues found",
    },
  };

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || "ar";
  }

  function t(key) {
    const lang = getLang();
    return (translations[lang] && translations[lang][key]) || translations.ar[key] || key;
  }

  function applyTranslations(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      el.setAttribute("alt", t(el.getAttribute("data-i18n-alt")));
    });

    const toggleBtn = document.getElementById("langToggle");
    if (toggleBtn) {
      toggleBtn.textContent = t("nav.langToggle");
    }
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(lang);
  }

  function toggleLang() {
    setLang(getLang() === "ar" ? "en" : "ar");
  }

  window.HarisI18n = { t, getLang, setLang, toggleLang, applyTranslations };

  document.addEventListener("DOMContentLoaded", () => {
    applyTranslations(getLang());
    const toggleBtn = document.getElementById("langToggle");
    if (toggleBtn) toggleBtn.addEventListener("click", toggleLang);
  });
})();
