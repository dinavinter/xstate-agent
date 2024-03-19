const frequency = .3, contrast = 6;
const colors = [];

function RGB2Color(r,g,b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n) {
    let nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

let str = '', css = [];
for (let i = 0; i < 32; ++i)
{
    let red, green, blue;
    red   = Math.sin(frequency*i + 0) * 127 + 128;
    green = Math.sin(frequency*i + 2) * 127 + 128;
    blue  = Math.sin(frequency*i + 4) * 127 + 128;

    if ( i % contrast == 0){
        let color = RGB2Color(red,green,blue);
        colors.push(color);

        str += '%c█';
        css.push(`color:${color};`);
    }
}

console.log.apply(console, [str].concat(css));

let colorIdx = 0;
export function getNextColor(){
    if(colorIdx == colors.length){
        colorIdx = 0;
    }
    return colors[colorIdx++];
}