/* global Phaser */
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;
var player;
var cursors;
var stars;
var scoreText;
var score;
var music;

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/Drawing.png');
    game.load.image('dude', 'assets/dude.png');
    game.load.audio('merio', 'assets/merio.mp3');
}

function create() {
    
    music = game.add.audio('merio');
    
    music.play();
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'star');
    game.add.sprite(0, 0, 'sky');
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    var ledge = platforms.create(0, 400, 'ground');
    ledge.body.immovable = true;
    player = game.add.sprite (500, 50, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    cursors = game.input.keyboard.createCursorKeys();
        stars = game.add.group();
    stars.enableBody = true;
    for (var i = 0; i < 60; i++){
    
        var star = stars.create(i*70, 0, 'star');
        star.body.gravity.y = 200;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    scoreText = game.add.text(16,16, 'score: 0', {fontSize: '32px' , fill: '#000'});
    score = 0;
    merio.loopFull(true);
    
}

function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -1000;

    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 1000;

    }
    else {
        player.animations.stop();
        player.frame =0;
    }
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -350;
    }
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this)
}
function collectStar (player, star) {
    star.kill();
    score += 1
    scoreText.text = 'score:' + score;
     for (var i = 0; i < 2; i++){
    
        var star = stars.create(Math.random()*800, 50, 'star');
        star.body.gravity.y = 200;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
}
