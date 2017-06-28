const getColor = (c,n,i,d) => {
    for(i=3;i--;c[i]=d<0?0:d>255?255:d|0)d=c[i]+n;return c
};

const getColorAsHex = (rgb, offset) => {
    const color = getColor(rgb, offset);

    let r = color[0].toString(16);
    let g = color[1].toString(16);
    let b = color[2].toString(16);

    r = (r.length === 1) ? ('0' + r) : r;
    g = (g.length === 1) ? ('0' + g) : g;
    b = (b.length === 1) ? ('0' + b) : b;

    const newColor = '#' + r + g + b;
    return newColor;
};

export {getColorAsHex};