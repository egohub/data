angular.module('starter.services', [])


.factory('MoviesStorage', function() {
        return {
            all: function() {
                var movies = window.localStorage['movies'];
                if (movies) {
                    return angular.fromJson(movies);
                }
                return {};
            },
            get: function(id) {
                var contents = window.localStorage['movies'];
                var content = angular.fromJson(contents);
                for (var i = 0; i < content.length; i++) {
                    if (content[i].id === parseInt(id)) {
                        console.log(content[i]);
                        return content[i];
                    }
                }
                return null;
            },
            save: function(movies) {
                window.localStorage['movies'] = angular.toJson(movies);
            },
            clear: function() {
                window.localStorage.removeItem('movies');
            },
        };
    })
    .factory('SeriesStorage', function() {
        return {
            all: function() {
                var movies = window.localStorage['series'];
                if (series) {
                    return angular.fromJson(series);
                }
                return {};
            },
            get: function(id) {
                var contents = window.localStorage['series'];
                var content = angular.fromJson(contents);
                for (var i = 0; i < content.length; i++) {
                    if (content[i].id === parseInt(id)) {
                        console.log(content[i]);
                        return content[i];
                    }
                }
                return null;
            },
            save: function(series) {
                window.localStorage['series'] = angular.toJson(series);
            },
            clear: function() {
                window.localStorage.removeItem('series');
            },
        };
    })
    .factory('Homestorage', function() {
        return {
            all: function() {
                var home = window.localStorage['home'];
                if (home) {
                    return angular.fromJson(home);
                }
                return {};
            },
            get: function(id) {
                var contents = window.localStorage['home'];
                var content = angular.fromJson(contents);

                console.log(content);
                // for (var i = 0; i < content.length; i++) {
                //   var poster = content[i].posters;
                //     if (poster.id === parseInt(id)) {
                //         console.log(content[i]);
                //         return content[i];
                //     }
                // }
                for (var i = 0; i < content.length; i++) {
                    var poster = content[i].posters;
                    //console.log(content[i].posters);
                    for (var j = 0; j < poster.length; j++) {
                        if (poster[j].id === parseInt(id)) {
                            // console.log(poster[j]);
                            return poster[j];
                        }
                    }
                }
                return null;
            },
            save: function(home) {
                window.localStorage['home'] = angular.toJson(home);
            },
            clear: function() {
                window.localStorage.removeItem('home');
            },
        };
    })
    // DataLoader
    .factory('DataLoader', function($http) {
        return {
            get: function(url) {
                // Simple index lookup
                return $http.get(url);
            },
        };
    })

//movies
.factory('Movies', function($http) {
        var dataSource =
            'https://samcroft.co.uk/comics-app/comics?callback=JSON_CALLBACK';

        var url = 'https://egohub.github.io/data/api/movies.json';

        return {
            getMovies: function() {
                return $http.get(url);
            },
            getMovie: function(comicId) {
                return $http.get('https://egohub.github.io/data/starwar/' + comicId);
            },
        };
    })
    .factory('Comics', function($http) {
        var dataSource =
            'https://samcroft.co.uk/comics-app/comics?callback=JSON_CALLBACK';

        var url = 'https://egohub.github.io/data/starwar/comics.json';

        return {
            getComics: function() {
                return $http.get('https://moviechannel.herokuapp.com/api/first');
            },
            getComic: function(comicId) {
                return $http.get('https://egohub.github.io/data/starwar/' + comicId);
            },
        };
    });