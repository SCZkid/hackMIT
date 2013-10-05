$(document).ready(function() {
	$('#addText').on('click', function() {
		console.log("addText clicked");
        $.ajax({
        	url: "http://localhost:82",
        	context: document.body,
        	success: function(result) {
                $(this).append(result);
        	}
        }).done(function() {
        	console.log("ajax call!");
        });
	});
});