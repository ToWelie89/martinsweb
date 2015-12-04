module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        replace: {
            dist: {
                options: {
                    patterns: [{
                        match: 'defaultCss',
                        replacement: '<%= grunt.file.read("build/default.css") %>'
                    }, {
                        match: 'photoSwipeCss',
                        replacement: '<%= grunt.file.read("js/libs/photoswipe/photoswipe.css") %>'
                    }, {
                        match: 'photoSwipeDefaultSkinCss',
                        replacement: '<%= grunt.file.read("js/libs/photoswipe/default-skin/default-skin.css") %>'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['includes/head.php'],
                    dest: 'includes/build/'
                }]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/angular/**/*.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        uglify: {
            build: {
                src: 'js/MapEditor.js',
                dest: 'build/MapEditor.min.js'
            }
        },
        less: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                cleancss: true
            },

            all: {
                files: [{
                    src: 'css/init.less',
                    dest: 'build/default.css'
                }]
            },
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-replace');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'less', 'replace']);

};