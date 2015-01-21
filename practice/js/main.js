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

// var Car = Vehicle.extend({
// 	start: function (){
// 		console.log("Car with registration number " + this.get('registrationNumber') + " started.")
// 	},
// });

// COLLECTIONS PROJECT #2//
var Vehicles = Backbone.Collection.extend({
	model: Vehicle,
	url: "/api/vehicles"
});

// var vehicles = new Vehicles();

// vehicles.add(new Vehicle({ car: 1, registrationNumber: "XLI887",colour: "Blue"}));
// vehicles.add(new Vehicle({ car: 2, registrationNumber: "ZNP123",colour: "Blue"}));
// vehicles.add(new Vehicle({ car: 3, registrationNumber: "XUV456",colour: "Gray"}));

// VIEWS PROJECT #3//

var VehicleView = Backbone.View.extend({
	tagName: "li",
	className: "vehicle",

	render: function(){
		this.$el.html(this.model.get("registrationNumber") + "<button class='remove'>Delete</button>");
		this.$el.attr("id", this.model.id);
		return this;
	}
});

var NewVehicleView = Backbone.View.extend({
	
	initialize: function(options){
		this.bus = options.bus;
	},

	events: {
		"click .add" : "addCar",
	},

	addCar: function(){
		text = document.getElementById("text").value
		console.log("Add car", text);
		vehicle = new Vehicle({ registrationNumber: text });
		this.bus.trigger("carAdded", vehicle);

	},

	render: function(){
		this.$el.html("<textarea id=text></textarea>" + "<button class='add'>Add</button>")
	}
});

var VehiclesView = Backbone.View.extend({
	tagName: "ul",
	
	initialize: function(options){
		this.bus = options.bus;
		this.bus.on("carAdded", this.onCarAdded, this);
	},

	onCarAdded: function(car){
		this.model = car;
		this.render();
	},

	events: {
		"click" : "remove"
	},

	onVehicleRemoved: function(vehicle){
		console.log("remove");
		this.find.$("#"+vehicle.id).remove();
	},

	render: function(){
		var self = this;

		this.collection.each(function(vehicle){
			var vehicleView = new VehicleView({model:vehicle})
			self.$el.append(vehicleView.render().$el);
		});
	},

});

var vehicles = new Vehicles([
	new Vehicle({ id: 1, registrationNumber: "XLI887", colour: "Blue"}),
	new Vehicle({ id: 2, registrationNumber: "ZNP123", colour: "Blue"}),
	new Vehicle({ id: 3, registrationNumber: "XUV456", colour: "Gray"})
]);



$(function() {
	
//PROJECT#3

	var bus = _.extend({}, Backbone.Events);

	var newVehicleView = new NewVehicleView({
		el: "#new",
		bus: bus
	});
	newVehicleView.render();

	var vehiclesView = new VehiclesView({ el: "#cars", collection: vehicles, 
		bus: bus
	});
	vehiclesView.render();

//PROJECT#2
	// console.log("All Vehicles",vehicles);
	// console.log("Blue", vehicles.where({colour: "Blue"}));
	// console.log("XLI887", vehicles.where({registrationNumber: "XLI887"}));
	// // vehicles.remove(vehicles.where({registrationNumber: "XLI887" }));
	// console.log(vehicles.toJSON());
	// vehicles.each(function(vehicle){
	// 	console.log("Iteration",vehicle);
	// })

// PROJECT#1
	// car = new Car({ registrationNumber: "XLI887", color: "blue" });
	// car.start();
	// console.log(car.isValid());
});