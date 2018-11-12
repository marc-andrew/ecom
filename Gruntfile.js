'use strict';
var path = require('path');

var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: [".sass-cache"]
            },
            release: {
                src: [".sass-cache"]
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'auto',
                    noCache: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '01_dev/sass/',
                        src: ['**/*.scss'],
                        dest: '01_dev/css/',
                        ext: '.css'
                    }
                ]
            }
        },

        'dart-sass': {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: '01_dev/sass/',
                        src: ['**/*.scss'],
                        dest: '02_production/css/',
                        ext: '.css'
                    }
                ]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 9']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: '02_production/css/*.css',
                dest: '02_production/css/'
            },
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: '02_production/css/',
                src: ['*.css', '!*.min.css'],
                dest: '02_production/css/',
                ext: '.css'
            }
        },

        jshint: {
            all: ['01_dev/js/**/*.js']
        },

        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: '02_production/js/',
                    src: ['**/*.js', '!**/*.min.js', '!*.min.js', '!lib/*.js'],
                    dest: '02_production/js',
                    ext: '.js'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '02_production/',
                    src: ['*.html'],
                    dest: '02_production/'
                }]
            }
        },

        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: '01_dev/js',
                        src: '**',
                        dest: '02_production/js'
                    }
                ],
            }
        },

        replace: {
            html: {
                src: ['02_production/*.html'],
                overwrite: true,
                replacements: [{
                    from: '<script src="//localhost:35729/livereload.js"></script>',
                    to: ''
                }]
            }
        },

        processhtml: {
            dist: {
                files: {
                    '02_production/index.html': ['01_dev/template/index.html'],
                    '02_production/style-guide.html': ['01_dev/template/style-guide.html'],
                }
            },
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '02_production/',
                    hostname: '*'
                }
            }
        },

        watch: {
            options: {
                dateFormat: function (time) {
                    grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                    grunt.log.writeln('Waiting for new changes ...');
                },
            },
            sass: {
                files: '01_dev/sass/**/*',
                tasks: ['dart-sass', 'autoprefixer'],
                options: {
                    livereload: true,
                }
            },
            js: {
                files: '01_dev/js/**/*',
                tasks: ['jshint', 'copy:js'],
                options: {
                    livereload: true,
                }
            },
            html: {
                files: '01_dev/template/**/*',
                tasks: ['processhtml'],
                options: {
                    livereload: true,
                }
            }
        } // end watch
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-dart-sass');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dev', ['connect', 'dart-sass', 'autoprefixer', 'jshint', 'copy:js', 'processhtml', 'clean:build', 'watch']); // use 'grunt dev' for development
    grunt.registerTask('prod', ['connect', 'dart-sass', 'autoprefixer', 'copy:js', 'uglify', 'cssmin', 'processhtml', 'replace', 'htmlmin', 'clean:release', 'watch']); // use 'grunt prod' for development
    grunt.registerTask('checkjs', ['jshint']);
};
