import React, {Component} from 'react';

class Game extends Component {
    componentDidMount() {
        window.addEventListener("load", function(){
    var GAME_WIDTH = 640;
    var GAME_HEIGHT = 360;
    
    var gameLive = true;
    
    var player = {
        x: 10,
        y: 160,
        speedX: 2.5,
        isMoving: false,
        w:40,
        h:40
    }
    
    var goal = {
        x: 580,
        y: 160,
        w: 50,
        h: 36
    }
    
    var enemies = [
        {
            x: 100,
            y: 100,
            speedY: 2,
            w: 40,
            h: 40
        },
        {
            x: 200,
            y: 0,
            speedY: 2,
            w: 40,
            h: 40
        },{
            x: 330,
            y: 100,
            speedY: 3,
            w: 40,
            h: 40
        },{
            x: 450,
            y: 100,
            speedY: 4,
            w: 40,
            h: 40
        }
    ]
    
    var movePlayer = function(){
        player.isMoving = true;
    }
    
    var stopPlayer = function(){
        player.isMoving = false;
    }
    
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');
    
    canvas.addEventListener('mousedown', movePlayer);
    canvas.addEventListener('mouseup', stopPlayer);
    canvas.addEventListener('touchstart', movePlayer);
    canvas.addEventListener('touchend', stopPlayer);
    
    var update = function(){
        if(checkCollision(player, goal)){
            gameLive = false;
            alert("You won!");
            
            window.location = "";
        }
        
        if(player.isMoving){
            player.x = player.x + player.speedX
        }
        
        var i = 0;
        var n = enemies.length;
        
        enemies.forEach(function(e,i){
            if(checkCollision(player,e)){
                gameLive = false;
                alert('You Lost!');
                window.location = "";
            }
            e.y += e.speedY;
            if(e.y <= 10){
                e.y = 10;
                e.speedY *= -1;
            }
            else if(e.y >= GAME_HEIGHT - 50){
                e.y = GAME_HEIGHT - 50;
                e.speedY *= -1;
            }
        })
    }
    
    var draw = function(){
        ctx.clearRect(0,0,GAME_WIDTH, GAME_HEIGHT);
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(player.x, player.y, player.w, player.h);
        ctx.fillStyle = "#ff0000";
        enemies.forEach(function(e,i){
            ctx.fillRect(e.x,e.y,e.w,e.h);
        })
        ctx.fillStyle = "#0000ff";
        ctx.fillRect(goal.x,goal.y,goal.w,goal.h)
    }
    
    var step = function(){
        update();
        draw();
        if(gameLive){
            window.requestAnimationFrame(step);
        }
    }
    
    var checkCollision = function(rect1, rect2){
        var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
        var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
        return closeOnWidth && closeOnHeight;
    }
    
    step();
})    
    }
    render() {
        return (
        	<div>
    			<canvas id="mycanvas" width="640" height="360"></canvas>
        	</div>
        );
    }
}

export default Game;
