"use strict";

module.exports = function(grunt) {
  var jshint_watched_files = ["./*.js", "./public/javascripts/**/*.js", "./routes/**/*.js"];

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      options: {
        jshintrc: true
      },
      all: jshint_watched_files
    },
    watch: {
      files: jshint_watched_files,
      tasks: ["jshint"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["watch"]);
};
