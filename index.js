var mysql = require('mysql');

var prompt = require('prompt');
prompt.start();
prompt.message = ''; 

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'zoo_db'
});

connection.connect(function(err) {
  if(err) {
    console.error('err connection ' + err.stack);
    return; //if no error, YOUR CONNECTED!
  }
});

var zoo = {
  welcome: function() {
    console.log("Welcome to the Zoo And Friends App~!");
  },

  menu: function() {
    console.log("Enter (A): ------> to Add a new animal to the Zoo!\n");
    console.log("Enter (U): ------> to Update info on an animal in the Zoo!\n");
    console.log("Enter (V): ------> to Visit the animals in the Zoo!\n");
    console.log("Enter (D): ------> to Adopt an animal from the Zoo!\n");
    console.log("Enter (Q): ------> to Quit and exit the Zoo!\n");
  },

  add: function(input_scope) {
    var currentScope = input_scope;
    console.log("To add an animal to the zoo please fill out the following form for us!");
    prompt.get(["name", "type", "age"], function(err, result) {
      //Enter connection query function
     currentScope.menu();
     currentScope.promptUser();
    });
  },
  
  visit: function() {
    console.log("Enter (I): ------> do you know the animal by it's id? We will visit that animal!\n");
    console.log("Enter (N): ------> do you know the animal by it's name? We will visit that animal!\n");
    console.log("Enter (A): ------> here's the count for all animals in all locations!\n");
    console.log("Enter (C): ------> here's the count for all animals in this one city!\n");
    console.log("Enter (O): ------> here's the count for all the animals in all locations by the type you specified!\n")
    console.log("Enter (Q): ------> to Quit and exit the Zoo!\n"); 
    this.view(this); //Need explanation on this 
  },

  view: function() {
    var currentScope = input_scope;
    console.log("Please choose where you would like to visit!");
    prompt.get(["visit"], function(err, result) {
      if(result.visit == "Q") {
        currentScope.menu();
      } else if (result.visit == "O" {
        currentScope.type(input_scope);
      } else if (result.type == "I") {
        currentScope.type(input_scope);
      } else if (result.animId == "N") {
        currentScope.name(input_scope);
      } else if (result.name == "A") {
        currentScope.all(input_scope);
      } else if (result.all == "C") {
        currentScope.care(input_scope);
      } else {
        console.log("Sorry didn't get that, come again?");
        currentScope.visit();
        currentScope.view(currentScope);
      }
    });
  },

  type: function(input_scope) {
    var currentScope = input_scope;
    console.log("Enter animal type to find how many animals we have of those type");
    prompt.get(["animal_type"], function(err, result) {
      connection.query("SELECT COUNT(*) AS total FROM animals WHERE type = ?", [result.animal_type], function(err, results, fields)
        if (err) throw err;
        console.log("Total " + result.animal_type " : " results[0].total);
      });
      currentScope.visit();
      currentScope.view(currentScope);
    }); 
  },

  care: function(input_scope) {
    var currentScope = input_scope;
    console.log("Enter city name NY/SF");
    prompt.get(["city_name"], function(err, result) {
      connection.query("SELECT COUNT(*) AS total FROM animals, caretakers WHERE animals.caretakers_id AND caretakers.city = ?", [result.city_name], function(err, results, fields)
        if (err) throw err;
        console.log("Total animals: " + results[0].total);
      });
      currentScope.visit();
      currentScope.view(currentScope);
    });
  },

  animId: function(input_scope) {
    var currentScope = input_scope;
    console.log("Enter ID of the animal you want to visit");
    prompt.get(["animId"], (err, result) {
      connection.query("SELECT * FROM animals WHERE id = ?", [result.animal_id], function(err, results, fields) {
        if (err) throw err;
        else {
          console.log('Animal ID: ' + results[0].id);
        }
      });
      currentScope.visit();
      currentScope.view(currentScope);
    });
  },


