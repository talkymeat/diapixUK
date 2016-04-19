$(document).ready(
    function() {

        var canvas = document.getElementById("imgCanvas");
        var context = canvas.getContext("2d");

        function createImageOnCanvas(imageId) {
            canvas.style.display = "block";
            document.getElementById("images").style.overflowY = "hidden";
            var img = new Image(300, 300);
            img.src = document.getElementById(imageId).src;
            context.drawImage(img, (0), (0)); //onload....
        }

        function draw(e) {
            var pos = getMousePos(canvas, e);
            posx = pos.x;
            posy = pos.y;
            context.strokeStyle = "#00FF00";
            context.lineWidth = 30;
            context.beginPath();
            context.arc(posx, posy, 20, 0, 2*Math.PI);
            context.stroke();
        }

        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
              x: evt.clientX - rect.left,
              y: evt.clientY - rect.top
            };
        }
        window.draw = draw;


        // var cvs, ctx;
        // cvs = document.getElementById('myCanvas');
        // ctx = cvs.getContext("2d");
        // var imageObj = new Image();
        // imageObj.onload = function() {
        // ctx.drawImage(imageObj, 5, 5);
        // };
            // imageObj.src = 'img/Beach1A.jpg';
});
