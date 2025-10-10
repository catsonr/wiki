//let gradient = "`.-':_,^=;><+!rc*/z?sLTv)J7(|FiC}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@".slice('');
let gradient = "ပ၁CƆᑎ⋂ՈႶ؟ඞ".slice('');

function rgb_to_gradient(rgb) {
    if(rgb >= 255) return gradient[gradient.length - 1]
    else if(rgb <= 0) return gradient[0]; 

    return gradient[ Math.floor(rgb / (255 / gradient.length)) ];
}

let img = new Image();
img.src = './img/seedsingle.png';

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
div = document.getElementById("amongus");

// draws hex thing and loads greyscale image 
async function generate() {
    
    canvas.width = img.width;
    canvas.height = img.height;
    
    ctx.drawImage(img, 0, 0);
    
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let text = '';
    
    let data = imageData.data;
    for(let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;        // r
        data[i + 1] = avg;    // g
        data[i + 2] = avg;    // b
        // i + 3 ~ alpha

        if(i % img.width == 0 && i != 0) {
            text += '\n';
        }
        
        text += rgb_to_gradient(avg);
    }
    
    div.innerText = text;
}

// displays greyscale image 
async function display() {
    ctx.putImageData(imageData, 0, 0);
    document.body.appendChild(canvas);
}

img.onload = generate;
