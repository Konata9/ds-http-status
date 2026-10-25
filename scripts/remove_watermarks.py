#!/usr/bin/env python3
"""One-time asset preparation: remove the Xiaohongshu watermark from the
ten supplied illustrations.

Requires: opencv-python-headless, numpy
Usage:
    python3 scripts/remove_watermarks.py

The watermark is composited at the same position in every image. A mask is
derived from the 414 plate (the cleanest background) and reused everywhere.
Originals live in originals/; cleaned PNGs are written to src/assets/status/.
"""
from __future__ import annotations

from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "originals" if (ROOT / "originals").is_dir() else ROOT / "images"
OUT_DIR = ROOT / "src" / "assets" / "status"
CHECK_DIR = ROOT / "tmp" / "watermark-check"

SOURCES = {
    200: "Camera_XHS_1792387467866notes_pre_post_1040g3k0326fiahl3l0005q8v4irdtvdtdbhiivg.jpg",
    401: "Camera_XHS_1792387470067notes_pre_post_1040g3k0326fiagh1l6005q8v4irdtvdtg39v8s0.jpg",
    403: "Camera_XHS_1792387472501notes_pre_post_1040g3k0326fiahfm50005q8v4irdtvdtr4hakfo.jpg",
    404: "Camera_XHS_1792387477149notes_pre_post_1040g3k0326fiahas4e005q8v4irdtvdtpekrnbg.jpg",
    408: "Camera_XHS_1792387479623notes_pre_post_1040g3k0326fiah68lg005q8v4irdtvdtpmhj9tg.jpg",
    414: "Camera_XHS_1792387463783notes_pre_post_1040g3k0326fi2qnoke2g5q8v4irdtvdtiav4o4o.jpg",
    418: "Camera_XHS_1792387481972notes_pre_post_1040g3k0326fiag93lg705q8v4irdtvdtg33ion0.jpg",
    429: "Camera_XHS_1792387484352notes_pre_post_1040g3k0326fiah1d56005q8v4irdtvdtvvem1u8.jpg",
    500: "Camera_XHS_1792387489072notes_pre_post_1040g3k0326fiagnjke005q8v4irdtvdt7psk0bg.jpg",
    503: "Camera_XHS_1792387486875notes_pre_post_1040g3k0326fiags6l6005q8v4irdtvdtjrl3t5g.jpg",
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
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    CHECK_DIR.mkdir(parents=True, exist_ok=True)
    mask = build_mask()

    for code, filename in SOURCES.items():
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

    # Contact sheet at actual card size.
    thumbs = [cv2.imread(str(CHECK_DIR / f"{code}-560.png")) for code in sorted(SOURCES)]
    rows = [np.hstack(thumbs[i : i + 5]) for i in range(0, 10, 5)]
    cv2.imwrite(str(CHECK_DIR / "contact-560.png"), np.vstack(rows))
    print(f"Previews: {CHECK_DIR}")


if __name__ == "__main__":
    main()
