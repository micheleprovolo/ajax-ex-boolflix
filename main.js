// DESCRIZIONE:


$(document).ready(function () {

	//al click sulla barra di ricerca viene cancellato ciò che era stato scritto in precedenza
	$("input:text").click(function(){

			$(this).val("");

			$(".info-film").empty();
		});

	// $(".casella").click(function () {
	// $(".info-film").remove();
	// });

	//al click sul bottone di ricerca...
	$(".btn").click(function () {
		
		//.val() mi restituisce ciò che è stato scritto nell'input
		var value = $(".casella").val();

		//invoco la funzione recall (che fa la chiamata ajax) e gli passo la var value che contiene l'input
		recall(value);

	});
	

});



function recall(searchQuery) {

	$.ajax({
		url: "https://api.themoviedb.org/3/search/movie?api_key=d74de08606fa199c2ea341c8be9368d2&query=" + searchQuery,
		method: "GET",

		success: function (data) {
			console.log("success", data.results);

			//ciclo sull'array di oggetti (reults) che mi fornisce l'API per ottenere i singoli oggetti
			for (var i = 0; i < data.results.length; i++) {

				//salvo il valore della proprietà title
				console.log("questo è il titolo " + data.results[i].title);
				var titoloFilm = data.results[i].title;

				//salvo il valore della proprietà original_title
				console.log("questo è il titolo originale " + data.results[i].original_title);
				var titoloOriginale = data.results[i].original_title;

				//salvo il valore della proprietà lingua
				console.log("questa è la lingua " + data.results[i].original_language);
				var lingua = data.results[i].original_language;

				//salvo il valore della proprietà voto
				console.log("questo è il voto " + data.results[i].vote_count);
				var voto = data.results[i].vote_count;

				$(".info-film").append("<li>" + titoloFilm + " " + titoloOriginale + " " + lingua + " " + voto + " " + "</li>");
			}

		},
		error: function (stato) {
			console.log("c'è stato un errore: " + stato);
		}
	})
}