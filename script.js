let sprout;
let growthRate = 0.5;
let maxSegments = 15;
let leafChance = 0.2; // Probability of a leaf appearing

function setup() {
	createCanvas(100, 100);
	sprout = new Sprout();
}

function draw() {
	background(254, 250, 224);
	sprout.grow();
	sprout.display();
}

class Sprout {
	constructor() {
	this.segments = [];
	this.segments.push(new Segment(width / 2, height - 40, -PI / 2));
	}

	grow() {
	if (this.segments.length < maxSegments) {
		let lastSegment = this.segments[this.segments.length - 1];
		let newX = lastSegment.x + cos(lastSegment.angle) * 10;
		let newY = lastSegment.y + sin(lastSegment.angle) * 10;

		let angleVariation = random(-0.2, 0.2); // Smaller variation
		let newAngle = lastSegment.angle + angleVariation;

		this.segments.push(new Segment(newX, newY, newAngle));

		// Add leaves
		if (random(1) < leafChance && this.segments.length > 2) { // Start adding leaves after a few segments
		let leafAngle = newAngle + random(-PI / 4, PI / 4); // Vary leaf angle
		let leafSize = random(5, 10);
		lastSegment.addLeaf(leafAngle, leafSize);
		}
	}
	}

	display() {
	stroke(0, 100, 0); // Dark green stem
	strokeWeight(3); // Thicker stem

	for (let i = 1; i < this.segments.length; i++) {
		let prevSegment = this.segments[i - 1];
		let currentSegment = this.segments[i];
		line(prevSegment.x, prevSegment.y, currentSegment.x, currentSegment.y);

		currentSegment.displayLeaves(); // Draw the leaves for each segment
	}
	}
}

class Segment {
	constructor(x, y, angle) {
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.leaves = []; // Array to store leaves for this segment
	}

	addLeaf(angle, size) {
	this.leaves.push(new Leaf(angle, size));
	}

	displayLeaves() {
	for (let leaf of this.leaves) {
		leaf.display(this.x, this.y);
	}
	}
}

class Leaf {
	constructor(angle, size) {
	this.angle = angle;
	this.size = size;
	}

	display(x, y) {
	push(); // Save current drawing state
	translate(x, y); // Move to the segment's position
	rotate(this.angle); // Rotate to the leaf's angle
	fill(0, 150, 0); // Brighter green for leaves
	noStroke();
	beginShape();
	vertex(0, 0);
	bezierVertex(-this.size, -this.size * 2, 0, -this.size * 3, this.size, -this.size * 2);
	vertex(0, 0); // Connect back to the origin
	endShape(CLOSE);
	pop(); // Restore drawing state
	}
}

function setup() {
	let canvas = createCanvas(100, 100); // Smaller canvas size if needed
	canvas.parent('canvas-container'); // Attach canvas to the container

	// Set the starting position for the sprout (top-left of the canvas)
	sprout = new Sprout(0, 0); // Start at (0, 0) of the canvas
}