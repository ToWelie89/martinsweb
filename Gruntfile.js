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
                    dest: 'assets/build/<%= pkg.name %>.min.js'
                }, {
                    src: 'js/MapEditor.js',
                    dest: 'assets/build/MapEditor.min.js'
                }]
            }
        },
        replace: {
            inline: {
                options: {
                    patterns: [{
                        match: 'defaultCss',
                        replacement: '<%= grunt.file.read("assets/build/default.css") %>'
                    }, {
                        match: 'photoSwipeCss',
                        replacement: '<%= grunt.file.read("js/libs/photoswipe/photoswipe.css") %>'
                    }, {
                        match: 'photoSwipeDefaultSkinCss',
                        replacement: '<%= grunt.file.read("js/libs/photoswipe/default-skin/default-skin.css") %>'
                    }, {
                        match: 'syntaxHighlighterCss',
                        replacement: '<%= grunt.file.read("css/cssLibs/shCore.css") %>'
                    }, {
                        match: 'syntaxHighlighterThemeCss',
                        replacement: '<%= grunt.file.read("css/cssLibs/shThemeMidnight.css") %>'
                    }]
                },
                files: [{
                    src: ['includes/build/head.php'],
                    dest: 'includes/build/head.php'
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
                    dest: 'assets/build/default.css'
                }, {
                    src: 'css/initSmall.less',
                    dest: 'assets/build/small.css'
                }]
            },
        },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            images: {
                src: 'assets/build/**/*.{jpg,jpeg,gif,png,webp}'
            },
            js: {
                src: ['assets/build/martins-web.min.js', 'assets/build/MapEditor.min.js']
            }
        },
        filerev_replace: {
            options: {
                assets_root: './'
            },
            compiled_assets: {
                src: [
                    'assets/build/*.js',
                    'assets/build/default.css',
                    'assets/build/small.css',
                    'includes/build/*',
                    'views/build/*'
                ]
            }
        },
        clean: {
            img: ['includes/build/*', 'views/build/*', 'assets/build/*']
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
                }, {
                    src: 'views/art.php',
                    dest: 'views/build/art.php'
                }, {
                    src: 'views/videos.html',
                    dest: 'views/build/videos.html'
                }, {
                    src: 'views/projects.html',
                    dest: 'views/build/projects.html'
                }, {
                    src: 'views/bio.php',
                    dest: 'views/build/bio.php'
                }, {
                    src: 'assets/img/*',
                    dest: 'assets/build/',
                    expand: true,
                    flatten: true
                }, {
                    src: 'includes/head.php',
                    dest: 'includes/build/head.php'
                }]
            },
        },
        jshint: {
            options: {
                ignores: [
                    'assets/build/*-min.js'
                ],
                jshintrc: '.jshintrc'
            },
            src: ['js/angular/**/*.js' /*, 'js/MapEditor.js'*/ ],
        },
        watch: {
            scripts: {
                files: ['js/angular/**/*.js', 'css/**/*.less', 'includes/**/*.php', 'includes/**/*.html', 'views/*.php', 'views/*.html'],
                tasks: ['default'],
                options: {
                    spawn: false,
                },
            },
            jsdocTemplate: {
                files: ['jsdocTemplate/**/*.js', 'jsdocTemplate/**/*.tmpl', 'jsdocTemplate/**/*.css', 'js/jsdoc.md', 'js/angular/jsdoc-global-definitions.js'],
                tasks: ['jsdoc'],
                options: {
                    spawn: false,
                },
            }
        },
        jsonlint: {
            src: [
                'json/*.json',
                'package.json'
            ]
        },
        jsdoc: {
            dist: {
                src: [
                    'js/jsdoc.md',
                    'js/angular/**/*.js'
                ],
                options: {
                    destination: 'docs',
                    recurse: true,
                    template: './jsdocTemplate'
                }
            }
        },
        notify: {
            watch: {
                options: {
                    title: 'Grunt watch', // optional
                    message: 'Build complete' // required
                }
            }
        },
        eslint: {
            target: 'js/angular/**/*.js'
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-filerev-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-eslint');

    // Default task for building
    grunt.registerTask('default', [
        'clean', // Clean previous build files
        'copy', // Copy markup files that need to be adjusted to build folder
        'uglify', // Minify and uglify css and put it in build folder
        'filerev', // Create versioned images in img/build
        'less', // Compile CSS files and put them in build folder
        'filerev_replace', // Change image filenames to the newly generated ones
        'replace:inline', // Inline all css in head
        'jsdoc', // Generate Javascript doc
        'notify' // Notify that build is complete
    ]);
    grunt.registerTask('test', [
        'jshint', // Test JS files for syntax errors
        'jsonlint', // JSON LINT, test json files for syntax errors
	'eslint'
    ]);
};
