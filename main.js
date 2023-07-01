song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song2 = "";
music_status1 = "";
music_status2 = "";

function preload()
{
song = loadSound("music.mp3");
song2 = loadSound('music2.mp3');
}


function setup() {
canvas =  createCanvas(600, 500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);	

    scoreLeftWrist = results[0].pose.keypoints[9].score;
	scoreRightWrist = results[0].pose.keypoints[10].score;
	console.log("scoreLeftWrist =" +scoreLeftWrist+ "scoreRightWrist =" +scoreRightWrist);
  }
}

function draw() {
image(video, 0, 0, 600, 500);
music_status1 = song.isPlaying();
music_status2 =  song2.isPlaying();
fill("red");
stroke("brown");
if(scoreRightWrist > 0.2){
circle(rightWristX,rightWristY,20);
song.stop();
if(music_status2 = false){
	song2.play();
}

}
if(scoreleftWrist > 0.2){
	circle(leftWristX,leftWristY,20);
	song2.stop();
	if(music_status1 = false){
		song.play();
	}
	}
}



function play(){

	song.play();
	song.setVolume(1);
	song.rate(1);
}