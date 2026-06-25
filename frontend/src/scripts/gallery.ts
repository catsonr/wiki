// bundler entry for the shader gallery. the real engine lives in src/gallery/
// (it isn't a "page" and isn't a one-file script, so it sits outside both trees);
// importing main.ts here lets the src/scripts/ bundler emit it as dist/scripts/gallery.js,
// which the /shaders/gallery/ page opts into via Page.scripts. main.ts runs on load.
import "@/gallery/main.ts"
