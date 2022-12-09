ymaps.modules.define('AnimatedLine', [
    'util.defineClass',
    'Polyline',
    'vow'
], function (provide, defineClass, Polyline, vow) {
    /**
     * @fileOverview Анимированная линия.
     */
    /**
     * Создает экземпляр анимированной линии.
     * @class AnimatedLine. Представляет собой геообъект с геометрией geometry.LineString.
     * @param {Boolean} [options.animationTime ] Длительность анимации.
     **/
    function AnimatedLine(geometry, properties, options) {
        AnimatedLine.superclass.constructor.call(this, geometry, properties, options);
        this._loopTime = 25;
        this._animationTime = this.options.get('animationTime');
        // Вычислим длину переданной линии.
        let distance = 0;
        let previousElem = geometry[0];
        this.geometry.getCoordinates().forEach(function (elem) {
            distance += getDistance(elem, previousElem);
            previousElem = elem;
        });
        // Вычислим минимальный интервал отрисовки.
        this._animationInterval = distance / this._animationTime * this._loopTime;
        // Создадим массив с более частым расположением промежуточных точек.
        this._smoothCoords = generateSmoothCoords(geometry, this._animationInterval);
    }
    defineClass(AnimatedLine, Polyline, {
        // Анимировать линию.
        start: function () {
            let value = 0;
            let coords = this._smoothCoords;
            let line = this;
            let loopTime = this._loopTime;
            let parentMap = this.getParent().getMap();
            let p = new ymaps.Placemark([], {}, {
                iconLayout: 'default#image',
                iconImageHref: 'uav.svg',
                iconImageSize: [30, 30],
                iconImageOffset: [-15, -15]
            });
            parentMap.geoObjects.add(p);

            // Будем добавлять по одной точке каждые 25 мс.
            function loop(value, currentTime, previousTime) {
                if (value < coords.length) {
                    if (!currentTime || (currentTime - previousTime) > loopTime) {
                        line.geometry.set(value, coords[value]);

                        p.geometry.setCoordinates(coords[value]);

                        value++;
                        previousTime = currentTime;
                    }
                    requestAnimationFrame(function (time) {
                        loop(value, time, previousTime || time)
                    });
                } else {
                    // Бросаем событие окончания отрисовки линии.
                    line.events.fire('animationfinished');
                }
            }

            loop(value);
        },
        // Убрать отрисованную линию.
        reset: function () {
            this.geometry.setCoordinates([]);
        },
        // Запустить полный цикл анимации.
        animate: function () {
            this.reset();
            this.start();
            let deferred = vow.defer();
            this.events.once('animationfinished', function () {
                deferred.resolve();
            });
            return deferred.promise();
        }

    });
    // Функция генерации частых координат по заданной линии.
    function generateSmoothCoords(coords, interval) {
        let smoothCoords = [];
        smoothCoords.push(coords[0]);
        for (let i = 1; i < coords.length; i++) {
            let difference = [coords[i][0] - coords[i - 1][0], coords[i][1] - coords[i - 1][1]];
            let maxAmount = Math.max(Math.abs(difference[0] / interval), Math.abs(difference[1] / interval));
            let minDifference = [difference[0] / maxAmount, difference[1] / maxAmount];
            let lastCoord = coords[i - 1];
            while (maxAmount > 1) {
                lastCoord = [lastCoord[0] + minDifference[0], lastCoord[1] + minDifference[1]];
                smoothCoords.push(lastCoord);
                maxAmount--;
            }
            smoothCoords.push(coords[i])
        }
        return smoothCoords;
    }
    // Функция нахождения расстояния между двумя точками на плоскости.
    function getDistance(point1, point2) {
        return Math.sqrt(
            Math.pow((point2[0] - point1[0]), 2) +
            Math.pow((point2[1] - point1[1]), 2)
        );
    }
    provide(AnimatedLine);
});