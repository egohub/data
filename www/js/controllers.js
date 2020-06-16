angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope) {})
.controller('DashCtrl', function(
    $scope,
    $ionicLoading,
    $timeout,
    MoviesStorage,
    DataLoader
) {
    // $scope.$on('$ionicView.enter', function() {
    $ionicLoading.show({
        template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner> ',
        duration: 3000
    }).then(function() {
        console.log("The loading indicator is now displayed");
    });
    $scope.moreItems = false;

    $scope.loadPosts = function() {
        // Get all of our posts
        DataLoader.get('https://moviechannel.herokuapp.com/api/movie/0').then(
            function(response) {
                $scope.posts = response.data;
                $ionicLoading.hide();
                MoviesStorage.save(response.data);
                $scope.moreItems = true;
            },
            function(response) {
                $ionicLoading.hide();
                console.log(postsApi, response.data);
            }
        );
    };
    $scope.loadPosts();
    paged = 2;
    $scope.loadMore = function() {
        if (!$scope.moreItems) {
            return;
        }
        var pg = paged++;
        console.log('loadMore ' + pg);
        $timeout(function() {
            DataLoader.get(
                'https://moviechannel.herokuapp.com/api/movie/' + pg
            ).then(
                function(response) {
                    angular.forEach(response.data, function(value, key) {
                        $scope.posts.push(value);
                        MoviesStorage.save($scope.posts);
                    });
                    if (response.data.length <= 0) {
                        $scope.moreItems = false;
                    }
                },
                function(response) {
                    $scope.moreItems = false;
                    $log.error(response);
                }
            );
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.resize');
        }, 1000);
    };
    $scope.moreDataExists = function() {
        return $scope.moreItems;
    };

    $scope.doRefresh = function() {
        $timeout(function() {
            $scope.loadPosts();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };
    // })
})

.controller('detailCtrl', [
    '$scope',
    '$sce',
    '$ionicLoading',
    '$stateParams',
    'DataLoader',
    'MoviesStorage',
    function(
        $scope,
        $sce,
        $ionicLoading,
        $stateParams,
        DataLoader,
        MoviesStorage
    ) {

        var data = MoviesStorage.all();
        $scope.news = MoviesStorage.get($stateParams.id);
        this.config = {
            sources: [{
                src: $sce.trustAsResourceUrl($scope.news.sources[0].url),
                type: 'video/mp4',
            }, ],
            // theme: 'https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css',
            theme: 'lib/videogular/videogular.css',
            plugins: {
                poster: $scope.news.image,
            },
        };
    },
])

.controller('ChatsCtrl', function(Comics, $scope, $ionicLoading, Homestorage) {
        $ionicLoading.show({
            template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner> ',
            duration: 3000
        }).then(function() {
            console.log("The loading indicator is now displayed");
        });
        var _this = this;

        Comics.getComics()
            .then(function(response) {
                _this.comics = response.data;
                $scope.genres = response.data.genres;
                Homestorage.save(response.data.genres)
                    //console.log(response.data);
            })
            .catch(function(response) {})
            .finally(function() {
                $ionicLoading.hide();
            });
    })
    .controller('ChatDetailCtrl', function($scope, $ionicLoading, $stateParams, $sce, Homestorage) {
        $scope.$on('$ionicView.enter', function() {
            $ionicLoading.show();
            $scope.news = Homestorage.get($stateParams.id);
            console.log($scope.news.sources[0].url);
            $ionicLoading.hide();
            this.config = {
                sources: [{
                    src: $sce.trustAsResourceUrl($scope.news.sources[0].url),
                    type: 'video/mp4',
                }, ],
                theme: 'https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css',
                // theme: 'lib/videogular/videogular.css',
                plugins: {
                    poster: $scope.news.image,
                },
            };
        });
        //Chats.get($stateParams.chatId);
    })
    .controller('CategoryCtrl', function($scope) {

    })
    .controller('AccountCtrl', function($scope, $ionicLoading, DataLoader, SeriesStorage) {
        $scope.moreItems = false;
        $ionicLoading.show({
            template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner> '
        }).then(function() {
            console.log("The loading indicator is now displayed");
        });
        $scope.loadPosts = function() {
            // Get all of our posts
            DataLoader.get('https://moviechannel.herokuapp.com/api/serie/0').then(
                function(response) {
                    $scope.posts = response.data;
                    $ionicLoading.hide();
                    SeriesStorage.save(response.data);
                    $scope.moreItems = true;
                },
                function(response) {
                    $ionicLoading.hide();

                }
            );
        };
        $scope.loadPosts();
    })

.controller('serieDetailCtrl', function($scope, $ionicLoading, $stateParams, DataLoader, SeriesStorage) {
    $scope.$on('$ionicView.enter', function() {
        $ionicLoading.show();
        $scope.news = SeriesStorage.get($stateParams.id);
        $ionicLoading.hide();

        DataLoader.get('https://moviechannel.herokuapp.com/api/season/' + $stateParams.id).then(function(response) {
            $scope.data = response.data;
            $scope.episodes = response.data[0].episodes;
            console.log(response.data[0].episodes)
        });
        // this.config = {
        //     sources: [{
        //         src: $sce.trustAsResourceUrl($scope.news.sources[0].url),
        //         type: 'video/mp4',
        //     }, ],
        //     theme: 'https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css',
        //     // theme: 'lib/videogular/videogular.css',
        //     plugins: {
        //         poster: $scope.news.image,
        //     },
        // };
    });
});