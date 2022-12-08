const { createCanvas, loadImage } = require('canvas');
const GIFEncoder = require('gifencoder');
const fs = require('fs');

if (process.argv[2] == undefined)
    return console.log('name resx resy pnew[0-100] pswitch[0-100] bias[-100-100] col[000000-ffffff] repeats[0-resy] size delay[ms] transparent[0/1] image[opt]\nthe input is not idiot proof, you should be');

draw();

async function draw() {
    let a = [];
    let b = [];
    let x = parseInt(process.argv[3]);
    let y = parseInt(process.argv[4]);
    let c = parseInt(process.argv[9]);
    let s = parseInt(process.argv[10]);
    let d = c;
    let z = 0;
    while (z <= y / s)
        z += c;
    for (let l = 0; l < z; l++) {
        a.forEach(i => {
            i.y += s;
            if (Math.random() * 100 <= parseInt(process.argv[6])) {
                if (Math.random() >= 0.5)
                    i.x += s;
                else
                    i.x -= s;
            }
            if (Math.random() * 100 <= Math.abs(parseInt(process.argv[7]))) {
                parseInt(process.argv[7]) >= 0 ? i.x++ : i.x--;
            }
            i.x >= x ? i.x = i.x - x : null;
            i.x < 0 ? i.x = i.x + x : null;
        })
        if (c > 0) {
            for (let i = 0; i < x / s; i++) {
                if (Math.random() * 100 <= parseInt(process.argv[5])) {
                    let c = {};
                    c.x = i * s;
                    c.y = 0;
                    a[a.length] = c;
                }
            }
            const can = createCanvas(x, y);
            const cc = can.getContext('2d');
            process.argv[13] != undefined ? cc.drawImage(await loadImage('./' + process.argv[13]), 0, 0, x, y) : null;
            cc.fillStyle = '#' + process.argv[8];
            b.push(cc);
        }
        const ctx = b[l % d];
        a.forEach(el => {
            ctx.fillRect(el.x, el.y, (el.x + s) > x ? x - el.x : s, (el.y + s) > y ? y - el.y : s);
            if (el.x + s > x)
                ctx.fillRect(0, el.y, x - el.x, (el.y + s) > y ? y - el.y : s)
        });
        b[l % d] = ctx;
        c--;
        console.log(l + 1 + '/' + z);
    }
    let j = 0;
    const enc = new GIFEncoder(x, y);
    enc.createReadStream().pipe(fs.createWriteStream(`${process.argv[2]}.gif`));
    enc.start();
    enc.setRepeat(0);
    enc.setDelay(process.argv[11]);
    process.argv[12] ? enc.setTransparent('#000000') : null;
    enc.setQuality(10);
    b.forEach(i => {
        enc.addFrame(i);
        j++;
        console.log(j + '/' + b.length);
    })
    enc.finish();
}