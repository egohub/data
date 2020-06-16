// Ionic Starter App
angular
    .module('starter', [
        'ionic',
        'starter.controllers',
        'starter.services',
        'ksSwiper',
        'ionic.contrib.ui.hscrollcards',
        'com.2fdevs.videogular',
        'com.2fdevs.videogular.plugins.controls',
        'com.2fdevs.videogular.plugins.overlayplay',
        'com.2fdevs.videogular.plugins.poster',
    ])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'www/templates/tabs.html'
    })


    .state('tab.dash', {
            url: '/dash',
            views: {
                'tab-dash': {
                    templateUrl: 'www/templates/tab-dash.html',
                    controller: 'DashCtrl'
                }
            }
        })
        .state('tab.detail', {
            url: '/dash/:id',
            views: {

                'tab-dash': {
                    templateUrl: 'www/templates/detail.html',
                    controller: 'detailCtrl'
                }
            }
        })

    .state('tab.movies', {
            url: '/movies',
            views: {
                'tab-movies': {
                    templateUrl: 'www/templates/tab-movies.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.chatdetail', {
            url: '/movies/:id',
            views: {
                'tab-movies': {
                    templateUrl: 'www/templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })
        .state('tab.category', {
            url: '/chats/:id',
            views: {
                'tab-chats': {
                    templateUrl: 'www/templates/category.html',
                    controller: 'CategoryCtrl'
                }
            }
        })
        .state('tab.series', {
            url: '/series',
            views: {
                'tab-series': {
                    templateUrl: 'www/templates/tab-series.html',
                    controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.seriedetail', {
            url: '/series/:id',
            views: {
                'tab-series': {
                    templateUrl: 'www/templates/serie-detail.html',
                    controller: 'serieDetailCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise('/tab/movies');

});
