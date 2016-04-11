var cvs, ctx;
function init() {
    var cvs = document.getElementById('myCanvas');
    var ctx = cvs.getContext("2d");
    var imageObj = new Image();
    imageObj.onload = function() {
    ctx.drawImage(imageObj, 5, 5);
    };
        // imageObj.src = 'img/Beach1A.jpg';
};

window.onload = init;
