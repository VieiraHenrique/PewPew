const pink = '#ff8990';
const blue = '#484d6d';
const yellow = '#eab464';
const green = '#57a773';

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const run = document.querySelector('button');
const scoreDisp = document.getElementById('score');
const timeDisp = document.getElementById('time');
const text = document.getElementById('text');


let canon = {
    x: canvas.width / 2,
    y: canvas.height - 80,
    dx: 10,
    dy: 10
}

function drawCanon(){
    c.beginPath();
    c.moveTo(canon.x,canon.y);
    c.lineTo(canon.x+30, canon.y+60);
    c.lineTo(canon.x-30, canon.y+60);
    c.closePath();
    c.fillStyle = yellow;
    c.fill();
}

class Projectile {
    constructor(x,y,radius,color,velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        c.beginPath();
        c.arc(this.x,this.y, this.radius, 0, Math.PI*2);
        c.fillStyle = this.color;
        c.fill();
    }

    update(){
        this.draw()
        this.y = this.y - this.velocity;
    }
}
////////////////////

function randInt(min, max) {
    // max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

class Ennemi {
    constructor(y) {
        this.x = randInt(20, canvas.width-20);
        this.y = y;
        this.radius = randInt(20,40);
        this.color = pink;
    }

    draw(){
        c.beginPath();
        c.arc(this.x,this.y, this.radius, 0, Math.PI*2);
        c.fillStyle = this.color;
        c.fill();
    }
}

////////////////////

const projectiles = [];
const ennemies = [];

ennemies.push(new Ennemi(100));

let score = 0
let playing = false

run.addEventListener('click', ()=>{
    console.log('clicked')
    run.setAttribute('disabled', true);
    timer = 30;
    canvas.style.display = 'block';
    playing = true
    setInterval(()=>{
        timer--
    },1000)
    loop();
})

function endOfGame(){
    playing = false
    timeDisp.innerHTML = '0';
    canvas.style.display = 'none';
    text.innerHTML = `C'est fini ! Votre avez éclaté ${score} ballons en 30 secondes <br> Rafraichissez la page pour jouer encore une fois.`;
    run.style.display = 'none';
}

function loop(){
    if (timer === 0){
        endOfGame();
    }
    if (playing) {
        timeDisp.innerHTML = timer
        c.clearRect(0,0, canvas.width, canvas.height)
        drawCanon();

        projectiles.forEach((proj)=>{
            proj.update()

            if (proj.x >= ennemies[0].x - ennemies[0].radius && proj.x <= ennemies[0].x + ennemies[0].radius && proj.y < 100+ennemies[0].radius && proj.y > 100) {
                ennemies.pop();
                ennemies.push(new Ennemi(100));
                score++
                scoreDisp.innerHTML = score;
            }
        })

        ennemies.forEach((enn)=>{
            enn.draw()
        })

        requestAnimationFrame(loop);
        }
}




document.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowLeft') {
        canon.x -= canon.dx;
        if (canon.x < 30){
            canon.x = 30;
        }
    } else if (e.key === 'ArrowRight'){
        canon.x += canon.dx;
        if (canon.x > canvas.width - 30){
            canon.x = canvas.width - 30;
        }
    }
    else if(e.key === ' ') {
        projectiles.push(new Projectile(canon.x, canon.y, 5, blue, 8))
    }
    
})