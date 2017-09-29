var game = new Phaser.Game(800,600,Phaser.AUTO,'',{preload:preload,create:create,update:update});

var platforms,player,keys;

function preload(){
    game.load.image('sky','assets/sky.png');
    game.load.image('platform','assets/platform.png');

    game.load.spritesheet('dude','assets/dude.png',32,48);
}
function create(){
    keys = game.input.keyboard.createCursorKeys();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'sky');
    
    platforms = game.add.group();
    platforms.enableBody = true; 
    
    var platform = platforms.create(0,game.world.height - 64,'platform');
    platform.scale.setTo(2,2); //Escala a plataforma primeiro parametro X segundo parametro Y
    platform.body.immovable = true;
    
    platform = platforms.create(400,400,'platform');
    platform.body.immovable = true;
    platform = platforms.create(-150,250,'platform');
    platform.body.immovable = true;

    player = game.add.sprite(50,game.world.height -150,'dude');
    game.physics.arcade.enable(player);
    player.body.gravity.y= 300;
    player.body.bounce.y=0.2;
    player.body.collideWorldBounds = true;
    player.animations.add('left',[0,1,2,3],10,true);
    player.animations.add('right',[5,6,7,8],10,true);
}
function update(){
    game.physics.arcade.collide(player,platforms);

    player.body.velocity.x = 0;

    if(keys.left.isDown){
        player.body.velocity.x = -150;
        player.animations.play('left');
    }else if(keys.right.isDown){
        player.body.velocity.x = 150;
        player.animations.play('right');
    }else{
        player.animations.stop();
        player.frame = 4;
    }

    if(keys.up.isDown && player.body.touching.down){
        player.body.velocity.y = -350;
    }
}