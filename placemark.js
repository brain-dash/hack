ymaps.ready(['AnimatedLine']).then(init);

var stopBtn = document.getElementById('stop');
var startBtn = document.getElementById('start');
var goBtn = document.getElementById('go');
var testBtn = document.getElementById('test');

var nameUAV = document.getElementById('nameUAV');
var nameROUTE = document.getElementById('nameROUTE');

function init() {
    var myPolyline;
    var myMap = new ymaps.Map('map', {
        center: [55.76, 37.64], // Москва
        zoom: 14,
        type: 'yandex#satellite',
        controls: ["zoomControl"],
    });
    myMap.behaviors.disable(['rightMouseButtonMagnifier', 'scrollZoom']);

    startBtn.onclick = function () {
        myPolyline = new ymaps.Polyline([], {}, {
            strokeColor: "rgba(255,0,0,0.7)",
            strokeWidth: 4,
            // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
            editorMenuManager: function (items) {
                items.push({
                    title: "Удалить линию",
                    onClick: function () {
                        myMap.geoObjects.remove(myPolyline);
                    }
                });
                return items;
            }
        });

        myPolyline.editor.startEditing();
        myMap.geoObjects.add(myPolyline);
        myPolyline.editor.startDrawing();
    };

    stopBtn.onclick = function () {
        myPolyline.editor.stopDrawing();
    };

    goBtn.onclick = function () {
        var dict = {
            uav_id: nameUAV.value,
            route_name: nameUAV.value,
            route: myPolyline.geometry.getCoordinates()
        };

        console.log(JSON.stringify(dict));
        myPolyline.editor.stopEditing();

    };

    testBtn.onclick = function () {
        var firstAnimatedLine = new ymaps.AnimatedLine(myPolyline.geometry.getCoordinates(), {}, {
            strokeColor: random_rgba(),
            strokeWidth: 5,
            animationTime: 10000
        });
        myMap.geoObjects.add(firstAnimatedLine);
        firstAnimatedLine.animate().then(function () {
            console.log('Маршрут построен');
        })
    };

    function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }
}
