/*global grunt, module, require */

module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // clean public directory
    clean: {
      minified: ["<%= pkg.config.paths.dist %>/*.min.*"],
      html: ["<%= pkg.config.paths.dist %>/*.html"]
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer-core")({browsers: "last 2 version"}),
          require("csswring")
        ]
      },
      dist: {
        expand: true,
        src: ["<%= pkg.config.paths.dist %>/*.css"],
        ext: ".min.css"
      }
    },

    // uglify and concat js
    uglify: {
      js: {
        expand: true,
        src: ["<%= pkg.config.paths.dist %>/*.js"],
        ext: ".min.js"
      }
    },

    // jade compile
    jade: {
      index: {
        options: {
          data: function (dest, src) {
            var destFolder = grunt.config.get("pkg").config.paths.dist;
            return {
              pkg: grunt.file.readJSON("package.json"),
              inline: {
                logo: grunt.file.read(destFolder + "/logo.svg", {encoding: "utf8"}),
                script: grunt.file.read(destFolder + "/theme.min.js"),
                style: grunt.file.read(destFolder + "/style.min.css")
              },
              meta: grunt.file.readJSON(destFolder + "/description.json"),
              colors: grunt.file.readJSON(destFolder + "/colors.json")
            };
          }
        },
        src: "colors.jade",
        dest: "<%= pkg.config.paths.dist %>/index.html"
      }
    }

  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jade");

  grunt.registerTask(
    "build",
    "Prepares project deployment",
    ["clean", "postcss", "uglify"]
  );
  grunt.registerTask(
    "release",
    "Deploys the project (generate HTML)",
    ["build", "jade"]
  );

  // Default task(s).
  grunt.registerTask("default", ["release"]);

};
