img = "";
status = "";
objects = []

function preload(){
    song = loadSound('alarm.mp3');
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380)
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting baby(ies)";
}

function modelLoaded(){
    console.log("model loaded!");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
else{
    console.log(results);
    objects = results;
}
}

function draw(){
    image(video, 0, 0, 380, 380);
    fill('#FF0000');
    
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: baby(ies) detected";
            
            if(objects[i].label == "person"){
                document.getElementById("baby_detected_or_not").innerHTML = "baby detected";
                song.stop();
            }
            else{
                document.getElementById("baby_detected_or_not").innerHTML = "baby not detected";
                song.play();
            }
        }
    }
}