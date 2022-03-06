img="";
stat="";
object=[];
conf="";
x="";
y="";
function preload()
{
    img=loadImage("pic.jpg");
}
function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    detector=ml5.objectDetector("cocossd", modelLoaded);
}
function modelLoaded()
{
    console.log("CocoSSD initialized");
    stat=true;
}
function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else if(results.length>0)
    {
        console.log(results);
        object=results;
    }
}
function draw()
{
    image(img, 0, 0, 380, 380);
    if(stat!="")
    {
        detector.detect(img, gotResults);
        for(i=0; i<object.length;i++)
        {
            document.getElementById("status").innerHTML="Objects Detected: "+object.length;
            conf=floor(object[i].confidence*100);
            x=object[i].x;
            y=object[i].y;
            fill("red");
            text(object[i].label+" "+conf+"%", x+15, y+15);
            noFill();
            stroke("red");
            rect(x,y,object[i].width,object[i].height);
        }
    }
}