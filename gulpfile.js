const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const groupMediaQueries = require('gulp-group-css-media-queries');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

const paths = {

    scss: {
        app: './assets/scss/app.scss',
        watch: './assets/scss/**/*.scss'
    },

    js: {
        src: './assets/js/**/*.js',
        dest: './dist/js'
    },

    css: {
        main: './dist/css'
    },

    fonts: {
        src: './assets/fonts/**/*',
        dest: './dist/fonts'
    },

    img: {
        src: './assets/img/**/*',
        dest: './dist/img'
    },

    // third-party libraries
    vendor: {
        js: [
            './node_modules/swiper/swiper-bundle.min.js'
        ],
        css: [
            './node_modules/swiper/swiper-bundle.min.css'
        ],
        dest: './dist/vendor'
    }

};


const postcssPlugins = [
    autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }),
    cssnano({
        preset: 'default'
    })
];

function stylesApp() {

    return src(paths.scss.app)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(groupMediaQueries())
        .pipe(postcss(postcssPlugins))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.css.main));
}

function scripts() {
    return src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.js.dest));
}

// copy vendor files
function vendorJs() {
    return src(paths.vendor.js, { encoding: false })
        .pipe(dest(`${paths.vendor.dest}/js`));
}

function vendorCss() {
    return src(paths.vendor.css, { encoding: false })
        .pipe(dest(`${paths.vendor.dest}/css`));
}

const vendor = parallel(vendorJs, vendorCss);

// copy fonts
function fonts() {
    return src(paths.fonts.src, { encoding: false })
        .pipe(dest(paths.fonts.dest));
}

// copy images
function images() {
    return src(paths.img.src, { encoding: false })
        .pipe(dest(paths.img.dest));
}

function watcher() {
    watch(paths.scss.watch, stylesApp);
    watch(paths.js.src, scripts);
    //watch(paths.fonts.src, fonts);
    //watch(paths.img.src, images);
}

exports.styles = stylesApp;
exports.scripts = scripts;
exports.vendor = vendor;
exports.fonts = fonts;
exports.images = images;
exports.default = series(
    parallel(stylesApp, scripts, vendor, fonts, images),
    watcher
);