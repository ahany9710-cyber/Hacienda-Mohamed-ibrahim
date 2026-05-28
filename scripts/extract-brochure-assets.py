#!/usr/bin/env python3
"""Extract brochure images from PH-RH.pdf with page-specific picks."""

from __future__ import annotations

import io
import sys
from pathlib import Path

import fitz
from PIL import Image

PDF = Path("/Users/ahmedhany/Desktop/PH-RH.pdf")
OUT = Path(__file__).resolve().parents[1] / "public" / "hacienda" / "brochure"
RAW = OUT / "raw"
MAX_WIDTH = 2200
WEBP_QUALITY = 80

# name -> (page_number, image_index_on_page)
PAGE_MAP: dict[str, tuple[int, int]] = {
    "cover": (4, 1),
    "partnership": (5, 0),
    "hero-render": (6, 3),
    "collaboration": (7, 3),
    "ecosystem": (8, 3),
    "location-map": (9, 3),
    "masterplan": (10, 3),
    "shoreline": (11, 1),
    "parks": (12, 3),
    "landscape-quote": (13, 1),
    "hospitality": (14, 0),
    "amenities": (15, 1),
    "sports": (16, 1),
    "residential": (17, 1),
    "unit-ultra-villa": (18, 1),
    "unit-chalet": (20, 0),
    "unit-twin": (21, 0),
    "unit-apartment": (22, 1),
    "unit-branded": (14, 0),
    "hero": (11, 1),
}


def extract_by_index(doc: fitz.Document, page_num: int, img_index: int) -> tuple[bytes, str]:
    page = doc[page_num - 1]
    images = page.get_images(full=True)
    if img_index >= len(images):
        raise RuntimeError(f"Page {page_num} has {len(images)} images, wanted index {img_index}")
    info = doc.extract_image(images[img_index][0])
    return info["image"], info["ext"]


def to_webp(data: bytes, dest: Path) -> None:
    img = Image.open(io.BytesIO(data))
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGBA")
    elif img.mode != "RGB":
        img = img.convert("RGB")

    w, h = img.size
    if w > MAX_WIDTH:
        nh = max(1, int(h * (MAX_WIDTH / w)))
        img = img.resize((MAX_WIDTH, nh), Image.Resampling.LANCZOS)

    dest.parent.mkdir(parents=True, exist_ok=True)
    quality = WEBP_QUALITY
    img.save(dest, "WEBP", quality=quality, method=6)

    # Re-compress if still too large
    while dest.stat().st_size > 420_000 and quality > 58:
        quality -= 6
        img.save(dest, "WEBP", quality=quality, method=6)

    kb = dest.stat().st_size // 1024
    print(f"  -> {dest.name} ({kb} KB, q={quality}, {img.size[0]}x{img.size[1]})")


def main() -> int:
    if not PDF.exists():
        print(f"PDF not found: {PDF}", file=sys.stderr)
        return 1

    OUT.mkdir(parents=True, exist_ok=True)
    RAW.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(PDF)

    for name, (page_num, img_index) in PAGE_MAP.items():
        print(f"Extracting {name} from page {page_num} image #{img_index}...")
        data, ext = extract_by_index(doc, page_num, img_index)
        raw_path = RAW / f"{name}-p{page_num:02d}-i{img_index}.{ext}"
        raw_path.write_bytes(data)
        to_webp(data, OUT / f"{name}.webp")

    doc.close()
    print("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
