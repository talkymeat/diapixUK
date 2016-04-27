WEB_SOCKET_SWF_LOCATION = 'inc/WebSocketMain.swf';
var socket = io.connect();
// for local development comment above and uncomment below
// var socket = io.connect('http://localhost:5000');
socket.on('connected', function (data) {
    socket.emit('ready for data', {data});
    console.log("Why hello there! 😄 Nice to meet you.");
    // console.log(data);
});
socket.on('update', function (data) {
    console.log(data.message.payload);
});



function keep() {
    if(document.getElementById('host').value === "on"){
      var subj1 = $('#subjCode1').val();
      var subj2 = $('#subjCode2').val();
      $('#reflect1').text(subj1);
      $('#reflect1').val(subj1);
      $('#reflect2').text(subj2);
      $('#reflect2').val(subj2);
      var str =document.getElementById('picture').value;
      var clean = str.replace('img/', '');
      var pair = {
          subject1: subj1,
          subject2: subj2,
          time:document.getElementById('timeVal').value,
          timerONOFF:document.getElementById('showTimer').value,
          picture: clean,
          inuse: '0'
      };
      var value =str +'A.jpg';
      var src = $("#img").attr("src").replace(value, ".jpg");
      $("#img").attr("src", value);
      socket.emit('new pair', pair);
    //   console.log(pair);
    //   console.log(subj1, "+", subj2);
    //   console.log($('#reflect2').val());
    } else {
        var chosenRoom = $('#rooms').val();
        var arrayRoom = chosenRoom.split(',');
        //   console.log(arrayRoom);
        $('#reflect1').text(arrayRoom[1]);
        $('#reflect1').val(arrayRoom[1]);
        $('#reflect2').text(arrayRoom[2]);
        $('#reflect2').val(arrayRoom[2]);
        var time = arrayRoom[3];
        var showTime = arrayRoom[4];
        $('#timeVal').attr('value',time);
        updateSlideText(time);
        $('#showTimer').attr('value',showTime);
        var str = arrayRoom[5];
        var value = 'img/'+str +'B.jpg';
        var src = $("#img").attr("src").replace(value, ".jpg");
        $("#img").attr("src", value);
        document.getElementById('picture').value = 'img/'+str;
        // $('#picture').attr('value','img/'+str);
        socket.emit('pair taken', arrayRoom[0]);
    }
}

socket.on('load pairs', function (pairs) {
    // console.log("received");
    // console.log(pairs);
    $("#rooms #testOption").remove();
    // http://stackoverflow.com/questions/22652860/how-to-display-jquery-array-key-value-pair
    $.each(pairs,function(key,vals) {
        var serveOne="Room: "+vals.id+", Subject 1: "+vals.subject1+", Subject 2: "+vals.subject2+", Picture: "+vals.picture;
        var pairInfo = [vals.id, vals.subject1, vals.subject2, vals.time, vals.timerONOFF, vals.picture];
        // console.log(serveOne);
        // http://stackoverflow.com/a/171007
        $('#rooms')
            .append($('<option></option>')
            .attr("value",pairInfo)
            .text(serveOne));
    })
});

function addToStore() {
    var chosenRoom = $('#rooms').val();
    if (chosenRoom.indexOf(',') > -1) {
        var arrayRoom = chosenRoom.split(',');
        var pair = arrayRoom[0];
    } else {
        var pair = chosenRoom;
    }
    var user = {
        timestamp: new Date().toISOString(),
        subjectNumber: document.getElementById('subjCode').value,
        subjectPairId: pair,
        age: document.getElementById('age').value,
        gender:document.getElementById('gender').value,
        // recording:document.getElementById('recorder').value,,
        conditions: document.getElementById('conditions').value
    }
    socket.emit('new user', user);
    // console.log(user);
}

socket.on('return created pair',function(data) {
  console.log('created: ',data);
  var pairID = data.id;
  console.log(pairID);
  // $('#rooms').attr('value',pairID);
  // $('#rooms #testOption').attr('value',pairID);
  $('#rooms').data("value",pairID);
  document.getElementById('testOption').value = pairID;
  console.log(document.getElementById('rooms').value);
  // console.log();
});

function addResults() {
    resultData = $('#result').data();
    var data = {
        subjectNumber: document.getElementById('subjCode').value,
        correctdifferences: resultData.result,
        results: resultData
    }
    socket.emit('results', data);
}
