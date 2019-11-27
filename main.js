$(document).ready(function () {

	//al click sul pulsante di ricerca
	$(".btn").click(function () {

		//la barra di ricerca torna vuota

		//chiamata dell'API dei film
		callAjaxFilm();

		//chiamata dell'API delle serie TV
		// callAjaxSerie();

		//pulizia casella di ricerca
		resetCasella();

		//cancella risultati in pagina della precedente ricerca
		$("#hb-container").html("");

	});


});


//FUNZIONI

// funzione per chiamata dell'API dei film
function callAjaxFilm() {

	//salvo nella variabile q il valore inserito nella casella di ricerca da parte dell'utente
	var q = $(".casella").val();

	//chiamata
	$.ajax({

		url: "https://api.themoviedb.org/3/search/movie",
		method: "GET",
		data: {
			api_key: "d74de08606fa199c2ea341c8be9368d2",
			query: q,
			language: "it-IT"
		},

		//in caso di successo della chiamata
		success: function (data) {
			//console.log("success", data);


			//ciclo sull'array di oggetti (results) che mi fornisce l'API per ottenere i singoli oggetti
			for (var i = 0; i < data.results.length; i++) {

			//salvo per comodità in movie gli oggetti dell'array results (che sono i film)
			var movie = data.results[i];
			
			//la media voti viene portata a numero intero e da base 10 a base 5
			movie.vote_average = Math.floor(movie.vote_average/2)

			var source = $(".movie-tmpl").html();

			var template = Handlebars.compile(source);

			var context = {

				title: movie.title,
				original_title: movie.original_title,
				lang: movie.original_language,
				flag: getFlag(movie.original_language),
				// stars: getStars(movie.vote_average)
			};

			var html = template(context);

			//stampo in pagina tramite HB
			$("#hb-container").append(html);

			}

		},
		error: function (stato) {
			console.log("c'è stato un errore: " + stato);
		}
	});
};


//funzione per creazione bandiere al posto della lingua
function getFlag(lang) {
	var bandiera = [
		'it',
		'en',
		'us'
	];

	if (bandiera.includes(lang)) {
		return "<img src='img/" + lang + ".png'>";
	}
	return "";
};

function resetCasella() {
	$("input:text").val("");
}





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