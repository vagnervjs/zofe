module.exports = function(grunt) {
  grunt.config('uglify', {
    dist: {
      files: {
        "assets/js/libs.min.js": [
          "_assets/js/vendor/vendor/dist/jquery.min.js",
          "_assets/js/timeJump.js",
          "_assets/js/progress-tracker.js"
        ],
        "assets/js/zofe.min.js": [
          "_assets/js/scripts.js"
        ]
      }
    }
  });
};
