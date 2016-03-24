function storeData() {
  // "subjectBox" is the id of the "Subject code" input box from the second screen
  // etc
  var code = document.getElementById("subjectBox").value;
  var age = document.getElementById("ageBox").value;
  var gender = document.getElementById("genderBox").value;

  var csv = '';

  // Columns are separated by ',' and rows by '\n'
  // The first row will be the header
  csv += 'Code,Age,Gender\n';

  // The data we need to store
  csv += code + ',' + age + ',' + gender + '\n';

  filename = code + '.csv';

  // Create the download link

  if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}

$(".export").on('click', function (event) {
    // CSV
    storeData();
});

var dropboxClientCredentials = {
  key: "k2s1gj3gg7ffvdk"
};

var client = new Dropbox.Client(dropboxClientCredentials);

       function doHelloWorld() {
           client.writeFile('hello.txt', 'Hello, World!', function (error) {
               if (error) {
                   alert('Error: ' + error);
               } else {
                   alert('File written successfully!');
               }
           });
       }

       // Try to complete OAuth flow.
       client.authenticate({ interactive: false }, function (error, client) {
           if (error) {
               alert('Error: ' + error);
           }
       });

       if (client.isAuthenticated()) {
           doHelloWorld();
       }

       document.getElementById('writeButton').onclick = function () {
           client.authenticate(function (error, client) {
               if (error) {
                   alert('Error: ' + error);
               } else {
                   doHelloWorld();
               }
           });
       }
