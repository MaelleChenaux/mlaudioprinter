var PAGE_IP_ADDRESS = "172.20.10.12:3000";
// var PAGE_IP_ADDRESS = "localhost:3000";

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
