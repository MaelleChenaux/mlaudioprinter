var PAGE_IP_ADDRESS = "10.192.164.21:3000";


function sendDataComplete(jsonData, callback){
  let data_to_send = jsonData;

  $.post(
    "http://" + PAGE_IP_ADDRESS + "/setParams/",
    data_to_send,
    callback
  );
}

function post_done(data, status) {
  console.log(data);
  console.log(status);
}

function sendData(jsonData){
  sendDataComplete(jsonData, post_done);
}

function sendSettings() {
  sendData({
    'label0': document.getElementById("sound1").options[document.getElementById("sound1").selectedIndex].value,
    'label1': document.getElementById("sound2").options[document.getElementById("sound2").selectedIndex].value,
    'label2': document.getElementById("sound3").options[document.getElementById("sound3").selectedIndex].value,
  });

}

var x, i, j, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);


let elSend = document.querySelector('#save');

elSend.addEventListener('click', function() {
  var data = {
    'label0': document.getElementById("sound1").options[document.getElementById("sound1").selectedIndex].value,
    'label1': document.getElementById("sound2").options[document.getElementById("sound2").selectedIndex].value,
    'label2': document.getElementById("sound3").options[document.getElementById("sound3").selectedIndex].value,
  };

  sendDataComplete(data, function(data, status) {
    console.log("callback");
    console.log(data);
    console.log(status);
    location.href="index.html";  ///// ./ ?
  });

});
