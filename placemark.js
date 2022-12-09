ymaps.ready(['AnimatedLine']).then(init);

let stopBtn = document.getElementById('stop');
let startBtn = document.getElementById('start');
let goBtn = document.getElementById('go');
let testBtn = document.getElementById('test');

let nameUAV = document.getElementById('nameUAV');
let nameROUTE = document.getElementById('nameROUTE');
let speadUAV = document.getElementById('spead');
let circlePoints = {};
let lastDragCoord;

function init() {
    let myPolyline;
    let myMap = new ymaps.Map('map', {
        center: [55.76, 37.64], // Москва
        zoom: 14,
        type: 'yandex#satellite',
        controls: ["zoomControl"],
    });
    myMap.behaviors.disable(['rightMouseButtonMagnifier', 'scrollZoom']);

    startBtn.onclick = function () {
        myPolyline = new ymaps.Polyline([], {}, {
            strokeColor: "#ffc107",
            strokeWidth: 4
        });

        myPolyline.editor.events.add('vertexdragend', function (e) {
            if (Object.keys(circlePoints).includes(lastDragCoord.join())) {
                let newCoord = e.get('vertexModel').geometry.getCoordinates();
                circlePoints[lastDragCoord][1].geometry.setCoordinates(newCoord);
                circlePoints[newCoord] = circlePoints[lastDragCoord];
                delete circlePoints[lastDragCoord];
            }
        });

        myPolyline.editor.events.add('beforevertexdragstart', function (e) {
            lastDragCoord = e.get('vertexModel').geometry.getCoordinates();
        });

        myPolyline.geometry.events.add('change', function (e) {
            let oldCoord = new Set(e.get('oldCoordinates'));
            let newCoord = new Set(e.get('newCoordinates'));
            if (newCoord.size < oldCoord.size) {
                let diff = [...oldCoord].filter(x => !newCoord.has(x));
                if (Object.keys(circlePoints).includes(diff.join())) {
                    myMap.geoObjects.remove(circlePoints[diff][1]);
                    delete circlePoints[diff];
                }
            }
        });

        myPolyline.editor.options.set('dblClickHandler', function (e) {
            if (!myMap.balloon.isOpen()) {
                let coords = e.geometry.getCoordinates();
                myMap.balloon.open(coords, {
                    contentHeader: 'Задать',
                    contentBody: `Кол-во кругов <input id="circle" type="text" value="${Object.keys(circlePoints).includes(coords.join()) ? circlePoints[coords][0] : 1}">`,
                    contentFooter: '<button id="save">Сохранить</button><button id="del">Удалить</button>',
                });
                myMap.balloon.events.add('open', function () {
                    let saveBtn = document.getElementById('save');
                    let delBtn = document.getElementById('del');
                    let circle = document.getElementById('circle');
                    saveBtn.onclick = function () {
                        if (!Object.keys(circlePoints).includes(coords.join())) {
                            let p = new ymaps.Placemark(coords, {}, {
                                preset: 'islands#circleIcon',
                                iconColor: "#ffc107"
                            });
                            myMap.geoObjects.add(p);
                            circlePoints[coords] = [circle.value, p];
                        }
                        else {
                            let tmp = circlePoints[coords];
                            circlePoints[coords] = [circle.value, tmp[1]];
                        }
                        myMap.balloon.close();
                    };
                    delBtn.onclick = function () {
                        if (Object.keys(circlePoints).includes(coords.join())) {
                            myMap.geoObjects.remove(circlePoints[coords][1]);
                            delete circlePoints[coords];
                        }
                    };
                });
            }
            else {
                myMap.balloon.close();
            }
        });

        myPolyline.options.set('editorUseAutoPanInDrawing', false);
        myPolyline.editor.startEditing();
        myMap.geoObjects.add(myPolyline);
        myPolyline.editor.startDrawing();
    };

    stopBtn.onclick = function () {
        myPolyline.editor.stopDrawing();
    };

    goBtn.onclick = function () {
        let dict = {
            uav_id: nameUAV.value,
            route_name: nameUAV.value,
            route: myPolyline.geometry.getCoordinates()
        };
        console.log(JSON.stringify(dict));
        myPolyline.editor.stopEditing();
    };

    testBtn.onclick = function () {
        let distance = myPolyline.geometry.getDistance();
        let spead = speadUAV.value;
        let flightTime = distance / spead;
        console.log(`Расчетное время в пути ${flightTime} секунд`);

        let firstAnimatedLine = new ymaps.AnimatedLine(myPolyline.geometry.getCoordinates(), {}, {
            strokeColor: "#198754",
            strokeWidth: 5,
            animationTime: flightTime * 1000
        });
        myMap.geoObjects.add(firstAnimatedLine);
        firstAnimatedLine.animate().then(function () {
            console.log('Маршрут пройден');
        })
    };
}
