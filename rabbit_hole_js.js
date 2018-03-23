/*
   Programmed by:Scott Klein
   Email: scott.klein13@gmail.com
   www.scottklein.info
   Monty Python was used and butchered for comedic reasons, my apologies.
   This game is rather small, consisting of only 9 rooms. It could be bigger and maybe one day it will.
   But this game is really meant as a demonstration of my abilities. I would hope that some one is impressed enough
   to give me a job.
   Any code here cannot be used without my permission
*/

// defining game variables
var room_directions_word = [
    ["north", "east"],
    ["west", "east"],
    ["west", "north"],
    ["north", "south"],
    ["north"],
    ["north", "south"],
    ["south", "east"],
    ["west", "south", "east"],
    ["west", "south"]
];

var room_directions_num = [
    [3,1],
    [0,2],
    [1,5],
    [6,0],
    [7],
    [8,2],
    [3,7],
    [6,4,8],
    [7,5]
];

var room_descriptions = [
    ["This room seems pretty plain. ", "There is a grenade on the ground. ", "Exits are to the north and east"],
    ["You are at the bottom of a very deep hole. Strange. There are torches on the wall to light your way. What luck! ", "", "You can see exits west and east."],
    ["Scrolled on the wall is the phrase. &#39Here may be found the last words of Joseph of Aramathea.  He who is valiant and pure of spirit may find the Holy Grail in the Castle of uuggggggh&#39. ", "Interestingly, there is a lead key on the ground. ", "There are exits to the west and north."],
    ["On the wall is written, &#39Your mother was a hamster and your father smelt of elderberries. You should probably go away unless you want to be taunted for a second time. ", "", "There are exits to the north and south."],
    ["You have found a room that glows a gold color from all the treasure that resides within. ", "", "There is an exit to the north, but why would you go there?"],
    ["", "", "You are on the Mason/Dixon line because exits are to the north and the south."],
    ["Looks like this room use to be a ritual chamber. ", "A dagger lays in the dirt. ","There are exits to the south and east."],
    ["This room appears to be a junction for several corridors. ", "Oh no! There is a Grue here and he looks hungry. ", "There are passages to the west, south and east."],
    ["This room has a bend to it. ", "", "Exits are to the west and south."],
    ["WTF is Room 9 and how did it get in here? ", "", ""],
    ["", "You cannot do anything more once you won the game. ", "There is no where to exit to."],
    ["", "", ""]
];

// 0 indicates that the item is not in inventory. 1 indicates it's in inventory. 2 indicates it's been used so it can't be picked up again
//the last number in the array is the room location fo the item
var inventory = [
    ["key", 0, 2],
    ["dagger", 0, 6],
    ["grenade", 0, 0],
    ["hands", 2, 9]
];

// 0 for grue means the grue is still alive. 1 means it has been killed
var grue = 0;
var instructions = "These are your instructions: Use words like &#39go&#39, &#39get&#39 and &#39use&#39 to precede directions, and items. Other acceptable words are &#39look&#39, &#39inventory&#39, and &#39score&#39.";
var introduction = "You have entered a dark cave. What else did you expect when you fell down the Rabbit Hole?";
var cannot_do_that = "You cannot do that action here.";
var walk_thru_walls = "Do you enjoy flattening your face by trying to walk through walls?";
var won_game = "Congratulations! You have won the game. Now don&#39t you feel special?";
var weird_text = "You feel weird.";
var room_location = 1;  //starting room
var score = 0;
var possible_score = 12;
var magic_word = "xyzzy";
var command;
var box = $("#rabbit_area");

// scroll to bottom of <div> element when adding new content
var bottom_scroll = function(){
    var scroll= $(box);
    var height = scroll[0].scrollHeight;
    scroll.scrollTop(height);
};

// process room movement and then 'look' when the new room is entered
var goto_new_room = function(r_l, r_d){
    var do_that = false;
    var direction = r_d;
    var room_array_length = room_directions_word[r_l].length;
    direction = direction.charAt(0).toUpperCase() + direction.slice(1);// first letter caps
    for (i=0; i < room_array_length; i++) {
            if (room_directions_word[r_l][i] === r_d) {
                do_that = true;
                room_location = room_directions_num[r_l][i];
                }
    }
    if (!do_that) {
           $(box).append(walk_thru_walls+"<br><br>");
           //bottom_scroll();
    }
    else {
        $(box).append(direction+"<br>");
        look(room_location);
    }
};

// end game processing
var treasure_room = function(r_l) {
    if (r_l === 4) {
       score += 2;
       $(box).append(won_game+"<br><br>");
       $(box).append("Final score: "+score+"/"+possible_score+"<br><br>");
       /*for (n=0; n<3; n++) {
        room_descriptions[r_l][n] = ""; //wipe treasure room description
        }*/
       r_l = 10;
       magic_word = "n0t @nym0r3 u5313ss"; //shut down it's use
       room_location = r_l;
    }
    else {
        cannot_do_action();
    }
};

