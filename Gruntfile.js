module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [{
                    src: 'js/angular/**/*.js',
                    dest: 'build/<%= pkg.name %>.min.js'
                }, {
                    src: 'js/MapEditor.js',
                    dest: 'build/MapEditor.min.js'
                }]
            }
        },
        replace: {
            imgPathInCss: {
                options: {
                    patterns: [{
                        match: 'imgFolder',
                        replacement: '../img/build'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['build/default.css', 'build/small.css'],
                    dest: 'build'
                }]
            },
            inline: {
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
                src: 'img/**/*.{jpg,jpeg,gif,png,webp}',
                dest: 'img/build'
            }
        },
        filerev_replace: {
            options: {
                assets_root: './img/build'
            },
            compiled_assets: {
                src: ['build/MapEditor.min.js',
                    'build/martins-web.min.js',
                    'build/default.css',
                    'build/small.css',
                    'includes/build/*'
                ]
            }
        },
        clean: {
            img: ['img/build/*', 'includes/build/*', 'build/*']
        },
        copy: {
            main: {
                files: [{
                    src: 'includes/topBar.php',
                    dest: 'includes/build/topBar.php'
                }, {
                    src: 'includes/projects/*',
                    expand: true,
                    flatten: true,
                    dest: 'includes/build/'
                }],
            },
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-filerev-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', [
        'clean', // Clean previous build files
        'copy', // Copy markup files that need to be adjusted to build folder
        'uglify', // Minify and uglify css and put it in build folder
        'filerev', // Create versioned images in img/build
        'less', // Compile CSS files and put them in build folder
        'replace:imgPathInCss', // Edit image paths in compiled CSS-files to match the newly generated images
        'filerev_replace', // Change image filenames to the newly generated ones
        'replace:inline' // Inline all css in head
    ]);

};