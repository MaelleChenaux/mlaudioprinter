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

function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }
function myFunction2() {
        document.getElementById("myDropdown2").classList.toggle("show");
    }

function myFunction3() {
        document.getElementById("myDropdown3").classList.toggle("show");
    }
function sendSettings() {
  sendData({'label1': document.getElementById("myDropdown1").value, 'label2': document.getElementById("myDropdown2").value, 'label3': document.getElementById("myDropdown3").value});
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
