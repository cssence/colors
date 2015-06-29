/*global grunt, module, require */

module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // clean public directory
    clean: {
      base: ["*.min.*"],
      dist: ["<%= pkg.config.paths.dist %>/*.min.*"]
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
        src: ["*.css"],
        ext: ".min.css"
      }
    },

    // uglify and concat js
    uglify: {
      js: {
        expand: true,
        src: ["*.js", "!Gruntfile.js", "!app.js"],
        ext: ".min.js"
      }
    },

    // jade compile
    jade: {
      compile: {
        options: {
          data: {
            inline: true,
            config: require("./package.json"),
            colors: require("./colors.json"),
            meta: require("./description.json")
          }
        },
        expand: true,
        src: ["*.jade"],
        dest: "<%= pkg.config.paths.dist %>/",
        ext: ".html"
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
    ["clean:base", "postcss:dist", "uglify:js"]
  );
  grunt.registerTask(
    "release",
    "Deploys the project (generate HTML)",
    ["build", "jade:compile"]
  );

  // Default task(s).
  grunt.registerTask("default", ["release"]);

};
