ymaps.ready(['AnimatedLine']).then(init);

let circlePoints = {};
let borderCircles = [];
let sendCoord = [];
let lastDragCoord;

let polyline;
let animatedLine;
var myMap = {};
let simplePath;
let routeJson;
let selectorUav = document.getElementById('choice-uav');
(async () => {
    let response = await fetch('/api/getUav');
    let json = await response.json(); // прочитать тело ответа как текст
    json.forEach(element => {
        option = document.createElement('option');
        option.text = element.name;
        option.value = element.velocity;
        selectorUav.add(option)
    });

})()

let selectorRoute = document.getElementById('choice-route');
(async () => {
    let response = await fetch('/api/getRoute');
    routeJson = await response.json(); // прочитать тело ответа как текст
    routeJson.forEach(element => {
        option = document.createElement('option');
        option.value = option.text = element.name;
        selectorRoute.add(option);
    })
    option = document.createElement('option');
    option.text = 'Создать маршрут'
    option.id = 'CreateRoute'
    option.value = 'Создать маршрут'
    selectorRoute.add(option)
})()

function init() {
    let stopEditBtn = document.getElementById('stop');
    let startEditBtn = document.getElementById('start');
    let nameRoute = document.getElementById('name-route')
    let goPathBtn = document.getElementById('go');
    let choiceUav = document.getElementById('choice-uav');
    let choiceRoute = document.getElementById('choice-route');

    let nameUAV = document.getElementById('nameUAV');
    let nameROUTE = document.getElementById('nameROUTE');
    let speadUAV = document.getElementById('spead');
    let flight_time = document.getElementById('flightTime');
    // let airTime = document.getElementById('airTime');

    async function sendSimplePath(borderCircles, sendCoord, sendSimplePath, myMap) {
        let dict = {
            route: sendCoord
        };
        console.log(JSON.stringify(dict))
        let response = await fetch("http://127.0.0.1:8000/api/OptimizeRoute", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dict)
        });

        

        if (response.ok) {
            let json = await response.json();
            let optimizedPath = json;

            if (typeof polyline === 'object') {
                polyline.geometry.setCoordinates([]);
            }
            polyline = new ymaps.Polyline(optimizedPath, {}, {
                strokeColor: "#dc3545",
                strokeWidth: 4
            });
            myMap.geoObjects.add(polyline);

            let distance = polyline.geometry.getDistance();
            let flightTime = distance / speadUAV.value;
            flight_time.innerHTML = `${Math.round(flightTime)} секунд`


            if (typeof animatedLine === 'object') {
                animatedLine.reset();
            }
            animatedLine = new ymaps.AnimatedLine(optimizedPath, {}, {
                strokeColor: "#198754",
                strokeWidth: 4,
                animationTime: flightTime * 1000
            });
            myMap.geoObjects.add(animatedLine);

            animatedLine.animate(borderCircles, sendCoord, sendSimplePath, myMap).then(function () {
                console.log('Маршрут пройден');
            });

        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    function hangFunc() {
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
                        } else {
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
            } else {
                myMap.balloon.close();
            }
        });
    }

    myMap = new ymaps.Map('map', {
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
        hangFunc();

        simplePath.options.set('editorUseAutoPanInDrawing', false);
        simplePath.editor.startEditing();
        myMap.geoObjects.add(simplePath);
        simplePath.editor.startDrawing();
    };

    stopEditBtn.onclick = function () {
        simplePath.editor.stopDrawing();
    };

    async function sendSimplePath() {
        console.log(sendCoord)

        let dict = {
            route: sendCoord,
            tsp: document.querySelector('#tsp').checked,
            wetzel: document.querySelector('#wetzel').checked,
            overlapping: document.querySelector('#overlapping').checked,
            vel: document.getElementById('spead').value
        };
        let response = await fetch("http://127.0.0.1:8000/api/OptimizeRoute", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dict)
        });

        if (response.ok) {
            let json = await response.json();
            let optimizedPath = json;
            let c1 = Math.random(255)
            let c2 = Math.random(255)
            let c3 = Math.random(255)
            myMap.geoObjects.remove(polyline);
            polyline = new ymaps.Polyline(optimizedPath, {}, {
                strokeColor: `rgba(${c1},${c2},${c3},1)`,
                strokeWidth: 4
            });
            myMap.geoObjects.add(polyline);

            let distance = polyline.geometry.getDistance();
            let flightTime = distance / speadUAV.value;

            myMap.geoObjects.remove(animatedLine);
            animatedLine = new ymaps.AnimatedLine(optimizedPath, {}, {
                strokeColor: "#dc3545",
                strokeWidth: 4,
                animationTime: flightTime * 1000
            });
            myMap.geoObjects.add(animatedLine);

            animatedLine.animate(borderCircles, sendCoord, sendSimplePath).then(function() {
                console.log('Маршрут пройден');
            });

        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }

    goPathBtn.onclick = function() {
        simplePath.editor.stopEditing();
        sendCoord = simplePath.geometry.getCoordinates();
        for (let coord of sendCoord.slice(1, -1)) {
            let circle = new ymaps.Circle([coord, 150], {}, {
                strokeColor: "rgba(0,0,0,0)",
                fill: false,
                strokeWidth: 4
            });
            borderCircles.push(circle);
        }
        for (let coord of sendCoord) {
            let circle = new ymaps.Circle([coord, 15], {}, {
                strokeColor: "#ffc107",
                fillColor: "#fff",
                strokeWidth: 2
            });
            myMap.geoObjects.add(circle)
        }
        borderCircles = ymaps.geoQuery(borderCircles).addToMap(myMap);
        sendSimplePath(borderCircles, sendCoord, sendSimplePath, myMap);
    };
    choiceUav.addEventListener('change', function () {
        document.getElementById('spead').value = this.value;
    });

    choiceRoute.addEventListener('change', function () {
        if (this.value == 'Создать маршрут') {
            startEditBtn.hidden = false;
            stopEditBtn.hidden = false;
            nameRoute.hidden = false;
        } else {
            startEditBtn.hidden = true;
            stopEditBtn.hidden = true;
            nameRoute.hidden = true
            for (let route of routeJson) {
                if (route['name'] == this.value) {
                    simplePath = new ymaps.Polyline(route['points'], {}, {
                        strokeColor: "#ffc107",
                        strokeWidth: 4
                    });
                    for (let coord of simplePath.geometry.getCoordinates()) {
                        let circle = new ymaps.Circle([coord, 15], {}, {
                            strokeColor: "#ffc107",
                            fillColor: "#fff",
                            strokeWidth: 2
                        });
                        myMap.geoObjects.add(circle)
                    }
                    hangFunc();
                    simplePath.options.set('editorUseAutoPanInDrawing', false);
                    simplePath.editor.startEditing();
                    myMap.geoObjects.removeAll();
                    myMap.geoObjects.add(simplePath);
                    break;
                }
            }
        }
        goPathBtn.hidden = false;
    });
}