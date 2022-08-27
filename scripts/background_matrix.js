const canvas = document.querySelector("canvas"),
    $ = canvas.getContext("2d"),
    WIDTH = canvas.width = window.innerWidth,
    HEIGHT = canvas.height = window.innerHeight,
    FONT_WIDTH = 12,
    COUNT_OF_COLUMNS = Math.floor(WIDTH / FONT_WIDTH),
    CHANCE = 0.5,
    UPDATE_CURVE_INTERVAL = 15,
    RENDER_INTERVAL_MS = 150,
    TEXT_COLOR = "rgb(148,230,100)";

$.font = FONT_WIDTH + "px system-ui";

const ALPHABET = (
    'abcdefghijklmnopqrstuvwxyz' +
    'abcdefghijklmnopqrstuvwxyz'.toUpperCase() +
    '0123456789' +
    '!@#$%^&*-+'
).split('');

let currentCurve = Array(COUNT_OF_COLUMNS),
    updateIterator = UPDATE_CURVE_INTERVAL;

function createCurve(columns, height) {
    const curve = [];

    for (let index = 0; index < columns; index++) curve[index] = [
        WIDTH / COUNT_OF_COLUMNS * index, // X-coordinate
        // Я так же в ручную уменьшаю значение коордианты Y на 20 пикселей.
        // Без этого верхняя часть канваса в момент работы кажется менее
        // живой и заполненной. Почему-то рандом, создающий кривую,
        // чаще выводит координаты, что ближе к концу холста, и отнимание
        // 20 пикселей от результата немного компенсирует это.
        Math.floor(Math.random() * height) - 20 // Y-coordinate
    ];

    return curve;
}

const getRandomMember = arr => arr[Math.floor(Math.random() * arr.length)];

function draw() {
    // Если кривая была зарендерена число раз, записанное
    // в UPDATE_CURVE_INTERVAL, то пришло время нарисовать
    // создать кривую с новыми координатами.
    if (updateIterator === UPDATE_CURVE_INTERVAL)
        updateIterator = 0,
            currentCurve = createCurve(COUNT_OF_COLUMNS, HEIGHT);

    $.fillStyle = "rgba(0,0,0,0.05)";
    $.fillRect(0, 0, WIDTH, HEIGHT);

    $.fillStyle = TEXT_COLOR;

    currentCurve = currentCurve.map(([ x, y ]) => {
        // Шанс (CHANCE) здесь отвечает за то, чтобы между буквами,
        // когда они смещаются по координате Y, оставились пропуски.
        if (CHANCE > Math.random()) $.fillText(getRandomMember(ALPHABET), x, y);

        // Здесь инкрементируем координату Y на каждой вершине кривой,
        // чтобы кривая спускалась вниз при каждой отрисовке.
        return [x, y + FONT_WIDTH];
    });

    updateIterator++;
}

setInterval(draw, RENDER_INTERVAL_MS);