$(document).ready(function() {
  // var appSMID = "31fe834a26";
  var appWMID = "6gr6wmjn5syaa4dxx5kyjq66"
  $.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
      var http = window.location.protocol === 'http:' ? 'http:' : 'https:';
      options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    }
  });


  ///////product search///////
  $("#query-btn").click(function() {

    // 		$.ajaxPrefilter(function(options) {
    // 		if (options.crossDomain && jQuery.support.cors) {
    // 				var http = window.location.protocol === 'http:' ? 'http:' : 'https:';
    // 				options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    // 		}
    // });

    var query_param = $('#productname').val();
    var psearch = "http://api.walmartlabs.com/v1/search?apiKey=" + appWMID + "&query=" + query_param;
    // var psearch ="http://www.SupermarketAPI.com/api.asmx/SearchByProductName?APIKEY="+appSMID+"&ItemName="+query_param;




    $.getJSON(psearch, function(res) {
      // 	for (var i=0;i<res.items.length;i++){
      // 	 var itemdiv=$('<div id="itemdiv">');
      // 	 var itempicwin=$('<img id="itemwin">');
      // 	 var itempic = res.items[0].mediumImage;
      // 	 var itemName =res.items[0].name;
      // 	 console.log(itempic);
      // 	 console.log(itemName);
      //	console.log(res);
      // }
      // .then(function(res){

    }).then(function(res) {
      $('#searchrequest').html("Available Items For " + query_param)
      for (var i = 0; i < res.items.length; i++) {
        var itemdiv = $('<div class="itemdiv">');
        var itempicwin = $('<img class="itemwin">');
        var itemselecbutn = $('<button class="itemselc">Add</button>');
        var imgrating = $('<img>').attr('src', res.items[i].customerRatingImage);
        var itempic = res.items[i].mediumImage;
        var itemName = $('<p>').text(res.items[i].name);
        // var itemRating= res.items[i].customerRatingImage;
        var itemprice = "$ " + res.items[i].salePrice;

        itempicwin.attr("src", itempic);


        itemdiv.append(itempicwin).append(itemprice).append(itemName).append(imgrating).append(itemselecbutn);
        // itemdiv.append(itemprice);

        $('#Results').prepend(itemdiv);



      }
    })

  })


  ///////////trending query////
  $('#trending').on('click', function() {
    var trensearch = "http://api.walmartlabs.com/v1/trends?apiKey=" + appWMID + "&format=json"

    $.getJSON(trensearch, function(res) {
      console.log(res);
    }).then(function(res) {
      $('#searchrequest').html("Trending Seach Results");
      for (var i = 0; i < res.items.length; i++) {
        var itemdiv = $('<div class="itemdiv">');
        var itempicwin = $('<img class="itemwin">');
        var itemselecbutn = $('<button class="itemselc">Add</button>');
        var imgrating = $('<img>').attr('src', res.items[i].customerRatingImage);
        var itempic = res.items[i].mediumImage;
        var itemName = $('<p>').text(res.items[i].name);
        var itemprice = "$ " + res.items[i].salePrice;
        var itemcartprice = res.items[i].salePrice;

        itempicwin.attr("src", itempic);
        itemdiv.append(itempicwin).append(itemprice).append(itemName).append(imgrating).append(itemselecbutn);

        $('#Results').prepend(itemdiv);

      itemselecbutn.attr("name",res.items[i].name).attr("image",itempic).attr("price",res.items[i].salePrice);





      }
      ////Item select for cart///
    $('.itemselc').on('click', function() {
      var cartprice =$(this).attr("price");
      var cartpic = $(this).attr("image");
      var cartname= $(this).attr("name");
       var quantity =0;
        quantity++;
      console.log(cartprice);


      $.ajax({
        type: 'POST',
        url: '/api/cart',
        data: JSON.stringify({ ProductName: cartname, Quantity: quantity, Price: cartprice}),
        contentType: 'application/json',
        dataType:'json'

      }).then(function(res){
        console.log(res);
      })



  })

    })

  });



});
