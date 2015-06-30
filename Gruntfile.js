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

    // jade compile
    jade: {
      index: {
        options: {
          data: function (dest, src) {
            var folder, options;
            folder = grunt.config.get("pkg").config.paths.dist;
            options = {encoding: "utf8"};
            return {
              pkg: grunt.file.readJSON("package.json"),
              inline: {
                logo: grunt.file.read(folder + "/logo.svg", options),
                style: grunt.file.read(folder + "/style.min.css", options)
              },
              meta: grunt.file.readJSON(folder + "/description.json"),
              colors: grunt.file.readJSON(folder + "/colors.json")
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
  grunt.loadNpmTasks("grunt-contrib-jade");

  grunt.registerTask(
    "build",
    "Prepares project deployment",
    ["clean", "postcss"]
  );
  grunt.registerTask(
    "release",
    "Deploys the project (generate HTML)",
    ["build", "jade"]
  );

  // Default task(s).
  grunt.registerTask("default", ["release"]);

};
