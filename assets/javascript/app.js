$( document ).ready(function() {
    console.log( "ready!" );

var sports = ["Baseball", "Rugby", "Soccer"];

       

        //Function for displaying sport gif
        function renderButtons(){


            //Deleting prior to adding new buttons to avoid repeat buttons

            $("#gif-view").empty();

            for(var i = 0; i< sports.length; i++ ){

                //dynamically generating buttons for sports in array
                var a = $("<button>");
                // Adding a class
                a.addClass("sport");
                // a.addID(sports[i]);
                //Adding a data attribute with a value of the sport at index i
                a.attr("data-name", sports[i]);
                //Providing the button's text with a value of the sport at index i
                a.text(sports[i]);
                //Adding the button to the HTML
                $("#gif-view").append(a);
            }
        }

        //Function to handle where one button is clicked
        $("#add-sport").on("click", function(event){

            event.preventDefault();
            //prevents the form from trying to submit itself

            var sport = $("#gif-input").val().trim();
            // Add the sport from the textbox to our array
            sports.push(sport);

            // calling renderButtons which handles the processing of our movie array
            renderButtons();
        });


        renderButtons();
        $("#sport-button").on("click", function(event){

            event.preventDefault();
            var sport = $("#gif-input").val().trim();

            // var sport = $(this).attr("data-name");
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=2ivPQQvVkoQeyV3zEwTbc3VcKVEV54TY&limit=10";



             // Creating an ajax call for the button pressed
             $.ajax({
            url: queryURL,
            method: "GET"
             }).then(function(response){
                $("#gif-container").empty();
                 console.log(response);
                 var gifs = response.data; 

                 for(var i=0;i<gifs.length;i++){
                     
                 var dataImage = $("<img>");
                 dataImage.attr("src", gifs[i].images.fixed_height_still.url);
                 dataImage.attr("data-still", gifs[i].images.fixed_height_still.url);
                 dataImage.attr("data-animate", gifs[i].images.fixed_height.url);
                 dataImage.addClass("gif");
                 dataImage.attr("data-state", "still");
           
                 var newItemdiv = $('<div class="newItem">');
                 var gifRating = gifs[i].rating;
                 var divRating = $("<p>").text("Rating: " + gifRating);
           
                 newItemdiv.append(divRating);
                 newItemdiv.append(dataImage);
           
                 $("#gif-container").prepend(newItemdiv);
                 }
 });
});
            $(document.body).on("click",".gif",function(){
                console.log("click working");
             
                var state = $(this).attr("data-state")
                console.log(state);
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                }
                else if (state === "animate"){
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");

                }
            })
                 
       

      
        function appendGifs(gifs) {
            for (var i = 0; i <= 10; i++) {
              console.log(gifs[i])
              var dataImage = $("<img>");
              dataImage.attr("src", gifs[i].images.fixed_height_still.url);
              dataImage.attr("data-still", gifs[i].images.fixed_height_still.url);
              dataImage.attr("data-animate", gifs[i].images.fixed_height.url);
              dataImage.addClass("gif");
              dataImage.attr("data-state", "still");
        
              var newItemdiv = $('<div class="newItem">');
              var gifRating = gifs[i].rating;
              var divRating = $("<p>").text("Rating: " + gifRating);
        
              newItemdiv.append(divRating);
              newItemdiv.append(dataImage);
        
              $("#gifs").prepend(newItemdiv);
            }
          }
        
            $(document).on("click", ".sport", function(e){
                console.log(e.target.innerText)
                var buttonValue = e.target.innerText;
                var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonValue + "&api_key=2ivPQQvVkoQeyV3zEwTbc3VcKVEV54TY&limit=10";



             // Creating an ajax call for the button pressed
             $.ajax({
            url: queryURL,
            method: "GET"
             }).then(function(response){
                 console.log(response);
                 var gifs = response.data; 
                $("#gif-container").empty();
                 for(var i=0;i<gifs.length;i++){
                     
                 var dataImage = $("<img>");
                 dataImage.attr("src", gifs[i].images.fixed_height_still.url);
                 dataImage.attr("data-still", gifs[i].images.fixed_height_still.url);
                 dataImage.attr("data-animate", gifs[i].images.fixed_height.url);
                 dataImage.addClass("gif");
                 dataImage.attr("data-state", "still");
           
                 var newItemdiv = $('<div class="newItem">');
                 var gifRating = gifs[i].rating;
                 var divRating = $("<p>").text("Rating: " + gifRating);
           
                 newItemdiv.append(divRating);
                 newItemdiv.append(dataImage);
           
                 $("#gif-container").prepend(newItemdiv);
                 }
            });
    })
})