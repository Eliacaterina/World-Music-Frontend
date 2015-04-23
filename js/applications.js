// $(document).ready(function(){

	var authenticate = function() {
		$.ajax({
		  type: "GET",
		  url: "http://localhost:3000/authenticated",
		  xhrFields: {
		    withCredentials: true
		  },
		  success: function(response){
		    console.log("is it", response);
		  }
		});
		// $.ajax({
	 //    type: "GET",
	 //    url: "http://localhost:3000/authenticated",
	 //    xhrFields: {
		//     withCredentials: true
		//   },
	 //    success: function(response) {
	 //    	console.log(response);
	 //    	if(response.authenticated) {
	 //    		$('#home').hide(1000);
		// 		  $('#page2').show(1000);
	 //    	}
	 //    }
		// });
	};

	authenticate();

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
	    
	   
	    success: function(response){

	    	if (response.message != "user doesn't exist"){
				  $('#home').hide(1000);
				  $('#page2').show(1000);
	    	}

	      console.log("create session / logged in", response);
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

	// $(document).on('click', '#join', function(){
	//   	console.log("test");
	//   	$("#signInForm").hide(1000);
	//   	$("#signUpForm").show(1000);
	// }); 


	

		// $("#signUpForm").hide();
		
	  
	  
	 

	  
 //  $(document).on('click',"li",function(){
	// 	console.log(this);
	// 	var country = $(this).text()

	// 	$.ajax({
	// 		type:"GET",
	// 		url: "http://localhost:3000/songs/" + country,
	// 		success:function(response){
	// 			console.log(response[0].title);
	// 			console.log(response[0].country);
	// 			$('.page3').show(1000);
	// 			response.forEach(function(song){

	// 				var country = song.country;
	// 				var title   = song.title;
	// 				var artist  = song.artist;
	// 				var url     = song.url; 
	// 				$(".tableContent").append("<tr>" +
	// 					"<td>" + title + "</td>" +
	// 					"<td>" + artist + "</td>" +
	// 					"<td><a href+'url link'>" + url + "</a></td>"

	// 				);
	// 				//<tr>
	// 				//  <td>title</td>
	// 				//  <td>artist</td>
	// 				//  <td><a href='url link'>url</a></td>
	// 				//</tr>
	// 			})
	// 		}
	// 	})
	// });

	// $(document).on('submit',".submitNewSong", function(){

	// 	var title =$(".title").text();
	// 	var artist=$(".artist").text();
	// 	var link  =$(".url").text();

	// 	console.log(title, artist, link)

	// 	$.ajax({
	// 		type:"POST",
	// 		url:"http://localhost:3000/songs",
	// 		success:function(response){

	// 			$(".tableContent").append("<tr>" +
	// 				"<td>" + title + "</td>" +
	// 				"<td>" + artist + "</td>" +
	// 				"<td><a href+'url link'>" + url + "</a></td>"

	// 			);
	// 		}

	// 	})
	// })

	  

  
// });
