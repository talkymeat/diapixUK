function addToStore() {
  var todo = {
    _id: new Date().toISOString(),
    subjectNumber: document.getElementById('subjCode').value,
    age: document.getElementById('age').value,
    gender:document.getElementById('gender').value,
    recording:document.getElementById('recorder').value,
    countdown:document.getElementById('timevalue').value,
    timerONOFF:document.getElementById('showTimer').value,
    picture: document.getElementById('picture').value,
    condition: document.getElementById('conditions').value
    //completed: false
  };
  db.put(todo, function callback(err, result) {
    if (!err) {
      console.log('Successfully created a new Experiment!');
    }
  });
}

WEB_SOCKET_SWF_LOCATION = 'inc/WebSocketMain.swf';
var socket = io.connect('http://localhost:5000');
socket.on('connected', function (data) {
    socket.emit('ready for data', {data});
    console.log(data);
});
socket.on('update', function (data) {
    console.log(data.message.payload);
});
