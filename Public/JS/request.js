$(document).ready(function() {
	
        $('#parseText').on('click', function() {
                var text = $('#notes').val();
                console.log(textFunctions.parse(text));
	});

});

/*                 $.ajax({
                        url: "http://localhost:82",
                        context: document.body,
                        success: function(result) {
                        $(this).append("<h3>Yay!!</h3>");
                        }
                }).done(function() {
                        console.log("ajax call!");
                }); */