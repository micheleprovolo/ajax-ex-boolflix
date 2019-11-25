// DESCRIZIONE:


$(document).ready(function () {

	//al click sul bottone di ricerca invoco la funzione recall
	$(".btn").click(recall);

});

function recall() {
	
	$.ajax({
		url: "https://api.themoviedb.org/3/search/movie?api_key=d74de08606fa199c2ea341c8be9368d2&query=ritorno+al+futuro",
		method: "GET",

		success: function (data) {
			console.log("success", data.results);

			//ciclo sull'array di oggetti (reults) che mi fornisce l'API per ottenere i singoli oggetti
			for (var i = 0; i < data.results.length; i++) {

				//salvo il valore della proprietà title
				console.log(data.results[i].title);
				var titoloFilm = data.results[i].title;

				//salvo il valore della proprietà original_title
				console.log(data.results[i].original_title);
				var titoloOriginale = data.results[i].original_title;

				//salvo il valore della proprietà lingua
				console.log(data.results[i].original_language);
				var lingua = data.results[i].original_language;

				//salvo il valore della proprietà voto
				console.log(data.results[i].vote_count);
				var voto = data.results[i].vote_count;
			}

		},
		error: function (stato) {
			console.log("c'è stato un errore: " + stato);
		}
	})
}

// https://api.themoviedb.org/3/search/movie?api_key=d74de08606fa199c2ea341c8be9368d2&query=