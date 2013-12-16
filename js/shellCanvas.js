var ShellCanvas = {
	draw: function(shell) {
		GameManager.context.fillStyle= shell.colour; // "#ff0000";
        GameManager.context.fillRect(shell.x, shell.y, 5, 5);
	}
}