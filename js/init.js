require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'libs/jquery-2.1.1.min',
        constants: 'constants',
        helpers: 'helpers',
        modernizr: 'libs/modernizr.custom',
        menu: 'menu',
        main: 'main',
        angularLib: 'libs/angular.min'
    }
});

require(['main']);