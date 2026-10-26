#!/usr/bin/env python3
"""One-time asset preparation: remove the Xiaohongshu watermark from the
nineteen supplied illustrations.

Requires: opencv-python-headless, numpy
Usage:
    python3 scripts/remove_watermarks.py [code ...]

With no arguments, every code in SOURCES is processed. Pass one or more codes
to process only those (e.g. ``python3 scripts/remove_watermarks.py 100 401``).

The watermark is composited at the same position in every image. A mask is
derived from the 414 plate (the cleanest background) and reused everywhere.
Originals live in originals/; cleaned PNGs are written to src/assets/status/.
"""
from __future__ import annotations

import sys
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "originals" if (ROOT / "originals").is_dir() else ROOT / "images"
OUT_DIR = ROOT / "src" / "assets" / "status"
CHECK_DIR = ROOT / "tmp" / "watermark-check"

SOURCES = {
    100: "100.jpg",
    200: "200.jpg",
    302: "302.jpg",
    304: "304.jpg",
    400: "400.jpg",
    401: "401.jpg",
    402: "402.jpg",
    403: "403.jpg",
    404: "404.jpg",
    408: "408.jpg",
    409: "409.jpg",
    413: "413.jpg",
    414: "414.jpg",
    418: "418.jpg",
    429: "429.jpg",
    451: "451.jpg",
    500: "500.jpg",
    502: "502.jpg",
    503: "503.jpg",
}

# Watermark bounds in the 1254x1254 source images.
X0, Y0, X1, Y1 = 990, 1140, 1240, 1248


def build_mask() -> np.ndarray:
    source = cv2.imread(str(SRC_DIR / SOURCES[414]))
    if source is None:
        raise SystemExit(f"Cannot read mask source: {SRC_DIR / SOURCES[414]}")
    gray = cv2.cvtColor(source[Y0:Y1, X0:X1], cv2.COLOR_BGR2GRAY)
    mask = (gray < 250).astype(np.uint8) * 255
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((2, 2), np.uint8))
    # Two dilations cover the anti-aliased white outline without smearing the art.
    mask = cv2.dilate(mask, np.ones((3, 3), np.uint8), iterations=2)
    full = np.zeros(source.shape[:2], np.uint8)
    full[Y0:Y1, X0:X1] = mask
    return full


def main() -> None:
    requested = [int(code) for code in sys.argv[1:]]
    if requested:
        unknown = [code for code in requested if code not in SOURCES]
        if unknown:
            raise SystemExit(f"Unknown codes: {unknown}")
        targets = {code: SOURCES[code] for code in requested}
    else:
        targets = SOURCES

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    CHECK_DIR.mkdir(parents=True, exist_ok=True)
    mask = build_mask()

    for code, filename in targets.items():
        source_path = SRC_DIR / filename
        image = cv2.imread(str(source_path))
        if image is None:
            raise SystemExit(f"Cannot read: {source_path}")
        cleaned = cv2.inpaint(image, mask, 3, cv2.INPAINT_TELEA)
        out_path = OUT_DIR / f"{code}.png"
        cv2.imwrite(str(out_path), cleaned, [cv2.IMWRITE_PNG_COMPRESSION, 9])

        # Preview crops for visual review.
        crop = cleaned[1080:1254, 950:1254]
        cv2.imwrite(
            str(CHECK_DIR / f"{code}-corner.png"),
            cv2.resize(crop, None, fx=2, fy=2, interpolation=cv2.INTER_NEAREST),
        )
        cv2.imwrite(
            str(CHECK_DIR / f"{code}-560.png"),
            cv2.resize(cleaned, (560, 560), interpolation=cv2.INTER_AREA),
        )
        print(f"{code}: {source_path.name} -> {out_path.name}")

    # Contact sheet at actual card size, five per row.
    codes = sorted(targets)
    thumbs = [cv2.imread(str(CHECK_DIR / f"{code}-560.png")) for code in codes]
    rows = [np.hstack(thumbs[i : i + 5]) for i in range(0, len(thumbs), 5)]
    width = rows[0].shape[1]
    rows = [
        np.hstack([row, np.full((row.shape[0], width - row.shape[1], 3), 255, np.uint8)])
        if row.shape[1] < width
        else row
        for row in rows
    ]
    cv2.imwrite(str(CHECK_DIR / "contact-560.png"), np.vstack(rows))
    print(f"Previews: {CHECK_DIR}")


if __name__ == "__main__":
    main()
