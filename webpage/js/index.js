//var PAGE_IP_ADDRESS = "172.20.10.12:3000";
var PAGE_IP_ADDRESS = "10.192.164.21:3000";

 //var PAGE_IP_ADDRESS = "localhost:3000";

$("#sender").click(function() {
  let data_to_send = {
    number: 45
  };

  $.post(
    "http://" + PAGE_IP_ADDRESS + "/basic_post_action/",
    data_to_send,
    post_done
  );

  function post_done(data, status) {
    // data is result of request
    console.log(data);
    console.log(status);
    $("#sender").css("background-color", "rgb(81, 255, 20)");
    setTimeout(function() {
      $("#sender").css("background-color", "rgb(50, 148, 255)");
    }, 500);
  }
});

$("#asker").click(function() {
  let number1 = 10;
  let number2 = 30;
  $.get("http://" + PAGE_IP_ADDRESS + "/basic_get_action/" + number1 + "/" + number2, get_done);

  function get_done(data) {
    console.log(data);
  }
});



//////dropdown
function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }
function myFunction2() {
        document.getElementById("myDropdown2").classList.toggle("show");
    }

function myFunction3() {
        document.getElementById("myDropdown3").classList.toggle("show");
    }

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};



function getJoke() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(this.responseText));
    }
  };
  xhttp.open("GET", "https://geek-jokes.sameerkumar.website/api", true);
  xhttp.send();
};

function getWord() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(this.responseText));
    }
  };
  xhttp.open("GET", "http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=55237b70fefb31e7f560a0dac07035bd0e47772c1322d6a84", true);
  //"http://api.wordnik.com/v4/words.json/randomWord?api_key=55237b70fefb31e7f560a0dac07035bd0e47772c1322d6a84",
  xhttp.send();
};
