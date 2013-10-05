$(document).ready(function() {
	$("#btn_parse").click(function() {
		createNotecards($("#markdown_input").val());
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