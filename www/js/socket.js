WEB_SOCKET_SWF_LOCATION = 'inc/WebSocketMain.swf';
var socket = io.connect('http://localhost:5000');
socket.on('connected', function (data) {
    socket.emit('ready for data', {data});
    console.log(data);
});
socket.on('update', function (data) {
    console.log(data.message.payload);
});

// function makePairs() {
//     var pair = {
//         subject1: subj1,
//         subject2: subj2,
//         inuse: '0'
//     };
//     socket.emit('new pair', pair);
//     console.log(pair);
// }

function keep() {
    if(document.getElementById('host').value === "on"){
      var subj1 = $('#subjCode1').val();
      var subj2 = $('#subjCode2').val();
      $('#reflect1').text(subj1);
      $('#reflect1').val(subj1);
      $('#reflect2').text(subj2);
      $('#reflect2').val(subj2);
      var pair = {
          subject1: subj1,
          subject2: subj2,
          inuse: '0'
      };
      socket.emit('new pair', pair);
    //   console.log(pair);
    //   console.log(subj1, "+", subj2);
    //   console.log($('#reflect2').val());
    } else {
      var chosenRoom = $('#rooms').val();
      var arrayRoom = chosenRoom.split(',');
      console.log(arrayRoom);
      $('#reflect1').text(arrayRoom[1]);
      $('#reflect1').val(arrayRoom[1]);
      $('#reflect2').text(arrayRoom[2]);
      $('#reflect2').val(arrayRoom[2]);
      socket.emit('pair taken', arrayRoom[0]);
    }
}

socket.on('load pairs', function (pairs) {
    console.log("received");
    console.log(pairs);
    $("#rooms #testOption").remove();
    // http://stackoverflow.com/questions/22652860/how-to-display-jquery-array-key-value-pair
    $.each(pairs,function(key,vals) {
        var serveOne="Room: "+vals.id+", Subject 1: "+vals.subject1+", Subject 2: "+vals.subject2;
        var pairInfo = [vals.id, vals.subject1, vals.subject2];
        console.log(serveOne);
        // http://stackoverflow.com/a/171007
        $('#rooms')
            .append($('<option></option>')
            .attr("value",pairInfo)
            .text(serveOne));
    })
});

function addToStore() {
    var str =document.getElementById('picture').value;
    var clean = str.replace('img/', '');
    var chosenRoom = $('#rooms').val();
    var arrayRoom = chosenRoom.split(',');
    var pair = arrayRoom[0];
    var user = {
        timestamp: new Date().toISOString(),
        subjectNumber: document.getElementById('subjCode').value,
        subjectPairId: pair,
        age: document.getElementById('age').value,
        gender:document.getElementById('gender').value,
        // recording:document.getElementById('recorder').value,
        time:document.getElementById('timeVal').value,
        timerONOFF:document.getElementById('showTimer').value,
        picture: clean,
        conditions: document.getElementById('conditions').value
    }
    socket.emit('new user', user);
    console.log(user);
}
