$(document).ready(function () {

	//al click sul pulsante di ricerca
	$(".btn").click(function () {

		//la barra di ricerca torna vuota
		

		callAjaxFilm();

		resetCasella();
	

	});

	

});

function resetCasella() {
	$("input:text").val("")
}

function callAjaxFilm() {
	
	var q = $(".casella").val();

	$.ajax({
		url: "https://api.themoviedb.org/3/search/movie",
		method: "GET",
		data: {
			api_key: "d74de08606fa199c2ea341c8be9368d2",
			query: q,
			language: "it-IT"
		},

		//in caso di successo
		success: function (data) {
			console.log("success", data);

			//salvo per comodità in movies gli oggetti dell'array results
			var movies = data.results;

			//eseguo la funzione che stampa i film
			stampa(movies);

			//se ci sono i risultati della ricerca film in pagina, si 
			if (movies.length > 0) {
				resetCasella();
			}

		},
		error: function (stato) {
			console.log("c'è stato un errore: " + stato);
		}
	})
}

function stampa(movies) {

	//cancella risultati in pagina della precedente ricerca
	$("#hb-container").html("");

	
	

	for (var i = 0; i < movies.length; i++) {

		var elemento = movies[i];
		var source = $(".movie-tmpl").html();
		var template = Handlebars.compile(source);

		var context = {

			title: elemento.title,
			original_title: elemento.original_title,
			lingua: elemento.original_language,
			flag: getFlag(elemento.original_language),
			rate: Math.ceil(elemento.vote_average)
		};

		var html = template(context);
		$("#hb-container").append(html);

	}
}

//funzione per creazione bandiere
function getFlag(flag) {
	var bandiera;

	switch (flag) {
		case "en":
				bandiera = "<img src='img/bandiera-inglese.jpg'>";
			break;

		case "it":
			bandiera = "<img src='img/bandiera-italia.jpg'>";
		break;
	}
	return flag;
};


// //al click sul bottone di ricerca...
// $(".btn").click(function () {

// 	//.val() mi restituisce ciò che è stato scritto nell'input
// 	var value = $(".casella").val();

// 	//invoco la funzione recall (che fa la chiamata ajax) e gli passo la var value che contiene l'input
// 	recall(value);

// });

// function recall(searchQuery) {


// }

// //ciclo sull'array di oggetti (reults) che mi fornisce l'API per ottenere i singoli oggetti
// for (var i = 0; i < data.results.length; i++) {

// 	//salvo il valore della proprietà title
// 	console.log("questo è il titolo " + data.results[i].title);
// 	var titoloFilm = data.results[i].title;

// 	//salvo il valore della proprietà original_title
// 	console.log("questo è il titolo originale " + data.results[i].original_title);
// 	var titoloOriginale = data.results[i].original_title;

// 	//salvo il valore della proprietà lingua
// 	console.log("questa è la lingua " + data.results[i].original_language);
// 	var lingua = data.results[i].original_language;

// 	//salvo il valore della proprietà voto
// 	console.log("questo è il voto " + data.results[i].vote_count);
// 	var voto = data.results[i].vote_count;

// 	// $(".info-film").append("<li>" + titoloFilm + " " + titoloOriginale + " " + lingua + " " + voto + " " + "</li>");
// 	$(".info-film").append("<li>" + titoloFilm + "</li>" + " " + "<li>" + titoloOriginale + "</li>" + " " + "<li>" + lingua + "</li>" + " " + "<li>" + voto + "</li>");
// }