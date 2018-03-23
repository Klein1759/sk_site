/*
   Programmed by:Scott Klein
   Email: scott.klein13@gmail.com
   www.scottklein.info
   This is my version of the game done with html, css and jQuery/Javascript
   Any code here cannot be used without my permission


Colors for 2048 blocks with corresponding numbers displayed
#ffffff  //null or 0
#EEE4DA, // 2
#EAE0C8, // 4
#F59563, // 8
#3399ff, // 16
#ffa333, // 32
#cef030, // 64
#E8D8CE, // 128
#990303, // 256
#6BA5DE, // 512
#DCAD60, // 1024
#B60022; // 2048
*/

var grand_total = 0;
var game_over = false;
var start_game = true;


// 0-15 array, value is "" for empty or a # for the value.
var grid_number_value = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

//process input from the arrow keys right and down
function right_and_down_processing(grid_array, start_num, end_num, increment_num, row_increment_num) {
  //run the row process four times, one for each row
  for (j=0; j<=3; j++){
    //alert(j);
    //process one row
    for (i=start_num; i<=end_num; i+=increment_num) {
       alert(i);

    }
    start_num = start_num + row_increment_num;
    end_num = end_num + row_increment_num;
  }
  //alert(j);

}

//process input from the arrow keys left and up
function left_and_up_processing(grid_array, start_num, end_num, increment_num, row_increment_num) {
  //run the row process four times, one for each row
  for (j=0; j<=3; j++){
    //process one row
    for (i=start_num; i>=end_num; (i+=increment_num)) {


    }
    start_num = start_num + row_increment_num;
    end_num = end_num + row_increment_num;
  }
}

//starting or restarting the game processing of resetting the grid array and generating
//two numbers for the newly blank grid
function process_start_game(){
  for (i=0; i<=15; i++) {
    grid_number_value[i] = "";
  }
  grand_total = 0;
  $("#score_display").text(grand_total);
  random_number_placement(grid_number_value);
  random_number_placement(grid_number_value);
  refresh_grid(grid_number_value);
}

//creating random numbers 2 or 4. twice if new/restart and once if during game
function random_number_placement(grid_array) {
  space_occupied = false;
  while (!space_occupied){
    ran_num_grid = Math.floor(Math.random() * 16);
    if (grid_array[ran_num_grid] === "") {
        space_occupied = true;
        grid_array[ran_num_grid] = Math.floor((Math.random() * 2)+1)*2;
    }
  }
  refresh_grid(grid_array);
}

//display an update to the grid with the number correlating to it associated background color
function refresh_grid(grid_array){
  for (i=0;i<=15;i++) {
       $("#_"+i).text(grid_array[i]);
       bg_color = get_background_color(grid_array[i]);
       $("#_"+i).css("background-color", bg_color);
  }
}

//selects the background-color hex value and returns it
function get_background_color(color_num){
  switch (color_num) {
    case null:
        return "#ffffff";
        break;
    case "":
        return "#ffffff";
        break;
    case 2:
        return "#eee4da";
        break;
    case 4:
        return "#eae0c8";
        break;
    case 8:
        return "#f59563";
        break;
    case 16:
        return "#3399ff";
        break;
    case 32:
        return "#ffa333";
        break;
    case 64:
        return "#cef030";
        break;
    case 128:
        return "#e8d8ce";
        break;
    case 256:
        return "#990303";
        break;
    case 512:
        return "#6ba5de";
        break;
    case 1024:
        return "#dcad60";
        break;
    case 2048:
        return "#b60022";
        break;

    default:
        return;
    }
}

//click instruction button to pop up instructions on screen alert
$("#instructions").click(function() {
  alert("How to play: Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge into one. If a tile equals 2048 you win and the game is over.");
});


//click start game to start or restart a game
$("#start").click(function() {
  process_start_game();
});

//arrow keys used move tiles in the direction pressed provided there are 2 adjacent tiles of the same value or empty spaces in that direction
$(document).keydown(function(event){

       switch (event.keyCode) {
         case 37:
            //left code
            grid_number_value = left_and_up_processing(grid_number_value, 3, 0, -1, 4);
            refresh_grid(grid_number_value);
            break;
         case 38:
            //up code
            grid_number_value = left_and_up_processing(grid_number_value, 12, 0, -4, 1);
            refresh_grid(grid_number_value);
            break;
         case 39:
            //right code
            alert("right");
            grid_number_value = right_and_down_processing(grid_number_value, 0, 3, 1, 4);
            refresh_grid(grid_number_value);
            break;
         case 40:
            //down code
            grid_number_value = right_and_down_processing(grid_number_value, 0, 12, 4, 1);
            refresh_grid(grid_number_value);
            break;

       }
});