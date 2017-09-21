var gui = {
  roll: function() {
    var holdDice = new Array(5);
    for (var i = 0; i < 5; i++) {
          holdDice[i] = $("#die" + (i + 1)).hasClass("hold");
    }

    service.roll(holdDice);
    var dice = service.getDice();

    for (var i = 0; i < 5; i++)
      $("#die" + (i + 1)).attr("src", "img/die" + dice[i] + ".png");

    var throwCount = service.getThrowCount();
    $("#throwCount").text(throwCount);
    if (throwCount >= 3)
      $("button").attr("disabled", true);


    var resultArray = service.getResults();
    for (var i = 0; i < 15; i++) {
      let tag = "#result" + i;
      if (!$(tag).hasClass("used"))
        $(tag).attr("value", "" + resultArray[i]);
    }
  },

  holdDie: function(id) {
    if (service.getThrowCount() > 0) {
      if($(id).hasClass("hold"))
        $(id).removeClass("hold");
      else
        $(id).addClass("hold");
    }
  },

  useResult: function(id) {
    if (service.getThrowCount() > 0 && !$(id).hasClass("used")) {
      $(id).addClass("used");

      service.resetThrowCount();
      $("#throwCount").text(service.getThrowCount());
      $("button").attr("disabled", false);

      $("input").each(function() {
        if (!$(this).hasClass("used"))
          $(this).attr("value", "");
      });

      $("img").each(function() {
        $(this).attr("src", "img/die0.png");
        if ($(this).hasClass("hold"))
          $(this).removeClass("hold");
        else
          $(this).attr("value", "");
      });

      // update kinds
      var sum = 0;
      for (var i = 0; i < 6; i++)
        if ($("#result" + i).hasClass("used"))
          sum += parseInt($("#result" + i).attr("value"));
      if (sum > 0)
        $("#count_sum").attr("value", sum);
      if (sum >= 63)
        $("#bonus").attr("value", "50");

      // update rest
      sum = 0;
      for (var i = 6; i < 15; i++)
        if ($("#result" + i).hasClass("used"))
          sum += parseInt($("#result" + i).attr("value"));
      if (sum > 0)
        $("#sum").attr("value", sum);

      // update total
      sum = 0;
      if ($("#count_sum").attr("value"))
        sum += parseInt($("#count_sum").attr("value"));
      if ($("#bonus").attr("value"))
        sum += parseInt($("#bonus").attr("value"));
      if ($("#sum").attr("value"))
        sum += parseInt($("#sum").attr("value"));
      if (sum > 0)
        $("#total").attr("value", sum);
    }
  }
}

// setup
$(document).ready(function() {
    $("button").on("click", gui.roll);

    $("img").on("click", function() {
      gui.holdDie("#" + $(this).attr("id"));
    });

    $(".result").on("click", function() {
      gui.useResult("#" + $(this).attr("id"));
    });

    $("input").attr("readonly", "readonly");
});
