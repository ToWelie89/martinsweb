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
                    src: 'js/MapEditor.js',
                    dest: 'build/MapEditor.min.js'
                }, {
                    src: 'js/libs/photoswipe/photoswipe.js',
                    dest: 'build/photoswipe.min.js'
                }]
            }
        },
        browserify: {
            build: {
                files: {
                    'build/app.bundle.js': 'js/app.js'
                },
                options: {
                    transform: [['babelify', { presets: "es2015" }]],
                    browserifyOptions: {
                        debug: true
                    }
                }
            },
            test: {
                files: {
                    'build/testApp.bundle.js': 'js/test/test.js'
                },
                options: {
                    transform: [['babelify', { presets: "es2015" }]],
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },
        replace: {
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
                    }, {
                        match: 'syntaxHighlighterCss',
                        replacement: '<%= grunt.file.read("css/cssLibs/shCore.css") %>'
                    }, {
                        match: 'syntaxHighlighterThemeCss',
                        replacement: '<%= grunt.file.read("css/cssLibs/shThemeMidnight.css") %>'
                    }, {
                        match: 'signatureSvg',
                        replacement: '<%= grunt.file.read("signatur2.svg") %>'
                    }]
                },
                files: [{
                    src: ['includes/build/head.php'],
                    dest: 'includes/build/head.php'
                }, {
                    src: ['views/index.html'],
                    dest: 'views/build/index.html'
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
                }]
            },
        },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            images: {
                src: 'build/**/*.{jpg,jpeg,gif,png,webp,svg,ico,mp4}'
            },
            js: {
                src: ['build/app.bundle.js', 'build/MapEditor.min.js']
            }
        },
        filerev_replace: {
            options: {
                assets_root: './'
            },
            compiled_assets: {
                src: [
                    'build/*.js',
                    'build/default.css',
                    'build/small.css',
                    'includes/build/*',
                    'views/build/*'
                ]
            }
        },
        clean: {
            all: ['includes/build/*', 'views/build/*', 'build/*'],
            css: ['build/default.css'],
            test: ['build/testApp.bundle.js']
        },
        copy: {
            main: {
                files: [{
                    src: 'includes/projects/*',
                    expand: true,
                    flatten: true,
                    dest: 'includes/build/'
                }, {
                    src: 'views/art.php',
                    dest: 'views/build/art.php'
                }, {
                    src: 'views/3dmodels.html',
                    dest: 'views/build/3dmodels.html'
                }, {
                    src: 'views/3dprints.html',
                    dest: 'views/build/3dprints.html'
                }, {
                    src: 'views/videos.html',
                    dest: 'views/build/videos.html'
                }, {
                    src: 'views/projects.html',
                    dest: 'views/build/projects.html'
                }, {
                    src: 'assets/**/*',
                    dest: 'build/',
                    expand: true,
                    flatten: false
                }, {
                    src: 'includes/head.php',
                    dest: 'includes/build/head.php'
                }, {
                    src: 'includes/projectStatus.html',
                    dest: 'includes/build/projectStatus.html'
                }]
            }
        },
        jshint: {
            options: {
                ignores: [
                    'build/*-min.js'
                ],
                jshintrc: '.jshintrc'
            },
            src: ['js/angular/**/*.js' /*, 'js/MapEditor.js'*/ ],
        },
        watch: {
            scripts: {
                files: ['js/**/*.js', 'css/**/*.less', 'includes/**/*.php', 'includes/**/*.html', 'views/*.php', 'views/*.html', 'index.php'],
                tasks: ['default'],
                options: {
                    spawn: false,
                },
            },
            jsdocTemplate: {
                files: ['jsdocTemplate/**/*.js', 'jsdocTemplate/**/*.tmpl', 'jsdocTemplate/**/*.css', 'js/jsdoc.md', 'js/jsdoc-global-definitions.js'],
                tasks: ['jsdoc'],
                options: {
                    spawn: false,
                },
            }
        },
        jsonlint: {
            src: [
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
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                metadata: '',
                regExp: false
            }
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
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-bump');

    // Default task for building
    grunt.registerTask('default', [
        'clean:all', // Clean previous build files
        'copy', // Copy markup files that need to be adjusted to build folder
        'uglify', // Minify and uglify css and put it in build folder
        'browserify:build', // Use browserify to transpile ES6 source code with babel
        'filerev', // Create versioned images in img/build
        'less', // Compile CSS files and put them in build folder
        'filerev_replace', // Change image filenames to the newly generated ones
        'replace:inline', // Inline all css in head
        /* 'jsdoc', */ // Generate Javascript doc
        'notify' // Notify that build is complete
    ]);
    grunt.registerTask('buildcss', [
        'clean:css', // Clean previous css file
        'less', // Compile CSS files and put them in build folder
        'filerev_replace' // Change image filenames to the newly generated ones
    ]);
    grunt.registerTask('test', [
        'clean:test', // Clean previous build files
        'browserify:test', // Use browserify to transpile ES6 source code with babel
        // 'jshint', // Test JS files for syntax errors
        'jsonlint', // JSON LINT, test json files for syntax errors
        'eslint',
        'karma' // Run karma tests
    ]);
};
