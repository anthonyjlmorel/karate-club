var gulp = require("gulp"),
	gulpConcat = require("gulp-concat"),
	gulpMinify = require("gulp-minify"),
	gulpMinifyCss = require("gulp-minify-css"),
	jsonMinify = require("gulp-jsonminify"),
	mst = require('gulp-mustache'),
	rimraf = require('rimraf'),
	sequence = require('gulp-sequence'),
	mergeStream = require('merge-stream'),
    jsonminify = require('gulp-jsonminify'),
	imageResize = require('gulp-image-resize');

var mode = 'debug',
	withoutImgOperations = false;

var cssFiles = ["css/bootstrap.css",
		"css/main.css",
		"css/theme.css",
		"css/font-awesome.css",
		"css/breakpoint.css",
		"css/montserrat-font.css",
		"css/roboto-slab-font.css",
		"css/kaushan-font.css",
		"css/droid-font.css"];
		
var jsFiles = ["js/jquery.js",
		"js/knockout-3.4.0.js",
		"js/p-scripts/main-script.js",
		"js/p-scripts/main-menu.js",
		"js/p-scripts/club.js",
		"js/p-scripts/calendar.js",
		"js/p-scripts/results.js",
		"js/p-scripts/team.js",
		"js/bootstrap.js"
		];
		
var dist = '../karate-club-dist',
	buildTimestamp;
	
gulp.task('clean', function(cb){
	rimraf(dist, cb);
});

gulp.task('copy-php', function(){
	
	var a = gulp.src(['./**/*.php',
					'!index.php'])
				.pipe(gulp.dest(dist));
				
	var b = gulp.src(['./pages/**/*'])
				.pipe(gulp.dest(dist + '/pages'));
				
	return mergeStream(a,b);
});

gulp.task('copy-css', function(){
	if(mode == "debug"){
		return gulp.src(['./css/**/*.css'])
					.pipe(gulp.dest(dist + '/css'));	
	}
	
	return gulp.src(cssFiles)
				.pipe(gulpConcat('build-' + buildTimestamp + '.min.css'))
				.pipe(gulpMinifyCss())
				.pipe(gulp.dest(dist + '/css'));
});

gulp.task('copy-cfg', function(){
	if(mode == "debug"){
		return gulp.src(['./cfg/**/*.json'])
					.pipe(gulp.dest(dist + '/cfg'));	
	}

	return gulp.src(['./cfg/**/*.json'])
				.pipe(jsonminify())
				.pipe(gulp.dest(dist + '/cfg'));
});


gulp.task('copy-js', function(){
	if(mode == 'debug'){
		return gulp.src(['./js/**/*.js'])
				.pipe(gulp.dest(dist + '/js'));
	}
	
	return gulp.src(jsFiles)
				.pipe(gulpConcat('build-' + buildTimestamp + '.min.js'))
				.pipe(gulpMinify())
				.pipe(gulp.dest(dist + '/js'));
});

gulp.task('copy-font', function(){
	return gulp.src(['./fonts/**/*'])
				.pipe(gulp.dest(dist + '/fonts'));
});

gulp.task('copy-img', function(){
	
	// Copying Regular Imgs
	var a = gulp.src(['./img/**/*',])
				.pipe(gulp.dest(dist + '/img'));
	
	
	if(!withoutImgOperations){
		// Making Miniatures for Gallery
		// @WARNING: to use image resize, you need to install
		// Graphicsmagick
		var b =  gulp.src(["./img/gallery/**"])
					.pipe(imageResize({
						width : 200
					}))
					.pipe(gulp.dest(dist + '/img/gallery-min'));
					
		return mergeStream(a, b);	
	}
	
	return a;
	
});

gulp.task('generate-index', function(){
	
	var transformList = function(lst){
		var result = [];
		
		lst.forEach(function(item){
			result.push( "\"" + item + "\"" );
		});	
		return result;
	};
	
	if(mode == "debug"){
		return gulp.src("./index.php")
					.pipe(mst({
						cssFiles: transformList(cssFiles),
						jsFiles: transformList(jsFiles)
					}))
					.pipe(gulp.dest(dist));	
	}
	
	return gulp.src("./index.php")
				.pipe(mst({
					cssFiles: '\"css/build-'+buildTimestamp+'.min.css\"',
					jsFiles: '\"js/build-'+buildTimestamp+'.min-min.js\"'
				}))
				.pipe(gulp.dest(dist));
	
});

gulp.task('build', function(cb){
	
	var seq = ['clean', ['generate-index', 'copy-img', 'copy-font', 'copy-css', 'copy-js', 'copy-php','copy-cfg'], cb];
	
	sequence.apply(sequence, seq);
});

gulp.task('build-fast', function(cb){
	withoutImgOperations = true;	
	var seq = ['clean', ['generate-index', 'copy-img', 'copy-font', 'copy-css', 'copy-js', 'copy-php','copy-cfg'], cb];
	
	sequence.apply(sequence, seq);
});

gulp.task('build-release', function(cb){
	mode = "release";
	buildTimestamp = new Date().getTime();
	var seq = ['clean', ['generate-index', 'copy-img', 'copy-font', 'copy-css', 'copy-js', 'copy-php','copy-cfg'], cb];
	sequence.apply(sequence, seq);
});

gulp.task('watch', function(){
	gulp.watch(['./**/*', '!./node_modules/**'], ['build-fast']);
});