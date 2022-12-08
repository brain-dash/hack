ymaps.ready(init);

var stopBtn = document.getElementById('stop');
var startBtn = document.getElementById('start');
var goBtn = document.getElementById('go');
var testBtn = document.getElementById('test');

function init() {
    var myPolyline;
    var myMap = new ymaps.Map('map', {
        center: [55.76, 37.64], // Москва
        zoom: 14,
        type: 'yandex#satellite',
        controls: ["zoomControl"],
    });
    myMap.behaviors.disable(['rightMouseButtonMagnifier','scrollZoom','']);

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
        console.log(myPolyline.geometry.getCoordinates());
    };
    goBtn.onclick = function () {
        console.log(myPolyline.geometry.getCoordinates());
    };
}
