window.onload = function() {
    const mainBgBottom = document.querySelector('#mainBgBottom');
    const mainBgTop = document.querySelector('#mainBgTop');

    var trianglifyTimer = {
        variance: 1,
        showTop: true,
        increment: true,
        topColorStart: '#2e3192',
        bottomColorStart: '#1b1464'
    };

    const getRandomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    const adjustHslColorHue = (color, amount) => {
        let colorParts = color.split(', ');
        let light = colorParts[0];
        let lightAsNumber = Number(light.replace('%', '').replace('hsl(', ''));
        lightAsNumber += amount;

        if (lightAsNumber < 0) lightAsNumber = 0;
        if (lightAsNumber > 359) lightAsNumber = 359;

        colorParts[0] = lightAsNumber;
        return ('hsl(' + colorParts.join(', '));
    };

    const adjustHslColorSaturation = (color, amount) => {
        let colorParts = color.split(', ');
        let light = colorParts[1];
        let lightAsNumber = Number(light.replace('%', ''));
        lightAsNumber += amount;

        if (lightAsNumber < 30) lightAsNumber = 30;
        if (lightAsNumber > 100) lightAsNumber = 100;

        colorParts[1] = lightAsNumber + '%';
        return colorParts.join(', ');
    };

    const adjustHslColorLight = (color, amount) => {
        let colorParts = color.split(', ');
        let light = colorParts[2];
        let lightAsNumber = Number(light.replace('%)', ''));
        lightAsNumber += amount;

        if (lightAsNumber < 40) lightAsNumber = 40;
        if (lightAsNumber > 95) lightAsNumber = 95;

        colorParts[2] = lightAsNumber + '%';
        return (colorParts.join(', ') + ')');
    };

    function adjustHsl(color, h, s, l) {
        color = adjustHslColorHue(color, h);
        color = adjustHslColorSaturation(color, s);
        color = adjustHslColorLight(color, l);
        return color;
    };

    const getRandomColor = () => {
        const h = getRandomInteger(0, 359);
        const s = getRandomInteger(30, 100);
        const l = getRandomInteger(40, 95);
    
        return `hsl(${h}, ${s}%, ${l}%)`;
    };

    trianglifyAnimation();

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }

    function trianglifyAnimation() {
        trianglifyTimer.showTop = !trianglifyTimer.showTop;

        const xColor = getRandomColor();
        const yColor = getRandomColor();

        let xColor1 = adjustHsl(xColor, -30, -25, -15);
        let xColor2 = adjustHsl(xColor, 30, 25, 15);
        let yColor1 = adjustHsl(yColor, -30, -25, -15);
        let yColor2 = adjustHsl(yColor, 30, 25, 15);

        var pattern = trianglify({
            width: 3840,
            height: 2160,
            variance: trianglifyTimer.variance,
            seed: makeid(10),
            cellSize: getRandomInteger(120, 170),
            xColors: [xColor1, trianglifyTimer.topColorStart, xColor2],
            yColors: [yColor1, trianglifyTimer.bottomColorStart, yColor2]
        });

        let currentToShow = trianglifyTimer.showTop ? mainBgTop : mainBgBottom;

        currentToShow.innerHTML = null;
        currentToShow.appendChild(pattern.toCanvas());

        mainBgTop.style.opacity = trianglifyTimer.showTop ? 1 : 0;

        if (trianglifyTimer.variance >= 30.0) {
            trianglifyTimer.increment = false;
        } else if (trianglifyTimer.variance <= 1.0) {
            trianglifyTimer.increment = true;
        }

        if (trianglifyTimer.increment) {
            trianglifyTimer.variance += 1;
        } else {
            trianglifyTimer.variance -= 1;
        }
    };

    setInterval(trianglifyAnimation, 3000);
    //setInterval(trianglifyAnimation, 500);
};