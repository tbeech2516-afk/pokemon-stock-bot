import { Config } from "@remotion/cli/config";

// remotion.media (Remotion's browser download host) is blocked in some sandboxes.
// setup.sh exports REMOTION_BROWSER_EXECUTABLE pointing at HyperFrames' Chrome Headless Shell.
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
Config.setVideoImageFormat("jpeg");