// combines the room description for display
var look = function (r_l) {
        var concat_room_desc = "";
        for (k=0; k<3; k++) {
            concat_room_desc += room_descriptions[r_l][k];
        }
        //$(box).append("<p>"+concat_room_desc+"</p>");
        $(box).append(concat_room_desc+"<br><br>");
};

// display inventory when command entered. if inventory is empty, display cobwebs
var show_inventory = function(inv) {
        var has_item = false;
        var concat_inventory = "Current inventory: <br>";
        for (l=0; l<3; l++) {
        //for (l=0; l<inventory.length-1; l++;){
            if (inv[l][1] === 1) {
               concat_inventory += inv[l][0] + "<br>";
               has_item = true;
            }
        }
        if (!has_item) {
            concat_inventory += "cobwebs"
        }
        $(box).append(concat_inventory+"<br><br>");
};

// add item to inventory after checking if item is not already in your inventory. then proceeds
// to delete that item from the room description text
var get_item = function(item, r_l, inv) {
        var got_item = false;
        for (m=0; m<3; m++) {
            if ((inv[m][0] === item) && (inv[m][1] === 0) && (inv[m][2] === r_l)) {
                score += 1;
                inventory[m][1] = 1;
                got_item = true;
                room_descriptions[inv[m][2]][1] = "";
            }
        }
        if (got_item) {
           show_inventory(inventory);
        }
        else {
             cannot_do_action();
            }
};

// define weapon use and differentiate between dagger and grenade. after grue is killed, it's text is removed from the room description
var use_weapon = function(wep, inv) {
        //var weapon = "";
        if (room_location === 7 && grue === 0) {
           if (inv[1][1] === 1 && wep === inv[1][0]) {
              $(box).append("Congratulations! You have easily killed the Grue with the "+wep+".<br><br>");
              grue = 1;
              score += 1;
              room_descriptions[7][1] = "";
              inventory[1][1] = 2;
           }
           else if (inv[2][1] === 1 && wep ===inv[2][0]) {
              $(box).append("Congratulations! You have easily killed the Grue with the "+wep+".<br><br>");
              grue = 1;
              score += 1;
              room_descriptions[7][1] = "";
              inventory[2][1] = 2;
           }
           else if (wep === "hands") {
              $(box).append("Unbelievable! You attacked and killed the Grue with your bare "+wep+".<br><br>");
              score += 2;
              grue = 1;
              room_descriptions[7][1] = "";
           }
           else {
              cannot_do_action();
           }
        }
};

var cannot_do_action = function() {
        $(box).append(cannot_do_that+"<br><br>");
};

// processing hitting enter to submit commands which 'clicks' the submit button
$("#enter_command").keyup(function(event){
    if(event.keyCode == 13){
        $("#submit_command").click();
    }
});

// main processing of information in input text box when clicking submit
$("#submit_command").click(function() {
    command = $("#enter_command").val().toLowerCase();
    $("#enter_command").val("");
    $("#enter_command").focus();

    switch (command) {
      case "instructions":
            score -= 1; // if you're good, you don't need instructions
            $(box).append(instructions+"<br><br>");
            bottom_scroll();
            break;
      case "score":
            $(box).append("Your current score is: "+score+"/"+possible_score+"<br><br>");
            bottom_scroll();
            break;
      case magic_word:
            // process to teleport to treasure room
            room_location = 4;
            $(box).append(weird_text+"<br><br>");
            //$(box).append("<p>"+room_descriptions[room_location][0]+"</p>");
            look(room_location);
            score += 5;
            bottom_scroll();
            break;
      case "go east":
            // call function for going a direction
            goto_new_room(room_location, "east");
            bottom_scroll();
            break;
      case "go west":
            // call function for going a direction
            goto_new_room(room_location, "west");
            bottom_scroll();
            break;
      case "go north":
            // call function for going a direction
            goto_new_room(room_location, "north");
            bottom_scroll();
            break;
      case "go south":
            // call function for going a direction
            goto_new_room(room_location, "south");
            bottom_scroll();
            break;
      case "get treasure":
            // process getting treasure if in treasure room
            treasure_room(room_location);
            //score += 500;
            bottom_scroll();
            break;
      case "get dagger":
            // process getting dagger
            get_item("dagger", room_location, inventory);
            bottom_scroll();
            break;
      case "get grenade":
            // process getting grenade
            get_item("grenade", room_location, inventory);
            bottom_scroll();
            break;
      case "get key":
            // process getting key which is not used within in the game. it's just there to make people think
            get_item("key", room_location, inventory);
            bottom_scroll();
            break;
      case "inventory":
            // process inventory list
            show_inventory(inventory);
            bottom_scroll();
            break;
      case "look":
            // process room description
            look(room_location);
            bottom_scroll();
            break;
      case "use grenade":
            // process using grenade on the grue
            use_weapon("grenade", inventory);
            bottom_scroll();
            break;
      case "use dagger":
            //process using dagger on the grue
            use_weapon("dagger", inventory);
            bottom_scroll();
            break;
      case "use hands":
            //process using hands on the grue
            use_weapon("hands", inventory);
            bottom_scroll();
            break;

      default:
            cannot_do_action();
            bottom_scroll();

    }
});
