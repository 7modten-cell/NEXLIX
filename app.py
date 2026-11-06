from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

CATEGORIES = [
    {"id": "matches", "name": "مباريات مباشرة", "icon": "⚽", "desc": "أهم المواجهات والأحداث الرياضية"},
    {"id": "tv", "name": "تلفزيون", "icon": "▣", "desc": "قنوات تلفزيونية متنوعة"},
    {"id": "movies", "name": "أفلام", "icon": "🎬", "desc": "أحدث الأفلام من كل الأنواع"},
    {"id": "series", "name": "مسلسلات", "icon": "🍿", "desc": "مسلسلاتك المفضلة في مكان واحد"},
]

FEATURED = [
    {"title": "ليلة الأبطال", "type": "مباريات مباشرة", "tag": "مباشر الآن", "art": "stadium", "description": "عش أجواء المباريات الكبرى بجودة مشاهدة مميزة."},
    {"title": "عالم السينما", "type": "أفلام", "tag": "اختياراتنا", "art": "cinema", "description": "اكتشف مجموعة من الأفلام التي تستحق المشاهدة."},
    {"title": "حكايات لا تنتهي", "type": "مسلسلات", "tag": "الأكثر مشاهدة", "art": "series", "description": "تابع أحدث الحلقات واستمتع بقصص مختلفة."},
    {"title": "قنواتك المفضلة", "type": "تلفزيون", "tag": "بث متنوع", "art": "tv", "description": "واجهة واحدة للوصول إلى القنوات المتاحة."},
]

CATALOG = [
    {"title": "ليلة في الملعب", "category": "مباريات مباشرة", "meta": "رياضة • مباشر", "art": "stadium"},
    {"title": "رحلة إلى المجهول", "category": "أفلام", "meta": "مغامرة • 2026", "art": "adventure"},
    {"title": "المدينة", "category": "مسلسلات", "meta": "دراما • موسم 1", "art": "city"},
    {"title": "شاشة العالم", "category": "تلفزيون", "meta": "قنوات متنوعة", "art": "tv"},
    {"title": "المواجهة", "category": "أفلام", "meta": "أكشن • 2026", "art": "action"},
    {"title": "ما وراء الحكاية", "category": "مسلسلات", "meta": "تشويق • موسم 2", "art": "mystery"},
    {"title": "وقت إضافي", "category": "مباريات مباشرة", "meta": "رياضة • مباشر", "art": "stadium2"},
    {"title": "ليالي العاصمة", "category": "مسلسلات", "meta": "دراما • 8 حلقات", "art": "night"},
]

@app.route("/")
def home():
    return render_template("index.html", categories=CATEGORIES, featured=FEATURED, catalog=CATALOG)

@app.route("/search")
def search():
    q = request.args.get("q", "").strip().lower()
    results = [item for item in CATALOG if q and (q in item["title"].lower() or q in item["category"].lower())]
    return render_template("partials/search_results.html", results=results, query=q)

@app.route("/category/<category_id>")
def category(category_id):
    category_map = {c["id"]: c for c in CATEGORIES}
    selected = category_map.get(category_id)
    if not selected:
        return render_template("partials/catalog_grid.html", items=[], title="القسم غير موجود")
    items = [x for x in CATALOG if x["category"] == selected["name"]]
    return render_template("partials/catalog_grid.html", items=items, title=selected["name"])

@app.route("/api/health")
def health():
    return jsonify({"ok": True, "app": "NEXLIX"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
