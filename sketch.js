const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var particle;
var turn = 0;
var divisionHeight=300;
var score = 0;

var play = 1;
var end = 0;
var gamestate = play;



function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

}
 
function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,30);
  text("1,500",20,500);
  text("100",100,500);
  text("1,000",180,500);
  text("600",260,500);
  text("300",340,500);
  text("300",420,500);
  text("600",500,500);
  text("1,000",580,500);
  text("100",660,500);
  text("1,500",740,500);
  text("Use mouse to drop the ball",200,30);
  Engine.update(engine);

  fill("yellow");
  rect(400,475,800,10);
 
  ground.display();
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   if(frameCount%60===0){
  //   particles.push(new Particle(random(320,480), 10,10));
   }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   if(particle != null){
    particle.display();
    
    if(particle.body.position.y > 750){
      if(particle.body.position.x > 0 && particle.body.position.x < 80 || particle.body.position.x > 720 && particle.body.position.x < 800){
        score = score + 1500;
        Matter.Body.setPosition(particle.body, {x:6000,y:600});
        turn++
        if(turn >= 5){
          gamestate = end;
        }
      }
      if(particle.body.position.x > 80 && particle.body.position.x < 160 || particle.body.position.x > 640 && particle.body.position.x < 720){
        score = score + 100;
        Matter.Body.setPosition(particle.body, {x:6000,y:600});
        turn++
        if(turn >= 5){
          gamestate = end;
        }
      }
      if(particle.body.position.x > 160 && particle.body.position.x < 240 || particle.body.position.x > 560 && particle.body.position.x < 640){
        score = score + 1000;
        Matter.Body.setPosition(particle.body, {x:6000,y:600});
        turn++
        if(turn >= 5){
          gamestate = end;
        }
      }
      if(particle.body.position.x > 240 && particle.body.position.x < 320 || particle.body.position.x > 480 && particle.body.position.x < 560){
        score = score + 600;
        Matter.Body.setPosition(particle.body, {x:6000,y:600});
        turn++
        if(turn >= 5){
          gamestate = end;
        }
      }
      if(particle.body.position.x > 320 && particle.body.position.x < 400 || particle.body.position.x > 400 && particle.body.position.x < 480){
        score = score + 300;
        Matter.Body.setPosition(particle.body, {x:6000,y:600});
        turn++
        if(turn >= 5){
          gamestate = end;
        }
      }
    }
   }

   if(gamestate == end){
     textSize(40);
     text("Game Over",260,350);
     textSize(20);
     if(score >= 6500){
       text("God Rank",600,30);
     }
     else if(score >= 5000 && score < 6500){
       text("Master Rank",600,30);
     }
     else if(score >= 3600 && score < 5000){
       text("Expert Rank",600,30);
     }
     else if(score >= 2500 && score < 3600){
       text("Star Rank",600,30);
     }
     else if(score >= 1600 && score < 2500){
       text("Amateur Rank",600,30);
     }
     else if(score >= 1000 && score < 1600){
      text("Beginner Rank",600,30);
     }
     else if(score < 1000){
      text("Noob Rank",600,30);
     }
   }

}

function mousePressed(){
  if(gamestate !== end){
    particle = new Particle(mouseX, 10,10);
  }
}