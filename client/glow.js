var handle = false;
var textBrightness = 50;
var fireCount = 6;
var fireDelta = new Array();
var step = 0;
var angle = 0;
var radius = 6;

function animate()
{
	fireDelta[fireCount - step] = Math.random() * 2 - 1;
	var e = document.getElementById("fire");
	var s = "";
	for (var i = 0; i < fireCount; i++)
	{
		if (s) s += ", ";
		s += Math.round(fireDelta[(i + fireCount - step) % fireCount] * i) + "px " + (-2 * i -1) + "px " + (2 + i) + "px ";
		s += "rgb(255, " + (255 - i * Math.floor(255 / (fireCount - 1))) + ", 0)";
	}
	e.style.textShadow = s;
	/* We need to change something, else the shadow will not be re-rendered. This bug was fixed in Opera 10.5. */
	e.style.color = "rgb(" +
		(textBrightness + step % 2) + ", " +
		textBrightness + ", " +
		textBrightness + ")";
	step = (step + 1) % fireCount;

	/* RGB */
	angle -= 0.4;
	if (angle <= 0) angle = Math.PI * 2;
	var e = document.getElementById("rgb");
	var s =
		Math.round(Math.sin(angle) * radius) + "px " +
		Math.round(Math.cos(angle) * radius) + "px 4px #33F, " +
		Math.round(Math.sin(angle + Math.PI * 4 / 3) * radius) + "px " +
		Math.round(Math.cos(angle + Math.PI * 4 / 3) * radius) + "px 4px #F00, " +
		Math.round(Math.sin(angle + Math.PI * 2 / 3) * radius) + "px " +
		Math.round(Math.cos(angle + Math.PI * 2 / 3) * radius) + "px 4px #0F0";
	e.style.textShadow = s;
	/* We need to change something, else the shadow will not be re-rendered. This bug was fixed in Opera 10.5. */
	e.style.color = "rgb(" + (255 - step % 2) + ", 255, 255)";
}

function toggleAnimation()
{
	for (var i = 0; i < fireCount; i++)
		fireDelta[i] = Math.random() * 2 - 1;
	if (handle)
	{
		window.clearInterval(handle);
		handle = false;
	}
	else
		handle = window.setInterval(function() { animate(); }, 100);
	return false;
}

toggleAnimation();