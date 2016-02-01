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
  open: function() {
    this.welcome();
    this.menu();
  } 

};

zoo.open();
