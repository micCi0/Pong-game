
// declaration
const canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d");
console.log(ctx)
// padlle class
class Padlle{
    constructor(x,y,width,height,color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    // function to draw a player
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
    // function to moe paddle
    move(){
        if(keys.keyW.pressed && player1.y>0){
            player1.y--;
        }
        else if(keys.keyS.pressed && player1.y<canvas.height-player1.height){
            player1.y++;
        }
        else if(keys.arrowUp.pressed && player2.y>0){
            player2.y--;
        }
        else if(keys.arrowDown.pressed && player2.y<canvas.height-player2.height){
            player2.y++;
        }
    }

   // update function 
    update(){
        this.draw();
        this.move();
    }
}
// ball class

class Ball{
    constructor(x,y,radius,speedX,speedY,color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }
    // function to draw a circle(ball)
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y , this.radius,0,Math.PI*2);
        ctx.fill();
    }
    move(){
        // update position
        this.x+=this.speedX;
        this.y+=this.speedY;
        //check if the ball hits bottom or top of canvas
        if(this.y + this.radius >=canvas.height || this.y -this.radius <=0){
            this.speedY = -this.speedY;
        }
        // check if ball hits bottom  right or left of canvas
        if(this.x+this.radius>=canvas.width || this.x - this.radius <=0){
            this.speedX = -this.speedX;
        }

      
        // if the ball hit player1
        if(this.x-this.radius<=player1.x + player1.width && this.y>=player1.y && this.y <=player1.y + player1.height){
           let isNegative = false;
           this.calculatePointReflection(player2 , isNegative);
        }
        // if the ball hit player2
        if(this.x+this.radius >=player2.x && this.y >= player2.y && this.y <= player2.y + player2.height){
            let isNegative = true;
            // function to calculate angle
            this.calculatePointReflection(player2 , isNegative);
            console.log("hit");
        }
    }
    calculatePointReflection(player,isNegative){
        // calculate relative padlle position
        const relativePosition = (this.y - player.y) / 240;
        const angle = (2 * relativePosition - 1) * (Math.PI /4);
        // ** power
        const speed = Math.sqrt(this.speedX ** 2 + this.speedY ** 2);
        if(isNegative){
            this.speedX = -speed * Math.cos(angle);
            this.speedY = -speed * Math.sin(angle);
        }
        else{
            this.speedX = speed * Math.cos(angle);
            this.speedY = speed * Math.sin(angle);
        }
    }
   

}
const player1 = new Padlle(20 , 50 , 10,40 , "white");
const player2 = new Padlle(canvas.width-30 , 30 , 10,40 , "white");
const ball = new Ball(10 , 10 , 3 , 2 , 2 , "white")

// object of key that user will use
const keys = {
    keyW:{pressed:false},
    keyS:{pressed:false},
    arrowUp:{pressed:false},
    arrowDown:{pressed:false},
}


// call animate function infinitive
function animate(){
    // clear react
    ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    player1.update();
    player2.update();
    ball.draw();
    ball.move();
    requestAnimationFrame(animate);
}
// call function for animate
animate();

// event listeners
addEventListener("keydown" , ({code}) =>{
    // use switch instead of if , else if 
    switch(code){
        case "KeyW":
            keys.keyW.pressed = true;
            break;
        case "KeyS":
            keys.keyS.pressed = true;
            break;
        case "ArrowUp":
            keys.arrowUp.pressed = true;
            break;
        case "ArrowDown":
            keys.arrowDown.pressed = true;
            break;
    }
})

addEventListener("keyup" , ({code}) =>{
    // use switch instead of if , else if 
    switch(code){
        case "KeyW":
            keys.keyW.pressed = false;
            break;
        case "KeyS":
            keys.keyS.pressed = false;
            break;
        case "ArrowUp":
            keys.arrowUp.pressed = false;
            break;
        case "ArrowDown":
            keys.arrowDown.pressed = false;
            break;
    }
})