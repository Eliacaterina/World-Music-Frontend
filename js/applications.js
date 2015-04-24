$(document).ready(function(){

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
	    		$('#logout-btn').show();
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
					$('#logout-btn').hide(1000);
			  	$("#signInForm").show(1000);
			  	$("#signUpForm").hide(1000);

				} 
		 });
	});

	$("#startButton").on('click', function(event){

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
	    	if (response.ok !== 1){
			    $('.userPass1').val("");
			    $('.userPass').val("");
	    		alert('Wrong username/password');
	    	} else {
				  $('#home').hide(1000);
				  $('#page2').show(1000);
	    		$('#logout-btn').show(1000);
			    $('.userPass1').val("")
			    $('.userPass').val("")
		      console.log("create session / logged in", response);
	    	}

	    }
	  });
	});


	$("#startButton2").on('click', function(event){

		event.preventDefault();

		$.ajax({
			type:"POST",
			url: "http://localhost:3000/users",
			data: {
				user: {
					username: $('#userPass2').val(),
					email:    $('#userPass3').val(),
					password: $('#userPass4').val()
				}
			},
		
			success: function(response){
				if (response["ok"] !== 1) {
					alert("User already exist")
				} else {
			  	$('#home').hide(1000);
			  	$('#page2').show(1000);
	    		$('#logout-btn').show(1000);

					console.log("created session", response);
					$('#userPass2').val(""),
				  $('#userPass3').val(""),
			    $('#userPass4').val("")

				}
			}
		});
	});

	var dropdownAppended = false;

	$('#countryDropdown').on('click', function(event){
		event.preventDefault();
		if (!dropdownAppended ) {
			$.ajax({
				type:"GET",
				url: "http://localhost:3000/countries",
			
				success:function(response){
					response.forEach(function(elem){
						$('.dropdown-menu').append("<li class='countries'>" + elem.country + "</li>");	
					});
					$(".countries").on('click',countryHandler);				
				}
			});
			dropdownAppended = true
		}
	});

	$(document).on('click', '#join', function(){
	  	console.log("test");
	  	$("#signInForm").hide(1000);
	  	$("#signUpForm").show(1000);
	}); 

	$("#signUpForm").hide();

	var Country;
  
  var countryHandler = function() {
		Country = $(this).text()

		$.ajax({
			type:"GET",
			url: "http://localhost:3000/songs/" + Country,
			success: function(response){

				$('#cutie').hide(1000);
				$('.tableContent').html('');
				if (response == []) {
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
							"<<td><a href='" + url + "'>YouTube Link</a></td>");
					})
				}
			}
		})
	};

	$(document).on('click',"#submitButton", function(){

		var title = $("#title").val();
		var artist= $("#artist").val();
		var link  = $("#url").val();

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
				console.log(response);

				 $("#title").val("");
 				 $("#artist").val("");
		     $("#url").val("");

				$(".tableContent").append("<tr>" +
					"<td>" + title + "</td>" +
					"<td>" + artist + "</td>" +
					"<td><a href='" + link + "'>YouTube Link</a></td>"

				);
			}
		})
	})
  
});
