var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload(){
    game.load.image('8ball', '/8ball.png');
}

var ball, target, orig
var line;
var changingDir = false;

function create(){
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    ball = game.add.sprite(300, 300, '8ball');
    game.world.setBounds(0, 0, 5000, 4000);
    game.physics.arcade.enable(ball);
    ball.body.setCircle(50);
    ball.body.collideWorldBounds = true;
    ball.anchor.set(0.5);
    ball.body.bounce.set(0.6);
    game.camera.follow(ball);
    game.input.onDown.add(() =>{
        changingDir = true;
        target = game.add.sprite(game.camera.x + game.input.mousePointer.x, game.camera.y + game.input.mousePointer.y, '8ball');
        target.anchor.set(0.5);
        game.physics.arcade.enable(target);
        orig = game.add.sprite(game.camera.x + game.input.mousePointer.x, game.camera.y + game.input.mousePointer.y, '8ball');
        orig.xPos = game.input.mousePointer.x;
        orig.yPos = game.input.mousePointer.y;
        orig.anchor.set(0.5);
        game.physics.arcade.enable(orig);
        line = new Phaser.Line(target.x, target.y, orig.x, orig.y);
    })
    game.input.onUp.add(() =>{
        var distBetween = game.physics.arcade.distanceBetween(orig, target);
        var angle = game.physics.arcade.angleBetween(orig, target);
        var pointObject = game.physics.arcade.velocityFromRotation(angle, (Math.min(1000, distBetween * 2)));
        ball.body.velocity.setTo(pointObject.x, pointObject.y);
        orig.destroy();
        target.destroy();
        delete line;
        changingDir = false;
    })
}

function update(){
    if(changingDir){
        game.physics.arcade.moveToPointer(target, game.physics.arcade.distanceToPointer(target) * 20);
        orig.body.x = game.camera.x + orig.xPos - 50;
        orig.body.y = game.camera.y + orig.yPos - 50;
        line.fromSprite(target, orig);
    }
    ball.body.velocity.setTo(ball.body.velocity.x * 0.995,ball.body.velocity.y * 0.995);
}