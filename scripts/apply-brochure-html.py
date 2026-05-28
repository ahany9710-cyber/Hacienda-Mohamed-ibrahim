#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

LOCATION_AR = """
<!-- ============================================================
     6b · LOCATION
============================================================ -->
<section class="section location" id="location">
  <div class="wrap">
    <div class="location-grid fade-in">
      <div class="location-copy">
        <span class="eyebrow"><span class="num">/ 05</span><span>Accessibility</span><span class="sep"></span><span class="ar">الموقع</span></span>
        <h2 class="h2">على شاطئ <span class="serif">راس الحكمة</span></h2>
        <p class="lede">
          هاسيندا راس الحكمة في قلب أهم وجهة متوسطية ناشئة في مصر — اتصال مباشر
          بطريق الإسكندرية–مطروح الساحلي، وقرب مطار العلمين الدولي. هدوء منتجع حصري
          مع سهولة وصول للبحر المتوسط.
        </p>
        <div class="distance-bar" aria-label="Distances">
          <div class="distance"><span class="km">110</span><span class="lbl">New Alamein</span></div>
          <div class="distance"><span class="km">124</span><span class="lbl">Alamein Airport</span></div>
          <div class="distance"><span class="km">138</span><span class="lbl">Sidi Abd El Rahman</span></div>
          <div class="distance"><span class="km">165</span><span class="lbl">Hacienda Blue</span></div>
          <div class="distance"><span class="km">238</span><span class="lbl">Hacienda Ras El Hekma</span></div>
        </div>
      </div>
      <div class="location-map" style="background-image:url('/hacienda/brochure/location-map.webp')" role="img" aria-label="خريطة موقع هاسيندا راس الحكمة والمسافات"></div>
    </div>
  </div>
</section>
"""

LOCATION_EN = """
<!-- ============================================================
     6b · LOCATION
============================================================ -->
<section class="section location" id="location">
  <div class="wrap">
    <div class="location-grid fade-in">
      <div class="location-copy">
        <span class="eyebrow"><span class="num">/ 05</span><span>Accessibility &amp; Location</span></span>
        <h2 class="h2">On the shores of <span class="serif">Ras El Hekma</span></h2>
        <p class="lede">
          Hacienda Ras El Hekma sits at the heart of Egypt's most promising Mediterranean destination —
          seamless connectivity via the Alexandria–Matrouh coastal highway and convenient reach of
          New Alamein International Airport.
        </p>
        <div class="distance-bar" aria-label="Distances">
          <div class="distance"><span class="km">110</span><span class="lbl">New Alamein</span></div>
          <div class="distance"><span class="km">124</span><span class="lbl">Alamein Airport</span></div>
          <div class="distance"><span class="km">138</span><span class="lbl">Sidi Abd El Rahman</span></div>
          <div class="distance"><span class="km">165</span><span class="lbl">Hacienda Blue</span></div>
          <div class="distance"><span class="km">238</span><span class="lbl">Hacienda Ras El Hekma</span></div>
        </div>
      </div>
      <div class="location-map" style="background-image:url('/hacienda/brochure/location-map.webp')" role="img" aria-label="Hacienda Ras El Hekma location map"></div>
    </div>
  </div>
</section>
"""

