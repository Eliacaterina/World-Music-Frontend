// $(document).ready(function(){

	var authenticate = function() {
		$.ajax({
	    type: "GET",
	    url: "http://localhost:3000/authenticated",
	    xhrFields: {
		    withCredentials: true
		  },
	    success: function(response) {
	    	console.log(response);
	    	if(response.authenticated) {
	    		$('#home').hide(1000);
				  $('#page2').show(1000);
	    	}
	    }
		});
	};

	authenticate();

	$(document).on('click', "#logout-btn", function(){
		$.ajax({
			type: "DELETE",
			url: "http://localhost:3000/sessions",
			xhrFields: {
				withCredentials: true
			},
				success: function(response) {
				 $('#home').show(1000);
	 		   $('#page2').hide(1000);
	 		   $('.page3').hide(1000);
				} 
		 });
	});

	// var logOut = function() {
	// 	$.ajax({
	//     type: "DELETE",
	//     url: "http://localhost:3000/sessions",
	//     xhrFields: {
	// 	    withCredentials: true
	// 	  },
	//     success: function(response) {
	//     	console.log(response);
 //    		$('#home').show(1000);
	// 		  $('#page2').hide(1000);
	    	
	//     }
	// 	});
	// };



	$(document).on('click', "#startButton", function(event){

		event.preventDefault();

		$.ajax({
	    type: "POST",
	    url: "http://localhost:3000/sessions",
	    data: {
	      user: {
	        username: $('.userPass1').val(),
	        password: $('.userPass').val()
	      }
	    },
	    dataType: 'JSON',
		  xhrFields: {
		    withCredentials: true
		  },
	    success: function(response){

	    	if (response.message != "user doesn't exist"){
				  $('#home').hide(1000);
				  $('#page2').show(1000);
	    	}

	      console.log("create session / logged in", response);
		      $('.userPass1').val(""),
		      $('.userPass').val("")
	    }
	  });
	});


	$(document).on('click', "#startButton2", function(event){

		event.preventDefault();

		$.ajax({
			type:"POST",
			url: "http://localhost:3000/users",
			data: {
				user: {
					username: $('.userPass2').val(),
					email:    $('.userPass3').val(),
					password: $('.userPass4').val()
				}
			},
		
			success:function(response){

				$('#startButton2').click(function(){
			  	$('#home').hide(1000);
			  	$('#page2').show(1000);
			  });

				console.log("created session", response);
					$('.userPass2').val(""),
				  $('.userPass3').val(""),
			    $('.userPass4').val("")
			}
		});
	});

	var dropdownAppended = "not appended";

	$(document).on('click', ".dropdown-toggle", function(event){

		event.preventDefault();
		if (dropdownAppended == "not appended") {
			$.ajax({
				type:"GET",
				url: "http://localhost:3000/countries",
			
				success:function(response){
				// 	for(var i=0; i<response.length; i++) {
				// 			$('.dropdown-menu').append("<li>" + response[i].country + "</li>");
				// 		}
				// 	}
					response.forEach(function(elem){
						$('.dropdown-menu').append("<li>" + elem.country + "</li>");	
					});
				}
			});
			dropdownAppended = "appended"
		}
	});

	$(document).on('click', '#join', function(){
	  	console.log("test");
	  	$("#signInForm").hide(1000);
	  	$("#signUpForm").show(1000);
	}); 

	$("#signUpForm").hide();

	var Country;
		  
  $(document).on('click',"li",function(){
		console.log(this);
		Country = $(this).text()

		$.ajax({
			type:"GET",
			url: "http://localhost:3000/songs/" + Country,
			success:function(response){
			$('.tableContent').html('')
				if (response == []){
				 //show table code here without foreach loop
				  $('.page3').show(1000);
				} else {
				 //also show table code with foreach loop
					$('.page3').show(1000);
					response.forEach(function(song){
						if (song == undefined) { debugger }
						var Country = song.Country;
						var title   = song.title;
						var artist  = song.artist;
						var url     = song.url; 
						$(".tableContent").append("<tr>" +
							"<td>" + title + "</td>" +
							"<td>" + artist + "</td>" +
							"<td><a href+'url link'>" + url + "</a></td>");
					})
				}
			}
		})
	});
		// console.log(response);
				// console.log(response[0].title);
				// console.log(response[0].Country);
				// $('.page3').show(1000);
				// response.forEach(function(song){
				// 	if (song == undefined) { debugger }
				// 	var Country = song.Country;
				// 	var title   = song.title;
				// 	var artist  = song.artist;
				// 	var url     = song.url; 
				// 	$(".tableContent").append("<tr>" +
				// 		"<td>" + title + "</td>" +
				// 		"<td>" + artist + "</td>" +
				// 		"<td><a href+'url link'>" + url + "</a></td>"

				// 	);
				// })

	$(document).on('click',"#submitButton", function(){

		var title = $("#title").val();
		var artist= $("#artist").val();
		var link  = $("#url").val();

		// debugger

		console.log(title, artist, link)

		$.ajax({
			type:"POST",
			url:"http://localhost:3000/songs",
			data: {
				song: { 
					title:  $('#title').val(),
					artist: $('#artist').val(),
					url:    $('#url').val(),
					Country: Country
				}
			},
			dataType: 'JSON',
		  xhrFields: {
		    withCredentials: true
		  },
			success:function(response){

				 $("#title").val("");
 				 $("#artist").val("");
		     $("#url").val("");

				$(".tableContent").append("<tr>" +
					"<td>" + title + "</td>" +
					"<td>" + artist + "</td>" +
					"<td><a href+'url link'>" + link + "</a></td>"

				);
			}
		})
	})

	  

  
// });
