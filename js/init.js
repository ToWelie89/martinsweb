require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'jquery-2.1.1.min',
        constants: 'constants',
        helpers: 'helpers'
    }
});

require(['main']);