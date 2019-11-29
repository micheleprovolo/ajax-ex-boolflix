$(document).ready(function () {
	//premendo invio dopo aver scritto nella casella di ricerca vine lanciata la funzione triggerata dal click
	$(".casella").keypress(function (event) {
		var key = event.which; //event.which ritorna quale pulsante è stato premuto
		if (key == 13) {
			$(".btn").click();
		}
	});

	//al click sul pulsante di ricerca
	$(".btn").click(function () {

		//chiamata dell'API dei film
		callAjaxFilm();

		//chiamata dell'API delle serie TV
		callAjaxSerie();

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

				//salvo per comodità in element gli oggetti dell'array results (che sono i film)
				var element = data.results[i];

				//la media voti viene portata a numero intero e da base 10 a base 5
				element.vote_average = Math.ceil(element.vote_average / 2);

				var source = $(".movie-tmpl").html();

				var template = Handlebars.compile(source);

				var context = {

					movieTitle: element.title,
					original_title: element.original_title,
					flag: getFlag(element.original_language),
					stelle: getStars(element.vote_average - 1),
					rate: element.vote_average,
					locandina: "https://image.tmdb.org/t/p/w342/" + element.poster_path
				};

				var html = template(context);

				//stampo in pagina tramite HB
				$("#hb-container").append(html).addClass("flex");

			}

		},
		error: function (stato) {
			console.log("c'è stato un errore: " + stato);
		}
	});
};

//funzione per chiamata dell'API delle serie TV
function callAjaxSerie() {

	//salvo nella variabile q il valore inserito nella casella di ricerca da parte dell'utente
	var q = $(".casella").val();

	//chiamata
	$.ajax({

		url: "https://api.themoviedb.org/3/search/tv",
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

				//salvo per comodità in element gli oggetti dell'array results (che sono i film)
				var element = data.results[i];

				//la media voti viene portata da decimale a numero intero e da base 10 a base 5
				element.vote_average = Math.ceil(element.vote_average / 2);

				var source = $(".series-tmpl").html();

				var template = Handlebars.compile(source);

				var context = {

					seriesTitle: element.name,
					original_title: element.original_name,
					flag: getFlag(element.original_language),
					stelle: getStars(element.vote_average - 1),
					rate: element.vote_average,
					locandina: "https://image.tmdb.org/t/p/w342/" + element.poster_path
				};

				var html = template(context);

				//stampo in pagina tramite HB
				$("#hb-container").append(html).addClass("flex");

			}

		},
		error: function (stato) {
			console.log("c'è stato un errore: " + stato);
		}
	});
};

//funzione per creazione bandiere al posto della lingua
function getFlag(lang) {

	//METODO CON ARRAY
	//creo array con le lingue che mi interessano
	var bandiera = [
		'it',
		'en',
		'us'
	];

	//se una delle lingue contenute nell'array corrisponde a quelle dell'API...
	if (bandiera.includes(lang)) {

		//viene stampata l'immagine corrispondente (nome del file img deve essere uguale alla denominazione dell'API)
		return "<img src='img/" + lang + ".png'>";
	}
	//altrimenti non si stampa nulla
	return "";


	// //METODO CON SWITCH
	// var bandiera = "";

	// switch (lang) {

	// 	case "it":
	// 		bandiera = "<img src= 'img/it.png'>"
	// 		break;

	// 	case "en":
	// 		bandiera = "<img src= 'img/en.png'>"
	// 		break;

	// 	case "us":
	// 		bandiera = "<img src= 'img/us.png'>"
	// 		break;	
	// }
	// return bandiera;


	// //METODO CON IF...ELSE
	// if(lang === "it") {
	// 	bandiera = "<img src= 'img/it.png'>"

	// } else if (lang === "en") {
	// 	bandiera = "<img src= 'img/en.png'>"

	// } else if ( lang === "us") {
	// 	bandiera = "<img src= 'img/us.png'>"
	// }
	// return bandiera;

};

//funzione per sostituire voto numerico con stelle (da 1 a 5)
function getStars(rating) {

	var stelle = "";

	for (var i = 0; i < 5; i++) {

		if (i <= rating) {
			stelle += "<i class='fas fa-star'></i>";
		} else {
			stelle += "<i class='far fa-star'></i>";
		}
	}
	return stelle
};

//funzione per pulizia casella di ricerca
function resetCasella() {
	$("input:text").val("");
};