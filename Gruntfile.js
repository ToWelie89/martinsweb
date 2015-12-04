module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        less: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                cleancss: true
            },

            all: {
                files: [{
                    src: 'css/init.less',
                    dest: 'build/default.css'
                }, {
                    src: 'css/initSmall.less',
                    dest: 'build/small.css'
                }]
            },
        },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            images: {
                src: 'img/**/*.{jpg,jpeg,gif,png,webp}'
            }
        },
        filerev_replace: {
            options: {
                assets_root: 'img/'
            },
            compiled_assets: {
                src: 'build/*.{css,js}'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-replace');

    grunt.loadNpmTasks('grunt-filerev');

    grunt.loadNpmTasks('grunt-filerev-replace');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'filerev', 'less', 'filerev_replace', 'replace']);

};