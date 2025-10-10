// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module != 'undefined' ? Module : {};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope != 'undefined';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && process.versions?.node && process.type != 'renderer';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
// include: /var/folders/v8/kv5tdb4s5d57h2swgmltjd580000gn/T/tmpadwczeg2.js

  Module['expectedDataFileDownloads'] ??= 0;
  Module['expectedDataFileDownloads']++;
  (() => {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    var isPthread = typeof ENVIRONMENT_IS_PTHREAD != 'undefined' && ENVIRONMENT_IS_PTHREAD;
    var isWasmWorker = typeof ENVIRONMENT_IS_WASM_WORKER != 'undefined' && ENVIRONMENT_IS_WASM_WORKER;
    if (isPthread || isWasmWorker) return;
    var isNode = typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string';
    function loadPackage(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.substring(0, location.pathname.lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'beatboxx.data';
      var REMOTE_PACKAGE_BASE = 'beatboxx.data';
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (isNode) {
          require('fs').readFile(packageName, (err, contents) => {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        Module['dataFileDownloads'] ??= {};
        fetch(packageName)
          .catch((cause) => Promise.reject(new Error(`Network Error: ${packageName}`, {cause}))) // If fetch fails, rewrite the error to include the failing URL & the cause.
          .then((response) => {
            if (!response.ok) {
              return Promise.reject(new Error(`${response.status}: ${response.url}`));
            }

            if (!response.body && response.arrayBuffer) { // If we're using the polyfill, readers won't be available...
              return response.arrayBuffer().then(callback);
            }

            const reader = response.body.getReader();
            const iterate = () => reader.read().then(handleChunk).catch((cause) => {
              return Promise.reject(new Error(`Unexpected error while handling : ${response.url} ${cause}`, {cause}));
            });

            const chunks = [];
            const headers = response.headers;
            const total = Number(headers.get('Content-Length') ?? packageSize);
            let loaded = 0;

            const handleChunk = ({done, value}) => {
              if (!done) {
                chunks.push(value);
                loaded += value.length;
                Module['dataFileDownloads'][packageName] = {loaded, total};

                let totalLoaded = 0;
                let totalSize = 0;

                for (const download of Object.values(Module['dataFileDownloads'])) {
                  totalLoaded += download.loaded;
                  totalSize += download.total;
                }

                Module['setStatus']?.(`Downloading data... (${totalLoaded}/${totalSize})`);
                return iterate();
              } else {
                const packageData = new Uint8Array(chunks.map((c) => c.length).reduce((a, b) => a + b, 0));
                let offset = 0;
                for (const chunk of chunks) {
                  packageData.set(chunk, offset);
                  offset += chunk.length;
                }
                callback(packageData.buffer);
              }
            };

            Module['setStatus']?.('Downloading data...');
            return iterate();
          });
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, (data) => {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS(Module) {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "assets", true, true);
Module['FS_createPath']("/assets", "fonts", true, true);
Module['FS_createPath']("/assets/fonts", "DotGothic16", true, true);
Module['FS_createPath']("/assets/fonts", "Doto", true, true);
Module['FS_createPath']("/assets/fonts/Doto", "static", true, true);
Module['FS_createPath']("/assets/fonts", "Exile", true, true);
Module['FS_createPath']("/assets/fonts", "JetBrains_Mono", true, true);
Module['FS_createPath']("/assets/fonts/JetBrains_Mono", "static", true, true);
Module['FS_createPath']("/assets/fonts", "Nabla", true, true);
Module['FS_createPath']("/assets/fonts", "splatoon3", true, true);
Module['FS_createPath']("/assets", "out", true, true);
Module['FS_createPath']("/assets/out", "diva_assets", true, true);
Module['FS_createPath']("/assets/out/diva_assets", "spr_ps4_cmn", true, true);
Module['FS_createPath']("/assets", "sfx", true, true);
Module['FS_createPath']("/assets", "shaders", true, true);
Module['FS_createPath']("/assets", "textures", true, true);
Module['FS_createPath']("/assets", "tracks", true, true);
Module['FS_createPath']("/", "vendored", true, true);
Module['FS_createPath']("/vendored", "lygia", true, true);
Module['FS_createPath']("/vendored/lygia", ".github", true, true);
Module['FS_createPath']("/vendored/lygia", "animation", true, true);
Module['FS_createPath']("/vendored/lygia/animation", "easing", true, true);
Module['FS_createPath']("/vendored/lygia", "color", true, true);
Module['FS_createPath']("/vendored/lygia/color", "blend", true, true);
Module['FS_createPath']("/vendored/lygia/color", "composite", true, true);
Module['FS_createPath']("/vendored/lygia/color", "dither", true, true);
Module['FS_createPath']("/vendored/lygia/color", "layer", true, true);
Module['FS_createPath']("/vendored/lygia/color", "levels", true, true);
Module['FS_createPath']("/vendored/lygia/color", "palette", true, true);
Module['FS_createPath']("/vendored/lygia/color/palette", "pigments", true, true);
Module['FS_createPath']("/vendored/lygia/color/palette", "spectral", true, true);
Module['FS_createPath']("/vendored/lygia/color/palette", "wada", true, true);
Module['FS_createPath']("/vendored/lygia/color", "space", true, true);
Module['FS_createPath']("/vendored/lygia/color", "tonemap", true, true);
Module['FS_createPath']("/vendored/lygia", "distort", true, true);
Module['FS_createPath']("/vendored/lygia", "draw", true, true);
Module['FS_createPath']("/vendored/lygia", "filter", true, true);
Module['FS_createPath']("/vendored/lygia/filter", "boxBlur", true, true);
Module['FS_createPath']("/vendored/lygia/filter", "edge", true, true);
Module['FS_createPath']("/vendored/lygia/filter", "gaussianBlur", true, true);
Module['FS_createPath']("/vendored/lygia/filter", "median", true, true);
Module['FS_createPath']("/vendored/lygia/filter", "sharpen", true, true);
Module['FS_createPath']("/vendored/lygia", "generative", true, true);
Module['FS_createPath']("/vendored/lygia", "geometry", true, true);
Module['FS_createPath']("/vendored/lygia/geometry", "aabb", true, true);
Module['FS_createPath']("/vendored/lygia/geometry", "triangle", true, true);
Module['FS_createPath']("/vendored/lygia", "lighting", true, true);
Module['FS_createPath']("/vendored/lygia/lighting", "common", true, true);
Module['FS_createPath']("/vendored/lygia/lighting", "diffuse", true, true);
Module['FS_createPath']("/vendored/lygia/lighting", "ior", true, true);
Module['FS_createPath']("/vendored/lygia/lighting", "light", true, true);
Module['FS_createPath']("/vendored/lygia/lighting", "material", true, true);
Module['FS_createPath']("/vendored/lygia/lighting", "medium", true, true);
Module['FS_createPath']("/vendored/lygia/lighting", "ray", true, true);
Module['FS_createPath']("/vendored/lygia/lighting", "raymarch", true, true);
Module['FS_createPath']("/vendored/lygia/lighting", "shadingData", true, true);
Module['FS_createPath']("/vendored/lygia/lighting", "specular", true, true);
Module['FS_createPath']("/vendored/lygia", "math", true, true);
Module['FS_createPath']("/vendored/lygia/math", "quat", true, true);
Module['FS_createPath']("/vendored/lygia", "morphological", true, true);
Module['FS_createPath']("/vendored/lygia/morphological", "pyramid", true, true);
Module['FS_createPath']("/vendored/lygia", "sample", true, true);
Module['FS_createPath']("/vendored/lygia", "sdf", true, true);
Module['FS_createPath']("/vendored/lygia", "simulate", true, true);
Module['FS_createPath']("/vendored/lygia", "space", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency'](`fp ${this.name}`);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency'](`fp ${that.name}`);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_beatboxx.data');

      };
      Module['addRunDependency']('datafile_beatboxx.data');

      Module['preloadResults'] ??= {};

      Module['preloadResults'][PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS(Module);
    } else {
      (Module['preRun'] ??= []).push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/assets/.DS_Store", "start": 0, "end": 6148}, {"filename": "/assets/fonts/.DS_Store", "start": 6148, "end": 14344}, {"filename": "/assets/fonts/DotGothic16/DotGothic16-Regular.ttf", "start": 14344, "end": 2041392}, {"filename": "/assets/fonts/DotGothic16/OFL.txt", "start": 2041392, "end": 2045885}, {"filename": "/assets/fonts/Doto/Doto-VariableFont_ROND,wght.ttf", "start": 2045885, "end": 2502605}, {"filename": "/assets/fonts/Doto/OFL.txt", "start": 2502605, "end": 2507080}, {"filename": "/assets/fonts/Doto/README.txt", "start": 2507080, "end": 2509715}, {"filename": "/assets/fonts/Doto/static/Doto-Black.ttf", "start": 2509715, "end": 2650759}, {"filename": "/assets/fonts/Doto/static/Doto-Bold.ttf", "start": 2650759, "end": 2791771}, {"filename": "/assets/fonts/Doto/static/Doto-ExtraBold.ttf", "start": 2791771, "end": 2932839}, {"filename": "/assets/fonts/Doto/static/Doto-ExtraLight.ttf", "start": 2932839, "end": 3073883}, {"filename": "/assets/fonts/Doto/static/Doto-Light.ttf", "start": 3073883, "end": 3214899}, {"filename": "/assets/fonts/Doto/static/Doto-Medium.ttf", "start": 3214899, "end": 3355947}, {"filename": "/assets/fonts/Doto/static/Doto-Regular.ttf", "start": 3355947, "end": 3496803}, {"filename": "/assets/fonts/Doto/static/Doto-SemiBold.ttf", "start": 3496803, "end": 3637863}, {"filename": "/assets/fonts/Doto/static/Doto-Thin.ttf", "start": 3637863, "end": 3778871}, {"filename": "/assets/fonts/Doto/static/Doto_Rounded-Black.ttf", "start": 3778871, "end": 3952831}, {"filename": "/assets/fonts/Doto/static/Doto_Rounded-Bold.ttf", "start": 3952831, "end": 4126783}, {"filename": "/assets/fonts/Doto/static/Doto_Rounded-ExtraBold.ttf", "start": 4126783, "end": 4300767}, {"filename": "/assets/fonts/Doto/static/Doto_Rounded-ExtraLight.ttf", "start": 4300767, "end": 4474755}, {"filename": "/assets/fonts/Doto/static/Doto_Rounded-Light.ttf", "start": 4474755, "end": 4648715}, {"filename": "/assets/fonts/Doto/static/Doto_Rounded-Medium.ttf", "start": 4648715, "end": 4822679}, {"filename": "/assets/fonts/Doto/static/Doto_Rounded-Regular.ttf", "start": 4822679, "end": 4996655}, {"filename": "/assets/fonts/Doto/static/Doto_Rounded-SemiBold.ttf", "start": 4996655, "end": 5170631}, {"filename": "/assets/fonts/Doto/static/Doto_Rounded-Thin.ttf", "start": 5170631, "end": 5344583}, {"filename": "/assets/fonts/Exile/Exile-Regular.ttf", "start": 5344583, "end": 5441811}, {"filename": "/assets/fonts/Exile/OFL.txt", "start": 5441811, "end": 5446286}, {"filename": "/assets/fonts/JetBrains_Mono/JetBrainsMono-Italic-VariableFont_wght.ttf", "start": 5446286, "end": 5641782}, {"filename": "/assets/fonts/JetBrains_Mono/JetBrainsMono-VariableFont_wght.ttf", "start": 5641782, "end": 5833150}, {"filename": "/assets/fonts/JetBrains_Mono/OFL.txt", "start": 5833150, "end": 5837642}, {"filename": "/assets/fonts/JetBrains_Mono/README.txt", "start": 5837642, "end": 5840605}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-Bold.ttf", "start": 5840605, "end": 5955433}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-BoldItalic.ttf", "start": 5955433, "end": 6073353}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-ExtraBold.ttf", "start": 6073353, "end": 6188153}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-ExtraBoldItalic.ttf", "start": 6188153, "end": 6306105}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-ExtraLight.ttf", "start": 6306105, "end": 6421177}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-ExtraLightItalic.ttf", "start": 6421177, "end": 6539405}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-Italic.ttf", "start": 6539405, "end": 6657345}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-Light.ttf", "start": 6657345, "end": 6772365}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-LightItalic.ttf", "start": 6772365, "end": 6890489}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-Medium.ttf", "start": 6890489, "end": 7005409}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-MediumItalic.ttf", "start": 7005409, "end": 7123453}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-Regular.ttf", "start": 7123453, "end": 7238357}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-SemiBold.ttf", "start": 7238357, "end": 7353257}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-SemiBoldItalic.ttf", "start": 7353257, "end": 7471289}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-Thin.ttf", "start": 7471289, "end": 7586285}, {"filename": "/assets/fonts/JetBrains_Mono/static/JetBrainsMono-ThinItalic.ttf", "start": 7586285, "end": 7704441}, {"filename": "/assets/fonts/Nabla/Nabla-Regular-VariableFont_EDPT,EHLT.ttf", "start": 7704441, "end": 9347805}, {"filename": "/assets/fonts/Nabla/OFL.txt", "start": 9347805, "end": 9352284}, {"filename": "/assets/fonts/Nabla/README.txt", "start": 9352284, "end": 9354314}, {"filename": "/assets/fonts/splatoon3/AsiaKCUBE-R.ttf", "start": 9354314, "end": 10216014}, {"filename": "/assets/fonts/splatoon3/AsiaKERIN-M.ttf", "start": 10216014, "end": 11230066}, {"filename": "/assets/fonts/splatoon3/BlitzBold.otf", "start": 11230066, "end": 11512134}, {"filename": "/assets/fonts/splatoon3/BlitzMain.otf", "start": 11512134, "end": 11792270}, {"filename": "/assets/fonts/splatoon3/DFPT_AZ5.ttf", "start": 11792270, "end": 15939210}, {"filename": "/assets/fonts/splatoon3/DFPT_ZY9.ttf", "start": 15939210, "end": 19637558}, {"filename": "/assets/fonts/splatoon3/DFP_GBZY7.ttf", "start": 19637558, "end": 21247138}, {"filename": "/assets/fonts/splatoon3/DFP_GBZY9.ttf", "start": 21247138, "end": 22851398}, {"filename": "/assets/fonts/splatoon3/FOT-KurokaneStd-EB.otf", "start": 22851398, "end": 24981290}, {"filename": "/assets/fonts/splatoon3/FOT-RowdyStd-EB.otf", "start": 24981290, "end": 27372750}, {"filename": "/assets/fonts/splatoon3/NinSplatoonSdodrNumber-Reg.otf", "start": 27372750, "end": 27380550}, {"filename": "/assets/fonts/splatoon3/NinSplatoonSdodrNumber-Reg.ttf", "start": 27380550, "end": 27388350}, {"filename": "/assets/fonts/splatoon3/SpAlterna-Regular.otf", "start": 27388350, "end": 27399082}, {"filename": "/assets/fonts/splatoon3/nintendoP_DotGothic12-M.otf", "start": 27399082, "end": 29122194}, {"filename": "/assets/out/Masayoshi Takanaka - DISCO \u201cB\u201d.mp3", "start": 29122194, "end": 35639109, "audio": 1}, {"filename": "/assets/out/diva_assets/Arcade - Hatsune Miku Project DIVA Arcade - Results Screen Version B.png", "start": 35639109, "end": 40963550}, {"filename": "/assets/out/diva_assets/PlayStation 3 - Hatsune Miku Project DIVA Dreamy Theater - Project DIVA Arcade Leftovers.png", "start": 40963550, "end": 41055126}, {"filename": "/assets/out/diva_assets/PlayStation 3 - Hatsune Miku Project DIVA Dreamy Theater - Rhythm Game.png", "start": 41055126, "end": 41864063}, {"filename": "/assets/out/diva_assets/PlayStation 3 - Hatsune Miku Project DIVA F - Notes.png", "start": 41864063, "end": 42086494}, {"filename": "/assets/out/diva_assets/PlayStation 3 - Hatsune Miku Project DIVA F - Timing Indicators.png", "start": 42086494, "end": 42174601}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/BG_F.png", "start": 42174601, "end": 42496891}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/BG_FT.png", "start": 42496891, "end": 42859539}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/BG_T.png", "start": 42859539, "end": 43179245}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/COL_BLACK.png", "start": 43179245, "end": 43179393}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/DOWNLOAD.png", "start": 43179393, "end": 43183898}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/FT_WIN_L_SIDE.png", "start": 43183898, "end": 43210931}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/FT_WIN_L_TOP.png", "start": 43210931, "end": 43222183}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/FT_WIN_M.png", "start": 43222183, "end": 43242109}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/FT_WIN_S.png", "start": 43242109, "end": 43245954}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/F_WIN_L_SIDE.png", "start": 43245954, "end": 43270131}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/F_WIN_L_TOP.png", "start": 43270131, "end": 43281745}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/F_WIN_M.png", "start": 43281745, "end": 43299726}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/F_WIN_S.png", "start": 43299726, "end": 43303771}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/HEADER_LITE.png", "start": 43303771, "end": 43313404}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/HELP_01_FOOTER.png", "start": 43313404, "end": 43319809}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/HELP_02_FOOTER.png", "start": 43319809, "end": 43324352}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/HELP_M01_FOOTER.png", "start": 43324352, "end": 43329603}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/HELP_M02_FOOTER.png", "start": 43329603, "end": 43332478}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/HELP_NUM36X36.png", "start": 43332478, "end": 43335044}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/NUM_ARROW_L.png", "start": 43335044, "end": 43335953}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/NUM_ARROW_M.png", "start": 43335953, "end": 43336524}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/NUM_L_SLASH.png", "start": 43336524, "end": 43337074}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/NUM_M_SLASH.png", "start": 43337074, "end": 43337469}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/RIGHTS_ARR.png", "start": 43337469, "end": 43338197}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/RIGHTS_BG00.png", "start": 43338197, "end": 43338500}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/RIGHTS_BG01.png", "start": 43338500, "end": 43339954}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/RIGHTS_BG02.png", "start": 43339954, "end": 43341269}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/RIGHTS_GUI.png", "start": 43341269, "end": 43342347}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/RIGHTS_LYR.png", "start": 43342347, "end": 43342965}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/RIGHTS_MAN.png", "start": 43342965, "end": 43343988}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/RIGHTS_MUS.png", "start": 43343988, "end": 43344635}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/RIGHTS_PV.png", "start": 43344635, "end": 43345106}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/SAVE_ARW.png", "start": 43345106, "end": 43345626}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/SAVE_BASE.png", "start": 43345626, "end": 43346129}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/SAVE_TXT.png", "start": 43346129, "end": 43348289}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/SONG_JK_DUMMY.png", "start": 43348289, "end": 43355341}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/START_BASE.png", "start": 43355341, "end": 43361405}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/START_BASE_EFF.png", "start": 43361405, "end": 43366466}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/START_CTRL_TXT.png", "start": 43366466, "end": 43380418}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/START_GAME_TXT.png", "start": 43380418, "end": 43389682}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/START_PRAC_TXT.png", "start": 43389682, "end": 43398723}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/START_PV_TXT.png", "start": 43398723, "end": 43407311}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/START_SUR_TXT.png", "start": 43407311, "end": 43416889}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/TXT_A.png", "start": 43416889, "end": 43419637}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/TXT_D.png", "start": 43419637, "end": 43420956}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/TXT_DOT.png", "start": 43420956, "end": 43421406}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/TXT_G.png", "start": 43421406, "end": 43422608}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/TXT_I.png", "start": 43422608, "end": 43423453}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/TXT_L.png", "start": 43423453, "end": 43424438}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/TXT_N.png", "start": 43424438, "end": 43426262}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/TXT_O.png", "start": 43426262, "end": 43427300}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/TXT_W.png", "start": 43427300, "end": 43428678}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/T_WIN_L_SIDE.png", "start": 43428678, "end": 43453149}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/T_WIN_L_TOP.png", "start": 43453149, "end": 43464649}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/T_WIN_M.png", "start": 43464649, "end": 43483475}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/T_WIN_S.png", "start": 43483475, "end": 43487462}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_CUSTOM_GAME01.png", "start": 43487462, "end": 43705331}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_CUSTOM_GAME02.png", "start": 43705331, "end": 43782621}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_CUSTOM_GAME03.png", "start": 43782621, "end": 43804635}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_CUSTOM_ITEM01.png", "start": 43804635, "end": 44299377}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_CUSTOM_ITEM02.png", "start": 44299377, "end": 44606019}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_CUSTOM_ITEM03.png", "start": 44606019, "end": 44855101}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_CUSTOM_MENU01.png", "start": 44855101, "end": 45304005}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_CUSTOM_MENU02.png", "start": 45304005, "end": 45325069}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_CUSTOM_RHYTHM01.png", "start": 45325069, "end": 45575439}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_CUSTOM_RHYTHM02.png", "start": 45575439, "end": 45749703}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_CUSTOM_RHYTHM03.png", "start": 45749703, "end": 45780085}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_CUSTOM_RHYTHM04.png", "start": 45780085, "end": 45804119}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_GALLERY_MENU01.png", "start": 45804119, "end": 45822672}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_GALLERY_MENU02.png", "start": 45822672, "end": 45841544}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_GALLERY_RANKING01.png", "start": 45841544, "end": 46064307}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_GALLERY_RANKING02.png", "start": 46064307, "end": 46083631}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_GALLERY_RANKING03.png", "start": 46083631, "end": 46102977}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_GALLERY_RECORD01.png", "start": 46102977, "end": 46252822}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_GALLERY_RECORD02.png", "start": 46252822, "end": 46456345}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_GALLERY_RECORD03.png", "start": 46456345, "end": 46582602}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_GALLERY_THEATER01.png", "start": 46582602, "end": 46604629}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_MENU_GAME01.png", "start": 46604629, "end": 46944758}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_MENU_GAME02.png", "start": 46944758, "end": 47163519}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_MENU_GAME03.png", "start": 47163519, "end": 47371779}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_MENU_START01.png", "start": 47371779, "end": 47818006}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_MENU_START02.png", "start": 47818006, "end": 48270639}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_MENU_START03.png", "start": 48270639, "end": 48290848}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_MENU_SURVIVAL01.png", "start": 48290848, "end": 48459927}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_MENU_SURVIVAL02.png", "start": 48459927, "end": 48476275}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_MENU_SURVIVAL03.png", "start": 48476275, "end": 48494054}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_OPTION_MENU01.png", "start": 48494054, "end": 48652977}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_OPTION_MENU02.png", "start": 48652977, "end": 48970602}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_OPTION_MENU03.png", "start": 48970602, "end": 48990389}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_PLAYLIST_MENU01.png", "start": 48990389, "end": 49212819}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_PLAYLIST_MENU02.png", "start": 49212819, "end": 49450077}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_IMG_PLAYLIST_MENU03.png", "start": 49450077, "end": 49468574}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_CUSTOM_GAME.png", "start": 49468574, "end": 49472627}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_CUSTOM_ITEM.png", "start": 49472627, "end": 49480901}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_CUSTOM_MENU.png", "start": 49480901, "end": 49484432}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_CUSTOM_RHYTHM.png", "start": 49484432, "end": 49487474}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_CUSTOM_SOUND.png", "start": 49487474, "end": 49491244}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_GALLERY_MENU.png", "start": 49491244, "end": 49493768}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_GALLERY_RANKING.png", "start": 49493768, "end": 49496524}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_GALLERY_RECORD.png", "start": 49496524, "end": 49498529}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_GALLERY_THEATER.png", "start": 49498529, "end": 49502628}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_MENU_GAME.png", "start": 49502628, "end": 49506308}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_MENU_MENU.png", "start": 49506308, "end": 49509081}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_MENU_START.png", "start": 49509081, "end": 49512564}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_MENU_SURVIVAL.png", "start": 49512564, "end": 49515948}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_OPTION_MENU.png", "start": 49515948, "end": 49518833}, {"filename": "/assets/out/diva_assets/spr_ps4_cmn/WIN_TIT_PLAYLIST_MENU.png", "start": 49518833, "end": 49523008}, {"filename": "/assets/out/megamixnotes.txt", "start": 49523008, "end": 49523368}, {"filename": "/assets/out/summerinternship.txt", "start": 49523368, "end": 49524191}, {"filename": "/assets/out/terms.txt", "start": 49524191, "end": 49524597}, {"filename": "/assets/sfx/click.wav", "start": 49524597, "end": 49546729, "audio": 1}, {"filename": "/assets/sfx/note.wav", "start": 49546729, "end": 49568861, "audio": 1}, {"filename": "/assets/shaders/chess.frag", "start": 49568861, "end": 49569370}, {"filename": "/assets/shaders/cube.frag", "start": 49569370, "end": 49569467}, {"filename": "/assets/shaders/cube.vert", "start": 49569467, "end": 49569616}, {"filename": "/assets/shaders/lygiatest.frag", "start": 49569616, "end": 49570669}, {"filename": "/assets/shaders/march.frag", "start": 49570669, "end": 49575206}, {"filename": "/assets/shaders/march.vert", "start": 49575206, "end": 49575474}, {"filename": "/assets/shaders/msdf.frag", "start": 49575474, "end": 49575967}, {"filename": "/assets/shaders/msdf.vert", "start": 49575967, "end": 49576259}, {"filename": "/assets/shaders/shaderprogram.vert", "start": 49576259, "end": 49576645}, {"filename": "/assets/shaders/shaderprogram_texture.frag", "start": 49576645, "end": 49576845}, {"filename": "/assets/shaders/solidcolor.frag", "start": 49576845, "end": 49576950}, {"filename": "/assets/shaders/triangle.frag", "start": 49576950, "end": 49577800}, {"filename": "/assets/shaders/triangle.vert", "start": 49577800, "end": 49578185}, {"filename": "/assets/shaders/triangle_christmas.frag", "start": 49578185, "end": 49578777}, {"filename": "/assets/shaders/triangle_hexagon.frag", "start": 49578777, "end": 49579853}, {"filename": "/assets/textures/pkmn_font.png", "start": 49579853, "end": 49645796}, {"filename": "/assets/textures/wolf.jpg", "start": 49645796, "end": 49834838}, {"filename": "/assets/tracks/boa.jpg", "start": 49834838, "end": 49960969}, {"filename": "/assets/tracks/boa.json", "start": 49960969, "end": 49960987}, {"filename": "/assets/tracks/boa.mp3", "start": 49960987, "end": 53527586, "audio": 1}, {"filename": "/assets/tracks/daft punk.jpg", "start": 53527586, "end": 53600795}, {"filename": "/assets/tracks/daft punk.json", "start": 53600795, "end": 53600813}, {"filename": "/assets/tracks/daft punk.mp3", "start": 53600813, "end": 57307173, "audio": 1}, {"filename": "/assets/tracks/ginger root.jpg", "start": 57307173, "end": 57391715}, {"filename": "/assets/tracks/ginger root.json", "start": 57391715, "end": 57391733}, {"filename": "/assets/tracks/ginger root.mp3", "start": 57391733, "end": 60926690, "audio": 1}, {"filename": "/assets/tracks/hi-posi.jpg", "start": 60926690, "end": 61101989}, {"filename": "/assets/tracks/hi-posi.json", "start": 61101989, "end": 61111184}, {"filename": "/assets/tracks/hi-posi.mp3", "start": 61111184, "end": 66362755, "audio": 1}, {"filename": "/assets/tracks/jamiroquai.jpg", "start": 66362755, "end": 66595051}, {"filename": "/assets/tracks/jamiroquai.json", "start": 66595051, "end": 66595069}, {"filename": "/assets/tracks/jamiroquai.mp3", "start": 66595069, "end": 71130074, "audio": 1}, {"filename": "/assets/tracks/kaede.jpg", "start": 71130074, "end": 71200047}, {"filename": "/assets/tracks/kaede.json", "start": 71200047, "end": 71202481}, {"filename": "/assets/tracks/kaede.mp3", "start": 71202481, "end": 75306813, "audio": 1}, {"filename": "/assets/tracks/lamp.jpg", "start": 75306813, "end": 75498093}, {"filename": "/assets/tracks/lamp.json", "start": 75498093, "end": 75512022}, {"filename": "/assets/tracks/lamp.mp3", "start": 75512022, "end": 78805310, "audio": 1}, {"filename": "/assets/tracks/machine girl.jpg", "start": 78805310, "end": 79081744}, {"filename": "/assets/tracks/machine girl.json", "start": 79081744, "end": 79081762}, {"filename": "/assets/tracks/machine girl.mp3", "start": 79081762, "end": 84253477, "audio": 1}, {"filename": "/assets/tracks/mid-air thief.jpg", "start": 84253477, "end": 84321016}, {"filename": "/assets/tracks/mid-air thief.json", "start": 84321016, "end": 84332910}, {"filename": "/assets/tracks/mid-air thief.mp3", "start": 84332910, "end": 89331542, "audio": 1}, {"filename": "/vendored/lygia/.git", "start": 89331542, "end": 89331584}, {"filename": "/vendored/lygia/.github/FUNDING.yml", "start": 89331584, "end": 89332240}, {"filename": "/vendored/lygia/.gitignore", "start": 89332240, "end": 89332295}, {"filename": "/vendored/lygia/CONTRIBUTE.md", "start": 89332295, "end": 89333187}, {"filename": "/vendored/lygia/DESIGN.md", "start": 89333187, "end": 89337289}, {"filename": "/vendored/lygia/EXAMPLES.md", "start": 89337289, "end": 89339676}, {"filename": "/vendored/lygia/LICENSE.md", "start": 89339676, "end": 89342772}, {"filename": "/vendored/lygia/README.md", "start": 89342772, "end": 89358000}, {"filename": "/vendored/lygia/README_GLSL.md", "start": 89358000, "end": 89360008}, {"filename": "/vendored/lygia/README_METAL.md", "start": 89360008, "end": 89362205}, {"filename": "/vendored/lygia/animation/easing.glsl", "start": 89362205, "end": 89362603}, {"filename": "/vendored/lygia/animation/easing.hlsl", "start": 89362603, "end": 89363001}, {"filename": "/vendored/lygia/animation/easing.wgsl", "start": 89363001, "end": 89363399}, {"filename": "/vendored/lygia/animation/easing/back.glsl", "start": 89363399, "end": 89363752}, {"filename": "/vendored/lygia/animation/easing/back.hlsl", "start": 89363752, "end": 89364426}, {"filename": "/vendored/lygia/animation/easing/back.wgsl", "start": 89364426, "end": 89364780}, {"filename": "/vendored/lygia/animation/easing/backIn.glsl", "start": 89364780, "end": 89365196}, {"filename": "/vendored/lygia/animation/easing/backIn.wgsl", "start": 89365196, "end": 89365567}, {"filename": "/vendored/lygia/animation/easing/backInOut.glsl", "start": 89365567, "end": 89366122}, {"filename": "/vendored/lygia/animation/easing/backInOut.wgsl", "start": 89366122, "end": 89366580}, {"filename": "/vendored/lygia/animation/easing/backOut.glsl", "start": 89366580, "end": 89366982}, {"filename": "/vendored/lygia/animation/easing/backOut.wgsl", "start": 89366982, "end": 89367338}, {"filename": "/vendored/lygia/animation/easing/bounce.glsl", "start": 89367338, "end": 89367816}, {"filename": "/vendored/lygia/animation/easing/bounce.hlsl", "start": 89367816, "end": 89368873}, {"filename": "/vendored/lygia/animation/easing/bounce.wgsl", "start": 89368873, "end": 89369306}, {"filename": "/vendored/lygia/animation/easing/bounceIn.glsl", "start": 89369306, "end": 89369736}, {"filename": "/vendored/lygia/animation/easing/bounceIn.wgsl", "start": 89369736, "end": 89370113}, {"filename": "/vendored/lygia/animation/easing/bounceInOut.glsl", "start": 89370113, "end": 89370641}, {"filename": "/vendored/lygia/animation/easing/bounceInOut.wgsl", "start": 89370641, "end": 89371115}, {"filename": "/vendored/lygia/animation/easing/bounceOut.glsl", "start": 89371115, "end": 89371967}, {"filename": "/vendored/lygia/animation/easing/bounceOut.wgsl", "start": 89371967, "end": 89372723}, {"filename": "/vendored/lygia/animation/easing/circular.glsl", "start": 89372723, "end": 89373096}, {"filename": "/vendored/lygia/animation/easing/circular.hlsl", "start": 89373096, "end": 89373740}, {"filename": "/vendored/lygia/animation/easing/circular.wgsl", "start": 89373740, "end": 89374112}, {"filename": "/vendored/lygia/animation/easing/circularIn.glsl", "start": 89374112, "end": 89374509}, {"filename": "/vendored/lygia/animation/easing/circularIn.wgsl", "start": 89374509, "end": 89374852}, {"filename": "/vendored/lygia/animation/easing/circularInOut.glsl", "start": 89374852, "end": 89375366}, {"filename": "/vendored/lygia/animation/easing/circularInOut.wgsl", "start": 89375366, "end": 89375823}, {"filename": "/vendored/lygia/animation/easing/circularOut.glsl", "start": 89375823, "end": 89376221}, {"filename": "/vendored/lygia/animation/easing/circularOut.wgsl", "start": 89376221, "end": 89376563}, {"filename": "/vendored/lygia/animation/easing/cubic.glsl", "start": 89376563, "end": 89376921}, {"filename": "/vendored/lygia/animation/easing/cubic.hlsl", "start": 89376921, "end": 89377501}, {"filename": "/vendored/lygia/animation/easing/cubic.wgsl", "start": 89377501, "end": 89377858}, {"filename": "/vendored/lygia/animation/easing/cubicIn.glsl", "start": 89377858, "end": 89378226}, {"filename": "/vendored/lygia/animation/easing/cubicIn.wgsl", "start": 89378226, "end": 89378546}, {"filename": "/vendored/lygia/animation/easing/cubicInOut.glsl", "start": 89378546, "end": 89379001}, {"filename": "/vendored/lygia/animation/easing/cubicInOut.wgsl", "start": 89379001, "end": 89379409}, {"filename": "/vendored/lygia/animation/easing/cubicOut.glsl", "start": 89379409, "end": 89379817}, {"filename": "/vendored/lygia/animation/easing/cubicOut.wgsl", "start": 89379817, "end": 89380171}, {"filename": "/vendored/lygia/animation/easing/elastic.glsl", "start": 89380171, "end": 89380539}, {"filename": "/vendored/lygia/animation/easing/elastic.hlsl", "start": 89380539, "end": 89381356}, {"filename": "/vendored/lygia/animation/easing/elastic.wgsl", "start": 89381356, "end": 89381723}, {"filename": "/vendored/lygia/animation/easing/elasticIn.glsl", "start": 89381723, "end": 89382178}, {"filename": "/vendored/lygia/animation/easing/elasticIn.wgsl", "start": 89382178, "end": 89382581}, {"filename": "/vendored/lygia/animation/easing/elasticInOut.glsl", "start": 89382581, "end": 89383199}, {"filename": "/vendored/lygia/animation/easing/elasticInOut.wgsl", "start": 89383199, "end": 89383761}, {"filename": "/vendored/lygia/animation/easing/elasticOut.glsl", "start": 89383761, "end": 89384230}, {"filename": "/vendored/lygia/animation/easing/elasticOut.wgsl", "start": 89384230, "end": 89384644}, {"filename": "/vendored/lygia/animation/easing/exponential.glsl", "start": 89384644, "end": 89385032}, {"filename": "/vendored/lygia/animation/easing/exponential.hlsl", "start": 89385032, "end": 89385786}, {"filename": "/vendored/lygia/animation/easing/exponential.wgsl", "start": 89385786, "end": 89386173}, {"filename": "/vendored/lygia/animation/easing/exponentialIn.glsl", "start": 89386173, "end": 89386603}, {"filename": "/vendored/lygia/animation/easing/exponentialIn.wgsl", "start": 89386603, "end": 89386997}, {"filename": "/vendored/lygia/animation/easing/exponentialInOut.glsl", "start": 89386997, "end": 89387560}, {"filename": "/vendored/lygia/animation/easing/exponentialInOut.wgsl", "start": 89387560, "end": 89388066}, {"filename": "/vendored/lygia/animation/easing/exponentialOut.glsl", "start": 89388066, "end": 89388500}, {"filename": "/vendored/lygia/animation/easing/exponentialOut.wgsl", "start": 89388500, "end": 89388896}, {"filename": "/vendored/lygia/animation/easing/linear.glsl", "start": 89388896, "end": 89389245}, {"filename": "/vendored/lygia/animation/easing/linear.hlsl", "start": 89389245, "end": 89389589}, {"filename": "/vendored/lygia/animation/easing/linear.wgsl", "start": 89389589, "end": 89389937}, {"filename": "/vendored/lygia/animation/easing/linearIn.glsl", "start": 89389937, "end": 89390300}, {"filename": "/vendored/lygia/animation/easing/linearIn.wgsl", "start": 89390300, "end": 89390612}, {"filename": "/vendored/lygia/animation/easing/linearInOut.glsl", "start": 89390612, "end": 89390987}, {"filename": "/vendored/lygia/animation/easing/linearInOut.wgsl", "start": 89390987, "end": 89391305}, {"filename": "/vendored/lygia/animation/easing/linearOut.glsl", "start": 89391305, "end": 89391672}, {"filename": "/vendored/lygia/animation/easing/linearOut.wgsl", "start": 89391672, "end": 89391988}, {"filename": "/vendored/lygia/animation/easing/quadratic.glsl", "start": 89391988, "end": 89392365}, {"filename": "/vendored/lygia/animation/easing/quadratic.hlsl", "start": 89392365, "end": 89392942}, {"filename": "/vendored/lygia/animation/easing/quadratic.wgsl", "start": 89392942, "end": 89393318}, {"filename": "/vendored/lygia/animation/easing/quadraticIn.glsl", "start": 89393318, "end": 89393702}, {"filename": "/vendored/lygia/animation/easing/quadraticIn.wgsl", "start": 89393702, "end": 89394029}, {"filename": "/vendored/lygia/animation/easing/quadraticInOut.glsl", "start": 89394029, "end": 89394489}, {"filename": "/vendored/lygia/animation/easing/quadraticInOut.wgsl", "start": 89394489, "end": 89394886}, {"filename": "/vendored/lygia/animation/easing/quadraticOut.glsl", "start": 89394886, "end": 89395283}, {"filename": "/vendored/lygia/animation/easing/quadraticOut.wgsl", "start": 89395283, "end": 89395622}, {"filename": "/vendored/lygia/animation/easing/quartic.glsl", "start": 89395622, "end": 89395990}, {"filename": "/vendored/lygia/animation/easing/quartic.hlsl", "start": 89395990, "end": 89396585}, {"filename": "/vendored/lygia/animation/easing/quartic.wgsl", "start": 89396585, "end": 89396952}, {"filename": "/vendored/lygia/animation/easing/quarticIn.glsl", "start": 89396952, "end": 89397332}, {"filename": "/vendored/lygia/animation/easing/quarticIn.wgsl", "start": 89397332, "end": 89397660}, {"filename": "/vendored/lygia/animation/easing/quarticInOut.glsl", "start": 89397660, "end": 89398122}, {"filename": "/vendored/lygia/animation/easing/quarticInOut.wgsl", "start": 89398122, "end": 89398533}, {"filename": "/vendored/lygia/animation/easing/quarticOut.glsl", "start": 89398533, "end": 89398966}, {"filename": "/vendored/lygia/animation/easing/quarticOut.wgsl", "start": 89398966, "end": 89399339}, {"filename": "/vendored/lygia/animation/easing/quintic.glsl", "start": 89399339, "end": 89399708}, {"filename": "/vendored/lygia/animation/easing/quintic.hlsl", "start": 89399708, "end": 89400304}, {"filename": "/vendored/lygia/animation/easing/quintic.wgsl", "start": 89400304, "end": 89400671}, {"filename": "/vendored/lygia/animation/easing/quinticIn.glsl", "start": 89400671, "end": 89401052}, {"filename": "/vendored/lygia/animation/easing/quinticIn.wgsl", "start": 89401052, "end": 89401380}, {"filename": "/vendored/lygia/animation/easing/quinticInOut.glsl", "start": 89401380, "end": 89401854}, {"filename": "/vendored/lygia/animation/easing/quinticInOut.wgsl", "start": 89401854, "end": 89402272}, {"filename": "/vendored/lygia/animation/easing/quinticOut.glsl", "start": 89402272, "end": 89402671}, {"filename": "/vendored/lygia/animation/easing/quinticOut.wgsl", "start": 89402671, "end": 89403016}, {"filename": "/vendored/lygia/animation/easing/sine.glsl", "start": 89403016, "end": 89403404}, {"filename": "/vendored/lygia/animation/easing/sine.hlsl", "start": 89403404, "end": 89403953}, {"filename": "/vendored/lygia/animation/easing/sine.wgsl", "start": 89403953, "end": 89404305}, {"filename": "/vendored/lygia/animation/easing/sineIn.glsl", "start": 89404305, "end": 89404723}, {"filename": "/vendored/lygia/animation/easing/sineIn.wgsl", "start": 89404723, "end": 89405095}, {"filename": "/vendored/lygia/animation/easing/sineInOut.glsl", "start": 89405095, "end": 89405526}, {"filename": "/vendored/lygia/animation/easing/sineInOut.wgsl", "start": 89405526, "end": 89405904}, {"filename": "/vendored/lygia/animation/easing/sineOut.glsl", "start": 89405904, "end": 89406313}, {"filename": "/vendored/lygia/animation/easing/sineOut.wgsl", "start": 89406313, "end": 89406674}, {"filename": "/vendored/lygia/animation/spriteLoop.glsl", "start": 89406674, "end": 89407551}, {"filename": "/vendored/lygia/animation/spriteLoop.hlsl", "start": 89407551, "end": 89408419}, {"filename": "/vendored/lygia/animation/spriteLoop.wgsl", "start": 89408419, "end": 89409168}, {"filename": "/vendored/lygia/color/blend.glsl", "start": 89409168, "end": 89410031}, {"filename": "/vendored/lygia/color/blend.hlsl", "start": 89410031, "end": 89410894}, {"filename": "/vendored/lygia/color/blend.msl", "start": 89410894, "end": 89411729}, {"filename": "/vendored/lygia/color/blend.wgsl", "start": 89411729, "end": 89412592}, {"filename": "/vendored/lygia/color/blend/add.glsl", "start": 89412592, "end": 89413252}, {"filename": "/vendored/lygia/color/blend/add.hlsl", "start": 89413252, "end": 89413950}, {"filename": "/vendored/lygia/color/blend/add.msl", "start": 89413950, "end": 89414610}, {"filename": "/vendored/lygia/color/blend/add.wesl", "start": 89414610, "end": 89415242}, {"filename": "/vendored/lygia/color/blend/add.wgsl", "start": 89415242, "end": 89415874}, {"filename": "/vendored/lygia/color/blend/average.glsl", "start": 89415874, "end": 89416556}, {"filename": "/vendored/lygia/color/blend/average.hlsl", "start": 89416556, "end": 89417266}, {"filename": "/vendored/lygia/color/blend/average.msl", "start": 89417266, "end": 89417946}, {"filename": "/vendored/lygia/color/blend/average.wesl", "start": 89417946, "end": 89418594}, {"filename": "/vendored/lygia/color/blend/average.wgsl", "start": 89418594, "end": 89419242}, {"filename": "/vendored/lygia/color/blend/color.glsl", "start": 89419242, "end": 89419989}, {"filename": "/vendored/lygia/color/blend/color.hlsl", "start": 89419989, "end": 89420753}, {"filename": "/vendored/lygia/color/blend/color.msl", "start": 89420753, "end": 89421512}, {"filename": "/vendored/lygia/color/blend/color.wesl", "start": 89421512, "end": 89422216}, {"filename": "/vendored/lygia/color/blend/color.wgsl", "start": 89422216, "end": 89422927}, {"filename": "/vendored/lygia/color/blend/colorBurn.glsl", "start": 89422927, "end": 89423789}, {"filename": "/vendored/lygia/color/blend/colorBurn.hlsl", "start": 89423789, "end": 89424688}, {"filename": "/vendored/lygia/color/blend/colorBurn.msl", "start": 89424688, "end": 89425547}, {"filename": "/vendored/lygia/color/blend/colorBurn.wesl", "start": 89425547, "end": 89426356}, {"filename": "/vendored/lygia/color/blend/colorBurn.wgsl", "start": 89426356, "end": 89427165}, {"filename": "/vendored/lygia/color/blend/colorDodge.glsl", "start": 89427165, "end": 89428030}, {"filename": "/vendored/lygia/color/blend/colorDodge.hlsl", "start": 89428030, "end": 89428934}, {"filename": "/vendored/lygia/color/blend/colorDodge.msl", "start": 89428934, "end": 89429796}, {"filename": "/vendored/lygia/color/blend/colorDodge.wesl", "start": 89429796, "end": 89430604}, {"filename": "/vendored/lygia/color/blend/colorDodge.wgsl", "start": 89430604, "end": 89431412}, {"filename": "/vendored/lygia/color/blend/darken.glsl", "start": 89431412, "end": 89432196}, {"filename": "/vendored/lygia/color/blend/darken.hlsl", "start": 89432196, "end": 89433017}, {"filename": "/vendored/lygia/color/blend/darken.msl", "start": 89433017, "end": 89433798}, {"filename": "/vendored/lygia/color/blend/darken.wesl", "start": 89433798, "end": 89434526}, {"filename": "/vendored/lygia/color/blend/darken.wgsl", "start": 89434526, "end": 89435254}, {"filename": "/vendored/lygia/color/blend/difference.glsl", "start": 89435254, "end": 89435955}, {"filename": "/vendored/lygia/color/blend/difference.hlsl", "start": 89435955, "end": 89436684}, {"filename": "/vendored/lygia/color/blend/difference.msl", "start": 89436684, "end": 89437380}, {"filename": "/vendored/lygia/color/blend/difference.wesl", "start": 89437380, "end": 89438039}, {"filename": "/vendored/lygia/color/blend/difference.wgsl", "start": 89438039, "end": 89438698}, {"filename": "/vendored/lygia/color/blend/exclusion.glsl", "start": 89438698, "end": 89439425}, {"filename": "/vendored/lygia/color/blend/exclusion.hlsl", "start": 89439425, "end": 89440180}, {"filename": "/vendored/lygia/color/blend/exclusion.msl", "start": 89440180, "end": 89440902}, {"filename": "/vendored/lygia/color/blend/exclusion.wesl", "start": 89440902, "end": 89441587}, {"filename": "/vendored/lygia/color/blend/exclusion.wgsl", "start": 89441587, "end": 89442272}, {"filename": "/vendored/lygia/color/blend/glow.glsl", "start": 89442272, "end": 89442982}, {"filename": "/vendored/lygia/color/blend/glow.hlsl", "start": 89442982, "end": 89443708}, {"filename": "/vendored/lygia/color/blend/glow.msl", "start": 89443708, "end": 89444412}, {"filename": "/vendored/lygia/color/blend/glow.wesl", "start": 89444412, "end": 89445121}, {"filename": "/vendored/lygia/color/blend/glow.wgsl", "start": 89445121, "end": 89445786}, {"filename": "/vendored/lygia/color/blend/hardLight.glsl", "start": 89445786, "end": 89446536}, {"filename": "/vendored/lygia/color/blend/hardLight.hlsl", "start": 89446536, "end": 89447302}, {"filename": "/vendored/lygia/color/blend/hardLight.msl", "start": 89447302, "end": 89448046}, {"filename": "/vendored/lygia/color/blend/hardLight.wesl", "start": 89448046, "end": 89448767}, {"filename": "/vendored/lygia/color/blend/hardLight.wgsl", "start": 89448767, "end": 89449461}, {"filename": "/vendored/lygia/color/blend/hardMix.glsl", "start": 89449461, "end": 89450321}, {"filename": "/vendored/lygia/color/blend/hardMix.hlsl", "start": 89450321, "end": 89451210}, {"filename": "/vendored/lygia/color/blend/hardMix.msl", "start": 89451210, "end": 89452066}, {"filename": "/vendored/lygia/color/blend/hardMix.wesl", "start": 89452066, "end": 89452899}, {"filename": "/vendored/lygia/color/blend/hardMix.wgsl", "start": 89452899, "end": 89453701}, {"filename": "/vendored/lygia/color/blend/hue.glsl", "start": 89453701, "end": 89454433}, {"filename": "/vendored/lygia/color/blend/hue.hlsl", "start": 89454433, "end": 89455182}, {"filename": "/vendored/lygia/color/blend/hue.msl", "start": 89455182, "end": 89455925}, {"filename": "/vendored/lygia/color/blend/hue.wesl", "start": 89455925, "end": 89456617}, {"filename": "/vendored/lygia/color/blend/hue.wgsl", "start": 89456617, "end": 89457309}, {"filename": "/vendored/lygia/color/blend/lighten.glsl", "start": 89457309, "end": 89458113}, {"filename": "/vendored/lygia/color/blend/lighten.hlsl", "start": 89458113, "end": 89458946}, {"filename": "/vendored/lygia/color/blend/lighten.msl", "start": 89458946, "end": 89459747}, {"filename": "/vendored/lygia/color/blend/lighten.wesl", "start": 89459747, "end": 89460484}, {"filename": "/vendored/lygia/color/blend/lighten.wgsl", "start": 89460484, "end": 89461221}, {"filename": "/vendored/lygia/color/blend/linearBurn.glsl", "start": 89461221, "end": 89462068}, {"filename": "/vendored/lygia/color/blend/linearBurn.hlsl", "start": 89462068, "end": 89462951}, {"filename": "/vendored/lygia/color/blend/linearBurn.msl", "start": 89462951, "end": 89463797}, {"filename": "/vendored/lygia/color/blend/linearBurn.wesl", "start": 89463797, "end": 89464590}, {"filename": "/vendored/lygia/color/blend/linearBurn.wgsl", "start": 89464590, "end": 89465383}, {"filename": "/vendored/lygia/color/blend/linearDodge.glsl", "start": 89465383, "end": 89466212}, {"filename": "/vendored/lygia/color/blend/linearDodge.hlsl", "start": 89466212, "end": 89467067}, {"filename": "/vendored/lygia/color/blend/linearDodge.msl", "start": 89467067, "end": 89467893}, {"filename": "/vendored/lygia/color/blend/linearDodge.wesl", "start": 89467893, "end": 89468663}, {"filename": "/vendored/lygia/color/blend/linearDodge.wgsl", "start": 89468663, "end": 89469433}, {"filename": "/vendored/lygia/color/blend/linearLight.glsl", "start": 89469433, "end": 89470405}, {"filename": "/vendored/lygia/color/blend/linearLight.hlsl", "start": 89470405, "end": 89471395}, {"filename": "/vendored/lygia/color/blend/linearLight.msl", "start": 89471395, "end": 89472362}, {"filename": "/vendored/lygia/color/blend/linearLight.wesl", "start": 89472362, "end": 89473338}, {"filename": "/vendored/lygia/color/blend/linearLight.wgsl", "start": 89473338, "end": 89474252}, {"filename": "/vendored/lygia/color/blend/luminosity.glsl", "start": 89474252, "end": 89475033}, {"filename": "/vendored/lygia/color/blend/luminosity.hlsl", "start": 89475033, "end": 89475831}, {"filename": "/vendored/lygia/color/blend/luminosity.msl", "start": 89475831, "end": 89476623}, {"filename": "/vendored/lygia/color/blend/luminosity.wesl", "start": 89476623, "end": 89477350}, {"filename": "/vendored/lygia/color/blend/luminosity.wgsl", "start": 89477350, "end": 89478077}, {"filename": "/vendored/lygia/color/blend/multiply.glsl", "start": 89478077, "end": 89478765}, {"filename": "/vendored/lygia/color/blend/multiply.hlsl", "start": 89478765, "end": 89479469}, {"filename": "/vendored/lygia/color/blend/multiply.msl", "start": 89479469, "end": 89480155}, {"filename": "/vendored/lygia/color/blend/multiply.wesl", "start": 89480155, "end": 89480798}, {"filename": "/vendored/lygia/color/blend/multiply.wgsl", "start": 89480798, "end": 89481441}, {"filename": "/vendored/lygia/color/blend/negation.glsl", "start": 89481441, "end": 89482174}, {"filename": "/vendored/lygia/color/blend/negation.hlsl", "start": 89482174, "end": 89482943}, {"filename": "/vendored/lygia/color/blend/negation.msl", "start": 89482943, "end": 89483675}, {"filename": "/vendored/lygia/color/blend/negation.wesl", "start": 89483675, "end": 89484360}, {"filename": "/vendored/lygia/color/blend/negation.wgsl", "start": 89484360, "end": 89485045}, {"filename": "/vendored/lygia/color/blend/overlay.glsl", "start": 89485045, "end": 89485901}, {"filename": "/vendored/lygia/color/blend/overlay.hlsl", "start": 89485901, "end": 89486786}, {"filename": "/vendored/lygia/color/blend/overlay.msl", "start": 89486786, "end": 89487639}, {"filename": "/vendored/lygia/color/blend/overlay.wesl", "start": 89487639, "end": 89488496}, {"filename": "/vendored/lygia/color/blend/overlay.wgsl", "start": 89488496, "end": 89489353}, {"filename": "/vendored/lygia/color/blend/phoenix.glsl", "start": 89489353, "end": 89490098}, {"filename": "/vendored/lygia/color/blend/phoenix.hlsl", "start": 89490098, "end": 89490869}, {"filename": "/vendored/lygia/color/blend/phoenix.msl", "start": 89490869, "end": 89491611}, {"filename": "/vendored/lygia/color/blend/phoenix.wesl", "start": 89491611, "end": 89492306}, {"filename": "/vendored/lygia/color/blend/phoenix.wgsl", "start": 89492306, "end": 89493004}, {"filename": "/vendored/lygia/color/blend/pinLight.glsl", "start": 89493004, "end": 89493936}, {"filename": "/vendored/lygia/color/blend/pinLight.hlsl", "start": 89493936, "end": 89494903}, {"filename": "/vendored/lygia/color/blend/pinLight.msl", "start": 89494903, "end": 89495827}, {"filename": "/vendored/lygia/color/blend/pinLight.wesl", "start": 89495827, "end": 89496751}, {"filename": "/vendored/lygia/color/blend/pinLight.wgsl", "start": 89496751, "end": 89497622}, {"filename": "/vendored/lygia/color/blend/reflect.glsl", "start": 89497622, "end": 89498468}, {"filename": "/vendored/lygia/color/blend/reflect.hlsl", "start": 89498468, "end": 89499343}, {"filename": "/vendored/lygia/color/blend/reflect.msl", "start": 89499343, "end": 89500186}, {"filename": "/vendored/lygia/color/blend/reflect.wesl", "start": 89500186, "end": 89500973}, {"filename": "/vendored/lygia/color/blend/reflect.wgsl", "start": 89500973, "end": 89501760}, {"filename": "/vendored/lygia/color/blend/saturation.glsl", "start": 89501760, "end": 89502541}, {"filename": "/vendored/lygia/color/blend/saturation.hlsl", "start": 89502541, "end": 89503339}, {"filename": "/vendored/lygia/color/blend/saturation.msl", "start": 89503339, "end": 89504131}, {"filename": "/vendored/lygia/color/blend/saturation.wesl", "start": 89504131, "end": 89504858}, {"filename": "/vendored/lygia/color/blend/saturation.wgsl", "start": 89504858, "end": 89505585}, {"filename": "/vendored/lygia/color/blend/screen.glsl", "start": 89505585, "end": 89506392}, {"filename": "/vendored/lygia/color/blend/screen.hlsl", "start": 89506392, "end": 89507171}, {"filename": "/vendored/lygia/color/blend/screen.msl", "start": 89507171, "end": 89507978}, {"filename": "/vendored/lygia/color/blend/screen.wesl", "start": 89507978, "end": 89508749}, {"filename": "/vendored/lygia/color/blend/screen.wgsl", "start": 89508749, "end": 89509520}, {"filename": "/vendored/lygia/color/blend/softLight.glsl", "start": 89509520, "end": 89510664}, {"filename": "/vendored/lygia/color/blend/softLight.hlsl", "start": 89510664, "end": 89511930}, {"filename": "/vendored/lygia/color/blend/softLight.msl", "start": 89511930, "end": 89513073}, {"filename": "/vendored/lygia/color/blend/softLight.wesl", "start": 89513073, "end": 89514220}, {"filename": "/vendored/lygia/color/blend/softLight.wgsl", "start": 89514220, "end": 89515367}, {"filename": "/vendored/lygia/color/blend/subtract.glsl", "start": 89515367, "end": 89516100}, {"filename": "/vendored/lygia/color/blend/subtract.hlsl", "start": 89516100, "end": 89516869}, {"filename": "/vendored/lygia/color/blend/subtract.msl", "start": 89516869, "end": 89517601}, {"filename": "/vendored/lygia/color/blend/subtract.wesl", "start": 89517601, "end": 89518286}, {"filename": "/vendored/lygia/color/blend/subtract.wgsl", "start": 89518286, "end": 89518971}, {"filename": "/vendored/lygia/color/blend/vividLight.glsl", "start": 89518971, "end": 89519961}, {"filename": "/vendored/lygia/color/blend/vividLight.hlsl", "start": 89519961, "end": 89520956}, {"filename": "/vendored/lygia/color/blend/vividLight.msl", "start": 89520956, "end": 89521941}, {"filename": "/vendored/lygia/color/blend/vividLight.wesl", "start": 89521941, "end": 89522902}, {"filename": "/vendored/lygia/color/blend/vividLight.wgsl", "start": 89522902, "end": 89523803}, {"filename": "/vendored/lygia/color/brightnessContrast.glsl", "start": 89523803, "end": 89524686}, {"filename": "/vendored/lygia/color/brightnessContrast.hlsl", "start": 89524686, "end": 89525723}, {"filename": "/vendored/lygia/color/brightnessContrast.msl", "start": 89525723, "end": 89526269}, {"filename": "/vendored/lygia/color/brightnessContrast.wesl", "start": 89526269, "end": 89527099}, {"filename": "/vendored/lygia/color/brightnessContrast.wgsl", "start": 89527099, "end": 89527929}, {"filename": "/vendored/lygia/color/brightnessMatrix.glsl", "start": 89527929, "end": 89528673}, {"filename": "/vendored/lygia/color/brightnessMatrix.hlsl", "start": 89528673, "end": 89529457}, {"filename": "/vendored/lygia/color/brightnessMatrix.msl", "start": 89529457, "end": 89530071}, {"filename": "/vendored/lygia/color/composite.glsl", "start": 89530071, "end": 89530419}, {"filename": "/vendored/lygia/color/composite.hlsl", "start": 89530419, "end": 89530767}, {"filename": "/vendored/lygia/color/composite.msl", "start": 89530767, "end": 89531106}, {"filename": "/vendored/lygia/color/composite/compositeXor.glsl", "start": 89531106, "end": 89532027}, {"filename": "/vendored/lygia/color/composite/compositeXor.hlsl", "start": 89532027, "end": 89532961}, {"filename": "/vendored/lygia/color/composite/compositeXor.msl", "start": 89532961, "end": 89533896}, {"filename": "/vendored/lygia/color/composite/destinationAtop.glsl", "start": 89533896, "end": 89534901}, {"filename": "/vendored/lygia/color/composite/destinationAtop.hlsl", "start": 89534901, "end": 89535914}, {"filename": "/vendored/lygia/color/composite/destinationAtop.msl", "start": 89535914, "end": 89536928}, {"filename": "/vendored/lygia/color/composite/destinationIn.glsl", "start": 89536928, "end": 89537865}, {"filename": "/vendored/lygia/color/composite/destinationIn.hlsl", "start": 89537865, "end": 89538811}, {"filename": "/vendored/lygia/color/composite/destinationIn.msl", "start": 89538811, "end": 89539757}, {"filename": "/vendored/lygia/color/composite/destinationOut.glsl", "start": 89539757, "end": 89540720}, {"filename": "/vendored/lygia/color/composite/destinationOut.hlsl", "start": 89540720, "end": 89541691}, {"filename": "/vendored/lygia/color/composite/destinationOut.msl", "start": 89541691, "end": 89542662}, {"filename": "/vendored/lygia/color/composite/destinationOver.glsl", "start": 89542662, "end": 89543647}, {"filename": "/vendored/lygia/color/composite/destinationOver.hlsl", "start": 89543647, "end": 89544640}, {"filename": "/vendored/lygia/color/composite/destinationOver.msl", "start": 89544640, "end": 89545634}, {"filename": "/vendored/lygia/color/composite/sourceAtop.glsl", "start": 89545634, "end": 89546601}, {"filename": "/vendored/lygia/color/composite/sourceAtop.hlsl", "start": 89546601, "end": 89547576}, {"filename": "/vendored/lygia/color/composite/sourceAtop.msl", "start": 89547576, "end": 89548552}, {"filename": "/vendored/lygia/color/composite/sourceIn.glsl", "start": 89548552, "end": 89549452}, {"filename": "/vendored/lygia/color/composite/sourceIn.hlsl", "start": 89549452, "end": 89550360}, {"filename": "/vendored/lygia/color/composite/sourceIn.msl", "start": 89550360, "end": 89551269}, {"filename": "/vendored/lygia/color/composite/sourceOut.glsl", "start": 89551269, "end": 89552193}, {"filename": "/vendored/lygia/color/composite/sourceOut.hlsl", "start": 89552193, "end": 89553125}, {"filename": "/vendored/lygia/color/composite/sourceOut.msl", "start": 89553125, "end": 89554058}, {"filename": "/vendored/lygia/color/composite/sourceOver.glsl", "start": 89554058, "end": 89555036}, {"filename": "/vendored/lygia/color/composite/sourceOver.hlsl", "start": 89555036, "end": 89556022}, {"filename": "/vendored/lygia/color/composite/sourceOver.msl", "start": 89556022, "end": 89557008}, {"filename": "/vendored/lygia/color/contrast.glsl", "start": 89557008, "end": 89557655}, {"filename": "/vendored/lygia/color/contrast.hlsl", "start": 89557655, "end": 89558386}, {"filename": "/vendored/lygia/color/contrast.msl", "start": 89558386, "end": 89559033}, {"filename": "/vendored/lygia/color/contrastMatrix.glsl", "start": 89559033, "end": 89559790}, {"filename": "/vendored/lygia/color/contrastMatrix.hlsl", "start": 89559790, "end": 89560601}, {"filename": "/vendored/lygia/color/contrastMatrix.msl", "start": 89560601, "end": 89561228}, {"filename": "/vendored/lygia/color/daltonize.glsl", "start": 89561228, "end": 89567253}, {"filename": "/vendored/lygia/color/daltonize.hlsl", "start": 89567253, "end": 89573448}, {"filename": "/vendored/lygia/color/daltonize.msl", "start": 89573448, "end": 89579521}, {"filename": "/vendored/lygia/color/desaturate.glsl", "start": 89579521, "end": 89580130}, {"filename": "/vendored/lygia/color/desaturate.hlsl", "start": 89580130, "end": 89580825}, {"filename": "/vendored/lygia/color/desaturate.msl", "start": 89580825, "end": 89581440}, {"filename": "/vendored/lygia/color/distance.glsl", "start": 89581440, "end": 89583836}, {"filename": "/vendored/lygia/color/distance.hlsl", "start": 89583836, "end": 89586279}, {"filename": "/vendored/lygia/color/distance.msl", "start": 89586279, "end": 89588668}, {"filename": "/vendored/lygia/color/distance.wesl", "start": 89588668, "end": 89590776}, {"filename": "/vendored/lygia/color/distance.wgsl", "start": 89590776, "end": 89592883}, {"filename": "/vendored/lygia/color/dither.glsl", "start": 89592883, "end": 89594088}, {"filename": "/vendored/lygia/color/dither.hlsl", "start": 89594088, "end": 89595906}, {"filename": "/vendored/lygia/color/dither.msl", "start": 89595906, "end": 89597121}, {"filename": "/vendored/lygia/color/dither/bayer.glsl", "start": 89597121, "end": 89602379}, {"filename": "/vendored/lygia/color/dither/bayer.msl", "start": 89602379, "end": 89605463}, {"filename": "/vendored/lygia/color/dither/bayer.wesl", "start": 89605463, "end": 89607189}, {"filename": "/vendored/lygia/color/dither/bayer.wgsl", "start": 89607189, "end": 89608910}, {"filename": "/vendored/lygia/color/dither/blueNoise.glsl", "start": 89608910, "end": 89614236}, {"filename": "/vendored/lygia/color/dither/blueNoise.hlsl", "start": 89614236, "end": 89617146}, {"filename": "/vendored/lygia/color/dither/blueNoise.msl", "start": 89617146, "end": 89621722}, {"filename": "/vendored/lygia/color/dither/blueNoise.wesl", "start": 89621722, "end": 89623306}, {"filename": "/vendored/lygia/color/dither/blueNoise.wgsl", "start": 89623306, "end": 89624885}, {"filename": "/vendored/lygia/color/dither/interleavedGradientNoise.glsl", "start": 89624885, "end": 89628811}, {"filename": "/vendored/lygia/color/dither/interleavedGradientNoise.hlsl", "start": 89628811, "end": 89630546}, {"filename": "/vendored/lygia/color/dither/interleavedGradientNoise.msl", "start": 89630546, "end": 89633355}, {"filename": "/vendored/lygia/color/dither/shift.glsl", "start": 89633355, "end": 89637290}, {"filename": "/vendored/lygia/color/dither/shift.hlsl", "start": 89637290, "end": 89640008}, {"filename": "/vendored/lygia/color/dither/shift.msl", "start": 89640008, "end": 89643222}, {"filename": "/vendored/lygia/color/dither/triangleNoise.glsl", "start": 89643222, "end": 89646424}, {"filename": "/vendored/lygia/color/dither/triangleNoise.hlsl", "start": 89646424, "end": 89648826}, {"filename": "/vendored/lygia/color/dither/triangleNoise.msl", "start": 89648826, "end": 89652059}, {"filename": "/vendored/lygia/color/dither/vlachos.glsl", "start": 89652059, "end": 89654425}, {"filename": "/vendored/lygia/color/dither/vlachos.hlsl", "start": 89654425, "end": 89655937}, {"filename": "/vendored/lygia/color/dither/vlachos.msl", "start": 89655937, "end": 89658004}, {"filename": "/vendored/lygia/color/dither/vlachos.wesl", "start": 89658004, "end": 89659023}, {"filename": "/vendored/lygia/color/dither/vlachos.wgsl", "start": 89659023, "end": 89660037}, {"filename": "/vendored/lygia/color/exposure.glsl", "start": 89660037, "end": 89660643}, {"filename": "/vendored/lygia/color/exposure.hlsl", "start": 89660643, "end": 89661337}, {"filename": "/vendored/lygia/color/exposure.msl", "start": 89661337, "end": 89661957}, {"filename": "/vendored/lygia/color/exposure.wesl", "start": 89661957, "end": 89662465}, {"filename": "/vendored/lygia/color/exposure.wgsl", "start": 89662465, "end": 89662973}, {"filename": "/vendored/lygia/color/hueShift.glsl", "start": 89662973, "end": 89663840}, {"filename": "/vendored/lygia/color/hueShift.hlsl", "start": 89663840, "end": 89664717}, {"filename": "/vendored/lygia/color/hueShift.msl", "start": 89664717, "end": 89665592}, {"filename": "/vendored/lygia/color/hueShift.wesl", "start": 89665592, "end": 89666290}, {"filename": "/vendored/lygia/color/hueShift.wgsl", "start": 89666290, "end": 89666982}, {"filename": "/vendored/lygia/color/hueShiftRYB.glsl", "start": 89666982, "end": 89667933}, {"filename": "/vendored/lygia/color/hueShiftRYB.hlsl", "start": 89667933, "end": 89668900}, {"filename": "/vendored/lygia/color/hueShiftRYB.msl", "start": 89668900, "end": 89669855}, {"filename": "/vendored/lygia/color/hueShiftRYB.wesl", "start": 89669855, "end": 89670681}, {"filename": "/vendored/lygia/color/hueShiftRYB.wgsl", "start": 89670681, "end": 89671495}, {"filename": "/vendored/lygia/color/layer.glsl", "start": 89671495, "end": 89672638}, {"filename": "/vendored/lygia/color/layer.hlsl", "start": 89672638, "end": 89673781}, {"filename": "/vendored/lygia/color/layer.msl", "start": 89673781, "end": 89674896}, {"filename": "/vendored/lygia/color/layer/addSourceOver.glsl", "start": 89674896, "end": 89675868}, {"filename": "/vendored/lygia/color/layer/addSourceOver.hlsl", "start": 89675868, "end": 89676858}, {"filename": "/vendored/lygia/color/layer/addSourceOver.msl", "start": 89676858, "end": 89677818}, {"filename": "/vendored/lygia/color/layer/averageSourceOver.glsl", "start": 89677818, "end": 89678810}, {"filename": "/vendored/lygia/color/layer/averageSourceOver.hlsl", "start": 89678810, "end": 89679820}, {"filename": "/vendored/lygia/color/layer/averageSourceOver.msl", "start": 89679820, "end": 89680801}, {"filename": "/vendored/lygia/color/layer/colorBurnSourceOver.glsl", "start": 89680801, "end": 89681815}, {"filename": "/vendored/lygia/color/layer/colorBurnSourceOver.hlsl", "start": 89681815, "end": 89682848}, {"filename": "/vendored/lygia/color/layer/colorBurnSourceOver.msl", "start": 89682848, "end": 89683854}, {"filename": "/vendored/lygia/color/layer/colorDodgeSourceOver.glsl", "start": 89683854, "end": 89684875}, {"filename": "/vendored/lygia/color/layer/colorDodgeSourceOver.hlsl", "start": 89684875, "end": 89685914}, {"filename": "/vendored/lygia/color/layer/colorDodgeSourceOver.msl", "start": 89685914, "end": 89686926}, {"filename": "/vendored/lygia/color/layer/colorSourceOver.glsl", "start": 89686926, "end": 89687909}, {"filename": "/vendored/lygia/color/layer/colorSourceOver.hlsl", "start": 89687909, "end": 89688910}, {"filename": "/vendored/lygia/color/layer/colorSourceOver.msl", "start": 89688910, "end": 89689885}, {"filename": "/vendored/lygia/color/layer/darkenSourceOver.glsl", "start": 89689885, "end": 89690874}, {"filename": "/vendored/lygia/color/layer/darkenSourceOver.hlsl", "start": 89690874, "end": 89691881}, {"filename": "/vendored/lygia/color/layer/darkenSourceOver.msl", "start": 89691881, "end": 89692862}, {"filename": "/vendored/lygia/color/layer/differenceSourceOver.glsl", "start": 89692862, "end": 89693880}, {"filename": "/vendored/lygia/color/layer/differenceSourceOver.hlsl", "start": 89693880, "end": 89694916}, {"filename": "/vendored/lygia/color/layer/differenceSourceOver.msl", "start": 89694916, "end": 89695925}, {"filename": "/vendored/lygia/color/layer/exclusionSourceOver.glsl", "start": 89695925, "end": 89696935}, {"filename": "/vendored/lygia/color/layer/exclusionSourceOver.hlsl", "start": 89696935, "end": 89697964}, {"filename": "/vendored/lygia/color/layer/exclusionSourceOver.msl", "start": 89697964, "end": 89698966}, {"filename": "/vendored/lygia/color/layer/glowSourceOver.glsl", "start": 89698966, "end": 89699926}, {"filename": "/vendored/lygia/color/layer/glowSourceOver.hlsl", "start": 89699926, "end": 89700890}, {"filename": "/vendored/lygia/color/layer/glowSourceOver.msl", "start": 89700890, "end": 89701857}, {"filename": "/vendored/lygia/color/layer/hardLightSourceOver.glsl", "start": 89701857, "end": 89702874}, {"filename": "/vendored/lygia/color/layer/hardLightSourceOver.hlsl", "start": 89702874, "end": 89703907}, {"filename": "/vendored/lygia/color/layer/hardLightSourceOver.msl", "start": 89703907, "end": 89704913}, {"filename": "/vendored/lygia/color/layer/hardMixSourceOver.glsl", "start": 89704913, "end": 89705914}, {"filename": "/vendored/lygia/color/layer/hardMixSourceOver.hlsl", "start": 89705914, "end": 89706933}, {"filename": "/vendored/lygia/color/layer/hardMixSourceOver.msl", "start": 89706933, "end": 89707925}, {"filename": "/vendored/lygia/color/layer/hueSourceOver.glsl", "start": 89707925, "end": 89708898}, {"filename": "/vendored/lygia/color/layer/hueSourceOver.hlsl", "start": 89708898, "end": 89709889}, {"filename": "/vendored/lygia/color/layer/hueSourceOver.msl", "start": 89709889, "end": 89710853}, {"filename": "/vendored/lygia/color/layer/lightenSourceOver.glsl", "start": 89710853, "end": 89711849}, {"filename": "/vendored/lygia/color/layer/lightenSourceOver.hlsl", "start": 89711849, "end": 89712864}, {"filename": "/vendored/lygia/color/layer/lightenSourceOver.msl", "start": 89712864, "end": 89713852}, {"filename": "/vendored/lygia/color/layer/linearBurnSourceOver.glsl", "start": 89713852, "end": 89714873}, {"filename": "/vendored/lygia/color/layer/linearBurnSourceOver.hlsl", "start": 89714873, "end": 89715912}, {"filename": "/vendored/lygia/color/layer/linearBurnSourceOver.msl", "start": 89715912, "end": 89716925}, {"filename": "/vendored/lygia/color/layer/linearDodgeSourceOver.glsl", "start": 89716925, "end": 89717953}, {"filename": "/vendored/lygia/color/layer/linearDodgeSourceOver.hlsl", "start": 89717953, "end": 89718999}, {"filename": "/vendored/lygia/color/layer/linearDodgeSourceOver.msl", "start": 89718999, "end": 89720019}, {"filename": "/vendored/lygia/color/layer/linearLightSourceOver.glsl", "start": 89720019, "end": 89721047}, {"filename": "/vendored/lygia/color/layer/linearLightSourceOver.hlsl", "start": 89721047, "end": 89722093}, {"filename": "/vendored/lygia/color/layer/linearLightSourceOver.msl", "start": 89722093, "end": 89723113}, {"filename": "/vendored/lygia/color/layer/luminositySourceOver.glsl", "start": 89723113, "end": 89724130}, {"filename": "/vendored/lygia/color/layer/luminositySourceOver.hlsl", "start": 89724130, "end": 89725165}, {"filename": "/vendored/lygia/color/layer/luminositySourceOver.msl", "start": 89725165, "end": 89726170}, {"filename": "/vendored/lygia/color/layer/multiplySourceOver.glsl", "start": 89726170, "end": 89727172}, {"filename": "/vendored/lygia/color/layer/multiplySourceOver.hlsl", "start": 89727172, "end": 89728192}, {"filename": "/vendored/lygia/color/layer/multiplySourceOver.msl", "start": 89728192, "end": 89729186}, {"filename": "/vendored/lygia/color/layer/negationSourceOver.glsl", "start": 89729186, "end": 89730189}, {"filename": "/vendored/lygia/color/layer/negationSourceOver.hlsl", "start": 89730189, "end": 89731210}, {"filename": "/vendored/lygia/color/layer/negationSourceOver.msl", "start": 89731210, "end": 89732204}, {"filename": "/vendored/lygia/color/layer/overlaySourceOver.glsl", "start": 89732204, "end": 89733200}, {"filename": "/vendored/lygia/color/layer/overlaySourceOver.hlsl", "start": 89733200, "end": 89734214}, {"filename": "/vendored/lygia/color/layer/overlaySourceOver.msl", "start": 89734214, "end": 89735201}, {"filename": "/vendored/lygia/color/layer/phoenixSourceOver.glsl", "start": 89735201, "end": 89736197}, {"filename": "/vendored/lygia/color/layer/phoenixSourceOver.hlsl", "start": 89736197, "end": 89737211}, {"filename": "/vendored/lygia/color/layer/phoenixSourceOver.msl", "start": 89737211, "end": 89738198}, {"filename": "/vendored/lygia/color/layer/pinLightSourceOver.glsl", "start": 89738198, "end": 89739205}, {"filename": "/vendored/lygia/color/layer/pinLightSourceOver.hlsl", "start": 89739205, "end": 89740230}, {"filename": "/vendored/lygia/color/layer/pinLightSourceOver.msl", "start": 89740230, "end": 89741228}, {"filename": "/vendored/lygia/color/layer/reflectSourceOver.glsl", "start": 89741228, "end": 89742226}, {"filename": "/vendored/lygia/color/layer/reflectSourceOver.hlsl", "start": 89742226, "end": 89743240}, {"filename": "/vendored/lygia/color/layer/reflectSourceOver.msl", "start": 89743240, "end": 89744227}, {"filename": "/vendored/lygia/color/layer/saturationSourceOver.glsl", "start": 89744227, "end": 89745244}, {"filename": "/vendored/lygia/color/layer/saturationSourceOver.hlsl", "start": 89745244, "end": 89746279}, {"filename": "/vendored/lygia/color/layer/saturationSourceOver.msl", "start": 89746279, "end": 89747287}, {"filename": "/vendored/lygia/color/layer/screenSourceOver.glsl", "start": 89747287, "end": 89748276}, {"filename": "/vendored/lygia/color/layer/screenSourceOver.hlsl", "start": 89748276, "end": 89749283}, {"filename": "/vendored/lygia/color/layer/screenSourceOver.msl", "start": 89749283, "end": 89750263}, {"filename": "/vendored/lygia/color/layer/softLightSourceOver.glsl", "start": 89750263, "end": 89751277}, {"filename": "/vendored/lygia/color/layer/softLightSourceOver.hlsl", "start": 89751277, "end": 89752309}, {"filename": "/vendored/lygia/color/layer/softLightSourceOver.msl", "start": 89752309, "end": 89753314}, {"filename": "/vendored/lygia/color/layer/subtractSourceOver.glsl", "start": 89753314, "end": 89754317}, {"filename": "/vendored/lygia/color/layer/subtractSourceOver.hlsl", "start": 89754317, "end": 89755338}, {"filename": "/vendored/lygia/color/layer/subtractSourceOver.msl", "start": 89755338, "end": 89756332}, {"filename": "/vendored/lygia/color/layer/vividLightSourceOver.glsl", "start": 89756332, "end": 89757353}, {"filename": "/vendored/lygia/color/layer/vividLightSourceOver.hlsl", "start": 89757353, "end": 89758392}, {"filename": "/vendored/lygia/color/layer/vividLightSourceOver.msl", "start": 89758392, "end": 89759404}, {"filename": "/vendored/lygia/color/levels.glsl", "start": 89759404, "end": 89760784}, {"filename": "/vendored/lygia/color/levels.hlsl", "start": 89760784, "end": 89762603}, {"filename": "/vendored/lygia/color/levels.msl", "start": 89762603, "end": 89763969}, {"filename": "/vendored/lygia/color/levels/gamma.glsl", "start": 89763969, "end": 89764789}, {"filename": "/vendored/lygia/color/levels/gamma.hlsl", "start": 89764789, "end": 89765797}, {"filename": "/vendored/lygia/color/levels/gamma.msl", "start": 89765797, "end": 89766619}, {"filename": "/vendored/lygia/color/levels/inputRange.glsl", "start": 89766619, "end": 89767679}, {"filename": "/vendored/lygia/color/levels/inputRange.hlsl", "start": 89767679, "end": 89768958}, {"filename": "/vendored/lygia/color/levels/inputRange.msl", "start": 89768958, "end": 89770020}, {"filename": "/vendored/lygia/color/levels/outputRange.glsl", "start": 89770020, "end": 89771038}, {"filename": "/vendored/lygia/color/levels/outputRange.hlsl", "start": 89771038, "end": 89772268}, {"filename": "/vendored/lygia/color/levels/outputRange.msl", "start": 89772268, "end": 89773280}, {"filename": "/vendored/lygia/color/luma.glsl", "start": 89773280, "end": 89773682}, {"filename": "/vendored/lygia/color/luma.hlsl", "start": 89773682, "end": 89774140}, {"filename": "/vendored/lygia/color/luma.msl", "start": 89774140, "end": 89774542}, {"filename": "/vendored/lygia/color/luma.wesl", "start": 89774542, "end": 89774812}, {"filename": "/vendored/lygia/color/luma.wgsl", "start": 89774812, "end": 89775075}, {"filename": "/vendored/lygia/color/luminance.glsl", "start": 89775075, "end": 89775788}, {"filename": "/vendored/lygia/color/luminance.hlsl", "start": 89775788, "end": 89776391}, {"filename": "/vendored/lygia/color/luminance.msl", "start": 89776391, "end": 89777014}, {"filename": "/vendored/lygia/color/lut.glsl", "start": 89777014, "end": 89780087}, {"filename": "/vendored/lygia/color/lut.hlsl", "start": 89780087, "end": 89782961}, {"filename": "/vendored/lygia/color/lut.msl", "start": 89782961, "end": 89786038}, {"filename": "/vendored/lygia/color/mixOklab.glsl", "start": 89786038, "end": 89787434}, {"filename": "/vendored/lygia/color/mixOklab.hlsl", "start": 89787434, "end": 89788935}, {"filename": "/vendored/lygia/color/mixOklab.msl", "start": 89788935, "end": 89790362}, {"filename": "/vendored/lygia/color/mixOklab.wesl", "start": 89790362, "end": 89791384}, {"filename": "/vendored/lygia/color/mixOklab.wgsl", "start": 89791384, "end": 89792431}, {"filename": "/vendored/lygia/color/mixRYB.glsl", "start": 89792431, "end": 89794209}, {"filename": "/vendored/lygia/color/mixRYB.hlsl", "start": 89794209, "end": 89796101}, {"filename": "/vendored/lygia/color/mixRYB.msl", "start": 89796101, "end": 89797985}, {"filename": "/vendored/lygia/color/mixSpectral.glsl", "start": 89797985, "end": 89815593}, {"filename": "/vendored/lygia/color/mixSpectral.hlsl", "start": 89815593, "end": 89826119}, {"filename": "/vendored/lygia/color/mixSpectral.msl", "start": 89826119, "end": 89836779}, {"filename": "/vendored/lygia/color/mixSpectral.wesl", "start": 89836779, "end": 89853077}, {"filename": "/vendored/lygia/color/mixSpectral.wgsl", "start": 89853077, "end": 89869359}, {"filename": "/vendored/lygia/color/palette.glsl", "start": 89869359, "end": 89869936}, {"filename": "/vendored/lygia/color/palette.hlsl", "start": 89869936, "end": 89870546}, {"filename": "/vendored/lygia/color/palette.msl", "start": 89870546, "end": 89871116}, {"filename": "/vendored/lygia/color/palette/fire.cuh", "start": 89871116, "end": 89871653}, {"filename": "/vendored/lygia/color/palette/fire.glsl", "start": 89871653, "end": 89872221}, {"filename": "/vendored/lygia/color/palette/fire.hlsl", "start": 89872221, "end": 89872682}, {"filename": "/vendored/lygia/color/palette/flexoki.glsl", "start": 89872682, "end": 89883283}, {"filename": "/vendored/lygia/color/palette/flexoki.hlsl", "start": 89883283, "end": 89894122}, {"filename": "/vendored/lygia/color/palette/heatmap.cuh", "start": 89894122, "end": 89894680}, {"filename": "/vendored/lygia/color/palette/heatmap.glsl", "start": 89894680, "end": 89895271}, {"filename": "/vendored/lygia/color/palette/heatmap.hlsl", "start": 89895271, "end": 89895754}, {"filename": "/vendored/lygia/color/palette/heatmap.wesl", "start": 89895754, "end": 89896268}, {"filename": "/vendored/lygia/color/palette/heatmap.wgsl", "start": 89896268, "end": 89896782}, {"filename": "/vendored/lygia/color/palette/hue.cuh", "start": 89896782, "end": 89897662}, {"filename": "/vendored/lygia/color/palette/hue.glsl", "start": 89897662, "end": 89898435}, {"filename": "/vendored/lygia/color/palette/hue.hlsl", "start": 89898435, "end": 89899085}, {"filename": "/vendored/lygia/color/palette/hue.wesl", "start": 89899085, "end": 89899753}, {"filename": "/vendored/lygia/color/palette/hue.wgsl", "start": 89899753, "end": 89900421}, {"filename": "/vendored/lygia/color/palette/lerp.glsl", "start": 89900421, "end": 89902177}, {"filename": "/vendored/lygia/color/palette/macbeth.glsl", "start": 89902177, "end": 89922676}, {"filename": "/vendored/lygia/color/palette/macbeth.hlsl", "start": 89922676, "end": 89942173}, {"filename": "/vendored/lygia/color/palette/pigments.glsl", "start": 89942173, "end": 89944107}, {"filename": "/vendored/lygia/color/palette/pigments.hlsl", "start": 89944107, "end": 89946071}, {"filename": "/vendored/lygia/color/palette/pigments/gamblin_oil.glsl", "start": 89946071, "end": 89954890}, {"filename": "/vendored/lygia/color/palette/pigments/gamblin_oil.hlsl", "start": 89954890, "end": 89963799}, {"filename": "/vendored/lygia/color/palette/pigments/golden_acrylic.glsl", "start": 89963799, "end": 89970883}, {"filename": "/vendored/lygia/color/palette/pigments/golden_acrylic.hlsl", "start": 89970883, "end": 89978035}, {"filename": "/vendored/lygia/color/palette/pigments/liquitex_acrylic.glsl", "start": 89978035, "end": 89982997}, {"filename": "/vendored/lygia/color/palette/pigments/liquitex_acrylic.hlsl", "start": 89982997, "end": 89988003}, {"filename": "/vendored/lygia/color/palette/pigments/rembrandt_oil.glsl", "start": 89988003, "end": 89995894}, {"filename": "/vendored/lygia/color/palette/pigments/rembrandt_oil.hlsl", "start": 89995894, "end": 90003863}, {"filename": "/vendored/lygia/color/palette/pigments/winsor_acrylic.glsl", "start": 90003863, "end": 90016539}, {"filename": "/vendored/lygia/color/palette/pigments/winsor_acrylic.hlsl", "start": 90016539, "end": 90029335}, {"filename": "/vendored/lygia/color/palette/pigments/winsor_gouache.glsl", "start": 90029335, "end": 90039094}, {"filename": "/vendored/lygia/color/palette/pigments/winsor_gouache.hlsl", "start": 90039094, "end": 90048949}, {"filename": "/vendored/lygia/color/palette/pigments/winsor_oil.glsl", "start": 90048949, "end": 90062820}, {"filename": "/vendored/lygia/color/palette/pigments/winsor_oil.hlsl", "start": 90062820, "end": 90076833}, {"filename": "/vendored/lygia/color/palette/ridgway.glsl", "start": 90076833, "end": 90273663}, {"filename": "/vendored/lygia/color/palette/ridgway.hlsl", "start": 90273663, "end": 90472727}, {"filename": "/vendored/lygia/color/palette/spectral.glsl", "start": 90472727, "end": 90474455}, {"filename": "/vendored/lygia/color/palette/spectral.hlsl", "start": 90474455, "end": 90476169}, {"filename": "/vendored/lygia/color/palette/spectral/gems.glsl", "start": 90476169, "end": 90476847}, {"filename": "/vendored/lygia/color/palette/spectral/gems.hlsl", "start": 90476847, "end": 90477501}, {"filename": "/vendored/lygia/color/palette/spectral/geoffrey.glsl", "start": 90477501, "end": 90477885}, {"filename": "/vendored/lygia/color/palette/spectral/geoffrey.hlsl", "start": 90477885, "end": 90478164}, {"filename": "/vendored/lygia/color/palette/spectral/soft.glsl", "start": 90478164, "end": 90478937}, {"filename": "/vendored/lygia/color/palette/spectral/soft.hlsl", "start": 90478937, "end": 90479645}, {"filename": "/vendored/lygia/color/palette/spectral/zucconi.glsl", "start": 90479645, "end": 90480837}, {"filename": "/vendored/lygia/color/palette/spectral/zucconi.hlsl", "start": 90480837, "end": 90481932}, {"filename": "/vendored/lygia/color/palette/spectral/zucconi6.glsl", "start": 90481932, "end": 90483250}, {"filename": "/vendored/lygia/color/palette/spectral/zucconi6.hlsl", "start": 90483250, "end": 90484483}, {"filename": "/vendored/lygia/color/palette/spyder.glsl", "start": 90484483, "end": 90498531}, {"filename": "/vendored/lygia/color/palette/spyder.hlsl", "start": 90498531, "end": 90512543}, {"filename": "/vendored/lygia/color/palette/wada.glsl", "start": 90512543, "end": 90512650}, {"filename": "/vendored/lygia/color/palette/wada.hlsl", "start": 90512650, "end": 90512757}, {"filename": "/vendored/lygia/color/palette/wada/dyad.glsl", "start": 90512757, "end": 90517019}, {"filename": "/vendored/lygia/color/palette/wada/dyad.hlsl", "start": 90517019, "end": 90521013}, {"filename": "/vendored/lygia/color/palette/wada/tetrad.glsl", "start": 90521013, "end": 90525295}, {"filename": "/vendored/lygia/color/palette/wada/tetrad.hlsl", "start": 90525295, "end": 90529317}, {"filename": "/vendored/lygia/color/palette/wada/triad.glsl", "start": 90529317, "end": 90533615}, {"filename": "/vendored/lygia/color/palette/wada/triad.hlsl", "start": 90533615, "end": 90537660}, {"filename": "/vendored/lygia/color/palette/wada/value.glsl", "start": 90537660, "end": 90604735}, {"filename": "/vendored/lygia/color/palette/wada/value.hlsl", "start": 90604735, "end": 90672174}, {"filename": "/vendored/lygia/color/palette/water.cuh", "start": 90672174, "end": 90672779}, {"filename": "/vendored/lygia/color/palette/water.glsl", "start": 90672779, "end": 90673401}, {"filename": "/vendored/lygia/color/palette/water.hlsl", "start": 90673401, "end": 90673896}, {"filename": "/vendored/lygia/color/palette/zorn.glsl", "start": 90673896, "end": 90674986}, {"filename": "/vendored/lygia/color/saturationMatrix.glsl", "start": 90674986, "end": 90675780}, {"filename": "/vendored/lygia/color/saturationMatrix.hlsl", "start": 90675780, "end": 90676829}, {"filename": "/vendored/lygia/color/saturationMatrix.msl", "start": 90676829, "end": 90677642}, {"filename": "/vendored/lygia/color/saturationMatrix.wesl", "start": 90677642, "end": 90678341}, {"filename": "/vendored/lygia/color/saturationMatrix.wgsl", "start": 90678341, "end": 90679040}, {"filename": "/vendored/lygia/color/space.glsl", "start": 90679040, "end": 90680040}, {"filename": "/vendored/lygia/color/space.hlsl", "start": 90680040, "end": 90680609}, {"filename": "/vendored/lygia/color/space.msl", "start": 90680609, "end": 90681585}, {"filename": "/vendored/lygia/color/space/YCbCr2rgb.glsl", "start": 90681585, "end": 90682353}, {"filename": "/vendored/lygia/color/space/YCbCr2rgb.hlsl", "start": 90682353, "end": 90683125}, {"filename": "/vendored/lygia/color/space/YCbCr2rgb.msl", "start": 90683125, "end": 90683893}, {"filename": "/vendored/lygia/color/space/YCbCr2rgb.wesl", "start": 90683893, "end": 90684481}, {"filename": "/vendored/lygia/color/space/YCbCr2rgb.wgsl", "start": 90684481, "end": 90685069}, {"filename": "/vendored/lygia/color/space/YPbPr2rgb.glsl", "start": 90685069, "end": 90685988}, {"filename": "/vendored/lygia/color/space/YPbPr2rgb.hlsl", "start": 90685988, "end": 90686943}, {"filename": "/vendored/lygia/color/space/YPbPr2rgb.msl", "start": 90686943, "end": 90687920}, {"filename": "/vendored/lygia/color/space/YPbPr2rgb.wesl", "start": 90687920, "end": 90688665}, {"filename": "/vendored/lygia/color/space/YPbPr2rgb.wgsl", "start": 90688665, "end": 90689410}, {"filename": "/vendored/lygia/color/space/cmyk2rgb.glsl", "start": 90689410, "end": 90689961}, {"filename": "/vendored/lygia/color/space/cmyk2rgb.hlsl", "start": 90689961, "end": 90690485}, {"filename": "/vendored/lygia/color/space/cmyk2rgb.msl", "start": 90690485, "end": 90691034}, {"filename": "/vendored/lygia/color/space/cmyk2rgb.wesl", "start": 90691034, "end": 90691479}, {"filename": "/vendored/lygia/color/space/cmyk2rgb.wgsl", "start": 90691479, "end": 90691924}, {"filename": "/vendored/lygia/color/space/gamma2linear.glsl", "start": 90691924, "end": 90692834}, {"filename": "/vendored/lygia/color/space/gamma2linear.hlsl", "start": 90692834, "end": 90693756}, {"filename": "/vendored/lygia/color/space/gamma2linear.msl", "start": 90693756, "end": 90694658}, {"filename": "/vendored/lygia/color/space/gamma2linear.wesl", "start": 90694658, "end": 90695060}, {"filename": "/vendored/lygia/color/space/gamma2linear.wgsl", "start": 90695060, "end": 90695462}, {"filename": "/vendored/lygia/color/space/hcy2rgb.glsl", "start": 90695462, "end": 90696264}, {"filename": "/vendored/lygia/color/space/hcy2rgb.hlsl", "start": 90696264, "end": 90697090}, {"filename": "/vendored/lygia/color/space/hcy2rgb.msl", "start": 90697090, "end": 90697918}, {"filename": "/vendored/lygia/color/space/hcy2rgb.wesl", "start": 90697918, "end": 90698598}, {"filename": "/vendored/lygia/color/space/hcy2rgb.wgsl", "start": 90698598, "end": 90699265}, {"filename": "/vendored/lygia/color/space/hsl2rgb.glsl", "start": 90699265, "end": 90699929}, {"filename": "/vendored/lygia/color/space/hsl2rgb.hlsl", "start": 90699929, "end": 90700613}, {"filename": "/vendored/lygia/color/space/hsl2rgb.msl", "start": 90700613, "end": 90701280}, {"filename": "/vendored/lygia/color/space/hsl2rgb.wesl", "start": 90701280, "end": 90701790}, {"filename": "/vendored/lygia/color/space/hsl2rgb.wgsl", "start": 90701790, "end": 90702287}, {"filename": "/vendored/lygia/color/space/hsv2rgb.glsl", "start": 90702287, "end": 90702684}, {"filename": "/vendored/lygia/color/space/hsv2rgb.hlsl", "start": 90702684, "end": 90703052}, {"filename": "/vendored/lygia/color/space/hsv2rgb.msl", "start": 90703052, "end": 90703449}, {"filename": "/vendored/lygia/color/space/hsv2rgb.wesl", "start": 90703449, "end": 90703674}, {"filename": "/vendored/lygia/color/space/hsv2rgb.wgsl", "start": 90703674, "end": 90703877}, {"filename": "/vendored/lygia/color/space/hsv2ryb.glsl", "start": 90703877, "end": 90705003}, {"filename": "/vendored/lygia/color/space/hsv2ryb.hlsl", "start": 90705003, "end": 90706147}, {"filename": "/vendored/lygia/color/space/hsv2ryb.msl", "start": 90706147, "end": 90707295}, {"filename": "/vendored/lygia/color/space/hsv2ryb.wesl", "start": 90707295, "end": 90707922}, {"filename": "/vendored/lygia/color/space/hsv2ryb.wgsl", "start": 90707922, "end": 90708556}, {"filename": "/vendored/lygia/color/space/hue2rgb.glsl", "start": 90708556, "end": 90709196}, {"filename": "/vendored/lygia/color/space/hue2rgb.hlsl", "start": 90709196, "end": 90709798}, {"filename": "/vendored/lygia/color/space/hue2rgb.msl", "start": 90709798, "end": 90710437}, {"filename": "/vendored/lygia/color/space/hue2rgb.wesl", "start": 90710437, "end": 90710951}, {"filename": "/vendored/lygia/color/space/hue2rgb.wgsl", "start": 90710951, "end": 90711465}, {"filename": "/vendored/lygia/color/space/k2rgb.glsl", "start": 90711465, "end": 90713592}, {"filename": "/vendored/lygia/color/space/k2rgb.hlsl", "start": 90713592, "end": 90715725}, {"filename": "/vendored/lygia/color/space/k2rgb.msl", "start": 90715725, "end": 90717869}, {"filename": "/vendored/lygia/color/space/k2rgb.wesl", "start": 90717869, "end": 90718584}, {"filename": "/vendored/lygia/color/space/k2rgb.wgsl", "start": 90718584, "end": 90719285}, {"filename": "/vendored/lygia/color/space/lab2lch.glsl", "start": 90719285, "end": 90719981}, {"filename": "/vendored/lygia/color/space/lab2lch.hlsl", "start": 90719981, "end": 90720697}, {"filename": "/vendored/lygia/color/space/lab2lch.msl", "start": 90720697, "end": 90721404}, {"filename": "/vendored/lygia/color/space/lab2lch.wesl", "start": 90721404, "end": 90721954}, {"filename": "/vendored/lygia/color/space/lab2lch.wgsl", "start": 90721954, "end": 90722504}, {"filename": "/vendored/lygia/color/space/lab2rgb.glsl", "start": 90722504, "end": 90723154}, {"filename": "/vendored/lygia/color/space/lab2rgb.hlsl", "start": 90723154, "end": 90723751}, {"filename": "/vendored/lygia/color/space/lab2rgb.msl", "start": 90723751, "end": 90724397}, {"filename": "/vendored/lygia/color/space/lab2rgb.wesl", "start": 90724397, "end": 90724913}, {"filename": "/vendored/lygia/color/space/lab2rgb.wgsl", "start": 90724913, "end": 90725413}, {"filename": "/vendored/lygia/color/space/lab2srgb.glsl", "start": 90725413, "end": 90726083}, {"filename": "/vendored/lygia/color/space/lab2srgb.hlsl", "start": 90726083, "end": 90726972}, {"filename": "/vendored/lygia/color/space/lab2srgb.msl", "start": 90726972, "end": 90727642}, {"filename": "/vendored/lygia/color/space/lab2srgb.wesl", "start": 90727642, "end": 90728184}, {"filename": "/vendored/lygia/color/space/lab2srgb.wgsl", "start": 90728184, "end": 90728682}, {"filename": "/vendored/lygia/color/space/lab2xyz.glsl", "start": 90728682, "end": 90729779}, {"filename": "/vendored/lygia/color/space/lab2xyz.hlsl", "start": 90729779, "end": 90730886}, {"filename": "/vendored/lygia/color/space/lab2xyz.msl", "start": 90730886, "end": 90731992}, {"filename": "/vendored/lygia/color/space/lab2xyz.wesl", "start": 90731992, "end": 90732665}, {"filename": "/vendored/lygia/color/space/lab2xyz.wgsl", "start": 90732665, "end": 90733338}, {"filename": "/vendored/lygia/color/space/lch2lab.glsl", "start": 90733338, "end": 90734041}, {"filename": "/vendored/lygia/color/space/lch2lab.hlsl", "start": 90734041, "end": 90734764}, {"filename": "/vendored/lygia/color/space/lch2lab.msl", "start": 90734764, "end": 90735484}, {"filename": "/vendored/lygia/color/space/lch2lab.wesl", "start": 90735484, "end": 90736043}, {"filename": "/vendored/lygia/color/space/lch2lab.wgsl", "start": 90736043, "end": 90736602}, {"filename": "/vendored/lygia/color/space/lch2rgb.glsl", "start": 90736602, "end": 90737266}, {"filename": "/vendored/lygia/color/space/lch2rgb.hlsl", "start": 90737266, "end": 90737949}, {"filename": "/vendored/lygia/color/space/lch2rgb.msl", "start": 90737949, "end": 90738626}, {"filename": "/vendored/lygia/color/space/lch2rgb.wesl", "start": 90738626, "end": 90739166}, {"filename": "/vendored/lygia/color/space/lch2rgb.wgsl", "start": 90739166, "end": 90739688}, {"filename": "/vendored/lygia/color/space/lch2srgb.glsl", "start": 90739688, "end": 90740342}, {"filename": "/vendored/lygia/color/space/lch2srgb.msl", "start": 90740342, "end": 90741005}, {"filename": "/vendored/lygia/color/space/linear2gamma.glsl", "start": 90741005, "end": 90741927}, {"filename": "/vendored/lygia/color/space/linear2gamma.hlsl", "start": 90741927, "end": 90742871}, {"filename": "/vendored/lygia/color/space/linear2gamma.msl", "start": 90742871, "end": 90743785}, {"filename": "/vendored/lygia/color/space/linear2gamma.wesl", "start": 90743785, "end": 90744186}, {"filename": "/vendored/lygia/color/space/linear2gamma.wgsl", "start": 90744186, "end": 90744587}, {"filename": "/vendored/lygia/color/space/lms2rgb.glsl", "start": 90744587, "end": 90745834}, {"filename": "/vendored/lygia/color/space/lms2rgb.hlsl", "start": 90745834, "end": 90747124}, {"filename": "/vendored/lygia/color/space/lms2rgb.msl", "start": 90747124, "end": 90748439}, {"filename": "/vendored/lygia/color/space/lms2rgb.wesl", "start": 90748439, "end": 90749525}, {"filename": "/vendored/lygia/color/space/lms2rgb.wgsl", "start": 90749525, "end": 90750611}, {"filename": "/vendored/lygia/color/space/oklab2rgb.glsl", "start": 90750611, "end": 90751501}, {"filename": "/vendored/lygia/color/space/oklab2rgb.hlsl", "start": 90751501, "end": 90752431}, {"filename": "/vendored/lygia/color/space/oklab2rgb.msl", "start": 90752431, "end": 90753391}, {"filename": "/vendored/lygia/color/space/oklab2rgb.wesl", "start": 90753391, "end": 90754105}, {"filename": "/vendored/lygia/color/space/oklab2rgb.wgsl", "start": 90754105, "end": 90754819}, {"filename": "/vendored/lygia/color/space/oklab2srgb.glsl", "start": 90754819, "end": 90755321}, {"filename": "/vendored/lygia/color/space/oklab2srgb.hlsl", "start": 90755321, "end": 90755840}, {"filename": "/vendored/lygia/color/space/oklab2srgb.msl", "start": 90755840, "end": 90756342}, {"filename": "/vendored/lygia/color/space/oklab2srgb.wesl", "start": 90756342, "end": 90756725}, {"filename": "/vendored/lygia/color/space/oklab2srgb.wgsl", "start": 90756725, "end": 90757087}, {"filename": "/vendored/lygia/color/space/rgb2YCbCr.glsl", "start": 90757087, "end": 90757848}, {"filename": "/vendored/lygia/color/space/rgb2YCbCr.hlsl", "start": 90757848, "end": 90758610}, {"filename": "/vendored/lygia/color/space/rgb2YCbCr.msl", "start": 90758610, "end": 90759377}, {"filename": "/vendored/lygia/color/space/rgb2YCbCr.wesl", "start": 90759377, "end": 90759973}, {"filename": "/vendored/lygia/color/space/rgb2YCbCr.wgsl", "start": 90759973, "end": 90760569}, {"filename": "/vendored/lygia/color/space/rgb2YPbPr.glsl", "start": 90760569, "end": 90761547}, {"filename": "/vendored/lygia/color/space/rgb2YPbPr.hlsl", "start": 90761547, "end": 90762556}, {"filename": "/vendored/lygia/color/space/rgb2YPbPr.msl", "start": 90762556, "end": 90763596}, {"filename": "/vendored/lygia/color/space/rgb2YPbPr.wesl", "start": 90763596, "end": 90764424}, {"filename": "/vendored/lygia/color/space/rgb2YPbPr.wgsl", "start": 90764424, "end": 90765252}, {"filename": "/vendored/lygia/color/space/rgb2cmyk.glsl", "start": 90765252, "end": 90765900}, {"filename": "/vendored/lygia/color/space/rgb2cmyk.hlsl", "start": 90765900, "end": 90766515}, {"filename": "/vendored/lygia/color/space/rgb2cmyk.msl", "start": 90766515, "end": 90767165}, {"filename": "/vendored/lygia/color/space/rgb2cmyk.wesl", "start": 90767165, "end": 90767691}, {"filename": "/vendored/lygia/color/space/rgb2cmyk.wgsl", "start": 90767691, "end": 90768217}, {"filename": "/vendored/lygia/color/space/rgb2hcv.glsl", "start": 90768217, "end": 90769112}, {"filename": "/vendored/lygia/color/space/rgb2hcv.hlsl", "start": 90769112, "end": 90770047}, {"filename": "/vendored/lygia/color/space/rgb2hcv.msl", "start": 90770047, "end": 90770962}, {"filename": "/vendored/lygia/color/space/rgb2hcv.wesl", "start": 90770962, "end": 90771764}, {"filename": "/vendored/lygia/color/space/rgb2hcv.wgsl", "start": 90771764, "end": 90772456}, {"filename": "/vendored/lygia/color/space/rgb2hcy.glsl", "start": 90772456, "end": 90773421}, {"filename": "/vendored/lygia/color/space/rgb2hcy.hlsl", "start": 90773421, "end": 90774402}, {"filename": "/vendored/lygia/color/space/rgb2hcy.msl", "start": 90774402, "end": 90775385}, {"filename": "/vendored/lygia/color/space/rgb2hcy.wesl", "start": 90775385, "end": 90776183}, {"filename": "/vendored/lygia/color/space/rgb2hcy.wgsl", "start": 90776183, "end": 90776936}, {"filename": "/vendored/lygia/color/space/rgb2heat.glsl", "start": 90776936, "end": 90777530}, {"filename": "/vendored/lygia/color/space/rgb2heat.hlsl", "start": 90777530, "end": 90778114}, {"filename": "/vendored/lygia/color/space/rgb2heat.msl", "start": 90778114, "end": 90778699}, {"filename": "/vendored/lygia/color/space/rgb2heat.wesl", "start": 90778699, "end": 90779164}, {"filename": "/vendored/lygia/color/space/rgb2heat.wgsl", "start": 90779164, "end": 90779607}, {"filename": "/vendored/lygia/color/space/rgb2hsl.glsl", "start": 90779607, "end": 90780403}, {"filename": "/vendored/lygia/color/space/rgb2hsl.hlsl", "start": 90780403, "end": 90781203}, {"filename": "/vendored/lygia/color/space/rgb2hsl.msl", "start": 90781203, "end": 90782004}, {"filename": "/vendored/lygia/color/space/rgb2hsl.wesl", "start": 90782004, "end": 90782598}, {"filename": "/vendored/lygia/color/space/rgb2hsl.wgsl", "start": 90782598, "end": 90783170}, {"filename": "/vendored/lygia/color/space/rgb2hsv.glsl", "start": 90783170, "end": 90783916}, {"filename": "/vendored/lygia/color/space/rgb2hsv.hlsl", "start": 90783916, "end": 90784643}, {"filename": "/vendored/lygia/color/space/rgb2hsv.msl", "start": 90784643, "end": 90785402}, {"filename": "/vendored/lygia/color/space/rgb2hsv.wesl", "start": 90785402, "end": 90785933}, {"filename": "/vendored/lygia/color/space/rgb2hsv.wgsl", "start": 90785933, "end": 90786464}, {"filename": "/vendored/lygia/color/space/rgb2hue.glsl", "start": 90786464, "end": 90787349}, {"filename": "/vendored/lygia/color/space/rgb2hue.hlsl", "start": 90787349, "end": 90788075}, {"filename": "/vendored/lygia/color/space/rgb2hue.msl", "start": 90788075, "end": 90788968}, {"filename": "/vendored/lygia/color/space/rgb2hue.wesl", "start": 90788968, "end": 90789773}, {"filename": "/vendored/lygia/color/space/rgb2hue.wgsl", "start": 90789773, "end": 90790464}, {"filename": "/vendored/lygia/color/space/rgb2lab.glsl", "start": 90790464, "end": 90791066}, {"filename": "/vendored/lygia/color/space/rgb2lab.hlsl", "start": 90791066, "end": 90791678}, {"filename": "/vendored/lygia/color/space/rgb2lab.msl", "start": 90791678, "end": 90792280}, {"filename": "/vendored/lygia/color/space/rgb2lab.wesl", "start": 90792280, "end": 90792739}, {"filename": "/vendored/lygia/color/space/rgb2lab.wgsl", "start": 90792739, "end": 90793180}, {"filename": "/vendored/lygia/color/space/rgb2lch.glsl", "start": 90793180, "end": 90793782}, {"filename": "/vendored/lygia/color/space/rgb2lch.hlsl", "start": 90793782, "end": 90794402}, {"filename": "/vendored/lygia/color/space/rgb2lch.msl", "start": 90794402, "end": 90795004}, {"filename": "/vendored/lygia/color/space/rgb2lch.wesl", "start": 90795004, "end": 90795486}, {"filename": "/vendored/lygia/color/space/rgb2lch.wgsl", "start": 90795486, "end": 90795926}, {"filename": "/vendored/lygia/color/space/rgb2lms.glsl", "start": 90795926, "end": 90797101}, {"filename": "/vendored/lygia/color/space/rgb2lms.hlsl", "start": 90797101, "end": 90798323}, {"filename": "/vendored/lygia/color/space/rgb2lms.msl", "start": 90798323, "end": 90799566}, {"filename": "/vendored/lygia/color/space/rgb2lms.wesl", "start": 90799566, "end": 90800590}, {"filename": "/vendored/lygia/color/space/rgb2lms.wgsl", "start": 90800590, "end": 90801614}, {"filename": "/vendored/lygia/color/space/rgb2luma.glsl", "start": 90801614, "end": 90802247}, {"filename": "/vendored/lygia/color/space/rgb2luma.hlsl", "start": 90802247, "end": 90802890}, {"filename": "/vendored/lygia/color/space/rgb2luma.msl", "start": 90802890, "end": 90803517}, {"filename": "/vendored/lygia/color/space/rgb2luma.wesl", "start": 90803517, "end": 90803990}, {"filename": "/vendored/lygia/color/space/rgb2luma.wgsl", "start": 90803990, "end": 90804463}, {"filename": "/vendored/lygia/color/space/rgb2oklab.glsl", "start": 90804463, "end": 90805378}, {"filename": "/vendored/lygia/color/space/rgb2oklab.hlsl", "start": 90805378, "end": 90806371}, {"filename": "/vendored/lygia/color/space/rgb2oklab.msl", "start": 90806371, "end": 90807360}, {"filename": "/vendored/lygia/color/space/rgb2oklab.wesl", "start": 90807360, "end": 90808342}, {"filename": "/vendored/lygia/color/space/rgb2oklab.wgsl", "start": 90808342, "end": 90809324}, {"filename": "/vendored/lygia/color/space/rgb2ryb.glsl", "start": 90809324, "end": 90811896}, {"filename": "/vendored/lygia/color/space/rgb2ryb.hlsl", "start": 90811896, "end": 90814526}, {"filename": "/vendored/lygia/color/space/rgb2ryb.msl", "start": 90814526, "end": 90817174}, {"filename": "/vendored/lygia/color/space/rgb2ryb.wesl", "start": 90817174, "end": 90818470}, {"filename": "/vendored/lygia/color/space/rgb2ryb.wgsl", "start": 90818470, "end": 90819814}, {"filename": "/vendored/lygia/color/space/rgb2srgb.glsl", "start": 90819814, "end": 90820812}, {"filename": "/vendored/lygia/color/space/rgb2srgb.hlsl", "start": 90820812, "end": 90821834}, {"filename": "/vendored/lygia/color/space/rgb2srgb.msl", "start": 90821834, "end": 90822827}, {"filename": "/vendored/lygia/color/space/rgb2srgb.wesl", "start": 90822827, "end": 90823466}, {"filename": "/vendored/lygia/color/space/rgb2srgb.wgsl", "start": 90823466, "end": 90824105}, {"filename": "/vendored/lygia/color/space/rgb2xyY.glsl", "start": 90824105, "end": 90824695}, {"filename": "/vendored/lygia/color/space/rgb2xyY.hlsl", "start": 90824695, "end": 90825303}, {"filename": "/vendored/lygia/color/space/rgb2xyY.msl", "start": 90825303, "end": 90825909}, {"filename": "/vendored/lygia/color/space/rgb2xyY.wesl", "start": 90825909, "end": 90826398}, {"filename": "/vendored/lygia/color/space/rgb2xyY.wgsl", "start": 90826398, "end": 90826843}, {"filename": "/vendored/lygia/color/space/rgb2xyz.glsl", "start": 90826843, "end": 90827826}, {"filename": "/vendored/lygia/color/space/rgb2xyz.hlsl", "start": 90827826, "end": 90828863}, {"filename": "/vendored/lygia/color/space/rgb2xyz.msl", "start": 90828863, "end": 90829927}, {"filename": "/vendored/lygia/color/space/rgb2xyz.wesl", "start": 90829927, "end": 90830732}, {"filename": "/vendored/lygia/color/space/rgb2xyz.wgsl", "start": 90830732, "end": 90831537}, {"filename": "/vendored/lygia/color/space/rgb2yiq.glsl", "start": 90831537, "end": 90832357}, {"filename": "/vendored/lygia/color/space/rgb2yiq.hlsl", "start": 90832357, "end": 90833214}, {"filename": "/vendored/lygia/color/space/rgb2yiq.msl", "start": 90833214, "end": 90834061}, {"filename": "/vendored/lygia/color/space/rgb2yiq.wesl", "start": 90834061, "end": 90834718}, {"filename": "/vendored/lygia/color/space/rgb2yiq.wgsl", "start": 90834718, "end": 90835375}, {"filename": "/vendored/lygia/color/space/rgb2yuv.glsl", "start": 90835375, "end": 90836226}, {"filename": "/vendored/lygia/color/space/rgb2yuv.hlsl", "start": 90836226, "end": 90837113}, {"filename": "/vendored/lygia/color/space/rgb2yuv.msl", "start": 90837113, "end": 90838022}, {"filename": "/vendored/lygia/color/space/rgb2yuv.wesl", "start": 90838022, "end": 90838742}, {"filename": "/vendored/lygia/color/space/rgb2yuv.wgsl", "start": 90838742, "end": 90839462}, {"filename": "/vendored/lygia/color/space/ryb2rgb.glsl", "start": 90839462, "end": 90841813}, {"filename": "/vendored/lygia/color/space/ryb2rgb.hlsl", "start": 90841813, "end": 90844222}, {"filename": "/vendored/lygia/color/space/ryb2rgb.msl", "start": 90844222, "end": 90846652}, {"filename": "/vendored/lygia/color/space/ryb2rgb.wesl", "start": 90846652, "end": 90848019}, {"filename": "/vendored/lygia/color/space/ryb2rgb.wgsl", "start": 90848019, "end": 90849348}, {"filename": "/vendored/lygia/color/space/srgb2lab.glsl", "start": 90849348, "end": 90849948}, {"filename": "/vendored/lygia/color/space/srgb2lab.hlsl", "start": 90849948, "end": 90850566}, {"filename": "/vendored/lygia/color/space/srgb2lab.msl", "start": 90850566, "end": 90851166}, {"filename": "/vendored/lygia/color/space/srgb2lab.wesl", "start": 90851166, "end": 90851618}, {"filename": "/vendored/lygia/color/space/srgb2lab.wgsl", "start": 90851618, "end": 90852051}, {"filename": "/vendored/lygia/color/space/srgb2lch.glsl", "start": 90852051, "end": 90852652}, {"filename": "/vendored/lygia/color/space/srgb2lch.hlsl", "start": 90852652, "end": 90853271}, {"filename": "/vendored/lygia/color/space/srgb2lch.msl", "start": 90853271, "end": 90853872}, {"filename": "/vendored/lygia/color/space/srgb2lch.wesl", "start": 90853872, "end": 90854323}, {"filename": "/vendored/lygia/color/space/srgb2lch.wgsl", "start": 90854323, "end": 90854756}, {"filename": "/vendored/lygia/color/space/srgb2luma.glsl", "start": 90854756, "end": 90855389}, {"filename": "/vendored/lygia/color/space/srgb2luma.hlsl", "start": 90855389, "end": 90856014}, {"filename": "/vendored/lygia/color/space/srgb2luma.msl", "start": 90856014, "end": 90856641}, {"filename": "/vendored/lygia/color/space/srgb2luma.wesl", "start": 90856641, "end": 90857110}, {"filename": "/vendored/lygia/color/space/srgb2luma.wgsl", "start": 90857110, "end": 90857579}, {"filename": "/vendored/lygia/color/space/srgb2oklab.glsl", "start": 90857579, "end": 90858083}, {"filename": "/vendored/lygia/color/space/srgb2oklab.hlsl", "start": 90858083, "end": 90858599}, {"filename": "/vendored/lygia/color/space/srgb2oklab.msl", "start": 90858599, "end": 90859103}, {"filename": "/vendored/lygia/color/space/srgb2oklab.wesl", "start": 90859103, "end": 90859469}, {"filename": "/vendored/lygia/color/space/srgb2oklab.wgsl", "start": 90859469, "end": 90859788}, {"filename": "/vendored/lygia/color/space/srgb2rgb.glsl", "start": 90859788, "end": 90860804}, {"filename": "/vendored/lygia/color/space/srgb2rgb.hlsl", "start": 90860804, "end": 90861826}, {"filename": "/vendored/lygia/color/space/srgb2rgb.msl", "start": 90861826, "end": 90862838}, {"filename": "/vendored/lygia/color/space/srgb2rgb.wesl", "start": 90862838, "end": 90863553}, {"filename": "/vendored/lygia/color/space/srgb2rgb.wgsl", "start": 90863553, "end": 90864268}, {"filename": "/vendored/lygia/color/space/srgb2xyz.glsl", "start": 90864268, "end": 90864870}, {"filename": "/vendored/lygia/color/space/srgb2xyz.hlsl", "start": 90864870, "end": 90865473}, {"filename": "/vendored/lygia/color/space/srgb2xyz.msl", "start": 90865473, "end": 90866075}, {"filename": "/vendored/lygia/color/space/srgb2xyz.wesl", "start": 90866075, "end": 90866527}, {"filename": "/vendored/lygia/color/space/srgb2xyz.wgsl", "start": 90866527, "end": 90866960}, {"filename": "/vendored/lygia/color/space/w2rgb.glsl", "start": 90866960, "end": 90868951}, {"filename": "/vendored/lygia/color/space/w2rgb.hlsl", "start": 90868951, "end": 90870954}, {"filename": "/vendored/lygia/color/space/w2rgb.msl", "start": 90870954, "end": 90872948}, {"filename": "/vendored/lygia/color/space/xyY2rgb.glsl", "start": 90872948, "end": 90873550}, {"filename": "/vendored/lygia/color/space/xyY2rgb.hlsl", "start": 90873550, "end": 90874152}, {"filename": "/vendored/lygia/color/space/xyY2rgb.msl", "start": 90874152, "end": 90874754}, {"filename": "/vendored/lygia/color/space/xyY2rgb.wesl", "start": 90874754, "end": 90875202}, {"filename": "/vendored/lygia/color/space/xyY2rgb.wgsl", "start": 90875202, "end": 90875632}, {"filename": "/vendored/lygia/color/space/xyY2srgb.glsl", "start": 90875632, "end": 90876227}, {"filename": "/vendored/lygia/color/space/xyY2srgb.hlsl", "start": 90876227, "end": 90876840}, {"filename": "/vendored/lygia/color/space/xyY2srgb.msl", "start": 90876840, "end": 90877435}, {"filename": "/vendored/lygia/color/space/xyY2srgb.wesl", "start": 90877435, "end": 90877880}, {"filename": "/vendored/lygia/color/space/xyY2srgb.wgsl", "start": 90877880, "end": 90878307}, {"filename": "/vendored/lygia/color/space/xyY2xyz.glsl", "start": 90878307, "end": 90878963}, {"filename": "/vendored/lygia/color/space/xyY2xyz.hlsl", "start": 90878963, "end": 90879621}, {"filename": "/vendored/lygia/color/space/xyY2xyz.msl", "start": 90879621, "end": 90880281}, {"filename": "/vendored/lygia/color/space/xyY2xyz.wesl", "start": 90880281, "end": 90880763}, {"filename": "/vendored/lygia/color/space/xyY2xyz.wgsl", "start": 90880763, "end": 90881245}, {"filename": "/vendored/lygia/color/space/xyz2lab.glsl", "start": 90881245, "end": 90882044}, {"filename": "/vendored/lygia/color/space/xyz2lab.hlsl", "start": 90882044, "end": 90882862}, {"filename": "/vendored/lygia/color/space/xyz2lab.msl", "start": 90882862, "end": 90883675}, {"filename": "/vendored/lygia/color/space/xyz2lab.wesl", "start": 90883675, "end": 90884345}, {"filename": "/vendored/lygia/color/space/xyz2lab.wgsl", "start": 90884345, "end": 90885015}, {"filename": "/vendored/lygia/color/space/xyz2rgb.glsl", "start": 90885015, "end": 90885998}, {"filename": "/vendored/lygia/color/space/xyz2rgb.hlsl", "start": 90885998, "end": 90887009}, {"filename": "/vendored/lygia/color/space/xyz2rgb.msl", "start": 90887009, "end": 90888069}, {"filename": "/vendored/lygia/color/space/xyz2rgb.wesl", "start": 90888069, "end": 90888754}, {"filename": "/vendored/lygia/color/space/xyz2rgb.wgsl", "start": 90888754, "end": 90889439}, {"filename": "/vendored/lygia/color/space/xyz2srgb.glsl", "start": 90889439, "end": 90890099}, {"filename": "/vendored/lygia/color/space/xyz2srgb.hlsl", "start": 90890099, "end": 90890789}, {"filename": "/vendored/lygia/color/space/xyz2srgb.msl", "start": 90890789, "end": 90891458}, {"filename": "/vendored/lygia/color/space/xyz2srgb.wesl", "start": 90891458, "end": 90891980}, {"filename": "/vendored/lygia/color/space/xyz2srgb.wgsl", "start": 90891980, "end": 90892483}, {"filename": "/vendored/lygia/color/space/xyz2xyY.glsl", "start": 90892483, "end": 90893160}, {"filename": "/vendored/lygia/color/space/xyz2xyY.hlsl", "start": 90893160, "end": 90893840}, {"filename": "/vendored/lygia/color/space/xyz2xyY.msl", "start": 90893840, "end": 90894521}, {"filename": "/vendored/lygia/color/space/xyz2xyY.wesl", "start": 90894521, "end": 90895026}, {"filename": "/vendored/lygia/color/space/xyz2xyY.wgsl", "start": 90895026, "end": 90895531}, {"filename": "/vendored/lygia/color/space/yiq2rgb.glsl", "start": 90895531, "end": 90896332}, {"filename": "/vendored/lygia/color/space/yiq2rgb.hlsl", "start": 90896332, "end": 90897175}, {"filename": "/vendored/lygia/color/space/yiq2rgb.msl", "start": 90897175, "end": 90898008}, {"filename": "/vendored/lygia/color/space/yiq2rgb.wesl", "start": 90898008, "end": 90898590}, {"filename": "/vendored/lygia/color/space/yiq2rgb.wgsl", "start": 90898590, "end": 90899172}, {"filename": "/vendored/lygia/color/space/yuv2rgb.glsl", "start": 90899172, "end": 90900027}, {"filename": "/vendored/lygia/color/space/yuv2rgb.hlsl", "start": 90900027, "end": 90900918}, {"filename": "/vendored/lygia/color/space/yuv2rgb.msl", "start": 90900918, "end": 90901834}, {"filename": "/vendored/lygia/color/space/yuv2rgb.wesl", "start": 90901834, "end": 90902560}, {"filename": "/vendored/lygia/color/space/yuv2rgb.wgsl", "start": 90902560, "end": 90903286}, {"filename": "/vendored/lygia/color/tonemap.glsl", "start": 90903286, "end": 90904884}, {"filename": "/vendored/lygia/color/tonemap.hlsl", "start": 90904884, "end": 90906726}, {"filename": "/vendored/lygia/color/tonemap.msl", "start": 90906726, "end": 90908324}, {"filename": "/vendored/lygia/color/tonemap/aces.glsl", "start": 90908324, "end": 90908898}, {"filename": "/vendored/lygia/color/tonemap/aces.hlsl", "start": 90908898, "end": 90909450}, {"filename": "/vendored/lygia/color/tonemap/aces.wesl", "start": 90909450, "end": 90909969}, {"filename": "/vendored/lygia/color/tonemap/aces.wgsl", "start": 90909969, "end": 90910488}, {"filename": "/vendored/lygia/color/tonemap/debug.glsl", "start": 90910488, "end": 90912962}, {"filename": "/vendored/lygia/color/tonemap/debug.hlsl", "start": 90912962, "end": 90915468}, {"filename": "/vendored/lygia/color/tonemap/filmic.glsl", "start": 90915468, "end": 90916021}, {"filename": "/vendored/lygia/color/tonemap/filmic.hlsl", "start": 90916021, "end": 90916672}, {"filename": "/vendored/lygia/color/tonemap/filmic.wesl", "start": 90916672, "end": 90917253}, {"filename": "/vendored/lygia/color/tonemap/filmic.wgsl", "start": 90917253, "end": 90917834}, {"filename": "/vendored/lygia/color/tonemap/linear.glsl", "start": 90917834, "end": 90918116}, {"filename": "/vendored/lygia/color/tonemap/linear.hlsl", "start": 90918116, "end": 90918415}, {"filename": "/vendored/lygia/color/tonemap/reinhard.glsl", "start": 90918415, "end": 90918942}, {"filename": "/vendored/lygia/color/tonemap/reinhard.hlsl", "start": 90918942, "end": 90919481}, {"filename": "/vendored/lygia/color/tonemap/reinhardJodie.glsl", "start": 90919481, "end": 90920103}, {"filename": "/vendored/lygia/color/tonemap/reinhardJodie.hlsl", "start": 90920103, "end": 90920741}, {"filename": "/vendored/lygia/color/tonemap/uncharted.glsl", "start": 90920741, "end": 90921530}, {"filename": "/vendored/lygia/color/tonemap/uncharted.hlsl", "start": 90921530, "end": 90922346}, {"filename": "/vendored/lygia/color/tonemap/uncharted.wesl", "start": 90922346, "end": 90923031}, {"filename": "/vendored/lygia/color/tonemap/uncharted.wgsl", "start": 90923031, "end": 90923716}, {"filename": "/vendored/lygia/color/tonemap/uncharted2.glsl", "start": 90923716, "end": 90924342}, {"filename": "/vendored/lygia/color/tonemap/uncharted2.hlsl", "start": 90924342, "end": 90924998}, {"filename": "/vendored/lygia/color/tonemap/uncharted2.wesl", "start": 90924998, "end": 90925586}, {"filename": "/vendored/lygia/color/tonemap/uncharted2.wgsl", "start": 90925586, "end": 90926174}, {"filename": "/vendored/lygia/color/tonemap/unreal.glsl", "start": 90926174, "end": 90926694}, {"filename": "/vendored/lygia/color/tonemap/unreal.hlsl", "start": 90926694, "end": 90927231}, {"filename": "/vendored/lygia/color/vibrance.glsl", "start": 90927231, "end": 90928151}, {"filename": "/vendored/lygia/color/vibrance.hlsl", "start": 90928151, "end": 90929147}, {"filename": "/vendored/lygia/color/vibrance.msl", "start": 90929147, "end": 90930069}, {"filename": "/vendored/lygia/color/vibrance.wesl", "start": 90930069, "end": 90930974}, {"filename": "/vendored/lygia/color/vibrance.wgsl", "start": 90930974, "end": 90931862}, {"filename": "/vendored/lygia/color/whiteBalance.glsl", "start": 90931862, "end": 90934861}, {"filename": "/vendored/lygia/color/whiteBalance.hlsl", "start": 90934861, "end": 90938076}, {"filename": "/vendored/lygia/color/whiteBalance.msl", "start": 90938076, "end": 90941150}, {"filename": "/vendored/lygia/color/whiteBalance.wesl", "start": 90941150, "end": 90943460}, {"filename": "/vendored/lygia/color/whiteBalance.wgsl", "start": 90943460, "end": 90945831}, {"filename": "/vendored/lygia/distort/barrel.glsl", "start": 90945831, "end": 90948608}, {"filename": "/vendored/lygia/distort/barrel.hlsl", "start": 90948608, "end": 90951341}, {"filename": "/vendored/lygia/distort/barrel.msl", "start": 90951341, "end": 90954121}, {"filename": "/vendored/lygia/distort/chromaAB.glsl", "start": 90954121, "end": 90956656}, {"filename": "/vendored/lygia/distort/chromaAB.hlsl", "start": 90956656, "end": 90959204}, {"filename": "/vendored/lygia/distort/chromaAB.msl", "start": 90959204, "end": 90961713}, {"filename": "/vendored/lygia/distort/displace.glsl", "start": 90961713, "end": 90964398}, {"filename": "/vendored/lygia/distort/grain.glsl", "start": 90964398, "end": 90967170}, {"filename": "/vendored/lygia/distort/grain.hlsl", "start": 90967170, "end": 90969612}, {"filename": "/vendored/lygia/distort/grain.msl", "start": 90969612, "end": 90972425}, {"filename": "/vendored/lygia/distort/pincushion.glsl", "start": 90972425, "end": 90974427}, {"filename": "/vendored/lygia/distort/pincushion.msl", "start": 90974427, "end": 90976457}, {"filename": "/vendored/lygia/distort/stretch.glsl", "start": 90976457, "end": 90978659}, {"filename": "/vendored/lygia/distort/stretch.hlsl", "start": 90978659, "end": 90980888}, {"filename": "/vendored/lygia/distort/stretch.msl", "start": 90980888, "end": 90983084}, {"filename": "/vendored/lygia/draw/arrows.glsl", "start": 90983084, "end": 90986548}, {"filename": "/vendored/lygia/draw/arrows.msl", "start": 90986548, "end": 90990037}, {"filename": "/vendored/lygia/draw/axis.glsl", "start": 90990037, "end": 90991249}, {"filename": "/vendored/lygia/draw/axis.hlsl", "start": 90991249, "end": 90992510}, {"filename": "/vendored/lygia/draw/bridge.glsl", "start": 90992510, "end": 90993512}, {"filename": "/vendored/lygia/draw/bridge.hlsl", "start": 90993512, "end": 90994532}, {"filename": "/vendored/lygia/draw/bridge.msl", "start": 90994532, "end": 90995551}, {"filename": "/vendored/lygia/draw/char.glsl", "start": 90995551, "end": 91004355}, {"filename": "/vendored/lygia/draw/circle.glsl", "start": 91004355, "end": 91005041}, {"filename": "/vendored/lygia/draw/circle.hlsl", "start": 91005041, "end": 91005725}, {"filename": "/vendored/lygia/draw/circle.msl", "start": 91005725, "end": 91006406}, {"filename": "/vendored/lygia/draw/colorChecker.glsl", "start": 91006406, "end": 91010896}, {"filename": "/vendored/lygia/draw/colorChecker.msl", "start": 91010896, "end": 91015546}, {"filename": "/vendored/lygia/draw/colorPicker.glsl", "start": 91015546, "end": 91017847}, {"filename": "/vendored/lygia/draw/colorPicker.hlsl", "start": 91017847, "end": 91020222}, {"filename": "/vendored/lygia/draw/colorPicker.msl", "start": 91020222, "end": 91022597}, {"filename": "/vendored/lygia/draw/digits.glsl", "start": 91022597, "end": 91028954}, {"filename": "/vendored/lygia/draw/digits.hlsl", "start": 91028954, "end": 91035428}, {"filename": "/vendored/lygia/draw/digits.msl", "start": 91035428, "end": 91041839}, {"filename": "/vendored/lygia/draw/fill.glsl", "start": 91041839, "end": 91042623}, {"filename": "/vendored/lygia/draw/fill.hlsl", "start": 91042623, "end": 91043299}, {"filename": "/vendored/lygia/draw/fill.msl", "start": 91043299, "end": 91044082}, {"filename": "/vendored/lygia/draw/flip.glsl", "start": 91044082, "end": 91044715}, {"filename": "/vendored/lygia/draw/flip.hlsl", "start": 91044715, "end": 91045202}, {"filename": "/vendored/lygia/draw/flip.msl", "start": 91045202, "end": 91045825}, {"filename": "/vendored/lygia/draw/hex.glsl", "start": 91045825, "end": 91046480}, {"filename": "/vendored/lygia/draw/hex.hlsl", "start": 91046480, "end": 91047141}, {"filename": "/vendored/lygia/draw/hex.msl", "start": 91047141, "end": 91047799}, {"filename": "/vendored/lygia/draw/line.glsl", "start": 91047799, "end": 91048430}, {"filename": "/vendored/lygia/draw/line.hlsl", "start": 91048430, "end": 91049073}, {"filename": "/vendored/lygia/draw/matrix.glsl", "start": 91049073, "end": 91050546}, {"filename": "/vendored/lygia/draw/matrix.hlsl", "start": 91050546, "end": 91052124}, {"filename": "/vendored/lygia/draw/matrix.msl", "start": 91052124, "end": 91053701}, {"filename": "/vendored/lygia/draw/point.glsl", "start": 91053701, "end": 91055684}, {"filename": "/vendored/lygia/draw/point.hlsl", "start": 91055684, "end": 91057843}, {"filename": "/vendored/lygia/draw/point.msl", "start": 91057843, "end": 91060002}, {"filename": "/vendored/lygia/draw/rect.glsl", "start": 91060002, "end": 91060878}, {"filename": "/vendored/lygia/draw/rect.hlsl", "start": 91060878, "end": 91061562}, {"filename": "/vendored/lygia/draw/rect.msl", "start": 91061562, "end": 91062455}, {"filename": "/vendored/lygia/draw/stroke.glsl", "start": 91062455, "end": 91063363}, {"filename": "/vendored/lygia/draw/stroke.hlsl", "start": 91063363, "end": 91064238}, {"filename": "/vendored/lygia/draw/stroke.msl", "start": 91064238, "end": 91065141}, {"filename": "/vendored/lygia/draw/stroke.wesl", "start": 91065141, "end": 91065778}, {"filename": "/vendored/lygia/draw/stroke.wgsl", "start": 91065778, "end": 91066415}, {"filename": "/vendored/lygia/draw/tri.glsl", "start": 91066415, "end": 91067071}, {"filename": "/vendored/lygia/draw/tri.hlsl", "start": 91067071, "end": 91067733}, {"filename": "/vendored/lygia/draw/tri.msl", "start": 91067733, "end": 91068392}, {"filename": "/vendored/lygia/filter/bilateral.glsl", "start": 91068392, "end": 91071680}, {"filename": "/vendored/lygia/filter/bilateral.hlsl", "start": 91071680, "end": 91074468}, {"filename": "/vendored/lygia/filter/bilinear.glsl", "start": 91074468, "end": 91076234}, {"filename": "/vendored/lygia/filter/boxBlur.glsl", "start": 91076234, "end": 91078424}, {"filename": "/vendored/lygia/filter/boxBlur.hlsl", "start": 91078424, "end": 91080422}, {"filename": "/vendored/lygia/filter/boxBlur.msl", "start": 91080422, "end": 91082594}, {"filename": "/vendored/lygia/filter/boxBlur/1D.glsl", "start": 91082594, "end": 91084655}, {"filename": "/vendored/lygia/filter/boxBlur/1D.hlsl", "start": 91084655, "end": 91086435}, {"filename": "/vendored/lygia/filter/boxBlur/1D.msl", "start": 91086435, "end": 91088497}, {"filename": "/vendored/lygia/filter/boxBlur/2D.glsl", "start": 91088497, "end": 91090937}, {"filename": "/vendored/lygia/filter/boxBlur/2D.hlsl", "start": 91090937, "end": 91093055}, {"filename": "/vendored/lygia/filter/boxBlur/2D.msl", "start": 91093055, "end": 91095499}, {"filename": "/vendored/lygia/filter/boxBlur/2D_fast9.glsl", "start": 91095499, "end": 91097616}, {"filename": "/vendored/lygia/filter/boxBlur/2D_fast9.hlsl", "start": 91097616, "end": 91099713}, {"filename": "/vendored/lygia/filter/boxBlur/2D_fast9.msl", "start": 91099713, "end": 91101859}, {"filename": "/vendored/lygia/filter/edge.glsl", "start": 91101859, "end": 91103214}, {"filename": "/vendored/lygia/filter/edge.hlsl", "start": 91103214, "end": 91104511}, {"filename": "/vendored/lygia/filter/edge/prewitt.glsl", "start": 91104511, "end": 91106456}, {"filename": "/vendored/lygia/filter/edge/prewitt.hlsl", "start": 91106456, "end": 91108364}, {"filename": "/vendored/lygia/filter/edge/prewitt.wesl", "start": 91108364, "end": 91109713}, {"filename": "/vendored/lygia/filter/edge/prewitt.wgsl", "start": 91109713, "end": 91111066}, {"filename": "/vendored/lygia/filter/edge/sobel.glsl", "start": 91111066, "end": 91112980}, {"filename": "/vendored/lygia/filter/edge/sobel.hlsl", "start": 91112980, "end": 91114857}, {"filename": "/vendored/lygia/filter/edge/sobelDirectional.glsl", "start": 91114857, "end": 91117159}, {"filename": "/vendored/lygia/filter/edge/sobelDirectional.hlsl", "start": 91117159, "end": 91119438}, {"filename": "/vendored/lygia/filter/fibonacciBokeh.glsl", "start": 91119438, "end": 91121263}, {"filename": "/vendored/lygia/filter/gaussianBlur.glsl", "start": 91121263, "end": 91123618}, {"filename": "/vendored/lygia/filter/gaussianBlur.hlsl", "start": 91123618, "end": 91125947}, {"filename": "/vendored/lygia/filter/gaussianBlur.msl", "start": 91125947, "end": 91128277}, {"filename": "/vendored/lygia/filter/gaussianBlur/1D.glsl", "start": 91128277, "end": 91130835}, {"filename": "/vendored/lygia/filter/gaussianBlur/1D.hlsl", "start": 91130835, "end": 91132805}, {"filename": "/vendored/lygia/filter/gaussianBlur/1D.msl", "start": 91132805, "end": 91135350}, {"filename": "/vendored/lygia/filter/gaussianBlur/1D_fast13.glsl", "start": 91135350, "end": 91137300}, {"filename": "/vendored/lygia/filter/gaussianBlur/1D_fast13.hlsl", "start": 91137300, "end": 91139269}, {"filename": "/vendored/lygia/filter/gaussianBlur/1D_fast13.msl", "start": 91139269, "end": 91141231}, {"filename": "/vendored/lygia/filter/gaussianBlur/1D_fast5.glsl", "start": 91141231, "end": 91142684}, {"filename": "/vendored/lygia/filter/gaussianBlur/1D_fast5.hlsl", "start": 91142684, "end": 91144111}, {"filename": "/vendored/lygia/filter/gaussianBlur/1D_fast5.msl", "start": 91144111, "end": 91145568}, {"filename": "/vendored/lygia/filter/gaussianBlur/1D_fast9.glsl", "start": 91145568, "end": 91147197}, {"filename": "/vendored/lygia/filter/gaussianBlur/1D_fast9.hlsl", "start": 91147197, "end": 91148813}, {"filename": "/vendored/lygia/filter/gaussianBlur/1D_fast9.msl", "start": 91148813, "end": 91150450}, {"filename": "/vendored/lygia/filter/gaussianBlur/2D.glsl", "start": 91150450, "end": 91153251}, {"filename": "/vendored/lygia/filter/gaussianBlur/2D.hlsl", "start": 91153251, "end": 91155659}, {"filename": "/vendored/lygia/filter/gaussianBlur/2D.msl", "start": 91155659, "end": 91158462}, {"filename": "/vendored/lygia/filter/jointBilateral.glsl", "start": 91158462, "end": 91161939}, {"filename": "/vendored/lygia/filter/kuwahara.glsl", "start": 91161939, "end": 91168276}, {"filename": "/vendored/lygia/filter/kuwahara.hlsl", "start": 91168276, "end": 91172100}, {"filename": "/vendored/lygia/filter/laplacian.glsl", "start": 91172100, "end": 91178774}, {"filename": "/vendored/lygia/filter/laplacian.hlsl", "start": 91178774, "end": 91185585}, {"filename": "/vendored/lygia/filter/mean.glsl", "start": 91185585, "end": 91186822}, {"filename": "/vendored/lygia/filter/mean.hlsl", "start": 91186822, "end": 91188079}, {"filename": "/vendored/lygia/filter/median.glsl", "start": 91188079, "end": 91190716}, {"filename": "/vendored/lygia/filter/median.hlsl", "start": 91190716, "end": 91193328}, {"filename": "/vendored/lygia/filter/median/2D_fast3.glsl", "start": 91193328, "end": 91196098}, {"filename": "/vendored/lygia/filter/median/2D_fast3.hlsl", "start": 91196098, "end": 91198841}, {"filename": "/vendored/lygia/filter/median/2D_fast5.glsl", "start": 91198841, "end": 91202140}, {"filename": "/vendored/lygia/filter/median/2D_fast5.hlsl", "start": 91202140, "end": 91205418}, {"filename": "/vendored/lygia/filter/noiseBlur.glsl", "start": 91205418, "end": 91208705}, {"filename": "/vendored/lygia/filter/noiseBlur.hlsl", "start": 91208705, "end": 91211806}, {"filename": "/vendored/lygia/filter/radialBlur.glsl", "start": 91211806, "end": 91213640}, {"filename": "/vendored/lygia/filter/radialBlur.hlsl", "start": 91213640, "end": 91215410}, {"filename": "/vendored/lygia/filter/sharpen.glsl", "start": 91215410, "end": 91216851}, {"filename": "/vendored/lygia/filter/sharpen.hlsl", "start": 91216851, "end": 91218306}, {"filename": "/vendored/lygia/filter/sharpen/adaptive.glsl", "start": 91218306, "end": 91230633}, {"filename": "/vendored/lygia/filter/sharpen/adaptive.hlsl", "start": 91230633, "end": 91242991}, {"filename": "/vendored/lygia/filter/sharpen/adaptive.wesl", "start": 91242991, "end": 91257379}, {"filename": "/vendored/lygia/filter/sharpen/adaptive.wgsl", "start": 91257379, "end": 91271767}, {"filename": "/vendored/lygia/filter/sharpen/contrastAdaptive.glsl", "start": 91271767, "end": 91275419}, {"filename": "/vendored/lygia/filter/sharpen/contrastAdaptive.hlsl", "start": 91275419, "end": 91279033}, {"filename": "/vendored/lygia/filter/sharpen/fast.glsl", "start": 91279033, "end": 91281582}, {"filename": "/vendored/lygia/filter/sharpen/fast.hlsl", "start": 91281582, "end": 91284173}, {"filename": "/vendored/lygia/filter/sharpen/fast.wesl", "start": 91284173, "end": 91285590}, {"filename": "/vendored/lygia/filter/sharpen/fast.wgsl", "start": 91285590, "end": 91287007}, {"filename": "/vendored/lygia/filter/smartDeNoise.glsl", "start": 91287007, "end": 91289354}, {"filename": "/vendored/lygia/generative/cnoise.glsl", "start": 91289354, "end": 91298788}, {"filename": "/vendored/lygia/generative/cnoise.hlsl", "start": 91298788, "end": 91308792}, {"filename": "/vendored/lygia/generative/cnoise.msl", "start": 91308792, "end": 91318623}, {"filename": "/vendored/lygia/generative/cnoise.wesl", "start": 91318623, "end": 91327848}, {"filename": "/vendored/lygia/generative/cnoise.wgsl", "start": 91327848, "end": 91337003}, {"filename": "/vendored/lygia/generative/curl.glsl", "start": 91337003, "end": 91339592}, {"filename": "/vendored/lygia/generative/curl.hlsl", "start": 91339592, "end": 91341557}, {"filename": "/vendored/lygia/generative/curl.msl", "start": 91341557, "end": 91344252}, {"filename": "/vendored/lygia/generative/fbm.glsl", "start": 91344252, "end": 91347192}, {"filename": "/vendored/lygia/generative/fbm.hlsl", "start": 91347192, "end": 91349322}, {"filename": "/vendored/lygia/generative/fbm.msl", "start": 91349322, "end": 91352262}, {"filename": "/vendored/lygia/generative/gerstnerWave.glsl", "start": 91352262, "end": 91354375}, {"filename": "/vendored/lygia/generative/gerstnerWave.hlsl", "start": 91354375, "end": 91356596}, {"filename": "/vendored/lygia/generative/gerstnerWave.msl", "start": 91356596, "end": 91358731}, {"filename": "/vendored/lygia/generative/gnoise.glsl", "start": 91358731, "end": 91361587}, {"filename": "/vendored/lygia/generative/gnoise.msl", "start": 91361587, "end": 91364527}, {"filename": "/vendored/lygia/generative/noised.glsl", "start": 91364527, "end": 91367716}, {"filename": "/vendored/lygia/generative/noised.hlsl", "start": 91367716, "end": 91370936}, {"filename": "/vendored/lygia/generative/noised.msl", "start": 91370936, "end": 91374218}, {"filename": "/vendored/lygia/generative/noised.wesl", "start": 91374218, "end": 91377068}, {"filename": "/vendored/lygia/generative/noised.wgsl", "start": 91377068, "end": 91379883}, {"filename": "/vendored/lygia/generative/pnoise.glsl", "start": 91379883, "end": 91389581}, {"filename": "/vendored/lygia/generative/pnoise.hlsl", "start": 91389581, "end": 91399845}, {"filename": "/vendored/lygia/generative/pnoise.msl", "start": 91399845, "end": 91409967}, {"filename": "/vendored/lygia/generative/pnoise.wesl", "start": 91409967, "end": 91419399}, {"filename": "/vendored/lygia/generative/pnoise.wgsl", "start": 91419399, "end": 91428751}, {"filename": "/vendored/lygia/generative/psrdnoise.glsl", "start": 91428751, "end": 91450419}, {"filename": "/vendored/lygia/generative/psrdnoise.hlsl", "start": 91450419, "end": 91473443}, {"filename": "/vendored/lygia/generative/psrdnoise.msl", "start": 91473443, "end": 91495993}, {"filename": "/vendored/lygia/generative/random.glsl", "start": 91495993, "end": 91499451}, {"filename": "/vendored/lygia/generative/random.hlsl", "start": 91499451, "end": 91503290}, {"filename": "/vendored/lygia/generative/random.msl", "start": 91503290, "end": 91506814}, {"filename": "/vendored/lygia/generative/random.wesl", "start": 91506814, "end": 91510477}, {"filename": "/vendored/lygia/generative/random.wgsl", "start": 91510477, "end": 91514140}, {"filename": "/vendored/lygia/generative/snoise.glsl", "start": 91514140, "end": 91521886}, {"filename": "/vendored/lygia/generative/snoise.hlsl", "start": 91521886, "end": 91529555}, {"filename": "/vendored/lygia/generative/snoise.msl", "start": 91529555, "end": 91537567}, {"filename": "/vendored/lygia/generative/snoise.wesl", "start": 91537567, "end": 91545311}, {"filename": "/vendored/lygia/generative/snoise.wgsl", "start": 91545311, "end": 91552964}, {"filename": "/vendored/lygia/generative/srandom.glsl", "start": 91552964, "end": 91554446}, {"filename": "/vendored/lygia/generative/srandom.hlsl", "start": 91554446, "end": 91555241}, {"filename": "/vendored/lygia/generative/srandom.msl", "start": 91555241, "end": 91556769}, {"filename": "/vendored/lygia/generative/srandom.wesl", "start": 91556769, "end": 91558583}, {"filename": "/vendored/lygia/generative/srandom.wgsl", "start": 91558583, "end": 91560386}, {"filename": "/vendored/lygia/generative/voronoi.glsl", "start": 91560386, "end": 91561766}, {"filename": "/vendored/lygia/generative/voronoi.hlsl", "start": 91561766, "end": 91563109}, {"filename": "/vendored/lygia/generative/voronoi.msl", "start": 91563109, "end": 91564518}, {"filename": "/vendored/lygia/generative/voronoise.glsl", "start": 91564518, "end": 91566454}, {"filename": "/vendored/lygia/generative/voronoise.hlsl", "start": 91566454, "end": 91567974}, {"filename": "/vendored/lygia/generative/voronoise.msl", "start": 91567974, "end": 91569958}, {"filename": "/vendored/lygia/generative/wavelet.glsl", "start": 91569958, "end": 91571253}, {"filename": "/vendored/lygia/generative/wavelet.msl", "start": 91571253, "end": 91572440}, {"filename": "/vendored/lygia/generative/wavelet.wesl", "start": 91572440, "end": 91573812}, {"filename": "/vendored/lygia/generative/wavelet.wgsl", "start": 91573812, "end": 91575167}, {"filename": "/vendored/lygia/generative/worley.glsl", "start": 91575167, "end": 91578103}, {"filename": "/vendored/lygia/generative/worley.hlsl", "start": 91578103, "end": 91580968}, {"filename": "/vendored/lygia/generative/worley.msl", "start": 91580968, "end": 91582282}, {"filename": "/vendored/lygia/generative/worley.wesl", "start": 91582282, "end": 91585220}, {"filename": "/vendored/lygia/generative/worley.wgsl", "start": 91585220, "end": 91588102}, {"filename": "/vendored/lygia/geometry/aabb.cuh", "start": 91588102, "end": 91588271}, {"filename": "/vendored/lygia/geometry/aabb.glsl", "start": 91588271, "end": 91588446}, {"filename": "/vendored/lygia/geometry/aabb.hlsl", "start": 91588446, "end": 91588621}, {"filename": "/vendored/lygia/geometry/aabb/aabb.cuh", "start": 91588621, "end": 91589046}, {"filename": "/vendored/lygia/geometry/aabb/aabb.glsl", "start": 91589046, "end": 91589467}, {"filename": "/vendored/lygia/geometry/aabb/aabb.hlsl", "start": 91589467, "end": 91589919}, {"filename": "/vendored/lygia/geometry/aabb/centroid.cuh", "start": 91589919, "end": 91590479}, {"filename": "/vendored/lygia/geometry/aabb/centroid.glsl", "start": 91590479, "end": 91590973}, {"filename": "/vendored/lygia/geometry/aabb/centroid.hlsl", "start": 91590973, "end": 91591461}, {"filename": "/vendored/lygia/geometry/aabb/contain.cuh", "start": 91591461, "end": 91592184}, {"filename": "/vendored/lygia/geometry/aabb/contain.glsl", "start": 91592184, "end": 91592784}, {"filename": "/vendored/lygia/geometry/aabb/contain.hlsl", "start": 91592784, "end": 91593487}, {"filename": "/vendored/lygia/geometry/aabb/diagonal.cuh", "start": 91593487, "end": 91594087}, {"filename": "/vendored/lygia/geometry/aabb/diagonal.glsl", "start": 91594087, "end": 91594594}, {"filename": "/vendored/lygia/geometry/aabb/diagonal.hlsl", "start": 91594594, "end": 91595100}, {"filename": "/vendored/lygia/geometry/aabb/expand.cuh", "start": 91595100, "end": 91596165}, {"filename": "/vendored/lygia/geometry/aabb/expand.glsl", "start": 91596165, "end": 91596952}, {"filename": "/vendored/lygia/geometry/aabb/expand.hlsl", "start": 91596952, "end": 91597734}, {"filename": "/vendored/lygia/geometry/aabb/intersect.cuh", "start": 91597734, "end": 91598881}, {"filename": "/vendored/lygia/geometry/aabb/intersect.glsl", "start": 91598881, "end": 91600064}, {"filename": "/vendored/lygia/geometry/aabb/intersect.hlsl", "start": 91600064, "end": 91601277}, {"filename": "/vendored/lygia/geometry/aabb/intersection.cuh", "start": 91601277, "end": 91602002}, {"filename": "/vendored/lygia/geometry/aabb/square.cuh", "start": 91602002, "end": 91602721}, {"filename": "/vendored/lygia/geometry/aabb/square.glsl", "start": 91602721, "end": 91603391}, {"filename": "/vendored/lygia/geometry/aabb/square.hlsl", "start": 91603391, "end": 91604088}, {"filename": "/vendored/lygia/geometry/triangle.cuh", "start": 91604088, "end": 91604393}, {"filename": "/vendored/lygia/geometry/triangle.glsl", "start": 91604393, "end": 91604708}, {"filename": "/vendored/lygia/geometry/triangle.hlsl", "start": 91604708, "end": 91605022}, {"filename": "/vendored/lygia/geometry/triangle/area.cuh", "start": 91605022, "end": 91605688}, {"filename": "/vendored/lygia/geometry/triangle/area.glsl", "start": 91605688, "end": 91606218}, {"filename": "/vendored/lygia/geometry/triangle/area.hlsl", "start": 91606218, "end": 91606749}, {"filename": "/vendored/lygia/geometry/triangle/barycentric.cuh", "start": 91606749, "end": 91608457}, {"filename": "/vendored/lygia/geometry/triangle/barycentric.glsl", "start": 91608457, "end": 91609922}, {"filename": "/vendored/lygia/geometry/triangle/barycentric.hlsl", "start": 91609922, "end": 91611422}, {"filename": "/vendored/lygia/geometry/triangle/centroid.cuh", "start": 91611422, "end": 91612032}, {"filename": "/vendored/lygia/geometry/triangle/centroid.glsl", "start": 91612032, "end": 91612567}, {"filename": "/vendored/lygia/geometry/triangle/centroid.hlsl", "start": 91612567, "end": 91613107}, {"filename": "/vendored/lygia/geometry/triangle/closestPoint.cuh", "start": 91613107, "end": 91615582}, {"filename": "/vendored/lygia/geometry/triangle/closestPoint.glsl", "start": 91615582, "end": 91617851}, {"filename": "/vendored/lygia/geometry/triangle/closestPoint.hlsl", "start": 91617851, "end": 91620166}, {"filename": "/vendored/lygia/geometry/triangle/contain.cuh", "start": 91620166, "end": 91621342}, {"filename": "/vendored/lygia/geometry/triangle/contain.glsl", "start": 91621342, "end": 91622389}, {"filename": "/vendored/lygia/geometry/triangle/contain.hlsl", "start": 91622389, "end": 91623456}, {"filename": "/vendored/lygia/geometry/triangle/distanceSq.cuh", "start": 91623456, "end": 91624947}, {"filename": "/vendored/lygia/geometry/triangle/distanceSq.glsl", "start": 91624947, "end": 91626230}, {"filename": "/vendored/lygia/geometry/triangle/distanceSq.hlsl", "start": 91626230, "end": 91627497}, {"filename": "/vendored/lygia/geometry/triangle/intersect.cuh", "start": 91627497, "end": 91628886}, {"filename": "/vendored/lygia/geometry/triangle/intersect.glsl", "start": 91628886, "end": 91629998}, {"filename": "/vendored/lygia/geometry/triangle/intersect.hlsl", "start": 91629998, "end": 91631133}, {"filename": "/vendored/lygia/geometry/triangle/normal.cuh", "start": 91631133, "end": 91631812}, {"filename": "/vendored/lygia/geometry/triangle/normal.glsl", "start": 91631812, "end": 91632350}, {"filename": "/vendored/lygia/geometry/triangle/normal.hlsl", "start": 91632350, "end": 91632890}, {"filename": "/vendored/lygia/geometry/triangle/signedDistance.cuh", "start": 91632890, "end": 91633777}, {"filename": "/vendored/lygia/geometry/triangle/signedDistance.glsl", "start": 91633777, "end": 91634463}, {"filename": "/vendored/lygia/geometry/triangle/signedDistance.hlsl", "start": 91634463, "end": 91635163}, {"filename": "/vendored/lygia/geometry/triangle/triangle.cuh", "start": 91635163, "end": 91635592}, {"filename": "/vendored/lygia/geometry/triangle/triangle.glsl", "start": 91635592, "end": 91636019}, {"filename": "/vendored/lygia/geometry/triangle/triangle.hlsl", "start": 91636019, "end": 91636448}, {"filename": "/vendored/lygia/lighting/atmosphere.glsl", "start": 91636448, "end": 91642548}, {"filename": "/vendored/lygia/lighting/atmosphere.hlsl", "start": 91642548, "end": 91648876}, {"filename": "/vendored/lygia/lighting/blackbody.glsl", "start": 91648876, "end": 91649408}, {"filename": "/vendored/lygia/lighting/blackbody.hlsl", "start": 91649408, "end": 91649944}, {"filename": "/vendored/lygia/lighting/camera.cuh", "start": 91649944, "end": 91650430}, {"filename": "/vendored/lygia/lighting/camera.glsl", "start": 91650430, "end": 91650900}, {"filename": "/vendored/lygia/lighting/camera.hlsl", "start": 91650900, "end": 91651378}, {"filename": "/vendored/lygia/lighting/common/ashikhmin.glsl", "start": 91651378, "end": 91651880}, {"filename": "/vendored/lygia/lighting/common/ashikhmin.hlsl", "start": 91651880, "end": 91652364}, {"filename": "/vendored/lygia/lighting/common/beckmann.glsl", "start": 91652364, "end": 91652840}, {"filename": "/vendored/lygia/lighting/common/beckmann.hlsl", "start": 91652840, "end": 91653225}, {"filename": "/vendored/lygia/lighting/common/charlie.glsl", "start": 91653225, "end": 91653660}, {"filename": "/vendored/lygia/lighting/common/charlie.hlsl", "start": 91653660, "end": 91654077}, {"filename": "/vendored/lygia/lighting/common/clampNoV.glsl", "start": 91654077, "end": 91654341}, {"filename": "/vendored/lygia/lighting/common/clampNoV.hlsl", "start": 91654341, "end": 91654596}, {"filename": "/vendored/lygia/lighting/common/envBRDFApprox.glsl", "start": 91654596, "end": 91655425}, {"filename": "/vendored/lygia/lighting/common/envBRDFApprox.hlsl", "start": 91655425, "end": 91656269}, {"filename": "/vendored/lygia/lighting/common/ggx.glsl", "start": 91656269, "end": 91658263}, {"filename": "/vendored/lygia/lighting/common/ggx.hlsl", "start": 91658263, "end": 91660039}, {"filename": "/vendored/lygia/lighting/common/ggx.wesl", "start": 91660039, "end": 91660401}, {"filename": "/vendored/lygia/lighting/common/ggx.wgsl", "start": 91660401, "end": 91660763}, {"filename": "/vendored/lygia/lighting/common/gtaoMultiBounce.glsl", "start": 91660763, "end": 91661496}, {"filename": "/vendored/lygia/lighting/common/gtaoMultiBounce.hlsl", "start": 91661496, "end": 91662257}, {"filename": "/vendored/lygia/lighting/common/henyeyGreenstein.glsl", "start": 91662257, "end": 91663197}, {"filename": "/vendored/lygia/lighting/common/henyeyGreenstein.hlsl", "start": 91663197, "end": 91664130}, {"filename": "/vendored/lygia/lighting/common/kelemen.glsl", "start": 91664130, "end": 91664406}, {"filename": "/vendored/lygia/lighting/common/kelemen.hlsl", "start": 91664406, "end": 91664673}, {"filename": "/vendored/lygia/lighting/common/penner.glsl", "start": 91664673, "end": 91665496}, {"filename": "/vendored/lygia/lighting/common/perceptual2linearRoughness.glsl", "start": 91665496, "end": 91666259}, {"filename": "/vendored/lygia/lighting/common/perceptual2linearRoughness.hlsl", "start": 91666259, "end": 91667022}, {"filename": "/vendored/lygia/lighting/common/preFilteredImportanceSampling.glsl", "start": 91667022, "end": 91667355}, {"filename": "/vendored/lygia/lighting/common/preFilteredImportanceSampling.hlsl", "start": 91667355, "end": 91667688}, {"filename": "/vendored/lygia/lighting/common/rayleigh.glsl", "start": 91667688, "end": 91667871}, {"filename": "/vendored/lygia/lighting/common/rayleigh.hlsl", "start": 91667871, "end": 91668045}, {"filename": "/vendored/lygia/lighting/common/schlick.glsl", "start": 91668045, "end": 91668584}, {"filename": "/vendored/lygia/lighting/common/schlick.hlsl", "start": 91668584, "end": 91669058}, {"filename": "/vendored/lygia/lighting/common/schlick.wesl", "start": 91669058, "end": 91669166}, {"filename": "/vendored/lygia/lighting/common/schlick.wgsl", "start": 91669166, "end": 91669274}, {"filename": "/vendored/lygia/lighting/common/smithGGXCorrelated.glsl", "start": 91669274, "end": 91670351}, {"filename": "/vendored/lygia/lighting/common/smithGGXCorrelated.hlsl", "start": 91670351, "end": 91671375}, {"filename": "/vendored/lygia/lighting/common/specularAO.glsl", "start": 91671375, "end": 91672074}, {"filename": "/vendored/lygia/lighting/common/specularAO.hlsl", "start": 91672074, "end": 91672736}, {"filename": "/vendored/lygia/lighting/debugCube.glsl", "start": 91672736, "end": 91673298}, {"filename": "/vendored/lygia/lighting/debugCube.hlsl", "start": 91673298, "end": 91673841}, {"filename": "/vendored/lygia/lighting/diffuse.glsl", "start": 91673841, "end": 91674840}, {"filename": "/vendored/lygia/lighting/diffuse.hlsl", "start": 91674840, "end": 91675819}, {"filename": "/vendored/lygia/lighting/diffuse/burley.glsl", "start": 91675819, "end": 91677014}, {"filename": "/vendored/lygia/lighting/diffuse/burley.hlsl", "start": 91677014, "end": 91678186}, {"filename": "/vendored/lygia/lighting/diffuse/lambert.glsl", "start": 91678186, "end": 91679177}, {"filename": "/vendored/lygia/lighting/diffuse/lambert.hlsl", "start": 91679177, "end": 91680185}, {"filename": "/vendored/lygia/lighting/diffuse/orenNayar.glsl", "start": 91680185, "end": 91681524}, {"filename": "/vendored/lygia/lighting/diffuse/orenNayar.hlsl", "start": 91681524, "end": 91682829}, {"filename": "/vendored/lygia/lighting/diffuse/orenNayar.wesl", "start": 91682829, "end": 91683652}, {"filename": "/vendored/lygia/lighting/diffuse/orenNayar.wgsl", "start": 91683652, "end": 91684475}, {"filename": "/vendored/lygia/lighting/envMap.glsl", "start": 91684475, "end": 91687027}, {"filename": "/vendored/lygia/lighting/envMap.hlsl", "start": 91687027, "end": 91689290}, {"filename": "/vendored/lygia/lighting/exposure.glsl", "start": 91689290, "end": 91689750}, {"filename": "/vendored/lygia/lighting/exposure.hlsl", "start": 91689750, "end": 91690210}, {"filename": "/vendored/lygia/lighting/fakeCube.glsl", "start": 91690210, "end": 91692817}, {"filename": "/vendored/lygia/lighting/fakeCube.hlsl", "start": 91692817, "end": 91693631}, {"filename": "/vendored/lygia/lighting/fresnel.glsl", "start": 91693631, "end": 91695038}, {"filename": "/vendored/lygia/lighting/fresnel.hlsl", "start": 91695038, "end": 91696376}, {"filename": "/vendored/lygia/lighting/fresnel.wesl", "start": 91696376, "end": 91696813}, {"filename": "/vendored/lygia/lighting/fresnel.wgsl", "start": 91696813, "end": 91697231}, {"filename": "/vendored/lygia/lighting/fresnelReflection.glsl", "start": 91697231, "end": 91701528}, {"filename": "/vendored/lygia/lighting/fresnelReflection.hlsl", "start": 91701528, "end": 91705978}, {"filename": "/vendored/lygia/lighting/fresnelReflection.wesl", "start": 91705978, "end": 91707056}, {"filename": "/vendored/lygia/lighting/fresnelReflection.wgsl", "start": 91707056, "end": 91708132}, {"filename": "/vendored/lygia/lighting/gooch.glsl", "start": 91708132, "end": 91711606}, {"filename": "/vendored/lygia/lighting/gooch.hlsl", "start": 91711606, "end": 91715454}, {"filename": "/vendored/lygia/lighting/ior.glsl", "start": 91715454, "end": 91716620}, {"filename": "/vendored/lygia/lighting/ior.hlsl", "start": 91716620, "end": 91717796}, {"filename": "/vendored/lygia/lighting/ior/2eta.glsl", "start": 91717796, "end": 91718412}, {"filename": "/vendored/lygia/lighting/ior/2eta.hlsl", "start": 91718412, "end": 91719037}, {"filename": "/vendored/lygia/lighting/ior/2f0.glsl", "start": 91719037, "end": 91719807}, {"filename": "/vendored/lygia/lighting/ior/2f0.hlsl", "start": 91719807, "end": 91720586}, {"filename": "/vendored/lygia/lighting/ior/reflectance2f0.glsl", "start": 91720586, "end": 91721002}, {"filename": "/vendored/lygia/lighting/ior/reflectance2f0.hlsl", "start": 91721002, "end": 91721418}, {"filename": "/vendored/lygia/lighting/iridescence.glsl", "start": 91721418, "end": 91723073}, {"filename": "/vendored/lygia/lighting/iridescence.hlsl", "start": 91723073, "end": 91724679}, {"filename": "/vendored/lygia/lighting/light/attenuation.glsl", "start": 91724679, "end": 91725435}, {"filename": "/vendored/lygia/lighting/light/attenuation.hlsl", "start": 91725435, "end": 91726191}, {"filename": "/vendored/lygia/lighting/light/directional.glsl", "start": 91726191, "end": 91726663}, {"filename": "/vendored/lygia/lighting/light/directional.hlsl", "start": 91726663, "end": 91727139}, {"filename": "/vendored/lygia/lighting/light/directionalEvaluate.glsl", "start": 91727139, "end": 91729407}, {"filename": "/vendored/lygia/lighting/light/directionalEvaluate.hlsl", "start": 91729407, "end": 91731684}, {"filename": "/vendored/lygia/lighting/light/falloff.glsl", "start": 91731684, "end": 91732223}, {"filename": "/vendored/lygia/lighting/light/falloff.hlsl", "start": 91732223, "end": 91732761}, {"filename": "/vendored/lygia/lighting/light/iblEvaluate.glsl", "start": 91732761, "end": 91734988}, {"filename": "/vendored/lygia/lighting/light/iblEvaluate.hlsl", "start": 91734988, "end": 91737182}, {"filename": "/vendored/lygia/lighting/light/new.glsl", "start": 91737182, "end": 91739020}, {"filename": "/vendored/lygia/lighting/light/new.hlsl", "start": 91739020, "end": 91740888}, {"filename": "/vendored/lygia/lighting/light/point.glsl", "start": 91740888, "end": 91741356}, {"filename": "/vendored/lygia/lighting/light/point.hlsl", "start": 91741356, "end": 91741828}, {"filename": "/vendored/lygia/lighting/light/pointEvaluate.glsl", "start": 91741828, "end": 91744328}, {"filename": "/vendored/lygia/lighting/light/pointEvaluate.hlsl", "start": 91744328, "end": 91746839}, {"filename": "/vendored/lygia/lighting/light/resolve.glsl", "start": 91746839, "end": 91747310}, {"filename": "/vendored/lygia/lighting/light/resolve.hlsl", "start": 91747310, "end": 91747781}, {"filename": "/vendored/lygia/lighting/light/spot.glsl", "start": 91747781, "end": 91750083}, {"filename": "/vendored/lygia/lighting/light/spot.hlsl", "start": 91750083, "end": 91752613}, {"filename": "/vendored/lygia/lighting/material.glsl", "start": 91752613, "end": 91754652}, {"filename": "/vendored/lygia/lighting/material.hlsl", "start": 91754652, "end": 91756660}, {"filename": "/vendored/lygia/lighting/material/add.glsl", "start": 91756660, "end": 91758104}, {"filename": "/vendored/lygia/lighting/material/add.hlsl", "start": 91758104, "end": 91759553}, {"filename": "/vendored/lygia/lighting/material/albedo.glsl", "start": 91759553, "end": 91761437}, {"filename": "/vendored/lygia/lighting/material/albedo.hlsl", "start": 91761437, "end": 91763319}, {"filename": "/vendored/lygia/lighting/material/emissive.glsl", "start": 91763319, "end": 91764647}, {"filename": "/vendored/lygia/lighting/material/emissive.hlsl", "start": 91764647, "end": 91766000}, {"filename": "/vendored/lygia/lighting/material/metallic.glsl", "start": 91766000, "end": 91768277}, {"filename": "/vendored/lygia/lighting/material/metallic.hlsl", "start": 91768277, "end": 91770567}, {"filename": "/vendored/lygia/lighting/material/multiply.glsl", "start": 91770567, "end": 91771849}, {"filename": "/vendored/lygia/lighting/material/multiply.hlsl", "start": 91771849, "end": 91773131}, {"filename": "/vendored/lygia/lighting/material/new.glsl", "start": 91773131, "end": 91777485}, {"filename": "/vendored/lygia/lighting/material/new.hlsl", "start": 91777485, "end": 91781750}, {"filename": "/vendored/lygia/lighting/material/normal.glsl", "start": 91781750, "end": 91783632}, {"filename": "/vendored/lygia/lighting/material/normal.hlsl", "start": 91783632, "end": 91785517}, {"filename": "/vendored/lygia/lighting/material/occlusion.glsl", "start": 91785517, "end": 91787048}, {"filename": "/vendored/lygia/lighting/material/occlusion.hlsl", "start": 91787048, "end": 91788585}, {"filename": "/vendored/lygia/lighting/material/roughness.glsl", "start": 91788585, "end": 91790717}, {"filename": "/vendored/lygia/lighting/material/roughness.hlsl", "start": 91790717, "end": 91792857}, {"filename": "/vendored/lygia/lighting/material/shininess.glsl", "start": 91792857, "end": 91793841}, {"filename": "/vendored/lygia/lighting/material/shininess.hlsl", "start": 91793841, "end": 91794809}, {"filename": "/vendored/lygia/lighting/material/specular.glsl", "start": 91794809, "end": 91796083}, {"filename": "/vendored/lygia/lighting/material/specular.hlsl", "start": 91796083, "end": 91797379}, {"filename": "/vendored/lygia/lighting/material/zero.glsl", "start": 91797379, "end": 91799105}, {"filename": "/vendored/lygia/lighting/material/zero.hlsl", "start": 91799105, "end": 91800932}, {"filename": "/vendored/lygia/lighting/medium.glsl", "start": 91800932, "end": 91801188}, {"filename": "/vendored/lygia/lighting/medium.hlsl", "start": 91801188, "end": 91801444}, {"filename": "/vendored/lygia/lighting/medium/new.glsl", "start": 91801444, "end": 91802281}, {"filename": "/vendored/lygia/lighting/medium/new.hlsl", "start": 91802281, "end": 91803129}, {"filename": "/vendored/lygia/lighting/pbr.glsl", "start": 91803129, "end": 91805804}, {"filename": "/vendored/lygia/lighting/pbr.hlsl", "start": 91805804, "end": 91808454}, {"filename": "/vendored/lygia/lighting/pbrClearCoat.glsl", "start": 91808454, "end": 91814518}, {"filename": "/vendored/lygia/lighting/pbrClearCoat.hlsl", "start": 91814518, "end": 91820607}, {"filename": "/vendored/lygia/lighting/pbrGlass.glsl", "start": 91820607, "end": 91824257}, {"filename": "/vendored/lygia/lighting/pbrGlass.hlsl", "start": 91824257, "end": 91827945}, {"filename": "/vendored/lygia/lighting/pbrLittle.glsl", "start": 91827945, "end": 91831442}, {"filename": "/vendored/lygia/lighting/pbrLittle.hlsl", "start": 91831442, "end": 91834968}, {"filename": "/vendored/lygia/lighting/ray.cuh", "start": 91834968, "end": 91835368}, {"filename": "/vendored/lygia/lighting/ray.glsl", "start": 91835368, "end": 91835764}, {"filename": "/vendored/lygia/lighting/ray.hlsl", "start": 91835764, "end": 91836164}, {"filename": "/vendored/lygia/lighting/ray/cast.glsl", "start": 91836164, "end": 91836678}, {"filename": "/vendored/lygia/lighting/ray/direction.glsl", "start": 91836678, "end": 91838304}, {"filename": "/vendored/lygia/lighting/ray/new.glsl", "start": 91838304, "end": 91839622}, {"filename": "/vendored/lygia/lighting/raymarch.glsl", "start": 91839622, "end": 91844769}, {"filename": "/vendored/lygia/lighting/raymarch.hlsl", "start": 91844769, "end": 91850131}, {"filename": "/vendored/lygia/lighting/raymarch/ao.cuh", "start": 91850131, "end": 91851052}, {"filename": "/vendored/lygia/lighting/raymarch/ao.glsl", "start": 91851052, "end": 91852233}, {"filename": "/vendored/lygia/lighting/raymarch/ao.hlsl", "start": 91852233, "end": 91853386}, {"filename": "/vendored/lygia/lighting/raymarch/cast.cuh", "start": 91853386, "end": 91854809}, {"filename": "/vendored/lygia/lighting/raymarch/cast.glsl", "start": 91854809, "end": 91855983}, {"filename": "/vendored/lygia/lighting/raymarch/cast.hlsl", "start": 91855983, "end": 91857152}, {"filename": "/vendored/lygia/lighting/raymarch/cast.wesl", "start": 91857152, "end": 91857535}, {"filename": "/vendored/lygia/lighting/raymarch/cast.wgsl", "start": 91857535, "end": 91857918}, {"filename": "/vendored/lygia/lighting/raymarch/fog.glsl", "start": 91857918, "end": 91860004}, {"filename": "/vendored/lygia/lighting/raymarch/fog.hlsl", "start": 91860004, "end": 91862091}, {"filename": "/vendored/lygia/lighting/raymarch/glass.glsl", "start": 91862091, "end": 91872308}, {"filename": "/vendored/lygia/lighting/raymarch/glass.hlsl", "start": 91872308, "end": 91882456}, {"filename": "/vendored/lygia/lighting/raymarch/map.cuh", "start": 91882456, "end": 91882911}, {"filename": "/vendored/lygia/lighting/raymarch/map.glsl", "start": 91882911, "end": 91883449}, {"filename": "/vendored/lygia/lighting/raymarch/map.hlsl", "start": 91883449, "end": 91883942}, {"filename": "/vendored/lygia/lighting/raymarch/normal.cuh", "start": 91883942, "end": 91886109}, {"filename": "/vendored/lygia/lighting/raymarch/normal.glsl", "start": 91886109, "end": 91887378}, {"filename": "/vendored/lygia/lighting/raymarch/normal.hlsl", "start": 91887378, "end": 91888608}, {"filename": "/vendored/lygia/lighting/raymarch/normal.wesl", "start": 91888608, "end": 91889227}, {"filename": "/vendored/lygia/lighting/raymarch/normal.wgsl", "start": 91889227, "end": 91889846}, {"filename": "/vendored/lygia/lighting/raymarch/render.glsl", "start": 91889846, "end": 91891965}, {"filename": "/vendored/lygia/lighting/raymarch/render.hlsl", "start": 91891965, "end": 91894101}, {"filename": "/vendored/lygia/lighting/raymarch/shading.glsl", "start": 91894101, "end": 91896713}, {"filename": "/vendored/lygia/lighting/raymarch/shading.hlsl", "start": 91896713, "end": 91899276}, {"filename": "/vendored/lygia/lighting/raymarch/softShadow.cuh", "start": 91899276, "end": 91900777}, {"filename": "/vendored/lygia/lighting/raymarch/softShadow.glsl", "start": 91900777, "end": 91902396}, {"filename": "/vendored/lygia/lighting/raymarch/softShadow.hlsl", "start": 91902396, "end": 91903955}, {"filename": "/vendored/lygia/lighting/raymarch/volume.glsl", "start": 91903955, "end": 91909074}, {"filename": "/vendored/lygia/lighting/raymarch/volume.hlsl", "start": 91909074, "end": 91914264}, {"filename": "/vendored/lygia/lighting/reflection.glsl", "start": 91914264, "end": 91915989}, {"filename": "/vendored/lygia/lighting/reflection.hlsl", "start": 91915989, "end": 91917671}, {"filename": "/vendored/lygia/lighting/shadingData/new.glsl", "start": 91917671, "end": 91919492}, {"filename": "/vendored/lygia/lighting/shadingData/new.hlsl", "start": 91919492, "end": 91921340}, {"filename": "/vendored/lygia/lighting/shadingData/shadingData.glsl", "start": 91921340, "end": 91921885}, {"filename": "/vendored/lygia/lighting/shadingData/shadingData.hlsl", "start": 91921885, "end": 91922454}, {"filename": "/vendored/lygia/lighting/shadow.glsl", "start": 91922454, "end": 91923582}, {"filename": "/vendored/lygia/lighting/shadow.hlsl", "start": 91923582, "end": 91924503}, {"filename": "/vendored/lygia/lighting/specular.glsl", "start": 91924503, "end": 91925749}, {"filename": "/vendored/lygia/lighting/specular.hlsl", "start": 91925749, "end": 91926979}, {"filename": "/vendored/lygia/lighting/specular/beckmann.glsl", "start": 91926979, "end": 91927196}, {"filename": "/vendored/lygia/lighting/specular/beckmann.hlsl", "start": 91927196, "end": 91927413}, {"filename": "/vendored/lygia/lighting/specular/blinnPhong.glsl", "start": 91927413, "end": 91928199}, {"filename": "/vendored/lygia/lighting/specular/blinnPhong.hlsl", "start": 91928199, "end": 91928985}, {"filename": "/vendored/lygia/lighting/specular/cookTorrance.glsl", "start": 91928985, "end": 91930010}, {"filename": "/vendored/lygia/lighting/specular/cookTorrance.hlsl", "start": 91930010, "end": 91930958}, {"filename": "/vendored/lygia/lighting/specular/cookTorrance.wesl", "start": 91930958, "end": 91931565}, {"filename": "/vendored/lygia/lighting/specular/cookTorrance.wgsl", "start": 91931565, "end": 91932160}, {"filename": "/vendored/lygia/lighting/specular/gaussian.glsl", "start": 91932160, "end": 91932560}, {"filename": "/vendored/lygia/lighting/specular/gaussian.hlsl", "start": 91932560, "end": 91932960}, {"filename": "/vendored/lygia/lighting/specular/importanceSampling.glsl", "start": 91932960, "end": 91935385}, {"filename": "/vendored/lygia/lighting/specular/importanceSampling.hlsl", "start": 91935385, "end": 91937920}, {"filename": "/vendored/lygia/lighting/specular/phong.glsl", "start": 91937920, "end": 91938825}, {"filename": "/vendored/lygia/lighting/specular/phong.hlsl", "start": 91938825, "end": 91939738}, {"filename": "/vendored/lygia/lighting/specular/ward.glsl", "start": 91939738, "end": 91940609}, {"filename": "/vendored/lygia/lighting/specular/ward.hlsl", "start": 91940609, "end": 91941440}, {"filename": "/vendored/lygia/lighting/sphereMap.glsl", "start": 91941440, "end": 91942476}, {"filename": "/vendored/lygia/lighting/sphereMap.hlsl", "start": 91942476, "end": 91943438}, {"filename": "/vendored/lygia/lighting/sphericalHarmonics.glsl", "start": 91943438, "end": 91945170}, {"filename": "/vendored/lygia/lighting/sphericalHarmonics.hlsl", "start": 91945170, "end": 91946870}, {"filename": "/vendored/lygia/lighting/ssao.glsl", "start": 91946870, "end": 91951866}, {"filename": "/vendored/lygia/lighting/ssr.glsl", "start": 91951866, "end": 91956408}, {"filename": "/vendored/lygia/lighting/toMetallic.glsl", "start": 91956408, "end": 91957990}, {"filename": "/vendored/lygia/lighting/toMetallic.hlsl", "start": 91957990, "end": 91959506}, {"filename": "/vendored/lygia/lighting/toShininess.glsl", "start": 91959506, "end": 91960195}, {"filename": "/vendored/lygia/lighting/toShininess.hlsl", "start": 91960195, "end": 91960868}, {"filename": "/vendored/lygia/lighting/toShininess.wesl", "start": 91960868, "end": 91961482}, {"filename": "/vendored/lygia/lighting/toShininess.wgsl", "start": 91961482, "end": 91962096}, {"filename": "/vendored/lygia/lighting/transparent.glsl", "start": 91962096, "end": 91966012}, {"filename": "/vendored/lygia/lighting/transparent.hlsl", "start": 91966012, "end": 91970035}, {"filename": "/vendored/lygia/lighting/volumetricLightScattering.glsl", "start": 91970035, "end": 91975176}, {"filename": "/vendored/lygia/lighting/wavelength.glsl", "start": 91975176, "end": 91975659}, {"filename": "/vendored/lygia/lighting/wavelength.hlsl", "start": 91975659, "end": 91976144}, {"filename": "/vendored/lygia/math.cuh", "start": 91976144, "end": 91977863}, {"filename": "/vendored/lygia/math.glsl", "start": 91977863, "end": 91979652}, {"filename": "/vendored/lygia/math.hlsl", "start": 91979652, "end": 91981302}, {"filename": "/vendored/lygia/math.msl", "start": 91981302, "end": 91983101}, {"filename": "/vendored/lygia/math.wgsl", "start": 91983101, "end": 91984465}, {"filename": "/vendored/lygia/math/aafloor.glsl", "start": 91984465, "end": 91985610}, {"filename": "/vendored/lygia/math/aafloor.hlsl", "start": 91985610, "end": 91986420}, {"filename": "/vendored/lygia/math/aafloor.msl", "start": 91986420, "end": 91987365}, {"filename": "/vendored/lygia/math/aafloor.wesl", "start": 91987365, "end": 91987953}, {"filename": "/vendored/lygia/math/aafloor.wgsl", "start": 91987953, "end": 91988536}, {"filename": "/vendored/lygia/math/aafract.glsl", "start": 91988536, "end": 91989672}, {"filename": "/vendored/lygia/math/aafract.hlsl", "start": 91989672, "end": 91990470}, {"filename": "/vendored/lygia/math/aafract.msl", "start": 91990470, "end": 91991343}, {"filename": "/vendored/lygia/math/aafract.wesl", "start": 91991343, "end": 91991862}, {"filename": "/vendored/lygia/math/aafract.wgsl", "start": 91991862, "end": 91992376}, {"filename": "/vendored/lygia/math/aamirror.glsl", "start": 91992376, "end": 91992852}, {"filename": "/vendored/lygia/math/aamirror.hlsl", "start": 91992852, "end": 91993328}, {"filename": "/vendored/lygia/math/aastep.glsl", "start": 91993328, "end": 91994343}, {"filename": "/vendored/lygia/math/aastep.hlsl", "start": 91994343, "end": 91995074}, {"filename": "/vendored/lygia/math/aastep.msl", "start": 91995074, "end": 91995772}, {"filename": "/vendored/lygia/math/aastep.wesl", "start": 91995772, "end": 91996129}, {"filename": "/vendored/lygia/math/aastep.wgsl", "start": 91996129, "end": 91996486}, {"filename": "/vendored/lygia/math/abs.cuh", "start": 91996486, "end": 91997736}, {"filename": "/vendored/lygia/math/absi.glsl", "start": 91997736, "end": 91998146}, {"filename": "/vendored/lygia/math/absi.msl", "start": 91998146, "end": 91998556}, {"filename": "/vendored/lygia/math/adaptiveThreshold.cuh", "start": 91998556, "end": 91999272}, {"filename": "/vendored/lygia/math/adaptiveThreshold.glsl", "start": 91999272, "end": 91999892}, {"filename": "/vendored/lygia/math/adaptiveThreshold.hlsl", "start": 91999892, "end": 92000550}, {"filename": "/vendored/lygia/math/adaptiveThreshold.msl", "start": 92000550, "end": 92001155}, {"filename": "/vendored/lygia/math/adaptiveThreshold.wesl", "start": 92001155, "end": 92001529}, {"filename": "/vendored/lygia/math/adaptiveThreshold.wgsl", "start": 92001529, "end": 92001903}, {"filename": "/vendored/lygia/math/asin.cuh", "start": 92001903, "end": 92002768}, {"filename": "/vendored/lygia/math/atan2.glsl", "start": 92002768, "end": 92003149}, {"filename": "/vendored/lygia/math/atan2.msl", "start": 92003149, "end": 92003545}, {"filename": "/vendored/lygia/math/bump.cuh", "start": 92003545, "end": 92004445}, {"filename": "/vendored/lygia/math/bump.glsl", "start": 92004445, "end": 92005261}, {"filename": "/vendored/lygia/math/bump.hlsl", "start": 92005261, "end": 92005960}, {"filename": "/vendored/lygia/math/bump.msl", "start": 92005960, "end": 92006792}, {"filename": "/vendored/lygia/math/bump.wesl", "start": 92006792, "end": 92007417}, {"filename": "/vendored/lygia/math/bump.wgsl", "start": 92007417, "end": 92008042}, {"filename": "/vendored/lygia/math/clamp.cuh", "start": 92008042, "end": 92012053}, {"filename": "/vendored/lygia/math/const.cuh", "start": 92012053, "end": 92012962}, {"filename": "/vendored/lygia/math/const.glsl", "start": 92012962, "end": 92014336}, {"filename": "/vendored/lygia/math/const.hlsl", "start": 92014336, "end": 92015709}, {"filename": "/vendored/lygia/math/const.msl", "start": 92015709, "end": 92017081}, {"filename": "/vendored/lygia/math/const.wgsl", "start": 92017081, "end": 92018112}, {"filename": "/vendored/lygia/math/consts.wesl", "start": 92018112, "end": 92019143}, {"filename": "/vendored/lygia/math/cross.cuh", "start": 92019143, "end": 92019791}, {"filename": "/vendored/lygia/math/cubic.cuh", "start": 92019791, "end": 92021679}, {"filename": "/vendored/lygia/math/cubic.glsl", "start": 92021679, "end": 92023254}, {"filename": "/vendored/lygia/math/cubic.hlsl", "start": 92023254, "end": 92024931}, {"filename": "/vendored/lygia/math/cubic.msl", "start": 92024931, "end": 92026506}, {"filename": "/vendored/lygia/math/cubic.wesl", "start": 92026506, "end": 92026837}, {"filename": "/vendored/lygia/math/cubic.wgsl", "start": 92026837, "end": 92027168}, {"filename": "/vendored/lygia/math/cubicMix.glsl", "start": 92027168, "end": 92028073}, {"filename": "/vendored/lygia/math/cubicMix.hlsl", "start": 92028073, "end": 92029038}, {"filename": "/vendored/lygia/math/cubicMix.msl", "start": 92029038, "end": 92030002}, {"filename": "/vendored/lygia/math/cubicMix.wesl", "start": 92030002, "end": 92030720}, {"filename": "/vendored/lygia/math/cubicMix.wgsl", "start": 92030720, "end": 92031369}, {"filename": "/vendored/lygia/math/decimate.cuh", "start": 92031369, "end": 92031983}, {"filename": "/vendored/lygia/math/decimate.glsl", "start": 92031983, "end": 92032954}, {"filename": "/vendored/lygia/math/decimate.hlsl", "start": 92032954, "end": 92033862}, {"filename": "/vendored/lygia/math/decimate.msl", "start": 92033862, "end": 92034881}, {"filename": "/vendored/lygia/math/decimate.wesl", "start": 92034881, "end": 92035480}, {"filename": "/vendored/lygia/math/decimate.wgsl", "start": 92035480, "end": 92036079}, {"filename": "/vendored/lygia/math/dist.glsl", "start": 92036079, "end": 92038391}, {"filename": "/vendored/lygia/math/dist.hlsl", "start": 92038391, "end": 92040249}, {"filename": "/vendored/lygia/math/dist.wesl", "start": 92040249, "end": 92042684}, {"filename": "/vendored/lygia/math/dist.wgsl", "start": 92042684, "end": 92045119}, {"filename": "/vendored/lygia/math/dot.cuh", "start": 92045119, "end": 92046626}, {"filename": "/vendored/lygia/math/equal.msl", "start": 92046626, "end": 92047238}, {"filename": "/vendored/lygia/math/fcos.glsl", "start": 92047238, "end": 92047604}, {"filename": "/vendored/lygia/math/fcos.hlsl", "start": 92047604, "end": 92047970}, {"filename": "/vendored/lygia/math/floor.cuh", "start": 92047970, "end": 92048861}, {"filename": "/vendored/lygia/math/frac.cuh", "start": 92048861, "end": 92049781}, {"filename": "/vendored/lygia/math/frac.glsl", "start": 92049781, "end": 92050312}, {"filename": "/vendored/lygia/math/frac.msl", "start": 92050312, "end": 92050859}, {"filename": "/vendored/lygia/math/fract.cuh", "start": 92050859, "end": 92051816}, {"filename": "/vendored/lygia/math/fract.hlsl", "start": 92051816, "end": 92052351}, {"filename": "/vendored/lygia/math/gain.cuh", "start": 92052351, "end": 92052896}, {"filename": "/vendored/lygia/math/gain.glsl", "start": 92052896, "end": 92053485}, {"filename": "/vendored/lygia/math/gain.hlsl", "start": 92053485, "end": 92053959}, {"filename": "/vendored/lygia/math/gain.msl", "start": 92053959, "end": 92054548}, {"filename": "/vendored/lygia/math/gain.wesl", "start": 92054548, "end": 92054952}, {"filename": "/vendored/lygia/math/gain.wgsl", "start": 92054952, "end": 92055356}, {"filename": "/vendored/lygia/math/gaussian.cuh", "start": 92055356, "end": 92056378}, {"filename": "/vendored/lygia/math/gaussian.glsl", "start": 92056378, "end": 92057279}, {"filename": "/vendored/lygia/math/gaussian.hlsl", "start": 92057279, "end": 92058189}, {"filename": "/vendored/lygia/math/gaussian.msl", "start": 92058189, "end": 92059108}, {"filename": "/vendored/lygia/math/gaussian.msl 2", "start": 92059108, "end": 92060027}, {"filename": "/vendored/lygia/math/gaussian.wesl", "start": 92060027, "end": 92060760}, {"filename": "/vendored/lygia/math/gaussian.wgsl", "start": 92060760, "end": 92061493}, {"filename": "/vendored/lygia/math/grad4.cuh", "start": 92061493, "end": 92062387}, {"filename": "/vendored/lygia/math/grad4.glsl", "start": 92062387, "end": 92062862}, {"filename": "/vendored/lygia/math/grad4.hlsl", "start": 92062862, "end": 92063436}, {"filename": "/vendored/lygia/math/grad4.msl", "start": 92063436, "end": 92063956}, {"filename": "/vendored/lygia/math/grad4.wesl", "start": 92063956, "end": 92064382}, {"filename": "/vendored/lygia/math/grad4.wgsl", "start": 92064382, "end": 92064808}, {"filename": "/vendored/lygia/math/greaterThan.cuh", "start": 92064808, "end": 92065442}, {"filename": "/vendored/lygia/math/greaterThan.hlsl", "start": 92065442, "end": 92065904}, {"filename": "/vendored/lygia/math/greaterThan.msl", "start": 92065904, "end": 92066553}, {"filename": "/vendored/lygia/math/greaterThanEqual.msl", "start": 92066553, "end": 92067240}, {"filename": "/vendored/lygia/math/hammersley.glsl", "start": 92067240, "end": 92068277}, {"filename": "/vendored/lygia/math/hammersley.hlsl", "start": 92068277, "end": 92069289}, {"filename": "/vendored/lygia/math/highPass.cuh", "start": 92069289, "end": 92069806}, {"filename": "/vendored/lygia/math/highPass.glsl", "start": 92069806, "end": 92070283}, {"filename": "/vendored/lygia/math/highPass.hlsl", "start": 92070283, "end": 92070777}, {"filename": "/vendored/lygia/math/highPass.msl", "start": 92070777, "end": 92071248}, {"filename": "/vendored/lygia/math/highPass.wesl", "start": 92071248, "end": 92071620}, {"filename": "/vendored/lygia/math/highPass.wgsl", "start": 92071620, "end": 92071992}, {"filename": "/vendored/lygia/math/inside.glsl", "start": 92071992, "end": 92073117}, {"filename": "/vendored/lygia/math/inside.hlsl", "start": 92073117, "end": 92074278}, {"filename": "/vendored/lygia/math/inside.msl", "start": 92074278, "end": 92075438}, {"filename": "/vendored/lygia/math/inside.wesl", "start": 92075438, "end": 92076297}, {"filename": "/vendored/lygia/math/inside.wgsl", "start": 92076297, "end": 92077156}, {"filename": "/vendored/lygia/math/invCubic.cuh", "start": 92077156, "end": 92077905}, {"filename": "/vendored/lygia/math/invCubic.glsl", "start": 92077905, "end": 92078546}, {"filename": "/vendored/lygia/math/invCubic.hlsl", "start": 92078546, "end": 92079100}, {"filename": "/vendored/lygia/math/invCubic.msl", "start": 92079100, "end": 92079753}, {"filename": "/vendored/lygia/math/invCubic.wesl", "start": 92079753, "end": 92080158}, {"filename": "/vendored/lygia/math/invCubic.wgsl", "start": 92080158, "end": 92080563}, {"filename": "/vendored/lygia/math/invQuartic.cuh", "start": 92080563, "end": 92081278}, {"filename": "/vendored/lygia/math/invQuartic.glsl", "start": 92081278, "end": 92081907}, {"filename": "/vendored/lygia/math/invQuartic.hlsl", "start": 92081907, "end": 92082457}, {"filename": "/vendored/lygia/math/invQuartic.msl", "start": 92082457, "end": 92083098}, {"filename": "/vendored/lygia/math/invQuartic.wesl", "start": 92083098, "end": 92083484}, {"filename": "/vendored/lygia/math/invQuartic.wgsl", "start": 92083484, "end": 92083870}, {"filename": "/vendored/lygia/math/inverse.glsl", "start": 92083870, "end": 92086592}, {"filename": "/vendored/lygia/math/inverse.msl", "start": 92086592, "end": 92089503}, {"filename": "/vendored/lygia/math/inverse.wesl", "start": 92089503, "end": 92090265}, {"filename": "/vendored/lygia/math/inverse.wgsl", "start": 92090265, "end": 92091027}, {"filename": "/vendored/lygia/math/length.cuh", "start": 92091027, "end": 92091806}, {"filename": "/vendored/lygia/math/lengthSq.cuh", "start": 92091806, "end": 92092481}, {"filename": "/vendored/lygia/math/lengthSq.glsl", "start": 92092481, "end": 92093025}, {"filename": "/vendored/lygia/math/lengthSq.hlsl", "start": 92093025, "end": 92093587}, {"filename": "/vendored/lygia/math/lengthSq.msl", "start": 92093587, "end": 92094140}, {"filename": "/vendored/lygia/math/lengthSq.wesl", "start": 92094140, "end": 92094594}, {"filename": "/vendored/lygia/math/lengthSq.wgsl", "start": 92094594, "end": 92095048}, {"filename": "/vendored/lygia/math/lerp.cuh", "start": 92095048, "end": 92096368}, {"filename": "/vendored/lygia/math/lerp.glsl", "start": 92096368, "end": 92096963}, {"filename": "/vendored/lygia/math/lerp.msl", "start": 92096963, "end": 92097558}, {"filename": "/vendored/lygia/math/lessThan.msl", "start": 92097558, "end": 92098186}, {"filename": "/vendored/lygia/math/lessThanEqual.msl", "start": 92098186, "end": 92098852}, {"filename": "/vendored/lygia/math/make.cuh", "start": 92098852, "end": 92105547}, {"filename": "/vendored/lygia/math/map.cuh", "start": 92105547, "end": 92107404}, {"filename": "/vendored/lygia/math/map.glsl", "start": 92107404, "end": 92108900}, {"filename": "/vendored/lygia/math/map.hlsl", "start": 92108900, "end": 92110558}, {"filename": "/vendored/lygia/math/map.msl", "start": 92110558, "end": 92112086}, {"filename": "/vendored/lygia/math/map.wesl", "start": 92112086, "end": 92112949}, {"filename": "/vendored/lygia/math/map.wgsl", "start": 92112949, "end": 92113812}, {"filename": "/vendored/lygia/math/max.cuh", "start": 92113812, "end": 92115629}, {"filename": "/vendored/lygia/math/min.cuh", "start": 92115629, "end": 92117439}, {"filename": "/vendored/lygia/math/mirror.cuh", "start": 92117439, "end": 92118143}, {"filename": "/vendored/lygia/math/mirror.glsl", "start": 92118143, "end": 92118823}, {"filename": "/vendored/lygia/math/mirror.hlsl", "start": 92118823, "end": 92119428}, {"filename": "/vendored/lygia/math/mirror.msl", "start": 92119428, "end": 92120133}, {"filename": "/vendored/lygia/math/mirror.wesl", "start": 92120133, "end": 92120612}, {"filename": "/vendored/lygia/math/mirror.wgsl", "start": 92120612, "end": 92121091}, {"filename": "/vendored/lygia/math/mix.cuh", "start": 92121091, "end": 92122430}, {"filename": "/vendored/lygia/math/mix.hlsl", "start": 92122430, "end": 92124800}, {"filename": "/vendored/lygia/math/mmax.cuh", "start": 92124800, "end": 92125864}, {"filename": "/vendored/lygia/math/mmax.glsl", "start": 92125864, "end": 92126756}, {"filename": "/vendored/lygia/math/mmax.hlsl", "start": 92126756, "end": 92127667}, {"filename": "/vendored/lygia/math/mmax.msl", "start": 92127667, "end": 92128550}, {"filename": "/vendored/lygia/math/mmax.wesl", "start": 92128550, "end": 92129053}, {"filename": "/vendored/lygia/math/mmax.wgsl", "start": 92129053, "end": 92129556}, {"filename": "/vendored/lygia/math/mmin.cuh", "start": 92129556, "end": 92130586}, {"filename": "/vendored/lygia/math/mmin.glsl", "start": 92130586, "end": 92131491}, {"filename": "/vendored/lygia/math/mmin.hlsl", "start": 92131491, "end": 92132401}, {"filename": "/vendored/lygia/math/mmin.msl", "start": 92132401, "end": 92133288}, {"filename": "/vendored/lygia/math/mmin.wesl", "start": 92133288, "end": 92133791}, {"filename": "/vendored/lygia/math/mmin.wgsl", "start": 92133791, "end": 92134294}, {"filename": "/vendored/lygia/math/mmix.glsl", "start": 92134294, "end": 92138798}, {"filename": "/vendored/lygia/math/mmix.msl", "start": 92138798, "end": 92143314}, {"filename": "/vendored/lygia/math/mod.cuh", "start": 92143314, "end": 92144895}, {"filename": "/vendored/lygia/math/mod.hlsl", "start": 92144895, "end": 92145695}, {"filename": "/vendored/lygia/math/mod.msl", "start": 92145695, "end": 92146840}, {"filename": "/vendored/lygia/math/mod.wesl", "start": 92146840, "end": 92147384}, {"filename": "/vendored/lygia/math/mod.wgsl", "start": 92147384, "end": 92147928}, {"filename": "/vendored/lygia/math/mod2.glsl", "start": 92147928, "end": 92148437}, {"filename": "/vendored/lygia/math/mod2.hlsl", "start": 92148437, "end": 92148995}, {"filename": "/vendored/lygia/math/mod2.msl", "start": 92148995, "end": 92149545}, {"filename": "/vendored/lygia/math/mod289.cuh", "start": 92149545, "end": 92150224}, {"filename": "/vendored/lygia/math/mod289.glsl", "start": 92150224, "end": 92150714}, {"filename": "/vendored/lygia/math/mod289.hlsl", "start": 92150714, "end": 92151204}, {"filename": "/vendored/lygia/math/mod289.msl", "start": 92151204, "end": 92151706}, {"filename": "/vendored/lygia/math/mod289.wesl", "start": 92151706, "end": 92152088}, {"filename": "/vendored/lygia/math/mod289.wgsl", "start": 92152088, "end": 92152470}, {"filename": "/vendored/lygia/math/modi.glsl", "start": 92152470, "end": 92152810}, {"filename": "/vendored/lygia/math/normalize.cuh", "start": 92152810, "end": 92153827}, {"filename": "/vendored/lygia/math/notEqual.msl", "start": 92153827, "end": 92154458}, {"filename": "/vendored/lygia/math/nyquist.glsl", "start": 92154458, "end": 92155184}, {"filename": "/vendored/lygia/math/nyquist.hlsl", "start": 92155184, "end": 92155911}, {"filename": "/vendored/lygia/math/operations.cuh", "start": 92155911, "end": 92179396}, {"filename": "/vendored/lygia/math/pack.glsl", "start": 92179396, "end": 92180224}, {"filename": "/vendored/lygia/math/pack.hlsl", "start": 92180224, "end": 92181102}, {"filename": "/vendored/lygia/math/pack.msl", "start": 92181102, "end": 92181957}, {"filename": "/vendored/lygia/math/pack.wesl", "start": 92181957, "end": 92182647}, {"filename": "/vendored/lygia/math/pack.wgsl", "start": 92182647, "end": 92183337}, {"filename": "/vendored/lygia/math/parabola.cuh", "start": 92183337, "end": 92183836}, {"filename": "/vendored/lygia/math/parabola.glsl", "start": 92183836, "end": 92184406}, {"filename": "/vendored/lygia/math/parabola.hlsl", "start": 92184406, "end": 92184848}, {"filename": "/vendored/lygia/math/parabola.msl", "start": 92184848, "end": 92185412}, {"filename": "/vendored/lygia/math/parabola.wesl", "start": 92185412, "end": 92185761}, {"filename": "/vendored/lygia/math/parabola.wgsl", "start": 92185761, "end": 92186110}, {"filename": "/vendored/lygia/math/permute.cuh", "start": 92186110, "end": 92186736}, {"filename": "/vendored/lygia/math/permute.glsl", "start": 92186736, "end": 92187349}, {"filename": "/vendored/lygia/math/permute.hlsl", "start": 92187349, "end": 92187851}, {"filename": "/vendored/lygia/math/permute.msl", "start": 92187851, "end": 92188475}, {"filename": "/vendored/lygia/math/permute.wesl", "start": 92188475, "end": 92188914}, {"filename": "/vendored/lygia/math/permute.wgsl", "start": 92188914, "end": 92189308}, {"filename": "/vendored/lygia/math/pow.cuh", "start": 92189308, "end": 92190579}, {"filename": "/vendored/lygia/math/pow2.cuh", "start": 92190579, "end": 92191302}, {"filename": "/vendored/lygia/math/pow2.glsl", "start": 92191302, "end": 92191880}, {"filename": "/vendored/lygia/math/pow2.hlsl", "start": 92191880, "end": 92192459}, {"filename": "/vendored/lygia/math/pow2.msl", "start": 92192459, "end": 92193049}, {"filename": "/vendored/lygia/math/pow3.cuh", "start": 92193049, "end": 92193787}, {"filename": "/vendored/lygia/math/pow3.glsl", "start": 92193787, "end": 92194381}, {"filename": "/vendored/lygia/math/pow3.hlsl", "start": 92194381, "end": 92194975}, {"filename": "/vendored/lygia/math/pow3.msl", "start": 92194975, "end": 92195581}, {"filename": "/vendored/lygia/math/pow5.cuh", "start": 92195581, "end": 92196437}, {"filename": "/vendored/lygia/math/pow5.glsl", "start": 92196437, "end": 92197143}, {"filename": "/vendored/lygia/math/pow5.hlsl", "start": 92197143, "end": 92197855}, {"filename": "/vendored/lygia/math/pow5.msl", "start": 92197855, "end": 92198579}, {"filename": "/vendored/lygia/math/pow7.cuh", "start": 92198579, "end": 92199381}, {"filename": "/vendored/lygia/math/pow7.glsl", "start": 92199381, "end": 92200039}, {"filename": "/vendored/lygia/math/pow7.hlsl", "start": 92200039, "end": 92200697}, {"filename": "/vendored/lygia/math/pow7.msl", "start": 92200697, "end": 92201367}, {"filename": "/vendored/lygia/math/powFast.cuh", "start": 92201367, "end": 92201894}, {"filename": "/vendored/lygia/math/powFast.glsl", "start": 92201894, "end": 92202383}, {"filename": "/vendored/lygia/math/powFast.hlsl", "start": 92202383, "end": 92202872}, {"filename": "/vendored/lygia/math/powFast.msl", "start": 92202872, "end": 92203355}, {"filename": "/vendored/lygia/math/powFast.wesl", "start": 92203355, "end": 92203966}, {"filename": "/vendored/lygia/math/powFast.wgsl", "start": 92203966, "end": 92204577}, {"filename": "/vendored/lygia/math/quartic.cuh", "start": 92204577, "end": 92205187}, {"filename": "/vendored/lygia/math/quartic.glsl", "start": 92205187, "end": 92205757}, {"filename": "/vendored/lygia/math/quartic.hlsl", "start": 92205757, "end": 92206243}, {"filename": "/vendored/lygia/math/quartic.msl", "start": 92206243, "end": 92206825}, {"filename": "/vendored/lygia/math/quartic.wesl", "start": 92206825, "end": 92207158}, {"filename": "/vendored/lygia/math/quartic.wgsl", "start": 92207158, "end": 92207491}, {"filename": "/vendored/lygia/math/quat.glsl", "start": 92207491, "end": 92209687}, {"filename": "/vendored/lygia/math/quat.hlsl", "start": 92209687, "end": 92211901}, {"filename": "/vendored/lygia/math/quat.msl", "start": 92211901, "end": 92214113}, {"filename": "/vendored/lygia/math/quat.wesl", "start": 92214113, "end": 92216062}, {"filename": "/vendored/lygia/math/quat.wgsl", "start": 92216062, "end": 92218067}, {"filename": "/vendored/lygia/math/quat/2mat3.glsl", "start": 92218067, "end": 92219030}, {"filename": "/vendored/lygia/math/quat/2mat3.hlsl", "start": 92219030, "end": 92220007}, {"filename": "/vendored/lygia/math/quat/2mat3.msl", "start": 92220007, "end": 92220975}, {"filename": "/vendored/lygia/math/quat/2mat3.wgsl", "start": 92220975, "end": 92221871}, {"filename": "/vendored/lygia/math/quat/2mat4.glsl", "start": 92221871, "end": 92222413}, {"filename": "/vendored/lygia/math/quat/2mat4.hlsl", "start": 92222413, "end": 92222959}, {"filename": "/vendored/lygia/math/quat/2mat4.msl", "start": 92222959, "end": 92223498}, {"filename": "/vendored/lygia/math/quat/2mat4.wgsl", "start": 92223498, "end": 92223985}, {"filename": "/vendored/lygia/math/quat/add.glsl", "start": 92223985, "end": 92224473}, {"filename": "/vendored/lygia/math/quat/add.hlsl", "start": 92224473, "end": 92224961}, {"filename": "/vendored/lygia/math/quat/add.msl", "start": 92224961, "end": 92225448}, {"filename": "/vendored/lygia/math/quat/add.wgsl", "start": 92225448, "end": 92225880}, {"filename": "/vendored/lygia/math/quat/conj.glsl", "start": 92225880, "end": 92226358}, {"filename": "/vendored/lygia/math/quat/conj.hlsl", "start": 92226358, "end": 92226836}, {"filename": "/vendored/lygia/math/quat/conj.msl", "start": 92226836, "end": 92227313}, {"filename": "/vendored/lygia/math/quat/conj.wgsl", "start": 92227313, "end": 92227730}, {"filename": "/vendored/lygia/math/quat/div.glsl", "start": 92227730, "end": 92228213}, {"filename": "/vendored/lygia/math/quat/div.hlsl", "start": 92228213, "end": 92228696}, {"filename": "/vendored/lygia/math/quat/div.msl", "start": 92228696, "end": 92229178}, {"filename": "/vendored/lygia/math/quat/div.wgsl", "start": 92229178, "end": 92229602}, {"filename": "/vendored/lygia/math/quat/identity.glsl", "start": 92229602, "end": 92230040}, {"filename": "/vendored/lygia/math/quat/identity.hlsl", "start": 92230040, "end": 92230478}, {"filename": "/vendored/lygia/math/quat/identity.msl", "start": 92230478, "end": 92230915}, {"filename": "/vendored/lygia/math/quat/identity.wgsl", "start": 92230915, "end": 92231304}, {"filename": "/vendored/lygia/math/quat/inverse.glsl", "start": 92231304, "end": 92231847}, {"filename": "/vendored/lygia/math/quat/inverse.hlsl", "start": 92231847, "end": 92232390}, {"filename": "/vendored/lygia/math/quat/inverse.msl", "start": 92232390, "end": 92232930}, {"filename": "/vendored/lygia/math/quat/inverse.wgsl", "start": 92232930, "end": 92233427}, {"filename": "/vendored/lygia/math/quat/length.glsl", "start": 92233427, "end": 92233917}, {"filename": "/vendored/lygia/math/quat/length.hlsl", "start": 92233917, "end": 92234407}, {"filename": "/vendored/lygia/math/quat/length.msl", "start": 92234407, "end": 92234896}, {"filename": "/vendored/lygia/math/quat/length.wgsl", "start": 92234896, "end": 92235339}, {"filename": "/vendored/lygia/math/quat/lengthSq.glsl", "start": 92235339, "end": 92235850}, {"filename": "/vendored/lygia/math/quat/lengthSq.hlsl", "start": 92235850, "end": 92236361}, {"filename": "/vendored/lygia/math/quat/lengthSq.msl", "start": 92236361, "end": 92236871}, {"filename": "/vendored/lygia/math/quat/lengthSq.wgsl", "start": 92236871, "end": 92237309}, {"filename": "/vendored/lygia/math/quat/lerp.glsl", "start": 92237309, "end": 92239147}, {"filename": "/vendored/lygia/math/quat/lerp.hlsl", "start": 92239147, "end": 92240985}, {"filename": "/vendored/lygia/math/quat/lerp.msl", "start": 92240985, "end": 92242823}, {"filename": "/vendored/lygia/math/quat/lerp.wgsl", "start": 92242823, "end": 92244585}, {"filename": "/vendored/lygia/math/quat/mul.glsl", "start": 92244585, "end": 92245291}, {"filename": "/vendored/lygia/math/quat/mul.hlsl", "start": 92245291, "end": 92245997}, {"filename": "/vendored/lygia/math/quat/mul.msl", "start": 92245997, "end": 92246702}, {"filename": "/vendored/lygia/math/quat/mul.wgsl", "start": 92246702, "end": 92247277}, {"filename": "/vendored/lygia/math/quat/neg.glsl", "start": 92247277, "end": 92247736}, {"filename": "/vendored/lygia/math/quat/neg.hlsl", "start": 92247736, "end": 92248195}, {"filename": "/vendored/lygia/math/quat/neg.msl", "start": 92248195, "end": 92248653}, {"filename": "/vendored/lygia/math/quat/neg.wgsl", "start": 92248653, "end": 92249053}, {"filename": "/vendored/lygia/math/quat/norm.glsl", "start": 92249053, "end": 92249551}, {"filename": "/vendored/lygia/math/quat/norm.hlsl", "start": 92249551, "end": 92250049}, {"filename": "/vendored/lygia/math/quat/norm.msl", "start": 92250049, "end": 92250545}, {"filename": "/vendored/lygia/math/quat/norm.wgsl", "start": 92250545, "end": 92251004}, {"filename": "/vendored/lygia/math/quat/sub.glsl", "start": 92251004, "end": 92251496}, {"filename": "/vendored/lygia/math/quat/sub.hlsl", "start": 92251496, "end": 92251988}, {"filename": "/vendored/lygia/math/quat/sub.msl", "start": 92251988, "end": 92252479}, {"filename": "/vendored/lygia/math/quat/sub.wgsl", "start": 92252479, "end": 92252915}, {"filename": "/vendored/lygia/math/quat/type.glsl", "start": 92252915, "end": 92253251}, {"filename": "/vendored/lygia/math/quat/type.hlsl", "start": 92253251, "end": 92253589}, {"filename": "/vendored/lygia/math/quat/type.msl", "start": 92253589, "end": 92253928}, {"filename": "/vendored/lygia/math/quintic.cuh", "start": 92253928, "end": 92254603}, {"filename": "/vendored/lygia/math/quintic.glsl", "start": 92254603, "end": 92255229}, {"filename": "/vendored/lygia/math/quintic.hlsl", "start": 92255229, "end": 92255772}, {"filename": "/vendored/lygia/math/quintic.msl", "start": 92255772, "end": 92256410}, {"filename": "/vendored/lygia/math/quintic.wesl", "start": 92256410, "end": 92256800}, {"filename": "/vendored/lygia/math/quintic.wgsl", "start": 92256800, "end": 92257190}, {"filename": "/vendored/lygia/math/radians.msl", "start": 92257190, "end": 92257666}, {"filename": "/vendored/lygia/math/reflect.cuh", "start": 92257666, "end": 92258303}, {"filename": "/vendored/lygia/math/rotate2d.glsl", "start": 92258303, "end": 92258812}, {"filename": "/vendored/lygia/math/rotate2d.hlsl", "start": 92258812, "end": 92259333}, {"filename": "/vendored/lygia/math/rotate2d.msl", "start": 92259333, "end": 92259884}, {"filename": "/vendored/lygia/math/rotate2d.wesl", "start": 92259884, "end": 92260331}, {"filename": "/vendored/lygia/math/rotate2d.wgsl", "start": 92260331, "end": 92260778}, {"filename": "/vendored/lygia/math/rotate3d.glsl", "start": 92260778, "end": 92261645}, {"filename": "/vendored/lygia/math/rotate3d.hlsl", "start": 92261645, "end": 92262603}, {"filename": "/vendored/lygia/math/rotate3d.msl", "start": 92262603, "end": 92263486}, {"filename": "/vendored/lygia/math/rotate3d.wesl", "start": 92263486, "end": 92264224}, {"filename": "/vendored/lygia/math/rotate3d.wgsl", "start": 92264224, "end": 92264961}, {"filename": "/vendored/lygia/math/rotate3dX.glsl", "start": 92264961, "end": 92265543}, {"filename": "/vendored/lygia/math/rotate3dX.hlsl", "start": 92265543, "end": 92266151}, {"filename": "/vendored/lygia/math/rotate3dX.msl", "start": 92266151, "end": 92266757}, {"filename": "/vendored/lygia/math/rotate3dX.wesl", "start": 92266757, "end": 92267262}, {"filename": "/vendored/lygia/math/rotate3dX.wgsl", "start": 92267262, "end": 92267767}, {"filename": "/vendored/lygia/math/rotate3dY.glsl", "start": 92267767, "end": 92268344}, {"filename": "/vendored/lygia/math/rotate3dY.hlsl", "start": 92268344, "end": 92268947}, {"filename": "/vendored/lygia/math/rotate3dY.msl", "start": 92268947, "end": 92269568}, {"filename": "/vendored/lygia/math/rotate3dY.wesl", "start": 92269568, "end": 92270075}, {"filename": "/vendored/lygia/math/rotate3dY.wgsl", "start": 92270075, "end": 92270582}, {"filename": "/vendored/lygia/math/rotate3dZ.glsl", "start": 92270582, "end": 92271159}, {"filename": "/vendored/lygia/math/rotate3dZ.hlsl", "start": 92271159, "end": 92271762}, {"filename": "/vendored/lygia/math/rotate3dZ.msl", "start": 92271762, "end": 92272363}, {"filename": "/vendored/lygia/math/rotate3dZ.wesl", "start": 92272363, "end": 92272868}, {"filename": "/vendored/lygia/math/rotate3dZ.wgsl", "start": 92272868, "end": 92273373}, {"filename": "/vendored/lygia/math/rotate4d.glsl", "start": 92273373, "end": 92274303}, {"filename": "/vendored/lygia/math/rotate4d.hlsl", "start": 92274303, "end": 92275425}, {"filename": "/vendored/lygia/math/rotate4d.msl", "start": 92275425, "end": 92276439}, {"filename": "/vendored/lygia/math/rotate4d.wesl", "start": 92276439, "end": 92277316}, {"filename": "/vendored/lygia/math/rotate4d.wgsl", "start": 92277316, "end": 92278193}, {"filename": "/vendored/lygia/math/rotate4dX.glsl", "start": 92278193, "end": 92278813}, {"filename": "/vendored/lygia/math/rotate4dX.hlsl", "start": 92278813, "end": 92279465}, {"filename": "/vendored/lygia/math/rotate4dX.msl", "start": 92279465, "end": 92280111}, {"filename": "/vendored/lygia/math/rotate4dX.wesl", "start": 92280111, "end": 92280657}, {"filename": "/vendored/lygia/math/rotate4dX.wgsl", "start": 92280657, "end": 92281203}, {"filename": "/vendored/lygia/math/rotate4dY.glsl", "start": 92281203, "end": 92281817}, {"filename": "/vendored/lygia/math/rotate4dY.hlsl", "start": 92281817, "end": 92282463}, {"filename": "/vendored/lygia/math/rotate4dY.msl", "start": 92282463, "end": 92283103}, {"filename": "/vendored/lygia/math/rotate4dY.wesl", "start": 92283103, "end": 92283648}, {"filename": "/vendored/lygia/math/rotate4dY.wgsl", "start": 92283648, "end": 92284193}, {"filename": "/vendored/lygia/math/rotate4dZ.glsl", "start": 92284193, "end": 92284827}, {"filename": "/vendored/lygia/math/rotate4dZ.hlsl", "start": 92284827, "end": 92285473}, {"filename": "/vendored/lygia/math/rotate4dZ.msl", "start": 92285473, "end": 92286113}, {"filename": "/vendored/lygia/math/rotate4dZ.wesl", "start": 92286113, "end": 92286659}, {"filename": "/vendored/lygia/math/rotate4dZ.wgsl", "start": 92286659, "end": 92287205}, {"filename": "/vendored/lygia/math/round.glsl", "start": 92287205, "end": 92287861}, {"filename": "/vendored/lygia/math/round.msl", "start": 92287861, "end": 92288541}, {"filename": "/vendored/lygia/math/round.wesl", "start": 92288541, "end": 92289124}, {"filename": "/vendored/lygia/math/round.wgsl", "start": 92289124, "end": 92289707}, {"filename": "/vendored/lygia/math/saturate.cuh", "start": 92289707, "end": 92290533}, {"filename": "/vendored/lygia/math/saturate.glsl", "start": 92290533, "end": 92291141}, {"filename": "/vendored/lygia/math/saturate.msl", "start": 92291141, "end": 92291535}, {"filename": "/vendored/lygia/math/saturate.msl 2", "start": 92291535, "end": 92292155}, {"filename": "/vendored/lygia/math/saturateMediump.cuh", "start": 92292155, "end": 92292917}, {"filename": "/vendored/lygia/math/saturateMediump.glsl", "start": 92292917, "end": 92293660}, {"filename": "/vendored/lygia/math/saturateMediump.hlsl", "start": 92293660, "end": 92294415}, {"filename": "/vendored/lygia/math/saturateMediump.msl", "start": 92294415, "end": 92295170}, {"filename": "/vendored/lygia/math/scale2d.glsl", "start": 92295170, "end": 92295775}, {"filename": "/vendored/lygia/math/scale2d.hlsl", "start": 92295775, "end": 92296416}, {"filename": "/vendored/lygia/math/scale2d.msl", "start": 92296416, "end": 92297145}, {"filename": "/vendored/lygia/math/scale2d.wesl", "start": 92297145, "end": 92297535}, {"filename": "/vendored/lygia/math/scale2d.wgsl", "start": 92297535, "end": 92297925}, {"filename": "/vendored/lygia/math/scale3d.glsl", "start": 92297925, "end": 92298738}, {"filename": "/vendored/lygia/math/scale3d.hlsl", "start": 92298738, "end": 92299611}, {"filename": "/vendored/lygia/math/scale3d.msl", "start": 92299611, "end": 92300548}, {"filename": "/vendored/lygia/math/scale3d.wesl", "start": 92300548, "end": 92301017}, {"filename": "/vendored/lygia/math/scale3d.wgsl", "start": 92301017, "end": 92301486}, {"filename": "/vendored/lygia/math/scale4d.glsl", "start": 92301486, "end": 92302837}, {"filename": "/vendored/lygia/math/scale4d.hlsl", "start": 92302837, "end": 92304244}, {"filename": "/vendored/lygia/math/scale4d.msl", "start": 92304244, "end": 92305783}, {"filename": "/vendored/lygia/math/scale4d.wesl", "start": 92305783, "end": 92306310}, {"filename": "/vendored/lygia/math/scale4d.wgsl", "start": 92306310, "end": 92306837}, {"filename": "/vendored/lygia/math/select.glsl", "start": 92306837, "end": 92307692}, {"filename": "/vendored/lygia/math/select.hlsl", "start": 92307692, "end": 92308583}, {"filename": "/vendored/lygia/math/select.msl", "start": 92308583, "end": 92309471}, {"filename": "/vendored/lygia/math/sign.cuh", "start": 92309471, "end": 92310037}, {"filename": "/vendored/lygia/math/sin.cuh", "start": 92310037, "end": 92310865}, {"filename": "/vendored/lygia/math/smootherstep.cuh", "start": 92310865, "end": 92312090}, {"filename": "/vendored/lygia/math/smootherstep.glsl", "start": 92312090, "end": 92313020}, {"filename": "/vendored/lygia/math/smootherstep.hlsl", "start": 92313020, "end": 92314041}, {"filename": "/vendored/lygia/math/smootherstep.msl", "start": 92314041, "end": 92315017}, {"filename": "/vendored/lygia/math/smootherstep.wesl", "start": 92315017, "end": 92315821}, {"filename": "/vendored/lygia/math/smootherstep.wgsl", "start": 92315821, "end": 92316601}, {"filename": "/vendored/lygia/math/smoothstep.cuh", "start": 92316601, "end": 92318097}, {"filename": "/vendored/lygia/math/sqrt.cuh", "start": 92318097, "end": 92318966}, {"filename": "/vendored/lygia/math/step.cuh", "start": 92318966, "end": 92320609}, {"filename": "/vendored/lygia/math/sum.cuh", "start": 92320609, "end": 92321867}, {"filename": "/vendored/lygia/math/sum.glsl", "start": 92321867, "end": 92322422}, {"filename": "/vendored/lygia/math/sum.hlsl", "start": 92322422, "end": 92322989}, {"filename": "/vendored/lygia/math/sum.msl", "start": 92322989, "end": 92323556}, {"filename": "/vendored/lygia/math/sum.wesl", "start": 92323556, "end": 92324052}, {"filename": "/vendored/lygia/math/sum.wgsl", "start": 92324052, "end": 92324548}, {"filename": "/vendored/lygia/math/taylorInvSqrt.cuh", "start": 92324548, "end": 92325282}, {"filename": "/vendored/lygia/math/taylorInvSqrt.glsl", "start": 92325282, "end": 92325840}, {"filename": "/vendored/lygia/math/taylorInvSqrt.hlsl", "start": 92325840, "end": 92326422}, {"filename": "/vendored/lygia/math/taylorInvSqrt.msl", "start": 92326422, "end": 92326992}, {"filename": "/vendored/lygia/math/taylorInvSqrt.wesl", "start": 92326992, "end": 92327445}, {"filename": "/vendored/lygia/math/taylorInvSqrt.wgsl", "start": 92327445, "end": 92327898}, {"filename": "/vendored/lygia/math/toMat3.glsl", "start": 92327898, "end": 92328419}, {"filename": "/vendored/lygia/math/toMat4.glsl", "start": 92328419, "end": 92328971}, {"filename": "/vendored/lygia/math/toMat4.hlsl", "start": 92328971, "end": 92329563}, {"filename": "/vendored/lygia/math/toMat4.msl", "start": 92329563, "end": 92330213}, {"filename": "/vendored/lygia/math/toMat4.wesl", "start": 92330213, "end": 92330748}, {"filename": "/vendored/lygia/math/toMat4.wgsl", "start": 92330748, "end": 92331283}, {"filename": "/vendored/lygia/math/translate4d.glsl", "start": 92331283, "end": 92332096}, {"filename": "/vendored/lygia/math/translate4d.hlsl", "start": 92332096, "end": 92332960}, {"filename": "/vendored/lygia/math/translate4d.msl", "start": 92332960, "end": 92333867}, {"filename": "/vendored/lygia/math/translate4d.wesl", "start": 92333867, "end": 92334403}, {"filename": "/vendored/lygia/math/translate4d.wgsl", "start": 92334403, "end": 92334939}, {"filename": "/vendored/lygia/math/transpose.glsl", "start": 92334939, "end": 92335588}, {"filename": "/vendored/lygia/math/unpack.cuh", "start": 92335588, "end": 92337581}, {"filename": "/vendored/lygia/math/unpack.glsl", "start": 92337581, "end": 92339717}, {"filename": "/vendored/lygia/math/unpack.hlsl", "start": 92339717, "end": 92341947}, {"filename": "/vendored/lygia/math/unpack.msl", "start": 92341947, "end": 92344134}, {"filename": "/vendored/lygia/math/unpack.wesl", "start": 92344134, "end": 92346082}, {"filename": "/vendored/lygia/math/unpack.wgsl", "start": 92346082, "end": 92348024}, {"filename": "/vendored/lygia/math/within.cuh", "start": 92348024, "end": 92349346}, {"filename": "/vendored/lygia/math/within.glsl", "start": 92349346, "end": 92350408}, {"filename": "/vendored/lygia/math/within.hlsl", "start": 92350408, "end": 92351541}, {"filename": "/vendored/lygia/math/within.msl", "start": 92351541, "end": 92352603}, {"filename": "/vendored/lygia/math/within.wesl", "start": 92352603, "end": 92353524}, {"filename": "/vendored/lygia/math/within.wgsl", "start": 92353524, "end": 92354445}, {"filename": "/vendored/lygia/morphological/alphaFill.glsl", "start": 92354445, "end": 92356101}, {"filename": "/vendored/lygia/morphological/alphaFill.hlsl", "start": 92356101, "end": 92357404}, {"filename": "/vendored/lygia/morphological/alphaHashing.glsl", "start": 92357404, "end": 92359296}, {"filename": "/vendored/lygia/morphological/dilation.glsl", "start": 92359296, "end": 92360962}, {"filename": "/vendored/lygia/morphological/dilation.hlsl", "start": 92360962, "end": 92362283}, {"filename": "/vendored/lygia/morphological/erosion.glsl", "start": 92362283, "end": 92363685}, {"filename": "/vendored/lygia/morphological/erosion.hlsl", "start": 92363685, "end": 92364994}, {"filename": "/vendored/lygia/morphological/jumpFlood.glsl", "start": 92364994, "end": 92368234}, {"filename": "/vendored/lygia/morphological/marchingSquares.glsl", "start": 92368234, "end": 92377119}, {"filename": "/vendored/lygia/morphological/pyramid.glsl", "start": 92377119, "end": 92378453}, {"filename": "/vendored/lygia/morphological/pyramid/downscale.glsl", "start": 92378453, "end": 92380302}, {"filename": "/vendored/lygia/morphological/pyramid/upscale.glsl", "start": 92380302, "end": 92382916}, {"filename": "/vendored/lygia/package.json", "start": 92382916, "end": 92384991}, {"filename": "/vendored/lygia/pnpm-lock.yaml", "start": 92384991, "end": 92450166}, {"filename": "/vendored/lygia/prune.py", "start": 92450166, "end": 92451717}, {"filename": "/vendored/lygia/sample.glsl", "start": 92451717, "end": 92452709}, {"filename": "/vendored/lygia/sample.hlsl", "start": 92452709, "end": 92453701}, {"filename": "/vendored/lygia/sample/2DCube.glsl", "start": 92453701, "end": 92455928}, {"filename": "/vendored/lygia/sample/2DCube.hlsl", "start": 92455928, "end": 92458083}, {"filename": "/vendored/lygia/sample/3DSdf.glsl", "start": 92458083, "end": 92459460}, {"filename": "/vendored/lygia/sample/3DSdf.hlsl", "start": 92459460, "end": 92460853}, {"filename": "/vendored/lygia/sample/bicubic.glsl", "start": 92460853, "end": 92462489}, {"filename": "/vendored/lygia/sample/bicubic.hlsl", "start": 92462489, "end": 92464135}, {"filename": "/vendored/lygia/sample/bracketing.glsl", "start": 92464135, "end": 92466273}, {"filename": "/vendored/lygia/sample/bracketing.hlsl", "start": 92466273, "end": 92468411}, {"filename": "/vendored/lygia/sample/bumpMap.glsl", "start": 92468411, "end": 92469207}, {"filename": "/vendored/lygia/sample/bumpMap.hlsl", "start": 92469207, "end": 92470028}, {"filename": "/vendored/lygia/sample/clamp2edge.glsl", "start": 92470028, "end": 92470988}, {"filename": "/vendored/lygia/sample/clamp2edge.hlsl", "start": 92470988, "end": 92471840}, {"filename": "/vendored/lygia/sample/clamp2edge.msl", "start": 92471840, "end": 92472829}, {"filename": "/vendored/lygia/sample/derivative.glsl", "start": 92472829, "end": 92474792}, {"filename": "/vendored/lygia/sample/derivative.hlsl", "start": 92474792, "end": 92476783}, {"filename": "/vendored/lygia/sample/dither.glsl", "start": 92476783, "end": 92477881}, {"filename": "/vendored/lygia/sample/dof.glsl", "start": 92477881, "end": 92481871}, {"filename": "/vendored/lygia/sample/dof.hlsl", "start": 92481871, "end": 92485995}, {"filename": "/vendored/lygia/sample/equirect.glsl", "start": 92485995, "end": 92488135}, {"filename": "/vendored/lygia/sample/equirect.hlsl", "start": 92488135, "end": 92489952}, {"filename": "/vendored/lygia/sample/flow.glsl", "start": 92489952, "end": 92491120}, {"filename": "/vendored/lygia/sample/flow.hlsl", "start": 92491120, "end": 92492331}, {"filename": "/vendored/lygia/sample/fxaa.glsl", "start": 92492331, "end": 92495406}, {"filename": "/vendored/lygia/sample/fxaa.hlsl", "start": 92495406, "end": 92498466}, {"filename": "/vendored/lygia/sample/heatmap.glsl", "start": 92498466, "end": 92499417}, {"filename": "/vendored/lygia/sample/heatmap.hlsl", "start": 92499417, "end": 92500368}, {"filename": "/vendored/lygia/sample/hue.glsl", "start": 92500368, "end": 92501122}, {"filename": "/vendored/lygia/sample/hue.hlsl", "start": 92501122, "end": 92501880}, {"filename": "/vendored/lygia/sample/mirror.glsl", "start": 92501880, "end": 92502546}, {"filename": "/vendored/lygia/sample/mirror.hlsl", "start": 92502546, "end": 92503171}, {"filename": "/vendored/lygia/sample/nearest.glsl", "start": 92503171, "end": 92503893}, {"filename": "/vendored/lygia/sample/nearest.hlsl", "start": 92503893, "end": 92504575}, {"filename": "/vendored/lygia/sample/normalFromHeightMap.glsl", "start": 92504575, "end": 92505650}, {"filename": "/vendored/lygia/sample/normalFromHeightMap.hlsl", "start": 92505650, "end": 92506747}, {"filename": "/vendored/lygia/sample/normalMap.glsl", "start": 92506747, "end": 92507435}, {"filename": "/vendored/lygia/sample/normalMap.hlsl", "start": 92507435, "end": 92508129}, {"filename": "/vendored/lygia/sample/opticalFlow.glsl", "start": 92508129, "end": 92509338}, {"filename": "/vendored/lygia/sample/opticalFlow.hlsl", "start": 92509338, "end": 92510565}, {"filename": "/vendored/lygia/sample/quilt.glsl", "start": 92510565, "end": 92512716}, {"filename": "/vendored/lygia/sample/quilt.hlsl", "start": 92512716, "end": 92514874}, {"filename": "/vendored/lygia/sample/repeat.glsl", "start": 92514874, "end": 92515459}, {"filename": "/vendored/lygia/sample/repeat.hlsl", "start": 92515459, "end": 92516051}, {"filename": "/vendored/lygia/sample/shadow.glsl", "start": 92516051, "end": 92517354}, {"filename": "/vendored/lygia/sample/shadow.hlsl", "start": 92517354, "end": 92518581}, {"filename": "/vendored/lygia/sample/shadowLerp.glsl", "start": 92518581, "end": 92519716}, {"filename": "/vendored/lygia/sample/shadowLerp.hlsl", "start": 92519716, "end": 92520869}, {"filename": "/vendored/lygia/sample/shadowPCF.glsl", "start": 92520869, "end": 92521925}, {"filename": "/vendored/lygia/sample/shadowPCF.hlsl", "start": 92521925, "end": 92522995}, {"filename": "/vendored/lygia/sample/smooth.glsl", "start": 92522995, "end": 92523878}, {"filename": "/vendored/lygia/sample/smooth.hlsl", "start": 92523878, "end": 92524721}, {"filename": "/vendored/lygia/sample/sprite.glsl", "start": 92524721, "end": 92525682}, {"filename": "/vendored/lygia/sample/sprite.hlsl", "start": 92525682, "end": 92526655}, {"filename": "/vendored/lygia/sample/sprite.wgsl", "start": 92526655, "end": 92527269}, {"filename": "/vendored/lygia/sample/triplanar.glsl", "start": 92527269, "end": 92528970}, {"filename": "/vendored/lygia/sample/triplanar.hlsl", "start": 92528970, "end": 92530690}, {"filename": "/vendored/lygia/sample/untile.glsl", "start": 92530690, "end": 92533668}, {"filename": "/vendored/lygia/sample/untile.hlsl", "start": 92533668, "end": 92535596}, {"filename": "/vendored/lygia/sample/viewPosition.glsl", "start": 92535596, "end": 92537313}, {"filename": "/vendored/lygia/sample/viewPosition.hlsl", "start": 92537313, "end": 92539053}, {"filename": "/vendored/lygia/sample/yuv.glsl", "start": 92539053, "end": 92539896}, {"filename": "/vendored/lygia/sample/yuv.hlsl", "start": 92539896, "end": 92540765}, {"filename": "/vendored/lygia/sample/zero.glsl", "start": 92540765, "end": 92542293}, {"filename": "/vendored/lygia/sample/zero.hlsl", "start": 92542293, "end": 92543002}, {"filename": "/vendored/lygia/sampler.glsl", "start": 92543002, "end": 92543594}, {"filename": "/vendored/lygia/sampler.hlsl", "start": 92543594, "end": 92544929}, {"filename": "/vendored/lygia/sampler.msl", "start": 92544929, "end": 92545556}, {"filename": "/vendored/lygia/sdf.glsl", "start": 92545556, "end": 92546836}, {"filename": "/vendored/lygia/sdf.hlsl", "start": 92546836, "end": 92548087}, {"filename": "/vendored/lygia/sdf.msl", "start": 92548087, "end": 92549326}, {"filename": "/vendored/lygia/sdf/arrowSDF.glsl", "start": 92549326, "end": 92551080}, {"filename": "/vendored/lygia/sdf/arrowSDF.msl", "start": 92551080, "end": 92552882}, {"filename": "/vendored/lygia/sdf/boxFrameSDF.glsl", "start": 92552882, "end": 92553425}, {"filename": "/vendored/lygia/sdf/boxFrameSDF.hlsl", "start": 92553425, "end": 92553984}, {"filename": "/vendored/lygia/sdf/boxFrameSDF.msl", "start": 92553984, "end": 92554543}, {"filename": "/vendored/lygia/sdf/boxSDF.glsl", "start": 92554543, "end": 92554961}, {"filename": "/vendored/lygia/sdf/boxSDF.hlsl", "start": 92554961, "end": 92555393}, {"filename": "/vendored/lygia/sdf/boxSDF.msl", "start": 92555393, "end": 92555819}, {"filename": "/vendored/lygia/sdf/boxSDF.wesl", "start": 92555819, "end": 92556064}, {"filename": "/vendored/lygia/sdf/boxSDF.wgsl", "start": 92556064, "end": 92556309}, {"filename": "/vendored/lygia/sdf/capsuleSDF.glsl", "start": 92556309, "end": 92556718}, {"filename": "/vendored/lygia/sdf/capsuleSDF.hlsl", "start": 92556718, "end": 92557108}, {"filename": "/vendored/lygia/sdf/capsuleSDF.msl", "start": 92557108, "end": 92557524}, {"filename": "/vendored/lygia/sdf/circleSDF.glsl", "start": 92557524, "end": 92558427}, {"filename": "/vendored/lygia/sdf/circleSDF.hlsl", "start": 92558427, "end": 92559196}, {"filename": "/vendored/lygia/sdf/circleSDF.msl", "start": 92559196, "end": 92560106}, {"filename": "/vendored/lygia/sdf/coneSDF.glsl", "start": 92560106, "end": 92561246}, {"filename": "/vendored/lygia/sdf/coneSDF.hlsl", "start": 92561246, "end": 92562430}, {"filename": "/vendored/lygia/sdf/coneSDF.msl", "start": 92562430, "end": 92563590}, {"filename": "/vendored/lygia/sdf/crossSDF.glsl", "start": 92563590, "end": 92564322}, {"filename": "/vendored/lygia/sdf/crossSDF.hlsl", "start": 92564322, "end": 92564901}, {"filename": "/vendored/lygia/sdf/crossSDF.msl", "start": 92564901, "end": 92565638}, {"filename": "/vendored/lygia/sdf/cubeSDF.glsl", "start": 92565638, "end": 92565874}, {"filename": "/vendored/lygia/sdf/cubeSDF.hlsl", "start": 92565874, "end": 92566122}, {"filename": "/vendored/lygia/sdf/cubeSDF.msl", "start": 92566122, "end": 92566357}, {"filename": "/vendored/lygia/sdf/cylinderSDF.glsl", "start": 92566357, "end": 92567471}, {"filename": "/vendored/lygia/sdf/cylinderSDF.hlsl", "start": 92567471, "end": 92568628}, {"filename": "/vendored/lygia/sdf/cylinderSDF.msl", "start": 92568628, "end": 92569776}, {"filename": "/vendored/lygia/sdf/cylinderSDF.wesl", "start": 92569776, "end": 92570026}, {"filename": "/vendored/lygia/sdf/cylinderSDF.wgsl", "start": 92570026, "end": 92570276}, {"filename": "/vendored/lygia/sdf/dodecahedronSDF.glsl", "start": 92570276, "end": 92570991}, {"filename": "/vendored/lygia/sdf/dodecahedronSDF.hlsl", "start": 92570991, "end": 92571720}, {"filename": "/vendored/lygia/sdf/dodecahedronSDF.msl", "start": 92571720, "end": 92572442}, {"filename": "/vendored/lygia/sdf/ellipsoidSDF.glsl", "start": 92572442, "end": 92572782}, {"filename": "/vendored/lygia/sdf/ellipsoidSDF.hlsl", "start": 92572782, "end": 92573130}, {"filename": "/vendored/lygia/sdf/ellipsoidSDF.msl", "start": 92573130, "end": 92573466}, {"filename": "/vendored/lygia/sdf/flowerSDF.glsl", "start": 92573466, "end": 92574293}, {"filename": "/vendored/lygia/sdf/flowerSDF.hlsl", "start": 92574293, "end": 92574964}, {"filename": "/vendored/lygia/sdf/flowerSDF.msl", "start": 92574964, "end": 92575799}, {"filename": "/vendored/lygia/sdf/gearSDF.glsl", "start": 92575799, "end": 92576959}, {"filename": "/vendored/lygia/sdf/gearSDF.hlsl", "start": 92576959, "end": 92578034}, {"filename": "/vendored/lygia/sdf/gearSDF.msl", "start": 92578034, "end": 92579203}, {"filename": "/vendored/lygia/sdf/heartSDF.glsl", "start": 92579203, "end": 92579967}, {"filename": "/vendored/lygia/sdf/heartSDF.hlsl", "start": 92579967, "end": 92580629}, {"filename": "/vendored/lygia/sdf/heartSDF.msl", "start": 92580629, "end": 92581399}, {"filename": "/vendored/lygia/sdf/hexPrismSDF.glsl", "start": 92581399, "end": 92581797}, {"filename": "/vendored/lygia/sdf/hexPrismSDF.hlsl", "start": 92581797, "end": 92582207}, {"filename": "/vendored/lygia/sdf/hexPrismSDF.msl", "start": 92582207, "end": 92582611}, {"filename": "/vendored/lygia/sdf/hexSDF.glsl", "start": 92582611, "end": 92583345}, {"filename": "/vendored/lygia/sdf/hexSDF.hlsl", "start": 92583345, "end": 92583922}, {"filename": "/vendored/lygia/sdf/hexSDF.msl", "start": 92583922, "end": 92584661}, {"filename": "/vendored/lygia/sdf/icosahedronSDF.glsl", "start": 92584661, "end": 92585274}, {"filename": "/vendored/lygia/sdf/icosahedronSDF.hlsl", "start": 92585274, "end": 92585929}, {"filename": "/vendored/lygia/sdf/icosahedronSDF.msl", "start": 92585929, "end": 92586547}, {"filename": "/vendored/lygia/sdf/juliaSDF.glsl", "start": 92586547, "end": 92587765}, {"filename": "/vendored/lygia/sdf/juliaSDF.hlsl", "start": 92587765, "end": 92588768}, {"filename": "/vendored/lygia/sdf/juliaSDF.msl", "start": 92588768, "end": 92590017}, {"filename": "/vendored/lygia/sdf/kochSDF.glsl", "start": 92590017, "end": 92590944}, {"filename": "/vendored/lygia/sdf/kochSDF.hlsl", "start": 92590944, "end": 92591803}, {"filename": "/vendored/lygia/sdf/kochSDF.msl", "start": 92591803, "end": 92592749}, {"filename": "/vendored/lygia/sdf/lineSDF.glsl", "start": 92592749, "end": 92593308}, {"filename": "/vendored/lygia/sdf/lineSDF.hlsl", "start": 92593308, "end": 92593679}, {"filename": "/vendored/lygia/sdf/lineSDF.msl", "start": 92593679, "end": 92594250}, {"filename": "/vendored/lygia/sdf/linkSDF.glsl", "start": 92594250, "end": 92594603}, {"filename": "/vendored/lygia/sdf/linkSDF.hlsl", "start": 92594603, "end": 92594966}, {"filename": "/vendored/lygia/sdf/linkSDF.msl", "start": 92594966, "end": 92595329}, {"filename": "/vendored/lygia/sdf/mandelbulbSDF.glsl", "start": 92595329, "end": 92596679}, {"filename": "/vendored/lygia/sdf/mandelbulbSDF.hlsl", "start": 92596679, "end": 92598036}, {"filename": "/vendored/lygia/sdf/mandelbulbSDF.msl", "start": 92598036, "end": 92599394}, {"filename": "/vendored/lygia/sdf/octahedronSDF.glsl", "start": 92599394, "end": 92600316}, {"filename": "/vendored/lygia/sdf/octahedronSDF.hlsl", "start": 92600316, "end": 92601250}, {"filename": "/vendored/lygia/sdf/octahedronSDF.msl", "start": 92601250, "end": 92602184}, {"filename": "/vendored/lygia/sdf/octogonPrismSDF.glsl", "start": 92602184, "end": 92602955}, {"filename": "/vendored/lygia/sdf/octogonPrismSDF.hlsl", "start": 92602955, "end": 92603754}, {"filename": "/vendored/lygia/sdf/octogonPrismSDF.msl", "start": 92603754, "end": 92604535}, {"filename": "/vendored/lygia/sdf/opElongate.glsl", "start": 92604535, "end": 92605001}, {"filename": "/vendored/lygia/sdf/opElongate.hlsl", "start": 92605001, "end": 92605495}, {"filename": "/vendored/lygia/sdf/opElongate.msl", "start": 92605495, "end": 92605965}, {"filename": "/vendored/lygia/sdf/opExtrude.glsl", "start": 92605965, "end": 92606333}, {"filename": "/vendored/lygia/sdf/opExtrude.hlsl", "start": 92606333, "end": 92606709}, {"filename": "/vendored/lygia/sdf/opExtrude.msl", "start": 92606709, "end": 92607067}, {"filename": "/vendored/lygia/sdf/opIntersection.glsl", "start": 92607067, "end": 92607724}, {"filename": "/vendored/lygia/sdf/opIntersection.hlsl", "start": 92607724, "end": 92608349}, {"filename": "/vendored/lygia/sdf/opIntersection.msl", "start": 92608349, "end": 92608823}, {"filename": "/vendored/lygia/sdf/opOnion.glsl", "start": 92608823, "end": 92609066}, {"filename": "/vendored/lygia/sdf/opOnion.hlsl", "start": 92609066, "end": 92609309}, {"filename": "/vendored/lygia/sdf/opOnion.msl", "start": 92609309, "end": 92609540}, {"filename": "/vendored/lygia/sdf/opRepeat.glsl", "start": 92609540, "end": 92610108}, {"filename": "/vendored/lygia/sdf/opRepeat.hlsl", "start": 92610108, "end": 92610741}, {"filename": "/vendored/lygia/sdf/opRepeat.msl", "start": 92610741, "end": 92611327}, {"filename": "/vendored/lygia/sdf/opRevolve.glsl", "start": 92611327, "end": 92611606}, {"filename": "/vendored/lygia/sdf/opRevolve.hlsl", "start": 92611606, "end": 92611895}, {"filename": "/vendored/lygia/sdf/opRevolve.msl", "start": 92611895, "end": 92612178}, {"filename": "/vendored/lygia/sdf/opRound.glsl", "start": 92612178, "end": 92612399}, {"filename": "/vendored/lygia/sdf/opRound.hlsl", "start": 92612399, "end": 92612624}, {"filename": "/vendored/lygia/sdf/opRound.msl", "start": 92612624, "end": 92612836}, {"filename": "/vendored/lygia/sdf/opSubtraction.glsl", "start": 92612836, "end": 92613597}, {"filename": "/vendored/lygia/sdf/opSubtraction.hlsl", "start": 92613597, "end": 92614042}, {"filename": "/vendored/lygia/sdf/opSubtraction.msl", "start": 92614042, "end": 92614767}, {"filename": "/vendored/lygia/sdf/opSubtraction.wesl", "start": 92614767, "end": 92614916}, {"filename": "/vendored/lygia/sdf/opSubtraction.wgsl", "start": 92614916, "end": 92615065}, {"filename": "/vendored/lygia/sdf/opUnion.cuh", "start": 92615065, "end": 92616003}, {"filename": "/vendored/lygia/sdf/opUnion.glsl", "start": 92616003, "end": 92616827}, {"filename": "/vendored/lygia/sdf/opUnion.hlsl", "start": 92616827, "end": 92617629}, {"filename": "/vendored/lygia/sdf/opUnion.msl", "start": 92617629, "end": 92618316}, {"filename": "/vendored/lygia/sdf/opUnion.wesl", "start": 92618316, "end": 92618452}, {"filename": "/vendored/lygia/sdf/opUnion.wgsl", "start": 92618452, "end": 92618588}, {"filename": "/vendored/lygia/sdf/planeSDF.cuh", "start": 92618588, "end": 92619076}, {"filename": "/vendored/lygia/sdf/planeSDF.glsl", "start": 92619076, "end": 92619449}, {"filename": "/vendored/lygia/sdf/planeSDF.hlsl", "start": 92619449, "end": 92619834}, {"filename": "/vendored/lygia/sdf/planeSDF.msl", "start": 92619834, "end": 92620213}, {"filename": "/vendored/lygia/sdf/polySDF.glsl", "start": 92620213, "end": 92621088}, {"filename": "/vendored/lygia/sdf/polySDF.hlsl", "start": 92621088, "end": 92621807}, {"filename": "/vendored/lygia/sdf/polySDF.msl", "start": 92621807, "end": 92622683}, {"filename": "/vendored/lygia/sdf/pyramidSDF.glsl", "start": 92622683, "end": 92623515}, {"filename": "/vendored/lygia/sdf/pyramidSDF.hlsl", "start": 92623515, "end": 92624321}, {"filename": "/vendored/lygia/sdf/pyramidSDF.msl", "start": 92624321, "end": 92625154}, {"filename": "/vendored/lygia/sdf/raysSDF.glsl", "start": 92625154, "end": 92625907}, {"filename": "/vendored/lygia/sdf/raysSDF.hlsl", "start": 92625907, "end": 92626503}, {"filename": "/vendored/lygia/sdf/raysSDF.msl", "start": 92626503, "end": 92627257}, {"filename": "/vendored/lygia/sdf/rectSDF.glsl", "start": 92627257, "end": 92628492}, {"filename": "/vendored/lygia/sdf/rectSDF.hlsl", "start": 92628492, "end": 92629530}, {"filename": "/vendored/lygia/sdf/rectSDF.msl", "start": 92629530, "end": 92630786}, {"filename": "/vendored/lygia/sdf/rectSDF.wesl", "start": 92630786, "end": 92631584}, {"filename": "/vendored/lygia/sdf/rectSDF.wgsl", "start": 92631584, "end": 92632382}, {"filename": "/vendored/lygia/sdf/rhombSDF.glsl", "start": 92632382, "end": 92633126}, {"filename": "/vendored/lygia/sdf/rhombSDF.hlsl", "start": 92633126, "end": 92633737}, {"filename": "/vendored/lygia/sdf/rhombSDF.msl", "start": 92633737, "end": 92634482}, {"filename": "/vendored/lygia/sdf/sphereSDF.cuh", "start": 92634482, "end": 92634871}, {"filename": "/vendored/lygia/sdf/sphereSDF.glsl", "start": 92634871, "end": 92635167}, {"filename": "/vendored/lygia/sdf/sphereSDF.hlsl", "start": 92635167, "end": 92635469}, {"filename": "/vendored/lygia/sdf/sphereSDF.msl", "start": 92635469, "end": 92635765}, {"filename": "/vendored/lygia/sdf/sphereSDF.wesl", "start": 92635765, "end": 92635911}, {"filename": "/vendored/lygia/sdf/sphereSDF.wgsl", "start": 92635911, "end": 92636057}, {"filename": "/vendored/lygia/sdf/spiralSDF.glsl", "start": 92636057, "end": 92636828}, {"filename": "/vendored/lygia/sdf/spiralSDF.hlsl", "start": 92636828, "end": 92637442}, {"filename": "/vendored/lygia/sdf/spiralSDF.msl", "start": 92637442, "end": 92638221}, {"filename": "/vendored/lygia/sdf/starSDF.glsl", "start": 92638221, "end": 92639273}, {"filename": "/vendored/lygia/sdf/starSDF.hlsl", "start": 92639273, "end": 92640225}, {"filename": "/vendored/lygia/sdf/starSDF.msl", "start": 92640225, "end": 92641268}, {"filename": "/vendored/lygia/sdf/superShapeSDF.glsl", "start": 92641268, "end": 92643424}, {"filename": "/vendored/lygia/sdf/superShapeSDF.hlsl", "start": 92643424, "end": 92645033}, {"filename": "/vendored/lygia/sdf/superShapeSDF.msl", "start": 92645033, "end": 92647154}, {"filename": "/vendored/lygia/sdf/tetrahedronSDF.glsl", "start": 92647154, "end": 92647591}, {"filename": "/vendored/lygia/sdf/tetrahedronSDF.hlsl", "start": 92647591, "end": 92648036}, {"filename": "/vendored/lygia/sdf/tetrahedronSDF.msl", "start": 92648036, "end": 92648475}, {"filename": "/vendored/lygia/sdf/torusSDF.glsl", "start": 92648475, "end": 92648978}, {"filename": "/vendored/lygia/sdf/torusSDF.hlsl", "start": 92648978, "end": 92649495}, {"filename": "/vendored/lygia/sdf/torusSDF.msl", "start": 92649495, "end": 92649988}, {"filename": "/vendored/lygia/sdf/torusSDF.wesl", "start": 92649988, "end": 92650167}, {"filename": "/vendored/lygia/sdf/torusSDF.wgsl", "start": 92650167, "end": 92650346}, {"filename": "/vendored/lygia/sdf/triPrismSDF.glsl", "start": 92650346, "end": 92652736}, {"filename": "/vendored/lygia/sdf/triPrismSDF.hlsl", "start": 92652736, "end": 92655144}, {"filename": "/vendored/lygia/sdf/triPrismSDF.msl", "start": 92655144, "end": 92657528}, {"filename": "/vendored/lygia/sdf/triSDF.glsl", "start": 92657528, "end": 92658257}, {"filename": "/vendored/lygia/sdf/triSDF.hlsl", "start": 92658257, "end": 92658829}, {"filename": "/vendored/lygia/sdf/triSDF.msl", "start": 92658829, "end": 92659563}, {"filename": "/vendored/lygia/sdf/vesicaSDF.glsl", "start": 92659563, "end": 92660325}, {"filename": "/vendored/lygia/sdf/vesicaSDF.hlsl", "start": 92660325, "end": 92660981}, {"filename": "/vendored/lygia/sdf/vesicaSDF.msl", "start": 92660981, "end": 92661743}, {"filename": "/vendored/lygia/simulate/grayscott.glsl", "start": 92661743, "end": 92663773}, {"filename": "/vendored/lygia/simulate/latticeBoltzmann.glsl", "start": 92663773, "end": 92666636}, {"filename": "/vendored/lygia/simulate/ripple.glsl", "start": 92666636, "end": 92667683}, {"filename": "/vendored/lygia/simulate/simpleAndFastFluid.glsl", "start": 92667683, "end": 92673618}, {"filename": "/vendored/lygia/space/aspect.glsl", "start": 92673618, "end": 92674244}, {"filename": "/vendored/lygia/space/aspect.hlsl", "start": 92674244, "end": 92674884}, {"filename": "/vendored/lygia/space/aspect.msl", "start": 92674884, "end": 92675522}, {"filename": "/vendored/lygia/space/bracketing.glsl", "start": 92675522, "end": 92677647}, {"filename": "/vendored/lygia/space/bracketing.hlsl", "start": 92677647, "end": 92679797}, {"filename": "/vendored/lygia/space/bracketing.msl", "start": 92679797, "end": 92681946}, {"filename": "/vendored/lygia/space/brickTile.glsl", "start": 92681946, "end": 92682845}, {"filename": "/vendored/lygia/space/brickTile.hlsl", "start": 92682845, "end": 92683672}, {"filename": "/vendored/lygia/space/brickTile.msl", "start": 92683672, "end": 92684623}, {"filename": "/vendored/lygia/space/cart2polar.glsl", "start": 92684623, "end": 92685118}, {"filename": "/vendored/lygia/space/cart2polar.hlsl", "start": 92685118, "end": 92685635}, {"filename": "/vendored/lygia/space/cart2polar.msl", "start": 92685635, "end": 92686087}, {"filename": "/vendored/lygia/space/center.glsl", "start": 92686087, "end": 92686816}, {"filename": "/vendored/lygia/space/center.hlsl", "start": 92686816, "end": 92687566}, {"filename": "/vendored/lygia/space/center.msl", "start": 92687566, "end": 92688311}, {"filename": "/vendored/lygia/space/checkerTile.glsl", "start": 92688311, "end": 92689217}, {"filename": "/vendored/lygia/space/checkerTile.hlsl", "start": 92689217, "end": 92690068}, {"filename": "/vendored/lygia/space/checkerTile.msl", "start": 92690068, "end": 92691019}, {"filename": "/vendored/lygia/space/depth2viewZ.glsl", "start": 92691019, "end": 92692198}, {"filename": "/vendored/lygia/space/depth2viewZ.hlsl", "start": 92692198, "end": 92693377}, {"filename": "/vendored/lygia/space/depth2viewZ.msl", "start": 92693377, "end": 92694556}, {"filename": "/vendored/lygia/space/displace.glsl", "start": 92694556, "end": 92696775}, {"filename": "/vendored/lygia/space/displace.hlsl", "start": 92696775, "end": 92698809}, {"filename": "/vendored/lygia/space/displace.msl", "start": 92698809, "end": 92701060}, {"filename": "/vendored/lygia/space/equirect2xyz.glsl", "start": 92701060, "end": 92701760}, {"filename": "/vendored/lygia/space/equirect2xyz.hlsl", "start": 92701760, "end": 92702472}, {"filename": "/vendored/lygia/space/equirect2xyz.msl", "start": 92702472, "end": 92703183}, {"filename": "/vendored/lygia/space/eulerView.glsl", "start": 92703183, "end": 92703888}, {"filename": "/vendored/lygia/space/eulerView.hlsl", "start": 92703888, "end": 92704686}, {"filename": "/vendored/lygia/space/fisheye2xyz.glsl", "start": 92704686, "end": 92705421}, {"filename": "/vendored/lygia/space/fisheye2xyz.hlsl", "start": 92705421, "end": 92706170}, {"filename": "/vendored/lygia/space/fisheye2xyz.msl", "start": 92706170, "end": 92706918}, {"filename": "/vendored/lygia/space/fisheye2xyz.wesl", "start": 92706918, "end": 92707576}, {"filename": "/vendored/lygia/space/fisheye2xyz.wgsl", "start": 92707576, "end": 92708232}, {"filename": "/vendored/lygia/space/flipY.glsl", "start": 92708232, "end": 92708796}, {"filename": "/vendored/lygia/space/flipY.hlsl", "start": 92708796, "end": 92709399}, {"filename": "/vendored/lygia/space/flipY.msl", "start": 92709399, "end": 92709984}, {"filename": "/vendored/lygia/space/hexTile.glsl", "start": 92709984, "end": 92710889}, {"filename": "/vendored/lygia/space/hexTile.hlsl", "start": 92710889, "end": 92711716}, {"filename": "/vendored/lygia/space/hexTile.msl", "start": 92711716, "end": 92712649}, {"filename": "/vendored/lygia/space/kaleidoscope.glsl", "start": 92712649, "end": 92713955}, {"filename": "/vendored/lygia/space/kaleidoscope.hlsl", "start": 92713955, "end": 92715258}, {"filename": "/vendored/lygia/space/kaleidoscope.msl", "start": 92715258, "end": 92716563}, {"filename": "/vendored/lygia/space/linearizeDepth.glsl", "start": 92716563, "end": 92717375}, {"filename": "/vendored/lygia/space/linearizeDepth.hlsl", "start": 92717375, "end": 92718187}, {"filename": "/vendored/lygia/space/linearizeDepth.msl", "start": 92718187, "end": 92718999}, {"filename": "/vendored/lygia/space/lookAt.glsl", "start": 92718999, "end": 92720397}, {"filename": "/vendored/lygia/space/lookAt.hlsl", "start": 92720397, "end": 92721928}, {"filename": "/vendored/lygia/space/lookAt.msl", "start": 92721928, "end": 92723588}, {"filename": "/vendored/lygia/space/lookAtView.glsl", "start": 92723588, "end": 92724322}, {"filename": "/vendored/lygia/space/lookAtView.hlsl", "start": 92724322, "end": 92725102}, {"filename": "/vendored/lygia/space/mirrorTile.glsl", "start": 92725102, "end": 92726708}, {"filename": "/vendored/lygia/space/mirrorTile.hlsl", "start": 92726708, "end": 92728413}, {"filename": "/vendored/lygia/space/mirrorTile.msl", "start": 92728413, "end": 92730107}, {"filename": "/vendored/lygia/space/nearest.glsl", "start": 92730107, "end": 92730735}, {"filename": "/vendored/lygia/space/nearest.hlsl", "start": 92730735, "end": 92731324}, {"filename": "/vendored/lygia/space/nearest.msl", "start": 92731324, "end": 92731958}, {"filename": "/vendored/lygia/space/nearest.wesl", "start": 92731958, "end": 92732423}, {"filename": "/vendored/lygia/space/nearest.wgsl", "start": 92732423, "end": 92732888}, {"filename": "/vendored/lygia/space/orthographic.glsl", "start": 92732888, "end": 92733707}, {"filename": "/vendored/lygia/space/orthographic.msl", "start": 92733707, "end": 92734534}, {"filename": "/vendored/lygia/space/parallaxMapping.glsl", "start": 92734534, "end": 92742615}, {"filename": "/vendored/lygia/space/parallaxMapping.hlsl", "start": 92742615, "end": 92750769}, {"filename": "/vendored/lygia/space/parallaxMapping.msl", "start": 92750769, "end": 92758865}, {"filename": "/vendored/lygia/space/perspective.glsl", "start": 92758865, "end": 92759628}, {"filename": "/vendored/lygia/space/perspective.msl", "start": 92759628, "end": 92760391}, {"filename": "/vendored/lygia/space/polar2cart.glsl", "start": 92760391, "end": 92760918}, {"filename": "/vendored/lygia/space/polar2cart.hlsl", "start": 92760918, "end": 92761457}, {"filename": "/vendored/lygia/space/polar2cart.msl", "start": 92761457, "end": 92761707}, {"filename": "/vendored/lygia/space/ratio.cuh", "start": 92761707, "end": 92762473}, {"filename": "/vendored/lygia/space/ratio.glsl", "start": 92762473, "end": 92763348}, {"filename": "/vendored/lygia/space/ratio.hlsl", "start": 92763348, "end": 92764149}, {"filename": "/vendored/lygia/space/ratio.msl", "start": 92764149, "end": 92765033}, {"filename": "/vendored/lygia/space/ratio.wesl", "start": 92765033, "end": 92765831}, {"filename": "/vendored/lygia/space/ratio.wgsl", "start": 92765831, "end": 92766629}, {"filename": "/vendored/lygia/space/rotate.glsl", "start": 92766629, "end": 92768591}, {"filename": "/vendored/lygia/space/rotate.hlsl", "start": 92768591, "end": 92770481}, {"filename": "/vendored/lygia/space/rotate.msl", "start": 92770481, "end": 92772462}, {"filename": "/vendored/lygia/space/rotate.wesl", "start": 92772462, "end": 92773071}, {"filename": "/vendored/lygia/space/rotate.wgsl", "start": 92773071, "end": 92773683}, {"filename": "/vendored/lygia/space/rotateX.glsl", "start": 92773683, "end": 92774729}, {"filename": "/vendored/lygia/space/rotateX.hlsl", "start": 92774729, "end": 92775558}, {"filename": "/vendored/lygia/space/rotateX.msl", "start": 92775558, "end": 92776605}, {"filename": "/vendored/lygia/space/rotateY.glsl", "start": 92776605, "end": 92777645}, {"filename": "/vendored/lygia/space/rotateY.hlsl", "start": 92777645, "end": 92778469}, {"filename": "/vendored/lygia/space/rotateY.msl", "start": 92778469, "end": 92779508}, {"filename": "/vendored/lygia/space/rotateZ.glsl", "start": 92779508, "end": 92780557}, {"filename": "/vendored/lygia/space/rotateZ.hlsl", "start": 92780557, "end": 92781387}, {"filename": "/vendored/lygia/space/rotateZ.msl", "start": 92781387, "end": 92782437}, {"filename": "/vendored/lygia/space/scale.glsl", "start": 92782437, "end": 92784239}, {"filename": "/vendored/lygia/space/scale.hlsl", "start": 92784239, "end": 92785938}, {"filename": "/vendored/lygia/space/scale.msl", "start": 92785938, "end": 92787737}, {"filename": "/vendored/lygia/space/scale.wesl", "start": 92787737, "end": 92788162}, {"filename": "/vendored/lygia/space/scale.wgsl", "start": 92788162, "end": 92788587}, {"filename": "/vendored/lygia/space/screen2viewPosition.glsl", "start": 92788587, "end": 92789949}, {"filename": "/vendored/lygia/space/screen2viewPosition.hlsl", "start": 92789949, "end": 92791333}, {"filename": "/vendored/lygia/space/screen2viewPosition.msl", "start": 92791333, "end": 92792690}, {"filename": "/vendored/lygia/space/sprite.glsl", "start": 92792690, "end": 92793341}, {"filename": "/vendored/lygia/space/sprite.hlsl", "start": 92793341, "end": 92793975}, {"filename": "/vendored/lygia/space/sprite.msl", "start": 92793975, "end": 92794644}, {"filename": "/vendored/lygia/space/sprite.wgsl", "start": 92794644, "end": 92795261}, {"filename": "/vendored/lygia/space/sqTile.glsl", "start": 92795261, "end": 92795848}, {"filename": "/vendored/lygia/space/sqTile.hlsl", "start": 92795848, "end": 92796448}, {"filename": "/vendored/lygia/space/sqTile.msl", "start": 92796448, "end": 92797049}, {"filename": "/vendored/lygia/space/tbn.glsl", "start": 92797049, "end": 92797451}, {"filename": "/vendored/lygia/space/tbn.hlsl", "start": 92797451, "end": 92797961}, {"filename": "/vendored/lygia/space/translate.glsl", "start": 92797961, "end": 92798413}, {"filename": "/vendored/lygia/space/translate.hlsl", "start": 92798413, "end": 92798954}, {"filename": "/vendored/lygia/space/triTile.glsl", "start": 92798954, "end": 92799678}, {"filename": "/vendored/lygia/space/triTile.hlsl", "start": 92799678, "end": 92800363}, {"filename": "/vendored/lygia/space/triTile.msl", "start": 92800363, "end": 92801113}, {"filename": "/vendored/lygia/space/uncenter.glsl", "start": 92801113, "end": 92801791}, {"filename": "/vendored/lygia/space/uncenter.hlsl", "start": 92801791, "end": 92802490}, {"filename": "/vendored/lygia/space/uncenter.msl", "start": 92802490, "end": 92803184}, {"filename": "/vendored/lygia/space/unratio.glsl", "start": 92803184, "end": 92803666}, {"filename": "/vendored/lygia/space/unratio.hlsl", "start": 92803666, "end": 92804182}, {"filename": "/vendored/lygia/space/unratio.msl", "start": 92804182, "end": 92804670}, {"filename": "/vendored/lygia/space/view2screenPosition.glsl", "start": 92804670, "end": 92805446}, {"filename": "/vendored/lygia/space/view2screenPosition.hlsl", "start": 92805446, "end": 92806242}, {"filename": "/vendored/lygia/space/view2screenPosition.msl", "start": 92806242, "end": 92807030}, {"filename": "/vendored/lygia/space/viewZ2depth.glsl", "start": 92807030, "end": 92808178}, {"filename": "/vendored/lygia/space/viewZ2depth.hlsl", "start": 92808178, "end": 92809326}, {"filename": "/vendored/lygia/space/viewZ2depth.msl", "start": 92809326, "end": 92810461}, {"filename": "/vendored/lygia/space/windmillTile.glsl", "start": 92810461, "end": 92811666}, {"filename": "/vendored/lygia/space/windmillTile.hlsl", "start": 92811666, "end": 92812844}, {"filename": "/vendored/lygia/space/windmillTile.msl", "start": 92812844, "end": 92814104}, {"filename": "/vendored/lygia/space/xyz2equirect.glsl", "start": 92814104, "end": 92814646}, {"filename": "/vendored/lygia/space/xyz2equirect.hlsl", "start": 92814646, "end": 92815195}, {"filename": "/vendored/lygia/space/xyz2equirect.msl", "start": 92815195, "end": 92815748}, {"filename": "/vendored/lygia/version.glsl", "start": 92815748, "end": 92816247}, {"filename": "/vendored/lygia/version.hlsl", "start": 92816247, "end": 92816746}, {"filename": "/vendored/lygia/version.wesl", "start": 92816746, "end": 92817159}, {"filename": "/vendored/lygia/version.wgsl", "start": 92817159, "end": 92817572}, {"filename": "/vendored/lygia/webpack.config.js", "start": 92817572, "end": 92818751}], "remote_package_size": 92818751});

  })();

// end include: /var/folders/v8/kv5tdb4s5d57h2swgmltjd580000gn/T/tmpadwczeg2.js
// include: /var/folders/v8/kv5tdb4s5d57h2swgmltjd580000gn/T/tmp1bkhse5g.js

    // All the pre-js content up to here must remain later on, we need to run
    // it.
    if ((typeof ENVIRONMENT_IS_WASM_WORKER != 'undefined' && ENVIRONMENT_IS_WASM_WORKER) || (typeof ENVIRONMENT_IS_PTHREAD != 'undefined' && ENVIRONMENT_IS_PTHREAD) || (typeof ENVIRONMENT_IS_AUDIO_WORKLET != 'undefined' && ENVIRONMENT_IS_AUDIO_WORKLET)) Module['preRun'] = [];
    var necessaryPreJSTasks = Module['preRun'].slice();
  // end include: /var/folders/v8/kv5tdb4s5d57h2swgmltjd580000gn/T/tmp1bkhse5g.js
// include: /var/folders/v8/kv5tdb4s5d57h2swgmltjd580000gn/T/tmpn_3lj7r7.js

    if (!Module['preRun']) throw 'Module.preRun should exist because file support used it; did a pre-js delete it?';
    necessaryPreJSTasks.forEach((task) => {
      if (Module['preRun'].indexOf(task) < 0) throw 'All preRun tasks that exist before user pre-js code should remain after; did you replace Module or modify Module.preRun?';
    });
  // end include: /var/folders/v8/kv5tdb4s5d57h2swgmltjd580000gn/T/tmpn_3lj7r7.js


var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// In MODULARIZE mode _scriptName needs to be captured already at the very top of the page immediately when the page is parsed, so it is generated there
// before the page load. In non-MODULARIZE modes generate it here.
var _scriptName = typeof document != 'undefined' ? document.currentScript?.src : undefined;

if (typeof __filename != 'undefined') { // Node
  _scriptName = __filename;
} else
if (ENVIRONMENT_IS_WORKER) {
  _scriptName = self.location.href;
}

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {
  const isNode = typeof process == 'object' && process.versions?.node && process.type != 'renderer';
  if (!isNode) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split('.').slice(0, 3);
  numericVersion = (numericVersion[0] * 10000) + (numericVersion[1] * 100) + (numericVersion[2].split('-')[0] * 1);
  if (numericVersion < 160000) {
    throw new Error('This emscripten-generated code requires node v16.0.0 (detected v' + nodeVersion + ')');
  }

  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');

  scriptDirectory = __dirname + '/';

// include: node_shell_read.js
readBinary = (filename) => {
  // We need to re-wrap `file://` strings to URLs.
  filename = isFileURI(filename) ? new URL(filename) : filename;
  var ret = fs.readFileSync(filename);
  assert(Buffer.isBuffer(ret));
  return ret;
};

readAsync = async (filename, binary = true) => {
  // See the comment in the `readBinary` function.
  filename = isFileURI(filename) ? new URL(filename) : filename;
  var ret = fs.readFileSync(filename, binary ? undefined : 'utf8');
  assert(binary ? Buffer.isBuffer(ret) : typeof ret == 'string');
  return ret;
};
// end include: node_shell_read.js
  if (process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  // MODULARIZE will export the module in the proper place outside, we don't need to export here
  if (typeof module != 'undefined') {
    module['exports'] = Module;
  }

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

} else
if (ENVIRONMENT_IS_SHELL) {

  const isNode = typeof process == 'object' && process.versions?.node && process.type != 'renderer';
  if (isNode || typeof window == 'object' || typeof WorkerGlobalScope != 'undefined') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  try {
    scriptDirectory = new URL('.', _scriptName).href; // includes trailing slash
  } catch {
    // Must be a `blob:` or `data:` URL (e.g. `blob:http://site.com/etc/etc`), we cannot
    // infer anything from them.
  }

  if (!(typeof window == 'object' || typeof WorkerGlobalScope != 'undefined')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  {
// include: web_or_worker_shell_read.js
if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = async (url) => {
    // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
    // See https://github.com/github/fetch/pull/92#issuecomment-140665932
    // Cordova or Electron apps are typically loaded from a file:// url.
    // So use XHR on webview if URL is a file URL.
    if (isFileURI(url)) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            resolve(xhr.response);
            return;
          }
          reject(xhr.status);
        };
        xhr.onerror = reject;
        xhr.send(null);
      });
    }
    var response = await fetch(url, { credentials: 'same-origin' });
    if (response.ok) {
      return response.arrayBuffer();
    }
    throw new Error(response.status + ' : ' + response.url);
  };
// end include: web_or_worker_shell_read.js
  }
} else
{
  throw new Error('environment detection error');
}

var out = console.log.bind(console);
var err = console.error.bind(console);

var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var FETCHFS = 'FETCHFS is no longer included by default; build with -lfetchfs.js';
var ICASEFS = 'ICASEFS is no longer included by default; build with -licasefs.js';
var JSFILEFS = 'JSFILEFS is no longer included by default; build with -ljsfilefs.js';
var OPFS = 'OPFS is no longer included by default; build with -lopfs.js';

var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

// perform assertions in shell.js after we set up out() and err(), as otherwise
// if an assertion fails it cannot print the message

assert(!ENVIRONMENT_IS_SHELL, 'shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.');

// end include: shell.js

// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary;

if (typeof WebAssembly != 'object') {
  err('no native wasm support detected');
}

// Wasm globals

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');

// include: runtime_common.js
// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
// include: runtime_exceptions.js
// end include: runtime_exceptions.js
// include: runtime_debug.js
var runtimeDebug = true; // Switch to false at runtime to disable logging at the right times

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(...args) {
  if (!runtimeDebug && typeof runtimeDebug != 'undefined') return;
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn(...args);
}

// Endianness check
(() => {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
})();

function consumedModuleProp(prop) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      set() {
        abort(`Attempt to set \`Module.${prop}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);

      }
    });
  }
}

function makeInvalidEarlyAccess(name) {
  return () => assert(false, `call to '${name}' via reference taken before Wasm module initialization`);

}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

/**
 * Intercept access to a global symbol.  This enables us to give informative
 * warnings/errors when folks attempt to use symbols they did not include in
 * their build, or no symbols that no longer exist.
 */
function hookGlobalSymbolAccess(sym, func) {
  if (typeof globalThis != 'undefined' && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        func();
        return undefined;
      }
    });
  }
}

function missingGlobal(sym, msg) {
  hookGlobalSymbolAccess(sym, () => {
    warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
  });
}

missingGlobal('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer');
missingGlobal('asm', 'Please use wasmExports instead');

function missingLibrarySymbol(sym) {
  hookGlobalSymbolAccess(sym, () => {
    // Can't `abort()` here because it would break code that does runtime
    // checks.  e.g. `if (typeof SDL === 'undefined')`.
    var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
    // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
    // library.js, which means $name for a JS name with no prefix, or name
    // for a JS name like _name.
    var librarySymbol = sym;
    if (!librarySymbol.startsWith('_')) {
      librarySymbol = '$' + sym;
    }
    msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
    if (isExportedByForceFilesystem(sym)) {
      msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
    }
    warnOnce(msg);
  });

  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      }
    });
  }
}

// end include: runtime_debug.js
// Memory management

var wasmMemory;

var
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

// BigInt64Array type is not correctly defined in closure
var
/** not-@type {!BigInt64Array} */
  HEAP64,
/* BigUint64Array type is not correctly defined in closure
/** not-@type {!BigUint64Array} */
  HEAPU64;

var runtimeInitialized = false;



function updateMemoryViews() {
  var b = wasmMemory.buffer;
  HEAP8 = new Int8Array(b);
  HEAP16 = new Int16Array(b);
  HEAPU8 = new Uint8Array(b);
  HEAPU16 = new Uint16Array(b);
  HEAP32 = new Int32Array(b);
  HEAPU32 = new Uint32Array(b);
  HEAPF32 = new Float32Array(b);
  HEAPF64 = new Float64Array(b);
  HEAP64 = new BigInt64Array(b);
  HEAPU64 = new BigUint64Array(b);
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// end include: runtime_common.js
assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  consumedModuleProp('preRun');
  // Begin ATPRERUNS hooks
  callRuntimeCallbacks(onPreRuns);
  // End ATPRERUNS hooks
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  // Begin ATINITS hooks
  if (!Module['noFSInit'] && !FS.initialized) FS.init();
TTY.init();
  // End ATINITS hooks

  wasmExports['__wasm_call_ctors']();

  // Begin ATPOSTCTORS hooks
  FS.ignorePermissions = false;
  // End ATPOSTCTORS hooks
}

function preMain() {
  checkStackCookie();
  // No ATMAINS hooks
}

function postRun() {
  checkStackCookie();
   // PThreads reuse the runtime from the main thread.

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  consumedModuleProp('postRun');

  // Begin ATPOSTRUNS hooks
  callRuntimeCallbacks(onPostRuns);
  // End ATPOSTRUNS hooks
}

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};
var runDependencyWatcher = null;

function addRunDependency(id) {
  runDependencies++;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

function createExportWrapper(name, nargs) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return f(...args);
  };
}

var wasmBinaryFile;

function findWasmBinary() {
    return locateFile('beatboxx.wasm');
}

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw 'both async and sync fetching of the wasm failed';
}

async function getWasmBinary(binaryFile) {
  // If we don't have the binary yet, load it asynchronously using readAsync.
  if (!wasmBinary) {
    // Fetch the binary using readAsync
    try {
      var response = await readAsync(binaryFile);
      return new Uint8Array(response);
    } catch {
      // Fall back to getBinarySync below;
    }
  }

  // Otherwise, getBinarySync should be able to get it synchronously
  return getBinarySync(binaryFile);
}

async function instantiateArrayBuffer(binaryFile, imports) {
  try {
    var binary = await getWasmBinary(binaryFile);
    var instance = await WebAssembly.instantiate(binary, imports);
    return instance;
  } catch (reason) {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  }
}

async function instantiateAsync(binary, binaryFile, imports) {
  if (!binary && typeof WebAssembly.instantiateStreaming == 'function'
      // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
      && !isFileURI(binaryFile)
      // Avoid instantiateStreaming() on Node.js environment for now, as while
      // Node.js v18.1.0 implements it, it does not have a full fetch()
      // implementation yet.
      //
      // Reference:
      //   https://github.com/emscripten-core/emscripten/pull/16917
      && !ENVIRONMENT_IS_NODE
     ) {
    try {
      var response = fetch(binaryFile, { credentials: 'same-origin' });
      var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
      return instantiationResult;
    } catch (reason) {
      // We expect the most common failure cause to be a bad MIME type for the binary,
      // in which case falling back to ArrayBuffer instantiation should work.
      err(`wasm streaming compile failed: ${reason}`);
      err('falling back to ArrayBuffer instantiation');
      // fall back of instantiateArrayBuffer below
    };
  }
  return instantiateArrayBuffer(binaryFile, imports);
}

function getWasmImports() {
  // prepare imports
  return {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  }
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
async function createWasm() {
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    

    wasmMemory = wasmExports['memory'];
    
    assert(wasmMemory, 'memory not found in wasm exports');
    updateMemoryViews();

    wasmTable = wasmExports['__indirect_function_table'];
    
    assert(wasmTable, 'table not found in wasm exports');

    assignWasmExports(wasmExports);
    removeRunDependency('wasm-instantiate');
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    return receiveInstance(result['instance']);
  }

  var info = getWasmImports();

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {
    return new Promise((resolve, reject) => {
      try {
        Module['instantiateWasm'](info, (mod, inst) => {
          resolve(receiveInstance(mod, inst));
        });
      } catch(e) {
        err(`Module.instantiateWasm callback failed with error: ${e}`);
        reject(e);
      }
    });
  }

  wasmBinaryFile ??= findWasmBinary();
  var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
  var exports = receiveInstantiationResult(result);
  return exports;
}

// end include: preamble.js

// Begin JS library code


  class ExitStatus {
      name = 'ExitStatus';
      constructor(status) {
        this.message = `Program terminated with exit(${status})`;
        this.status = status;
      }
    }

  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };
  var onPostRuns = [];
  var addOnPostRun = (cb) => onPostRuns.push(cb);

  var onPreRuns = [];
  var addOnPreRun = (cb) => onPreRuns.push(cb);


  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP64[((ptr)>>3)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var noExitRuntime = true;

  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number');
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': HEAP64[((ptr)>>3)] = BigInt(value); break;
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }

  var stackRestore = (val) => __emscripten_stack_restore(val);

  var stackSave = () => _emscripten_stack_get_current();

  var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };

  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder() : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number=} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined/NaN means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      // When using conditional TextDecoder, skip it for short strings as the overhead of the native call is not worth it.
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead) => {
      assert(typeof ptr == 'number', `UTF8ToString expects a number (got ${typeof ptr})`);
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    };
  var ___assert_fail = (condition, filename, line, func) =>
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);

  class ExceptionInfo {
      // excPtr - Thrown object pointer to wrap. Metadata pointer is calculated from it.
      constructor(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - 24;
      }
  
      set_type(type) {
        HEAPU32[(((this.ptr)+(4))>>2)] = type;
      }
  
      get_type() {
        return HEAPU32[(((this.ptr)+(4))>>2)];
      }
  
      set_destructor(destructor) {
        HEAPU32[(((this.ptr)+(8))>>2)] = destructor;
      }
  
      get_destructor() {
        return HEAPU32[(((this.ptr)+(8))>>2)];
      }
  
      set_caught(caught) {
        caught = caught ? 1 : 0;
        HEAP8[(this.ptr)+(12)] = caught;
      }
  
      get_caught() {
        return HEAP8[(this.ptr)+(12)] != 0;
      }
  
      set_rethrown(rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[(this.ptr)+(13)] = rethrown;
      }
  
      get_rethrown() {
        return HEAP8[(this.ptr)+(13)] != 0;
      }
  
      // Initialize native structure fields. Should be called once after allocated.
      init(type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor);
      }
  
      set_adjusted_ptr(adjustedPtr) {
        HEAPU32[(((this.ptr)+(16))>>2)] = adjustedPtr;
      }
  
      get_adjusted_ptr() {
        return HEAPU32[(((this.ptr)+(16))>>2)];
      }
    }
  
  var exceptionLast = 0;
  
  var uncaughtExceptionCount = 0;
  var ___cxa_throw = (ptr, type, destructor) => {
      var info = new ExceptionInfo(ptr);
      // Initialize ExceptionInfo content after it was allocated in __cxa_allocate_exception.
      info.init(type, destructor);
      exceptionLast = ptr;
      uncaughtExceptionCount++;
      assert(false, 'Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.');
    };

  /** @suppress {duplicate } */
  var syscallGetVarargI = () => {
      assert(SYSCALLS.varargs != undefined);
      // the `+` prepended here is necessary to convince the JSCompiler that varargs is indeed a number.
      var ret = HEAP32[((+SYSCALLS.varargs)>>2)];
      SYSCALLS.varargs += 4;
      return ret;
    };
  var syscallGetVarargP = syscallGetVarargI;
  
  
  var PATH = {
  isAbs:(path) => path.charAt(0) === '/',
  splitPath:(filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
  normalizeArray:(parts, allowAboveRoot) => {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },
  normalize:(path) => {
        var isAbsolute = PATH.isAbs(path),
            trailingSlash = path.slice(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter((p) => !!p), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },
  dirname:(path) => {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.slice(0, -1);
        }
        return root + dir;
      },
  basename:(path) => path && path.match(/([^\/]+|\/)\/*$/)[1],
  join:(...paths) => PATH.normalize(paths.join('/')),
  join2:(l, r) => PATH.normalize(l + '/' + r),
  };
  
  var initRandomFill = () => {
      // This block is not needed on v19+ since crypto.getRandomValues is builtin
      if (ENVIRONMENT_IS_NODE) {
        var nodeCrypto = require('crypto');
        return (view) => nodeCrypto.randomFillSync(view);
      }
  
      return (view) => crypto.getRandomValues(view);
    };
  var randomFill = (view) => {
      // Lazily init on the first invocation.
      (randomFill = initRandomFill())(view);
    };
  
  
  
  var PATH_FS = {
  resolve:(...args) => {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? args[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter((p) => !!p), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },
  relative:(from, to) => {
        from = PATH_FS.resolve(from).slice(1);
        to = PATH_FS.resolve(to).slice(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      },
  };
  
  
  
  var FS_stdin_getChar_buffer = [];
  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string', `stringToUTF8Array expects a string (got ${typeof str})`);
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.codePointAt(i);
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
          // Gotcha: if codePoint is over 0xFFFF, it is represented as a surrogate pair in UTF-16.
          // We need to manually skip over the second code unit for correct iteration.
          i++;
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  /** @type {function(string, boolean=, number=)} */
  var intArrayFromString = (stringy, dontAddNull, length) => {
      var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
      var u8array = new Array(len);
      var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
      if (dontAddNull) u8array.length = numBytesWritten;
      return u8array;
    };
  var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (ENVIRONMENT_IS_NODE) {
          // we will read data by chunks of BUFSIZE
          var BUFSIZE = 256;
          var buf = Buffer.alloc(BUFSIZE);
          var bytesRead = 0;
  
          // For some reason we must suppress a closure warning here, even though
          // fd definitely exists on process.stdin, and is even the proper way to
          // get the fd of stdin,
          // https://github.com/nodejs/help/issues/2136#issuecomment-523649904
          // This started to happen after moving this logic out of library_tty.js,
          // so it is related to the surrounding code in some unclear manner.
          /** @suppress {missingProperties} */
          var fd = process.stdin.fd;
  
          try {
            bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
          } catch(e) {
            // Cross-platform differences: on Windows, reading EOF throws an
            // exception, but on other OSes, reading EOF returns 0. Uniformize
            // behavior by treating the EOF exception to return 0.
            if (e.toString().includes('EOF')) bytesRead = 0;
            else throw e;
          }
  
          if (bytesRead > 0) {
            result = buf.slice(0, bytesRead).toString('utf-8');
          }
        } else
        if (typeof window != 'undefined' &&
          typeof window.prompt == 'function') {
          // Browser.
          result = window.prompt('Input: ');  // returns null on cancel
          if (result !== null) {
            result += '\n';
          }
        } else
        {}
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
  var TTY = {
  ttys:[],
  init() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process.stdin.setEncoding('utf8');
        // }
      },
  shutdown() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process.stdin.pause();
        // }
      },
  register(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },
  stream_ops:{
  open(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
  close(stream) {
          // flush any pending line data
          stream.tty.ops.fsync(stream.tty);
        },
  fsync(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
  read(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.atime = Date.now();
          }
          return bytesRead;
        },
  write(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.mtime = stream.node.ctime = Date.now();
          }
          return i;
        },
  },
  default_tty_ops:{
  get_char(tty) {
          return FS_stdin_getChar();
        },
  put_char(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },
  fsync(tty) {
          if (tty.output?.length > 0) {
            out(UTF8ArrayToString(tty.output));
            tty.output = [];
          }
        },
  ioctl_tcgets(tty) {
          // typical setting
          return {
            c_iflag: 25856,
            c_oflag: 5,
            c_cflag: 191,
            c_lflag: 35387,
            c_cc: [
              0x03, 0x1c, 0x7f, 0x15, 0x04, 0x00, 0x01, 0x00, 0x11, 0x13, 0x1a, 0x00,
              0x12, 0x0f, 0x17, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
              0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            ]
          };
        },
  ioctl_tcsets(tty, optional_actions, data) {
          // currently just ignore
          return 0;
        },
  ioctl_tiocgwinsz(tty) {
          return [24, 80];
        },
  },
  default_tty1_ops:{
  put_char(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
  fsync(tty) {
          if (tty.output?.length > 0) {
            err(UTF8ArrayToString(tty.output));
            tty.output = [];
          }
        },
  },
  };
  
  
  var mmapAlloc = (size) => {
      abort('internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported');
    };
  var MEMFS = {
  ops_table:null,
  mount(mount) {
        return MEMFS.createNode(null, '/', 16895, 0);
      },
  createNode(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        MEMFS.ops_table ||= {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek
            }
          },
          file: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync
            }
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink
            },
            stream: {}
          },
          chrdev: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: FS.chrdev_stream_ops
          }
        };
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.atime = node.mtime = node.ctime = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
          parent.atime = parent.mtime = parent.ctime = node.atime;
        }
        return node;
      },
  getFileDataAsTypedArray(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },
  expandFileStorage(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
      },
  resizeFileStorage(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
        }
      },
  node_ops:{
  getattr(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.atime);
          attr.mtime = new Date(node.mtime);
          attr.ctime = new Date(node.ctime);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
  setattr(node, attr) {
          for (const key of ["mode", "atime", "mtime", "ctime"]) {
            if (attr[key] != null) {
              node[key] = attr[key];
            }
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
  lookup(parent, name) {
          throw new FS.ErrnoError(44);
        },
  mknod(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
  rename(old_node, new_dir, new_name) {
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e) {}
          if (new_node) {
            if (FS.isDir(old_node.mode)) {
              // if we're overwriting a directory at new_name, make sure it's empty.
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
            FS.hashRemoveNode(new_node);
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          new_dir.contents[new_name] = old_node;
          old_node.name = new_name;
          new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
        },
  unlink(parent, name) {
          delete parent.contents[name];
          parent.ctime = parent.mtime = Date.now();
        },
  rmdir(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.ctime = parent.mtime = Date.now();
        },
  readdir(node) {
          return ['.', '..', ...Object.keys(node.contents)];
        },
  symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 0o777 | 40960, 0);
          node.link = oldpath;
          return node;
        },
  readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        },
  },
  stream_ops:{
  read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },
  write(stream, buffer, offset, length, position, canOwn) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
          // If the buffer is located in main memory (HEAP), and if
          // memory can grow, we can't hold on to references of the
          // memory buffer, as they may get invalidated. That means we
          // need to do copy its contents.
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
  
          if (!length) return 0;
          var node = stream.node;
          node.mtime = node.ctime = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
  llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
  mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the
            // buffer we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            if (contents) {
              // Try to avoid unnecessary slices.
              if (position > 0 || position + length < contents.length) {
                if (contents.subarray) {
                  contents = contents.subarray(position, position + length);
                } else {
                  contents = Array.prototype.slice.call(contents, position, position + length);
                }
              }
              HEAP8.set(contents, ptr);
            }
          }
          return { ptr, allocated };
        },
  msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        },
  },
  };
  
  var asyncLoad = async (url) => {
      var arrayBuffer = await readAsync(url);
      assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
      return new Uint8Array(arrayBuffer);
    };
  
  
  var FS_createDataFile = (...args) => FS.createDataFile(...args);
  
  var getUniqueRunDependency = (id) => {
      var orig = id;
      while (1) {
        if (!runDependencyTracking[id]) return id;
        id = orig + Math.random();
      }
    };
  
  var preloadPlugins = [];
  var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
      // Ensure plugins are ready.
      if (typeof Browser != 'undefined') Browser.init();
  
      var handled = false;
      preloadPlugins.forEach((plugin) => {
        if (handled) return;
        if (plugin['canHandle'](fullname)) {
          plugin['handle'](byteArray, fullname, finish, onerror);
          handled = true;
        }
      });
      return handled;
    };
  var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
      // TODO we should allow people to just pass in a complete filename instead
      // of parent and name being that we just join them anyways
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency(`cp ${fullname}`); // might have several active requests for the same fullname
      function processData(byteArray) {
        function finish(byteArray) {
          preFinish?.();
          if (!dontCreateFile) {
            FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
          }
          onload?.();
          removeRunDependency(dep);
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
          onerror?.();
          removeRunDependency(dep);
        })) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency(dep);
      if (typeof url == 'string') {
        asyncLoad(url).then(processData, onerror);
      } else {
        processData(url);
      }
    };
  
  var FS_modeStringToFlags = (str) => {
      var flagModes = {
        'r': 0,
        'r+': 2,
        'w': 512 | 64 | 1,
        'w+': 512 | 64 | 2,
        'a': 1024 | 64 | 1,
        'a+': 1024 | 64 | 2,
      };
      var flags = flagModes[str];
      if (typeof flags == 'undefined') {
        throw new Error(`Unknown file open mode: ${str}`);
      }
      return flags;
    };
  
  var FS_getMode = (canRead, canWrite) => {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    };
  
  
  
  
  var strError = (errno) => UTF8ToString(_strerror(errno));
  
  var ERRNO_CODES = {
      'EPERM': 63,
      'ENOENT': 44,
      'ESRCH': 71,
      'EINTR': 27,
      'EIO': 29,
      'ENXIO': 60,
      'E2BIG': 1,
      'ENOEXEC': 45,
      'EBADF': 8,
      'ECHILD': 12,
      'EAGAIN': 6,
      'EWOULDBLOCK': 6,
      'ENOMEM': 48,
      'EACCES': 2,
      'EFAULT': 21,
      'ENOTBLK': 105,
      'EBUSY': 10,
      'EEXIST': 20,
      'EXDEV': 75,
      'ENODEV': 43,
      'ENOTDIR': 54,
      'EISDIR': 31,
      'EINVAL': 28,
      'ENFILE': 41,
      'EMFILE': 33,
      'ENOTTY': 59,
      'ETXTBSY': 74,
      'EFBIG': 22,
      'ENOSPC': 51,
      'ESPIPE': 70,
      'EROFS': 69,
      'EMLINK': 34,
      'EPIPE': 64,
      'EDOM': 18,
      'ERANGE': 68,
      'ENOMSG': 49,
      'EIDRM': 24,
      'ECHRNG': 106,
      'EL2NSYNC': 156,
      'EL3HLT': 107,
      'EL3RST': 108,
      'ELNRNG': 109,
      'EUNATCH': 110,
      'ENOCSI': 111,
      'EL2HLT': 112,
      'EDEADLK': 16,
      'ENOLCK': 46,
      'EBADE': 113,
      'EBADR': 114,
      'EXFULL': 115,
      'ENOANO': 104,
      'EBADRQC': 103,
      'EBADSLT': 102,
      'EDEADLOCK': 16,
      'EBFONT': 101,
      'ENOSTR': 100,
      'ENODATA': 116,
      'ETIME': 117,
      'ENOSR': 118,
      'ENONET': 119,
      'ENOPKG': 120,
      'EREMOTE': 121,
      'ENOLINK': 47,
      'EADV': 122,
      'ESRMNT': 123,
      'ECOMM': 124,
      'EPROTO': 65,
      'EMULTIHOP': 36,
      'EDOTDOT': 125,
      'EBADMSG': 9,
      'ENOTUNIQ': 126,
      'EBADFD': 127,
      'EREMCHG': 128,
      'ELIBACC': 129,
      'ELIBBAD': 130,
      'ELIBSCN': 131,
      'ELIBMAX': 132,
      'ELIBEXEC': 133,
      'ENOSYS': 52,
      'ENOTEMPTY': 55,
      'ENAMETOOLONG': 37,
      'ELOOP': 32,
      'EOPNOTSUPP': 138,
      'EPFNOSUPPORT': 139,
      'ECONNRESET': 15,
      'ENOBUFS': 42,
      'EAFNOSUPPORT': 5,
      'EPROTOTYPE': 67,
      'ENOTSOCK': 57,
      'ENOPROTOOPT': 50,
      'ESHUTDOWN': 140,
      'ECONNREFUSED': 14,
      'EADDRINUSE': 3,
      'ECONNABORTED': 13,
      'ENETUNREACH': 40,
      'ENETDOWN': 38,
      'ETIMEDOUT': 73,
      'EHOSTDOWN': 142,
      'EHOSTUNREACH': 23,
      'EINPROGRESS': 26,
      'EALREADY': 7,
      'EDESTADDRREQ': 17,
      'EMSGSIZE': 35,
      'EPROTONOSUPPORT': 66,
      'ESOCKTNOSUPPORT': 137,
      'EADDRNOTAVAIL': 4,
      'ENETRESET': 39,
      'EISCONN': 30,
      'ENOTCONN': 53,
      'ETOOMANYREFS': 141,
      'EUSERS': 136,
      'EDQUOT': 19,
      'ESTALE': 72,
      'ENOTSUP': 138,
      'ENOMEDIUM': 148,
      'EILSEQ': 25,
      'EOVERFLOW': 61,
      'ECANCELED': 11,
      'ENOTRECOVERABLE': 56,
      'EOWNERDEAD': 62,
      'ESTRPIPE': 135,
    };
  var FS = {
  root:null,
  mounts:[],
  devices:{
  },
  streams:[],
  nextInode:1,
  nameTable:null,
  currentPath:"/",
  initialized:false,
  ignorePermissions:true,
  filesystems:null,
  syncFSRequests:0,
  readFiles:{
  },
  ErrnoError:class extends Error {
        name = 'ErrnoError';
        // We set the `name` property to be able to identify `FS.ErrnoError`
        // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
        // - when using PROXYFS, an error can come from an underlying FS
        // as different FS objects have their own FS.ErrnoError each,
        // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
        // we'll use the reliable test `err.name == "ErrnoError"` instead
        constructor(errno) {
          super(runtimeInitialized ? strError(errno) : '');
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
        }
      },
  FSStream:class {
        shared = {};
        get object() {
          return this.node;
        }
        set object(val) {
          this.node = val;
        }
        get isRead() {
          return (this.flags & 2097155) !== 1;
        }
        get isWrite() {
          return (this.flags & 2097155) !== 0;
        }
        get isAppend() {
          return (this.flags & 1024);
        }
        get flags() {
          return this.shared.flags;
        }
        set flags(val) {
          this.shared.flags = val;
        }
        get position() {
          return this.shared.position;
        }
        set position(val) {
          this.shared.position = val;
        }
      },
  FSNode:class {
        node_ops = {};
        stream_ops = {};
        readMode = 292 | 73;
        writeMode = 146;
        mounted = null;
        constructor(parent, name, mode, rdev) {
          if (!parent) {
            parent = this;  // root node sets parent to itself
          }
          this.parent = parent;
          this.mount = parent.mount;
          this.id = FS.nextInode++;
          this.name = name;
          this.mode = mode;
          this.rdev = rdev;
          this.atime = this.mtime = this.ctime = Date.now();
        }
        get read() {
          return (this.mode & this.readMode) === this.readMode;
        }
        set read(val) {
          val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
        }
        get write() {
          return (this.mode & this.writeMode) === this.writeMode;
        }
        set write(val) {
          val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
        }
        get isFolder() {
          return FS.isDir(this.mode);
        }
        get isDevice() {
          return FS.isChrdev(this.mode);
        }
      },
  lookupPath(path, opts = {}) {
        if (!path) {
          throw new FS.ErrnoError(44);
        }
        opts.follow_mount ??= true
  
        if (!PATH.isAbs(path)) {
          path = FS.cwd() + '/' + path;
        }
  
        // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
        linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
          // split the absolute path
          var parts = path.split('/').filter((p) => !!p);
  
          // start at the root
          var current = FS.root;
          var current_path = '/';
  
          for (var i = 0; i < parts.length; i++) {
            var islast = (i === parts.length-1);
            if (islast && opts.parent) {
              // stop resolving
              break;
            }
  
            if (parts[i] === '.') {
              continue;
            }
  
            if (parts[i] === '..') {
              current_path = PATH.dirname(current_path);
              if (FS.isRoot(current)) {
                path = current_path + '/' + parts.slice(i + 1).join('/');
                continue linkloop;
              } else {
                current = current.parent;
              }
              continue;
            }
  
            current_path = PATH.join2(current_path, parts[i]);
            try {
              current = FS.lookupNode(current, parts[i]);
            } catch (e) {
              // if noent_okay is true, suppress a ENOENT in the last component
              // and return an object with an undefined node. This is needed for
              // resolving symlinks in the path when creating a file.
              if ((e?.errno === 44) && islast && opts.noent_okay) {
                return { path: current_path };
              }
              throw e;
            }
  
            // jump to the mount's root node if this is a mountpoint
            if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
              current = current.mounted.root;
            }
  
            // by default, lookupPath will not follow a symlink if it is the final path component.
            // setting opts.follow = true will override this behavior.
            if (FS.isLink(current.mode) && (!islast || opts.follow)) {
              if (!current.node_ops.readlink) {
                throw new FS.ErrnoError(52);
              }
              var link = current.node_ops.readlink(current);
              if (!PATH.isAbs(link)) {
                link = PATH.dirname(current_path) + '/' + link;
              }
              path = link + '/' + parts.slice(i + 1).join('/');
              continue linkloop;
            }
          }
          return { path: current_path, node: current };
        }
        throw new FS.ErrnoError(32);
      },
  getPath(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? `${mount}/${path}` : mount + path;
          }
          path = path ? `${node.name}/${path}` : node.name;
          node = node.parent;
        }
      },
  hashName(parentid, name) {
        var hash = 0;
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },
  hashAddNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
  hashRemoveNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },
  lookupNode(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },
  createNode(parent, name, mode, rdev) {
        assert(typeof parent == 'object')
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },
  destroyNode(node) {
        FS.hashRemoveNode(node);
      },
  isRoot(node) {
        return node === node.parent;
      },
  isMountpoint(node) {
        return !!node.mounted;
      },
  isFile(mode) {
        return (mode & 61440) === 32768;
      },
  isDir(mode) {
        return (mode & 61440) === 16384;
      },
  isLink(mode) {
        return (mode & 61440) === 40960;
      },
  isChrdev(mode) {
        return (mode & 61440) === 8192;
      },
  isBlkdev(mode) {
        return (mode & 61440) === 24576;
      },
  isFIFO(mode) {
        return (mode & 61440) === 4096;
      },
  isSocket(mode) {
        return (mode & 49152) === 49152;
      },
  flagsToPermissionString(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },
  nodePermissions(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },
  mayLookup(dir) {
        if (!FS.isDir(dir.mode)) return 54;
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },
  mayCreate(dir, name) {
        if (!FS.isDir(dir.mode)) {
          return 54;
        }
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },
  mayDelete(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },
  mayOpen(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' // opening for write
              || (flags & (512 | 64))) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
  checkOpExists(op, err) {
        if (!op) {
          throw new FS.ErrnoError(err);
        }
        return op;
      },
  MAX_OPEN_FDS:4096,
  nextfd() {
        for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
  getStreamChecked(fd) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        return stream;
      },
  getStream:(fd) => FS.streams[fd],
  createStream(stream, fd = -1) {
        assert(fd >= -1);
  
        // clone it, so we can return an instance of FSStream
        stream = Object.assign(new FS.FSStream(), stream);
        if (fd == -1) {
          fd = FS.nextfd();
        }
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
  closeStream(fd) {
        FS.streams[fd] = null;
      },
  dupStream(origStream, fd = -1) {
        var stream = FS.createStream(origStream, fd);
        stream.stream_ops?.dup?.(stream);
        return stream;
      },
  doSetAttr(stream, node, attr) {
        var setattr = stream?.stream_ops.setattr;
        var arg = setattr ? stream : node;
        setattr ??= node.node_ops.setattr;
        FS.checkOpExists(setattr, 63)
        setattr(arg, attr);
      },
  chrdev_stream_ops:{
  open(stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          stream.stream_ops.open?.(stream);
        },
  llseek() {
          throw new FS.ErrnoError(70);
        },
  },
  major:(dev) => ((dev) >> 8),
  minor:(dev) => ((dev) & 0xff),
  makedev:(ma, mi) => ((ma) << 8 | (mi)),
  registerDevice(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },
  getDevice:(dev) => FS.devices[dev],
  getMounts(mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push(...m.mounts);
        }
  
        return mounts;
      },
  syncfs(populate, callback) {
        if (typeof populate == 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },
  mount(type, opts, mountpoint) {
        if (typeof type == 'string') {
          // The filesystem was not included, and instead we have an error
          // message stored in the variable.
          throw type;
        }
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type,
          opts,
          mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },
  unmount(mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },
  lookup(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },
  mknod(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name) {
          throw new FS.ErrnoError(28);
        }
        if (name === '.' || name === '..') {
          throw new FS.ErrnoError(20);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },
  statfs(path) {
        return FS.statfsNode(FS.lookupPath(path, {follow: true}).node);
      },
  statfsStream(stream) {
        // We keep a separate statfsStream function because noderawfs overrides
        // it. In noderawfs, stream.node is sometimes null. Instead, we need to
        // look at stream.path.
        return FS.statfsNode(stream.node);
      },
  statfsNode(node) {
        // NOTE: None of the defaults here are true. We're just returning safe and
        //       sane values. Currently nodefs and rawfs replace these defaults,
        //       other file systems leave them alone.
        var rtn = {
          bsize: 4096,
          frsize: 4096,
          blocks: 1e6,
          bfree: 5e5,
          bavail: 5e5,
          files: FS.nextInode,
          ffree: FS.nextInode - 1,
          fsid: 42,
          flags: 2,
          namelen: 255,
        };
  
        if (node.node_ops.statfs) {
          Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
        }
        return rtn;
      },
  create(path, mode = 0o666) {
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
  mkdir(path, mode = 0o777) {
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
  mkdirTree(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var dir of dirs) {
          if (!dir) continue;
          if (d || PATH.isAbs(path)) d += '/';
          d += dir;
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },
  mkdev(path, mode, dev) {
        if (typeof dev == 'undefined') {
          dev = mode;
          mode = 0o666;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
  symlink(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },
  rename(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existent directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
          // update old node (we do this here to avoid each backend
          // needing to)
          old_node.parent = new_dir;
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },
  rmdir(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },
  readdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
        return readdir(node);
      },
  unlink(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },
  readlink(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return link.node_ops.readlink(link);
      },
  stat(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
        return getattr(node);
      },
  fstat(fd) {
        var stream = FS.getStreamChecked(fd);
        var node = stream.node;
        var getattr = stream.stream_ops.getattr;
        var arg = getattr ? stream : node;
        getattr ??= node.node_ops.getattr;
        FS.checkOpExists(getattr, 63)
        return getattr(arg);
      },
  lstat(path) {
        return FS.stat(path, true);
      },
  doChmod(stream, node, mode, dontFollow) {
        FS.doSetAttr(stream, node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          ctime: Date.now(),
          dontFollow
        });
      },
  chmod(path, mode, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        FS.doChmod(null, node, mode, dontFollow);
      },
  lchmod(path, mode) {
        FS.chmod(path, mode, true);
      },
  fchmod(fd, mode) {
        var stream = FS.getStreamChecked(fd);
        FS.doChmod(stream, stream.node, mode, false);
      },
  doChown(stream, node, dontFollow) {
        FS.doSetAttr(stream, node, {
          timestamp: Date.now(),
          dontFollow
          // we ignore the uid / gid for now
        });
      },
  chown(path, uid, gid, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        FS.doChown(null, node, dontFollow);
      },
  lchown(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },
  fchown(fd, uid, gid) {
        var stream = FS.getStreamChecked(fd);
        FS.doChown(stream, stream.node, false);
      },
  doTruncate(stream, node, len) {
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.doSetAttr(stream, node, {
          size: len,
          timestamp: Date.now()
        });
      },
  truncate(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        FS.doTruncate(null, node, len);
      },
  ftruncate(fd, len) {
        var stream = FS.getStreamChecked(fd);
        if (len < 0 || (stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.doTruncate(stream, stream.node, len);
      },
  utime(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        var setattr = FS.checkOpExists(node.node_ops.setattr, 63);
        setattr(node, {
          atime: atime,
          mtime: mtime
        });
      },
  open(path, flags, mode = 0o666) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == 'string' ? FS_modeStringToFlags(flags) : flags;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        var isDirPath;
        if (typeof path == 'object') {
          node = path;
        } else {
          isDirPath = path.endsWith("/");
          // noent_okay makes it so that if the final component of the path
          // doesn't exist, lookupPath returns `node: undefined`. `path` will be
          // updated to point to the target of all symlinks.
          var lookup = FS.lookupPath(path, {
            follow: !(flags & 131072),
            noent_okay: true
          });
          node = lookup.node;
          path = lookup.path;
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else if (isDirPath) {
            throw new FS.ErrnoError(31);
          } else {
            // node doesn't exist, try to create it
            // Ignore the permission bits here to ensure we can `open` this new
            // file below. We use chmod below the apply the permissions once the
            // file is open.
            node = FS.mknod(path, mode | 0o777, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512) && !created) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        });
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (created) {
          FS.chmod(node, mode & 0o777);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },
  close(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },
  isClosed(stream) {
        return stream.fd === null;
      },
  llseek(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
  read(stream, buffer, offset, length, position) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
  write(stream, buffer, offset, length, position, canOwn) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },
  mmap(stream, length, position, prot, flags) {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        if (!length) {
          throw new FS.ErrnoError(28);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },
  msync(stream, buffer, offset, length, mmapFlags) {
        assert(offset >= 0);
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },
  ioctl(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
  readFile(path, opts = {}) {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error(`Invalid encoding type "${opts.encoding}"`);
        }
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          buf = UTF8ArrayToString(buf);
        }
        FS.close(stream);
        return buf;
      },
  writeFile(path, data, opts = {}) {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == 'string') {
          data = new Uint8Array(intArrayFromString(data, true));
        }
        if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },
  cwd:() => FS.currentPath,
  chdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },
  createDefaultDirectories() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },
  createDefaultDevices() {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
          llseek: () => 0,
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using err() rather than out()
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        // use a buffer to avoid overhead of individual crypto calls per byte
        var randomBuffer = new Uint8Array(1024), randomLeft = 0;
        var randomByte = () => {
          if (randomLeft === 0) {
            randomFill(randomBuffer);
            randomLeft = randomBuffer.byteLength;
          }
          return randomBuffer[--randomLeft];
        };
        FS.createDevice('/dev', 'random', randomByte);
        FS.createDevice('/dev', 'urandom', randomByte);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },
  createSpecialDirectories() {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
        // name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount() {
            var node = FS.createNode(proc_self, 'fd', 16895, 73);
            node.stream_ops = {
              llseek: MEMFS.stream_ops.llseek,
            };
            node.node_ops = {
              lookup(parent, name) {
                var fd = +name;
                var stream = FS.getStreamChecked(fd);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: () => stream.path },
                  id: fd + 1,
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              },
              readdir() {
                return Array.from(FS.streams.entries())
                  .filter(([k, v]) => v)
                  .map(([k, v]) => k.toString());
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },
  createStandardStreams(input, output, error) {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (input) {
          FS.createDevice('/dev', 'stdin', input);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (output) {
          FS.createDevice('/dev', 'stdout', null, output);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (error) {
          FS.createDevice('/dev', 'stderr', null, error);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
        assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
        assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
        assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
      },
  staticInit() {
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
        };
      },
  init(input, output, error) {
        assert(!FS.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.initialized = true;
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        input ??= Module['stdin'];
        output ??= Module['stdout'];
        error ??= Module['stderr'];
  
        FS.createStandardStreams(input, output, error);
      },
  quit() {
        FS.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        _fflush(0);
        // close all of our streams
        for (var stream of FS.streams) {
          if (stream) {
            FS.close(stream);
          }
        }
      },
  findObject(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },
  analyzePath(path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },
  createPath(parent, path, canRead, canWrite) {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            if (e.errno != 20) throw e;
          }
          parent = current;
        }
        return current;
      },
  createFile(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
  createDataFile(parent, name, data, canRead, canWrite, canOwn) {
        var path = name;
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS_getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
      },
  createDevice(parent, name, input, output) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(!!input, !!output);
        FS.createDevice.major ??= 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open(stream) {
            stream.seekable = false;
          },
          close(stream) {
            // flush any pending line data
            if (output?.buffer?.length) {
              output(10);
            }
          },
          read(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.atime = Date.now();
            }
            return bytesRead;
          },
          write(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.mtime = stream.node.ctime = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },
  forceLoadFile(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else { // Command-line.
          try {
            obj.contents = readBinary(obj.url);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
      },
  createLazyFile(parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array).
        // Actual getting is abstracted away for eventual reuse.
        class LazyUint8Array {
          lengthKnown = false;
          chunks = []; // Loaded chunks. Index is the chunk number
          get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = (idx / this.chunkSize)|0;
            return this.getter(chunkNum)[chunkOffset];
          }
          setDataGetter(getter) {
            this.getter = getter;
          }
          cacheLength() {
            // Find length
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, false);
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            var datalength = Number(xhr.getResponseHeader("Content-length"));
            var header;
            var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
            var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
            var chunkSize = 1024*1024; // Chunk size in bytes
  
            if (!hasByteServing) chunkSize = datalength;
  
            // Function to get a range from the remote URL.
            var doXHR = (from, to) => {
              if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
              if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
              // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, false);
              if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
              // Some hints to the browser that we want binary data.
              xhr.responseType = 'arraybuffer';
              if (xhr.overrideMimeType) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
              }
  
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              if (xhr.response !== undefined) {
                return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
              }
              return intArrayFromString(xhr.responseText || '', true);
            };
            var lazyArray = this;
            lazyArray.setDataGetter((chunkNum) => {
              var start = chunkNum * chunkSize;
              var end = (chunkNum+1) * chunkSize - 1; // including this byte
              end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
                lazyArray.chunks[chunkNum] = doXHR(start, end);
              }
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') throw new Error('doXHR failed!');
              return lazyArray.chunks[chunkNum];
            });
  
            if (usesGzip || !datalength) {
              // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
              chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
              datalength = this.getter(0).length;
              chunkSize = datalength;
              out("LazyFiles on gzip forces download of the whole file when length is accessed");
            }
  
            this._length = datalength;
            this._chunkSize = chunkSize;
            this.lengthKnown = true;
          }
          get length() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._length;
          }
          get chunkSize() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._chunkSize;
          }
        }
  
        if (typeof XMLHttpRequest != 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = (...args) => {
            FS.forceLoadFile(node);
            return fn(...args);
          };
        });
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        // use a custom read function
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer, offset, length, position)
        };
        // use a custom mmap function
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return { ptr, allocated: true };
        };
        node.stream_ops = stream_ops;
        return node;
      },
  absolutePath() {
        abort('FS.absolutePath has been removed; use PATH_FS.resolve instead');
      },
  createFolder() {
        abort('FS.createFolder has been removed; use FS.mkdir instead');
      },
  createLink() {
        abort('FS.createLink has been removed; use FS.symlink instead');
      },
  joinPath() {
        abort('FS.joinPath has been removed; use PATH.join instead');
      },
  mmapAlloc() {
        abort('FS.mmapAlloc has been replaced by the top level function mmapAlloc');
      },
  standardizePath() {
        abort('FS.standardizePath has been removed; use PATH.normalize instead');
      },
  };
  
  var SYSCALLS = {
  DEFAULT_POLLMASK:5,
  calculateAt(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        // relative path
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);;
          }
          return dir;
        }
        return dir + '/' + path;
      },
  writeStat(buf, stat) {
        HEAP32[((buf)>>2)] = stat.dev;
        HEAP32[(((buf)+(4))>>2)] = stat.mode;
        HEAPU32[(((buf)+(8))>>2)] = stat.nlink;
        HEAP32[(((buf)+(12))>>2)] = stat.uid;
        HEAP32[(((buf)+(16))>>2)] = stat.gid;
        HEAP32[(((buf)+(20))>>2)] = stat.rdev;
        HEAP64[(((buf)+(24))>>3)] = BigInt(stat.size);
        HEAP32[(((buf)+(32))>>2)] = 4096;
        HEAP32[(((buf)+(36))>>2)] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        HEAP64[(((buf)+(40))>>3)] = BigInt(Math.floor(atime / 1000));
        HEAPU32[(((buf)+(48))>>2)] = (atime % 1000) * 1000 * 1000;
        HEAP64[(((buf)+(56))>>3)] = BigInt(Math.floor(mtime / 1000));
        HEAPU32[(((buf)+(64))>>2)] = (mtime % 1000) * 1000 * 1000;
        HEAP64[(((buf)+(72))>>3)] = BigInt(Math.floor(ctime / 1000));
        HEAPU32[(((buf)+(80))>>2)] = (ctime % 1000) * 1000 * 1000;
        HEAP64[(((buf)+(88))>>3)] = BigInt(stat.ino);
        return 0;
      },
  writeStatFs(buf, stats) {
        HEAP32[(((buf)+(4))>>2)] = stats.bsize;
        HEAP32[(((buf)+(40))>>2)] = stats.bsize;
        HEAP32[(((buf)+(8))>>2)] = stats.blocks;
        HEAP32[(((buf)+(12))>>2)] = stats.bfree;
        HEAP32[(((buf)+(16))>>2)] = stats.bavail;
        HEAP32[(((buf)+(20))>>2)] = stats.files;
        HEAP32[(((buf)+(24))>>2)] = stats.ffree;
        HEAP32[(((buf)+(28))>>2)] = stats.fsid;
        HEAP32[(((buf)+(44))>>2)] = stats.flags;  // ST_NOSUID
        HEAP32[(((buf)+(36))>>2)] = stats.namelen;
      },
  doMsync(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          // MAP_PRIVATE calls need not to be synced back to underlying fs
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },
  getStreamFromFD(fd) {
        var stream = FS.getStreamChecked(fd);
        return stream;
      },
  varargs:undefined,
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  };
  function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = syscallGetVarargI();
          if (arg < 0) {
            return -28;
          }
          while (FS.streams[arg]) {
            arg++;
          }
          var newStream;
          newStream = FS.dupStream(stream, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = syscallGetVarargI();
          stream.flags |= arg;
          return 0;
        }
        case 12: {
          var arg = syscallGetVarargP();
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)] = 2;
          return 0;
        }
        case 13:
        case 14:
          // Pretend that the locking is successful. These are process-level locks,
          // and Emscripten programs are a single process. If we supported linking a
          // filesystem between programs, we'd need to do more here.
          // See https://github.com/emscripten-core/emscripten/issues/23697
          return 0;
      }
      return -28;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_fdatasync(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      return 0; // we can't do anything synchronously; the in-memory FS is already synced to
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_fstat64(fd, buf) {
  try {
  
      return SYSCALLS.writeStat(buf, FS.fstat(fd));
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  
  function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21505: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcgets) {
            var termios = stream.tty.ops.ioctl_tcgets(stream);
            var argp = syscallGetVarargP();
            HEAP32[((argp)>>2)] = termios.c_iflag || 0;
            HEAP32[(((argp)+(4))>>2)] = termios.c_oflag || 0;
            HEAP32[(((argp)+(8))>>2)] = termios.c_cflag || 0;
            HEAP32[(((argp)+(12))>>2)] = termios.c_lflag || 0;
            for (var i = 0; i < 32; i++) {
              HEAP8[(argp + i)+(17)] = termios.c_cc[i] || 0;
            }
            return 0;
          }
          return 0;
        }
        case 21510:
        case 21511:
        case 21512: {
          if (!stream.tty) return -59;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcsets) {
            var argp = syscallGetVarargP();
            var c_iflag = HEAP32[((argp)>>2)];
            var c_oflag = HEAP32[(((argp)+(4))>>2)];
            var c_cflag = HEAP32[(((argp)+(8))>>2)];
            var c_lflag = HEAP32[(((argp)+(12))>>2)];
            var c_cc = []
            for (var i = 0; i < 32; i++) {
              c_cc.push(HEAP8[(argp + i)+(17)]);
            }
            return stream.tty.ops.ioctl_tcsets(stream.tty, op, { c_iflag, c_oflag, c_cflag, c_lflag, c_cc });
          }
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = syscallGetVarargP();
          HEAP32[((argp)>>2)] = 0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28; // not supported
        }
        case 21531: {
          var argp = syscallGetVarargP();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tiocgwinsz) {
            var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
            var argp = syscallGetVarargP();
            HEAP16[((argp)>>1)] = winsize[0];
            HEAP16[(((argp)+(2))>>1)] = winsize[1];
          }
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -59;
          return 0;
        }
        case 21515: {
          if (!stream.tty) return -59;
          return 0;
        }
        default: return -28; // not supported
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_lstat64(path, buf) {
  try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.writeStat(buf, FS.lstat(path));
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_newfstatat(dirfd, path, buf, flags) {
  try {
  
      path = SYSCALLS.getStr(path);
      var nofollow = flags & 256;
      var allowEmpty = flags & 4096;
      flags = flags & (~6400);
      assert(!flags, `unknown flags in __syscall_newfstatat: ${flags}`);
      path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
      return SYSCALLS.writeStat(buf, nofollow ? FS.lstat(path) : FS.stat(path));
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  
  function ___syscall_openat(dirfd, path, flags, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      var mode = varargs ? syscallGetVarargI() : 0;
      return FS.open(path, flags, mode).fd;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_stat64(path, buf) {
  try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.writeStat(buf, FS.stat(path));
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  var __abort_js = () =>
      abort('native code called abort()');

  var INT53_MAX = 9007199254740992;
  
  var INT53_MIN = -9007199254740992;
  var bigintToI53Checked = (num) => (num < INT53_MIN || num > INT53_MAX) ? NaN : Number(num);
  function __gmtime_js(time, tmPtr) {
    time = bigintToI53Checked(time);
  
  
      var date = new Date(time * 1000);
      HEAP32[((tmPtr)>>2)] = date.getUTCSeconds();
      HEAP32[(((tmPtr)+(4))>>2)] = date.getUTCMinutes();
      HEAP32[(((tmPtr)+(8))>>2)] = date.getUTCHours();
      HEAP32[(((tmPtr)+(12))>>2)] = date.getUTCDate();
      HEAP32[(((tmPtr)+(16))>>2)] = date.getUTCMonth();
      HEAP32[(((tmPtr)+(20))>>2)] = date.getUTCFullYear()-1900;
      HEAP32[(((tmPtr)+(24))>>2)] = date.getUTCDay();
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = ((date.getTime() - start) / (1000 * 60 * 60 * 24))|0;
      HEAP32[(((tmPtr)+(28))>>2)] = yday;
    ;
  }

  var isLeapYear = (year) => year%4 === 0 && (year%100 !== 0 || year%400 === 0);
  
  var MONTH_DAYS_LEAP_CUMULATIVE = [0,31,60,91,121,152,182,213,244,274,305,335];
  
  var MONTH_DAYS_REGULAR_CUMULATIVE = [0,31,59,90,120,151,181,212,243,273,304,334];
  var ydayFromDate = (date) => {
      var leap = isLeapYear(date.getFullYear());
      var monthDaysCumulative = (leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE);
      var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1; // -1 since it's days since Jan 1
  
      return yday;
    };
  
  function __localtime_js(time, tmPtr) {
    time = bigintToI53Checked(time);
  
  
      var date = new Date(time*1000);
      HEAP32[((tmPtr)>>2)] = date.getSeconds();
      HEAP32[(((tmPtr)+(4))>>2)] = date.getMinutes();
      HEAP32[(((tmPtr)+(8))>>2)] = date.getHours();
      HEAP32[(((tmPtr)+(12))>>2)] = date.getDate();
      HEAP32[(((tmPtr)+(16))>>2)] = date.getMonth();
      HEAP32[(((tmPtr)+(20))>>2)] = date.getFullYear()-1900;
      HEAP32[(((tmPtr)+(24))>>2)] = date.getDay();
  
      var yday = ydayFromDate(date)|0;
      HEAP32[(((tmPtr)+(28))>>2)] = yday;
      HEAP32[(((tmPtr)+(36))>>2)] = -(date.getTimezoneOffset() * 60);
  
      // Attention: DST is in December in South, and some regions don't have DST at all.
      var start = new Date(date.getFullYear(), 0, 1);
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset))|0;
      HEAP32[(((tmPtr)+(32))>>2)] = dst;
    ;
  }

  
  var __mktime_js = function(tmPtr) {
  
  var ret = (() => { 
      var date = new Date(HEAP32[(((tmPtr)+(20))>>2)] + 1900,
                          HEAP32[(((tmPtr)+(16))>>2)],
                          HEAP32[(((tmPtr)+(12))>>2)],
                          HEAP32[(((tmPtr)+(8))>>2)],
                          HEAP32[(((tmPtr)+(4))>>2)],
                          HEAP32[((tmPtr)>>2)],
                          0);
  
      // There's an ambiguous hour when the time goes back; the tm_isdst field is
      // used to disambiguate it.  Date() basically guesses, so we fix it up if it
      // guessed wrong, or fill in tm_isdst with the guess if it's -1.
      var dst = HEAP32[(((tmPtr)+(32))>>2)];
      var guessedOffset = date.getTimezoneOffset();
      var start = new Date(date.getFullYear(), 0, 1);
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dstOffset = Math.min(winterOffset, summerOffset); // DST is in December in South
      if (dst < 0) {
        // Attention: some regions don't have DST at all.
        HEAP32[(((tmPtr)+(32))>>2)] = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
      } else if ((dst > 0) != (dstOffset == guessedOffset)) {
        var nonDstOffset = Math.max(winterOffset, summerOffset);
        var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
        // Don't try setMinutes(date.getMinutes() + ...) -- it's messed up.
        date.setTime(date.getTime() + (trueOffset - guessedOffset)*60000);
      }
  
      HEAP32[(((tmPtr)+(24))>>2)] = date.getDay();
      var yday = ydayFromDate(date)|0;
      HEAP32[(((tmPtr)+(28))>>2)] = yday;
      // To match expected behavior, update fields from date
      HEAP32[((tmPtr)>>2)] = date.getSeconds();
      HEAP32[(((tmPtr)+(4))>>2)] = date.getMinutes();
      HEAP32[(((tmPtr)+(8))>>2)] = date.getHours();
      HEAP32[(((tmPtr)+(12))>>2)] = date.getDate();
      HEAP32[(((tmPtr)+(16))>>2)] = date.getMonth();
      HEAP32[(((tmPtr)+(20))>>2)] = date.getYear();
  
      var timeMs = date.getTime();
      if (isNaN(timeMs)) {
        return -1;
      }
      // Return time in microseconds
      return timeMs / 1000;
     })();
  return BigInt(ret);
  };

  var __timegm_js = function(tmPtr) {
  
  var ret = (() => { 
      var time = Date.UTC(HEAP32[(((tmPtr)+(20))>>2)] + 1900,
                          HEAP32[(((tmPtr)+(16))>>2)],
                          HEAP32[(((tmPtr)+(12))>>2)],
                          HEAP32[(((tmPtr)+(8))>>2)],
                          HEAP32[(((tmPtr)+(4))>>2)],
                          HEAP32[((tmPtr)>>2)],
                          0);
      var date = new Date(time);
  
      HEAP32[(((tmPtr)+(24))>>2)] = date.getUTCDay();
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = ((date.getTime() - start) / (1000 * 60 * 60 * 24))|0;
      HEAP32[(((tmPtr)+(28))>>2)] = yday;
  
      return date.getTime() / 1000;
     })();
  return BigInt(ret);
  };

  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  
  var __tzset_js = (timezone, daylight, std_name, dst_name) => {
      // TODO: Use (malleable) environment variables instead of system settings.
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
  
      // Local standard timezone offset. Local standard time is not adjusted for
      // daylight savings.  This code uses the fact that getTimezoneOffset returns
      // a greater value during Standard Time versus Daylight Saving Time (DST).
      // Thus it determines the expected output during Standard Time, and it
      // compares whether the output of the given date the same (Standard) or less
      // (DST).
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
  
      // timezone is specified as seconds west of UTC ("The external variable
      // `timezone` shall be set to the difference, in seconds, between
      // Coordinated Universal Time (UTC) and local standard time."), the same
      // as returned by stdTimezoneOffset.
      // See http://pubs.opengroup.org/onlinepubs/009695399/functions/tzset.html
      HEAPU32[((timezone)>>2)] = stdTimezoneOffset * 60;
  
      HEAP32[((daylight)>>2)] = Number(winterOffset != summerOffset);
  
      var extractZone = (timezoneOffset) => {
        // Why inverse sign?
        // Read here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
        var sign = timezoneOffset >= 0 ? "-" : "+";
  
        var absOffset = Math.abs(timezoneOffset)
        var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
        var minutes = String(absOffset % 60).padStart(2, "0");
  
        return `UTC${sign}${hours}${minutes}`;
      }
  
      var winterName = extractZone(winterOffset);
      var summerName = extractZone(summerOffset);
      assert(winterName);
      assert(summerName);
      assert(lengthBytesUTF8(winterName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${winterName})`);
      assert(lengthBytesUTF8(summerName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${summerName})`);
      if (summerOffset < winterOffset) {
        // Northern hemisphere
        stringToUTF8(winterName, std_name, 17);
        stringToUTF8(summerName, dst_name, 17);
      } else {
        stringToUTF8(winterName, dst_name, 17);
        stringToUTF8(summerName, std_name, 17);
      }
    };

  var _emscripten_get_now = () => performance.now();
  
  var _emscripten_date_now = () => Date.now();
  
  var nowIsMonotonic = 1;
  
  var checkWasiClock = (clock_id) => clock_id >= 0 && clock_id <= 3;
  
  function _clock_time_get(clk_id, ignored_precision, ptime) {
    ignored_precision = bigintToI53Checked(ignored_precision);
  
  
      if (!checkWasiClock(clk_id)) {
        return 28;
      }
      var now;
      // all wasi clocks but realtime are monotonic
      if (clk_id === 0) {
        now = _emscripten_date_now();
      } else if (nowIsMonotonic) {
        now = _emscripten_get_now();
      } else {
        return 52;
      }
      // "now" is in ms, and wasi times are in ns.
      var nsec = Math.round(now * 1000 * 1000);
      HEAP64[((ptime)>>3)] = BigInt(nsec);
      return 0;
    ;
  }

  var readEmAsmArgsArray = [];
  var readEmAsmArgs = (sigPtr, buf) => {
      // Nobody should have mutated _readEmAsmArgsArray underneath us to be something else than an array.
      assert(Array.isArray(readEmAsmArgsArray));
      // The input buffer is allocated on the stack, so it must be stack-aligned.
      assert(buf % 16 == 0);
      readEmAsmArgsArray.length = 0;
      var ch;
      // Most arguments are i32s, so shift the buffer pointer so it is a plain
      // index into HEAP32.
      while (ch = HEAPU8[sigPtr++]) {
        var chr = String.fromCharCode(ch);
        var validChars = ['d', 'f', 'i', 'p'];
        // In WASM_BIGINT mode we support passing i64 values as bigint.
        validChars.push('j');
        assert(validChars.includes(chr), `Invalid character ${ch}("${chr}") in readEmAsmArgs! Use only [${validChars}], and do not specify "v" for void return argument.`);
        // Floats are always passed as doubles, so all types except for 'i'
        // are 8 bytes and require alignment.
        var wide = (ch != 105);
        wide &= (ch != 112);
        buf += wide && (buf % 8) ? 4 : 0;
        readEmAsmArgsArray.push(
          // Special case for pointers under wasm64 or CAN_ADDRESS_2GB mode.
          ch == 112 ? HEAPU32[((buf)>>2)] :
          ch == 106 ? HEAP64[((buf)>>3)] :
          ch == 105 ?
            HEAP32[((buf)>>2)] :
            HEAPF64[((buf)>>3)]
        );
        buf += wide ? 8 : 4;
      }
      return readEmAsmArgsArray;
    };
  var runMainThreadEmAsm = (emAsmAddr, sigPtr, argbuf, sync) => {
      var args = readEmAsmArgs(sigPtr, argbuf);
      assert(ASM_CONSTS.hasOwnProperty(emAsmAddr), `No EM_ASM constant found at address ${emAsmAddr}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
      return ASM_CONSTS[emAsmAddr](...args);
    };
  /** @suppress {duplicate } */
  var _emscripten_asm_const_int_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);
  var _emscripten_asm_const_double_sync_on_main_thread = _emscripten_asm_const_int_sync_on_main_thread;

  var runEmAsmFunction = (code, sigPtr, argbuf) => {
      var args = readEmAsmArgs(sigPtr, argbuf);
      assert(ASM_CONSTS.hasOwnProperty(code), `No EM_ASM constant found at address ${code}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
      return ASM_CONSTS[code](...args);
    };
  var _emscripten_asm_const_int = (code, sigPtr, argbuf) => {
      return runEmAsmFunction(code, sigPtr, argbuf);
    };


  var _emscripten_asm_const_ptr_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);

  
  var _emscripten_set_main_loop_timing = (mode, value) => {
      MainLoop.timingMode = mode;
      MainLoop.timingValue = value;
  
      if (!MainLoop.func) {
        err('emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.');
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (!MainLoop.running) {
        
        MainLoop.running = true;
      }
      if (mode == 0) {
        MainLoop.scheduler = function MainLoop_scheduler_setTimeout() {
          var timeUntilNextTick = Math.max(0, MainLoop.tickStartTime + value - _emscripten_get_now())|0;
          setTimeout(MainLoop.runner, timeUntilNextTick); // doing this each time means that on exception, we stop
        };
        MainLoop.method = 'timeout';
      } else if (mode == 1) {
        MainLoop.scheduler = function MainLoop_scheduler_rAF() {
          MainLoop.requestAnimationFrame(MainLoop.runner);
        };
        MainLoop.method = 'rAF';
      } else if (mode == 2) {
        if (typeof MainLoop.setImmediate == 'undefined') {
          if (typeof setImmediate == 'undefined') {
            // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
            var setImmediates = [];
            var emscriptenMainLoopMessageId = 'setimmediate';
            /** @param {Event} event */
            var MainLoop_setImmediate_messageHandler = (event) => {
              // When called in current thread or Worker, the main loop ID is structured slightly different to accommodate for --proxy-to-worker runtime listening to Worker events,
              // so check for both cases.
              if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                event.stopPropagation();
                setImmediates.shift()();
              }
            };
            addEventListener("message", MainLoop_setImmediate_messageHandler, true);
            MainLoop.setImmediate = /** @type{function(function(): ?, ...?): number} */((func) => {
              setImmediates.push(func);
              if (ENVIRONMENT_IS_WORKER) {
                Module['setImmediates'] ??= [];
                Module['setImmediates'].push(func);
                postMessage({target: emscriptenMainLoopMessageId}); // In --proxy-to-worker, route the message via proxyClient.js
              } else postMessage(emscriptenMainLoopMessageId, "*"); // On the main thread, can just send the message to itself.
            });
          } else {
            MainLoop.setImmediate = setImmediate;
          }
        }
        MainLoop.scheduler = function MainLoop_scheduler_setImmediate() {
          MainLoop.setImmediate(MainLoop.runner);
        };
        MainLoop.method = 'immediate';
      }
      return 0;
    };
  
  
  
  var runtimeKeepaliveCounter = 0;
  var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
  var _proc_exit = (code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        Module['onExit']?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
  
  
  /** @suppress {duplicate } */
  /** @param {boolean|number=} implicit */
  var exitJS = (status, implicit) => {
      EXITSTATUS = status;
  
      checkUnflushedContent();
  
      // if exit() was called explicitly, warn the user if the runtime isn't actually being shut down
      if (keepRuntimeAlive() && !implicit) {
        var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
        err(msg);
      }
  
      _proc_exit(status);
    };
  var _exit = exitJS;
  
  var handleException = (e) => {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      checkStackCookie();
      if (e instanceof WebAssembly.RuntimeError) {
        if (_emscripten_stack_get_current() <= 0) {
          err('Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)');
        }
      }
      quit_(1, e);
    };
  
  var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
  
    /**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */
  var setMainLoop = (iterFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
      assert(!MainLoop.func, 'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.');
      MainLoop.func = iterFunc;
      MainLoop.arg = arg;
  
      var thisMainLoopId = MainLoop.currentlyRunningMainloop;
      function checkIsRunning() {
        if (thisMainLoopId < MainLoop.currentlyRunningMainloop) {
          
          maybeExit();
          return false;
        }
        return true;
      }
  
      // We create the loop runner here but it is not actually running until
      // _emscripten_set_main_loop_timing is called (which might happen a
      // later time).  This member signifies that the current runner has not
      // yet been started so that we can call runtimeKeepalivePush when it
      // gets it timing set for the first time.
      MainLoop.running = false;
      MainLoop.runner = function MainLoop_runner() {
        if (ABORT) return;
        if (MainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = MainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (MainLoop.remainingBlockers) {
            var remaining = MainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              MainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              MainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          MainLoop.updateStatus();
  
          // catches pause/resume main loop from blocker execution
          if (!checkIsRunning()) return;
  
          setTimeout(MainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (!checkIsRunning()) return;
  
        // Implement very basic swap interval control
        MainLoop.currentFrameNumber = MainLoop.currentFrameNumber + 1 | 0;
        if (MainLoop.timingMode == 1 && MainLoop.timingValue > 1 && MainLoop.currentFrameNumber % MainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          MainLoop.scheduler();
          return;
        } else if (MainLoop.timingMode == 0) {
          MainLoop.tickStartTime = _emscripten_get_now();
        }
  
        if (MainLoop.method === 'timeout' && Module['ctx']) {
          warnOnce('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          MainLoop.method = ''; // just warn once per call to set main loop
        }
  
        MainLoop.runIter(iterFunc);
  
        // catch pauses from the main loop itself
        if (!checkIsRunning()) return;
  
        MainLoop.scheduler();
      }
  
      if (!noSetTiming) {
        if (fps > 0) {
          _emscripten_set_main_loop_timing(0, 1000.0 / fps);
        } else {
          // Do rAF by rendering each frame (no decimating)
          _emscripten_set_main_loop_timing(1, 1);
        }
  
        MainLoop.scheduler();
      }
  
      if (simulateInfiniteLoop) {
        throw 'unwind';
      }
    };
  
  
  var callUserCallback = (func) => {
      if (ABORT) {
        err('user callback triggered after runtime exited or application aborted.  Ignoring.');
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
  
  var MainLoop = {
  running:false,
  scheduler:null,
  method:"",
  currentlyRunningMainloop:0,
  func:null,
  arg:0,
  timingMode:0,
  timingValue:0,
  currentFrameNumber:0,
  queue:[],
  preMainLoop:[],
  postMainLoop:[],
  pause() {
        MainLoop.scheduler = null;
        // Incrementing this signals the previous main loop that it's now become old, and it must return.
        MainLoop.currentlyRunningMainloop++;
      },
  resume() {
        MainLoop.currentlyRunningMainloop++;
        var timingMode = MainLoop.timingMode;
        var timingValue = MainLoop.timingValue;
        var func = MainLoop.func;
        MainLoop.func = null;
        // do not set timing and call scheduler, we will do it on the next lines
        setMainLoop(func, 0, false, MainLoop.arg, true);
        _emscripten_set_main_loop_timing(timingMode, timingValue);
        MainLoop.scheduler();
      },
  updateStatus() {
        if (Module['setStatus']) {
          var message = Module['statusMessage'] || 'Please wait...';
          var remaining = MainLoop.remainingBlockers ?? 0;
          var expected = MainLoop.expectedBlockers ?? 0;
          if (remaining) {
            if (remaining < expected) {
              Module['setStatus'](`{message} ({expected - remaining}/{expected})`);
            } else {
              Module['setStatus'](message);
            }
          } else {
            Module['setStatus']('');
          }
        }
      },
  init() {
        Module['preMainLoop'] && MainLoop.preMainLoop.push(Module['preMainLoop']);
        Module['postMainLoop'] && MainLoop.postMainLoop.push(Module['postMainLoop']);
      },
  runIter(func) {
        if (ABORT) return;
        for (var pre of MainLoop.preMainLoop) {
          if (pre() === false) {
            return; // |return false| skips a frame
          }
        }
        callUserCallback(func);
        for (var post of MainLoop.postMainLoop) {
          post();
        }
        checkStackCookie();
      },
  nextRAF:0,
  fakeRequestAnimationFrame(func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (MainLoop.nextRAF === 0) {
          MainLoop.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= MainLoop.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            MainLoop.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(MainLoop.nextRAF - now, 0);
        setTimeout(func, delay);
      },
  requestAnimationFrame(func) {
        if (typeof requestAnimationFrame == 'function') {
          requestAnimationFrame(func);
          return;
        }
        var RAF = MainLoop.fakeRequestAnimationFrame;
        RAF(func);
      },
  };
  var _emscripten_cancel_main_loop = () => {
      MainLoop.pause();
      MainLoop.func = null;
    };


  var _emscripten_err = (str) => err(UTF8ToString(str));

  var onExits = [];
  var addOnExit = (cb) => onExits.push(cb);
  var JSEvents = {
  memcpy(target, src, size) {
        HEAP8.set(HEAP8.subarray(src, src + size), target);
      },
  removeAllEventListeners() {
        while (JSEvents.eventHandlers.length) {
          JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
        }
        JSEvents.deferredCalls = [];
      },
  inEventHandler:0,
  deferredCalls:[],
  deferCall(targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
          if (arrA.length != arrB.length) return false;
  
          for (var i in arrA) {
            if (arrA[i] != arrB[i]) return false;
          }
          return true;
        }
        // Test if the given call was already queued, and if so, don't add it again.
        for (var call of JSEvents.deferredCalls) {
          if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
            return;
          }
        }
        JSEvents.deferredCalls.push({
          targetFunction,
          precedence,
          argsList
        });
  
        JSEvents.deferredCalls.sort((x,y) => x.precedence < y.precedence);
      },
  removeDeferredCalls(targetFunction) {
        JSEvents.deferredCalls = JSEvents.deferredCalls.filter((call) => call.targetFunction != targetFunction);
      },
  canPerformEventHandlerRequests() {
        if (navigator.userActivation) {
          // Verify against transient activation status from UserActivation API
          // whether it is possible to perform a request here without needing to defer. See
          // https://developer.mozilla.org/en-US/docs/Web/Security/User_activation#transient_activation
          // and https://caniuse.com/mdn-api_useractivation
          // At the time of writing, Firefox does not support this API: https://bugzilla.mozilla.org/show_bug.cgi?id=1791079
          return navigator.userActivation.isActive;
        }
  
        return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
      },
  runDeferredCalls() {
        if (!JSEvents.canPerformEventHandlerRequests()) {
          return;
        }
        var deferredCalls = JSEvents.deferredCalls;
        JSEvents.deferredCalls = [];
        for (var call of deferredCalls) {
          call.targetFunction(...call.argsList);
        }
      },
  eventHandlers:[],
  removeAllHandlersOnTarget:(target, eventTypeString) => {
        for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
          if (JSEvents.eventHandlers[i].target == target &&
            (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
             JSEvents._removeHandler(i--);
           }
        }
      },
  _removeHandler(i) {
        var h = JSEvents.eventHandlers[i];
        h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
        JSEvents.eventHandlers.splice(i, 1);
      },
  registerOrRemoveHandler(eventHandler) {
        if (!eventHandler.target) {
          err('registerOrRemoveHandler: the target element for event handler registration does not exist, when processing the following event handler registration:');
          console.dir(eventHandler);
          return -4;
        }
        if (eventHandler.callbackfunc) {
          eventHandler.eventListenerFunc = function(event) {
            // Increment nesting count for the event handler.
            ++JSEvents.inEventHandler;
            JSEvents.currentEventHandler = eventHandler;
            // Process any old deferred calls the user has placed.
            JSEvents.runDeferredCalls();
            // Process the actual event, calls back to user C code handler.
            eventHandler.handlerFunc(event);
            // Process any new deferred calls that were placed right now from this event handler.
            JSEvents.runDeferredCalls();
            // Out of event handler - restore nesting count.
            --JSEvents.inEventHandler;
          };
  
          eventHandler.target.addEventListener(eventHandler.eventTypeString,
                                               eventHandler.eventListenerFunc,
                                               eventHandler.useCapture);
          JSEvents.eventHandlers.push(eventHandler);
        } else {
          for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (JSEvents.eventHandlers[i].target == eventHandler.target
             && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
               JSEvents._removeHandler(i--);
             }
          }
        }
        return 0;
      },
  getNodeNameForTarget(target) {
        if (!target) return '';
        if (target == window) return '#window';
        if (target == screen) return '#screen';
        return target?.nodeName || '';
      },
  fullscreenEnabled() {
        return document.fullscreenEnabled
        // Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitFullscreenEnabled.
        // TODO: If Safari at some point ships with unprefixed version, update the version check above.
        || document.webkitFullscreenEnabled
         ;
      },
  };
  
  /** @type {Object} */
  var specialHTMLTargets = [0, typeof document != 'undefined' ? document : 0, typeof window != 'undefined' ? window : 0];
  
  
  var maybeCStringToJsString = (cString) => {
      // "cString > 2" checks if the input is a number, and isn't of the special
      // values we accept here, EMSCRIPTEN_EVENT_TARGET_* (which map to 0, 1, 2).
      // In other words, if cString > 2 then it's a pointer to a valid place in
      // memory, and points to a C string.
      return cString > 2 ? UTF8ToString(cString) : cString;
    };
  
  /** @suppress {duplicate } */
  var findEventTarget = (target) => {
      target = maybeCStringToJsString(target);
      var domElement = specialHTMLTargets[target] || (typeof document != 'undefined' ? document.querySelector(target) : null);
      return domElement;
    };
  var findCanvasEventTarget = findEventTarget;
  var _emscripten_get_canvas_element_size = (target, width, height) => {
      var canvas = findCanvasEventTarget(target);
      if (!canvas) return -4;
      HEAP32[((width)>>2)] = canvas.width;
      HEAP32[((height)>>2)] = canvas.height;
    };
  
  
  
  
  
  var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
  var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };
  var getCanvasElementSize = (target) => {
      var sp = stackSave();
      var w = stackAlloc(8);
      var h = w + 4;
  
      var targetInt = stringToUTF8OnStack(target.id);
      var ret = _emscripten_get_canvas_element_size(targetInt, w, h);
      var size = [HEAP32[((w)>>2)], HEAP32[((h)>>2)]];
      stackRestore(sp);
      return size;
    };
  
  var _emscripten_set_canvas_element_size = (target, width, height) => {
      var canvas = findCanvasEventTarget(target);
      if (!canvas) return -4;
      canvas.width = width;
      canvas.height = height;
      return 0;
    };
  
  
  
  var setCanvasElementSize = (target, width, height) => {
      if (!target.controlTransferredOffscreen) {
        target.width = width;
        target.height = height;
      } else {
        // This function is being called from high-level JavaScript code instead of asm.js/Wasm,
        // and it needs to synchronously proxy over to another thread, so marshal the string onto the heap to do the call.
        var sp = stackSave();
        var targetInt = stringToUTF8OnStack(target.id);
        _emscripten_set_canvas_element_size(targetInt, width, height);
        stackRestore(sp);
      }
    };
  
  var currentFullscreenStrategy = {
  };
  
  var wasmTableMirror = [];
  
  /** @type {WebAssembly.Table} */
  var wasmTable;
  var getWasmTableEntry = (funcPtr) => {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        /** @suppress {checkTypes} */
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      /** @suppress {checkTypes} */
      assert(wasmTable.get(funcPtr) == func, 'JavaScript-side Wasm function table mirror is out of date!');
      return func;
    };
  var registerRestoreOldStyle = (canvas) => {
      var canvasSize = getCanvasElementSize(canvas);
      var oldWidth = canvasSize[0];
      var oldHeight = canvasSize[1];
      var oldCssWidth = canvas.style.width;
      var oldCssHeight = canvas.style.height;
      var oldBackgroundColor = canvas.style.backgroundColor; // Chrome reads color from here.
      var oldDocumentBackgroundColor = document.body.style.backgroundColor; // IE11 reads color from here.
      // Firefox always has black background color.
      var oldPaddingLeft = canvas.style.paddingLeft; // Chrome, FF, Safari
      var oldPaddingRight = canvas.style.paddingRight;
      var oldPaddingTop = canvas.style.paddingTop;
      var oldPaddingBottom = canvas.style.paddingBottom;
      var oldMarginLeft = canvas.style.marginLeft; // IE11
      var oldMarginRight = canvas.style.marginRight;
      var oldMarginTop = canvas.style.marginTop;
      var oldMarginBottom = canvas.style.marginBottom;
      var oldDocumentBodyMargin = document.body.style.margin;
      var oldDocumentOverflow = document.documentElement.style.overflow; // Chrome, Firefox
      var oldDocumentScroll = document.body.scroll; // IE
      var oldImageRendering = canvas.style.imageRendering;
  
      function restoreOldStyle() {
        var fullscreenElement = document.fullscreenElement
          || document.webkitFullscreenElement
          ;
        if (!fullscreenElement) {
          document.removeEventListener('fullscreenchange', restoreOldStyle);
  
          // Unprefixed Fullscreen API shipped in Chromium 71 (https://bugs.chromium.org/p/chromium/issues/detail?id=383813)
          // As of Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitfullscreenchange. TODO: revisit this check once Safari ships unprefixed version.
          document.removeEventListener('webkitfullscreenchange', restoreOldStyle);
  
          setCanvasElementSize(canvas, oldWidth, oldHeight);
  
          canvas.style.width = oldCssWidth;
          canvas.style.height = oldCssHeight;
          canvas.style.backgroundColor = oldBackgroundColor; // Chrome
          // IE11 hack: assigning 'undefined' or an empty string to document.body.style.backgroundColor has no effect, so first assign back the default color
          // before setting the undefined value. Setting undefined value is also important, or otherwise we would later treat that as something that the user
          // had explicitly set so subsequent fullscreen transitions would not set background color properly.
          if (!oldDocumentBackgroundColor) document.body.style.backgroundColor = 'white';
          document.body.style.backgroundColor = oldDocumentBackgroundColor; // IE11
          canvas.style.paddingLeft = oldPaddingLeft; // Chrome, FF, Safari
          canvas.style.paddingRight = oldPaddingRight;
          canvas.style.paddingTop = oldPaddingTop;
          canvas.style.paddingBottom = oldPaddingBottom;
          canvas.style.marginLeft = oldMarginLeft; // IE11
          canvas.style.marginRight = oldMarginRight;
          canvas.style.marginTop = oldMarginTop;
          canvas.style.marginBottom = oldMarginBottom;
          document.body.style.margin = oldDocumentBodyMargin;
          document.documentElement.style.overflow = oldDocumentOverflow; // Chrome, Firefox
          document.body.scroll = oldDocumentScroll; // IE
          canvas.style.imageRendering = oldImageRendering;
          if (canvas.GLctxObject) canvas.GLctxObject.GLctx.viewport(0, 0, oldWidth, oldHeight);
  
          if (currentFullscreenStrategy.canvasResizedCallback) {
            getWasmTableEntry(currentFullscreenStrategy.canvasResizedCallback)(37, 0, currentFullscreenStrategy.canvasResizedCallbackUserData);
          }
        }
      }
      document.addEventListener('fullscreenchange', restoreOldStyle);
      // Unprefixed Fullscreen API shipped in Chromium 71 (https://bugs.chromium.org/p/chromium/issues/detail?id=383813)
      // As of Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitfullscreenchange. TODO: revisit this check once Safari ships unprefixed version.
      document.addEventListener('webkitfullscreenchange', restoreOldStyle);
      return restoreOldStyle;
    };
  
  
  var setLetterbox = (element, topBottom, leftRight) => {
      // Cannot use margin to specify letterboxes in FF or Chrome, since those ignore margins in fullscreen mode.
      element.style.paddingLeft = element.style.paddingRight = leftRight + 'px';
      element.style.paddingTop = element.style.paddingBottom = topBottom + 'px';
    };
  
  
  var getBoundingClientRect = (e) => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {'left':0,'top':0};
  var JSEvents_resizeCanvasForFullscreen = (target, strategy) => {
      var restoreOldStyle = registerRestoreOldStyle(target);
      var cssWidth = strategy.softFullscreen ? innerWidth : screen.width;
      var cssHeight = strategy.softFullscreen ? innerHeight : screen.height;
      var rect = getBoundingClientRect(target);
      var windowedCssWidth = rect.width;
      var windowedCssHeight = rect.height;
      var canvasSize = getCanvasElementSize(target);
      var windowedRttWidth = canvasSize[0];
      var windowedRttHeight = canvasSize[1];
  
      if (strategy.scaleMode == 3) {
        setLetterbox(target, (cssHeight - windowedCssHeight) / 2, (cssWidth - windowedCssWidth) / 2);
        cssWidth = windowedCssWidth;
        cssHeight = windowedCssHeight;
      } else if (strategy.scaleMode == 2) {
        if (cssWidth*windowedRttHeight < windowedRttWidth*cssHeight) {
          var desiredCssHeight = windowedRttHeight * cssWidth / windowedRttWidth;
          setLetterbox(target, (cssHeight - desiredCssHeight) / 2, 0);
          cssHeight = desiredCssHeight;
        } else {
          var desiredCssWidth = windowedRttWidth * cssHeight / windowedRttHeight;
          setLetterbox(target, 0, (cssWidth - desiredCssWidth) / 2);
          cssWidth = desiredCssWidth;
        }
      }
  
      // If we are adding padding, must choose a background color or otherwise Chrome will give the
      // padding a default white color. Do it only if user has not customized their own background color.
      target.style.backgroundColor ||= 'black';
      // IE11 does the same, but requires the color to be set in the document body.
      document.body.style.backgroundColor ||= 'black'; // IE11
      // Firefox always shows black letterboxes independent of style color.
  
      target.style.width = cssWidth + 'px';
      target.style.height = cssHeight + 'px';
  
      if (strategy.filteringMode == 1) {
        target.style.imageRendering = 'optimizeSpeed';
        target.style.imageRendering = '-moz-crisp-edges';
        target.style.imageRendering = '-o-crisp-edges';
        target.style.imageRendering = '-webkit-optimize-contrast';
        target.style.imageRendering = 'optimize-contrast';
        target.style.imageRendering = 'crisp-edges';
        target.style.imageRendering = 'pixelated';
      }
  
      var dpiScale = (strategy.canvasResolutionScaleMode == 2) ? devicePixelRatio : 1;
      if (strategy.canvasResolutionScaleMode != 0) {
        var newWidth = (cssWidth * dpiScale)|0;
        var newHeight = (cssHeight * dpiScale)|0;
        setCanvasElementSize(target, newWidth, newHeight);
        if (target.GLctxObject) target.GLctxObject.GLctx.viewport(0, 0, newWidth, newHeight);
      }
      return restoreOldStyle;
    };
  
  var JSEvents_requestFullscreen = (target, strategy) => {
      // EMSCRIPTEN_FULLSCREEN_SCALE_DEFAULT + EMSCRIPTEN_FULLSCREEN_CANVAS_SCALE_NONE is a mode where no extra logic is performed to the DOM elements.
      if (strategy.scaleMode != 0 || strategy.canvasResolutionScaleMode != 0) {
        JSEvents_resizeCanvasForFullscreen(target, strategy);
      }
  
      if (target.requestFullscreen) {
        target.requestFullscreen();
      } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else {
        return JSEvents.fullscreenEnabled() ? -3 : -1;
      }
  
      currentFullscreenStrategy = strategy;
  
      if (strategy.canvasResizedCallback) {
        getWasmTableEntry(strategy.canvasResizedCallback)(37, 0, strategy.canvasResizedCallbackUserData);
      }
  
      return 0;
    };
  var _emscripten_exit_fullscreen = () => {
      if (!JSEvents.fullscreenEnabled()) return -1;
      // Make sure no queued up calls will fire after this.
      JSEvents.removeDeferredCalls(JSEvents_requestFullscreen);
  
      var d = specialHTMLTargets[1];
      if (d.exitFullscreen) {
        d.fullscreenElement && d.exitFullscreen();
      } else if (d.webkitExitFullscreen) {
        d.webkitFullscreenElement && d.webkitExitFullscreen();
      } else {
        return -1;
      }
  
      return 0;
    };

  
  var requestPointerLock = (target) => {
      if (target.requestPointerLock) {
        target.requestPointerLock();
      } else {
        // document.body is known to accept pointer lock, so use that to differentiate if the user passed a bad element,
        // or if the whole browser just doesn't support the feature.
        if (document.body.requestPointerLock) {
          return -3;
        }
        return -1;
      }
      return 0;
    };
  var _emscripten_exit_pointerlock = () => {
      // Make sure no queued up calls will fire after this.
      JSEvents.removeDeferredCalls(requestPointerLock);
      if (!document.exitPointerLock) return -1;
      document.exitPointerLock();
      return 0;
    };

  
  var __emscripten_runtime_keepalive_clear = () => {
      noExitRuntime = false;
      runtimeKeepaliveCounter = 0;
    };
  
  var _emscripten_force_exit = (status) => {
      warnOnce('emscripten_force_exit cannot actually shut down the runtime, as the build does not have EXIT_RUNTIME set');
      __emscripten_runtime_keepalive_clear();
      _exit(status);
    };

  var _emscripten_get_device_pixel_ratio = () => {
      return (typeof devicePixelRatio == 'number' && devicePixelRatio) || 1.0;
    };

  
  var _emscripten_get_element_css_size = (target, width, height) => {
      target = findEventTarget(target);
      if (!target) return -4;
  
      var rect = getBoundingClientRect(target);
      HEAPF64[((width)>>3)] = rect.width;
      HEAPF64[((height)>>3)] = rect.height;
  
      return 0;
    };

  
  var fillGamepadEventData = (eventStruct, e) => {
      HEAPF64[((eventStruct)>>3)] = e.timestamp;
      for (var i = 0; i < e.axes.length; ++i) {
        HEAPF64[(((eventStruct+i*8)+(16))>>3)] = e.axes[i];
      }
      for (var i = 0; i < e.buttons.length; ++i) {
        if (typeof e.buttons[i] == 'object') {
          HEAPF64[(((eventStruct+i*8)+(528))>>3)] = e.buttons[i].value;
        } else {
          HEAPF64[(((eventStruct+i*8)+(528))>>3)] = e.buttons[i];
        }
      }
      for (var i = 0; i < e.buttons.length; ++i) {
        if (typeof e.buttons[i] == 'object') {
          HEAP8[(eventStruct+i)+(1040)] = e.buttons[i].pressed;
        } else {
          // Assigning a boolean to HEAP32, that's ok, but Closure would like to warn about it:
          /** @suppress {checkTypes} */
          HEAP8[(eventStruct+i)+(1040)] = e.buttons[i] == 1;
        }
      }
      HEAP8[(eventStruct)+(1104)] = e.connected;
      HEAP32[(((eventStruct)+(1108))>>2)] = e.index;
      HEAP32[(((eventStruct)+(8))>>2)] = e.axes.length;
      HEAP32[(((eventStruct)+(12))>>2)] = e.buttons.length;
      stringToUTF8(e.id, eventStruct + 1112, 64);
      stringToUTF8(e.mapping, eventStruct + 1176, 64);
    };
  var _emscripten_get_gamepad_status = (index, gamepadState) => {
      if (!JSEvents.lastGamepadState) throw 'emscripten_get_gamepad_status() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!';
      // INVALID_PARAM is returned on a Gamepad index that never was there.
      if (index < 0 || index >= JSEvents.lastGamepadState.length) return -5;
  
      // NO_DATA is returned on a Gamepad index that was removed.
      // For previously disconnected gamepads there should be an empty slot (null/undefined/false) at the index.
      // This is because gamepads must keep their original position in the array.
      // For example, removing the first of two gamepads produces [null/undefined/false, gamepad].
      if (!JSEvents.lastGamepadState[index]) return -7;
  
      fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index]);
      return 0;
    };

  var _emscripten_get_main_loop_timing = (mode, value) => {
      if (mode) HEAP32[((mode)>>2)] = MainLoop.timingMode;
      if (value) HEAP32[((value)>>2)] = MainLoop.timingValue;
    };


  var _emscripten_get_num_gamepads = () => {
      if (!JSEvents.lastGamepadState) throw 'emscripten_get_num_gamepads() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!';
      // N.B. Do not call emscripten_get_num_gamepads() unless having first called emscripten_sample_gamepad_data(), and that has returned EMSCRIPTEN_RESULT_SUCCESS.
      // Otherwise the following line will throw an exception.
      return JSEvents.lastGamepadState.length;
    };

  
  /** @param {number=} timeout */
  var safeSetTimeout = (func, timeout) => {
      
      return setTimeout(() => {
        
        callUserCallback(func);
      }, timeout);
    };
  
  
  
  var Browser = {
  useWebGL:false,
  isFullscreen:false,
  pointerLock:false,
  moduleContextCreatedCallbacks:[],
  workers:[],
  preloadedImages:{
  },
  preloadedAudios:{
  },
  getCanvas:() => Module['canvas'],
  init() {
        if (Browser.initted) return;
        Browser.initted = true;
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module['noImageDecoding'] && /\.(jpg|jpeg|png|bmp|webp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          if (b.size !== byteArray.length) { // Safari bug #118630
            // Safari's Blob can only take an ArrayBuffer
            b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
          }
          var url = URL.createObjectURL(b);
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var img = new Image();
          img.onload = () => {
            assert(img.complete, `Image ${name} could not be decoded`);
            var canvas = /** @type {!HTMLCanvasElement} */ (document.createElement('canvas'));
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Browser.preloadedImages[name] = canvas;
            URL.revokeObjectURL(url);
            onload?.(byteArray);
          };
          img.onerror = (event) => {
            err(`Image ${url} could not be decoded`);
            onerror?.();
          };
          img.src = url;
        };
        preloadPlugins.push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module['noAudioDecoding'] && name.slice(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Browser.preloadedAudios[name] = audio;
            onload?.(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Browser.preloadedAudios[name] = new Audio(); // empty shim
            onerror?.();
          }
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          var url = URL.createObjectURL(b); // XXX we never revoke this!
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var audio = new Audio();
          audio.addEventListener('canplaythrough', () => finish(audio), false); // use addEventListener due to chromium bug 124926
          audio.onerror = function audio_onerror(event) {
            if (done) return;
            err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
            function encode64(data) {
              var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
              var PAD = '=';
              var ret = '';
              var leftchar = 0;
              var leftbits = 0;
              for (var i = 0; i < data.length; i++) {
                leftchar = (leftchar << 8) | data[i];
                leftbits += 8;
                while (leftbits >= 6) {
                  var curr = (leftchar >> (leftbits-6)) & 0x3f;
                  leftbits -= 6;
                  ret += BASE[curr];
                }
              }
              if (leftbits == 2) {
                ret += BASE[(leftchar&3) << 4];
                ret += PAD + PAD;
              } else if (leftbits == 4) {
                ret += BASE[(leftchar&0xf) << 2];
                ret += PAD;
              }
              return ret;
            }
            audio.src = 'data:audio/x-' + name.slice(-3) + ';base64,' + encode64(byteArray);
            finish(audio); // we don't wait for confirmation this worked - but it's worth trying
          };
          audio.src = url;
          // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
          safeSetTimeout(() => {
            finish(audio); // try to use it even though it is not necessarily ready to play
          }, 10000);
        };
        preloadPlugins.push(audioPlugin);
  
        // Canvas event setup
  
        function pointerLockChange() {
          var canvas = Browser.getCanvas();
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas ||
                                document['msPointerLockElement'] === canvas;
        }
        var canvas = Browser.getCanvas();
        if (canvas) {
          // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
          // Module['forcedAspectRatio'] = 4 / 3;
  
          canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                      canvas['mozRequestPointerLock'] ||
                                      canvas['webkitRequestPointerLock'] ||
                                      canvas['msRequestPointerLock'] ||
                                      (() => {});
          canvas.exitPointerLock = document['exitPointerLock'] ||
                                   document['mozExitPointerLock'] ||
                                   document['webkitExitPointerLock'] ||
                                   document['msExitPointerLock'] ||
                                   (() => {}); // no-op if function does not exist
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
          document.addEventListener('pointerlockchange', pointerLockChange, false);
          document.addEventListener('mozpointerlockchange', pointerLockChange, false);
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
          document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
          if (Module['elementPointerLock']) {
            canvas.addEventListener("click", (ev) => {
              if (!Browser.pointerLock && Browser.getCanvas().requestPointerLock) {
                Browser.getCanvas().requestPointerLock();
                ev.preventDefault();
              }
            }, false);
          }
        }
      },
  createContext(/** @type {HTMLCanvasElement} */ canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module['ctx'] && canvas == Browser.getCanvas()) return Module['ctx']; // no need to recreate GL context if it's already been created for this canvas.
  
        var ctx;
        var contextHandle;
        if (useWebGL) {
          // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
          var contextAttributes = {
            antialias: false,
            alpha: false,
            majorVersion: (typeof WebGL2RenderingContext != 'undefined') ? 2 : 1,
          };
  
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute];
            }
          }
  
          // This check of existence of GL is here to satisfy Closure compiler, which yells if variable GL is referenced below but GL object is not
          // actually compiled in because application is not doing any GL operations. TODO: Ideally if GL is not being used, this function
          // Browser.createContext() should not even be emitted.
          if (typeof GL != 'undefined') {
            contextHandle = GL.createContext(canvas, contextAttributes);
            if (contextHandle) {
              ctx = GL.getContext(contextHandle).GLctx;
            }
          }
        } else {
          ctx = canvas.getContext('2d');
        }
  
        if (!ctx) return null;
  
        if (setInModule) {
          if (!useWebGL) assert(typeof GLctx == 'undefined', 'cannot set in module if GLctx is used, but we are a non-GL context that would replace it');
          Module['ctx'] = ctx;
          if (useWebGL) GL.makeContextCurrent(contextHandle);
          Browser.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
          Browser.init();
        }
        return ctx;
      },
  fullscreenHandlersInstalled:false,
  lockPointer:undefined,
  resizeCanvas:undefined,
  requestFullscreen(lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer == 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas == 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Browser.getCanvas();
        function fullscreenChange() {
          Browser.isFullscreen = false;
          var canvasContainer = canvas.parentNode;
          if ((document['fullscreenElement'] || document['mozFullScreenElement'] ||
               document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.exitFullscreen = Browser.exitFullscreen;
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullscreen = true;
            if (Browser.resizeCanvas) {
              Browser.setFullscreenCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          } else {
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
  
            if (Browser.resizeCanvas) {
              Browser.setWindowedCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          }
          Module['onFullScreen']?.(Browser.isFullscreen);
          Module['onFullscreen']?.(Browser.isFullscreen);
        }
  
        if (!Browser.fullscreenHandlersInstalled) {
          Browser.fullscreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullscreenChange, false);
          document.addEventListener('mozfullscreenchange', fullscreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullscreenChange, false);
          document.addEventListener('MSFullscreenChange', fullscreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
  
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullscreen = canvasContainer['requestFullscreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullscreen'] ? () => canvasContainer['webkitRequestFullscreen'](Element['ALLOW_KEYBOARD_INPUT']) : null) ||
                                           (canvasContainer['webkitRequestFullScreen'] ? () => canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) : null);
  
        canvasContainer.requestFullscreen();
      },
  requestFullScreen() {
        abort('Module.requestFullScreen has been replaced by Module.requestFullscreen (without a capital S)');
      },
  exitFullscreen() {
        // This is workaround for chrome. Trying to exit from fullscreen
        // not in fullscreen state will cause "TypeError: Document not active"
        // in chrome. See https://github.com/emscripten-core/emscripten/pull/8236
        if (!Browser.isFullscreen) {
          return false;
        }
  
        var CFS = document['exitFullscreen'] ||
                  document['cancelFullScreen'] ||
                  document['mozCancelFullScreen'] ||
                  document['msExitFullscreen'] ||
                  document['webkitCancelFullScreen'] ||
            (() => {});
        CFS.apply(document, []);
        return true;
      },
  safeSetTimeout(func, timeout) {
        // Legacy function, this is used by the SDL2 port so we need to keep it
        // around at least until that is updated.
        // See https://github.com/libsdl-org/SDL/pull/6304
        return safeSetTimeout(func, timeout);
      },
  getMimetype(name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.slice(name.lastIndexOf('.')+1)];
      },
  getUserMedia(func) {
        window.getUserMedia ||= navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        window.getUserMedia(func);
      },
  getMovementX(event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },
  getMovementY(event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },
  getMouseWheelDelta(event) {
        var delta = 0;
        switch (event.type) {
          case 'DOMMouseScroll':
            // 3 lines make up a step
            delta = event.detail / 3;
            break;
          case 'mousewheel':
            // 120 units make up a step
            delta = event.wheelDelta / 120;
            break;
          case 'wheel':
            delta = event.deltaY
            switch (event.deltaMode) {
              case 0:
                // DOM_DELTA_PIXEL: 100 pixels make up a step
                delta /= 100;
                break;
              case 1:
                // DOM_DELTA_LINE: 3 lines make up a step
                delta /= 3;
                break;
              case 2:
                // DOM_DELTA_PAGE: A page makes up 80 steps
                delta *= 80;
                break;
              default:
                throw 'unrecognized mouse wheel delta mode: ' + event.deltaMode;
            }
            break;
          default:
            throw 'unrecognized mouse wheel event: ' + event.type;
        }
        return delta;
      },
  mouseX:0,
  mouseY:0,
  mouseMovementX:0,
  mouseMovementY:0,
  touches:{
  },
  lastTouches:{
  },
  calculateMouseCoords(pageX, pageY) {
        // Calculate the movement based on the changes
        // in the coordinates.
        var canvas = Browser.getCanvas();
        var rect = canvas.getBoundingClientRect();
  
        // Neither .scrollX or .pageXOffset are defined in a spec, but
        // we prefer .scrollX because it is currently in a spec draft.
        // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
        var scrollX = ((typeof window.scrollX != 'undefined') ? window.scrollX : window.pageXOffset);
        var scrollY = ((typeof window.scrollY != 'undefined') ? window.scrollY : window.pageYOffset);
        // If this assert lands, it's likely because the browser doesn't support scrollX or pageXOffset
        // and we have no viable fallback.
        assert((typeof scrollX != 'undefined') && (typeof scrollY != 'undefined'), 'Unable to retrieve scroll position, mouse positions likely broken.');
        var adjustedX = pageX - (scrollX + rect.left);
        var adjustedY = pageY - (scrollY + rect.top);
  
        // the canvas might be CSS-scaled compared to its backbuffer;
        // SDL-using content will want mouse coordinates in terms
        // of backbuffer units.
        adjustedX = adjustedX * (canvas.width / rect.width);
        adjustedY = adjustedY * (canvas.height / rect.height);
  
        return { x: adjustedX, y: adjustedY };
      },
  setMouseCoords(pageX, pageY) {
        const {x, y} = Browser.calculateMouseCoords(pageX, pageY);
        Browser.mouseMovementX = x - Browser.mouseX;
        Browser.mouseMovementY = y - Browser.mouseY;
        Browser.mouseX = x;
        Browser.mouseY = y;
      },
  calculateMouseEvent(event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
  
          // add the mouse delta to the current absolute mouse position
          Browser.mouseX += Browser.mouseMovementX;
          Browser.mouseY += Browser.mouseMovementY;
        } else {
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch;
            if (touch === undefined) {
              return; // the "touch" property is only defined in SDL
  
            }
            var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
  
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              var last = Browser.touches[touch.identifier];
              last ||= coords;
              Browser.lastTouches[touch.identifier] = last;
              Browser.touches[touch.identifier] = coords;
            }
            return;
          }
  
          Browser.setMouseCoords(event.pageX, event.pageY);
        }
      },
  resizeListeners:[],
  updateResizeListeners() {
        var canvas = Browser.getCanvas();
        Browser.resizeListeners.forEach((listener) => listener(canvas.width, canvas.height));
      },
  setCanvasSize(width, height, noUpdates) {
        var canvas = Browser.getCanvas();
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },
  windowedWidth:0,
  windowedHeight:0,
  setFullscreenCanvasSize() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Browser.getCanvas());
        Browser.updateResizeListeners();
      },
  setWindowedCanvasSize() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Browser.getCanvas());
        Browser.updateResizeListeners();
      },
  updateCanvasDimensions(canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['fullscreenElement'] || document['mozFullScreenElement'] ||
             document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      },
  };
  var _emscripten_get_screen_size = (width, height) => {
      HEAP32[((width)>>2)] = screen.width;
      HEAP32[((height)>>2)] = screen.height;
    };

  var GLctx;
  
  var webgl_enable_ANGLE_instanced_arrays = (ctx) => {
      // Extension available in WebGL 1 from Firefox 26 and Google Chrome 30 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('ANGLE_instanced_arrays');
      // Because this extension is a core function in WebGL 2, assign the extension entry points in place of
      // where the core functions will reside in WebGL 2. This way the calling code can call these without
      // having to dynamically branch depending if running against WebGL 1 or WebGL 2.
      if (ext) {
        ctx['vertexAttribDivisor'] = (index, divisor) => ext['vertexAttribDivisorANGLE'](index, divisor);
        ctx['drawArraysInstanced'] = (mode, first, count, primcount) => ext['drawArraysInstancedANGLE'](mode, first, count, primcount);
        ctx['drawElementsInstanced'] = (mode, count, type, indices, primcount) => ext['drawElementsInstancedANGLE'](mode, count, type, indices, primcount);
        return 1;
      }
    };
  
  var webgl_enable_OES_vertex_array_object = (ctx) => {
      // Extension available in WebGL 1 from Firefox 25 and WebKit 536.28/desktop Safari 6.0.3 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('OES_vertex_array_object');
      if (ext) {
        ctx['createVertexArray'] = () => ext['createVertexArrayOES']();
        ctx['deleteVertexArray'] = (vao) => ext['deleteVertexArrayOES'](vao);
        ctx['bindVertexArray'] = (vao) => ext['bindVertexArrayOES'](vao);
        ctx['isVertexArray'] = (vao) => ext['isVertexArrayOES'](vao);
        return 1;
      }
    };
  
  var webgl_enable_WEBGL_draw_buffers = (ctx) => {
      // Extension available in WebGL 1 from Firefox 28 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('WEBGL_draw_buffers');
      if (ext) {
        ctx['drawBuffers'] = (n, bufs) => ext['drawBuffersWEBGL'](n, bufs);
        return 1;
      }
    };
  
  var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = (ctx) =>
      // Closure is expected to be allowed to minify the '.dibvbi' property, so not accessing it quoted.
      !!(ctx.dibvbi = ctx.getExtension('WEBGL_draw_instanced_base_vertex_base_instance'));
  
  var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = (ctx) => {
      // Closure is expected to be allowed to minify the '.mdibvbi' property, so not accessing it quoted.
      return !!(ctx.mdibvbi = ctx.getExtension('WEBGL_multi_draw_instanced_base_vertex_base_instance'));
    };
  
  var webgl_enable_EXT_polygon_offset_clamp = (ctx) =>
      !!(ctx.extPolygonOffsetClamp = ctx.getExtension('EXT_polygon_offset_clamp'));
  
  var webgl_enable_EXT_clip_control = (ctx) =>
      !!(ctx.extClipControl = ctx.getExtension('EXT_clip_control'));
  
  var webgl_enable_WEBGL_polygon_mode = (ctx) =>
      !!(ctx.webglPolygonMode = ctx.getExtension('WEBGL_polygon_mode'));
  
  var webgl_enable_WEBGL_multi_draw = (ctx) =>
      // Closure is expected to be allowed to minify the '.multiDrawWebgl' property, so not accessing it quoted.
      !!(ctx.multiDrawWebgl = ctx.getExtension('WEBGL_multi_draw'));
  
  var getEmscriptenSupportedExtensions = (ctx) => {
      // Restrict the list of advertised extensions to those that we actually
      // support.
      var supportedExtensions = [
        // WebGL 1 extensions
        'ANGLE_instanced_arrays',
        'EXT_blend_minmax',
        'EXT_disjoint_timer_query',
        'EXT_frag_depth',
        'EXT_shader_texture_lod',
        'EXT_sRGB',
        'OES_element_index_uint',
        'OES_fbo_render_mipmap',
        'OES_standard_derivatives',
        'OES_texture_float',
        'OES_texture_half_float',
        'OES_texture_half_float_linear',
        'OES_vertex_array_object',
        'WEBGL_color_buffer_float',
        'WEBGL_depth_texture',
        'WEBGL_draw_buffers',
        // WebGL 2 extensions
        'EXT_color_buffer_float',
        'EXT_conservative_depth',
        'EXT_disjoint_timer_query_webgl2',
        'EXT_texture_norm16',
        'NV_shader_noperspective_interpolation',
        'WEBGL_clip_cull_distance',
        // WebGL 1 and WebGL 2 extensions
        'EXT_clip_control',
        'EXT_color_buffer_half_float',
        'EXT_depth_clamp',
        'EXT_float_blend',
        'EXT_polygon_offset_clamp',
        'EXT_texture_compression_bptc',
        'EXT_texture_compression_rgtc',
        'EXT_texture_filter_anisotropic',
        'KHR_parallel_shader_compile',
        'OES_texture_float_linear',
        'WEBGL_blend_func_extended',
        'WEBGL_compressed_texture_astc',
        'WEBGL_compressed_texture_etc',
        'WEBGL_compressed_texture_etc1',
        'WEBGL_compressed_texture_s3tc',
        'WEBGL_compressed_texture_s3tc_srgb',
        'WEBGL_debug_renderer_info',
        'WEBGL_debug_shaders',
        'WEBGL_lose_context',
        'WEBGL_multi_draw',
        'WEBGL_polygon_mode'
      ];
      // .getSupportedExtensions() can return null if context is lost, so coerce to empty array.
      return (ctx.getSupportedExtensions() || []).filter(ext => supportedExtensions.includes(ext));
    };
  
  var registerPreMainLoop = (f) => {
      // Does nothing unless $MainLoop is included/used.
      typeof MainLoop != 'undefined' && MainLoop.preMainLoop.push(f);
    };
  
  
  var GL = {
  counter:1,
  buffers:[],
  mappedBuffers:{
  },
  programs:[],
  framebuffers:[],
  renderbuffers:[],
  textures:[],
  shaders:[],
  vaos:[],
  contexts:[],
  offscreenCanvases:{
  },
  queries:[],
  samplers:[],
  transformFeedbacks:[],
  syncs:[],
  byteSizeByTypeRoot:5120,
  byteSizeByType:[1,1,2,2,4,4,4,2,3,4,8],
  stringCache:{
  },
  stringiCache:{
  },
  unpackAlignment:4,
  unpackRowLength:0,
  recordError:(errorCode) => {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },
  getNewId:(table) => {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        // Skip over any non-null elements that might have been created by
        // glBindBuffer.
        while (table[ret]) {
          ret = GL.counter++;
        }
        return ret;
      },
  genObject:(n, buffers, createFunction, objectTable
        ) => {
        for (var i = 0; i < n; i++) {
          var buffer = GLctx[createFunction]();
          var id = buffer && GL.getNewId(objectTable);
          if (buffer) {
            buffer.name = id;
            objectTable[id] = buffer;
          } else {
            GL.recordError(0x502 /* GL_INVALID_OPERATION */);
          }
          HEAP32[(((buffers)+(i*4))>>2)] = id;
        }
      },
  MAX_TEMP_BUFFER_SIZE:2097152,
  numTempVertexBuffersPerSize:64,
  log2ceilLookup:(i) => 32 - Math.clz32(i === 0 ? 0 : i - 1),
  generateTempBuffers:(quads, context) => {
        var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        context.tempVertexBufferCounters1 = [];
        context.tempVertexBufferCounters2 = [];
        context.tempVertexBufferCounters1.length = context.tempVertexBufferCounters2.length = largestIndex+1;
        context.tempVertexBuffers1 = [];
        context.tempVertexBuffers2 = [];
        context.tempVertexBuffers1.length = context.tempVertexBuffers2.length = largestIndex+1;
        context.tempIndexBuffers = [];
        context.tempIndexBuffers.length = largestIndex+1;
        for (var i = 0; i <= largestIndex; ++i) {
          context.tempIndexBuffers[i] = null; // Created on-demand
          context.tempVertexBufferCounters1[i] = context.tempVertexBufferCounters2[i] = 0;
          var ringbufferLength = GL.numTempVertexBuffersPerSize;
          context.tempVertexBuffers1[i] = [];
          context.tempVertexBuffers2[i] = [];
          var ringbuffer1 = context.tempVertexBuffers1[i];
          var ringbuffer2 = context.tempVertexBuffers2[i];
          ringbuffer1.length = ringbuffer2.length = ringbufferLength;
          for (var j = 0; j < ringbufferLength; ++j) {
            ringbuffer1[j] = ringbuffer2[j] = null; // Created on-demand
          }
        }
  
        if (quads) {
          // GL_QUAD indexes can be precalculated
          context.tempQuadIndexBuffer = GLctx.createBuffer();
          context.GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, context.tempQuadIndexBuffer);
          var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
          var quadIndexes = new Uint16Array(numIndexes);
          var i = 0, v = 0;
          while (1) {
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+1;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+3;
            if (i >= numIndexes) break;
            v += 4;
          }
          context.GLctx.bufferData(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, quadIndexes, 0x88E4 /*GL_STATIC_DRAW*/);
          context.GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, null);
        }
      },
  getTempVertexBuffer:(sizeBytes) => {
        var idx = GL.log2ceilLookup(sizeBytes);
        var ringbuffer = GL.currentContext.tempVertexBuffers1[idx];
        var nextFreeBufferIndex = GL.currentContext.tempVertexBufferCounters1[idx];
        GL.currentContext.tempVertexBufferCounters1[idx] = (GL.currentContext.tempVertexBufferCounters1[idx]+1) & (GL.numTempVertexBuffersPerSize-1);
        var vbo = ringbuffer[nextFreeBufferIndex];
        if (vbo) {
          return vbo;
        }
        var prevVBO = GLctx.getParameter(0x8894 /*GL_ARRAY_BUFFER_BINDING*/);
        ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer();
        GLctx.bindBuffer(0x8892 /*GL_ARRAY_BUFFER*/, ringbuffer[nextFreeBufferIndex]);
        GLctx.bufferData(0x8892 /*GL_ARRAY_BUFFER*/, 1 << idx, 0x88E8 /*GL_DYNAMIC_DRAW*/);
        GLctx.bindBuffer(0x8892 /*GL_ARRAY_BUFFER*/, prevVBO);
        return ringbuffer[nextFreeBufferIndex];
      },
  getTempIndexBuffer:(sizeBytes) => {
        var idx = GL.log2ceilLookup(sizeBytes);
        var ibo = GL.currentContext.tempIndexBuffers[idx];
        if (ibo) {
          return ibo;
        }
        var prevIBO = GLctx.getParameter(0x8895 /*ELEMENT_ARRAY_BUFFER_BINDING*/);
        GL.currentContext.tempIndexBuffers[idx] = GLctx.createBuffer();
        GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, GL.currentContext.tempIndexBuffers[idx]);
        GLctx.bufferData(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, 1 << idx, 0x88E8 /*GL_DYNAMIC_DRAW*/);
        GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, prevIBO);
        return GL.currentContext.tempIndexBuffers[idx];
      },
  newRenderingFrameStarted:() => {
        if (!GL.currentContext) {
          return;
        }
        var vb = GL.currentContext.tempVertexBuffers1;
        GL.currentContext.tempVertexBuffers1 = GL.currentContext.tempVertexBuffers2;
        GL.currentContext.tempVertexBuffers2 = vb;
        vb = GL.currentContext.tempVertexBufferCounters1;
        GL.currentContext.tempVertexBufferCounters1 = GL.currentContext.tempVertexBufferCounters2;
        GL.currentContext.tempVertexBufferCounters2 = vb;
        var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        for (var i = 0; i <= largestIndex; ++i) {
          GL.currentContext.tempVertexBufferCounters1[i] = 0;
        }
      },
  getSource:(shader, count, string, length) => {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var len = length ? HEAPU32[(((length)+(i*4))>>2)] : undefined;
          source += UTF8ToString(HEAPU32[(((string)+(i*4))>>2)], len);
        }
        return source;
      },
  calcBufLength:(size, type, stride, count) => {
        if (stride > 0) {
          return count * stride;  // XXXvlad this is not exactly correct I don't think
        }
        var typeSize = GL.byteSizeByType[type - GL.byteSizeByTypeRoot];
        return size * typeSize * count;
      },
  usedTempBuffers:[],
  preDrawHandleClientVertexAttribBindings:(count) => {
        GL.resetBufferBinding = false;
  
        // TODO: initial pass to detect ranges we need to upload, might not need
        // an upload per attrib
        for (var i = 0; i < GL.currentContext.maxVertexAttribs; ++i) {
          var cb = GL.currentContext.clientBuffers[i];
          if (!cb.clientside || !cb.enabled) continue;
  
          GL.resetBufferBinding = true;
  
          var size = GL.calcBufLength(cb.size, cb.type, cb.stride, count);
          var buf = GL.getTempVertexBuffer(size);
          GLctx.bindBuffer(0x8892 /*GL_ARRAY_BUFFER*/, buf);
          GLctx.bufferSubData(0x8892 /*GL_ARRAY_BUFFER*/,
                                   0,
                                   HEAPU8.subarray(cb.ptr, cb.ptr + size));
          cb.vertexAttribPointerAdaptor.call(GLctx, i, cb.size, cb.type, cb.normalized, cb.stride, 0);
        }
      },
  postDrawHandleClientVertexAttribBindings:() => {
        if (GL.resetBufferBinding) {
          GLctx.bindBuffer(0x8892 /*GL_ARRAY_BUFFER*/, GL.buffers[GLctx.currentArrayBufferBinding]);
        }
      },
  createContext:(/** @type {HTMLCanvasElement} */ canvas, webGLContextAttributes) => {
  
        // BUG: Workaround Safari WebGL issue: After successfully acquiring WebGL
        // context on a canvas, calling .getContext() will always return that
        // context independent of which 'webgl' or 'webgl2'
        // context version was passed. See:
        //   https://bugs.webkit.org/show_bug.cgi?id=222758
        // and:
        //   https://github.com/emscripten-core/emscripten/issues/13295.
        // TODO: Once the bug is fixed and shipped in Safari, adjust the Safari
        // version field in above check.
        if (!canvas.getContextSafariWebGL2Fixed) {
          canvas.getContextSafariWebGL2Fixed = canvas.getContext;
          /** @type {function(this:HTMLCanvasElement, string, (Object|null)=): (Object|null)} */
          function fixedGetContext(ver, attrs) {
            var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
            return ((ver == 'webgl') == (gl instanceof WebGLRenderingContext)) ? gl : null;
          }
          canvas.getContext = fixedGetContext;
        }
  
        var ctx =
          (webGLContextAttributes.majorVersion > 1)
          ?
            canvas.getContext("webgl2", webGLContextAttributes)
          :
          canvas.getContext("webgl", webGLContextAttributes);
  
        if (!ctx) return 0;
  
        var handle = GL.registerContext(ctx, webGLContextAttributes);
  
        return handle;
      },
  registerContext:(ctx, webGLContextAttributes) => {
        // without pthreads a context is just an integer ID
        var handle = GL.getNewId(GL.contexts);
  
        var context = {
          handle,
          attributes: webGLContextAttributes,
          version: webGLContextAttributes.majorVersion,
          GLctx: ctx
        };
  
        // Store the created context object so that we can access the context
        // given a canvas without having to pass the parameters again.
        if (ctx.canvas) ctx.canvas.GLctxObject = context;
        GL.contexts[handle] = context;
        if (typeof webGLContextAttributes.enableExtensionsByDefault == 'undefined' || webGLContextAttributes.enableExtensionsByDefault) {
          GL.initExtensions(context);
        }
  
        context.maxVertexAttribs = context.GLctx.getParameter(0x8869 /*GL_MAX_VERTEX_ATTRIBS*/);
        context.clientBuffers = [];
        for (var i = 0; i < context.maxVertexAttribs; i++) {
          context.clientBuffers[i] = {
            enabled: false,
            clientside: false,
            size: 0,
            type: 0,
            normalized: 0,
            stride: 0,
            ptr: 0,
            vertexAttribPointerAdaptor: null,
          };
        }
  
        GL.generateTempBuffers(false, context);
  
        return handle;
      },
  makeContextCurrent:(contextHandle) => {
  
        // Active Emscripten GL layer context object.
        GL.currentContext = GL.contexts[contextHandle];
        // Active WebGL context object.
        Module['ctx'] = GLctx = GL.currentContext?.GLctx;
        return !(contextHandle && !GLctx);
      },
  getContext:(contextHandle) => {
        return GL.contexts[contextHandle];
      },
  deleteContext:(contextHandle) => {
        if (GL.currentContext === GL.contexts[contextHandle]) {
          GL.currentContext = null;
        }
        if (typeof JSEvents == 'object') {
          // Release all JS event handlers on the DOM element that the GL context is
          // associated with since the context is now deleted.
          JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
        }
        // Make sure the canvas object no longer refers to the context object so
        // there are no GC surprises.
        if (GL.contexts[contextHandle]?.GLctx.canvas) {
          GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
        }
        GL.contexts[contextHandle] = null;
      },
  initExtensions:(context) => {
        // If this function is called without a specific context object, init the
        // extensions of the currently active context.
        context ||= GL.currentContext;
  
        if (context.initExtensionsDone) return;
        context.initExtensionsDone = true;
  
        var GLctx = context.GLctx;
  
        // Detect the presence of a few extensions manually, ction GL interop
        // layer itself will need to know if they exist.
  
        // Extensions that are available in both WebGL 1 and WebGL 2
        webgl_enable_WEBGL_multi_draw(GLctx);
        webgl_enable_EXT_polygon_offset_clamp(GLctx);
        webgl_enable_EXT_clip_control(GLctx);
        webgl_enable_WEBGL_polygon_mode(GLctx);
        // Extensions that are only available in WebGL 1 (the calls will be no-ops
        // if called on a WebGL 2 context active)
        webgl_enable_ANGLE_instanced_arrays(GLctx);
        webgl_enable_OES_vertex_array_object(GLctx);
        webgl_enable_WEBGL_draw_buffers(GLctx);
        // Extensions that are available from WebGL >= 2 (no-op if called on a WebGL 1 context active)
        webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
        webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
  
        // On WebGL 2, EXT_disjoint_timer_query is replaced with an alternative
        // that's based on core APIs, and exposes only the queryCounterEXT()
        // entrypoint.
        if (context.version >= 2) {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query_webgl2");
        }
  
        // However, Firefox exposes the WebGL 1 version on WebGL 2 as well and
        // thus we look for the WebGL 1 version again if the WebGL 2 version
        // isn't present. https://bugzilla.mozilla.org/show_bug.cgi?id=1328882
        if (context.version < 2 || !GLctx.disjointTimerQueryExt)
        {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
        }
  
        getEmscriptenSupportedExtensions(GLctx).forEach((ext) => {
          // WEBGL_lose_context, WEBGL_debug_renderer_info and WEBGL_debug_shaders
          // are not enabled by default.
          if (!ext.includes('lose_context') && !ext.includes('debug')) {
            // Call .getExtension() to enable that extension permanently.
            GLctx.getExtension(ext);
          }
        });
      },
  };
  /** @suppress {duplicate } */
  var _glActiveTexture = (x0) => GLctx.activeTexture(x0);
  var _emscripten_glActiveTexture = _glActiveTexture;

  /** @suppress {duplicate } */
  var _glAttachShader = (program, shader) => {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
    };
  var _emscripten_glAttachShader = _glAttachShader;

  /** @suppress {duplicate } */
  var _glBeginQuery = (target, id) => {
      GLctx.beginQuery(target, GL.queries[id]);
    };
  var _emscripten_glBeginQuery = _glBeginQuery;

  /** @suppress {duplicate } */
  var _glBeginQueryEXT = (target, id) => {
      GLctx.disjointTimerQueryExt['beginQueryEXT'](target, GL.queries[id]);
    };
  var _emscripten_glBeginQueryEXT = _glBeginQueryEXT;

  /** @suppress {duplicate } */
  var _glBeginTransformFeedback = (x0) => GLctx.beginTransformFeedback(x0);
  var _emscripten_glBeginTransformFeedback = _glBeginTransformFeedback;

  
  /** @suppress {duplicate } */
  var _glBindAttribLocation = (program, index, name) => {
      GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
    };
  var _emscripten_glBindAttribLocation = _glBindAttribLocation;

  /** @suppress {duplicate } */
  var _glBindBuffer = (target, buffer) => {
      // Calling glBindBuffer with an unknown buffer will implicitly create a
      // new one.  Here we bypass `GL.counter` and directly using the ID passed
      // in.
      if (buffer && !GL.buffers[buffer]) {
        var b = GLctx.createBuffer();
        b.name = buffer;
        GL.buffers[buffer] = b;
      }
      if (target == 0x8892 /*GL_ARRAY_BUFFER*/) {
        GLctx.currentArrayBufferBinding = buffer;
      } else if (target == 0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/) {
        GLctx.currentElementArrayBufferBinding = buffer;
      }
  
      if (target == 0x88EB /*GL_PIXEL_PACK_BUFFER*/) {
        // In WebGL 2 glReadPixels entry point, we need to use a different WebGL 2
        // API function call when a buffer is bound to
        // GL_PIXEL_PACK_BUFFER_BINDING point, so must keep track whether that
        // binding point is non-null to know what is the proper API function to
        // call.
        GLctx.currentPixelPackBufferBinding = buffer;
      } else if (target == 0x88EC /*GL_PIXEL_UNPACK_BUFFER*/) {
        // In WebGL 2 gl(Compressed)Tex(Sub)Image[23]D entry points, we need to
        // use a different WebGL 2 API function call when a buffer is bound to
        // GL_PIXEL_UNPACK_BUFFER_BINDING point, so must keep track whether that
        // binding point is non-null to know what is the proper API function to
        // call.
        GLctx.currentPixelUnpackBufferBinding = buffer;
      }
      GLctx.bindBuffer(target, GL.buffers[buffer]);
    };
  var _emscripten_glBindBuffer = _glBindBuffer;

  /** @suppress {duplicate } */
  var _glBindBufferBase = (target, index, buffer) => {
      GLctx.bindBufferBase(target, index, GL.buffers[buffer]);
    };
  var _emscripten_glBindBufferBase = _glBindBufferBase;

  /** @suppress {duplicate } */
  var _glBindBufferRange = (target, index, buffer, offset, ptrsize) => {
      GLctx.bindBufferRange(target, index, GL.buffers[buffer], offset, ptrsize);
    };
  var _emscripten_glBindBufferRange = _glBindBufferRange;

  /** @suppress {duplicate } */
  var _glBindFramebuffer = (target, framebuffer) => {
  
      GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
  
    };
  var _emscripten_glBindFramebuffer = _glBindFramebuffer;

  /** @suppress {duplicate } */
  var _glBindRenderbuffer = (target, renderbuffer) => {
      GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
    };
  var _emscripten_glBindRenderbuffer = _glBindRenderbuffer;

  /** @suppress {duplicate } */
  var _glBindSampler = (unit, sampler) => {
      GLctx.bindSampler(unit, GL.samplers[sampler]);
    };
  var _emscripten_glBindSampler = _glBindSampler;

  /** @suppress {duplicate } */
  var _glBindTexture = (target, texture) => {
      GLctx.bindTexture(target, GL.textures[texture]);
    };
  var _emscripten_glBindTexture = _glBindTexture;

  /** @suppress {duplicate } */
  var _glBindTransformFeedback = (target, id) => {
      GLctx.bindTransformFeedback(target, GL.transformFeedbacks[id]);
    };
  var _emscripten_glBindTransformFeedback = _glBindTransformFeedback;

  /** @suppress {duplicate } */
  var _glBindVertexArray = (vao) => {
      GLctx.bindVertexArray(GL.vaos[vao]);
      var ibo = GLctx.getParameter(0x8895 /*ELEMENT_ARRAY_BUFFER_BINDING*/);
      GLctx.currentElementArrayBufferBinding = ibo ? (ibo.name | 0) : 0;
    };
  var _emscripten_glBindVertexArray = _glBindVertexArray;

  
  /** @suppress {duplicate } */
  var _glBindVertexArrayOES = _glBindVertexArray;
  var _emscripten_glBindVertexArrayOES = _glBindVertexArrayOES;

  /** @suppress {duplicate } */
  var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);
  var _emscripten_glBlendColor = _glBlendColor;

  /** @suppress {duplicate } */
  var _glBlendEquation = (x0) => GLctx.blendEquation(x0);
  var _emscripten_glBlendEquation = _glBlendEquation;

  /** @suppress {duplicate } */
  var _glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);
  var _emscripten_glBlendEquationSeparate = _glBlendEquationSeparate;

  /** @suppress {duplicate } */
  var _glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);
  var _emscripten_glBlendFunc = _glBlendFunc;

  /** @suppress {duplicate } */
  var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);
  var _emscripten_glBlendFuncSeparate = _glBlendFuncSeparate;

  /** @suppress {duplicate } */
  var _glBlitFramebuffer = (x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) => GLctx.blitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);
  var _emscripten_glBlitFramebuffer = _glBlitFramebuffer;

  /** @suppress {duplicate } */
  var _glBufferData = (target, size, data, usage) => {
  
      if (GL.currentContext.version >= 2) {
        // If size is zero, WebGL would interpret uploading the whole input
        // arraybuffer (starting from given offset), which would not make sense in
        // WebAssembly, so avoid uploading if size is zero. However we must still
        // call bufferData to establish a backing storage of zero bytes.
        if (data && size) {
          GLctx.bufferData(target, HEAPU8, usage, data, size);
        } else {
          GLctx.bufferData(target, size, usage);
        }
        return;
      }
      // N.b. here first form specifies a heap subarray, second form an integer
      // size, so the ?: code here is polymorphic. It is advised to avoid
      // randomly mixing both uses in calling code, to avoid any potential JS
      // engine JIT issues.
      GLctx.bufferData(target, data ? HEAPU8.subarray(data, data+size) : size, usage);
    };
  var _emscripten_glBufferData = _glBufferData;

  /** @suppress {duplicate } */
  var _glBufferSubData = (target, offset, size, data) => {
      if (GL.currentContext.version >= 2) {
        size && GLctx.bufferSubData(target, offset, HEAPU8, data, size);
        return;
      }
      GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data+size));
    };
  var _emscripten_glBufferSubData = _glBufferSubData;

  /** @suppress {duplicate } */
  var _glCheckFramebufferStatus = (x0) => GLctx.checkFramebufferStatus(x0);
  var _emscripten_glCheckFramebufferStatus = _glCheckFramebufferStatus;

  /** @suppress {duplicate } */
  var _glClear = (x0) => GLctx.clear(x0);
  var _emscripten_glClear = _glClear;

  /** @suppress {duplicate } */
  var _glClearBufferfi = (x0, x1, x2, x3) => GLctx.clearBufferfi(x0, x1, x2, x3);
  var _emscripten_glClearBufferfi = _glClearBufferfi;

  /** @suppress {duplicate } */
  var _glClearBufferfv = (buffer, drawbuffer, value) => {
  
      GLctx.clearBufferfv(buffer, drawbuffer, HEAPF32, ((value)>>2));
    };
  var _emscripten_glClearBufferfv = _glClearBufferfv;

  /** @suppress {duplicate } */
  var _glClearBufferiv = (buffer, drawbuffer, value) => {
  
      GLctx.clearBufferiv(buffer, drawbuffer, HEAP32, ((value)>>2));
    };
  var _emscripten_glClearBufferiv = _glClearBufferiv;

  /** @suppress {duplicate } */
  var _glClearBufferuiv = (buffer, drawbuffer, value) => {
  
      GLctx.clearBufferuiv(buffer, drawbuffer, HEAPU32, ((value)>>2));
    };
  var _emscripten_glClearBufferuiv = _glClearBufferuiv;

  /** @suppress {duplicate } */
  var _glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);
  var _emscripten_glClearColor = _glClearColor;

  /** @suppress {duplicate } */
  var _glClearDepthf = (x0) => GLctx.clearDepth(x0);
  var _emscripten_glClearDepthf = _glClearDepthf;

  /** @suppress {duplicate } */
  var _glClearStencil = (x0) => GLctx.clearStencil(x0);
  var _emscripten_glClearStencil = _glClearStencil;

  /** @suppress {duplicate } */
  var _glClientWaitSync = (sync, flags, timeout) => {
      // WebGL2 vs GLES3 differences: in GLES3, the timeout parameter is a uint64, where 0xFFFFFFFFFFFFFFFFULL means GL_TIMEOUT_IGNORED.
      // In JS, there's no 64-bit value types, so instead timeout is taken to be signed, and GL_TIMEOUT_IGNORED is given value -1.
      // Inherently the value accepted in the timeout is lossy, and can't take in arbitrary u64 bit pattern (but most likely doesn't matter)
      // See https://www.khronos.org/registry/webgl/specs/latest/2.0/#5.15
      timeout = Number(timeout);
      return GLctx.clientWaitSync(GL.syncs[sync], flags, timeout);
    };
  var _emscripten_glClientWaitSync = _glClientWaitSync;

  /** @suppress {duplicate } */
  var _glClipControlEXT = (origin, depth) => {
      GLctx.extClipControl['clipControlEXT'](origin, depth);
    };
  var _emscripten_glClipControlEXT = _glClipControlEXT;

  /** @suppress {duplicate } */
  var _glColorMask = (red, green, blue, alpha) => {
      GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
    };
  var _emscripten_glColorMask = _glColorMask;

  /** @suppress {duplicate } */
  var _glCompileShader = (shader) => {
      GLctx.compileShader(GL.shaders[shader]);
    };
  var _emscripten_glCompileShader = _glCompileShader;

  /** @suppress {duplicate } */
  var _glCompressedTexImage2D = (target, level, internalFormat, width, height, border, imageSize, data) => {
      // `data` may be null here, which means "allocate uniniitalized space but
      // don't upload" in GLES parlance, but `compressedTexImage2D` requires the
      // final data parameter, so we simply pass a heap view starting at zero
      // effectively uploading whatever happens to be near address zero.  See
      // https://github.com/emscripten-core/emscripten/issues/19300.
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
          GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data);
          return;
        }
        GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8, data, imageSize);
        return;
      }
      GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8.subarray((data), data+imageSize));
    };
  var _emscripten_glCompressedTexImage2D = _glCompressedTexImage2D;

  /** @suppress {duplicate } */
  var _glCompressedTexImage3D = (target, level, internalFormat, width, height, depth, border, imageSize, data) => {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data);
      } else {
        GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, HEAPU8, data, imageSize);
      }
    };
  var _emscripten_glCompressedTexImage3D = _glCompressedTexImage3D;

  /** @suppress {duplicate } */
  var _glCompressedTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, imageSize, data) => {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
          GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data);
          return;
        }
        GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, HEAPU8, data, imageSize);
        return;
      }
      GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, HEAPU8.subarray((data), data+imageSize));
    };
  var _emscripten_glCompressedTexSubImage2D = _glCompressedTexSubImage2D;

  /** @suppress {duplicate } */
  var _glCompressedTexSubImage3D = (target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data) => {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data);
      } else {
        GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, HEAPU8, data, imageSize);
      }
    };
  var _emscripten_glCompressedTexSubImage3D = _glCompressedTexSubImage3D;

  /** @suppress {duplicate } */
  var _glCopyBufferSubData = (x0, x1, x2, x3, x4) => GLctx.copyBufferSubData(x0, x1, x2, x3, x4);
  var _emscripten_glCopyBufferSubData = _glCopyBufferSubData;

  /** @suppress {duplicate } */
  var _glCopyTexImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
  var _emscripten_glCopyTexImage2D = _glCopyTexImage2D;

  /** @suppress {duplicate } */
  var _glCopyTexSubImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
  var _emscripten_glCopyTexSubImage2D = _glCopyTexSubImage2D;

  /** @suppress {duplicate } */
  var _glCopyTexSubImage3D = (x0, x1, x2, x3, x4, x5, x6, x7, x8) => GLctx.copyTexSubImage3D(x0, x1, x2, x3, x4, x5, x6, x7, x8);
  var _emscripten_glCopyTexSubImage3D = _glCopyTexSubImage3D;

  /** @suppress {duplicate } */
  var _glCreateProgram = () => {
      var id = GL.getNewId(GL.programs);
      var program = GLctx.createProgram();
      // Store additional information needed for each shader program:
      program.name = id;
      // Lazy cache results of
      // glGetProgramiv(GL_ACTIVE_UNIFORM_MAX_LENGTH/GL_ACTIVE_ATTRIBUTE_MAX_LENGTH/GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH)
      program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
      program.uniformIdCounter = 1;
      GL.programs[id] = program;
      return id;
    };
  var _emscripten_glCreateProgram = _glCreateProgram;

  /** @suppress {duplicate } */
  var _glCreateShader = (shaderType) => {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
  
      return id;
    };
  var _emscripten_glCreateShader = _glCreateShader;

  /** @suppress {duplicate } */
  var _glCullFace = (x0) => GLctx.cullFace(x0);
  var _emscripten_glCullFace = _glCullFace;

  /** @suppress {duplicate } */
  var _glDeleteBuffers = (n, buffers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((buffers)+(i*4))>>2)];
        var buffer = GL.buffers[id];
  
        // From spec: "glDeleteBuffers silently ignores 0's and names that do not
        // correspond to existing buffer objects."
        if (!buffer) continue;
  
        GLctx.deleteBuffer(buffer);
        buffer.name = 0;
        GL.buffers[id] = null;
  
        if (id == GLctx.currentArrayBufferBinding) GLctx.currentArrayBufferBinding = 0;
        if (id == GLctx.currentElementArrayBufferBinding) GLctx.currentElementArrayBufferBinding = 0;
        if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0;
        if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0;
      }
    };
  var _emscripten_glDeleteBuffers = _glDeleteBuffers;

  /** @suppress {duplicate } */
  var _glDeleteFramebuffers = (n, framebuffers) => {
      for (var i = 0; i < n; ++i) {
        var id = HEAP32[(((framebuffers)+(i*4))>>2)];
        var framebuffer = GL.framebuffers[id];
        if (!framebuffer) continue; // GL spec: "glDeleteFramebuffers silently ignores 0s and names that do not correspond to existing framebuffer objects".
        GLctx.deleteFramebuffer(framebuffer);
        framebuffer.name = 0;
        GL.framebuffers[id] = null;
      }
    };
  var _emscripten_glDeleteFramebuffers = _glDeleteFramebuffers;

  /** @suppress {duplicate } */
  var _glDeleteProgram = (id) => {
      if (!id) return;
      var program = GL.programs[id];
      if (!program) {
        // glDeleteProgram actually signals an error when deleting a nonexisting
        // object, unlike some other GL delete functions.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteProgram(program);
      program.name = 0;
      GL.programs[id] = null;
    };
  var _emscripten_glDeleteProgram = _glDeleteProgram;

  /** @suppress {duplicate } */
  var _glDeleteQueries = (n, ids) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((ids)+(i*4))>>2)];
        var query = GL.queries[id];
        if (!query) continue; // GL spec: "unused names in ids are ignored, as is the name zero."
        GLctx.deleteQuery(query);
        GL.queries[id] = null;
      }
    };
  var _emscripten_glDeleteQueries = _glDeleteQueries;

  /** @suppress {duplicate } */
  var _glDeleteQueriesEXT = (n, ids) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((ids)+(i*4))>>2)];
        var query = GL.queries[id];
        if (!query) continue; // GL spec: "unused names in ids are ignored, as is the name zero."
        GLctx.disjointTimerQueryExt['deleteQueryEXT'](query);
        GL.queries[id] = null;
      }
    };
  var _emscripten_glDeleteQueriesEXT = _glDeleteQueriesEXT;

  /** @suppress {duplicate } */
  var _glDeleteRenderbuffers = (n, renderbuffers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((renderbuffers)+(i*4))>>2)];
        var renderbuffer = GL.renderbuffers[id];
        if (!renderbuffer) continue; // GL spec: "glDeleteRenderbuffers silently ignores 0s and names that do not correspond to existing renderbuffer objects".
        GLctx.deleteRenderbuffer(renderbuffer);
        renderbuffer.name = 0;
        GL.renderbuffers[id] = null;
      }
    };
  var _emscripten_glDeleteRenderbuffers = _glDeleteRenderbuffers;

  /** @suppress {duplicate } */
  var _glDeleteSamplers = (n, samplers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((samplers)+(i*4))>>2)];
        var sampler = GL.samplers[id];
        if (!sampler) continue;
        GLctx.deleteSampler(sampler);
        sampler.name = 0;
        GL.samplers[id] = null;
      }
    };
  var _emscripten_glDeleteSamplers = _glDeleteSamplers;

  /** @suppress {duplicate } */
  var _glDeleteShader = (id) => {
      if (!id) return;
      var shader = GL.shaders[id];
      if (!shader) {
        // glDeleteShader actually signals an error when deleting a nonexisting
        // object, unlike some other GL delete functions.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteShader(shader);
      GL.shaders[id] = null;
    };
  var _emscripten_glDeleteShader = _glDeleteShader;

  /** @suppress {duplicate } */
  var _glDeleteSync = (id) => {
      if (!id) return;
      var sync = GL.syncs[id];
      if (!sync) { // glDeleteSync signals an error when deleting a nonexisting object, unlike some other GL delete functions.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteSync(sync);
      sync.name = 0;
      GL.syncs[id] = null;
    };
  var _emscripten_glDeleteSync = _glDeleteSync;

  /** @suppress {duplicate } */
  var _glDeleteTextures = (n, textures) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((textures)+(i*4))>>2)];
        var texture = GL.textures[id];
        // GL spec: "glDeleteTextures silently ignores 0s and names that do not
        // correspond to existing textures".
        if (!texture) continue;
        GLctx.deleteTexture(texture);
        texture.name = 0;
        GL.textures[id] = null;
      }
    };
  var _emscripten_glDeleteTextures = _glDeleteTextures;

  /** @suppress {duplicate } */
  var _glDeleteTransformFeedbacks = (n, ids) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((ids)+(i*4))>>2)];
        var transformFeedback = GL.transformFeedbacks[id];
        if (!transformFeedback) continue; // GL spec: "unused names in ids are ignored, as is the name zero."
        GLctx.deleteTransformFeedback(transformFeedback);
        transformFeedback.name = 0;
        GL.transformFeedbacks[id] = null;
      }
    };
  var _emscripten_glDeleteTransformFeedbacks = _glDeleteTransformFeedbacks;

  /** @suppress {duplicate } */
  var _glDeleteVertexArrays = (n, vaos) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((vaos)+(i*4))>>2)];
        GLctx.deleteVertexArray(GL.vaos[id]);
        GL.vaos[id] = null;
      }
    };
  var _emscripten_glDeleteVertexArrays = _glDeleteVertexArrays;

  
  /** @suppress {duplicate } */
  var _glDeleteVertexArraysOES = _glDeleteVertexArrays;
  var _emscripten_glDeleteVertexArraysOES = _glDeleteVertexArraysOES;

  /** @suppress {duplicate } */
  var _glDepthFunc = (x0) => GLctx.depthFunc(x0);
  var _emscripten_glDepthFunc = _glDepthFunc;

  /** @suppress {duplicate } */
  var _glDepthMask = (flag) => {
      GLctx.depthMask(!!flag);
    };
  var _emscripten_glDepthMask = _glDepthMask;

  /** @suppress {duplicate } */
  var _glDepthRangef = (x0, x1) => GLctx.depthRange(x0, x1);
  var _emscripten_glDepthRangef = _glDepthRangef;

  /** @suppress {duplicate } */
  var _glDetachShader = (program, shader) => {
      GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
    };
  var _emscripten_glDetachShader = _glDetachShader;

  /** @suppress {duplicate } */
  var _glDisable = (x0) => GLctx.disable(x0);
  var _emscripten_glDisable = _glDisable;

  /** @suppress {duplicate } */
  var _glDisableVertexAttribArray = (index) => {
      var cb = GL.currentContext.clientBuffers[index];
      cb.enabled = false;
      GLctx.disableVertexAttribArray(index);
    };
  var _emscripten_glDisableVertexAttribArray = _glDisableVertexAttribArray;

  /** @suppress {duplicate } */
  var _glDrawArrays = (mode, first, count) => {
      // bind any client-side buffers
      GL.preDrawHandleClientVertexAttribBindings(first + count);
  
      GLctx.drawArrays(mode, first, count);
  
      GL.postDrawHandleClientVertexAttribBindings();
    };
  var _emscripten_glDrawArrays = _glDrawArrays;

  /** @suppress {duplicate } */
  var _glDrawArraysInstanced = (mode, first, count, primcount) => {
      GLctx.drawArraysInstanced(mode, first, count, primcount);
    };
  var _emscripten_glDrawArraysInstanced = _glDrawArraysInstanced;

  
  /** @suppress {duplicate } */
  var _glDrawArraysInstancedANGLE = _glDrawArraysInstanced;
  var _emscripten_glDrawArraysInstancedANGLE = _glDrawArraysInstancedANGLE;

  
  /** @suppress {duplicate } */
  var _glDrawArraysInstancedARB = _glDrawArraysInstanced;
  var _emscripten_glDrawArraysInstancedARB = _glDrawArraysInstancedARB;

  
  /** @suppress {duplicate } */
  var _glDrawArraysInstancedEXT = _glDrawArraysInstanced;
  var _emscripten_glDrawArraysInstancedEXT = _glDrawArraysInstancedEXT;

  
  /** @suppress {duplicate } */
  var _glDrawArraysInstancedNV = _glDrawArraysInstanced;
  var _emscripten_glDrawArraysInstancedNV = _glDrawArraysInstancedNV;

  var tempFixedLengthArray = [];
  
  /** @suppress {duplicate } */
  var _glDrawBuffers = (n, bufs) => {
  
      var bufArray = tempFixedLengthArray[n];
      for (var i = 0; i < n; i++) {
        bufArray[i] = HEAP32[(((bufs)+(i*4))>>2)];
      }
  
      GLctx.drawBuffers(bufArray);
    };
  var _emscripten_glDrawBuffers = _glDrawBuffers;

  
  /** @suppress {duplicate } */
  var _glDrawBuffersEXT = _glDrawBuffers;
  var _emscripten_glDrawBuffersEXT = _glDrawBuffersEXT;

  
  /** @suppress {duplicate } */
  var _glDrawBuffersWEBGL = _glDrawBuffers;
  var _emscripten_glDrawBuffersWEBGL = _glDrawBuffersWEBGL;

  /** @suppress {duplicate } */
  var _glDrawElements = (mode, count, type, indices) => {
      var buf;
      var vertexes = 0;
      if (!GLctx.currentElementArrayBufferBinding) {
        var size = GL.calcBufLength(1, type, 0, count);
        buf = GL.getTempIndexBuffer(size);
        GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, buf);
        GLctx.bufferSubData(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/,
                            0,
                            HEAPU8.subarray(indices, indices + size));
        
        // Calculating vertex count if shader's attribute data is on client side
        if (count > 0) {
          for (var i = 0; i < GL.currentContext.maxVertexAttribs; ++i) {
            var cb = GL.currentContext.clientBuffers[i];
            if (cb.clientside && cb.enabled) {
              let arrayClass;
              switch(type) {
                case 0x1401 /* GL_UNSIGNED_BYTE */: arrayClass = Uint8Array; break;
                case 0x1403 /* GL_UNSIGNED_SHORT */: arrayClass = Uint16Array; break;
                case 0x1405 /* GL_UNSIGNED_INT */: arrayClass = Uint32Array; break;
                default:
                  GL.recordError(0x502 /* GL_INVALID_OPERATION */);
                  return;
              }
  
              vertexes = new arrayClass(HEAPU8.buffer, indices, count).reduce((max, current) => Math.max(max, current)) + 1;
              break;
            }
          }
        }
  
        // the index is now 0
        indices = 0;
      }
  
      // bind any client-side buffers
      GL.preDrawHandleClientVertexAttribBindings(vertexes);
  
      GLctx.drawElements(mode, count, type, indices);
  
      GL.postDrawHandleClientVertexAttribBindings(count);
  
      if (!GLctx.currentElementArrayBufferBinding) {
        GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, null);
      }
    };
  var _emscripten_glDrawElements = _glDrawElements;

  /** @suppress {duplicate } */
  var _glDrawElementsInstanced = (mode, count, type, indices, primcount) => {
      GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
    };
  var _emscripten_glDrawElementsInstanced = _glDrawElementsInstanced;

  
  /** @suppress {duplicate } */
  var _glDrawElementsInstancedANGLE = _glDrawElementsInstanced;
  var _emscripten_glDrawElementsInstancedANGLE = _glDrawElementsInstancedANGLE;

  
  /** @suppress {duplicate } */
  var _glDrawElementsInstancedARB = _glDrawElementsInstanced;
  var _emscripten_glDrawElementsInstancedARB = _glDrawElementsInstancedARB;

  
  /** @suppress {duplicate } */
  var _glDrawElementsInstancedEXT = _glDrawElementsInstanced;
  var _emscripten_glDrawElementsInstancedEXT = _glDrawElementsInstancedEXT;

  
  /** @suppress {duplicate } */
  var _glDrawElementsInstancedNV = _glDrawElementsInstanced;
  var _emscripten_glDrawElementsInstancedNV = _glDrawElementsInstancedNV;

  /** @suppress {duplicate } */
  var _glDrawRangeElements = (mode, start, end, count, type, indices) => {
      // TODO: This should be a trivial pass-though function registered at the bottom of this page as
      // glFuncs[6][1] += ' drawRangeElements';
      // but due to https://bugzilla.mozilla.org/show_bug.cgi?id=1202427,
      // we work around by ignoring the range.
      _glDrawElements(mode, count, type, indices);
    };
  var _emscripten_glDrawRangeElements = _glDrawRangeElements;

  /** @suppress {duplicate } */
  var _glEnable = (x0) => GLctx.enable(x0);
  var _emscripten_glEnable = _glEnable;

  /** @suppress {duplicate } */
  var _glEnableVertexAttribArray = (index) => {
      var cb = GL.currentContext.clientBuffers[index];
      cb.enabled = true;
      GLctx.enableVertexAttribArray(index);
    };
  var _emscripten_glEnableVertexAttribArray = _glEnableVertexAttribArray;

  /** @suppress {duplicate } */
  var _glEndQuery = (x0) => GLctx.endQuery(x0);
  var _emscripten_glEndQuery = _glEndQuery;

  /** @suppress {duplicate } */
  var _glEndQueryEXT = (target) => {
      GLctx.disjointTimerQueryExt['endQueryEXT'](target);
    };
  var _emscripten_glEndQueryEXT = _glEndQueryEXT;

  /** @suppress {duplicate } */
  var _glEndTransformFeedback = () => GLctx.endTransformFeedback();
  var _emscripten_glEndTransformFeedback = _glEndTransformFeedback;

  /** @suppress {duplicate } */
  var _glFenceSync = (condition, flags) => {
      var sync = GLctx.fenceSync(condition, flags);
      if (sync) {
        var id = GL.getNewId(GL.syncs);
        sync.name = id;
        GL.syncs[id] = sync;
        return id;
      }
      return 0; // Failed to create a sync object
    };
  var _emscripten_glFenceSync = _glFenceSync;

  /** @suppress {duplicate } */
  var _glFinish = () => GLctx.finish();
  var _emscripten_glFinish = _glFinish;

  /** @suppress {duplicate } */
  var _glFlush = () => GLctx.flush();
  var _emscripten_glFlush = _glFlush;

  var emscriptenWebGLGetBufferBinding = (target) => {
      switch (target) {
        case 0x8892 /*GL_ARRAY_BUFFER*/: target = 0x8894 /*GL_ARRAY_BUFFER_BINDING*/; break;
        case 0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/: target = 0x8895 /*GL_ELEMENT_ARRAY_BUFFER_BINDING*/; break;
        case 0x88EB /*GL_PIXEL_PACK_BUFFER*/: target = 0x88ED /*GL_PIXEL_PACK_BUFFER_BINDING*/; break;
        case 0x88EC /*GL_PIXEL_UNPACK_BUFFER*/: target = 0x88EF /*GL_PIXEL_UNPACK_BUFFER_BINDING*/; break;
        case 0x8C8E /*GL_TRANSFORM_FEEDBACK_BUFFER*/: target = 0x8C8F /*GL_TRANSFORM_FEEDBACK_BUFFER_BINDING*/; break;
        case 0x8F36 /*GL_COPY_READ_BUFFER*/: target = 0x8F36 /*GL_COPY_READ_BUFFER_BINDING*/; break;
        case 0x8F37 /*GL_COPY_WRITE_BUFFER*/: target = 0x8F37 /*GL_COPY_WRITE_BUFFER_BINDING*/; break;
        case 0x8A11 /*GL_UNIFORM_BUFFER*/: target = 0x8A28 /*GL_UNIFORM_BUFFER_BINDING*/; break;
        // In default case, fall through and assume passed one of the _BINDING enums directly.
      }
      var buffer = GLctx.getParameter(target);
      if (buffer) return buffer.name|0;
      else return 0;
    };
  
  var emscriptenWebGLValidateMapBufferTarget = (target) => {
      switch (target) {
        case 0x8892: // GL_ARRAY_BUFFER
        case 0x8893: // GL_ELEMENT_ARRAY_BUFFER
        case 0x8F36: // GL_COPY_READ_BUFFER
        case 0x8F37: // GL_COPY_WRITE_BUFFER
        case 0x88EB: // GL_PIXEL_PACK_BUFFER
        case 0x88EC: // GL_PIXEL_UNPACK_BUFFER
        case 0x8C2A: // GL_TEXTURE_BUFFER
        case 0x8C8E: // GL_TRANSFORM_FEEDBACK_BUFFER
        case 0x8A11: // GL_UNIFORM_BUFFER
          return true;
        default:
          return false;
      }
    };
  
  /** @suppress {duplicate } */
  var _glFlushMappedBufferRange = (target, offset, length) => {
      if (!emscriptenWebGLValidateMapBufferTarget(target)) {
        GL.recordError(0x500/*GL_INVALID_ENUM*/);
        err('GL_INVALID_ENUM in glFlushMappedBufferRange');
        return;
      }
  
      var mapping = GL.mappedBuffers[emscriptenWebGLGetBufferBinding(target)];
      if (!mapping) {
        GL.recordError(0x502 /* GL_INVALID_OPERATION */);
        err('buffer was never mapped in glFlushMappedBufferRange');
        return;
      }
  
      if (!(mapping.access & 0x10)) {
        GL.recordError(0x502 /* GL_INVALID_OPERATION */);
        err('buffer was not mapped with GL_MAP_FLUSH_EXPLICIT_BIT in glFlushMappedBufferRange');
        return;
      }
      if (offset < 0 || length < 0 || offset + length > mapping.length) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        err('invalid range in glFlushMappedBufferRange');
        return;
      }
  
      GLctx.bufferSubData(
        target,
        mapping.offset,
        HEAPU8.subarray(mapping.mem + offset, mapping.mem + offset + length));
    };
  var _emscripten_glFlushMappedBufferRange = _glFlushMappedBufferRange;

  /** @suppress {duplicate } */
  var _glFramebufferRenderbuffer = (target, attachment, renderbuffertarget, renderbuffer) => {
      GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget,
                                         GL.renderbuffers[renderbuffer]);
    };
  var _emscripten_glFramebufferRenderbuffer = _glFramebufferRenderbuffer;

  /** @suppress {duplicate } */
  var _glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
      GLctx.framebufferTexture2D(target, attachment, textarget,
                                      GL.textures[texture], level);
    };
  var _emscripten_glFramebufferTexture2D = _glFramebufferTexture2D;

  /** @suppress {duplicate } */
  var _glFramebufferTextureLayer = (target, attachment, texture, level, layer) => {
      GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer);
    };
  var _emscripten_glFramebufferTextureLayer = _glFramebufferTextureLayer;

  /** @suppress {duplicate } */
  var _glFrontFace = (x0) => GLctx.frontFace(x0);
  var _emscripten_glFrontFace = _glFrontFace;

  /** @suppress {duplicate } */
  var _glGenBuffers = (n, buffers) => {
      GL.genObject(n, buffers, 'createBuffer', GL.buffers
        );
    };
  var _emscripten_glGenBuffers = _glGenBuffers;

  /** @suppress {duplicate } */
  var _glGenFramebuffers = (n, ids) => {
      GL.genObject(n, ids, 'createFramebuffer', GL.framebuffers
        );
    };
  var _emscripten_glGenFramebuffers = _glGenFramebuffers;

  /** @suppress {duplicate } */
  var _glGenQueries = (n, ids) => {
      GL.genObject(n, ids, 'createQuery', GL.queries
        );
    };
  var _emscripten_glGenQueries = _glGenQueries;

  /** @suppress {duplicate } */
  var _glGenQueriesEXT = (n, ids) => {
      for (var i = 0; i < n; i++) {
        var query = GLctx.disjointTimerQueryExt['createQueryEXT']();
        if (!query) {
          GL.recordError(0x502 /* GL_INVALID_OPERATION */);
          while (i < n) HEAP32[(((ids)+(i++*4))>>2)] = 0;
          return;
        }
        var id = GL.getNewId(GL.queries);
        query.name = id;
        GL.queries[id] = query;
        HEAP32[(((ids)+(i*4))>>2)] = id;
      }
    };
  var _emscripten_glGenQueriesEXT = _glGenQueriesEXT;

  /** @suppress {duplicate } */
  var _glGenRenderbuffers = (n, renderbuffers) => {
      GL.genObject(n, renderbuffers, 'createRenderbuffer', GL.renderbuffers
        );
    };
  var _emscripten_glGenRenderbuffers = _glGenRenderbuffers;

  /** @suppress {duplicate } */
  var _glGenSamplers = (n, samplers) => {
      GL.genObject(n, samplers, 'createSampler', GL.samplers
        );
    };
  var _emscripten_glGenSamplers = _glGenSamplers;

  /** @suppress {duplicate } */
  var _glGenTextures = (n, textures) => {
      GL.genObject(n, textures, 'createTexture', GL.textures
        );
    };
  var _emscripten_glGenTextures = _glGenTextures;

  /** @suppress {duplicate } */
  var _glGenTransformFeedbacks = (n, ids) => {
      GL.genObject(n, ids, 'createTransformFeedback', GL.transformFeedbacks
        );
    };
  var _emscripten_glGenTransformFeedbacks = _glGenTransformFeedbacks;

  /** @suppress {duplicate } */
  var _glGenVertexArrays = (n, arrays) => {
      GL.genObject(n, arrays, 'createVertexArray', GL.vaos
        );
    };
  var _emscripten_glGenVertexArrays = _glGenVertexArrays;

  
  /** @suppress {duplicate } */
  var _glGenVertexArraysOES = _glGenVertexArrays;
  var _emscripten_glGenVertexArraysOES = _glGenVertexArraysOES;

  /** @suppress {duplicate } */
  var _glGenerateMipmap = (x0) => GLctx.generateMipmap(x0);
  var _emscripten_glGenerateMipmap = _glGenerateMipmap;

  
  var __glGetActiveAttribOrUniform = (funcName, program, index, bufSize, length, size, type, name) => {
      program = GL.programs[program];
      var info = GLctx[funcName](program, index);
      if (info) {
        // If an error occurs, nothing will be written to length, size and type and name.
        var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize);
        if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
        if (size) HEAP32[((size)>>2)] = info.size;
        if (type) HEAP32[((type)>>2)] = info.type;
      }
    };
  
  /** @suppress {duplicate } */
  var _glGetActiveAttrib = (program, index, bufSize, length, size, type, name) =>
      __glGetActiveAttribOrUniform('getActiveAttrib', program, index, bufSize, length, size, type, name);
  var _emscripten_glGetActiveAttrib = _glGetActiveAttrib;

  
  /** @suppress {duplicate } */
  var _glGetActiveUniform = (program, index, bufSize, length, size, type, name) =>
      __glGetActiveAttribOrUniform('getActiveUniform', program, index, bufSize, length, size, type, name);
  var _emscripten_glGetActiveUniform = _glGetActiveUniform;

  /** @suppress {duplicate } */
  var _glGetActiveUniformBlockName = (program, uniformBlockIndex, bufSize, length, uniformBlockName) => {
      program = GL.programs[program];
  
      var result = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
      if (!result) return; // If an error occurs, nothing will be written to uniformBlockName or length.
      if (uniformBlockName && bufSize > 0) {
        var numBytesWrittenExclNull = stringToUTF8(result, uniformBlockName, bufSize);
        if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
      } else {
        if (length) HEAP32[((length)>>2)] = 0;
      }
    };
  var _emscripten_glGetActiveUniformBlockName = _glGetActiveUniformBlockName;

  /** @suppress {duplicate } */
  var _glGetActiveUniformBlockiv = (program, uniformBlockIndex, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if params == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      program = GL.programs[program];
  
      if (pname == 0x8A41 /* GL_UNIFORM_BLOCK_NAME_LENGTH */) {
        var name = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
        HEAP32[((params)>>2)] = name.length+1;
        return;
      }
  
      var result = GLctx.getActiveUniformBlockParameter(program, uniformBlockIndex, pname);
      if (result === null) return; // If an error occurs, nothing should be written to params.
      if (pname == 0x8A43 /*GL_UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES*/) {
        for (var i = 0; i < result.length; i++) {
          HEAP32[(((params)+(i*4))>>2)] = result[i];
        }
      } else {
        HEAP32[((params)>>2)] = result;
      }
    };
  var _emscripten_glGetActiveUniformBlockiv = _glGetActiveUniformBlockiv;

  /** @suppress {duplicate } */
  var _glGetActiveUniformsiv = (program, uniformCount, uniformIndices, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if params == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (uniformCount > 0 && uniformIndices == 0) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      program = GL.programs[program];
      var ids = [];
      for (var i = 0; i < uniformCount; i++) {
        ids.push(HEAP32[(((uniformIndices)+(i*4))>>2)]);
      }
  
      var result = GLctx.getActiveUniforms(program, ids, pname);
      if (!result) return; // GL spec: If an error is generated, nothing is written out to params.
  
      var len = result.length;
      for (var i = 0; i < len; i++) {
        HEAP32[(((params)+(i*4))>>2)] = result[i];
      }
    };
  var _emscripten_glGetActiveUniformsiv = _glGetActiveUniformsiv;

  /** @suppress {duplicate } */
  var _glGetAttachedShaders = (program, maxCount, count, shaders) => {
      var result = GLctx.getAttachedShaders(GL.programs[program]);
      var len = result.length;
      if (len > maxCount) {
        len = maxCount;
      }
      HEAP32[((count)>>2)] = len;
      for (var i = 0; i < len; ++i) {
        var id = GL.shaders.indexOf(result[i]);
        HEAP32[(((shaders)+(i*4))>>2)] = id;
      }
    };
  var _emscripten_glGetAttachedShaders = _glGetAttachedShaders;

  
  /** @suppress {duplicate } */
  var _glGetAttribLocation = (program, name) =>
      GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
  var _emscripten_glGetAttribLocation = _glGetAttribLocation;

  var readI53FromI64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAP32[(((ptr)+(4))>>2)] * 4294967296;
    };
  
  var readI53FromU64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAPU32[(((ptr)+(4))>>2)] * 4294967296;
    };
  var writeI53ToI64 = (ptr, num) => {
      HEAPU32[((ptr)>>2)] = num;
      var lower = HEAPU32[((ptr)>>2)];
      HEAPU32[(((ptr)+(4))>>2)] = (num - lower)/4294967296;
      var deserialized = (num >= 0) ? readI53FromU64(ptr) : readI53FromI64(ptr);
      var offset = ((ptr)>>2);
      if (deserialized != num) warnOnce(`writeI53ToI64() out of range: serialized JS Number ${num} to Wasm heap as bytes lo=${ptrToString(HEAPU32[offset])}, hi=${ptrToString(HEAPU32[offset+1])}, which deserializes back to ${deserialized} instead!`);
    };
  
  
  var webglGetExtensions = () => {
      var exts = getEmscriptenSupportedExtensions(GLctx);
      exts = exts.concat(exts.map((e) => "GL_" + e));
      return exts;
    };
  
  var emscriptenWebGLGet = (name_, p, type) => {
      // Guard against user passing a null pointer.
      // Note that GLES2 spec does not say anything about how passing a null
      // pointer should be treated.  Testing on desktop core GL 3, the application
      // crashes on glGetIntegerv to a null pointer, but better to report an error
      // instead of doing anything random.
      if (!p) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var ret = undefined;
      switch (name_) { // Handle a few trivial GLES values
        case 0x8DFA: // GL_SHADER_COMPILER
          ret = 1;
          break;
        case 0x8DF8: // GL_SHADER_BINARY_FORMATS
          if (type != 0 && type != 1) {
            GL.recordError(0x500); // GL_INVALID_ENUM
          }
          // Do not write anything to the out pointer, since no binary formats are
          // supported.
          return;
        case 0x87FE: // GL_NUM_PROGRAM_BINARY_FORMATS
        case 0x8DF9: // GL_NUM_SHADER_BINARY_FORMATS
          ret = 0;
          break;
        case 0x86A2: // GL_NUM_COMPRESSED_TEXTURE_FORMATS
          // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete
          // since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be
          // queried for length), so implement it ourselves to allow C++ GLES2
          // code get the length.
          var formats = GLctx.getParameter(0x86A3 /*GL_COMPRESSED_TEXTURE_FORMATS*/);
          ret = formats ? formats.length : 0;
          break;
  
        case 0x821D: // GL_NUM_EXTENSIONS
          if (GL.currentContext.version < 2) {
            // Calling GLES3/WebGL2 function with a GLES2/WebGL1 context
            GL.recordError(0x502 /* GL_INVALID_OPERATION */);
            return;
          }
          ret = webglGetExtensions().length;
          break;
        case 0x821B: // GL_MAJOR_VERSION
        case 0x821C: // GL_MINOR_VERSION
          if (GL.currentContext.version < 2) {
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          }
          ret = name_ == 0x821B ? 3 : 0; // return version 3.0
          break;
      }
  
      if (ret === undefined) {
        var result = GLctx.getParameter(name_);
        switch (typeof result) {
          case "number":
            ret = result;
            break;
          case "boolean":
            ret = result ? 1 : 0;
            break;
          case "string":
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          case "object":
            if (result === null) {
              // null is a valid result for some (e.g., which buffer is bound -
              // perhaps nothing is bound), but otherwise can mean an invalid
              // name_, which we need to report as an error
              switch (name_) {
                case 0x8894: // ARRAY_BUFFER_BINDING
                case 0x8B8D: // CURRENT_PROGRAM
                case 0x8895: // ELEMENT_ARRAY_BUFFER_BINDING
                case 0x8CA6: // FRAMEBUFFER_BINDING or DRAW_FRAMEBUFFER_BINDING
                case 0x8CA7: // RENDERBUFFER_BINDING
                case 0x8069: // TEXTURE_BINDING_2D
                case 0x85B5: // WebGL 2 GL_VERTEX_ARRAY_BINDING, or WebGL 1 extension OES_vertex_array_object GL_VERTEX_ARRAY_BINDING_OES
                case 0x8F36: // COPY_READ_BUFFER_BINDING or COPY_READ_BUFFER
                case 0x8F37: // COPY_WRITE_BUFFER_BINDING or COPY_WRITE_BUFFER
                case 0x88ED: // PIXEL_PACK_BUFFER_BINDING
                case 0x88EF: // PIXEL_UNPACK_BUFFER_BINDING
                case 0x8CAA: // READ_FRAMEBUFFER_BINDING
                case 0x8919: // SAMPLER_BINDING
                case 0x8C1D: // TEXTURE_BINDING_2D_ARRAY
                case 0x806A: // TEXTURE_BINDING_3D
                case 0x8E25: // TRANSFORM_FEEDBACK_BINDING
                case 0x8C8F: // TRANSFORM_FEEDBACK_BUFFER_BINDING
                case 0x8A28: // UNIFORM_BUFFER_BINDING
                case 0x8514: { // TEXTURE_BINDING_CUBE_MAP
                  ret = 0;
                  break;
                }
                default: {
                  GL.recordError(0x500); // GL_INVALID_ENUM
                  return;
                }
              }
            } else if (result instanceof Float32Array ||
                       result instanceof Uint32Array ||
                       result instanceof Int32Array ||
                       result instanceof Array) {
              for (var i = 0; i < result.length; ++i) {
                switch (type) {
                  case 0: HEAP32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 2: HEAPF32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 4: HEAP8[(p)+(i)] = result[i] ? 1 : 0; break;
                }
              }
              return;
            } else {
              try {
                ret = result.name | 0;
              } catch(e) {
                GL.recordError(0x500); // GL_INVALID_ENUM
                err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
                return;
              }
            }
            break;
          default:
            GL.recordError(0x500); // GL_INVALID_ENUM
            err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof(result)}!`);
            return;
        }
      }
  
      switch (type) {
        case 1: writeI53ToI64(p, ret); break;
        case 0: HEAP32[((p)>>2)] = ret; break;
        case 2:   HEAPF32[((p)>>2)] = ret; break;
        case 4: HEAP8[p] = ret ? 1 : 0; break;
      }
    };
  
  /** @suppress {duplicate } */
  var _glGetBooleanv = (name_, p) => emscriptenWebGLGet(name_, p, 4);
  var _emscripten_glGetBooleanv = _glGetBooleanv;

  /** @suppress {duplicate } */
  var _glGetBufferParameteri64v = (target, value, data) => {
      if (!data) {
        // GLES2 specification does not specify how to behave if data is a null pointer. Since calling this function does not make sense
        // if data == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      writeI53ToI64(data, GLctx.getBufferParameter(target, value));
    };
  var _emscripten_glGetBufferParameteri64v = _glGetBufferParameteri64v;

  /** @suppress {duplicate } */
  var _glGetBufferParameteriv = (target, value, data) => {
      if (!data) {
        // GLES2 specification does not specify how to behave if data is a null
        // pointer. Since calling this function does not make sense if data ==
        // null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((data)>>2)] = GLctx.getBufferParameter(target, value);
    };
  var _emscripten_glGetBufferParameteriv = _glGetBufferParameteriv;

  
  /** @suppress {duplicate } */
  var _glGetBufferPointerv = (target, pname, params) => {
      if (pname == 0x88BD/*GL_BUFFER_MAP_POINTER*/) {
        var ptr = 0;
        var mappedBuffer = GL.mappedBuffers[emscriptenWebGLGetBufferBinding(target)];
        if (mappedBuffer) {
          ptr = mappedBuffer.mem;
        }
        HEAP32[((params)>>2)] = ptr;
      } else {
        GL.recordError(0x500/*GL_INVALID_ENUM*/);
        err('GL_INVALID_ENUM in glGetBufferPointerv');
      }
    };
  var _emscripten_glGetBufferPointerv = _glGetBufferPointerv;

  /** @suppress {duplicate } */
  var _glGetError = () => {
      var error = GLctx.getError() || GL.lastError;
      GL.lastError = 0/*GL_NO_ERROR*/;
      return error;
    };
  var _emscripten_glGetError = _glGetError;

  
  /** @suppress {duplicate } */
  var _glGetFloatv = (name_, p) => emscriptenWebGLGet(name_, p, 2);
  var _emscripten_glGetFloatv = _glGetFloatv;

  /** @suppress {duplicate } */
  var _glGetFragDataLocation = (program, name) => {
      return GLctx.getFragDataLocation(GL.programs[program], UTF8ToString(name));
    };
  var _emscripten_glGetFragDataLocation = _glGetFragDataLocation;

  /** @suppress {duplicate } */
  var _glGetFramebufferAttachmentParameteriv = (target, attachment, pname, params) => {
      var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
      if (result instanceof WebGLRenderbuffer ||
          result instanceof WebGLTexture) {
        result = result.name | 0;
      }
      HEAP32[((params)>>2)] = result;
    };
  var _emscripten_glGetFramebufferAttachmentParameteriv = _glGetFramebufferAttachmentParameteriv;

  var emscriptenWebGLGetIndexed = (target, index, data, type) => {
      if (!data) {
        // GLES2 specification does not specify how to behave if data is a null pointer. Since calling this function does not make sense
        // if data == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var result = GLctx.getIndexedParameter(target, index);
      var ret;
      switch (typeof result) {
        case 'boolean':
          ret = result ? 1 : 0;
          break;
        case 'number':
          ret = result;
          break;
        case 'object':
          if (result === null) {
            switch (target) {
              case 0x8C8F: // TRANSFORM_FEEDBACK_BUFFER_BINDING
              case 0x8A28: // UNIFORM_BUFFER_BINDING
                ret = 0;
                break;
              default: {
                GL.recordError(0x500); // GL_INVALID_ENUM
                return;
              }
            }
          } else if (result instanceof WebGLBuffer) {
            ret = result.name | 0;
          } else {
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          }
          break;
        default:
          GL.recordError(0x500); // GL_INVALID_ENUM
          return;
      }
  
      switch (type) {
        case 1: writeI53ToI64(data, ret); break;
        case 0: HEAP32[((data)>>2)] = ret; break;
        case 2: HEAPF32[((data)>>2)] = ret; break;
        case 4: HEAP8[data] = ret ? 1 : 0; break;
        default: throw 'internal emscriptenWebGLGetIndexed() error, bad type: ' + type;
      }
    };
  /** @suppress {duplicate } */
  var _glGetInteger64i_v = (target, index, data) =>
      emscriptenWebGLGetIndexed(target, index, data, 1);
  var _emscripten_glGetInteger64i_v = _glGetInteger64i_v;

  /** @suppress {duplicate } */
  var _glGetInteger64v = (name_, p) => {
      emscriptenWebGLGet(name_, p, 1);
    };
  var _emscripten_glGetInteger64v = _glGetInteger64v;

  /** @suppress {duplicate } */
  var _glGetIntegeri_v = (target, index, data) =>
      emscriptenWebGLGetIndexed(target, index, data, 0);
  var _emscripten_glGetIntegeri_v = _glGetIntegeri_v;

  
  /** @suppress {duplicate } */
  var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);
  var _emscripten_glGetIntegerv = _glGetIntegerv;

  /** @suppress {duplicate } */
  var _glGetInternalformativ = (target, internalformat, pname, bufSize, params) => {
      if (bufSize < 0) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (!params) {
        // GLES3 specification does not specify how to behave if values is a null pointer. Since calling this function does not make sense
        // if values == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var ret = GLctx.getInternalformatParameter(target, internalformat, pname);
      if (ret === null) return;
      for (var i = 0; i < ret.length && i < bufSize; ++i) {
        HEAP32[(((params)+(i*4))>>2)] = ret[i];
      }
    };
  var _emscripten_glGetInternalformativ = _glGetInternalformativ;

  /** @suppress {duplicate } */
  var _glGetProgramBinary = (program, bufSize, length, binaryFormat, binary) => {
      GL.recordError(0x502/*GL_INVALID_OPERATION*/);
    };
  var _emscripten_glGetProgramBinary = _glGetProgramBinary;

  /** @suppress {duplicate } */
  var _glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
      var log = GLctx.getProgramInfoLog(GL.programs[program]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };
  var _emscripten_glGetProgramInfoLog = _glGetProgramInfoLog;

  /** @suppress {duplicate } */
  var _glGetProgramiv = (program, pname, p) => {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
  
      if (program >= GL.counter) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
  
      program = GL.programs[program];
  
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getProgramInfoLog(program);
        if (log === null) log = '(unknown error)';
        HEAP32[((p)>>2)] = log.length + 1;
      } else if (pname == 0x8B87 /* GL_ACTIVE_UNIFORM_MAX_LENGTH */) {
        if (!program.maxUniformLength) {
          var numActiveUniforms = GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/);
          for (var i = 0; i < numActiveUniforms; ++i) {
            program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxUniformLength;
      } else if (pname == 0x8B8A /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */) {
        if (!program.maxAttributeLength) {
          var numActiveAttributes = GLctx.getProgramParameter(program, 0x8B89/*GL_ACTIVE_ATTRIBUTES*/);
          for (var i = 0; i < numActiveAttributes; ++i) {
            program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxAttributeLength;
      } else if (pname == 0x8A35 /* GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH */) {
        if (!program.maxUniformBlockNameLength) {
          var numActiveUniformBlocks = GLctx.getProgramParameter(program, 0x8A36/*GL_ACTIVE_UNIFORM_BLOCKS*/);
          for (var i = 0; i < numActiveUniformBlocks; ++i) {
            program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxUniformBlockNameLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getProgramParameter(program, pname);
      }
    };
  var _emscripten_glGetProgramiv = _glGetProgramiv;

  
  /** @suppress {duplicate } */
  var _glGetQueryObjecti64vEXT = (id, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var query = GL.queries[id];
      var param;
      if (GL.currentContext.version < 2)
      {
        param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname);
      }
      else {
        param = GLctx.getQueryParameter(query, pname);
      }
      var ret;
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0;
      } else {
        ret = param;
      }
      writeI53ToI64(params, ret);
    };
  var _emscripten_glGetQueryObjecti64vEXT = _glGetQueryObjecti64vEXT;

  /** @suppress {duplicate } */
  var _glGetQueryObjectivEXT = (id, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var query = GL.queries[id];
      var param = GLctx.disjointTimerQueryExt['getQueryObjectEXT'](query, pname);
      var ret;
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0;
      } else {
        ret = param;
      }
      HEAP32[((params)>>2)] = ret;
    };
  var _emscripten_glGetQueryObjectivEXT = _glGetQueryObjectivEXT;

  
  /** @suppress {duplicate } */
  var _glGetQueryObjectui64vEXT = _glGetQueryObjecti64vEXT;
  var _emscripten_glGetQueryObjectui64vEXT = _glGetQueryObjectui64vEXT;

  /** @suppress {duplicate } */
  var _glGetQueryObjectuiv = (id, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var query = GL.queries[id];
      var param = GLctx.getQueryParameter(query, pname);
      var ret;
      if (typeof param == 'boolean') {
        ret = param ? 1 : 0;
      } else {
        ret = param;
      }
      HEAP32[((params)>>2)] = ret;
    };
  var _emscripten_glGetQueryObjectuiv = _glGetQueryObjectuiv;

  
  /** @suppress {duplicate } */
  var _glGetQueryObjectuivEXT = _glGetQueryObjectivEXT;
  var _emscripten_glGetQueryObjectuivEXT = _glGetQueryObjectuivEXT;

  /** @suppress {duplicate } */
  var _glGetQueryiv = (target, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((params)>>2)] = GLctx.getQuery(target, pname);
    };
  var _emscripten_glGetQueryiv = _glGetQueryiv;

  /** @suppress {duplicate } */
  var _glGetQueryivEXT = (target, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((params)>>2)] = GLctx.disjointTimerQueryExt['getQueryEXT'](target, pname);
    };
  var _emscripten_glGetQueryivEXT = _glGetQueryivEXT;

  /** @suppress {duplicate } */
  var _glGetRenderbufferParameteriv = (target, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if params == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((params)>>2)] = GLctx.getRenderbufferParameter(target, pname);
    };
  var _emscripten_glGetRenderbufferParameteriv = _glGetRenderbufferParameteriv;

  /** @suppress {duplicate } */
  var _glGetSamplerParameterfv = (sampler, pname, params) => {
      if (!params) {
        // GLES3 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAPF32[((params)>>2)] = GLctx.getSamplerParameter(GL.samplers[sampler], pname);
    };
  var _emscripten_glGetSamplerParameterfv = _glGetSamplerParameterfv;

  /** @suppress {duplicate } */
  var _glGetSamplerParameteriv = (sampler, pname, params) => {
      if (!params) {
        // GLES3 specification does not specify how to behave if params is a null pointer. Since calling this function does not make sense
        // if p == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((params)>>2)] = GLctx.getSamplerParameter(GL.samplers[sampler], pname);
    };
  var _emscripten_glGetSamplerParameteriv = _glGetSamplerParameteriv;

  
  /** @suppress {duplicate } */
  var _glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };
  var _emscripten_glGetShaderInfoLog = _glGetShaderInfoLog;

  /** @suppress {duplicate } */
  var _glGetShaderPrecisionFormat = (shaderType, precisionType, range, precision) => {
      var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
      HEAP32[((range)>>2)] = result.rangeMin;
      HEAP32[(((range)+(4))>>2)] = result.rangeMax;
      HEAP32[((precision)>>2)] = result.precision;
    };
  var _emscripten_glGetShaderPrecisionFormat = _glGetShaderPrecisionFormat;

  /** @suppress {duplicate } */
  var _glGetShaderSource = (shader, bufSize, length, source) => {
      var result = GLctx.getShaderSource(GL.shaders[shader]);
      if (!result) return; // If an error occurs, nothing will be written to length or source.
      var numBytesWrittenExclNull = (bufSize > 0 && source) ? stringToUTF8(result, source, bufSize) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };
  var _emscripten_glGetShaderSource = _glGetShaderSource;

  /** @suppress {duplicate } */
  var _glGetShaderiv = (shader, pname, p) => {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = '(unknown error)';
        // The GLES2 specification says that if the shader has an empty info log,
        // a value of 0 is returned. Otherwise the log has a null char appended.
        // (An empty string is falsey, so we can just check that instead of
        // looking at log.length.)
        var logLength = log ? log.length + 1 : 0;
        HEAP32[((p)>>2)] = logLength;
      } else if (pname == 0x8B88) { // GL_SHADER_SOURCE_LENGTH
        var source = GLctx.getShaderSource(GL.shaders[shader]);
        // source may be a null, or the empty string, both of which are falsey
        // values that we report a 0 length for.
        var sourceLength = source ? source.length + 1 : 0;
        HEAP32[((p)>>2)] = sourceLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getShaderParameter(GL.shaders[shader], pname);
      }
    };
  var _emscripten_glGetShaderiv = _glGetShaderiv;

  
  
  var stringToNewUTF8 = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret) stringToUTF8(str, ret, size);
      return ret;
    };
  
  
  /** @suppress {duplicate } */
  var _glGetString = (name_) => {
      var ret = GL.stringCache[name_];
      if (!ret) {
        switch (name_) {
          case 0x1F03 /* GL_EXTENSIONS */:
            ret = stringToNewUTF8(webglGetExtensions().join(' '));
            break;
          case 0x1F00 /* GL_VENDOR */:
          case 0x1F01 /* GL_RENDERER */:
          case 0x9245 /* UNMASKED_VENDOR_WEBGL */:
          case 0x9246 /* UNMASKED_RENDERER_WEBGL */:
            var s = GLctx.getParameter(name_);
            if (!s) {
              GL.recordError(0x500/*GL_INVALID_ENUM*/);
            }
            ret = s ? stringToNewUTF8(s) : 0;
            break;
  
          case 0x1F02 /* GL_VERSION */:
            var webGLVersion = GLctx.getParameter(0x1F02 /*GL_VERSION*/);
            // return GLES version string corresponding to the version of the WebGL context
            var glVersion = `OpenGL ES 2.0 (${webGLVersion})`;
            if (GL.currentContext.version >= 2) glVersion = `OpenGL ES 3.0 (${webGLVersion})`;
            ret = stringToNewUTF8(glVersion);
            break;
          case 0x8B8C /* GL_SHADING_LANGUAGE_VERSION */:
            var glslVersion = GLctx.getParameter(0x8B8C /*GL_SHADING_LANGUAGE_VERSION*/);
            // extract the version number 'N.M' from the string 'WebGL GLSL ES N.M ...'
            var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
            var ver_num = glslVersion.match(ver_re);
            if (ver_num !== null) {
              if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + '0'; // ensure minor version has 2 digits
              glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
            }
            ret = stringToNewUTF8(glslVersion);
            break;
          default:
            GL.recordError(0x500/*GL_INVALID_ENUM*/);
            // fall through
        }
        GL.stringCache[name_] = ret;
      }
      return ret;
    };
  var _emscripten_glGetString = _glGetString;

  
  /** @suppress {duplicate } */
  var _glGetStringi = (name, index) => {
      if (GL.currentContext.version < 2) {
        GL.recordError(0x502 /* GL_INVALID_OPERATION */); // Calling GLES3/WebGL2 function with a GLES2/WebGL1 context
        return 0;
      }
      var stringiCache = GL.stringiCache[name];
      if (stringiCache) {
        if (index < 0 || index >= stringiCache.length) {
          GL.recordError(0x501/*GL_INVALID_VALUE*/);
          return 0;
        }
        return stringiCache[index];
      }
      switch (name) {
        case 0x1F03 /* GL_EXTENSIONS */:
          var exts = webglGetExtensions().map(stringToNewUTF8);
          stringiCache = GL.stringiCache[name] = exts;
          if (index < 0 || index >= stringiCache.length) {
            GL.recordError(0x501/*GL_INVALID_VALUE*/);
            return 0;
          }
          return stringiCache[index];
        default:
          GL.recordError(0x500/*GL_INVALID_ENUM*/);
          return 0;
      }
    };
  var _emscripten_glGetStringi = _glGetStringi;

  /** @suppress {duplicate } */
  var _glGetSynciv = (sync, pname, bufSize, length, values) => {
      if (bufSize < 0) {
        // GLES3 specification does not specify how to behave if bufSize < 0, however in the spec wording for glGetInternalformativ, it does say that GL_INVALID_VALUE should be raised,
        // so raise GL_INVALID_VALUE here as well.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (!values) {
        // GLES3 specification does not specify how to behave if values is a null pointer. Since calling this function does not make sense
        // if values == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var ret = GLctx.getSyncParameter(GL.syncs[sync], pname);
      if (ret !== null) {
        HEAP32[((values)>>2)] = ret;
        if (length) HEAP32[((length)>>2)] = 1; // Report a single value outputted.
      }
    };
  var _emscripten_glGetSynciv = _glGetSynciv;

  /** @suppress {duplicate } */
  var _glGetTexParameterfv = (target, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAPF32[((params)>>2)] = GLctx.getTexParameter(target, pname);
    };
  var _emscripten_glGetTexParameterfv = _glGetTexParameterfv;

  /** @suppress {duplicate } */
  var _glGetTexParameteriv = (target, pname, params) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      HEAP32[((params)>>2)] = GLctx.getTexParameter(target, pname);
    };
  var _emscripten_glGetTexParameteriv = _glGetTexParameteriv;

  /** @suppress {duplicate } */
  var _glGetTransformFeedbackVarying = (program, index, bufSize, length, size, type, name) => {
      program = GL.programs[program];
      var info = GLctx.getTransformFeedbackVarying(program, index);
      if (!info) return; // If an error occurred, the return parameters length, size, type and name will be unmodified.
  
      if (name && bufSize > 0) {
        var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize);
        if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
      } else {
        if (length) HEAP32[((length)>>2)] = 0;
      }
  
      if (size) HEAP32[((size)>>2)] = info.size;
      if (type) HEAP32[((type)>>2)] = info.type;
    };
  var _emscripten_glGetTransformFeedbackVarying = _glGetTransformFeedbackVarying;

  /** @suppress {duplicate } */
  var _glGetUniformBlockIndex = (program, uniformBlockName) => {
      return GLctx.getUniformBlockIndex(GL.programs[program], UTF8ToString(uniformBlockName));
    };
  var _emscripten_glGetUniformBlockIndex = _glGetUniformBlockIndex;

  /** @suppress {duplicate } */
  var _glGetUniformIndices = (program, uniformCount, uniformNames, uniformIndices) => {
      if (!uniformIndices) {
        // GLES2 specification does not specify how to behave if uniformIndices is a null pointer. Since calling this function does not make sense
        // if uniformIndices == null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (uniformCount > 0 && (uniformNames == 0 || uniformIndices == 0)) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      program = GL.programs[program];
      var names = [];
      for (var i = 0; i < uniformCount; i++)
        names.push(UTF8ToString(HEAP32[(((uniformNames)+(i*4))>>2)]));
  
      var result = GLctx.getUniformIndices(program, names);
      if (!result) return; // GL spec: If an error is generated, nothing is written out to uniformIndices.
  
      var len = result.length;
      for (var i = 0; i < len; i++) {
        HEAP32[(((uniformIndices)+(i*4))>>2)] = result[i];
      }
    };
  var _emscripten_glGetUniformIndices = _glGetUniformIndices;

  /** @suppress {checkTypes} */
  var jstoi_q = (str) => parseInt(str);
  
  /** @noinline */
  var webglGetLeftBracePos = (name) => name.slice(-1) == ']' && name.lastIndexOf('[');
  
  var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
      var uniformLocsById = program.uniformLocsById, // Maps GLuint -> WebGLUniformLocation
        uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, // Maps name -> [uniform array length, GLuint]
        i, j;
  
      // On the first time invocation of glGetUniformLocation on this shader program:
      // initialize cache data structures and discover which uniforms are arrays.
      if (!uniformLocsById) {
        // maps GLint integer locations to WebGLUniformLocations
        program.uniformLocsById = uniformLocsById = {};
        // maps integer locations back to uniform name strings, so that we can lazily fetch uniform array locations
        program.uniformArrayNamesById = {};
  
        var numActiveUniforms = GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/);
        for (i = 0; i < numActiveUniforms; ++i) {
          var u = GLctx.getActiveUniform(program, i);
          var nm = u.name;
          var sz = u.size;
          var lb = webglGetLeftBracePos(nm);
          var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
  
          // Assign a new location.
          var id = program.uniformIdCounter;
          program.uniformIdCounter += sz;
          // Eagerly get the location of the uniformArray[0] base element.
          // The remaining indices >0 will be left for lazy evaluation to
          // improve performance. Those may never be needed to fetch, if the
          // application fills arrays always in full starting from the first
          // element of the array.
          uniformSizeAndIdsByName[arrayName] = [sz, id];
  
          // Store placeholder integers in place that highlight that these
          // >0 index locations are array indices pending population.
          for (j = 0; j < sz; ++j) {
            uniformLocsById[id] = j;
            program.uniformArrayNamesById[id++] = arrayName;
          }
        }
      }
    };
  
  
  
  /** @suppress {duplicate } */
  var _glGetUniformLocation = (program, name) => {
  
      name = UTF8ToString(name);
  
      if (program = GL.programs[program]) {
        webglPrepareUniformLocationsBeforeFirstUse(program);
        var uniformLocsById = program.uniformLocsById; // Maps GLuint -> WebGLUniformLocation
        var arrayIndex = 0;
        var uniformBaseName = name;
  
        // Invariant: when populating integer IDs for uniform locations, we must
        // maintain the precondition that arrays reside in contiguous addresses,
        // i.e. for a 'vec4 colors[10];', colors[4] must be at location
        // colors[0]+4.  However, user might call glGetUniformLocation(program,
        // "colors") for an array, so we cannot discover based on the user input
        // arguments whether the uniform we are dealing with is an array. The only
        // way to discover which uniforms are arrays is to enumerate over all the
        // active uniforms in the program.
        var leftBrace = webglGetLeftBracePos(name);
  
        // If user passed an array accessor "[index]", parse the array index off the accessor.
        if (leftBrace > 0) {
          arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0; // "index]", coerce parseInt(']') with >>>0 to treat "foo[]" as "foo[0]" and foo[-1] as unsigned out-of-bounds.
          uniformBaseName = name.slice(0, leftBrace);
        }
  
        // Have we cached the location of this uniform before?
        // A pair [array length, GLint of the uniform location]
        var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
  
        // If an uniform with this name exists, and if its index is within the
        // array limits (if it's even an array), query the WebGLlocation, or
        // return an existing cached location.
        if (sizeAndId && arrayIndex < sizeAndId[0]) {
          arrayIndex += sizeAndId[1]; // Add the base location of the uniform to the array index offset.
          if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
            return arrayIndex;
          }
        }
      }
      else {
        // N.b. we are currently unable to distinguish between GL program IDs that
        // never existed vs GL program IDs that have been deleted, so report
        // GL_INVALID_VALUE in both cases.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
      }
      return -1;
    };
  var _emscripten_glGetUniformLocation = _glGetUniformLocation;

  var webglGetUniformLocation = (location) => {
      var p = GLctx.currentProgram;
  
      if (p) {
        var webglLoc = p.uniformLocsById[location];
        // p.uniformLocsById[location] stores either an integer, or a
        // WebGLUniformLocation.
        // If an integer, we have not yet bound the location, so do it now. The
        // integer value specifies the array index we should bind to.
        if (typeof webglLoc == 'number') {
          p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ''));
        }
        // Else an already cached WebGLUniformLocation, return it.
        return webglLoc;
      } else {
        GL.recordError(0x502/*GL_INVALID_OPERATION*/);
      }
    };
  
  
  /** @suppress{checkTypes} */
  var emscriptenWebGLGetUniform = (program, location, params, type) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null
        // pointer. Since calling this function does not make sense if params ==
        // null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      program = GL.programs[program];
      webglPrepareUniformLocationsBeforeFirstUse(program);
      var data = GLctx.getUniform(program, webglGetUniformLocation(location));
      if (typeof data == 'number' || typeof data == 'boolean') {
        switch (type) {
          case 0: HEAP32[((params)>>2)] = data; break;
          case 2: HEAPF32[((params)>>2)] = data; break;
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          switch (type) {
            case 0: HEAP32[(((params)+(i*4))>>2)] = data[i]; break;
            case 2: HEAPF32[(((params)+(i*4))>>2)] = data[i]; break;
          }
        }
      }
    };
  
  /** @suppress {duplicate } */
  var _glGetUniformfv = (program, location, params) => {
      emscriptenWebGLGetUniform(program, location, params, 2);
    };
  var _emscripten_glGetUniformfv = _glGetUniformfv;

  
  /** @suppress {duplicate } */
  var _glGetUniformiv = (program, location, params) => {
      emscriptenWebGLGetUniform(program, location, params, 0);
    };
  var _emscripten_glGetUniformiv = _glGetUniformiv;

  /** @suppress {duplicate } */
  var _glGetUniformuiv = (program, location, params) =>
      emscriptenWebGLGetUniform(program, location, params, 0);
  var _emscripten_glGetUniformuiv = _glGetUniformuiv;

  /** @suppress{checkTypes} */
  var emscriptenWebGLGetVertexAttrib = (index, pname, params, type) => {
      if (!params) {
        // GLES2 specification does not specify how to behave if params is a null
        // pointer. Since calling this function does not make sense if params ==
        // null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (GL.currentContext.clientBuffers[index].enabled) {
        err("glGetVertexAttrib*v on client-side array: not supported, bad data returned");
      }
      var data = GLctx.getVertexAttrib(index, pname);
      if (pname == 0x889F/*VERTEX_ATTRIB_ARRAY_BUFFER_BINDING*/) {
        HEAP32[((params)>>2)] = data && data["name"];
      } else if (typeof data == 'number' || typeof data == 'boolean') {
        switch (type) {
          case 0: HEAP32[((params)>>2)] = data; break;
          case 2: HEAPF32[((params)>>2)] = data; break;
          case 5: HEAP32[((params)>>2)] = Math.fround(data); break;
        }
      } else {
        for (var i = 0; i < data.length; i++) {
          switch (type) {
            case 0: HEAP32[(((params)+(i*4))>>2)] = data[i]; break;
            case 2: HEAPF32[(((params)+(i*4))>>2)] = data[i]; break;
            case 5: HEAP32[(((params)+(i*4))>>2)] = Math.fround(data[i]); break;
          }
        }
      }
    };
  /** @suppress {duplicate } */
  var _glGetVertexAttribIiv = (index, pname, params) => {
      // N.B. This function may only be called if the vertex attribute was specified using the function glVertexAttribI4iv(),
      // otherwise the results are undefined. (GLES3 spec 6.1.12)
      emscriptenWebGLGetVertexAttrib(index, pname, params, 0);
    };
  var _emscripten_glGetVertexAttribIiv = _glGetVertexAttribIiv;

  
  /** @suppress {duplicate } */
  var _glGetVertexAttribIuiv = _glGetVertexAttribIiv;
  var _emscripten_glGetVertexAttribIuiv = _glGetVertexAttribIuiv;

  /** @suppress {duplicate } */
  var _glGetVertexAttribPointerv = (index, pname, pointer) => {
      if (!pointer) {
        // GLES2 specification does not specify how to behave if pointer is a null
        // pointer. Since calling this function does not make sense if pointer ==
        // null, issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (GL.currentContext.clientBuffers[index].enabled) {
        err("glGetVertexAttribPointer on client-side array: not supported, bad data returned");
      }
      HEAP32[((pointer)>>2)] = GLctx.getVertexAttribOffset(index, pname);
    };
  var _emscripten_glGetVertexAttribPointerv = _glGetVertexAttribPointerv;

  
  /** @suppress {duplicate } */
  var _glGetVertexAttribfv = (index, pname, params) => {
      // N.B. This function may only be called if the vertex attribute was
      // specified using the function glVertexAttrib*f(), otherwise the results
      // are undefined. (GLES3 spec 6.1.12)
      emscriptenWebGLGetVertexAttrib(index, pname, params, 2);
    };
  var _emscripten_glGetVertexAttribfv = _glGetVertexAttribfv;

  
  /** @suppress {duplicate } */
  var _glGetVertexAttribiv = (index, pname, params) => {
      // N.B. This function may only be called if the vertex attribute was
      // specified using the function glVertexAttrib*f(), otherwise the results
      // are undefined. (GLES3 spec 6.1.12)
      emscriptenWebGLGetVertexAttrib(index, pname, params, 5);
    };
  var _emscripten_glGetVertexAttribiv = _glGetVertexAttribiv;

  /** @suppress {duplicate } */
  var _glHint = (x0, x1) => GLctx.hint(x0, x1);
  var _emscripten_glHint = _glHint;

  /** @suppress {duplicate } */
  var _glInvalidateFramebuffer = (target, numAttachments, attachments) => {
      var list = tempFixedLengthArray[numAttachments];
      for (var i = 0; i < numAttachments; i++) {
        list[i] = HEAP32[(((attachments)+(i*4))>>2)];
      }
  
      GLctx.invalidateFramebuffer(target, list);
    };
  var _emscripten_glInvalidateFramebuffer = _glInvalidateFramebuffer;

  /** @suppress {duplicate } */
  var _glInvalidateSubFramebuffer = (target, numAttachments, attachments, x, y, width, height) => {
      var list = tempFixedLengthArray[numAttachments];
      for (var i = 0; i < numAttachments; i++) {
        list[i] = HEAP32[(((attachments)+(i*4))>>2)];
      }
  
      GLctx.invalidateSubFramebuffer(target, list, x, y, width, height);
    };
  var _emscripten_glInvalidateSubFramebuffer = _glInvalidateSubFramebuffer;

  /** @suppress {duplicate } */
  var _glIsBuffer = (buffer) => {
      var b = GL.buffers[buffer];
      if (!b) return 0;
      return GLctx.isBuffer(b);
    };
  var _emscripten_glIsBuffer = _glIsBuffer;

  /** @suppress {duplicate } */
  var _glIsEnabled = (x0) => GLctx.isEnabled(x0);
  var _emscripten_glIsEnabled = _glIsEnabled;

  /** @suppress {duplicate } */
  var _glIsFramebuffer = (framebuffer) => {
      var fb = GL.framebuffers[framebuffer];
      if (!fb) return 0;
      return GLctx.isFramebuffer(fb);
    };
  var _emscripten_glIsFramebuffer = _glIsFramebuffer;

  /** @suppress {duplicate } */
  var _glIsProgram = (program) => {
      program = GL.programs[program];
      if (!program) return 0;
      return GLctx.isProgram(program);
    };
  var _emscripten_glIsProgram = _glIsProgram;

  /** @suppress {duplicate } */
  var _glIsQuery = (id) => {
      var query = GL.queries[id];
      if (!query) return 0;
      return GLctx.isQuery(query);
    };
  var _emscripten_glIsQuery = _glIsQuery;

  /** @suppress {duplicate } */
  var _glIsQueryEXT = (id) => {
      var query = GL.queries[id];
      if (!query) return 0;
      return GLctx.disjointTimerQueryExt['isQueryEXT'](query);
    };
  var _emscripten_glIsQueryEXT = _glIsQueryEXT;

  /** @suppress {duplicate } */
  var _glIsRenderbuffer = (renderbuffer) => {
      var rb = GL.renderbuffers[renderbuffer];
      if (!rb) return 0;
      return GLctx.isRenderbuffer(rb);
    };
  var _emscripten_glIsRenderbuffer = _glIsRenderbuffer;

  /** @suppress {duplicate } */
  var _glIsSampler = (id) => {
      var sampler = GL.samplers[id];
      if (!sampler) return 0;
      return GLctx.isSampler(sampler);
    };
  var _emscripten_glIsSampler = _glIsSampler;

  /** @suppress {duplicate } */
  var _glIsShader = (shader) => {
      var s = GL.shaders[shader];
      if (!s) return 0;
      return GLctx.isShader(s);
    };
  var _emscripten_glIsShader = _glIsShader;

  /** @suppress {duplicate } */
  var _glIsSync = (sync) => GLctx.isSync(GL.syncs[sync]);
  var _emscripten_glIsSync = _glIsSync;

  /** @suppress {duplicate } */
  var _glIsTexture = (id) => {
      var texture = GL.textures[id];
      if (!texture) return 0;
      return GLctx.isTexture(texture);
    };
  var _emscripten_glIsTexture = _glIsTexture;

  /** @suppress {duplicate } */
  var _glIsTransformFeedback = (id) => GLctx.isTransformFeedback(GL.transformFeedbacks[id]);
  var _emscripten_glIsTransformFeedback = _glIsTransformFeedback;

  /** @suppress {duplicate } */
  var _glIsVertexArray = (array) => {
  
      var vao = GL.vaos[array];
      if (!vao) return 0;
      return GLctx.isVertexArray(vao);
    };
  var _emscripten_glIsVertexArray = _glIsVertexArray;

  
  /** @suppress {duplicate } */
  var _glIsVertexArrayOES = _glIsVertexArray;
  var _emscripten_glIsVertexArrayOES = _glIsVertexArrayOES;

  /** @suppress {duplicate } */
  var _glLineWidth = (x0) => GLctx.lineWidth(x0);
  var _emscripten_glLineWidth = _glLineWidth;

  /** @suppress {duplicate } */
  var _glLinkProgram = (program) => {
      program = GL.programs[program];
      GLctx.linkProgram(program);
      // Invalidate earlier computed uniform->ID mappings, those have now become stale
      program.uniformLocsById = 0; // Mark as null-like so that glGetUniformLocation() knows to populate this again.
      program.uniformSizeAndIdsByName = {};
  
    };
  var _emscripten_glLinkProgram = _glLinkProgram;

  
  
  
  /** @suppress {duplicate } */
  var _glMapBufferRange = (target, offset, length, access) => {
      if ((access & (0x1/*GL_MAP_READ_BIT*/ | 0x20/*GL_MAP_UNSYNCHRONIZED_BIT*/)) != 0) {
        err("glMapBufferRange access does not support MAP_READ or MAP_UNSYNCHRONIZED");
        return 0;
      }
  
      if ((access & 0x2/*GL_MAP_WRITE_BIT*/) == 0) {
        err("glMapBufferRange access must include MAP_WRITE");
        return 0;
      }
  
      if ((access & (0x4/*GL_MAP_INVALIDATE_BUFFER_BIT*/ | 0x8/*GL_MAP_INVALIDATE_RANGE_BIT*/)) == 0) {
        err("glMapBufferRange access must include INVALIDATE_BUFFER or INVALIDATE_RANGE");
        return 0;
      }
  
      if (!emscriptenWebGLValidateMapBufferTarget(target)) {
        GL.recordError(0x500/*GL_INVALID_ENUM*/);
        err('GL_INVALID_ENUM in glMapBufferRange');
        return 0;
      }
  
      var mem = _malloc(length), binding = emscriptenWebGLGetBufferBinding(target);
      if (!mem) return 0;
  
      binding = GL.mappedBuffers[binding] ??= {};
      binding.offset = offset;
      binding.length = length;
      binding.mem = mem;
      binding.access = access;
      return mem;
    };
  var _emscripten_glMapBufferRange = _glMapBufferRange;

  /** @suppress {duplicate } */
  var _glPauseTransformFeedback = () => GLctx.pauseTransformFeedback();
  var _emscripten_glPauseTransformFeedback = _glPauseTransformFeedback;

  /** @suppress {duplicate } */
  var _glPixelStorei = (pname, param) => {
      if (pname == 3317) {
        GL.unpackAlignment = param;
      } else if (pname == 3314) {
        GL.unpackRowLength = param;
      }
      GLctx.pixelStorei(pname, param);
    };
  var _emscripten_glPixelStorei = _glPixelStorei;

  /** @suppress {duplicate } */
  var _glPolygonModeWEBGL = (face, mode) => {
      GLctx.webglPolygonMode['polygonModeWEBGL'](face, mode);
    };
  var _emscripten_glPolygonModeWEBGL = _glPolygonModeWEBGL;

  /** @suppress {duplicate } */
  var _glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);
  var _emscripten_glPolygonOffset = _glPolygonOffset;

  /** @suppress {duplicate } */
  var _glPolygonOffsetClampEXT = (factor, units, clamp) => {
      GLctx.extPolygonOffsetClamp['polygonOffsetClampEXT'](factor, units, clamp);
    };
  var _emscripten_glPolygonOffsetClampEXT = _glPolygonOffsetClampEXT;

  /** @suppress {duplicate } */
  var _glProgramBinary = (program, binaryFormat, binary, length) => {
      GL.recordError(0x500/*GL_INVALID_ENUM*/);
    };
  var _emscripten_glProgramBinary = _glProgramBinary;

  /** @suppress {duplicate } */
  var _glProgramParameteri = (program, pname, value) => {
      GL.recordError(0x500/*GL_INVALID_ENUM*/);
    };
  var _emscripten_glProgramParameteri = _glProgramParameteri;

  /** @suppress {duplicate } */
  var _glQueryCounterEXT = (id, target) => {
      GLctx.disjointTimerQueryExt['queryCounterEXT'](GL.queries[id], target);
    };
  var _emscripten_glQueryCounterEXT = _glQueryCounterEXT;

  /** @suppress {duplicate } */
  var _glReadBuffer = (x0) => GLctx.readBuffer(x0);
  var _emscripten_glReadBuffer = _glReadBuffer;

  var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
      function roundedToNextMultipleOf(x, y) {
        return (x + y - 1) & -y;
      }
      var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
      var alignedRowSize = roundedToNextMultipleOf(plainRowSize, GL.unpackAlignment);
      return height * alignedRowSize;
    };
  
  var colorChannelsInGlTextureFormat = (format) => {
      // Micro-optimizations for size: map format to size by subtracting smallest
      // enum value (0x1902) from all values first.  Also omit the most common
      // size value (1) from the list, which is assumed by formats not on the
      // list.
      var colorChannels = {
        // 0x1902 /* GL_DEPTH_COMPONENT */ - 0x1902: 1,
        // 0x1906 /* GL_ALPHA */ - 0x1902: 1,
        5: 3,
        6: 4,
        // 0x1909 /* GL_LUMINANCE */ - 0x1902: 1,
        8: 2,
        29502: 3,
        29504: 4,
        // 0x1903 /* GL_RED */ - 0x1902: 1,
        26917: 2,
        26918: 2,
        // 0x8D94 /* GL_RED_INTEGER */ - 0x1902: 1,
        29846: 3,
        29847: 4
      };
      return colorChannels[format - 0x1902]||1;
    };
  
  var heapObjectForWebGLType = (type) => {
      // Micro-optimization for size: Subtract lowest GL enum number (0x1400/* GL_BYTE */) from type to compare
      // smaller values for the heap, for shorter generated code size.
      // Also the type HEAPU16 is not tested for explicitly, but any unrecognized type will return out HEAPU16.
      // (since most types are HEAPU16)
      type -= 0x1400;
      if (type == 0) return HEAP8;
  
      if (type == 1) return HEAPU8;
  
      if (type == 2) return HEAP16;
  
      if (type == 4) return HEAP32;
  
      if (type == 6) return HEAPF32;
  
      if (type == 5
        || type == 28922
        || type == 28520
        || type == 30779
        || type == 30782
        )
        return HEAPU32;
  
      return HEAPU16;
    };
  
  var toTypedArrayIndex = (pointer, heap) =>
      pointer >>> (31 - Math.clz32(heap.BYTES_PER_ELEMENT));
  
  var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
      var heap = heapObjectForWebGLType(type);
      var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
      var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
      return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
    };
  
  
  
  /** @suppress {duplicate } */
  var _glReadPixels = (x, y, width, height, format, type, pixels) => {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelPackBufferBinding) {
          GLctx.readPixels(x, y, width, height, format, type, pixels);
          return;
        }
        var heap = heapObjectForWebGLType(type);
        var target = toTypedArrayIndex(pixels, heap);
        GLctx.readPixels(x, y, width, height, format, type, heap, target);
        return;
      }
      var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
      if (!pixelData) {
        GL.recordError(0x500/*GL_INVALID_ENUM*/);
        return;
      }
      GLctx.readPixels(x, y, width, height, format, type, pixelData);
    };
  var _emscripten_glReadPixels = _glReadPixels;

  /** @suppress {duplicate } */
  var _glReleaseShaderCompiler = () => {
      // NOP (as allowed by GLES 2.0 spec)
    };
  var _emscripten_glReleaseShaderCompiler = _glReleaseShaderCompiler;

  /** @suppress {duplicate } */
  var _glRenderbufferStorage = (x0, x1, x2, x3) => GLctx.renderbufferStorage(x0, x1, x2, x3);
  var _emscripten_glRenderbufferStorage = _glRenderbufferStorage;

  /** @suppress {duplicate } */
  var _glRenderbufferStorageMultisample = (x0, x1, x2, x3, x4) => GLctx.renderbufferStorageMultisample(x0, x1, x2, x3, x4);
  var _emscripten_glRenderbufferStorageMultisample = _glRenderbufferStorageMultisample;

  /** @suppress {duplicate } */
  var _glResumeTransformFeedback = () => GLctx.resumeTransformFeedback();
  var _emscripten_glResumeTransformFeedback = _glResumeTransformFeedback;

  /** @suppress {duplicate } */
  var _glSampleCoverage = (value, invert) => {
      GLctx.sampleCoverage(value, !!invert);
    };
  var _emscripten_glSampleCoverage = _glSampleCoverage;

  /** @suppress {duplicate } */
  var _glSamplerParameterf = (sampler, pname, param) => {
      GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
    };
  var _emscripten_glSamplerParameterf = _glSamplerParameterf;

  /** @suppress {duplicate } */
  var _glSamplerParameterfv = (sampler, pname, params) => {
      var param = HEAPF32[((params)>>2)];
      GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
    };
  var _emscripten_glSamplerParameterfv = _glSamplerParameterfv;

  /** @suppress {duplicate } */
  var _glSamplerParameteri = (sampler, pname, param) => {
      GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
    };
  var _emscripten_glSamplerParameteri = _glSamplerParameteri;

  /** @suppress {duplicate } */
  var _glSamplerParameteriv = (sampler, pname, params) => {
      var param = HEAP32[((params)>>2)];
      GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
    };
  var _emscripten_glSamplerParameteriv = _glSamplerParameteriv;

  /** @suppress {duplicate } */
  var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);
  var _emscripten_glScissor = _glScissor;

  /** @suppress {duplicate } */
  var _glShaderBinary = (count, shaders, binaryformat, binary, length) => {
      GL.recordError(0x500/*GL_INVALID_ENUM*/);
    };
  var _emscripten_glShaderBinary = _glShaderBinary;

  /** @suppress {duplicate } */
  var _glShaderSource = (shader, count, string, length) => {
      var source = GL.getSource(shader, count, string, length);
  
      GLctx.shaderSource(GL.shaders[shader], source);
    };
  var _emscripten_glShaderSource = _glShaderSource;

  /** @suppress {duplicate } */
  var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);
  var _emscripten_glStencilFunc = _glStencilFunc;

  /** @suppress {duplicate } */
  var _glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);
  var _emscripten_glStencilFuncSeparate = _glStencilFuncSeparate;

  /** @suppress {duplicate } */
  var _glStencilMask = (x0) => GLctx.stencilMask(x0);
  var _emscripten_glStencilMask = _glStencilMask;

  /** @suppress {duplicate } */
  var _glStencilMaskSeparate = (x0, x1) => GLctx.stencilMaskSeparate(x0, x1);
  var _emscripten_glStencilMaskSeparate = _glStencilMaskSeparate;

  /** @suppress {duplicate } */
  var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);
  var _emscripten_glStencilOp = _glStencilOp;

  /** @suppress {duplicate } */
  var _glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);
  var _emscripten_glStencilOpSeparate = _glStencilOpSeparate;

  
  
  
  /** @suppress {duplicate } */
  var _glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
          return;
        }
        if (pixels) {
          var heap = heapObjectForWebGLType(type);
          var index = toTypedArrayIndex(pixels, heap);
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, index);
          return;
        }
      }
      var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null;
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
    };
  var _emscripten_glTexImage2D = _glTexImage2D;

  
  /** @suppress {duplicate } */
  var _glTexImage3D = (target, level, internalFormat, width, height, depth, border, format, type, pixels) => {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixels);
      } else if (pixels) {
        var heap = heapObjectForWebGLType(type);
        GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, heap, toTypedArrayIndex(pixels, heap));
      } else {
        GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, null);
      }
    };
  var _emscripten_glTexImage3D = _glTexImage3D;

  /** @suppress {duplicate } */
  var _glTexParameterf = (x0, x1, x2) => GLctx.texParameterf(x0, x1, x2);
  var _emscripten_glTexParameterf = _glTexParameterf;

  /** @suppress {duplicate } */
  var _glTexParameterfv = (target, pname, params) => {
      var param = HEAPF32[((params)>>2)];
      GLctx.texParameterf(target, pname, param);
    };
  var _emscripten_glTexParameterfv = _glTexParameterfv;

  /** @suppress {duplicate } */
  var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);
  var _emscripten_glTexParameteri = _glTexParameteri;

  /** @suppress {duplicate } */
  var _glTexParameteriv = (target, pname, params) => {
      var param = HEAP32[((params)>>2)];
      GLctx.texParameteri(target, pname, param);
    };
  var _emscripten_glTexParameteriv = _glTexParameteriv;

  /** @suppress {duplicate } */
  var _glTexStorage2D = (x0, x1, x2, x3, x4) => GLctx.texStorage2D(x0, x1, x2, x3, x4);
  var _emscripten_glTexStorage2D = _glTexStorage2D;

  /** @suppress {duplicate } */
  var _glTexStorage3D = (x0, x1, x2, x3, x4, x5) => GLctx.texStorage3D(x0, x1, x2, x3, x4, x5);
  var _emscripten_glTexStorage3D = _glTexStorage3D;

  
  
  
  /** @suppress {duplicate } */
  var _glTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, type, pixels) => {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
          return;
        }
        if (pixels) {
          var heap = heapObjectForWebGLType(type);
          GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, heap, toTypedArrayIndex(pixels, heap));
          return;
        }
      }
      var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0) : null;
      GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
    };
  var _emscripten_glTexSubImage2D = _glTexSubImage2D;

  
  /** @suppress {duplicate } */
  var _glTexSubImage3D = (target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels) => {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels);
      } else if (pixels) {
        var heap = heapObjectForWebGLType(type);
        GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, heap, toTypedArrayIndex(pixels, heap));
      } else {
        GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, null);
      }
    };
  var _emscripten_glTexSubImage3D = _glTexSubImage3D;

  /** @suppress {duplicate } */
  var _glTransformFeedbackVaryings = (program, count, varyings, bufferMode) => {
      program = GL.programs[program];
      var vars = [];
      for (var i = 0; i < count; i++)
        vars.push(UTF8ToString(HEAP32[(((varyings)+(i*4))>>2)]));
  
      GLctx.transformFeedbackVaryings(program, vars, bufferMode);
    };
  var _emscripten_glTransformFeedbackVaryings = _glTransformFeedbackVaryings;

  
  /** @suppress {duplicate } */
  var _glUniform1f = (location, v0) => {
      GLctx.uniform1f(webglGetUniformLocation(location), v0);
    };
  var _emscripten_glUniform1f = _glUniform1f;

  
  var miniTempWebGLFloatBuffers = [];
  
  /** @suppress {duplicate } */
  var _glUniform1fv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform1fv(webglGetUniformLocation(location), HEAPF32, ((value)>>2), count);
        return;
      }
  
      if (count <= 288) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; ++i) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*4)>>2));
      }
      GLctx.uniform1fv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform1fv = _glUniform1fv;

  
  /** @suppress {duplicate } */
  var _glUniform1i = (location, v0) => {
      GLctx.uniform1i(webglGetUniformLocation(location), v0);
    };
  var _emscripten_glUniform1i = _glUniform1i;

  
  var miniTempWebGLIntBuffers = [];
  
  /** @suppress {duplicate } */
  var _glUniform1iv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform1iv(webglGetUniformLocation(location), HEAP32, ((value)>>2), count);
        return;
      }
  
      if (count <= 288) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; ++i) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*4)>>2));
      }
      GLctx.uniform1iv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform1iv = _glUniform1iv;

  /** @suppress {duplicate } */
  var _glUniform1ui = (location, v0) => {
      GLctx.uniform1ui(webglGetUniformLocation(location), v0);
    };
  var _emscripten_glUniform1ui = _glUniform1ui;

  /** @suppress {duplicate } */
  var _glUniform1uiv = (location, count, value) => {
      count && GLctx.uniform1uiv(webglGetUniformLocation(location), HEAPU32, ((value)>>2), count);
    };
  var _emscripten_glUniform1uiv = _glUniform1uiv;

  
  /** @suppress {duplicate } */
  var _glUniform2f = (location, v0, v1) => {
      GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
    };
  var _emscripten_glUniform2f = _glUniform2f;

  
  
  /** @suppress {duplicate } */
  var _glUniform2fv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform2fv(webglGetUniformLocation(location), HEAPF32, ((value)>>2), count*2);
        return;
      }
  
      if (count <= 144) {
        // avoid allocation when uploading few enough uniforms
        count *= 2;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; i += 2) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*8)>>2));
      }
      GLctx.uniform2fv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform2fv = _glUniform2fv;

  
  /** @suppress {duplicate } */
  var _glUniform2i = (location, v0, v1) => {
      GLctx.uniform2i(webglGetUniformLocation(location), v0, v1);
    };
  var _emscripten_glUniform2i = _glUniform2i;

  
  
  /** @suppress {duplicate } */
  var _glUniform2iv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform2iv(webglGetUniformLocation(location), HEAP32, ((value)>>2), count*2);
        return;
      }
  
      if (count <= 144) {
        // avoid allocation when uploading few enough uniforms
        count *= 2;
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; i += 2) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
          view[i+1] = HEAP32[(((value)+(4*i+4))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*8)>>2));
      }
      GLctx.uniform2iv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform2iv = _glUniform2iv;

  /** @suppress {duplicate } */
  var _glUniform2ui = (location, v0, v1) => {
      GLctx.uniform2ui(webglGetUniformLocation(location), v0, v1);
    };
  var _emscripten_glUniform2ui = _glUniform2ui;

  /** @suppress {duplicate } */
  var _glUniform2uiv = (location, count, value) => {
      count && GLctx.uniform2uiv(webglGetUniformLocation(location), HEAPU32, ((value)>>2), count*2);
    };
  var _emscripten_glUniform2uiv = _glUniform2uiv;

  
  /** @suppress {duplicate } */
  var _glUniform3f = (location, v0, v1, v2) => {
      GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2);
    };
  var _emscripten_glUniform3f = _glUniform3f;

  
  
  /** @suppress {duplicate } */
  var _glUniform3fv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform3fv(webglGetUniformLocation(location), HEAPF32, ((value)>>2), count*3);
        return;
      }
  
      if (count <= 96) {
        // avoid allocation when uploading few enough uniforms
        count *= 3;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; i += 3) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*12)>>2));
      }
      GLctx.uniform3fv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform3fv = _glUniform3fv;

  
  /** @suppress {duplicate } */
  var _glUniform3i = (location, v0, v1, v2) => {
      GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2);
    };
  var _emscripten_glUniform3i = _glUniform3i;

  
  
  /** @suppress {duplicate } */
  var _glUniform3iv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform3iv(webglGetUniformLocation(location), HEAP32, ((value)>>2), count*3);
        return;
      }
  
      if (count <= 96) {
        // avoid allocation when uploading few enough uniforms
        count *= 3;
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; i += 3) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
          view[i+1] = HEAP32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAP32[(((value)+(4*i+8))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*12)>>2));
      }
      GLctx.uniform3iv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform3iv = _glUniform3iv;

  /** @suppress {duplicate } */
  var _glUniform3ui = (location, v0, v1, v2) => {
      GLctx.uniform3ui(webglGetUniformLocation(location), v0, v1, v2);
    };
  var _emscripten_glUniform3ui = _glUniform3ui;

  /** @suppress {duplicate } */
  var _glUniform3uiv = (location, count, value) => {
      count && GLctx.uniform3uiv(webglGetUniformLocation(location), HEAPU32, ((value)>>2), count*3);
    };
  var _emscripten_glUniform3uiv = _glUniform3uiv;

  
  /** @suppress {duplicate } */
  var _glUniform4f = (location, v0, v1, v2, v3) => {
      GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
    };
  var _emscripten_glUniform4f = _glUniform4f;

  
  
  /** @suppress {duplicate } */
  var _glUniform4fv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform4fv(webglGetUniformLocation(location), HEAPF32, ((value)>>2), count*4);
        return;
      }
  
      if (count <= 72) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLFloatBuffers[4*count];
        // hoist the heap out of the loop for size and for pthreads+growth.
        var heap = HEAPF32;
        value = ((value)>>2);
        count *= 4;
        for (var i = 0; i < count; i += 4) {
          var dst = value + i;
          view[i] = heap[dst];
          view[i + 1] = heap[dst + 1];
          view[i + 2] = heap[dst + 2];
          view[i + 3] = heap[dst + 3];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*16)>>2));
      }
      GLctx.uniform4fv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform4fv = _glUniform4fv;

  
  /** @suppress {duplicate } */
  var _glUniform4i = (location, v0, v1, v2, v3) => {
      GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3);
    };
  var _emscripten_glUniform4i = _glUniform4i;

  
  
  /** @suppress {duplicate } */
  var _glUniform4iv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform4iv(webglGetUniformLocation(location), HEAP32, ((value)>>2), count*4);
        return;
      }
  
      if (count <= 72) {
        // avoid allocation when uploading few enough uniforms
        count *= 4;
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; i += 4) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
          view[i+1] = HEAP32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAP32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAP32[(((value)+(4*i+12))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*16)>>2));
      }
      GLctx.uniform4iv(webglGetUniformLocation(location), view);
    };
  var _emscripten_glUniform4iv = _glUniform4iv;

  /** @suppress {duplicate } */
  var _glUniform4ui = (location, v0, v1, v2, v3) => {
      GLctx.uniform4ui(webglGetUniformLocation(location), v0, v1, v2, v3);
    };
  var _emscripten_glUniform4ui = _glUniform4ui;

  /** @suppress {duplicate } */
  var _glUniform4uiv = (location, count, value) => {
      count && GLctx.uniform4uiv(webglGetUniformLocation(location), HEAPU32, ((value)>>2), count*4);
    };
  var _emscripten_glUniform4uiv = _glUniform4uiv;

  /** @suppress {duplicate } */
  var _glUniformBlockBinding = (program, uniformBlockIndex, uniformBlockBinding) => {
      program = GL.programs[program];
  
      GLctx.uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding);
    };
  var _emscripten_glUniformBlockBinding = _glUniformBlockBinding;

  
  
  /** @suppress {duplicate } */
  var _glUniformMatrix2fv = (location, count, transpose, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value)>>2), count*4);
        return;
      }
  
      if (count <= 72) {
        // avoid allocation when uploading few enough uniforms
        count *= 4;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; i += 4) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAPF32[(((value)+(4*i+12))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*16)>>2));
      }
      GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, view);
    };
  var _emscripten_glUniformMatrix2fv = _glUniformMatrix2fv;

  /** @suppress {duplicate } */
  var _glUniformMatrix2x3fv = (location, count, transpose, value) => {
      count && GLctx.uniformMatrix2x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value)>>2), count*6);
    };
  var _emscripten_glUniformMatrix2x3fv = _glUniformMatrix2x3fv;

  /** @suppress {duplicate } */
  var _glUniformMatrix2x4fv = (location, count, transpose, value) => {
      count && GLctx.uniformMatrix2x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value)>>2), count*8);
    };
  var _emscripten_glUniformMatrix2x4fv = _glUniformMatrix2x4fv;

  
  
  /** @suppress {duplicate } */
  var _glUniformMatrix3fv = (location, count, transpose, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value)>>2), count*9);
        return;
      }
  
      if (count <= 32) {
        // avoid allocation when uploading few enough uniforms
        count *= 9;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; i += 9) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAPF32[(((value)+(4*i+12))>>2)];
          view[i+4] = HEAPF32[(((value)+(4*i+16))>>2)];
          view[i+5] = HEAPF32[(((value)+(4*i+20))>>2)];
          view[i+6] = HEAPF32[(((value)+(4*i+24))>>2)];
          view[i+7] = HEAPF32[(((value)+(4*i+28))>>2)];
          view[i+8] = HEAPF32[(((value)+(4*i+32))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*36)>>2));
      }
      GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, view);
    };
  var _emscripten_glUniformMatrix3fv = _glUniformMatrix3fv;

  /** @suppress {duplicate } */
  var _glUniformMatrix3x2fv = (location, count, transpose, value) => {
      count && GLctx.uniformMatrix3x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value)>>2), count*6);
    };
  var _emscripten_glUniformMatrix3x2fv = _glUniformMatrix3x2fv;

  /** @suppress {duplicate } */
  var _glUniformMatrix3x4fv = (location, count, transpose, value) => {
      count && GLctx.uniformMatrix3x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value)>>2), count*12);
    };
  var _emscripten_glUniformMatrix3x4fv = _glUniformMatrix3x4fv;

  
  
  /** @suppress {duplicate } */
  var _glUniformMatrix4fv = (location, count, transpose, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value)>>2), count*16);
        return;
      }
  
      if (count <= 18) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLFloatBuffers[16*count];
        // hoist the heap out of the loop for size and for pthreads+growth.
        var heap = HEAPF32;
        value = ((value)>>2);
        count *= 16;
        for (var i = 0; i < count; i += 16) {
          var dst = value + i;
          view[i] = heap[dst];
          view[i + 1] = heap[dst + 1];
          view[i + 2] = heap[dst + 2];
          view[i + 3] = heap[dst + 3];
          view[i + 4] = heap[dst + 4];
          view[i + 5] = heap[dst + 5];
          view[i + 6] = heap[dst + 6];
          view[i + 7] = heap[dst + 7];
          view[i + 8] = heap[dst + 8];
          view[i + 9] = heap[dst + 9];
          view[i + 10] = heap[dst + 10];
          view[i + 11] = heap[dst + 11];
          view[i + 12] = heap[dst + 12];
          view[i + 13] = heap[dst + 13];
          view[i + 14] = heap[dst + 14];
          view[i + 15] = heap[dst + 15];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*64)>>2));
      }
      GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
    };
  var _emscripten_glUniformMatrix4fv = _glUniformMatrix4fv;

  /** @suppress {duplicate } */
  var _glUniformMatrix4x2fv = (location, count, transpose, value) => {
      count && GLctx.uniformMatrix4x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value)>>2), count*8);
    };
  var _emscripten_glUniformMatrix4x2fv = _glUniformMatrix4x2fv;

  /** @suppress {duplicate } */
  var _glUniformMatrix4x3fv = (location, count, transpose, value) => {
      count && GLctx.uniformMatrix4x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value)>>2), count*12);
    };
  var _emscripten_glUniformMatrix4x3fv = _glUniformMatrix4x3fv;

  
  
  
  /** @suppress {duplicate } */
  var _glUnmapBuffer = (target) => {
      if (!emscriptenWebGLValidateMapBufferTarget(target)) {
        GL.recordError(0x500/*GL_INVALID_ENUM*/);
        err('GL_INVALID_ENUM in glUnmapBuffer');
        return 0;
      }
  
      var buffer = emscriptenWebGLGetBufferBinding(target);
      var mapping = GL.mappedBuffers[buffer];
      if (!mapping || !mapping.mem) {
        GL.recordError(0x502 /* GL_INVALID_OPERATION */);
        err('buffer was never mapped in glUnmapBuffer');
        return 0;
      }
  
      if (!(mapping.access & 0x10)) { /* GL_MAP_FLUSH_EXPLICIT_BIT */
        if (GL.currentContext.version >= 2) {
          GLctx.bufferSubData(target, mapping.offset, HEAPU8, mapping.mem, mapping.length);
        } else
        GLctx.bufferSubData(target, mapping.offset, HEAPU8.subarray(mapping.mem, mapping.mem+mapping.length));
      }
      _free(mapping.mem);
      mapping.mem = 0;
      return 1;
    };
  var _emscripten_glUnmapBuffer = _glUnmapBuffer;

  /** @suppress {duplicate } */
  var _glUseProgram = (program) => {
      program = GL.programs[program];
      GLctx.useProgram(program);
      // Record the currently active program so that we can access the uniform
      // mapping table of that program.
      GLctx.currentProgram = program;
    };
  var _emscripten_glUseProgram = _glUseProgram;

  /** @suppress {duplicate } */
  var _glValidateProgram = (program) => {
      GLctx.validateProgram(GL.programs[program]);
    };
  var _emscripten_glValidateProgram = _glValidateProgram;

  /** @suppress {duplicate } */
  var _glVertexAttrib1f = (x0, x1) => GLctx.vertexAttrib1f(x0, x1);
  var _emscripten_glVertexAttrib1f = _glVertexAttrib1f;

  /** @suppress {duplicate } */
  var _glVertexAttrib1fv = (index, v) => {
  
      GLctx.vertexAttrib1f(index, HEAPF32[v>>2]);
    };
  var _emscripten_glVertexAttrib1fv = _glVertexAttrib1fv;

  /** @suppress {duplicate } */
  var _glVertexAttrib2f = (x0, x1, x2) => GLctx.vertexAttrib2f(x0, x1, x2);
  var _emscripten_glVertexAttrib2f = _glVertexAttrib2f;

  /** @suppress {duplicate } */
  var _glVertexAttrib2fv = (index, v) => {
  
      GLctx.vertexAttrib2f(index, HEAPF32[v>>2], HEAPF32[v+4>>2]);
    };
  var _emscripten_glVertexAttrib2fv = _glVertexAttrib2fv;

  /** @suppress {duplicate } */
  var _glVertexAttrib3f = (x0, x1, x2, x3) => GLctx.vertexAttrib3f(x0, x1, x2, x3);
  var _emscripten_glVertexAttrib3f = _glVertexAttrib3f;

  /** @suppress {duplicate } */
  var _glVertexAttrib3fv = (index, v) => {
  
      GLctx.vertexAttrib3f(index, HEAPF32[v>>2], HEAPF32[v+4>>2], HEAPF32[v+8>>2]);
    };
  var _emscripten_glVertexAttrib3fv = _glVertexAttrib3fv;

  /** @suppress {duplicate } */
  var _glVertexAttrib4f = (x0, x1, x2, x3, x4) => GLctx.vertexAttrib4f(x0, x1, x2, x3, x4);
  var _emscripten_glVertexAttrib4f = _glVertexAttrib4f;

  /** @suppress {duplicate } */
  var _glVertexAttrib4fv = (index, v) => {
  
      GLctx.vertexAttrib4f(index, HEAPF32[v>>2], HEAPF32[v+4>>2], HEAPF32[v+8>>2], HEAPF32[v+12>>2]);
    };
  var _emscripten_glVertexAttrib4fv = _glVertexAttrib4fv;

  /** @suppress {duplicate } */
  var _glVertexAttribDivisor = (index, divisor) => {
      GLctx.vertexAttribDivisor(index, divisor);
    };
  var _emscripten_glVertexAttribDivisor = _glVertexAttribDivisor;

  
  /** @suppress {duplicate } */
  var _glVertexAttribDivisorANGLE = _glVertexAttribDivisor;
  var _emscripten_glVertexAttribDivisorANGLE = _glVertexAttribDivisorANGLE;

  
  /** @suppress {duplicate } */
  var _glVertexAttribDivisorARB = _glVertexAttribDivisor;
  var _emscripten_glVertexAttribDivisorARB = _glVertexAttribDivisorARB;

  
  /** @suppress {duplicate } */
  var _glVertexAttribDivisorEXT = _glVertexAttribDivisor;
  var _emscripten_glVertexAttribDivisorEXT = _glVertexAttribDivisorEXT;

  
  /** @suppress {duplicate } */
  var _glVertexAttribDivisorNV = _glVertexAttribDivisor;
  var _emscripten_glVertexAttribDivisorNV = _glVertexAttribDivisorNV;

  /** @suppress {duplicate } */
  var _glVertexAttribI4i = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4i(x0, x1, x2, x3, x4);
  var _emscripten_glVertexAttribI4i = _glVertexAttribI4i;

  /** @suppress {duplicate } */
  var _glVertexAttribI4iv = (index, v) => {
      GLctx.vertexAttribI4i(index, HEAP32[v>>2], HEAP32[v+4>>2], HEAP32[v+8>>2], HEAP32[v+12>>2]);
    };
  var _emscripten_glVertexAttribI4iv = _glVertexAttribI4iv;

  /** @suppress {duplicate } */
  var _glVertexAttribI4ui = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4ui(x0, x1, x2, x3, x4);
  var _emscripten_glVertexAttribI4ui = _glVertexAttribI4ui;

  /** @suppress {duplicate } */
  var _glVertexAttribI4uiv = (index, v) => {
      GLctx.vertexAttribI4ui(index, HEAPU32[v>>2], HEAPU32[v+4>>2], HEAPU32[v+8>>2], HEAPU32[v+12>>2]);
    };
  var _emscripten_glVertexAttribI4uiv = _glVertexAttribI4uiv;

  /** @suppress {duplicate } */
  var _glVertexAttribIPointer = (index, size, type, stride, ptr) => {
      var cb = GL.currentContext.clientBuffers[index];
      if (!GLctx.currentArrayBufferBinding) {
        cb.size = size;
        cb.type = type;
        cb.normalized = false;
        cb.stride = stride;
        cb.ptr = ptr;
        cb.clientside = true;
        cb.vertexAttribPointerAdaptor = function(index, size, type, normalized, stride, ptr) {
          this.vertexAttribIPointer(index, size, type, stride, ptr);
        };
        return;
      }
      cb.clientside = false;
      GLctx.vertexAttribIPointer(index, size, type, stride, ptr);
    };
  var _emscripten_glVertexAttribIPointer = _glVertexAttribIPointer;

  /** @suppress {duplicate } */
  var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
      var cb = GL.currentContext.clientBuffers[index];
      if (!GLctx.currentArrayBufferBinding) {
        cb.size = size;
        cb.type = type;
        cb.normalized = normalized;
        cb.stride = stride;
        cb.ptr = ptr;
        cb.clientside = true;
        cb.vertexAttribPointerAdaptor = function(index, size, type, normalized, stride, ptr) {
          this.vertexAttribPointer(index, size, type, normalized, stride, ptr);
        };
        return;
      }
      cb.clientside = false;
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
    };
  var _emscripten_glVertexAttribPointer = _glVertexAttribPointer;

  /** @suppress {duplicate } */
  var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);
  var _emscripten_glViewport = _glViewport;

  /** @suppress {duplicate } */
  var _glWaitSync = (sync, flags, timeout) => {
      // See WebGL2 vs GLES3 difference on GL_TIMEOUT_IGNORED above (https://www.khronos.org/registry/webgl/specs/latest/2.0/#5.15)
      timeout = Number(timeout);
      GLctx.waitSync(GL.syncs[sync], flags, timeout);
    };
  var _emscripten_glWaitSync = _glWaitSync;

  var _emscripten_has_asyncify = () => 0;

  
  
  var doRequestFullscreen = (target, strategy) => {
      if (!JSEvents.fullscreenEnabled()) return -1;
      target = findEventTarget(target);
      if (!target) return -4;
  
      if (!target.requestFullscreen
        && !target.webkitRequestFullscreen
        ) {
        return -3;
      }
  
      // Queue this function call if we're not currently in an event handler and
      // the user saw it appropriate to do so.
      if (!JSEvents.canPerformEventHandlerRequests()) {
        if (strategy.deferUntilInEventHandler) {
          JSEvents.deferCall(JSEvents_requestFullscreen, 1 /* priority over pointer lock */, [target, strategy]);
          return 1;
        }
        return -2;
      }
  
      return JSEvents_requestFullscreen(target, strategy);
    };
  var _emscripten_request_fullscreen_strategy = (target, deferUntilInEventHandler, fullscreenStrategy) => {
      var strategy = {
        scaleMode: HEAP32[((fullscreenStrategy)>>2)],
        canvasResolutionScaleMode: HEAP32[(((fullscreenStrategy)+(4))>>2)],
        filteringMode: HEAP32[(((fullscreenStrategy)+(8))>>2)],
        deferUntilInEventHandler,
        canvasResizedCallback: HEAP32[(((fullscreenStrategy)+(12))>>2)],
        canvasResizedCallbackUserData: HEAP32[(((fullscreenStrategy)+(16))>>2)]
      };
  
      return doRequestFullscreen(target, strategy);
    };

  
  
  var _emscripten_request_pointerlock = (target, deferUntilInEventHandler) => {
      target = findEventTarget(target);
      if (!target) return -4;
      if (!target.requestPointerLock) {
        return -1;
      }
  
      // Queue this function call if we're not currently in an event handler and
      // the user saw it appropriate to do so.
      if (!JSEvents.canPerformEventHandlerRequests()) {
        if (deferUntilInEventHandler) {
          JSEvents.deferCall(requestPointerLock, 2 /* priority below fullscreen */, [target]);
          return 1;
        }
        return -2;
      }
  
      return requestPointerLock(target);
    };

  var getHeapMax = () =>
      // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
      // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
      // for any code that deals with heap sizes, which would require special
      // casing all heap size related code to treat 0 specially.
      2147483648;
  
  var alignMemory = (size, alignment) => {
      assert(alignment, "alignment argument is required");
      return Math.ceil(size / alignment) * alignment;
    };
  
  var growMemory = (size) => {
      var b = wasmMemory.buffer;
      var pages = ((size - b.byteLength + 65535) / 65536) | 0;
      try {
        // round size grow request up to wasm page size (fixed 64KB per spec)
        wasmMemory.grow(pages); // .grow() takes a delta compared to the previous size
        updateMemoryViews();
        return 1 /*success*/;
      } catch(e) {
        err(`growMemory: Attempted to grow heap from ${b.byteLength} bytes to ${size} bytes, but got error: ${e}`);
      }
      // implicit 0 return to save code size (caller will cast "undefined" into 0
      // anyhow)
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      // With multithreaded builds, races can happen (another thread might increase the size
      // in between), so return a failure, and let the caller retry.
      assert(requestedSize > oldSize);
  
      // Memory resize rules:
      // 1.  Always increase heap size to at least the requested size, rounded up
      //     to next page multiple.
      // 2a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap
      //     geometrically: increase the heap size according to
      //     MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%), At most
      //     overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
      // 2b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap
      //     linearly: increase the heap size by at least
      //     MEMORY_GROWTH_LINEAR_STEP bytes.
      // 3.  Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by
      //     MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
      // 4.  If we were unable to allocate as much memory, it may be due to
      //     over-eager decision to excessively reserve due to (3) above.
      //     Hence if an allocation fails, cut down on the amount of excess
      //     growth, in an attempt to succeed to perform a smaller allocation.
  
      // A limit is set for how much we can grow. We should not exceed that
      // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        err(`Cannot enlarge memory, requested ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
        return false;
      }
  
      // Loop through potential heap size increases. If we attempt a too eager
      // reservation that fails, cut down on the attempted size and reserve a
      // smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
        // but limit overreserving (default to capping at +96MB overgrowth at most)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296 );
  
        var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
  
        var replacement = growMemory(newSize);
        if (replacement) {
  
          return true;
        }
      }
      err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
      return false;
    };

  /** @suppress {checkTypes} */
  var _emscripten_sample_gamepad_data = () => {
      try {
        if (navigator.getGamepads) return (JSEvents.lastGamepadState = navigator.getGamepads())
          ? 0 : -1;
      } catch(e) {
        err(`navigator.getGamepads() exists, but failed to execute with exception ${e}. Disabling Gamepad access.`);
        navigator.getGamepads = null; // Disable getGamepads() so that it won't be attempted to be used again.
      }
      return -1;
    };

  
  
  
  var registerBeforeUnloadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString) => {
      var beforeUnloadEventHandlerFunc = (e = event) => {
        // Note: This is always called on the main browser thread, since it needs synchronously return a value!
        var confirmationMessage = getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData);
  
        if (confirmationMessage) {
          confirmationMessage = UTF8ToString(confirmationMessage);
        }
        if (confirmationMessage) {
          e.preventDefault();
          e.returnValue = confirmationMessage;
          return confirmationMessage;
        }
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: beforeUnloadEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_beforeunload_callback_on_thread = (userData, callbackfunc, targetThread) => {
      if (typeof onbeforeunload == 'undefined') return -1;
      // beforeunload callback can only be registered on the main browser thread, because the page will go away immediately after returning from the handler,
      // and there is no time to start proxying it anywhere.
      if (targetThread !== 1) return -5;
      return registerBeforeUnloadEventCallback(2, userData, true, callbackfunc, 28, "beforeunload");
    };

  
  
  
  
  var registerFocusEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.focusEvent ||= _malloc(256);
  
      var focusEventHandlerFunc = (e = event) => {
        var nodeName = JSEvents.getNodeNameForTarget(e.target);
        var id = e.target.id ? e.target.id : '';
  
        var focusEvent = JSEvents.focusEvent;
        stringToUTF8(nodeName, focusEvent + 0, 128);
        stringToUTF8(id, focusEvent + 128, 128);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, focusEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: focusEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_blur_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);


  var _emscripten_set_element_css_size = (target, width, height) => {
      target = findEventTarget(target);
      if (!target) return -4;
  
      target.style.width = width + "px";
      target.style.height = height + "px";
  
      return 0;
    };

  var _emscripten_set_focus_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);

  
  
  
  var fillFullscreenChangeEventData = (eventStruct) => {
      var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      var isFullscreen = !!fullscreenElement;
      // Assigning a boolean to HEAP32 with expected type coercion.
      /** @suppress{checkTypes} */
      HEAP8[eventStruct] = isFullscreen;
      HEAP8[(eventStruct)+(1)] = JSEvents.fullscreenEnabled();
      // If transitioning to fullscreen, report info about the element that is now fullscreen.
      // If transitioning to windowed mode, report info about the element that just was fullscreen.
      var reportedElement = isFullscreen ? fullscreenElement : JSEvents.previousFullscreenElement;
      var nodeName = JSEvents.getNodeNameForTarget(reportedElement);
      var id = reportedElement?.id || '';
      stringToUTF8(nodeName, eventStruct + 2, 128);
      stringToUTF8(id, eventStruct + 130, 128);
      HEAP32[(((eventStruct)+(260))>>2)] = reportedElement ? reportedElement.clientWidth : 0;
      HEAP32[(((eventStruct)+(264))>>2)] = reportedElement ? reportedElement.clientHeight : 0;
      HEAP32[(((eventStruct)+(268))>>2)] = screen.width;
      HEAP32[(((eventStruct)+(272))>>2)] = screen.height;
      if (isFullscreen) {
        JSEvents.previousFullscreenElement = fullscreenElement;
      }
    };
  
  
  var registerFullscreenChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.fullscreenChangeEvent ||= _malloc(276);
  
      var fullscreenChangeEventhandlerFunc = (e = event) => {
        var fullscreenChangeEvent = JSEvents.fullscreenChangeEvent;
  
        fillFullscreenChangeEventData(fullscreenChangeEvent);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, fullscreenChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: fullscreenChangeEventhandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  var _emscripten_set_fullscreenchange_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      if (!JSEvents.fullscreenEnabled()) return -1;
      target = findEventTarget(target);
      if (!target) return -4;
  
      // Unprefixed Fullscreen API shipped in Chromium 71 (https://bugs.chromium.org/p/chromium/issues/detail?id=383813)
      // As of Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitfullscreenchange. TODO: revisit this check once Safari ships unprefixed version.
      registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "webkitfullscreenchange", targetThread);
  
      return registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "fullscreenchange", targetThread);
    };

  
  
  
  
  var registerGamepadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.gamepadEvent ||= _malloc(1240);
  
      var gamepadEventHandlerFunc = (e = event) => {
        var gamepadEvent = JSEvents.gamepadEvent;
        fillGamepadEventData(gamepadEvent, e["gamepad"]);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, gamepadEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        allowsDeferredCalls: true,
        eventTypeString,
        callbackfunc,
        handlerFunc: gamepadEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  var _emscripten_set_gamepadconnected_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
      if (_emscripten_sample_gamepad_data()) return -1;
      return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 26, "gamepadconnected", targetThread);
    };

  
  var _emscripten_set_gamepaddisconnected_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
      if (_emscripten_sample_gamepad_data()) return -1;
      return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 27, "gamepaddisconnected", targetThread);
    };

  
  
  
  
  var registerKeyEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.keyEvent ||= _malloc(160);
  
      var keyEventHandlerFunc = (e) => {
        assert(e);
  
        var keyEventData = JSEvents.keyEvent;
        HEAPF64[((keyEventData)>>3)] = e.timeStamp;
  
        var idx = ((keyEventData)>>2);
  
        HEAP32[idx + 2] = e.location;
        HEAP8[keyEventData + 12] = e.ctrlKey;
        HEAP8[keyEventData + 13] = e.shiftKey;
        HEAP8[keyEventData + 14] = e.altKey;
        HEAP8[keyEventData + 15] = e.metaKey;
        HEAP8[keyEventData + 16] = e.repeat;
        HEAP32[idx + 5] = e.charCode;
        HEAP32[idx + 6] = e.keyCode;
        HEAP32[idx + 7] = e.which;
        stringToUTF8(e.key || '', keyEventData + 32, 32);
        stringToUTF8(e.code || '', keyEventData + 64, 32);
        stringToUTF8(e.char || '', keyEventData + 96, 32);
        stringToUTF8(e.locale || '', keyEventData + 128, 32);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: keyEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_keydown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);

  var _emscripten_set_keypress_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);

  var _emscripten_set_keyup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);

  
  var _emscripten_set_main_loop = (func, fps, simulateInfiniteLoop) => {
      var iterFunc = getWasmTableEntry(func);
      setMainLoop(iterFunc, fps, simulateInfiniteLoop);
    };


  
  var fillMouseEventData = (eventStruct, e, target) => {
      assert(eventStruct % 4 == 0);
      HEAPF64[((eventStruct)>>3)] = e.timeStamp;
      var idx = ((eventStruct)>>2);
      HEAP32[idx + 2] = e.screenX;
      HEAP32[idx + 3] = e.screenY;
      HEAP32[idx + 4] = e.clientX;
      HEAP32[idx + 5] = e.clientY;
      HEAP8[eventStruct + 24] = e.ctrlKey;
      HEAP8[eventStruct + 25] = e.shiftKey;
      HEAP8[eventStruct + 26] = e.altKey;
      HEAP8[eventStruct + 27] = e.metaKey;
      HEAP16[idx*2 + 14] = e.button;
      HEAP16[idx*2 + 15] = e.buttons;
  
      HEAP32[idx + 8] = e["movementX"];
  
      HEAP32[idx + 9] = e["movementY"];
  
      // Note: rect contains doubles (truncated to placate SAFE_HEAP, which is the same behaviour when writing to HEAP32 anyway)
      var rect = getBoundingClientRect(target);
      HEAP32[idx + 10] = e.clientX - (rect.left | 0);
      HEAP32[idx + 11] = e.clientY - (rect.top  | 0);
    };
  
  
  
  var registerMouseEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.mouseEvent ||= _malloc(64);
      target = findEventTarget(target);
  
      var mouseEventHandlerFunc = (e = event) => {
        // TODO: Make this access thread safe, or this could update live while app is reading it.
        fillMouseEventData(JSEvents.mouseEvent, e, target);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString != 'mousemove' && eventTypeString != 'mouseenter' && eventTypeString != 'mouseleave', // Mouse move events do not allow fullscreen/pointer lock requests to be handled in them!
        eventTypeString,
        callbackfunc,
        handlerFunc: mouseEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_mousedown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);

  var _emscripten_set_mouseenter_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 33, "mouseenter", targetThread);

  var _emscripten_set_mouseleave_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 34, "mouseleave", targetThread);

  var _emscripten_set_mousemove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);

  var _emscripten_set_mouseup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);

  
  var screenOrientation = () => {
      if (!window.screen) return undefined;
      return screen.orientation || screen['mozOrientation'] || screen['webkitOrientation'];
    };
  var fillOrientationChangeEventData = (eventStruct) => {
      // OrientationType enum
      var orientationsType1 = ['portrait-primary', 'portrait-secondary', 'landscape-primary', 'landscape-secondary'];
      // alternative selection from OrientationLockType enum
      var orientationsType2 = ['portrait',         'portrait',           'landscape',         'landscape'];
  
      var orientationIndex = 0;
      var orientationAngle = 0;
      var screenOrientObj  = screenOrientation();
      if (typeof screenOrientObj === 'object') {
        orientationIndex = orientationsType1.indexOf(screenOrientObj.type);
        if (orientationIndex < 0) {
          orientationIndex = orientationsType2.indexOf(screenOrientObj.type);
        }
        if (orientationIndex >= 0) {
          orientationIndex = 1 << orientationIndex;
        }
        orientationAngle = screenOrientObj.angle;
      }
      else {
        // fallback for Safari earlier than 16.4 (March 2023)
        orientationAngle = window.orientation;
      }
  
      HEAP32[((eventStruct)>>2)] = orientationIndex;
      HEAP32[(((eventStruct)+(4))>>2)] = orientationAngle;
    };
  
  
  var registerOrientationChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.orientationChangeEvent ||= _malloc(8);
  
      var orientationChangeEventHandlerFunc = (e = event) => {
        var orientationChangeEvent = JSEvents.orientationChangeEvent;
  
        fillOrientationChangeEventData(orientationChangeEvent);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, orientationChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: orientationChangeEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_orientationchange_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
      if (!window.screen || !screen.orientation) return -1;
      return registerOrientationChangeEventCallback(screen.orientation, userData, useCapture, callbackfunc, 18, 'change', targetThread);
    };

  
  
  var fillPointerlockChangeEventData = (eventStruct) => {
      var pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement;
      var isPointerlocked = !!pointerLockElement;
      // Assigning a boolean to HEAP32 with expected type coercion.
      /** @suppress{checkTypes} */
      HEAP8[eventStruct] = isPointerlocked;
      var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
      var id = pointerLockElement?.id || '';
      stringToUTF8(nodeName, eventStruct + 1, 128);
      stringToUTF8(id, eventStruct + 129, 128);
    };
  
  
  var registerPointerlockChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.pointerlockChangeEvent ||= _malloc(257);
  
      var pointerlockChangeEventHandlerFunc = (e = event) => {
        var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent;
        fillPointerlockChangeEventData(pointerlockChangeEvent);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, pointerlockChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: pointerlockChangeEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  /** @suppress {missingProperties} */
  var _emscripten_set_pointerlockchange_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      // TODO: Currently not supported in pthreads or in --proxy-to-worker mode. (In pthreads mode, document object is not defined)
      if (!document || !document.body || (!document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock)) {
        return -1;
      }
  
      target = findEventTarget(target);
      if (!target) return -4;
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mozpointerlockchange", targetThread);
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "webkitpointerlockchange", targetThread);
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mspointerlockchange", targetThread);
      return registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "pointerlockchange", targetThread);
    };

  
  
  
  var registerUiEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.uiEvent ||= _malloc(36);
  
      target = findEventTarget(target);
  
      var uiEventHandlerFunc = (e = event) => {
        if (e.target != target) {
          // Never take ui events such as scroll via a 'bubbled' route, but always from the direct element that
          // was targeted. Otherwise e.g. if app logs a message in response to a page scroll, the Emscripten log
          // message box could cause to scroll, generating a new (bubbled) scroll message, causing a new log print,
          // causing a new scroll, etc..
          return;
        }
        var b = document.body; // Take document.body to a variable, Closure compiler does not outline access to it on its own.
        if (!b) {
          // During a page unload 'body' can be null, with "Cannot read property 'clientWidth' of null" being thrown
          return;
        }
        var uiEvent = JSEvents.uiEvent;
        HEAP32[((uiEvent)>>2)] = 0; // always zero for resize and scroll
        HEAP32[(((uiEvent)+(4))>>2)] = b.clientWidth;
        HEAP32[(((uiEvent)+(8))>>2)] = b.clientHeight;
        HEAP32[(((uiEvent)+(12))>>2)] = innerWidth;
        HEAP32[(((uiEvent)+(16))>>2)] = innerHeight;
        HEAP32[(((uiEvent)+(20))>>2)] = outerWidth;
        HEAP32[(((uiEvent)+(24))>>2)] = outerHeight;
        HEAP32[(((uiEvent)+(28))>>2)] = pageXOffset | 0; // scroll offsets are float
        HEAP32[(((uiEvent)+(32))>>2)] = pageYOffset | 0;
        if (getWasmTableEntry(callbackfunc)(eventTypeId, uiEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: uiEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_resize_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);

  
  
  
  
  var registerTouchEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.touchEvent ||= _malloc(1552);
  
      target = findEventTarget(target);
  
      var touchEventHandlerFunc = (e) => {
        assert(e);
        var t, touches = {}, et = e.touches;
        // To ease marshalling different kinds of touches that browser reports (all touches are listed in e.touches,
        // only changed touches in e.changedTouches, and touches on target at a.targetTouches), mark a boolean in
        // each Touch object so that we can later loop only once over all touches we see to marshall over to Wasm.
  
        for (let t of et) {
          // Browser might recycle the generated Touch objects between each frame (Firefox on Android), so reset any
          // changed/target states we may have set from previous frame.
          t.isChanged = t.onTarget = 0;
          touches[t.identifier] = t;
        }
        // Mark which touches are part of the changedTouches list.
        for (let t of e.changedTouches) {
          t.isChanged = 1;
          touches[t.identifier] = t;
        }
        // Mark which touches are part of the targetTouches list.
        for (let t of e.targetTouches) {
          touches[t.identifier].onTarget = 1;
        }
  
        var touchEvent = JSEvents.touchEvent;
        HEAPF64[((touchEvent)>>3)] = e.timeStamp;
        HEAP8[touchEvent + 12] = e.ctrlKey;
        HEAP8[touchEvent + 13] = e.shiftKey;
        HEAP8[touchEvent + 14] = e.altKey;
        HEAP8[touchEvent + 15] = e.metaKey;
        var idx = touchEvent + 16;
        var targetRect = getBoundingClientRect(target);
        var numTouches = 0;
        for (let t of Object.values(touches)) {
          var idx32 = ((idx)>>2); // Pre-shift the ptr to index to HEAP32 to save code size
          HEAP32[idx32 + 0] = t.identifier;
          HEAP32[idx32 + 1] = t.screenX;
          HEAP32[idx32 + 2] = t.screenY;
          HEAP32[idx32 + 3] = t.clientX;
          HEAP32[idx32 + 4] = t.clientY;
          HEAP32[idx32 + 5] = t.pageX;
          HEAP32[idx32 + 6] = t.pageY;
          HEAP8[idx + 28] = t.isChanged;
          HEAP8[idx + 29] = t.onTarget;
          HEAP32[idx32 + 8] = t.clientX - (targetRect.left | 0);
          HEAP32[idx32 + 9] = t.clientY - (targetRect.top  | 0);
  
          idx += 48;
  
          if (++numTouches > 31) {
            break;
          }
        }
        HEAP32[(((touchEvent)+(8))>>2)] = numTouches;
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, touchEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString == 'touchstart' || eventTypeString == 'touchend',
        eventTypeString,
        callbackfunc,
        handlerFunc: touchEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_touchcancel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 25, "touchcancel", targetThread);

  var _emscripten_set_touchend_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 23, "touchend", targetThread);

  var _emscripten_set_touchmove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 24, "touchmove", targetThread);

  var _emscripten_set_touchstart_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 22, "touchstart", targetThread);

  
  var fillVisibilityChangeEventData = (eventStruct) => {
      var visibilityStates = [ "hidden", "visible", "prerender", "unloaded" ];
      var visibilityState = visibilityStates.indexOf(document.visibilityState);
  
      // Assigning a boolean to HEAP32 with expected type coercion.
      /** @suppress{checkTypes} */
      HEAP8[eventStruct] = document.hidden;
      HEAP32[(((eventStruct)+(4))>>2)] = visibilityState;
    };
  
  
  var registerVisibilityChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.visibilityChangeEvent ||= _malloc(8);
  
      var visibilityChangeEventHandlerFunc = (e = event) => {
        var visibilityChangeEvent = JSEvents.visibilityChangeEvent;
  
        fillVisibilityChangeEventData(visibilityChangeEvent);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, visibilityChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: visibilityChangeEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  var _emscripten_set_visibilitychange_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
    if (!specialHTMLTargets[1]) {
      return -4;
    }
      return registerVisibilityChangeEventCallback(specialHTMLTargets[1], userData, useCapture, callbackfunc, 21, "visibilitychange", targetThread);
    };

  
  
  
  var registerWheelEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.wheelEvent ||= _malloc(96);
  
      // The DOM Level 3 events spec event 'wheel'
      var wheelHandlerFunc = (e = event) => {
        var wheelEvent = JSEvents.wheelEvent;
        fillMouseEventData(wheelEvent, e, target);
        HEAPF64[(((wheelEvent)+(64))>>3)] = e["deltaX"];
        HEAPF64[(((wheelEvent)+(72))>>3)] = e["deltaY"];
        HEAPF64[(((wheelEvent)+(80))>>3)] = e["deltaZ"];
        HEAP32[(((wheelEvent)+(88))>>2)] = e["deltaMode"];
        if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: true,
        eventTypeString,
        callbackfunc,
        handlerFunc: wheelHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  var _emscripten_set_wheel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      target = findEventTarget(target);
      if (!target) return -4;
      if (typeof target.onwheel != 'undefined') {
        return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
      } else {
        return -1;
      }
    };

  
  var _emscripten_set_window_title = (title) => document.title = UTF8ToString(title);

  var _emscripten_sleep = () => {
      throw 'Please compile your program with async support in order to use asynchronous operations like emscripten_sleep';
    };

  
  var webglPowerPreferences = ["default","low-power","high-performance"];
  
  
  /** @suppress {duplicate } */
  var _emscripten_webgl_do_create_context = (target, attributes) => {
      assert(attributes);
      var attr32 = ((attributes)>>2);
      var powerPreference = HEAP32[attr32 + (8>>2)];
      var contextAttributes = {
        'alpha': !!HEAP8[attributes + 0],
        'depth': !!HEAP8[attributes + 1],
        'stencil': !!HEAP8[attributes + 2],
        'antialias': !!HEAP8[attributes + 3],
        'premultipliedAlpha': !!HEAP8[attributes + 4],
        'preserveDrawingBuffer': !!HEAP8[attributes + 5],
        'powerPreference': webglPowerPreferences[powerPreference],
        'failIfMajorPerformanceCaveat': !!HEAP8[attributes + 12],
        // The following are not predefined WebGL context attributes in the WebGL specification, so the property names can be minified by Closure.
        majorVersion: HEAP32[attr32 + (16>>2)],
        minorVersion: HEAP32[attr32 + (20>>2)],
        enableExtensionsByDefault: HEAP8[attributes + 24],
        explicitSwapControl: HEAP8[attributes + 25],
        proxyContextToMainThread: HEAP32[attr32 + (28>>2)],
        renderViaOffscreenBackBuffer: HEAP8[attributes + 32]
      };
  
      //  TODO: Make these into hard errors at some point in the future
      if (contextAttributes.majorVersion !== 1 && contextAttributes.majorVersion !== 2) {
        err(`Invalid WebGL version requested: ${contextAttributes.majorVersion}`);
      }
  
      var canvas = findCanvasEventTarget(target);
  
      if (!canvas) {
        return 0;
      }
  
      if (contextAttributes.explicitSwapControl) {
        return 0;
      }
  
      var contextHandle = GL.createContext(canvas, contextAttributes);
      return contextHandle;
    };
  var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;

  var _emscripten_webgl_destroy_context = (contextHandle) => {
      if (GL.currentContext == contextHandle) GL.currentContext = 0;
      GL.deleteContext(contextHandle);
    };

  var _emscripten_webgl_make_context_current = (contextHandle) => {
      var success = GL.makeContextCurrent(contextHandle);
      return success ? 0 : -5;
    };

  var ENV = {
  };
  
  var getExecutableName = () => thisProgram || './this.program';
  var getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        // Default values.
        // Browser language detection #8751
        var lang = ((typeof navigator == 'object' && navigator.language) || 'C').replace('-', '_') + '.UTF-8';
        var env = {
          'USER': 'web_user',
          'LOGNAME': 'web_user',
          'PATH': '/',
          'PWD': '/',
          'HOME': '/home/web_user',
          'LANG': lang,
          '_': getExecutableName()
        };
        // Apply the user-provided values, if any.
        for (var x in ENV) {
          // x is a key in ENV; if ENV[x] is undefined, that means it was
          // explicitly set to be so. We allow user code to do that to
          // force variables with default values to remain unset.
          if (ENV[x] === undefined) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(`${x}=${env[x]}`);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    };
  
  var _environ_get = (__environ, environ_buf) => {
      var bufSize = 0;
      var envp = 0;
      for (var string of getEnvStrings()) {
        var ptr = environ_buf + bufSize;
        HEAPU32[(((__environ)+(envp))>>2)] = ptr;
        bufSize += stringToUTF8(string, ptr, Infinity) + 1;
        envp += 4;
      }
      return 0;
    };

  
  var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
      var strings = getEnvStrings();
      HEAPU32[((penviron_count)>>2)] = strings.length;
      var bufSize = 0;
      for (var string of strings) {
        bufSize += lengthBytesUTF8(string) + 1;
      }
      HEAPU32[((penviron_buf_size)>>2)] = bufSize;
      return 0;
    };


  function _fd_close(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  /** @param {number=} offset */
  var doReadv = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.read(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break; // nothing more to read
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  function _fd_read(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doReadv(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  
  function _fd_seek(fd, offset, whence, newOffset) {
    offset = bigintToI53Checked(offset);
  
  
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.llseek(stream, offset, whence);
      HEAP64[((newOffset)>>3)] = BigInt(stream.position);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  ;
  }

  /** @param {number=} offset */
  var doWritev = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) {
          // No more space to write.
          break;
        }
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  function _fd_write(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doWritev(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }












































  function _random_get(buffer, size) {
  try {
  
      randomFill(HEAPU8.subarray(buffer, buffer + size));
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }




  var dynCall = (sig, ptr, args = [], promising = false) => {
      assert(!promising, 'async dynCall is not supported in this mode')
      assert(getWasmTableEntry(ptr), `missing table entry in dynCall: ${ptr}`);
      var func = getWasmTableEntry(ptr);
      var rtn = func(...args);
  
      function convert(rtn) {
        return rtn;
      }
  
      return convert(rtn);
    };


  /** @param {Object=} elements */
  var autoResumeAudioContext = (ctx, elements) => {
      if (!elements) {
        elements = [document, document.getElementById('canvas')];
      }
      ['keydown', 'mousedown', 'touchstart'].forEach((event) => {
        elements.forEach((element) => {
          element?.addEventListener(event, () => {
            if (ctx.state === 'suspended') ctx.resume();
          }, { 'once': true });
        });
      });
    };





  var writeArrayToMemory = (array, buffer) => {
      assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
      HEAP8.set(array, buffer);
    };



  var FS_createPath = (...args) => FS.createPath(...args);



  var FS_unlink = (...args) => FS.unlink(...args);

  var FS_createLazyFile = (...args) => FS.createLazyFile(...args);

  var FS_createDevice = (...args) => FS.createDevice(...args);

  var createContext = Browser.createContext;

  FS.createPreloadedFile = FS_createPreloadedFile;
  FS.staticInit();;

      Module['requestAnimationFrame'] = MainLoop.requestAnimationFrame;
      Module['pauseMainLoop'] = MainLoop.pause;
      Module['resumeMainLoop'] = MainLoop.resume;
      MainLoop.init();;

      // Signal GL rendering layer that processing of a new frame is about to
      // start. This helps it optimize VBO double-buffering and reduce GPU stalls.
      registerPreMainLoop(() => GL.newRenderingFrameStarted());
    ;
for (let i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i));;
var miniTempWebGLFloatBuffersStorage = new Float32Array(288);
  // Create GL_POOL_TEMP_BUFFERS_SIZE+1 temporary buffers, for uploads of size 0 through GL_POOL_TEMP_BUFFERS_SIZE inclusive
  for (/**@suppress{duplicate}*/var i = 0; i <= 288; ++i) {
    miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i);
  };
var miniTempWebGLIntBuffersStorage = new Int32Array(288);
  // Create GL_POOL_TEMP_BUFFERS_SIZE+1 temporary buffers, for uploads of size 0 through GL_POOL_TEMP_BUFFERS_SIZE inclusive
  for (/**@suppress{duplicate}*/var i = 0; i <= 288; ++i) {
    miniTempWebGLIntBuffers[i] = miniTempWebGLIntBuffersStorage.subarray(0, i);
  };
// End JS library code

// include: postlibrary.js
// This file is included after the automatically-generated JS library code
// but before the wasm module is created.

{

  // Begin ATMODULES hooks
  if (Module['noExitRuntime']) noExitRuntime = Module['noExitRuntime'];
if (Module['preloadPlugins']) preloadPlugins = Module['preloadPlugins'];
if (Module['print']) out = Module['print'];
if (Module['printErr']) err = Module['printErr'];
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];
  // End ATMODULES hooks

  checkIncomingModuleAPI();

  if (Module['arguments']) arguments_ = Module['arguments'];
  if (Module['thisProgram']) thisProgram = Module['thisProgram'];

  // Assertions on removed incoming Module JS APIs.
  assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['read'] == 'undefined', 'Module.read option was removed');
  assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
  assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
  assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)');
  assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
  assert(typeof Module['ENVIRONMENT'] == 'undefined', 'Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
  assert(typeof Module['STACK_SIZE'] == 'undefined', 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')
  // If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
  assert(typeof Module['wasmMemory'] == 'undefined', 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
  assert(typeof Module['INITIAL_MEMORY'] == 'undefined', 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

}

// Begin runtime exports
  Module['addRunDependency'] = addRunDependency;
  Module['removeRunDependency'] = removeRunDependency;
  Module['createContext'] = createContext;
  Module['FS_createPreloadedFile'] = FS_createPreloadedFile;
  Module['FS_unlink'] = FS_unlink;
  Module['FS_createPath'] = FS_createPath;
  Module['FS_createDevice'] = FS_createDevice;
  Module['FS_createDataFile'] = FS_createDataFile;
  Module['FS_createLazyFile'] = FS_createLazyFile;
  var missingLibrarySymbols = [
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'convertI32PairToI53',
  'convertI32PairToI53Checked',
  'convertU32PairToI53',
  'getTempRet0',
  'setTempRet0',
  'zeroMemory',
  'withStackSave',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'emscriptenLog',
  'getDynCaller',
  'runtimeKeepalivePush',
  'runtimeKeepalivePop',
  'asmjsMangle',
  'HandleAllocator',
  'getNativeTypeSize',
  'addOnInit',
  'addOnPostCtor',
  'addOnPreMain',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'ccall',
  'cwrap',
  'uleb128Encode',
  'sigToWasmTypes',
  'generateFuncType',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'reallyNegative',
  'unSign',
  'strLen',
  'reSign',
  'formatString',
  'intArrayToString',
  'AsciiToString',
  'stringToAscii',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'UTF32ToString',
  'stringToUTF32',
  'lengthBytesUTF32',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'softFullscreenResizeWebGLRenderTarget',
  'registerPointerlockErrorEventCallback',
  'fillBatteryEventData',
  'battery',
  'registerBatteryEventCallback',
  'jsStackTrace',
  'getCallstack',
  'convertPCtoSourceLocation',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'setImmediateWrapped',
  'safeRequestAnimationFrame',
  'clearImmediateWrapped',
  'registerPostMainLoop',
  'getPromise',
  'makePromise',
  'idsToPromises',
  'makePromiseCallback',
  'findMatchingCatch',
  'Browser_asyncPrepareDataCounter',
  'arraySum',
  'addDays',
  'getSocketFromFD',
  'getSocketAddress',
  'FS_mkdirTree',
  '_setNetworkCallback',
  'writeGLArray',
  'registerWebGlEventCallback',
  'runAndAbortIfError',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
  'demangle',
  'stackTrace',
];
missingLibrarySymbols.forEach(missingLibrarySymbol)

  var unexportedSymbols = [
  'run',
  'out',
  'err',
  'callMain',
  'abort',
  'wasmMemory',
  'wasmExports',
  'HEAPF32',
  'HEAPF64',
  'HEAP8',
  'HEAPU8',
  'HEAP16',
  'HEAPU16',
  'HEAP32',
  'HEAPU32',
  'HEAP64',
  'HEAPU64',
  'writeStackCookie',
  'checkStackCookie',
  'writeI53ToI64',
  'readI53FromI64',
  'readI53FromU64',
  'INT53_MAX',
  'INT53_MIN',
  'bigintToI53Checked',
  'stackSave',
  'stackRestore',
  'stackAlloc',
  'ptrToString',
  'exitJS',
  'getHeapMax',
  'growMemory',
  'ENV',
  'ERRNO_CODES',
  'strError',
  'DNS',
  'Protocols',
  'Sockets',
  'timers',
  'warnOnce',
  'readEmAsmArgsArray',
  'readEmAsmArgs',
  'runEmAsmFunction',
  'runMainThreadEmAsm',
  'jstoi_q',
  'getExecutableName',
  'autoResumeAudioContext',
  'dynCall',
  'handleException',
  'keepRuntimeAlive',
  'callUserCallback',
  'maybeExit',
  'asyncLoad',
  'alignMemory',
  'mmapAlloc',
  'wasmTable',
  'getUniqueRunDependency',
  'noExitRuntime',
  'addOnPreRun',
  'addOnExit',
  'addOnPostRun',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'UTF8ToString',
  'stringToUTF8Array',
  'stringToUTF8',
  'lengthBytesUTF8',
  'intArrayFromString',
  'UTF16Decoder',
  'stringToNewUTF8',
  'stringToUTF8OnStack',
  'writeArrayToMemory',
  'JSEvents',
  'registerKeyEventCallback',
  'specialHTMLTargets',
  'maybeCStringToJsString',
  'findEventTarget',
  'findCanvasEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'setLetterbox',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'doRequestFullscreen',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'registerTouchEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'setCanvasElementSize',
  'getCanvasElementSize',
  'UNWIND_CACHE',
  'ExitStatus',
  'getEnvStrings',
  'checkWasiClock',
  'doReadv',
  'doWritev',
  'initRandomFill',
  'randomFill',
  'safeSetTimeout',
  'emSetImmediate',
  'emClearImmediate_deps',
  'emClearImmediate',
  'registerPreMainLoop',
  'promiseMap',
  'uncaughtExceptionCount',
  'exceptionLast',
  'exceptionCaught',
  'ExceptionInfo',
  'Browser',
  'requestFullscreen',
  'requestFullScreen',
  'setCanvasSize',
  'getUserMedia',
  'getPreloadedImageData__data',
  'wget',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'isLeapYear',
  'ydayFromDate',
  'SYSCALLS',
  'preloadPlugins',
  'FS_modeStringToFlags',
  'FS_getMode',
  'FS_stdin_getChar_buffer',
  'FS_stdin_getChar',
  'FS_readFile',
  'FS',
  'FS_root',
  'FS_mounts',
  'FS_devices',
  'FS_streams',
  'FS_nextInode',
  'FS_nameTable',
  'FS_currentPath',
  'FS_initialized',
  'FS_ignorePermissions',
  'FS_filesystems',
  'FS_syncFSRequests',
  'FS_readFiles',
  'FS_lookupPath',
  'FS_getPath',
  'FS_hashName',
  'FS_hashAddNode',
  'FS_hashRemoveNode',
  'FS_lookupNode',
  'FS_createNode',
  'FS_destroyNode',
  'FS_isRoot',
  'FS_isMountpoint',
  'FS_isFile',
  'FS_isDir',
  'FS_isLink',
  'FS_isChrdev',
  'FS_isBlkdev',
  'FS_isFIFO',
  'FS_isSocket',
  'FS_flagsToPermissionString',
  'FS_nodePermissions',
  'FS_mayLookup',
  'FS_mayCreate',
  'FS_mayDelete',
  'FS_mayOpen',
  'FS_checkOpExists',
  'FS_nextfd',
  'FS_getStreamChecked',
  'FS_getStream',
  'FS_createStream',
  'FS_closeStream',
  'FS_dupStream',
  'FS_doSetAttr',
  'FS_chrdev_stream_ops',
  'FS_major',
  'FS_minor',
  'FS_makedev',
  'FS_registerDevice',
  'FS_getDevice',
  'FS_getMounts',
  'FS_syncfs',
  'FS_mount',
  'FS_unmount',
  'FS_lookup',
  'FS_mknod',
  'FS_statfs',
  'FS_statfsStream',
  'FS_statfsNode',
  'FS_create',
  'FS_mkdir',
  'FS_mkdev',
  'FS_symlink',
  'FS_rename',
  'FS_rmdir',
  'FS_readdir',
  'FS_readlink',
  'FS_stat',
  'FS_fstat',
  'FS_lstat',
  'FS_doChmod',
  'FS_chmod',
  'FS_lchmod',
  'FS_fchmod',
  'FS_doChown',
  'FS_chown',
  'FS_lchown',
  'FS_fchown',
  'FS_doTruncate',
  'FS_truncate',
  'FS_ftruncate',
  'FS_utime',
  'FS_open',
  'FS_close',
  'FS_isClosed',
  'FS_llseek',
  'FS_read',
  'FS_write',
  'FS_mmap',
  'FS_msync',
  'FS_ioctl',
  'FS_writeFile',
  'FS_cwd',
  'FS_chdir',
  'FS_createDefaultDirectories',
  'FS_createDefaultDevices',
  'FS_createSpecialDirectories',
  'FS_createStandardStreams',
  'FS_staticInit',
  'FS_init',
  'FS_quit',
  'FS_findObject',
  'FS_analyzePath',
  'FS_createFile',
  'FS_forceLoadFile',
  'FS_absolutePath',
  'FS_createFolder',
  'FS_createLink',
  'FS_joinPath',
  'FS_mmapAlloc',
  'FS_standardizePath',
  'MEMFS',
  'TTY',
  'PIPEFS',
  'SOCKFS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'heapObjectForWebGLType',
  'toTypedArrayIndex',
  'webgl_enable_ANGLE_instanced_arrays',
  'webgl_enable_OES_vertex_array_object',
  'webgl_enable_WEBGL_draw_buffers',
  'webgl_enable_WEBGL_multi_draw',
  'webgl_enable_EXT_polygon_offset_clamp',
  'webgl_enable_EXT_clip_control',
  'webgl_enable_WEBGL_polygon_mode',
  'GL',
  'emscriptenWebGLGet',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  'emscriptenWebGLGetUniform',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  'emscriptenWebGLGetVertexAttrib',
  '__glGetActiveAttribOrUniform',
  'emscriptenWebGLGetBufferBinding',
  'emscriptenWebGLValidateMapBufferTarget',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'SDL',
  'SDL_gfx',
  'emscriptenWebGLGetIndexed',
  'webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance',
  'webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance',
  'allocateUTF8',
  'allocateUTF8OnStack',
  'print',
  'printErr',
  'jstoi_s',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);

  // End runtime exports
  // Begin JS library exports
  // End JS library exports

// end include: postlibrary.js

function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var ASM_CONSTS = {
  304888: ($0, $1, $2, $3, $4) => { if (typeof window === 'undefined' || (window.AudioContext || window.webkitAudioContext) === undefined) { return 0; } if (typeof(window.miniaudio) === 'undefined') { window.miniaudio = { referenceCount: 0 }; window.miniaudio.device_type = {}; window.miniaudio.device_type.playback = $0; window.miniaudio.device_type.capture = $1; window.miniaudio.device_type.duplex = $2; window.miniaudio.device_state = {}; window.miniaudio.device_state.stopped = $3; window.miniaudio.device_state.started = $4; let miniaudio = window.miniaudio; miniaudio.devices = []; miniaudio.track_device = function(device) { for (var iDevice = 0; iDevice < miniaudio.devices.length; ++iDevice) { if (miniaudio.devices[iDevice] == null) { miniaudio.devices[iDevice] = device; return iDevice; } } miniaudio.devices.push(device); return miniaudio.devices.length - 1; }; miniaudio.untrack_device_by_index = function(deviceIndex) { miniaudio.devices[deviceIndex] = null; while (miniaudio.devices.length > 0) { if (miniaudio.devices[miniaudio.devices.length-1] == null) { miniaudio.devices.pop(); } else { break; } } }; miniaudio.untrack_device = function(device) { for (var iDevice = 0; iDevice < miniaudio.devices.length; ++iDevice) { if (miniaudio.devices[iDevice] == device) { return miniaudio.untrack_device_by_index(iDevice); } } }; miniaudio.get_device_by_index = function(deviceIndex) { return miniaudio.devices[deviceIndex]; }; miniaudio.unlock_event_types = (function(){ return ['touchend', 'click']; })(); miniaudio.unlock = function() { for(var i = 0; i < miniaudio.devices.length; ++i) { var device = miniaudio.devices[i]; if (device != null && device.webaudio != null && device.state === miniaudio.device_state.started) { device.webaudio.resume().then(() => { _ma_device__on_notification_unlocked(device.pDevice); }, (error) => {console.error("Failed to resume audiocontext", error); }); } } miniaudio.unlock_event_types.map(function(event_type) { document.removeEventListener(event_type, miniaudio.unlock, true); }); }; miniaudio.unlock_event_types.map(function(event_type) { document.addEventListener(event_type, miniaudio.unlock, true); }); } window.miniaudio.referenceCount += 1; return 1; },  
 307066: () => { if (typeof(window.miniaudio) !== 'undefined') { miniaudio.unlock_event_types.map(function(event_type) { document.removeEventListener(event_type, miniaudio.unlock, true); }); window.miniaudio.referenceCount -= 1; if (window.miniaudio.referenceCount === 0) { delete window.miniaudio; } } },  
 307356: () => { return (navigator.mediaDevices !== undefined && navigator.mediaDevices.getUserMedia !== undefined); },  
 307460: () => { try { var temp = new (window.AudioContext || window.webkitAudioContext)(); var sampleRate = temp.sampleRate; temp.close(); return sampleRate; } catch(e) { return 0; } },  
 307631: ($0, $1, $2, $3, $4, $5) => { var deviceType = $0; var channels = $1; var sampleRate = $2; var bufferSize = $3; var pIntermediaryBuffer = $4; var pDevice = $5; if (typeof(window.miniaudio) === 'undefined') { return -1; } var device = {}; var audioContextOptions = {}; if (deviceType == window.miniaudio.device_type.playback && sampleRate != 0) { audioContextOptions.sampleRate = sampleRate; } device.webaudio = new (window.AudioContext || window.webkitAudioContext)(audioContextOptions); device.webaudio.suspend(); device.state = window.miniaudio.device_state.stopped; var channelCountIn = 0; var channelCountOut = channels; if (deviceType != window.miniaudio.device_type.playback) { channelCountIn = channels; } device.scriptNode = device.webaudio.createScriptProcessor(bufferSize, channelCountIn, channelCountOut); device.scriptNode.onaudioprocess = function(e) { if (device.intermediaryBufferView == null || device.intermediaryBufferView.length == 0) { device.intermediaryBufferView = new Float32Array(HEAPF32.buffer, pIntermediaryBuffer, bufferSize * channels); } if (deviceType == window.miniaudio.device_type.capture || deviceType == window.miniaudio.device_type.duplex) { for (var iChannel = 0; iChannel < channels; iChannel += 1) { var inputBuffer = e.inputBuffer.getChannelData(iChannel); var intermediaryBuffer = device.intermediaryBufferView; for (var iFrame = 0; iFrame < bufferSize; iFrame += 1) { intermediaryBuffer[iFrame*channels + iChannel] = inputBuffer[iFrame]; } } _ma_device_process_pcm_frames_capture__webaudio(pDevice, bufferSize, pIntermediaryBuffer); } if (deviceType == window.miniaudio.device_type.playback || deviceType == window.miniaudio.device_type.duplex) { _ma_device_process_pcm_frames_playback__webaudio(pDevice, bufferSize, pIntermediaryBuffer); for (var iChannel = 0; iChannel < e.outputBuffer.numberOfChannels; ++iChannel) { var outputBuffer = e.outputBuffer.getChannelData(iChannel); var intermediaryBuffer = device.intermediaryBufferView; for (var iFrame = 0; iFrame < bufferSize; iFrame += 1) { outputBuffer[iFrame] = intermediaryBuffer[iFrame*channels + iChannel]; } } } else { for (var iChannel = 0; iChannel < e.outputBuffer.numberOfChannels; ++iChannel) { e.outputBuffer.getChannelData(iChannel).fill(0.0); } } }; if (deviceType == window.miniaudio.device_type.capture || deviceType == window.miniaudio.device_type.duplex) { navigator.mediaDevices.getUserMedia({audio:true, video:false}) .then(function(stream) { device.streamNode = device.webaudio.createMediaStreamSource(stream); device.streamNode.connect(device.scriptNode); device.scriptNode.connect(device.webaudio.destination); }) .catch(function(error) { console.log("Failed to get user media: " + error); }); } if (deviceType == window.miniaudio.device_type.playback) { device.scriptNode.connect(device.webaudio.destination); } device.pDevice = pDevice; return window.miniaudio.track_device(device); },  
 310508: ($0) => { return window.miniaudio.get_device_by_index($0).webaudio.sampleRate; },  
 310581: ($0) => { var device = window.miniaudio.get_device_by_index($0); if (device.scriptNode !== undefined) { device.scriptNode.onaudioprocess = function(e) {}; device.scriptNode.disconnect(); device.scriptNode = undefined; } if (device.streamNode !== undefined) { device.streamNode.disconnect(); device.streamNode = undefined; } device.webaudio.close(); device.webaudio = undefined; device.pDevice = undefined; },  
 310981: ($0) => { window.miniaudio.untrack_device_by_index($0); },  
 311031: ($0) => { var device = window.miniaudio.get_device_by_index($0); device.webaudio.resume(); device.state = window.miniaudio.device_state.started; },  
 311170: ($0) => { var device = window.miniaudio.get_device_by_index($0); device.webaudio.suspend(); device.state = window.miniaudio.device_state.stopped; },  
 311310: ($0) => { var str = UTF8ToString($0) + '\n\n' + 'Abort/Retry/Ignore/AlwaysIgnore? [ariA] :'; var reply = window.prompt(str, "i"); if (reply === null) { reply = "i"; } return reply.length === 1 ? reply.charCodeAt(0) : -1; },  
 311525: () => { if (typeof(Module['SDL3']) === 'undefined') { Module['SDL3'] = {}; } Module['SDL3'].dummy_audio = {}; Module['SDL3'].dummy_audio.timers = []; Module['SDL3'].dummy_audio.timers[0] = undefined; Module['SDL3'].dummy_audio.timers[1] = undefined; },  
 311771: ($0, $1, $2, $3, $4) => { var a = Module['SDL3'].dummy_audio; if (a.timers[$0] !== undefined) { clearInterval(a.timers[$0]); } a.timers[$0] = setInterval(function() { dynCall('vi', $3, [$4]); }, ($1 / $2) * 1000); },  
 311963: ($0) => { var a = Module['SDL3'].dummy_audio; if (a.timers[$0] !== undefined) { clearInterval(a.timers[$0]); } a.timers[$0] = undefined; },  
 312094: ($0) => { var parms = new URLSearchParams(window.location.search); for (const [key, value] of parms) { if (key.startsWith("SDL_")) { var ckey = stringToNewUTF8(key); var cvalue = stringToNewUTF8(value); if ((ckey != 0) && (cvalue != 0)) { dynCall('iiii', $0, [ckey, cvalue, 1]); } _free(ckey); _free(cvalue); } } },  
 312401: () => { if (typeof(AudioContext) !== 'undefined') { return true; } else if (typeof(webkitAudioContext) !== 'undefined') { return true; } return false; },  
 312548: () => { if ((typeof(navigator.mediaDevices) !== 'undefined') && (typeof(navigator.mediaDevices.getUserMedia) !== 'undefined')) { return true; } else if (typeof(navigator.webkitGetUserMedia) !== 'undefined') { return true; } return false; },  
 312782: ($0) => { if (typeof(Module['SDL3']) === 'undefined') { Module['SDL3'] = {}; } var SDL3 = Module['SDL3']; if (!$0) { SDL3.audio_playback = {}; } else { SDL3.audio_recording = {}; } if (!SDL3.audioContext) { if (typeof(AudioContext) !== 'undefined') { SDL3.audioContext = new AudioContext(); } else if (typeof(webkitAudioContext) !== 'undefined') { SDL3.audioContext = new webkitAudioContext(); } if (SDL3.audioContext) { if ((typeof navigator.userActivation) === 'undefined') { autoResumeAudioContext(SDL3.audioContext); } } } return (SDL3.audioContext !== undefined); },  
 313345: () => { return Module['SDL3'].audioContext.sampleRate; },  
 313396: ($0, $1, $2, $3) => { var SDL3 = Module['SDL3']; var have_microphone = function(stream) { if (SDL3.audio_recording.silenceTimer !== undefined) { clearInterval(SDL3.audio_recording.silenceTimer); SDL3.audio_recording.silenceTimer = undefined; SDL3.audio_recording.silenceBuffer = undefined } SDL3.audio_recording.mediaStreamNode = SDL3.audioContext.createMediaStreamSource(stream); SDL3.audio_recording.scriptProcessorNode = SDL3.audioContext.createScriptProcessor($1, $0, 1); SDL3.audio_recording.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) { if ((SDL3 === undefined) || (SDL3.audio_recording === undefined)) { return; } audioProcessingEvent.outputBuffer.getChannelData(0).fill(0.0); SDL3.audio_recording.currentRecordingBuffer = audioProcessingEvent.inputBuffer; dynCall('ip', $2, [$3]); }; SDL3.audio_recording.mediaStreamNode.connect(SDL3.audio_recording.scriptProcessorNode); SDL3.audio_recording.scriptProcessorNode.connect(SDL3.audioContext.destination); SDL3.audio_recording.stream = stream; }; var no_microphone = function(error) { }; SDL3.audio_recording.silenceBuffer = SDL3.audioContext.createBuffer($0, $1, SDL3.audioContext.sampleRate); SDL3.audio_recording.silenceBuffer.getChannelData(0).fill(0.0); var silence_callback = function() { SDL3.audio_recording.currentRecordingBuffer = SDL3.audio_recording.silenceBuffer; dynCall('ip', $2, [$3]); }; SDL3.audio_recording.silenceTimer = setInterval(silence_callback, ($1 / SDL3.audioContext.sampleRate) * 1000); if ((navigator.mediaDevices !== undefined) && (navigator.mediaDevices.getUserMedia !== undefined)) { navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(have_microphone).catch(no_microphone); } else if (navigator.webkitGetUserMedia !== undefined) { navigator.webkitGetUserMedia({ audio: true, video: false }, have_microphone, no_microphone); } },  
 315237: ($0, $1, $2, $3) => { var SDL3 = Module['SDL3']; SDL3.audio_playback.scriptProcessorNode = SDL3.audioContext['createScriptProcessor']($1, 0, $0); SDL3.audio_playback.scriptProcessorNode['onaudioprocess'] = function (e) { if ((SDL3 === undefined) || (SDL3.audio_playback === undefined)) { return; } if (SDL3.audio_playback.silenceTimer !== undefined) { clearInterval(SDL3.audio_playback.silenceTimer); SDL3.audio_playback.silenceTimer = undefined; SDL3.audio_playback.silenceBuffer = undefined; } SDL3.audio_playback.currentPlaybackBuffer = e['outputBuffer']; dynCall('ip', $2, [$3]); }; SDL3.audio_playback.scriptProcessorNode['connect'](SDL3.audioContext['destination']); if (SDL3.audioContext.state === 'suspended') { SDL3.audio_playback.silenceBuffer = SDL3.audioContext.createBuffer($0, $1, SDL3.audioContext.sampleRate); SDL3.audio_playback.silenceBuffer.getChannelData(0).fill(0.0); var silence_callback = function() { if ((typeof navigator.userActivation) !== 'undefined') { if (navigator.userActivation.hasBeenActive) { SDL3.audioContext.resume(); } } SDL3.audio_playback.currentPlaybackBuffer = SDL3.audio_playback.silenceBuffer; dynCall('ip', $2, [$3]); SDL3.audio_playback.currentPlaybackBuffer = undefined; }; SDL3.audio_playback.silenceTimer = setInterval(silence_callback, ($1 / SDL3.audioContext.sampleRate) * 1000); } },  
 316553: ($0) => { var SDL3 = Module['SDL3']; if ($0) { if (SDL3.audio_recording.silenceTimer !== undefined) { clearInterval(SDL3.audio_recording.silenceTimer); } if (SDL3.audio_recording.stream !== undefined) { var tracks = SDL3.audio_recording.stream.getAudioTracks(); for (var i = 0; i < tracks.length; i++) { SDL3.audio_recording.stream.removeTrack(tracks[i]); } } if (SDL3.audio_recording.scriptProcessorNode !== undefined) { SDL3.audio_recording.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {}; SDL3.audio_recording.scriptProcessorNode.disconnect(); } if (SDL3.audio_recording.mediaStreamNode !== undefined) { SDL3.audio_recording.mediaStreamNode.disconnect(); } SDL3.audio_recording = undefined; } else { if (SDL3.audio_playback.scriptProcessorNode != undefined) { SDL3.audio_playback.scriptProcessorNode.disconnect(); } if (SDL3.audio_playback.silenceTimer !== undefined) { clearInterval(SDL3.audio_playback.silenceTimer); } SDL3.audio_playback = undefined; } if ((SDL3.audioContext !== undefined) && (SDL3.audio_playback === undefined) && (SDL3.audio_recording === undefined)) { SDL3.audioContext.close(); SDL3.audioContext = undefined; } },  
 317709: ($0, $1) => { var buf = $0 >>> 2; var SDL3 = Module['SDL3']; var numChannels = SDL3.audio_playback.currentPlaybackBuffer['numberOfChannels']; for (var c = 0; c < numChannels; ++c) { var channelData = SDL3.audio_playback.currentPlaybackBuffer['getChannelData'](c); if (channelData.length != $1) { throw 'Web Audio playback buffer length mismatch! Destination size: ' + channelData.length + ' samples vs expected ' + $1 + ' samples!'; } for (var j = 0; j < $1; ++j) { channelData[j] = HEAPF32[buf + (j*numChannels + c)]; } } },  
 318222: ($0, $1) => { var SDL3 = Module['SDL3']; var numChannels = SDL3.audio_recording.currentRecordingBuffer.numberOfChannels; for (var c = 0; c < numChannels; ++c) { var channelData = SDL3.audio_recording.currentRecordingBuffer.getChannelData(c); if (channelData.length != $1) { throw 'Web Audio recording buffer length mismatch! Destination size: ' + channelData.length + ' samples vs expected ' + $1 + ' samples!'; } if (numChannels == 1) { for (var j = 0; j < $1; ++j) { setValue($0 + (j * 4), channelData[j], 'float'); } } else { for (var j = 0; j < $1; ++j) { setValue($0 + (((j * numChannels) + c) * 4), channelData[j], 'float'); } } } },  
 318849: () => { if (typeof(Module['SDL3']) === 'undefined') { Module['SDL3'] = {}; } Module['SDL3'].camera = {}; },  
 318950: () => { return (navigator.mediaDevices === undefined) ? 0 : 1; },  
 319009: ($0, $1, $2, $3, $4, $5, $6) => { const device = $0; const w = $1; const h = $2; const framerate_numerator = $3; const framerate_denominator = $4; const outcome = $5; const iterate = $6; const constraints = {}; if ((w <= 0) || (h <= 0)) { constraints.video = true; } else { constraints.video = {}; constraints.video.width = w; constraints.video.height = h; } if ((framerate_numerator > 0) && (framerate_denominator > 0)) { var fps = framerate_numerator / framerate_denominator; constraints.video.frameRate = { ideal: fps }; } function grabNextCameraFrame() { const SDL3 = Module['SDL3']; if ((typeof(SDL3) === 'undefined') || (typeof(SDL3.camera) === 'undefined') || (typeof(SDL3.camera.stream) === 'undefined')) { return; } const nextframems = SDL3.camera.next_frame_time; const now = performance.now(); if (now >= nextframems) { dynCall('vi', iterate, [device]); while (SDL3.camera.next_frame_time < now) { SDL3.camera.next_frame_time += SDL3.camera.fpsincrms; } } requestAnimationFrame(grabNextCameraFrame); } navigator.mediaDevices.getUserMedia(constraints) .then((stream) => { const settings = stream.getVideoTracks()[0].getSettings(); const actualw = settings.width; const actualh = settings.height; const actualfps = settings.frameRate; console.log("Camera is opened! Actual spec: (" + actualw + "x" + actualh + "), fps=" + actualfps); if (dynCall('iiiiii', outcome, [device, 1, actualw, actualh, actualfps])) { const video = document.createElement("video"); video.width = actualw; video.height = actualh; video.style.display = 'none'; video.srcObject = stream; const canvas = document.createElement("canvas"); canvas.width = actualw; canvas.height = actualh; canvas.style.display = 'none'; const ctx2d = canvas.getContext('2d'); const SDL3 = Module['SDL3']; SDL3.camera.width = actualw; SDL3.camera.height = actualh; SDL3.camera.fps = actualfps; SDL3.camera.fpsincrms = 1000.0 / actualfps; SDL3.camera.stream = stream; SDL3.camera.video = video; SDL3.camera.canvas = canvas; SDL3.camera.ctx2d = ctx2d; SDL3.camera.next_frame_time = performance.now(); video.play(); video.addEventListener('loadedmetadata', () => { grabNextCameraFrame(); }); } }) .catch((err) => { console.error("Tried to open camera but it threw an error! " + err.name + ": " + err.message); dynCall('iiiiii', outcome, [device, 0, 0, 0, 0]); }); },  
 321300: () => { const SDL3 = Module['SDL3']; if ((typeof(SDL3) === 'undefined') || (typeof(SDL3.camera) === 'undefined') || (typeof(SDL3.camera.stream) === 'undefined')) { return; } SDL3.camera.stream.getTracks().forEach(track => track.stop()); SDL3.camera = {}; },  
 321551: ($0, $1, $2) => { const w = $0; const h = $1; const rgba = $2; const SDL3 = Module['SDL3']; if ((typeof(SDL3) === 'undefined') || (typeof(SDL3.camera) === 'undefined') || (typeof(SDL3.camera.ctx2d) === 'undefined')) { return 0; } SDL3.camera.ctx2d.drawImage(SDL3.camera.video, 0, 0, w, h); const imgrgba = SDL3.camera.ctx2d.getImageData(0, 0, w, h).data; Module.HEAPU8.set(imgrgba, rgba); return 1; },  
 321936: () => { if (typeof(Module['SDL3']) !== 'undefined') { Module['SDL3'].camera = undefined; } },  
 322023: ($0, $1, $2, $3) => { var w = $0; var h = $1; var pixels = $2; var canvasId = UTF8ToString($3); var canvas = document.querySelector(canvasId); if (!Module['SDL3']) Module['SDL3'] = {}; var SDL3 = Module['SDL3']; if (SDL3.ctxCanvas !== canvas) { SDL3.ctx = Browser.createContext(canvas, false, true); SDL3.ctxCanvas = canvas; } if (SDL3.w !== w || SDL3.h !== h || SDL3.imageCtx !== SDL3.ctx) { SDL3.image = SDL3.ctx.createImageData(w, h); SDL3.w = w; SDL3.h = h; SDL3.imageCtx = SDL3.ctx; } var data = SDL3.image.data; var src = pixels / 4; var dst = 0; var num; if (SDL3.data32Data !== data) { SDL3.data32 = new Int32Array(data.buffer); SDL3.data8 = new Uint8Array(data.buffer); SDL3.data32Data = data; } var data32 = SDL3.data32; num = data32.length; data32.set(HEAP32.subarray(src, src + num)); var data8 = SDL3.data8; var i = 3; var j = i + 4*num; if (num % 8 == 0) { while (i < j) { data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; data8[i] = 0xff; i = i + 4 | 0; } } else { while (i < j) { data8[i] = 0xff; i = i + 4 | 0; } } SDL3.ctx.putImageData(SDL3.image, 0, 0); },  
 323252: () => { if (!Module['SDL3']) { Module['SDL3'] = {}; } var SDL3 = Module['SDL3']; SDL3['mouse_x'] = 0; SDL3['mouse_y'] = 0; SDL3['mouse_buttons'] = []; for (var i = 0; i < 5; ++i) { SDL3['mouse_buttons'][i] = false; } document.addEventListener('mousemove', function(e) { var SDL3 = Module['SDL3']; SDL3['mouse_x'] = e.clientX; SDL3['mouse_y'] = e.clientY; }); document.addEventListener('mousedown', function(e) { var SDL3 = Module['SDL3']; if (0 <= e.button && e.button < SDL3['mouse_buttons'].length) { SDL3['mouse_buttons'][e.button] = true; } }); document.addEventListener('mouseup', function(e) { var SDL3 = Module['SDL3']; if (0 <= e.button && e.button < SDL3['mouse_buttons'].length) { SDL3['mouse_buttons'][e.button] = false; } }); },  
 323986: ($0, $1, $2, $3, $4) => { var w = $0; var h = $1; var hot_x = $2; var hot_y = $3; var pixels = $4; var canvas = document.createElement("canvas"); canvas.width = w; canvas.height = h; var ctx = canvas.getContext("2d"); var image = ctx.createImageData(w, h); var data = image.data; var src = pixels / 4; var data32 = new Int32Array(data.buffer); data32.set(HEAP32.subarray(src, src + data32.length)); ctx.putImageData(image, 0, 0); var url = hot_x === 0 && hot_y === 0 ? "url(" + canvas.toDataURL() + "), auto" : "url(" + canvas.toDataURL() + ") " + hot_x + " " + hot_y + ", auto"; var urlBuf = _SDL_malloc(url.length + 1); stringToUTF8(url, urlBuf, url.length + 1); return urlBuf; },  
 324644: ($0) => { if (Module['canvas']) { Module['canvas'].style['cursor'] = UTF8ToString($0); } },  
 324727: () => { if (Module['canvas']) { Module['canvas'].style['cursor'] = 'none'; } },  
 324796: () => { return Module['SDL3']['mouse_x']; },  
 324834: () => { return Module['SDL3']['mouse_y']; },  
 324872: ($0) => { return Module['SDL3']['mouse_buttons'][$0]; },  
 324920: ($0) => { var id = UTF8ToString($0); try { var canvas = document.querySelector(id); if (canvas) { return canvas === document.activeElement; } } catch (e) { } return false; },  
 325086: ($0, $1, $2) => { var target = document.querySelector(UTF8ToString($1)); if (target) { var data = $0; if (typeof(Module['SDL3']) === 'undefined') { Module['SDL3'] = {}; } var SDL3 = Module['SDL3']; var makePointerEventCStruct = function(event) { var ptr = 0; if (event.pointerType == "pen") { ptr = _SDL_malloc($2); if (ptr != 0) { var rect = target.getBoundingClientRect(); var idx = ptr >> 2; HEAP32[idx++] = event.pointerId; HEAP32[idx++] = (typeof(event.button) !== "undefined") ? event.button : -1; HEAP32[idx++] = event.buttons; HEAPF32[idx++] = event.movementX; HEAPF32[idx++] = event.movementY; HEAPF32[idx++] = event.clientX - rect.left; HEAPF32[idx++] = event.clientY - rect.top; HEAPF32[idx++] = event.pressure; HEAPF32[idx++] = event.tangentialPressure; HEAPF32[idx++] = event.tiltX; HEAPF32[idx++] = event.tiltY; HEAPF32[idx++] = event.twist; } } return ptr; }; SDL3.eventHandlerPointerEnter = function(event) { var d = makePointerEventCStruct(event); if (d != 0) { _Emscripten_HandlePointerEnter(data, d); _SDL_free(d); } }; target.addEventListener("pointerenter", SDL3.eventHandlerPointerEnter); SDL3.eventHandlerPointerLeave = function(event) { var d = makePointerEventCStruct(event); if (d != 0) { _Emscripten_HandlePointerLeave(data, d); _SDL_free(d); } }; target.addEventListener("pointerleave", SDL3.eventHandlerPointerLeave); target.addEventListener("pointercancel", SDL3.eventHandlerPointerLeave); SDL3.eventHandlerPointerGeneric = function(event) { var d = makePointerEventCStruct(event); if (d != 0) { _Emscripten_HandlePointerGeneric(data, d); _SDL_free(d); } }; target.addEventListener("pointerdown", SDL3.eventHandlerPointerGeneric); target.addEventListener("pointerup", SDL3.eventHandlerPointerGeneric); target.addEventListener("pointermove", SDL3.eventHandlerPointerGeneric); } },  
 326879: ($0, $1, $2) => { var target = document.querySelector(UTF8ToString($1)); if (target) { var data = $0; if (typeof(Module['SDL3']) === 'undefined') { Module['SDL3'] = {}; } var SDL3 = Module['SDL3']; var makeDropEventCStruct = function(event) { var ptr = 0; ptr = _SDL_malloc($2); if (ptr != 0) { var idx = ptr >> 2; var rect = target.getBoundingClientRect(); HEAP32[idx++] = event.clientX - rect.left; HEAP32[idx++] = event.clientY - rect.top; } return ptr; }; SDL3.eventHandlerDropDragover = function(event) { event.preventDefault(); var d = makeDropEventCStruct(event); if (d != 0) { _Emscripten_SendDragEvent(data, d); _SDL_free(d); } }; target.addEventListener("dragover", SDL3.eventHandlerDropDragover); SDL3.drop_count = 0; FS.mkdir("/tmp/filedrop"); SDL3.eventHandlerDropDrop = function(event) { event.preventDefault(); if (event.dataTransfer.types.includes("text/plain")) { let plain_text = stringToNewUTF8(event.dataTransfer.getData("text/plain")); _Emscripten_SendDragTextEvent(data, plain_text); _free(plain_text); } else if (event.dataTransfer.types.includes("Files")) { for (let i = 0; i < event.dataTransfer.files.length; i++) { const file = event.dataTransfer.files.item(i); const file_reader = new FileReader(); file_reader.readAsArrayBuffer(file); file_reader.onload = function(event) { const fs_dropdir = `/tmp/filedrop/${SDL3.drop_count}`; SDL3.drop_count += 1; const fs_filepath = `${fs_dropdir}/${file.name}`; const c_fs_filepath = stringToNewUTF8(fs_filepath); const contents_array8 = new Uint8Array(event.target.result); FS.mkdir(fs_dropdir); var stream = FS.open(fs_filepath, "w"); FS.write(stream, contents_array8, 0, contents_array8.length, 0); FS.close(stream); _Emscripten_SendDragFileEvent(data, c_fs_filepath); _free(c_fs_filepath); _Emscripten_SendDragCompleteEvent(data); }; } } _Emscripten_SendDragCompleteEvent(data); }; target.addEventListener("drop", SDL3.eventHandlerDropDrop); SDL3.eventHandlerDropDragend = function(event) { event.preventDefault(); _Emscripten_SendDragCompleteEvent(data); }; target.addEventListener("dragend", SDL3.eventHandlerDropDragend); target.addEventListener("dragleave", SDL3.eventHandlerDropDragend); } },  
 329032: ($0) => { var target = document.querySelector(UTF8ToString($0)); if (target) { var SDL3 = Module['SDL3']; target.removeEventListener("dragleave", SDL3.eventHandlerDropDragend); target.removeEventListener("dragend", SDL3.eventHandlerDropDragend); target.removeEventListener("drop", SDL3.eventHandlerDropDrop); SDL3.drop_count = undefined; function recursive_remove(dirpath) { FS.readdir(dirpath).forEach((filename) => { const p = `${dirpath}/${filename}`; const p_s = FS.stat(p); if (FS.isFile(p_s.mode)) { FS.unlink(p); } else if (FS.isDir(p)) { recursive_remove(p); } }); FS.rmdir(dirpath); }("/tmp/filedrop"); FS.rmdir("/tmp/filedrop"); target.removeEventListener("dragover", SDL3.eventHandlerDropDragover); SDL3.eventHandlerDropDragover = undefined; SDL3.eventHandlerDropDrop = undefined; SDL3.eventHandlerDropDragend = undefined; } },  
 329862: ($0) => { var target = document.querySelector(UTF8ToString($0)); if (target) { var SDL3 = Module['SDL3']; target.removeEventListener("pointerenter", SDL3.eventHandlerPointerEnter); target.removeEventListener("pointerleave", SDL3.eventHandlerPointerLeave); target.removeEventListener("pointercancel", SDL3.eventHandlerPointerLeave); target.removeEventListener("pointerdown", SDL3.eventHandlerPointerGeneric); target.removeEventListener("pointerup", SDL3.eventHandlerPointerGeneric); target.removeEventListener("pointermove", SDL3.eventHandlerPointerGeneric); SDL3.eventHandlerPointerEnter = undefined; SDL3.eventHandlerPointerLeave = undefined; SDL3.eventHandlerPointerGeneric = undefined; } },  
 330547: () => { if (!window.matchMedia) { return -1; } if (window.matchMedia('(prefers-color-scheme: light)').matches) { return 0; } if (window.matchMedia('(prefers-color-scheme: dark)').matches) { return 1; } return -1; },  
 330756: () => { if (typeof(Module['SDL3']) !== 'undefined') { var SDL3 = Module['SDL3']; SDL3.themeChangedMatchMedia.removeEventListener('change', SDL3.eventHandlerThemeChanged); SDL3.themeChangedMatchMedia = undefined; SDL3.eventHandlerThemeChanged = undefined; } },  
 331009: () => { return window.innerWidth; },  
 331039: () => { return window.innerHeight; },  
 331070: ($0) => { Module['requestFullscreen'] = function(lockPointer, resizeCanvas) { _requestFullscreenThroughSDL($0); }; },  
 331179: () => { Module['requestFullscreen'] = function(lockPointer, resizeCanvas) {}; },  
 331253: () => { if (window.matchMedia) { if (typeof(Module['SDL3']) === 'undefined') { Module['SDL3'] = {}; } var SDL3 = Module['SDL3']; SDL3.eventHandlerThemeChanged = function(event) { _Emscripten_SendSystemThemeChangedEvent(); }; SDL3.themeChangedMatchMedia = window.matchMedia('(prefers-color-scheme: dark)'); SDL3.themeChangedMatchMedia.addEventListener('change', SDL3.eventHandlerThemeChanged); } },  
 331644: ($0, $1, $2, $3, $4) => { var title = UTF8ToString($0); var message = UTF8ToString($1); var background = UTF8ToString($2); var color = UTF8ToString($3); var id = UTF8ToString($4); var dialog = document.createElement("dialog"); dialog.classList.add("SDL3_messagebox"); dialog.id = id; dialog.style.color = color; dialog.style.backgroundColor = background; document.body.append(dialog); var h1 = document.createElement("h1"); h1.innerText = title; dialog.append(h1); var p = document.createElement("p"); p.innerText = message; dialog.append(p); dialog.showModal(); },  
 332185: ($0, $1, $2, $3, $4, $5, $6, $7) => { var dialog_id = UTF8ToString($0); var text = UTF8ToString($1); var responseId = $2; var clickOnReturn = $3; var clickOnEscape = $4; var border = UTF8ToString($5); var background = UTF8ToString($6); var hovered = UTF8ToString($7); var dialog = document.getElementById(dialog_id); if (!dialog) { return false; } var button = document.createElement("button"); button.innerText = text; button.style.borderColor = border; button.style.backgroundColor = background; dialog.addEventListener('keydown', function(e) { if (clickOnReturn && e.key === "Enter") { e.preventDefault(); button.click(); } else if (clickOnEscape && e.key === "Escape") { e.preventDefault(); button.click(); } }); dialog.addEventListener('cancel', function(e){ e.preventDefault(); }); button.onmouseenter = function(e){ button.style.backgroundColor = hovered; }; button.onmouseleave = function(e){ button.style.backgroundColor = background; }; button.onclick = function(e) { dialog.close(responseId); }; dialog.append(button); return true; },  
 333194: ($0) => { var dialog_id = UTF8ToString($0); var dialog = document.getElementById(dialog_id); if (!dialog) { return false; } return dialog.open; },  
 333332: ($0) => { var dialog_id = UTF8ToString($0); var dialog = document.getElementById(dialog_id); if (!dialog) { return 0; } try { return parseInt(dialog.returnValue); } catch(e) { return 0; } },  
 333514: ($0, $1) => { alert(UTF8ToString($0) + "\n\n" + UTF8ToString($1)); },  
 333571: ($0) => { window.open(UTF8ToString($0), "_blank") }
};

// Imports from the Wasm binary.
var _ma_device__on_notification_unlocked = Module['_ma_device__on_notification_unlocked'] = makeInvalidEarlyAccess('_ma_device__on_notification_unlocked');
var _ma_malloc_emscripten = Module['_ma_malloc_emscripten'] = makeInvalidEarlyAccess('_ma_malloc_emscripten');
var _ma_free_emscripten = Module['_ma_free_emscripten'] = makeInvalidEarlyAccess('_ma_free_emscripten');
var _ma_device_process_pcm_frames_capture__webaudio = Module['_ma_device_process_pcm_frames_capture__webaudio'] = makeInvalidEarlyAccess('_ma_device_process_pcm_frames_capture__webaudio');
var _ma_device_process_pcm_frames_playback__webaudio = Module['_ma_device_process_pcm_frames_playback__webaudio'] = makeInvalidEarlyAccess('_ma_device_process_pcm_frames_playback__webaudio');
var _malloc = makeInvalidEarlyAccess('_malloc');
var _free = makeInvalidEarlyAccess('_free');
var _main = Module['_main'] = makeInvalidEarlyAccess('_main');
var _SDL_free = Module['_SDL_free'] = makeInvalidEarlyAccess('_SDL_free');
var _SDL_malloc = Module['_SDL_malloc'] = makeInvalidEarlyAccess('_SDL_malloc');
var _SDL_calloc = Module['_SDL_calloc'] = makeInvalidEarlyAccess('_SDL_calloc');
var _SDL_realloc = Module['_SDL_realloc'] = makeInvalidEarlyAccess('_SDL_realloc');
var _strerror = makeInvalidEarlyAccess('_strerror');
var _fflush = makeInvalidEarlyAccess('_fflush');
var _Emscripten_HandlePointerEnter = Module['_Emscripten_HandlePointerEnter'] = makeInvalidEarlyAccess('_Emscripten_HandlePointerEnter');
var _Emscripten_HandlePointerLeave = Module['_Emscripten_HandlePointerLeave'] = makeInvalidEarlyAccess('_Emscripten_HandlePointerLeave');
var _Emscripten_HandlePointerGeneric = Module['_Emscripten_HandlePointerGeneric'] = makeInvalidEarlyAccess('_Emscripten_HandlePointerGeneric');
var _Emscripten_SendDragEvent = Module['_Emscripten_SendDragEvent'] = makeInvalidEarlyAccess('_Emscripten_SendDragEvent');
var _Emscripten_SendDragCompleteEvent = Module['_Emscripten_SendDragCompleteEvent'] = makeInvalidEarlyAccess('_Emscripten_SendDragCompleteEvent');
var _Emscripten_SendDragTextEvent = Module['_Emscripten_SendDragTextEvent'] = makeInvalidEarlyAccess('_Emscripten_SendDragTextEvent');
var _Emscripten_SendDragFileEvent = Module['_Emscripten_SendDragFileEvent'] = makeInvalidEarlyAccess('_Emscripten_SendDragFileEvent');
var _Emscripten_SendSystemThemeChangedEvent = Module['_Emscripten_SendSystemThemeChangedEvent'] = makeInvalidEarlyAccess('_Emscripten_SendSystemThemeChangedEvent');
var _requestFullscreenThroughSDL = Module['_requestFullscreenThroughSDL'] = makeInvalidEarlyAccess('_requestFullscreenThroughSDL');
var _emscripten_stack_get_end = makeInvalidEarlyAccess('_emscripten_stack_get_end');
var _emscripten_stack_get_base = makeInvalidEarlyAccess('_emscripten_stack_get_base');
var _emscripten_stack_init = makeInvalidEarlyAccess('_emscripten_stack_init');
var _emscripten_stack_get_free = makeInvalidEarlyAccess('_emscripten_stack_get_free');
var __emscripten_stack_restore = makeInvalidEarlyAccess('__emscripten_stack_restore');
var __emscripten_stack_alloc = makeInvalidEarlyAccess('__emscripten_stack_alloc');
var _emscripten_stack_get_current = makeInvalidEarlyAccess('_emscripten_stack_get_current');

function assignWasmExports(wasmExports) {
  Module['_ma_device__on_notification_unlocked'] = _ma_device__on_notification_unlocked = createExportWrapper('ma_device__on_notification_unlocked', 1);
  Module['_ma_malloc_emscripten'] = _ma_malloc_emscripten = createExportWrapper('ma_malloc_emscripten', 2);
  Module['_ma_free_emscripten'] = _ma_free_emscripten = createExportWrapper('ma_free_emscripten', 2);
  Module['_ma_device_process_pcm_frames_capture__webaudio'] = _ma_device_process_pcm_frames_capture__webaudio = createExportWrapper('ma_device_process_pcm_frames_capture__webaudio', 3);
  Module['_ma_device_process_pcm_frames_playback__webaudio'] = _ma_device_process_pcm_frames_playback__webaudio = createExportWrapper('ma_device_process_pcm_frames_playback__webaudio', 3);
  _malloc = createExportWrapper('malloc', 1);
  _free = createExportWrapper('free', 1);
  Module['_main'] = _main = createExportWrapper('__main_argc_argv', 2);
  Module['_SDL_free'] = _SDL_free = createExportWrapper('SDL_free', 1);
  Module['_SDL_malloc'] = _SDL_malloc = createExportWrapper('SDL_malloc', 1);
  Module['_SDL_calloc'] = _SDL_calloc = createExportWrapper('SDL_calloc', 2);
  Module['_SDL_realloc'] = _SDL_realloc = createExportWrapper('SDL_realloc', 2);
  _strerror = createExportWrapper('strerror', 1);
  _fflush = createExportWrapper('fflush', 1);
  Module['_Emscripten_HandlePointerEnter'] = _Emscripten_HandlePointerEnter = createExportWrapper('Emscripten_HandlePointerEnter', 2);
  Module['_Emscripten_HandlePointerLeave'] = _Emscripten_HandlePointerLeave = createExportWrapper('Emscripten_HandlePointerLeave', 2);
  Module['_Emscripten_HandlePointerGeneric'] = _Emscripten_HandlePointerGeneric = createExportWrapper('Emscripten_HandlePointerGeneric', 2);
  Module['_Emscripten_SendDragEvent'] = _Emscripten_SendDragEvent = createExportWrapper('Emscripten_SendDragEvent', 2);
  Module['_Emscripten_SendDragCompleteEvent'] = _Emscripten_SendDragCompleteEvent = createExportWrapper('Emscripten_SendDragCompleteEvent', 1);
  Module['_Emscripten_SendDragTextEvent'] = _Emscripten_SendDragTextEvent = createExportWrapper('Emscripten_SendDragTextEvent', 2);
  Module['_Emscripten_SendDragFileEvent'] = _Emscripten_SendDragFileEvent = createExportWrapper('Emscripten_SendDragFileEvent', 2);
  Module['_Emscripten_SendSystemThemeChangedEvent'] = _Emscripten_SendSystemThemeChangedEvent = createExportWrapper('Emscripten_SendSystemThemeChangedEvent', 0);
  Module['_requestFullscreenThroughSDL'] = _requestFullscreenThroughSDL = createExportWrapper('requestFullscreenThroughSDL', 1);
  _emscripten_stack_get_end = wasmExports['emscripten_stack_get_end'];
  _emscripten_stack_get_base = wasmExports['emscripten_stack_get_base'];
  _emscripten_stack_init = wasmExports['emscripten_stack_init'];
  _emscripten_stack_get_free = wasmExports['emscripten_stack_get_free'];
  __emscripten_stack_restore = wasmExports['_emscripten_stack_restore'];
  __emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'];
  _emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'];
}
var wasmImports = {
  /** @export */
  __assert_fail: ___assert_fail,
  /** @export */
  __cxa_throw: ___cxa_throw,
  /** @export */
  __syscall_fcntl64: ___syscall_fcntl64,
  /** @export */
  __syscall_fdatasync: ___syscall_fdatasync,
  /** @export */
  __syscall_fstat64: ___syscall_fstat64,
  /** @export */
  __syscall_ioctl: ___syscall_ioctl,
  /** @export */
  __syscall_lstat64: ___syscall_lstat64,
  /** @export */
  __syscall_newfstatat: ___syscall_newfstatat,
  /** @export */
  __syscall_openat: ___syscall_openat,
  /** @export */
  __syscall_stat64: ___syscall_stat64,
  /** @export */
  _abort_js: __abort_js,
  /** @export */
  _gmtime_js: __gmtime_js,
  /** @export */
  _localtime_js: __localtime_js,
  /** @export */
  _mktime_js: __mktime_js,
  /** @export */
  _timegm_js: __timegm_js,
  /** @export */
  _tzset_js: __tzset_js,
  /** @export */
  clock_time_get: _clock_time_get,
  /** @export */
  emscripten_asm_const_double_sync_on_main_thread: _emscripten_asm_const_double_sync_on_main_thread,
  /** @export */
  emscripten_asm_const_int: _emscripten_asm_const_int,
  /** @export */
  emscripten_asm_const_int_sync_on_main_thread: _emscripten_asm_const_int_sync_on_main_thread,
  /** @export */
  emscripten_asm_const_ptr_sync_on_main_thread: _emscripten_asm_const_ptr_sync_on_main_thread,
  /** @export */
  emscripten_cancel_main_loop: _emscripten_cancel_main_loop,
  /** @export */
  emscripten_date_now: _emscripten_date_now,
  /** @export */
  emscripten_err: _emscripten_err,
  /** @export */
  emscripten_exit_fullscreen: _emscripten_exit_fullscreen,
  /** @export */
  emscripten_exit_pointerlock: _emscripten_exit_pointerlock,
  /** @export */
  emscripten_force_exit: _emscripten_force_exit,
  /** @export */
  emscripten_get_device_pixel_ratio: _emscripten_get_device_pixel_ratio,
  /** @export */
  emscripten_get_element_css_size: _emscripten_get_element_css_size,
  /** @export */
  emscripten_get_gamepad_status: _emscripten_get_gamepad_status,
  /** @export */
  emscripten_get_main_loop_timing: _emscripten_get_main_loop_timing,
  /** @export */
  emscripten_get_now: _emscripten_get_now,
  /** @export */
  emscripten_get_num_gamepads: _emscripten_get_num_gamepads,
  /** @export */
  emscripten_get_screen_size: _emscripten_get_screen_size,
  /** @export */
  emscripten_glActiveTexture: _emscripten_glActiveTexture,
  /** @export */
  emscripten_glAttachShader: _emscripten_glAttachShader,
  /** @export */
  emscripten_glBeginQuery: _emscripten_glBeginQuery,
  /** @export */
  emscripten_glBeginQueryEXT: _emscripten_glBeginQueryEXT,
  /** @export */
  emscripten_glBeginTransformFeedback: _emscripten_glBeginTransformFeedback,
  /** @export */
  emscripten_glBindAttribLocation: _emscripten_glBindAttribLocation,
  /** @export */
  emscripten_glBindBuffer: _emscripten_glBindBuffer,
  /** @export */
  emscripten_glBindBufferBase: _emscripten_glBindBufferBase,
  /** @export */
  emscripten_glBindBufferRange: _emscripten_glBindBufferRange,
  /** @export */
  emscripten_glBindFramebuffer: _emscripten_glBindFramebuffer,
  /** @export */
  emscripten_glBindRenderbuffer: _emscripten_glBindRenderbuffer,
  /** @export */
  emscripten_glBindSampler: _emscripten_glBindSampler,
  /** @export */
  emscripten_glBindTexture: _emscripten_glBindTexture,
  /** @export */
  emscripten_glBindTransformFeedback: _emscripten_glBindTransformFeedback,
  /** @export */
  emscripten_glBindVertexArray: _emscripten_glBindVertexArray,
  /** @export */
  emscripten_glBindVertexArrayOES: _emscripten_glBindVertexArrayOES,
  /** @export */
  emscripten_glBlendColor: _emscripten_glBlendColor,
  /** @export */
  emscripten_glBlendEquation: _emscripten_glBlendEquation,
  /** @export */
  emscripten_glBlendEquationSeparate: _emscripten_glBlendEquationSeparate,
  /** @export */
  emscripten_glBlendFunc: _emscripten_glBlendFunc,
  /** @export */
  emscripten_glBlendFuncSeparate: _emscripten_glBlendFuncSeparate,
  /** @export */
  emscripten_glBlitFramebuffer: _emscripten_glBlitFramebuffer,
  /** @export */
  emscripten_glBufferData: _emscripten_glBufferData,
  /** @export */
  emscripten_glBufferSubData: _emscripten_glBufferSubData,
  /** @export */
  emscripten_glCheckFramebufferStatus: _emscripten_glCheckFramebufferStatus,
  /** @export */
  emscripten_glClear: _emscripten_glClear,
  /** @export */
  emscripten_glClearBufferfi: _emscripten_glClearBufferfi,
  /** @export */
  emscripten_glClearBufferfv: _emscripten_glClearBufferfv,
  /** @export */
  emscripten_glClearBufferiv: _emscripten_glClearBufferiv,
  /** @export */
  emscripten_glClearBufferuiv: _emscripten_glClearBufferuiv,
  /** @export */
  emscripten_glClearColor: _emscripten_glClearColor,
  /** @export */
  emscripten_glClearDepthf: _emscripten_glClearDepthf,
  /** @export */
  emscripten_glClearStencil: _emscripten_glClearStencil,
  /** @export */
  emscripten_glClientWaitSync: _emscripten_glClientWaitSync,
  /** @export */
  emscripten_glClipControlEXT: _emscripten_glClipControlEXT,
  /** @export */
  emscripten_glColorMask: _emscripten_glColorMask,
  /** @export */
  emscripten_glCompileShader: _emscripten_glCompileShader,
  /** @export */
  emscripten_glCompressedTexImage2D: _emscripten_glCompressedTexImage2D,
  /** @export */
  emscripten_glCompressedTexImage3D: _emscripten_glCompressedTexImage3D,
  /** @export */
  emscripten_glCompressedTexSubImage2D: _emscripten_glCompressedTexSubImage2D,
  /** @export */
  emscripten_glCompressedTexSubImage3D: _emscripten_glCompressedTexSubImage3D,
  /** @export */
  emscripten_glCopyBufferSubData: _emscripten_glCopyBufferSubData,
  /** @export */
  emscripten_glCopyTexImage2D: _emscripten_glCopyTexImage2D,
  /** @export */
  emscripten_glCopyTexSubImage2D: _emscripten_glCopyTexSubImage2D,
  /** @export */
  emscripten_glCopyTexSubImage3D: _emscripten_glCopyTexSubImage3D,
  /** @export */
  emscripten_glCreateProgram: _emscripten_glCreateProgram,
  /** @export */
  emscripten_glCreateShader: _emscripten_glCreateShader,
  /** @export */
  emscripten_glCullFace: _emscripten_glCullFace,
  /** @export */
  emscripten_glDeleteBuffers: _emscripten_glDeleteBuffers,
  /** @export */
  emscripten_glDeleteFramebuffers: _emscripten_glDeleteFramebuffers,
  /** @export */
  emscripten_glDeleteProgram: _emscripten_glDeleteProgram,
  /** @export */
  emscripten_glDeleteQueries: _emscripten_glDeleteQueries,
  /** @export */
  emscripten_glDeleteQueriesEXT: _emscripten_glDeleteQueriesEXT,
  /** @export */
  emscripten_glDeleteRenderbuffers: _emscripten_glDeleteRenderbuffers,
  /** @export */
  emscripten_glDeleteSamplers: _emscripten_glDeleteSamplers,
  /** @export */
  emscripten_glDeleteShader: _emscripten_glDeleteShader,
  /** @export */
  emscripten_glDeleteSync: _emscripten_glDeleteSync,
  /** @export */
  emscripten_glDeleteTextures: _emscripten_glDeleteTextures,
  /** @export */
  emscripten_glDeleteTransformFeedbacks: _emscripten_glDeleteTransformFeedbacks,
  /** @export */
  emscripten_glDeleteVertexArrays: _emscripten_glDeleteVertexArrays,
  /** @export */
  emscripten_glDeleteVertexArraysOES: _emscripten_glDeleteVertexArraysOES,
  /** @export */
  emscripten_glDepthFunc: _emscripten_glDepthFunc,
  /** @export */
  emscripten_glDepthMask: _emscripten_glDepthMask,
  /** @export */
  emscripten_glDepthRangef: _emscripten_glDepthRangef,
  /** @export */
  emscripten_glDetachShader: _emscripten_glDetachShader,
  /** @export */
  emscripten_glDisable: _emscripten_glDisable,
  /** @export */
  emscripten_glDisableVertexAttribArray: _emscripten_glDisableVertexAttribArray,
  /** @export */
  emscripten_glDrawArrays: _emscripten_glDrawArrays,
  /** @export */
  emscripten_glDrawArraysInstanced: _emscripten_glDrawArraysInstanced,
  /** @export */
  emscripten_glDrawArraysInstancedANGLE: _emscripten_glDrawArraysInstancedANGLE,
  /** @export */
  emscripten_glDrawArraysInstancedARB: _emscripten_glDrawArraysInstancedARB,
  /** @export */
  emscripten_glDrawArraysInstancedEXT: _emscripten_glDrawArraysInstancedEXT,
  /** @export */
  emscripten_glDrawArraysInstancedNV: _emscripten_glDrawArraysInstancedNV,
  /** @export */
  emscripten_glDrawBuffers: _emscripten_glDrawBuffers,
  /** @export */
  emscripten_glDrawBuffersEXT: _emscripten_glDrawBuffersEXT,
  /** @export */
  emscripten_glDrawBuffersWEBGL: _emscripten_glDrawBuffersWEBGL,
  /** @export */
  emscripten_glDrawElements: _emscripten_glDrawElements,
  /** @export */
  emscripten_glDrawElementsInstanced: _emscripten_glDrawElementsInstanced,
  /** @export */
  emscripten_glDrawElementsInstancedANGLE: _emscripten_glDrawElementsInstancedANGLE,
  /** @export */
  emscripten_glDrawElementsInstancedARB: _emscripten_glDrawElementsInstancedARB,
  /** @export */
  emscripten_glDrawElementsInstancedEXT: _emscripten_glDrawElementsInstancedEXT,
  /** @export */
  emscripten_glDrawElementsInstancedNV: _emscripten_glDrawElementsInstancedNV,
  /** @export */
  emscripten_glDrawRangeElements: _emscripten_glDrawRangeElements,
  /** @export */
  emscripten_glEnable: _emscripten_glEnable,
  /** @export */
  emscripten_glEnableVertexAttribArray: _emscripten_glEnableVertexAttribArray,
  /** @export */
  emscripten_glEndQuery: _emscripten_glEndQuery,
  /** @export */
  emscripten_glEndQueryEXT: _emscripten_glEndQueryEXT,
  /** @export */
  emscripten_glEndTransformFeedback: _emscripten_glEndTransformFeedback,
  /** @export */
  emscripten_glFenceSync: _emscripten_glFenceSync,
  /** @export */
  emscripten_glFinish: _emscripten_glFinish,
  /** @export */
  emscripten_glFlush: _emscripten_glFlush,
  /** @export */
  emscripten_glFlushMappedBufferRange: _emscripten_glFlushMappedBufferRange,
  /** @export */
  emscripten_glFramebufferRenderbuffer: _emscripten_glFramebufferRenderbuffer,
  /** @export */
  emscripten_glFramebufferTexture2D: _emscripten_glFramebufferTexture2D,
  /** @export */
  emscripten_glFramebufferTextureLayer: _emscripten_glFramebufferTextureLayer,
  /** @export */
  emscripten_glFrontFace: _emscripten_glFrontFace,
  /** @export */
  emscripten_glGenBuffers: _emscripten_glGenBuffers,
  /** @export */
  emscripten_glGenFramebuffers: _emscripten_glGenFramebuffers,
  /** @export */
  emscripten_glGenQueries: _emscripten_glGenQueries,
  /** @export */
  emscripten_glGenQueriesEXT: _emscripten_glGenQueriesEXT,
  /** @export */
  emscripten_glGenRenderbuffers: _emscripten_glGenRenderbuffers,
  /** @export */
  emscripten_glGenSamplers: _emscripten_glGenSamplers,
  /** @export */
  emscripten_glGenTextures: _emscripten_glGenTextures,
  /** @export */
  emscripten_glGenTransformFeedbacks: _emscripten_glGenTransformFeedbacks,
  /** @export */
  emscripten_glGenVertexArrays: _emscripten_glGenVertexArrays,
  /** @export */
  emscripten_glGenVertexArraysOES: _emscripten_glGenVertexArraysOES,
  /** @export */
  emscripten_glGenerateMipmap: _emscripten_glGenerateMipmap,
  /** @export */
  emscripten_glGetActiveAttrib: _emscripten_glGetActiveAttrib,
  /** @export */
  emscripten_glGetActiveUniform: _emscripten_glGetActiveUniform,
  /** @export */
  emscripten_glGetActiveUniformBlockName: _emscripten_glGetActiveUniformBlockName,
  /** @export */
  emscripten_glGetActiveUniformBlockiv: _emscripten_glGetActiveUniformBlockiv,
  /** @export */
  emscripten_glGetActiveUniformsiv: _emscripten_glGetActiveUniformsiv,
  /** @export */
  emscripten_glGetAttachedShaders: _emscripten_glGetAttachedShaders,
  /** @export */
  emscripten_glGetAttribLocation: _emscripten_glGetAttribLocation,
  /** @export */
  emscripten_glGetBooleanv: _emscripten_glGetBooleanv,
  /** @export */
  emscripten_glGetBufferParameteri64v: _emscripten_glGetBufferParameteri64v,
  /** @export */
  emscripten_glGetBufferParameteriv: _emscripten_glGetBufferParameteriv,
  /** @export */
  emscripten_glGetBufferPointerv: _emscripten_glGetBufferPointerv,
  /** @export */
  emscripten_glGetError: _emscripten_glGetError,
  /** @export */
  emscripten_glGetFloatv: _emscripten_glGetFloatv,
  /** @export */
  emscripten_glGetFragDataLocation: _emscripten_glGetFragDataLocation,
  /** @export */
  emscripten_glGetFramebufferAttachmentParameteriv: _emscripten_glGetFramebufferAttachmentParameteriv,
  /** @export */
  emscripten_glGetInteger64i_v: _emscripten_glGetInteger64i_v,
  /** @export */
  emscripten_glGetInteger64v: _emscripten_glGetInteger64v,
  /** @export */
  emscripten_glGetIntegeri_v: _emscripten_glGetIntegeri_v,
  /** @export */
  emscripten_glGetIntegerv: _emscripten_glGetIntegerv,
  /** @export */
  emscripten_glGetInternalformativ: _emscripten_glGetInternalformativ,
  /** @export */
  emscripten_glGetProgramBinary: _emscripten_glGetProgramBinary,
  /** @export */
  emscripten_glGetProgramInfoLog: _emscripten_glGetProgramInfoLog,
  /** @export */
  emscripten_glGetProgramiv: _emscripten_glGetProgramiv,
  /** @export */
  emscripten_glGetQueryObjecti64vEXT: _emscripten_glGetQueryObjecti64vEXT,
  /** @export */
  emscripten_glGetQueryObjectivEXT: _emscripten_glGetQueryObjectivEXT,
  /** @export */
  emscripten_glGetQueryObjectui64vEXT: _emscripten_glGetQueryObjectui64vEXT,
  /** @export */
  emscripten_glGetQueryObjectuiv: _emscripten_glGetQueryObjectuiv,
  /** @export */
  emscripten_glGetQueryObjectuivEXT: _emscripten_glGetQueryObjectuivEXT,
  /** @export */
  emscripten_glGetQueryiv: _emscripten_glGetQueryiv,
  /** @export */
  emscripten_glGetQueryivEXT: _emscripten_glGetQueryivEXT,
  /** @export */
  emscripten_glGetRenderbufferParameteriv: _emscripten_glGetRenderbufferParameteriv,
  /** @export */
  emscripten_glGetSamplerParameterfv: _emscripten_glGetSamplerParameterfv,
  /** @export */
  emscripten_glGetSamplerParameteriv: _emscripten_glGetSamplerParameteriv,
  /** @export */
  emscripten_glGetShaderInfoLog: _emscripten_glGetShaderInfoLog,
  /** @export */
  emscripten_glGetShaderPrecisionFormat: _emscripten_glGetShaderPrecisionFormat,
  /** @export */
  emscripten_glGetShaderSource: _emscripten_glGetShaderSource,
  /** @export */
  emscripten_glGetShaderiv: _emscripten_glGetShaderiv,
  /** @export */
  emscripten_glGetString: _emscripten_glGetString,
  /** @export */
  emscripten_glGetStringi: _emscripten_glGetStringi,
  /** @export */
  emscripten_glGetSynciv: _emscripten_glGetSynciv,
  /** @export */
  emscripten_glGetTexParameterfv: _emscripten_glGetTexParameterfv,
  /** @export */
  emscripten_glGetTexParameteriv: _emscripten_glGetTexParameteriv,
  /** @export */
  emscripten_glGetTransformFeedbackVarying: _emscripten_glGetTransformFeedbackVarying,
  /** @export */
  emscripten_glGetUniformBlockIndex: _emscripten_glGetUniformBlockIndex,
  /** @export */
  emscripten_glGetUniformIndices: _emscripten_glGetUniformIndices,
  /** @export */
  emscripten_glGetUniformLocation: _emscripten_glGetUniformLocation,
  /** @export */
  emscripten_glGetUniformfv: _emscripten_glGetUniformfv,
  /** @export */
  emscripten_glGetUniformiv: _emscripten_glGetUniformiv,
  /** @export */
  emscripten_glGetUniformuiv: _emscripten_glGetUniformuiv,
  /** @export */
  emscripten_glGetVertexAttribIiv: _emscripten_glGetVertexAttribIiv,
  /** @export */
  emscripten_glGetVertexAttribIuiv: _emscripten_glGetVertexAttribIuiv,
  /** @export */
  emscripten_glGetVertexAttribPointerv: _emscripten_glGetVertexAttribPointerv,
  /** @export */
  emscripten_glGetVertexAttribfv: _emscripten_glGetVertexAttribfv,
  /** @export */
  emscripten_glGetVertexAttribiv: _emscripten_glGetVertexAttribiv,
  /** @export */
  emscripten_glHint: _emscripten_glHint,
  /** @export */
  emscripten_glInvalidateFramebuffer: _emscripten_glInvalidateFramebuffer,
  /** @export */
  emscripten_glInvalidateSubFramebuffer: _emscripten_glInvalidateSubFramebuffer,
  /** @export */
  emscripten_glIsBuffer: _emscripten_glIsBuffer,
  /** @export */
  emscripten_glIsEnabled: _emscripten_glIsEnabled,
  /** @export */
  emscripten_glIsFramebuffer: _emscripten_glIsFramebuffer,
  /** @export */
  emscripten_glIsProgram: _emscripten_glIsProgram,
  /** @export */
  emscripten_glIsQuery: _emscripten_glIsQuery,
  /** @export */
  emscripten_glIsQueryEXT: _emscripten_glIsQueryEXT,
  /** @export */
  emscripten_glIsRenderbuffer: _emscripten_glIsRenderbuffer,
  /** @export */
  emscripten_glIsSampler: _emscripten_glIsSampler,
  /** @export */
  emscripten_glIsShader: _emscripten_glIsShader,
  /** @export */
  emscripten_glIsSync: _emscripten_glIsSync,
  /** @export */
  emscripten_glIsTexture: _emscripten_glIsTexture,
  /** @export */
  emscripten_glIsTransformFeedback: _emscripten_glIsTransformFeedback,
  /** @export */
  emscripten_glIsVertexArray: _emscripten_glIsVertexArray,
  /** @export */
  emscripten_glIsVertexArrayOES: _emscripten_glIsVertexArrayOES,
  /** @export */
  emscripten_glLineWidth: _emscripten_glLineWidth,
  /** @export */
  emscripten_glLinkProgram: _emscripten_glLinkProgram,
  /** @export */
  emscripten_glMapBufferRange: _emscripten_glMapBufferRange,
  /** @export */
  emscripten_glPauseTransformFeedback: _emscripten_glPauseTransformFeedback,
  /** @export */
  emscripten_glPixelStorei: _emscripten_glPixelStorei,
  /** @export */
  emscripten_glPolygonModeWEBGL: _emscripten_glPolygonModeWEBGL,
  /** @export */
  emscripten_glPolygonOffset: _emscripten_glPolygonOffset,
  /** @export */
  emscripten_glPolygonOffsetClampEXT: _emscripten_glPolygonOffsetClampEXT,
  /** @export */
  emscripten_glProgramBinary: _emscripten_glProgramBinary,
  /** @export */
  emscripten_glProgramParameteri: _emscripten_glProgramParameteri,
  /** @export */
  emscripten_glQueryCounterEXT: _emscripten_glQueryCounterEXT,
  /** @export */
  emscripten_glReadBuffer: _emscripten_glReadBuffer,
  /** @export */
  emscripten_glReadPixels: _emscripten_glReadPixels,
  /** @export */
  emscripten_glReleaseShaderCompiler: _emscripten_glReleaseShaderCompiler,
  /** @export */
  emscripten_glRenderbufferStorage: _emscripten_glRenderbufferStorage,
  /** @export */
  emscripten_glRenderbufferStorageMultisample: _emscripten_glRenderbufferStorageMultisample,
  /** @export */
  emscripten_glResumeTransformFeedback: _emscripten_glResumeTransformFeedback,
  /** @export */
  emscripten_glSampleCoverage: _emscripten_glSampleCoverage,
  /** @export */
  emscripten_glSamplerParameterf: _emscripten_glSamplerParameterf,
  /** @export */
  emscripten_glSamplerParameterfv: _emscripten_glSamplerParameterfv,
  /** @export */
  emscripten_glSamplerParameteri: _emscripten_glSamplerParameteri,
  /** @export */
  emscripten_glSamplerParameteriv: _emscripten_glSamplerParameteriv,
  /** @export */
  emscripten_glScissor: _emscripten_glScissor,
  /** @export */
  emscripten_glShaderBinary: _emscripten_glShaderBinary,
  /** @export */
  emscripten_glShaderSource: _emscripten_glShaderSource,
  /** @export */
  emscripten_glStencilFunc: _emscripten_glStencilFunc,
  /** @export */
  emscripten_glStencilFuncSeparate: _emscripten_glStencilFuncSeparate,
  /** @export */
  emscripten_glStencilMask: _emscripten_glStencilMask,
  /** @export */
  emscripten_glStencilMaskSeparate: _emscripten_glStencilMaskSeparate,
  /** @export */
  emscripten_glStencilOp: _emscripten_glStencilOp,
  /** @export */
  emscripten_glStencilOpSeparate: _emscripten_glStencilOpSeparate,
  /** @export */
  emscripten_glTexImage2D: _emscripten_glTexImage2D,
  /** @export */
  emscripten_glTexImage3D: _emscripten_glTexImage3D,
  /** @export */
  emscripten_glTexParameterf: _emscripten_glTexParameterf,
  /** @export */
  emscripten_glTexParameterfv: _emscripten_glTexParameterfv,
  /** @export */
  emscripten_glTexParameteri: _emscripten_glTexParameteri,
  /** @export */
  emscripten_glTexParameteriv: _emscripten_glTexParameteriv,
  /** @export */
  emscripten_glTexStorage2D: _emscripten_glTexStorage2D,
  /** @export */
  emscripten_glTexStorage3D: _emscripten_glTexStorage3D,
  /** @export */
  emscripten_glTexSubImage2D: _emscripten_glTexSubImage2D,
  /** @export */
  emscripten_glTexSubImage3D: _emscripten_glTexSubImage3D,
  /** @export */
  emscripten_glTransformFeedbackVaryings: _emscripten_glTransformFeedbackVaryings,
  /** @export */
  emscripten_glUniform1f: _emscripten_glUniform1f,
  /** @export */
  emscripten_glUniform1fv: _emscripten_glUniform1fv,
  /** @export */
  emscripten_glUniform1i: _emscripten_glUniform1i,
  /** @export */
  emscripten_glUniform1iv: _emscripten_glUniform1iv,
  /** @export */
  emscripten_glUniform1ui: _emscripten_glUniform1ui,
  /** @export */
  emscripten_glUniform1uiv: _emscripten_glUniform1uiv,
  /** @export */
  emscripten_glUniform2f: _emscripten_glUniform2f,
  /** @export */
  emscripten_glUniform2fv: _emscripten_glUniform2fv,
  /** @export */
  emscripten_glUniform2i: _emscripten_glUniform2i,
  /** @export */
  emscripten_glUniform2iv: _emscripten_glUniform2iv,
  /** @export */
  emscripten_glUniform2ui: _emscripten_glUniform2ui,
  /** @export */
  emscripten_glUniform2uiv: _emscripten_glUniform2uiv,
  /** @export */
  emscripten_glUniform3f: _emscripten_glUniform3f,
  /** @export */
  emscripten_glUniform3fv: _emscripten_glUniform3fv,
  /** @export */
  emscripten_glUniform3i: _emscripten_glUniform3i,
  /** @export */
  emscripten_glUniform3iv: _emscripten_glUniform3iv,
  /** @export */
  emscripten_glUniform3ui: _emscripten_glUniform3ui,
  /** @export */
  emscripten_glUniform3uiv: _emscripten_glUniform3uiv,
  /** @export */
  emscripten_glUniform4f: _emscripten_glUniform4f,
  /** @export */
  emscripten_glUniform4fv: _emscripten_glUniform4fv,
  /** @export */
  emscripten_glUniform4i: _emscripten_glUniform4i,
  /** @export */
  emscripten_glUniform4iv: _emscripten_glUniform4iv,
  /** @export */
  emscripten_glUniform4ui: _emscripten_glUniform4ui,
  /** @export */
  emscripten_glUniform4uiv: _emscripten_glUniform4uiv,
  /** @export */
  emscripten_glUniformBlockBinding: _emscripten_glUniformBlockBinding,
  /** @export */
  emscripten_glUniformMatrix2fv: _emscripten_glUniformMatrix2fv,
  /** @export */
  emscripten_glUniformMatrix2x3fv: _emscripten_glUniformMatrix2x3fv,
  /** @export */
  emscripten_glUniformMatrix2x4fv: _emscripten_glUniformMatrix2x4fv,
  /** @export */
  emscripten_glUniformMatrix3fv: _emscripten_glUniformMatrix3fv,
  /** @export */
  emscripten_glUniformMatrix3x2fv: _emscripten_glUniformMatrix3x2fv,
  /** @export */
  emscripten_glUniformMatrix3x4fv: _emscripten_glUniformMatrix3x4fv,
  /** @export */
  emscripten_glUniformMatrix4fv: _emscripten_glUniformMatrix4fv,
  /** @export */
  emscripten_glUniformMatrix4x2fv: _emscripten_glUniformMatrix4x2fv,
  /** @export */
  emscripten_glUniformMatrix4x3fv: _emscripten_glUniformMatrix4x3fv,
  /** @export */
  emscripten_glUnmapBuffer: _emscripten_glUnmapBuffer,
  /** @export */
  emscripten_glUseProgram: _emscripten_glUseProgram,
  /** @export */
  emscripten_glValidateProgram: _emscripten_glValidateProgram,
  /** @export */
  emscripten_glVertexAttrib1f: _emscripten_glVertexAttrib1f,
  /** @export */
  emscripten_glVertexAttrib1fv: _emscripten_glVertexAttrib1fv,
  /** @export */
  emscripten_glVertexAttrib2f: _emscripten_glVertexAttrib2f,
  /** @export */
  emscripten_glVertexAttrib2fv: _emscripten_glVertexAttrib2fv,
  /** @export */
  emscripten_glVertexAttrib3f: _emscripten_glVertexAttrib3f,
  /** @export */
  emscripten_glVertexAttrib3fv: _emscripten_glVertexAttrib3fv,
  /** @export */
  emscripten_glVertexAttrib4f: _emscripten_glVertexAttrib4f,
  /** @export */
  emscripten_glVertexAttrib4fv: _emscripten_glVertexAttrib4fv,
  /** @export */
  emscripten_glVertexAttribDivisor: _emscripten_glVertexAttribDivisor,
  /** @export */
  emscripten_glVertexAttribDivisorANGLE: _emscripten_glVertexAttribDivisorANGLE,
  /** @export */
  emscripten_glVertexAttribDivisorARB: _emscripten_glVertexAttribDivisorARB,
  /** @export */
  emscripten_glVertexAttribDivisorEXT: _emscripten_glVertexAttribDivisorEXT,
  /** @export */
  emscripten_glVertexAttribDivisorNV: _emscripten_glVertexAttribDivisorNV,
  /** @export */
  emscripten_glVertexAttribI4i: _emscripten_glVertexAttribI4i,
  /** @export */
  emscripten_glVertexAttribI4iv: _emscripten_glVertexAttribI4iv,
  /** @export */
  emscripten_glVertexAttribI4ui: _emscripten_glVertexAttribI4ui,
  /** @export */
  emscripten_glVertexAttribI4uiv: _emscripten_glVertexAttribI4uiv,
  /** @export */
  emscripten_glVertexAttribIPointer: _emscripten_glVertexAttribIPointer,
  /** @export */
  emscripten_glVertexAttribPointer: _emscripten_glVertexAttribPointer,
  /** @export */
  emscripten_glViewport: _emscripten_glViewport,
  /** @export */
  emscripten_glWaitSync: _emscripten_glWaitSync,
  /** @export */
  emscripten_has_asyncify: _emscripten_has_asyncify,
  /** @export */
  emscripten_request_fullscreen_strategy: _emscripten_request_fullscreen_strategy,
  /** @export */
  emscripten_request_pointerlock: _emscripten_request_pointerlock,
  /** @export */
  emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */
  emscripten_sample_gamepad_data: _emscripten_sample_gamepad_data,
  /** @export */
  emscripten_set_beforeunload_callback_on_thread: _emscripten_set_beforeunload_callback_on_thread,
  /** @export */
  emscripten_set_blur_callback_on_thread: _emscripten_set_blur_callback_on_thread,
  /** @export */
  emscripten_set_canvas_element_size: _emscripten_set_canvas_element_size,
  /** @export */
  emscripten_set_element_css_size: _emscripten_set_element_css_size,
  /** @export */
  emscripten_set_focus_callback_on_thread: _emscripten_set_focus_callback_on_thread,
  /** @export */
  emscripten_set_fullscreenchange_callback_on_thread: _emscripten_set_fullscreenchange_callback_on_thread,
  /** @export */
  emscripten_set_gamepadconnected_callback_on_thread: _emscripten_set_gamepadconnected_callback_on_thread,
  /** @export */
  emscripten_set_gamepaddisconnected_callback_on_thread: _emscripten_set_gamepaddisconnected_callback_on_thread,
  /** @export */
  emscripten_set_keydown_callback_on_thread: _emscripten_set_keydown_callback_on_thread,
  /** @export */
  emscripten_set_keypress_callback_on_thread: _emscripten_set_keypress_callback_on_thread,
  /** @export */
  emscripten_set_keyup_callback_on_thread: _emscripten_set_keyup_callback_on_thread,
  /** @export */
  emscripten_set_main_loop: _emscripten_set_main_loop,
  /** @export */
  emscripten_set_main_loop_timing: _emscripten_set_main_loop_timing,
  /** @export */
  emscripten_set_mousedown_callback_on_thread: _emscripten_set_mousedown_callback_on_thread,
  /** @export */
  emscripten_set_mouseenter_callback_on_thread: _emscripten_set_mouseenter_callback_on_thread,
  /** @export */
  emscripten_set_mouseleave_callback_on_thread: _emscripten_set_mouseleave_callback_on_thread,
  /** @export */
  emscripten_set_mousemove_callback_on_thread: _emscripten_set_mousemove_callback_on_thread,
  /** @export */
  emscripten_set_mouseup_callback_on_thread: _emscripten_set_mouseup_callback_on_thread,
  /** @export */
  emscripten_set_orientationchange_callback_on_thread: _emscripten_set_orientationchange_callback_on_thread,
  /** @export */
  emscripten_set_pointerlockchange_callback_on_thread: _emscripten_set_pointerlockchange_callback_on_thread,
  /** @export */
  emscripten_set_resize_callback_on_thread: _emscripten_set_resize_callback_on_thread,
  /** @export */
  emscripten_set_touchcancel_callback_on_thread: _emscripten_set_touchcancel_callback_on_thread,
  /** @export */
  emscripten_set_touchend_callback_on_thread: _emscripten_set_touchend_callback_on_thread,
  /** @export */
  emscripten_set_touchmove_callback_on_thread: _emscripten_set_touchmove_callback_on_thread,
  /** @export */
  emscripten_set_touchstart_callback_on_thread: _emscripten_set_touchstart_callback_on_thread,
  /** @export */
  emscripten_set_visibilitychange_callback_on_thread: _emscripten_set_visibilitychange_callback_on_thread,
  /** @export */
  emscripten_set_wheel_callback_on_thread: _emscripten_set_wheel_callback_on_thread,
  /** @export */
  emscripten_set_window_title: _emscripten_set_window_title,
  /** @export */
  emscripten_sleep: _emscripten_sleep,
  /** @export */
  emscripten_webgl_create_context: _emscripten_webgl_create_context,
  /** @export */
  emscripten_webgl_destroy_context: _emscripten_webgl_destroy_context,
  /** @export */
  emscripten_webgl_make_context_current: _emscripten_webgl_make_context_current,
  /** @export */
  environ_get: _environ_get,
  /** @export */
  environ_sizes_get: _environ_sizes_get,
  /** @export */
  exit: _exit,
  /** @export */
  fd_close: _fd_close,
  /** @export */
  fd_read: _fd_read,
  /** @export */
  fd_seek: _fd_seek,
  /** @export */
  fd_write: _fd_write,
  /** @export */
  glActiveTexture: _glActiveTexture,
  /** @export */
  glAttachShader: _glAttachShader,
  /** @export */
  glBindBuffer: _glBindBuffer,
  /** @export */
  glBindTexture: _glBindTexture,
  /** @export */
  glBindVertexArrayOES: _glBindVertexArrayOES,
  /** @export */
  glBlendEquation: _glBlendEquation,
  /** @export */
  glBlendEquationSeparate: _glBlendEquationSeparate,
  /** @export */
  glBlendFuncSeparate: _glBlendFuncSeparate,
  /** @export */
  glBufferData: _glBufferData,
  /** @export */
  glBufferSubData: _glBufferSubData,
  /** @export */
  glCompileShader: _glCompileShader,
  /** @export */
  glCreateProgram: _glCreateProgram,
  /** @export */
  glCreateShader: _glCreateShader,
  /** @export */
  glDeleteShader: _glDeleteShader,
  /** @export */
  glDeleteVertexArraysOES: _glDeleteVertexArraysOES,
  /** @export */
  glDetachShader: _glDetachShader,
  /** @export */
  glDisable: _glDisable,
  /** @export */
  glDrawElements: _glDrawElements,
  /** @export */
  glEnable: _glEnable,
  /** @export */
  glEnableVertexAttribArray: _glEnableVertexAttribArray,
  /** @export */
  glGenBuffers: _glGenBuffers,
  /** @export */
  glGenTextures: _glGenTextures,
  /** @export */
  glGenVertexArraysOES: _glGenVertexArraysOES,
  /** @export */
  glGetAttribLocation: _glGetAttribLocation,
  /** @export */
  glGetIntegerv: _glGetIntegerv,
  /** @export */
  glGetProgramInfoLog: _glGetProgramInfoLog,
  /** @export */
  glGetProgramiv: _glGetProgramiv,
  /** @export */
  glGetShaderInfoLog: _glGetShaderInfoLog,
  /** @export */
  glGetShaderiv: _glGetShaderiv,
  /** @export */
  glGetString: _glGetString,
  /** @export */
  glGetUniformLocation: _glGetUniformLocation,
  /** @export */
  glIsEnabled: _glIsEnabled,
  /** @export */
  glIsProgram: _glIsProgram,
  /** @export */
  glLinkProgram: _glLinkProgram,
  /** @export */
  glScissor: _glScissor,
  /** @export */
  glShaderSource: _glShaderSource,
  /** @export */
  glTexImage2D: _glTexImage2D,
  /** @export */
  glTexParameteri: _glTexParameteri,
  /** @export */
  glUniform1i: _glUniform1i,
  /** @export */
  glUniformMatrix4fv: _glUniformMatrix4fv,
  /** @export */
  glUseProgram: _glUseProgram,
  /** @export */
  glVertexAttribPointer: _glVertexAttribPointer,
  /** @export */
  glViewport: _glViewport,
  /** @export */
  random_get: _random_get
};
var wasmExports;
createWasm();


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

var calledRun;

function callMain(args = []) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(typeof onPreRuns === 'undefined' || onPreRuns.length == 0, 'cannot call main when preRun functions remain to be called');

  var entryFunction = _main;

  args.unshift(thisProgram);

  var argc = args.length;
  var argv = stackAlloc((argc + 1) * 4);
  var argv_ptr = argv;
  args.forEach((arg) => {
    HEAPU32[((argv_ptr)>>2)] = stringToUTF8OnStack(arg);
    argv_ptr += 4;
  });
  HEAPU32[((argv_ptr)>>2)] = 0;

  try {

    var ret = entryFunction(argc, argv);

    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  } catch (e) {
    return handleException(e);
  }
}

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run(args = arguments_) {

  if (runDependencies > 0) {
    dependenciesFulfilled = run;
    return;
  }

  stackCheckInit();

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    dependenciesFulfilled = run;
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    assert(!calledRun);
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    Module['onRuntimeInitialized']?.();
    consumedModuleProp('onRuntimeInitialized');

    var noInitialRun = Module['noInitialRun'] || false;
    if (!noInitialRun) callMain(args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(() => {
      setTimeout(() => Module['setStatus'](''), 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    _fflush(0);
    // also flush in the JS FS layer
    ['stdout', 'stderr'].forEach((name) => {
      var info = FS.analyzePath('/dev/' + name);
      if (!info) return;
      var stream = info.object;
      var rdev = stream.rdev;
      var tty = TTY.ttys[rdev];
      if (tty?.output?.length) {
        has = true;
      }
    });
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
  }
}

function preInit() {
  if (Module['preInit']) {
    if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
    while (Module['preInit'].length > 0) {
      Module['preInit'].shift()();
    }
  }
  consumedModuleProp('preInit');
}

preInit();
run();

// end include: postamble.js