ECO_GRID = """    <div class="eco-grid fade-in">
      <div class="eco-card">
        <span class="eco-num">01</span>
        <div class="eco-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2 17 L22 17 M6 17 L11 7 L13 7 L18 17 M8 13 H16"/></svg></div>
        <h3 class="eco-label">مطار راس الحكمة الدولي</h3>
        <span class="eco-en">Ras El Hekma International Airport</span>
      </div>
      <div class="eco-card">
        <span class="eco-num">02</span>
        <div class="eco-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M3 18 Q12 8 21 18 M12 8 V18 M7 14 L17 14"/></svg></div>
        <h3 class="eco-label">مارينا دولية + سفن سياحية</h3>
        <span class="eco-en">Marina &amp; Cruise Terminal</span>
      </div>
      <div class="eco-card">
        <span class="eco-num">03</span>
        <div class="eco-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="1"/><path d="M3 10 H21 M7 14 H10"/></svg></div>
        <h3 class="eco-label">منطقة الخدمات الحرة</h3>
        <span class="eco-en">Private Services Free Zone</span>
      </div>
      <div class="eco-card">
        <span class="eco-num">04</span>
        <div class="eco-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="3" y="10" width="7" height="11"/><rect x="13" y="4" width="7" height="17"/><path d="M5 13 H8 M5 17 H8 M15 8 H18 M15 12 H18 M15 16 H18"/></svg></div>
        <h3 class="eco-label">مركز الأعمال المركزي</h3>
        <span class="eco-en">Central Business District</span>
      </div>
      <div class="eco-card">
        <span class="eco-num">05</span>
        <div class="eco-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M6 19 V8 H18 V19 M8 19 H16 M10 12 H14 M4 19 H20"/></svg></div>
        <h3 class="eco-label">شبكة النقل السريع</h3>
        <span class="eco-en">Rapid Transit Network</span>
      </div>
      <div class="eco-card">
        <span class="eco-num">06</span>
        <div class="eco-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="1"/><circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/><path d="M12 4 V7 M12 17 V20 M4 12 H7 M17 12 H20"/></svg></div>
        <h3 class="eco-label">المدينة الذكية</h3>
        <span class="eco-en">Smart City</span>
      </div>
      <div class="eco-card">
        <span class="eco-num">07</span>
        <div class="eco-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2 20 L12 4 L22 20 Z M12 10 V16"/></svg></div>
        <h3 class="eco-label">واجهة بحرية عالمية</h3>
        <span class="eco-en">World Class Sea Front</span>
      </div>
      <div class="eco-card">
        <span class="eco-num">08</span>
        <div class="eco-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 18 Q12 6 20 18 M8 18 V12 H16 V18"/></svg></div>
        <h3 class="eco-label">أمفيتياتر بحري</h3>
        <span class="eco-en">Seafront Amphitheatre</span>
      </div>
    </div>"""


