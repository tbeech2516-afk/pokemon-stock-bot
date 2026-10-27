#!/usr/bin/env bash
# Installs and verifies the video toolchain: FFmpeg, HyperFrames, Remotion.
# Usage: bash video/setup.sh   (re-run in every fresh container)
set -euo pipefail
cd "$(dirname "$0")"

HF_VERSION=0.8.207

if ! command -v ffmpeg >/dev/null; then
  apt-get update && apt-get install -y ffmpeg
fi

npm install -g "hyperframes@${HF_VERSION}"
hyperframes browser ensure
CHROME="$(hyperframes browser path)"
export REMOTION_BROWSER_EXECUTABLE="$CHROME"

(cd hyperframes-starter && npm install)
(cd remotion-starter && npm install && npx tsc --noEmit)

if [ "${1:-}" = "--verify" ]; then
  (cd hyperframes-starter && hyperframes render --output out.mp4)
  (cd remotion-starter && npx remotion render src/index.ts Main out.mp4)
  for f in hyperframes-starter/out.mp4 remotion-starter/out.mp4; do
    ffprobe -v error -show_entries stream=codec_name,width,height:format=duration -of compact "$f"
  done
fi

echo
echo "Done. For Remotion in new shells: export REMOTION_BROWSER_EXECUTABLE=\"$CHROME\""
