let movement={x:0,y:0};
const eatSound= new Audio('food.mp3')
const overSound= new Audio('gameover.mp3')
const moveSound= new Audio('move.mp3')
const bgSound= new Audio('music.mp3')
let level=8;
let lastTime=0;
let score=0;
let posArr=[
    {x:11,y:11}
];
let food={x:5,y:6}
const diffArr=[{name:'easy', speed:8},
                {name:'medium',speed:15},
                {name:'hard',speed:25}
];


//Game function

//Changing the difficulty of the game 
//basically increasing the movement of  the snake
function changeDiff(ind){
    level=diffArr[ind].speed;
}

//setting the screen refreshment time
function main(ctime){
    window.requestAnimationFrame(main);
    if(((ctime-lastTime)/1000)<1/level) return;
    lastTime=ctime;
    gameEngine();

}


//check collision
function isCollide(posArr){
    //if the snake bumps into itself
    for(let i=1;i<posArr.length;i++){
        if(posArr[0].x ===posArr[i].x && posArr[0].y===posArr[i].y)
            return true;
}
    // if the snake bumps into any of the wall
    if(posArr[0].x>=21 || posArr[0].x<=0 || posArr[0].y>=21 || posArr[0].y<=0)
        return true;
    return false;
}

//main game function
function gameEngine(){
    // Part 1:Update the food and snake

    //check if the snake collided with the walls or itself
    if(isCollide(posArr)){
        overSound.play();
        movement={x:0,y:0};
        alert("Game Over. Press ok to play again...");
        posArr=[{x:11,y:11}];
        // bgSound.play();
        score=0;
        scoreCard.innerHTML="Score : "+score;
        document.getElementById('easy').classList.add('clicked');
        document.getElementById('medium').classList.remove('clicked');
        document.getElementById('hard').classList.remove('clicked');
        level=8

    }

    //Eating the food and growing in size
    if(posArr[0].y===food.y && posArr[0].x===food.x){
        eatSound.play();
        score+=1;
        if(score>hival){
            hival=score;
            localStorage.setItem("hiscore", JSON.stringify(hival));
            hiScoreCard.innerHTML="HiScore : "+hival;
        }
        scoreCard.innerHTML="Score : "+score;
        //The JavaScript Array unshift() Method is used to add one or more elements to the beginning of the given array.
        posArr.unshift({x:posArr[0].x+movement.x , y:posArr[0].y+movement.y});
        let a =2;
        let b =19;
        food ={x:Math.round(a+(b-a)*Math.random()),y: Math.round(a + (b-a)* Math.random())}
    }
    //moving the snake after eating
    //itrating through the whole body of the snake from the second last part to the 0th
    for(let i=posArr.length-2;i>=0;i--){
        posArr[i+1]={...posArr[i]};
    }



    //movement of snake
    posArr[0].x+=movement.x;
    posArr[0].y+=movement.y;

    //Part 2:Display the snake and food
    //displaying snake
    board.innerHTML = "";
    posArr.forEach((e,index)=>{
        let snakeElement= document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0)
            snakeElement.classList.add('head');
        else    
            snakeElement.classList.add('snakeBody');

        board.appendChild(snakeElement);
    });
    //displaying food
    foodElement= document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}



window.requestAnimationFrame(main);
//main game logic
//up,down, left, right movement 
let hiscore= localStorage.getItem("hiscore");
if(hiscore===null)
{
    hival=0;
    localStorage.setItem("hiscore",JSON.stringify(hival));
}else{
    hival=JSON.parse(hiscore);
    hiScoreCard.innerHTML="HiScore : "+hiscore;
}
window.addEventListener('keydown',e=>{
    movement={x:0,y:1};
    moveSound.play();
    switch(e.key){
        case "ArrowUp": 
            console.log("up");

            movement.x=0;
            movement.y=-1;
            break;
        case "ArrowDown": 
            console.log("down");

            movement.x=0;
            movement.y=1;
            break;
        case "ArrowLeft": 
            console.log("left");

            movement.x=-1;
            movement.y=0;
            break;
        case "ArrowRight": 
            console.log("right");

            movement.x=1;
            movement.y=0;
            break;
    }
})

//choosing the difficulty level
document.getElementById('easy').addEventListener('click',()=>{  
    changeDiff(0);
    document.getElementById('easy').classList.add('clicked');
    document.getElementById('medium').classList.remove('clicked');
    document.getElementById('hard').classList.remove('clicked');

});

document.getElementById('medium').addEventListener('click',()=>{changeDiff(1)
    document.getElementById('easy').classList.remove('clicked');
    document.getElementById('medium').classList.add('clicked');
    document.getElementById('hard').classList.remove('clicked');
});
document.getElementById('hard').addEventListener('click',()=>{changeDiff(2)
    document.getElementById('easy').classList.remove('clicked');
    document.getElementById('medium').classList.remove('clicked');
    document.getElementById('hard').classList.add('clicked');
});