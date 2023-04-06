module.exports = function (config) {
    config.set({

        basePath: './',

        files: [
			'test/*.js',
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
			'karma-coverage'
        ],

		reporters: ['progress', 'coverage'],

        preprocessors: {
			'app/**/*.js': ['coverage']
        },

		coverageReporter: {
			type : 'html',
			dir : 'coverage/'
		},

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
