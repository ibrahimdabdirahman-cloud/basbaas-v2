#!/usr/bin/env bash
# ----------------------------------------------------------------------
# BasBaas — fetch the real food photography into assets/img/
#
# The repo ships with on-brand PLACEHOLDER images so it deploys cleanly.
# Run this once to replace them with the real photos from the live site.
#
#   chmod +x fetch-assets.sh && ./fetch-assets.sh
#
# Requires: curl (preinstalled on macOS/Linux; on Windows use Git Bash/WSL,
# or run fetch-assets.mjs with Node instead).
# ----------------------------------------------------------------------
set -euo pipefail

BASE="https://basbaascuisine.co.uk/wp-content/uploads"
DEST="assets/img"
REFERER="https://basbaascuisine.co.uk/"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

mkdir -p "$DEST"

# path-under-uploads        ->  saved filename
urls=(
  "2026/01/basbaas-main.jpg"
  "2026/02/Tea-Sabaayad.jpg"
  "2026/01/PHOTO-2026-01-10-17-43-37-5.jpg"
  "2026/01/PHOTO-2026-01-10-17-43-36-3.jpg"
  "2026/01/PHOTO-2026-01-10-17-43-36-5.jpg"
  "2026/01/PHOTO-2026-01-10-17-43-37-9.jpg"
  "2026/01/unnamed15.jpg"
  "2026/01/PHOTO-2026-01-10-17-43-36-11.jpg"
  "2026/01/PHOTO-2026-01-10-17-43-37-7.jpg"
  "2026/01/PHOTO-2026-01-10-17-43-38.jpg"
  "2026/01/PHOTO-2026-01-10-17-43-36.jpg"
  "2026/01/PHOTO-2026-01-10-17-43-37-8.jpg"
  "2026/01/omelet.jpg"
  "2026/01/PHOTO-2026-01-10-17-43-36-2.jpg"
  "2026/05/PHOTO-2026-05-07-20-31-18.jpg"
  "2026/01/PHOTO-2026-01-10-17-43-36-9.jpg"
)

ok=0; fail=0
for path in "${urls[@]}"; do
  name="$(basename "$path")"
  if curl -fsSL -A "$UA" -e "$REFERER" "$BASE/$path" -o "$DEST/$name"; then
    echo "  ✓ $name"
    ok=$((ok+1))
  else
    echo "  ✗ $name  (could not download)"
    fail=$((fail+1))
  fi
done

echo ""
echo "Done. $ok downloaded, $fail failed into $DEST/"
[ "$fail" -eq 0 ] || echo "If some failed, the source images may have moved — drop your own photos into $DEST/ using the same filenames."
