ymaps.ready(['AnimatedLine']).then(init);

let circlePoints = {};
let borderCircles = [];
let sendCoord = [];
let lastDragCoord;
let simplePath;

function init() {
    let stopEditBtn = document.getElementById('stop');
    let startEditBtn = document.getElementById('start');
    let goPathBtn = document.getElementById('go');
    let TESTBTN = document.getElementById('test');

    let nameUAV = document.getElementById('nameUAV');
    let nameROUTE = document.getElementById('nameROUTE');
    let speadUAV = document.getElementById('spead');

    let myMap = new ymaps.Map('map', {
        center: [44.955105, 37.301576], // Анапа
        zoom: 15,
        type: 'yandex#satellite',
        controls: ["zoomControl"],
    });
    myMap.behaviors.disable(['rightMouseButtonMagnifier', 'scrollZoom']);

    startEditBtn.onclick = function () {
        myMap.geoObjects.removeAll();
        simplePath = new ymaps.Polyline([], {}, {
            strokeColor: "#ffc107",
            strokeWidth: 4
        });

        simplePath.editor.events.add('vertexdragend', function (e) {
            if (Object.keys(circlePoints).includes(lastDragCoord.join())) {
                let newCoord = e.get('vertexModel').geometry.getCoordinates();
                circlePoints[lastDragCoord][1].geometry.setCoordinates(newCoord);
                circlePoints[newCoord] = circlePoints[lastDragCoord];
                delete circlePoints[lastDragCoord];
            }
        });

        simplePath.editor.events.add('beforevertexdragstart', function (e) {
            lastDragCoord = e.get('vertexModel').geometry.getCoordinates();
        });

        simplePath.geometry.events.add('change', function (e) {
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

        simplePath.editor.options.set('dblClickHandler', function (e) {
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

        simplePath.options.set('editorUseAutoPanInDrawing', false);
        simplePath.editor.startEditing();
        myMap.geoObjects.add(simplePath);
        simplePath.editor.startDrawing();
    };

    stopEditBtn.onclick = function () {
        simplePath.editor.stopDrawing();
    };

    async function sendSimplePath() {
        let dict = {
            uav_id: nameUAV.value,
            route_name: nameROUTE.value,
            route: sendCoord
        };
        console.log(JSON.stringify(dict));

        let response = await fetch("");

        if (response.ok) {
            let json = await response.json();

        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    goPathBtn.onclick = function () {
        simplePath.editor.stopEditing();
        sendCoord = simplePath.geometry.getCoordinates();
        for (let coord of sendCoord.slice(1, -1)) {
            let circle = new ymaps.Circle([coord, 150], {}, {
                strokeColor: "#ffc107",
                fill: false,
                strokeWidth: 4
            });
            borderCircles.push(circle);
        }
        borderCircles = ymaps.geoQuery(borderCircles).addToMap(myMap);
        sendSimplePath();
    };

    TESTBTN.onclick = function () {
        let optimizedPath = simplePath.geometry.getCoordinates();

        let polyline = new ymaps.Polyline(optimizedPath, {}, {
            strokeColor: "rgba(0,0,0,1)",
            strokeWidth: 4
        });
        myMap.geoObjects.add(polyline);

        let distance = polyline.geometry.getDistance();
        let flightTime = distance / speadUAV.value;


        let animatedLine = new ymaps.AnimatedLine(optimizedPath, {}, {
            strokeColor: "#dc3545",
            strokeWidth: 4,
            animationTime: flightTime * 1000
        });
        myMap.geoObjects.add(animatedLine);

        animatedLine.animate(borderCircles, sendCoord).then(function () {
            console.log('Маршрут пройден');
        })
    };
}