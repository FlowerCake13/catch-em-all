var player = document.getElementById('player');
var loca = document.getElementById('location');
var modal = document.getElementById('modal-container');
var img = document.getElementById('modal-img');
var pokeName = document.getElementById('modal-name');
var playerTop = 0;
var playerLeft = 0;
var counter = 1;
var arr = []


document.addEventListener('keydown', function(e){
	//console.log(e.keyCode);
	if (counter >= 4){
		counter = 1;
	}

	switch(e.keyCode) {
		case 37:
		counter++
		player.src = 'images/player/left/' + counter + '.png'; 
		playerLeft = playerLeft - 10;
		player.style.left = playerLeft + 'px';
		break;

		case 38:
		counter++
		player.src = 'images/player/top/' + counter + '.png'
		playerTop = playerTop - 10;
		player.style.top = playerTop + 'px';
		break;

		case 39:
		counter++
		player.src = 'images/player/right/' + counter + '.png'
		playerLeft = playerLeft + 10;
		player.style.left = playerLeft + 'px';
		break;

		case 40:
		counter++
		player.src = 'images/player/bot/' + counter + '.png'
		playerTop = playerTop + 10;
		player.style.top = playerTop + 'px';
	}
})

function randLocation(){
	return Math.floor(Math.random() * 50)
}

function generateScene(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "https://pokeapi.co/api/v2/location-area/" + randLocation() + '/', true);
	xhr.send();
	xhr.addEventListener("readystatechange", processReq, false);

	function processReq(e){
		if (xhr.readyState == 4 && xhr.status == 200){
			//console.log(xhr)
			var response = JSON.parse(xhr.responseText);
			console.log(response);
			loca.innerHTML = "Location: " + response.name
			arr = response.pokemon_encounters
			generatePokemon()
		}
	}
}

generateScene()

function generatePokemon(){
	//console.log(arr)
	var randomNum = Math.floor(Math.random() * arr.length);
	//console.log(randomNum);
	console.log(arr[randomNum].pokemon.url)
	
	var xhr = new XMLHttpRequest();
	xhr.open('GET', arr[randomNum].pokemon.url, true);
	xhr.send();
	xhr.addEventListener("readystatechange", processReq, false);

	function processReq(e){
		if (xhr.readyState == 4 && xhr.status == 200){
			var response = JSON.parse(xhr.responseText);
			console.log(response.sprites.front_default);
			console.log(response.name);
			modal.style.display = 'flex';
		img.src = response.sprites.front_default;
		img.style.height = '220px'
		img.style.width = '220px'
		pokeName.innerHTML = response.name
		}
	}
}