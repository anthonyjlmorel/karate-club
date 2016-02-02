var gulp = require("gulp"),
	gulpConcat = require("gulp-concat"),
	gulpMinify = require("gulp-minify"),
	mst = require('gulp-mustache'),
	rimraf = require('rimraf'),
	sequence = require('gulp-sequence');

var mode = 'debug';

var cssFiles = ["css/bootstrap.css",
		"css/main.css",
		"css/theme.css",
		"font-awesome/css/font-awesome.css",
		"css/zabuto_calendar.css",
		"css/breakpoint.css",
		"http://fonts.googleapis.com/css?family=Montserrat:400,700",
		"http://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700",
		"http://fonts.googleapis.com/css?family=Kaushan+Script",
		'http://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic'];
		
var jsFiles = ["js/jquery.js",
		"js/bootstrap.js",
		"js/knockout-3.4.0.js",
		"js/zabuto_calendar.min.js",
		"js/p-scripts/main-menu.js",
		"js/p-scripts/calendar.js",
		"js/p-scripts/results.js",
		"js/p-scripts/team.js"
		];
		
var dist = '../karate-club-dist';
	
gulp.task('clean', function(cb){
	rimraf('./dist', cb);
});

gulp.task('copy-php', function(){
	
	return gulp.src(['./**/*.php', 
					'!index.php'])
				.pipe(gulp.dest(dist));
});

gulp.task('copy-css', function(){
	return gulp.src(['./css/**/*.css'])
				.pipe(gulp.dest(dist + '/css'));
});

gulp.task('copy-img', function(){
	return gulp.src(['./img/**/*'])
				.pipe(gulp.dest(dist + '/img'));
});

gulp.task('copy-js', function(){
	if(mode == 'debug'){
		return gulp.src(
		['./js/**/*.js']
		).pipe(gulp.dest(dist + '/js'));
	}
});

gulp.task('generate-index', function(){
	
	var transformList = function(lst){
		var result = [];
		
		lst.forEach(function(item){
			result.push( "\"" + item + "\"" );
		});

		return result;
	};
	
	return gulp.src("./index.php")
				.pipe(mst({
					cssFiles: transformList(cssFiles),
					jsFiles: transformList(jsFiles)
				}))
				.pipe(gulp.dest(dist));
	
});

gulp.task('build', function(cb){
	var seq = ['clean', ['generate-index', 'copy-img', 'copy-css', 'copy-js', 'copy-php'], cb];
	
	sequence.apply(sequence, seq);
});