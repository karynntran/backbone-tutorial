var Vehicle = Backbone.Model.extend({
	registrationNumber: "registrationNumber",
	urlRoot: "/api/vehicles",
	validate: function(attr){
		if (!attr.registrationNumber)
			return "Registration required."
	};
	start: function start(){
		console.log("Vehicle started.")
	};
});

var vehicle = new Vehicle({ registrationNumber: 1});