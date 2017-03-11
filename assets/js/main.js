// Initial array of animals
var animal = ["bird", "snake", "pig", "lion"];
// Function for displaying animal data
function displayAnimalInfo() {
  var animalSelect = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalSelect + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
            var results = response.data;
            console.log(results);
           for (var i = 0; i < results.length; i++) {
            // Creating and storing a div tag
            var animalDiv = $("<div>");
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.original_still.url);
            animalImage.attr("data-still", results[i].images.original_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            animalImage.addClass("gif");
            animalImage.attr("width", "300px");
            animalImage.attr("height", "200px");

            $(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
              var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
            });


            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);
            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#animals").prepend(animalDiv);
          }
        });
 
      }  


  function renderButtons() {
        // Deleting the animal prior to adding new animal
        // (this is necessary otherwise you will have repeat buttons)
    $("#animalButtons").empty();
        // Looping through the array of animal
      for (var i = 0; i < animal.length; i++) {
        // Then dynamicaly generating buttons for each animal in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of animal to our button
        a.addClass("animal");
        // Adding a data-attribute
        a.attr("data-name", animal[i]);
        
        // Providing the initial button text
        a.text(animal[i]);
        // Adding the button to the buttons-view div
        $("#animalButtons").append(a);
      }
    }
      // This function handles events where a animal button is clicked
      $("#addAnimal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var inputAnimal = $("#animal-input").val().trim();
        // Adding animal from the textbox to our array
        animal.push(inputAnimal);
        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
      });
      // Adding a click event listener to all elements with a class of "animal"
      $(document).on("click", ".animal", displayAnimalInfo);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();
