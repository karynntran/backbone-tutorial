// MODELS PROJECT #1//

var Vehicle = Backbone.Model.extend({
	urlRoot: "/api/vehicles",
	validate: function(attrs){
		if (!attrs.registrationNumber)
			return "Registration required.";
	},
	start: function (){
		console.log("Vehicle started.")
	},
});

var Car = Vehicle.extend({
	start: function (){
		console.log("Car with registration number " + this.get('registrationNumber') + " started.")
	},
});

// COLLECTIONS PROJECT #2//
var Vehicles = Backbone.Collection.extend({
	model: Vehicle,
	url: "/api/vehicles"
});

var vehicles = new Vehicles();

vehicles.add(new Vehicle({ car: 1, registrationNumber: "XLI887",colour: "Blue"}));
vehicles.add(new Vehicle({ car: 2, registrationNumber: "ZNP123",colour: "Blue"}));
vehicles.add(new Vehicle({ car: 3, registrationNumber: "XUV456",colour: "Gray"}));

$(function() {
	
//PROJECT#2
	console.log("All Vehicles",vehicles);
	console.log("Blue", vehicles.where({colour: "Blue"}));
	console.log("XLI887", vehicles.where({registrationNumber: "XLI887"}));
	// vehicles.remove(vehicles.where({registrationNumber: "XLI887" }));
	console.log(vehicles.toJSON());
	vehicles.each(function(vehicle){
		console.log("Iteration",vehicle);
	})

// PROJECT#1
	// car = new Car({ registrationNumber: "XLI887", color: "blue" });
	// car.start();
	// console.log(car.isValid());
});