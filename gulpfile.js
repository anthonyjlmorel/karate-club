var gulp = require("gulp"),
	gulpConcat = require("gulp-concat"),
	gulpMinify = require("gulp-minify"),
	gulpMinifyCss = require("gulp-minify-css"),
	jsonMinify = require("gulp-jsonminify"),
	mst = require('gulp-mustache'),
	rimraf = require('rimraf'),
	sequence = require('gulp-sequence'),
	mergeStream = require('merge-stream');

var mode = 'debug';

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
		"js/bootstrap.js",
		"js/knockout-3.4.0.js",
		"js/p-scripts/main-menu.js",
		"js/p-scripts/calendar.js",
		"js/p-scripts/results.js",
		"js/p-scripts/team.js"
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
	return gulp.src(['./img/**/*'])
				.pipe(gulp.dest(dist + '/img'));
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
	
	var seq = ['clean', ['generate-index', 'copy-img', 'copy-font', 'copy-css', 'copy-js', 'copy-php'], cb];
	
	sequence.apply(sequence, seq);
});

gulp.task('build-release', function(cb){
	mode = "release";
	buildTimestamp = new Date().getTime();
	var seq = ['clean', ['generate-index', 'copy-img', 'copy-font', 'copy-css', 'copy-js', 'copy-php'], cb];
	sequence.apply(sequence, seq);
});

gulp.task('watch', function(){
	gulp.watch(['./**/*', '!./node_modules/**'], ['build']);
});