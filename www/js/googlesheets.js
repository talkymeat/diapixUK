

var CLIENT_ID = '885285413760-t7a7ggqh9vsp3q8g09guolimf75qon78.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAOjwCdfZNgb7nSiCe_MRdwsqFdpTRNOic';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets";
var useSheets = false;
var GoogleAuth;
var sheetID;
var sheetProperties;
var sheets;
var sheetURL;
/*var google = require('googleapis');
var googleAuth = require('google-auth-library');
var util = require('util');
var express = require('express');
var router = express.Router();
var SheetHelp = require('./sheets');
var models = require('./models');
var Sequelize = require('sequelize');

/*
module.exports = function(sequelize, DataTypes) {
  var Spreadsheet = sequelize.define('Spreadsheet', {
    id: {type: DataTypes.STRING, allowNull: false, primaryKey: true},
    sheetId: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false}
  });

  return Spreadsheet;
};
*/
/*
function start() {
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
    'apiKey': API_KEY,
    // clientId and scope are optional if auth is not required.
    'clientId': CLIENT_ID,
    'scope': 'profile',
  }).then(function() {
    // 3. Initialize and make the API request.
    return gapi.client.request({
      'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
    })
  }).then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
};
*/

// 1. Load the JavaScript client library.
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {

  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    GoogleAuth = gapi.auth2.getAuthInstance()
    GoogleAuth.isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    document.getElementById('authorize-button').onclick = handleAuthClick;
    document.getElementById('signout-button').onclick = handleSignoutClick;
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    document.getElementById('authorize-button').style.display = 'none';
    document.getElementById('signout-button').style.display = 'block';
    document.getElementById('makesheet').style.display = 'block';
  } else {
    document.getElementById('authorize-button').style.display = 'block';
    document.getElementById('signout-button').style.display = 'none';
    document.getElementById('makesheet').style.display = 'none';
    useSheets = false;
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

var SheetsHelper = function(accessToken) {
  var authClient = new googleAuth();
  var auth = new authClient.OAuth2();
  auth.credentials = {
    access_token: accessToken
  };
  this.service = google.sheets({version: 'v4', auth: auth});
};

/*module.exports = SheetsHelper;*/



// Bind handlers when the page loads.
$(function() {
  $('a.mdl-button').click(function() {
    setSpinnerActive(true);
  });
});

function setSpinnerActive(isActive) {
  if (isActive) {
    $('#spinner').addClass('is-active');
  } else {
    $('#spinner').removeClass('is-active');
  }
}

function createSpreadsheet() {
  var title = 'Diapix (' + new Date().toLocaleTimeString() + ')';
  /*var title = 'Diapigs'*/
  var spreadsheetBody = {
  "properties": {
    "title": title,
    "locale": "en_GB",
    "autoRecalc": "ON_CHANGE",
    "timeZone": "Europe/London",
  },
  "sheets": [
    {
      "properties": {
        "sheetId": 0,
        "title": "Participant",
        "index": 0,
        "sheetType": "GRID",
        "gridProperties": {
          "rowCount": 12,
          "columnCount": 2
        }
      }
    },
    {
      "properties": {
        "sheetId": 1,
        "title": "Experiment",
        "index": 1,
        "sheetType": "GRID",
        "gridProperties": {
          "rowCount": 50,
          "columnCount": 6,
          "frozenRowCount": 1
          }
        }
      }
    ]
  }
  var request = gapi.client.sheets.spreadsheets.create({}, spreadsheetBody);
  request.then(function(response) {
    sheetID = response.result.spreadsheetId;
    sheetProperties = response.result.properties;
    sheets = response.result.sheets;
    sheetURL = response.result.spreadsheetUrl;
    var batchUpdateValuesRequestBody = {
      // How the input data should be interpreted.
      "valueInputOption": 'USER_ENTERED',
      // The new values to apply to the spreadsheet.
      "data": [
        {
          "range": "Participant!A1:A12",
          "values": [
            [
              "HOST"
            ],
            [
              "Subject 1 code"
            ],
            [
              "Subject 2 code"
            ],
            [
              "Timer shown?"
            ],
            [
              "Time allowed"
            ],
            [
              "Room"
            ],
            [
              "Timestamp"
            ],
            [
              "Subject code"
            ],
            [
              "Pair ID"
            ],
            [
              "Subject age"
            ],
            [
              "Subject gender"
            ],
            [
              "Conditions"
            ]
          ]
        },
        {
          "range": "Experiment!A1:F1",
          "values": [
            [
              "time", "action", "difference", "X","Y", "correct"
            ]
          ]
        }
      ]
    };
    updateCells(batchUpdateValuesRequestBody);
    document.getElementById('makesheet').innerHTML = "Sheet ready. Tap to overwrite with blank";
    useSheets = true;
    console.log(response.result);
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}

function gKeep(range, deets) {
  if (useSheets) {
    var batchUpdateValuesRequestBody = {
      // How the input data should be interpreted.
      "valueInputOption": 'USER_ENTERED',
      // The new values to apply to the spreadsheet.
      "data": [
        {
          "range": range,
          "values": deets
        }
      ]
    };
    updateCells(batchUpdateValuesRequestBody)
  }
}

function updateCells(batchUpdateValuesRequestBody) {
  var params = {
    'spreadsheetId': sheetID
  }
  var request = gapi.client.sheets.spreadsheets.values.batchUpdate(params, batchUpdateValuesRequestBody);
  request.then(function(response) {
    // TODO: Change code below to process the `response` object:
    console.log(response.result);
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}


/*=========Everything below this line is probs bullshit============*/
/*
SheetsHelper.prototype.createSpreadsheet = function(title, callback) {
  var self = this;
  var request = {
    resource: {
      properties: {
        title: title
      },
      sheets: [
        {
          properties: {
            title: 'Data',
            gridProperties: {
              columnCount: 6,
              frozenRowCount: 1
            }
          }
        },
        // TODO: Add more sheets.
      ]
    }
  };
  self.service.spreadsheets.create(request, function(err, spreadsheet) {
    if (err) {
      return callback(err);
    }
    // TODO: Add header rows.
    return callback(null, spreadsheet);
  });
};

router.post('/spreadsheets', function(req, res, next) {

  var auth = req.get('Authorization');

  if (!auth) {
    return next(Error('Authorization required.'));
  }
  var accessToken = auth.split(' ')[1];
  var helper = new SheetsHelper(accessToken);
  var title = 'Diapix Experiment (' + new Date().toLocaleTimeString() + ')';
  document.getElementById('deviceready').style.color = 'red';
  helper.createSpreadsheet(title, function(err, spreadsheet) {
    if (err) {
      return next(err);
    }
    var model = {
      id: spreadsheet.spreadsheetId,
      sheetId: spreadsheet.sheets[0].properties.sheetId,
      name: spreadsheet.properties.title
    };
    models.Spreadsheet.create(model).then(function() {
      return res.json(model);
    });
  });
})



function makeSheet() {
  makeRequest('POST', '/spreadsheets', function(err, spreadsheet) {
      window.location.reload();
    });
}



function makeRequest(method, url, callback) {
  var auth = gapi.auth2.getAuthInstance();
  if (!auth.isSignedIn.get()) {
    return callback(new Error('Signin required.'));
  }
  var accessToken = auth.currentUser.get().getAuthResponse().access_token;
  setSpinnerActive(true);
  $.ajax(url, {
    method: method,
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
    success: function(response) {
      setSpinnerActive(false);
      document.getElementById('deviceready').innerHTML = 'Spreadsheet ready';
      return callback(null, response);
    },
    error: function(response) {
      setSpinnerActive(false);
      return callback(new Error(response.responseJSON.message));
    }
  });
}
*/
