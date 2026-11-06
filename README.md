# NEXLIX

واجهة عربية RTL متجاوبة لمنصة ترفيه وبث، مبنية باستخدام HTML وCSS وTailwind CSS وHTMX وJavaScript وPython Flask.

## التشغيل

```bash
python -m venv .venv
source .venv/bin/activate       # Linux / macOS / Termux
# على Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
python app.py
```

افتح المتصفح على `http://127.0.0.1:5000`.

## هيكل المشروع

- `app.py`: خادم Flask ومسارات البحث والأقسام وواجهة الصحة.
- `templates/`: قوالب Jinja2 وواجهات HTMX الجزئية.
- `static/css/style.css`: التصميم المتجاوب والهوية البصرية.
- `static/js/app.js`: التفاعلات والفلاتر والقائمة والشرائح.

## ملاحظات التطوير

- الصور الحالية في البطاقات عبارة عن أعمال فنية تجريدية مولدة عبر CSS لتجنب الاعتماد على صور خارجية.
- Tailwind CSS محمّل عبر CDN للتطوير السريع. يفضّل بناء نسخة Tailwind محلية عند النشر.
- هذا قالب واجهة أولي؛ ربط بث مباشر أو مكتبة محتوى يتطلب مصادر مرخّصة وBackend لإدارة المحتوى والمستخدمين.
