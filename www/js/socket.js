WEB_SOCKET_SWF_LOCATION = 'inc/WebSocketMain.swf';
var socket = io.connect('http://localhost:5000');
socket.on('connected', function (data) {
    socket.emit('ready for data', {data});
    console.log(data);
});
socket.on('update', function (data) {
    console.log(data.message.payload);
});


function addToStore() {
    var str =document.getElementById('picture').value;
    var clean = str.replace('img/', '');
    var todo = {
        timestamp: new Date().toISOString(),
        subjectNumber: document.getElementById('subjCode').value,
        age: document.getElementById('age').value,
        gender:document.getElementById('gender').value,
        // recording:document.getElementById('recorder').value,
        time:document.getElementById('timeVal').value,
        timerONOFF:document.getElementById('showTimer').value,
        picture: clean,
        conditions: document.getElementById('conditions').value
    //completed: false
    };
    socket.emit('new user info', todo);
    console.log(todo);
}
