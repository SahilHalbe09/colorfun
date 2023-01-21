const express = require("express");

const app = express();
const port = 3000;

// EJS
app.set("view engine", "ejs");

// Public files
app.use(express.static(__dirname + "/public"));

// Logic functions

// Function for generating a random hex color
function generateHexColor() {
	// Generate random string for the color
	var x = Math.round(0xffffff * Math.random()).toString(16);

	// Add leading zeros to ensure legal hex value length
	var z = "000000";
	var z1 = z.substring(0, 6 - x.length);

	// Convert string to valid format
	var color = "#" + z1 + x;

	return color;
}

// Function for generating a random plain color (e.g. red, green, blue, etc.)

// Array of random colors
var plainColors = [
	"red",
	"green",
	"blue",
	"yellow",
	"magenta",
	"cyan",
	"white",
	"gray",
	"black",
	"orange",
	"purple",
	"pink",
	"brown",
	"maroon",
	"crimson",
	"salmon",
	"goldenrod",
	"olive",
	"teal",
	"navy",
	"indigo",
	"violet",
	"plum",
	"orchid",
	"lavender",
	"thistle",
	"peru",
	"sienna",
	"chocolate",
	"sandybrown",
	"darkorange",
];

// Function to generate random color from above array
function generateColor() {
	var randomIndex = Math.floor(Math.random() * plainColors.length);
	return plainColors[randomIndex];
}

// Function for generating a random RGBA color
function generateRgbaColor() {
	// Generate random red value for an RGBA color
	var red = Math.floor(Math.random() * 256);

	// Generate random green value for an RGBA color
	var green = Math.floor(Math.random() * 256);

	// Generate random blue value for an RGBA color
	var blue = Math.floor(Math.random() * 256);

	// Generate random alpha value for an RGBA color
	var alpha = Math.random().toFixed(2);

	// Converts these values to valid format
	return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
}

// Get request for generating a random color (can be either hex, rgba, or plain color)
app.get("/", (req, res) => {
	// Function for generating a random color
	function selectRandomColor() {
		var colorTypes = [generateHexColor, generateRgbaColor, generateColor];
		var selectedColor = colorTypes[Math.floor(Math.random() * colorTypes.length)];
		return selectedColor();
	}

	// variable to change text
	const textColor = selectRandomColor();

	// Sending generated text to EJS
	res.render("index", { textColor: textColor });
});

// Get request for generating a random hex color
app.get("/hex", (req, res) => {
	// variable to change text
	const textColor = generateHexColor();

	res.render("index", { textColor: textColor });
});

// Get request for generating a random RGBA color
app.get("/rgba", (req, res) => {
	// variable to change text
	const textColor = generateRgbaColor();

	res.render("index", { textColor: textColor });
});

// Get reuest for generating a random plain color (e.g. red, green, blue, etc.)
app.get("/color", (req, res) => {
	// variable to change text
	const textColor = generateColor();

	res.render("index", { textColor: textColor });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
