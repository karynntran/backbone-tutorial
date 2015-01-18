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

$(function() {
	car = new Car({ registrationNumber: "XLI887", color: "blue" });
	car.start();
	console.log(car.isValid());
});