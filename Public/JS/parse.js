var base_url = "http://localhost:9001";

$(document).ready(function() {
	var dbox = dbox_utility();
	$("#btn_parse").click(function() {
		createNotecards($("#markdown_input").val());
	});
	$("#btn_db_create").hide();

	$("#btn_dropbox").click(function() {
		$.ajax({
			type: 'POST',
			data: {},
			url: base_url+"/dropbox/init",
			success: function(response)
			{
				console.log(response);
				$("#dropbox_link").attr("href", response.url);

				$("#dropboxAccessModal").modal("show");
			}
		});
	});

	$("#submit_search").click(function() {
		$.ajax({
			type: "POST", 
			data: {keywords: $("#search_keyword").val(), concepts: $("#search_concept").val()},
			url: base_url+"/search",
			success: function(response)
			{

			}
		});
	})

	$("#btn_dropbox_confirm").click(function() {
		$.ajax({
			type: "POST",
			url: base_url+"/dropbox/confirm",
			success: function(response)
			{
				$("#dropboxAccessModal").modal("hide");
				$("#btn_dropbox").hide();
				//$("#btn_db_create").fadeIn();

				refreshFiles();
			}
		});
	});
	$("#btn_save_name").click(function() {
		console.log("Save");
		$.ajax({
			type: "POST",
			data: {note_name: $("#new_file_name").val() },
			url: base_url+"/dropbox/create",
			success: function(response)
			{
				console.log(response);
				$("#createFileName").modal("hide");
				$("#new_file_name").val("");
				refreshFiles();
			}
		});
	});

	$("#btn_save_markdown").click(function() {
		$.ajax({
			type: "POST",
			data: {note_name: $("#list_notes a.active").html(), note_content: $("#markdown_input").val()},
			url: base_url+"/dropbox/saveFile",
			success: function(response)
			{
				console.log(response);
			}
		})
	});
});

//Assumes one question or answer per line
function createNotecards(markdown)
{
	questions = [];
	answers = [];

	var lines = markdown.match(/^.*([\n\r]+|$)/gm);
	for (var i = lines.length - 1; i >= 0; i--) {
		var qIndex = lines[i].indexOf("!q");
		var aIndex = lines[i].indexOf("!a");
		if (qIndex > -1)
		{
			qIndex += 2;
			var question = lines[i].substring(qIndex);
			questions.push(question);
		}
		else if (aIndex > -1)
		{
			aIndex +=2;
			var answer = lines[i].substring(aIndex);
			if (answers[questions.length] === undefined)
				answers[questions.length] = answer;
			else
				answers[questions.length] = answer + "<br/><br/>" + answers[questions.length];
		}
	};

	console.log(questions);
	console.log(answers);

	questions.reverse();
	answers.reverse();

	displayNotecards(questions, answers);
}

function displayNotecards(questions, answers)
{
	//$("#notecardsModal").html("<div class='Clear'></div>");
	for (var i = questions.length - 1; i >= 0; i--) {
		var newNotecard = "<div class='notecard'><div class='question'>"+questions[i]+"</div><div class='answer'>"+answers[i]+"</div></div>";
		$("#notecard_container").prepend(newNotecard);
	};

	$("#notecardsModal").modal("show");
}

function refreshFiles()
{
	$.ajax({
		type: "GET",
		url: base_url+"/dropbox/list",
		success: function(response)
		{
			$("#list_notes").html("");
			console.log(response);
			for (var i = response.length - 1; i >= 0; i--) {
				var newLink = "<a href='#' class='list-group-item'>"+response[i].substring(1)+"</a>";
				$("#list_notes").append(newLink);
			};

			$("#list_notes a").click(function(ev) {
				ev.preventDefault();
				console.log($(this));
				$(this).toggleClass("active");
				$.ajax({
					type: "POST",
					url: base_url+"/dropbox/getFile",
					data: {note_name: $(this).html()},
					success: function(response)
					{
						$("#markdown_input").val(response);
						
					}
				});
			});
		}
	});
}