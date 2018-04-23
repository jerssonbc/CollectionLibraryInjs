(function() {
	let persons = [
		{
			id:1,
			name:'John',
			age:29
		},
		{
			id:2,
			name:'Adrew',
			age:25
		}
	];

	class Collection{
		save(data,cb)

		findAll(cb)

		findById(id,cb)

		update(data,cb)

		remove(id,cb)
	}

	let persons = new Collection('persons');

	let data ={
		name:'John',
		age:29
	};

	persons.save(data, function(err, response){

	});

	persons.findAll(function(err, response){

	});

	let id = 2;

	persons.findById(id, function(err, response){

	});

	let data = {
		id:2,
		name: 'Peter',
		age:32
	};

	persons.update(data, function(err, response){

	});

	let id=2;
	persons.remove(id, function(err, response){
		
	});


}());