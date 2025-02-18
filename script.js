function setup() {
	let canvas = createCanvas(windowWidth, 300); // Match container size
	canvas.parent('canvas-container'); // Attach to the div
	noStroke();
  }
  
function draw() {
	background(250, 240, 220); // Subtle off-white

	// Example: Draw some leaves or abstract shapes
	fill(random(100, 150), random(200, 250), random(100, 150), 150); // Greenish tones with transparency
	for (let i = 0; i < 20; i++) {
		let x = random(width);
		let y = random(height);
		let size = random(20, 50);
		ellipse(x, y, size, size * 1.5); // Example: Leaf-like shape
	}
}

function windowResized() {
	resizeCanvas(windowWidth, 300);
}