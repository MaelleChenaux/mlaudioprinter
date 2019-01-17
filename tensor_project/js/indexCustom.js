var PAGE_IP_ADDRESS = "10.192.164.21:2000";
function sendData(jsonData){
  let data_to_send = jsonData;

  $.post(
    "https://" + PAGE_IP_ADDRESS + "/setParams/",
    data_to_send,
    post_done
  );


  function post_done(data, status) {
    console.log(data);
    console.log(status);
  }
}
///Dropdown choices
/*
function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }
function myFunction2() {
        document.getElementById("myDropdown2").classList.toggle("show");
    }

function myFunction3() {
        document.getElementById("myDropdown3").classList.toggle("show");
    }
*/

function sendSettings() {
  sendData({
    'label0': document.getElementById("sound1").options[document.getElementById("sound1").selectedIndex].value,
    'label1': document.getElementById("sound2").options[document.getElementById("sound2").selectedIndex].value,
    'label2': document.getElementById("sound3").options[document.getElementById("sound3").selectedIndex].value,
  });

}


// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// };
