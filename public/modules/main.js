'use strict';

require.config({
    waitSeconds: 60,
    //TODO remove for public applications, we just want to avoid caching for local debugging
    //still, we don't 100% refreshed cache because it would prevent us from using client-side breakpoints
    urlArgs: 'cb=' + Math.floor(new Date().valueOf() / 100000).toString(), // changes each minute
    paths: {
        angular: '../../lib/angular/angular.min',
        jquery:'../../lib/jquery/jquery.min',
        bootstrap:'../../lib/bootstrap/dist/js/bootstrap.min',
        angularRoute: '../../lib/angular-resource/angular-resource',
        angularCookies: '../../lib/angular-cookies/angular-cookies',
        angularUI: '../../lib/angular-bootstrap/ui-bootstrap-tpls.min',
        fastClick: '../../lib/fastclick/fastclick',
        angularAutofill: '../../lib/autofill-directive/autofill-directive'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        angularRoute: {
            deps: ['angular']
        },
        angularCookies: {
            deps: ['angular']
        },
        angularUI: {
            deps: ['angular']
        },
        angularAutofill: {
            deps: ['angular']
        }

    }
});

require([
    'angular',
    'jquery'
], function (angular) {
    angular.bootstrap(document, ['meanp']);
});
