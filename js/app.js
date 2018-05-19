var player = document.getElementById('player');
var location = document.getElementById('location');
var playerTop = 0;
var playerLeft = 0;
var counter = 1;


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
			console.log(response.name);
			location.innerHTML = response.name
		}
	}
}

generateScene()