def patch(path: Path, location: str, is_ar: bool) -> None:
    t = path.read_text(encoding="utf-8")

    start = t.index('    <div class="eco-grid fade-in">')
    end = t.index("<!-- ============================================================\n     7 · THE PLACE")
    t = t[:start] + ECO_GRID + "\n  </div>\n</section>\n\n" + t[end:]

    marker = "<!-- ============================================================\n     7 · THE PLACE"
    if 'id="location"' not in t:
        t = t.replace(marker, location + "\n" + marker, 1)

    t = t.replace(
        "Egyptian Shores Meet Mediterranean Vision — A Joint Development",
        "A project defined by Emirati standards — scale, precision, and world-class coastal living",
    )

    dp = t.find('class="dev-img"')
    if dp >= 0:
        t = t[:dp] + t[dp:].replace("hospitality.webp", "cover.webp", 1)

    t = t.replace(
        "<span class=\"cap\">Palm Hills · Selected Projects</span>",
        "<span class=\"cap\">Palm Hills · 25+ Years on Egypt's Coast</span>",
    )
    t = t.replace("url('/hacienda/brochure/hero.webp')", "url('/hacienda/brochure/shoreline.webp')", 1)
    t = t.replace(
        "<div class=\"label\"><span>Gardens &amp; Landscape</span><span class=\"ar\">الحدائق واللاندسكيب · 4.8 km coast</span></div>",
        "<div class=\"label\"><span>Gardens &amp; Landscape</span><span class=\"ar\">الحدائق واللاندسكيب</span></div>",
    )

    pos = t.find('class="gal gal-club"')
    if pos >= 0:
        chunk = t[pos : pos + 420]
        t = t[:pos] + chunk.replace("hospitality.webp", "sports.webp").replace(
            "<span>Sporting Club</span>", "<span>Sports &amp; Wellness</span>"
        ) + t[pos + 420 :]

    t = t.replace(
        "principles-img\" style=\"background-image:url('/hacienda/brochure/parks.webp')",
        "principles-img\" style=\"background-image:url('/hacienda/brochure/landscape-quote.webp')",
        1,
    )

    old_principles = (
        "The masterplan begins where the Mediterranean ends — an editorial sequence\n"
        "          of shoreline, garden, and quiet civic order. Architecture is set low against\n"
        "          the horizon; landscape carries the weight. The result is a city that feels\n"
        "          discovered rather than constructed: restrained, sun-warmed, and unmistakably\n"
        "          of this coast."
    )
    new_principles = (
        "The masterplan is shaped by the natural dialogue between land and water — landscape, "
        "urban form, and architecture composed as one integrated system. Design elevates the "
        "Mediterranean setting so elegance, nature, and coastal living exist in perfect balance."
    )
    t = t.replace(old_principles, new_principles)

    if is_ar:
        t = re.sub(
            r'(<p class="hero-desc">\s*)مشروع بالم هيلز الأول كمدينة ساحلية متكاملة',
            r"\1مشروع بالم هيلز الأول كمدينة ساحلية مسوّرة",
            t,
            count=1,
        )
        t = t.replace(
            "و<strong>٨٦٪</strong> من المساحة مخصصة للحدائق والمياه.",
            "و<strong>٨٦٪</strong> من المساحة حدائق ومياه — وجهة ساحلية بمعايير عالمية.",
        )
        t = t.replace(
            "، بشاطئ يمتد <strong>٤.٨ كم</strong>،",
            "، بشاطئ يمتد <strong>٤.٨ كم</strong> على المتوسط،",
        )
        t = t.replace(
            "توازن بين الأناقة الهادئة والطبيعة الساحلية — العمارة بتكمّل المشهد بدل ما تطغى عليه.",
            "فلسفة التصميم: أناقة، طبيعة، وحياة ساحلية في توازن — اللاندسكيب والعمران في نظام واحد.",
        )
        t = t.replace(
            "<h2 class=\"h2\">سبع وجهات على <span class=\"serif\">الساحل الشمالي</span></h2>",
            "<h2 class=\"h2\">٨ مشاريع على <span class=\"serif\">الساحل الشمالي</span></h2>",
        )
        t = t.replace(
            "<h3 class=\"feature-title\">فيلا فائقة الفخامة</h3>",
            "<h3 class=\"feature-title\">فيلا فائقة الفخامة — Shoreline Villa</h3>",
        )
        t = t.replace('              <option value="تاون هاوس">تاون هاوس</option>\n', "")
        t = t.replace(
            "<span class=\"office-en\">Namaa #75, Road 90</span>",
            "<span class=\"office-en\">Namaa Building #75, Road 90</span>",
        )
        t = t.replace(
            "<span class=\"office-area\">التجمع الخامs</span>",
            "<span class=\"office-area\">5th Settlement · التجمع</span>",
        )
    else:
        t = t.replace(
            "— Egypt's Most Considered Stretch of Mediterranean Shoreline —",
            "— The Mediterranean's Most Extraordinary Shoreline —",
        )
        t = t.replace('              <option value="Townhouse">Townhouse</option>\n', "")
        t = t.replace('              <option value="تاون هاوس">تاون هاوس</option>\n', "")

    t = t.replace(
        "background-image:url('/hacienda/brochure/hero-render.webp')",
        "background-image:url('/hacienda/brochure/unit-ultra-villa.webp')",
        1,
    )
    t = t.replace("<span class=\"tag\">VILLA · 01</span>", "<span class=\"tag\">SHORELINE VILLA · 01</span>")
    t = t.replace(
        "background-image:url('/hacienda/brochure/chalet.png')",
        "background-image:url('/hacienda/brochure/unit-chalet.webp')",
    )
    t = t.replace(
        "background-image:url('/hacienda/brochure/amenities.webp')\"><span class=\"tag\">03 · Apartment",
        "background-image:url('/hacienda/brochure/unit-apartment.webp')\"><span class=\"tag\">03 · Apartment",
    )
    t = t.replace(
        "background-image:url('/hacienda/brochure/hospitality.webp')\"><span class=\"tag\">04 · Twin",
        "background-image:url('/hacienda/brochure/unit-twin.webp')\"><span class=\"tag\">04 · Twin",
    )

    shore = "Seabreeze · حتى 280 m²" if is_ar else "Seabreeze · up to 280 m²"
    apt = "Beach Homes · من 65 m²" if is_ar else "Beach Homes · from 65 m²"
    t = t.replace('<span class="unit-meta">Shoreline view</span>', f'<span class="unit-meta">{shore}</span>')
    t = t.replace('<span class="unit-meta">Branded Residences</span>', f'<span class="unit-meta">{apt}</span>')
    t = t.replace(
        '<span class="unit-meta">Garden &amp; landscape</span>',
        '<span class="unit-meta">The Duo · 320 m² land</span>',
    )

    path.write_text(t, encoding="utf-8")
    print("patched", path.name)


if __name__ == "__main__":
    patch(ROOT / "public/prototype/index.html", LOCATION_AR, True)
    patch(ROOT / "public/prototype/en/index.html", LOCATION_EN, False)
