'use strict';

var app = angular.module('galeriaAppControllers', []);

app.controller('thumbnailCtrl', [function() {
        var imageLoader = document.getElementById('input_image');

        if (imageLoader) {
            imageLoader.addEventListener('change', handleImage, false);
        }

        function handleImage(e) {
            e.preventDefault && e.preventDefault();
            var image, canvas, i;
            var images = 'files' in e.target ? e.target.files : 'dataTransfer' in e ? e.dataTransfer.files : [];
            if (images && images.length) {
                for (i in images) {
                    if (typeof images[i] != 'object') {
                        continue;
                    }
                    image = new Image();
                    image.src = createObjectURL(images[i]);
                    image.onload = function(e) {
                        var mybase64resized = resizeCrop(e.target, 250, 200).toDataURL('image/jpg', 90);
                        var thumb = document.getElementById('thumbnail');
                        var inputText = document.getElementById('input_image_base64');
                        thumb.src = mybase64resized;
                        inputText.value = mybase64resized;
                    }
                }
            }
        }

        function resizeCrop(src, width, height) {
            var crop = width == 0 || height == 0;
            // not resize
            if (src.width && width && height == 0) {
                height = src.height * (width / src.width);
            }

            // check scale
            var xscale = width / src.width;
            var yscale = height / src.height;
            var scale = crop ? Math.min(xscale, yscale) : Math.max(xscale, yscale);
            // create empty canvas
            var canvas = document.createElement("canvas");
            canvas.width = width ? width : Math.round(src.width * scale);
            canvas.height = height ? height : Math.round(src.height * scale);
            canvas.getContext("2d").scale(scale, scale);
            // crop it top center
            canvas.getContext("2d").drawImage(src, ((src.width * scale) - canvas.width) * -.5, ((src.height * scale) - canvas.height) * -.5);
            return canvas;
        }

        function createObjectURL(i) {
            var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
            return URL.createObjectURL(i);
        }
    }]);

app.factory('galeriaService', ['$rootScope', function($rootScope) {
        var service = {};
        service.url = {};
        service.descripcion = 'Sin descripción';

        service.select = function(id, descripcion) {
            service.url = '/image/' + id;
            service.descripcion = descripcion;
            broadcastImageSelected();
        };

        var broadcastImageSelected = function() {
            $rootScope.$broadcast('imageSelected');
        };
        
        return service;
    }]);

app.controller('galeriaCtrl', ['$scope', 'galeriaService', function($scope, galeriaService) {
        $scope.selectImage = function(id, descripcion) {
            galeriaService.select(id, descripcion);
        };
        
        $scope.$on('imageSelected', function() {
            $scope.url = galeriaService.url;
            $scope.descripcion = galeriaService.descripcion;
        });
    }]);