let  Collection = (function(){
	// try{
	// 	localStorage.seItem('name', 'Jhon');
	// 	localStorage.removeItem('name');

	// }catch(e){
	// 	throw new Error('Local Storage is not supported');
	// }	
	

	function createUID(){
		return 'id-'+Math.random().toString(36).substring(2,16);
	}

	function _isOjbect(data) {
		return Object.prototype.toString.call(data) === '[object Object]';
	}


	function _isArray(data){
		return Object.prototype.toString.call(data) === '[object Array]';
	}

	function _isString(data) {
		return typeof data === "string";
	}

	function _isFunction(data){
		return typeof data === 'function';
	}


	class Collection{
		constructor(name){
			if(!name){
				throw new Error('name is required');
			}else if(!_isString(name)){
				throw new Error('name should be string');
			}else{
				this.name = name;
			}
		}

		save(data, cb){
			let items = [];
			let name = this.name;
			let storedItems = localStorage.getItem(name);

			if(!cb){
				throw new Error('cb is required');
			}

			if (!_isFunction(cb)) {
				throw new Error('cb should be a function');
			}

			if(!_isOjbect(data)){
				cb('data should be an object.', null);
				return ;
			}

			if(!storedItems){
				Object.defineProperty(data,'id',{
					enumerable :true,
					configurable : false,
					writable : false,
					value : createUID()
				});		
				items.push(data);
				localStorage.setItem(name, JSON.stringify(items));
				cb(null,data);
			}else{
				
				items = JSON.parse(storedItems);
				Object.defineProperty(data,'id',{
					enumerable :true,
					configurable : false,
					writable : false,
					value : createUID()
				});	

				items.push(data);
				localStorage.setItem(name, JSON.stringify(items));
				cb(null, data);
			}
		}

		findAll(cb){
			let name = this.name;
			let storedItems = localStorage.getItem(name);

			if(!cb){
				throw new Error('cb is required');
			}

			if(!_isFunction(cb)){
				throw new Error('cb should be a function');
			}

			if(!storedItems){
				cb('there is not collection in the store', null);
			}else{
				cb(null, storedItems)
			}
		}

		findById(id, cb){			
			let name = this.name;
			let storedItems = JSON.parse(localStorage.getItem(name));
			let items;

			if(!cb){
				throw new Error('cb is required');
			}

			if(!_isFunction(cb)){
				throw new Error('cb should be a function');
			}

			if(!_isString(id)){
				cb('id should be a string.', null);
				return;
			}

			if(_isArray(storedItems) && storedItems.length){
				items = storedItems.filter((item) =>{
					return item.id === id;
				});
			}

			if(items && items.length){
				cb(null, items[0]);
			}else{
				cb('there is no item with an id matching with '+id, null);
			}
		}

		update(data, cb){
			let name = this.name;
			let storedItems = localStorage.getItem(name);
			let items;

			let updated;

			if(!cb){
				throw new Error('cb is required');
			}

			if(!_isFunction(cb)){
				throw new Error('cb should be a function');
			}

			if(!_isOjbect(data)){
				cb('data should be an object', null);
				return;
			}else if(!data.id){
				cb('data should have an id', null);
				return;
			}else{
				updated = data;
			}

			if(!storedItems){
				cb('there is no collection is the store', null);
				return;
			}else{
				items = JSON.parse(storedItems);
			}

			if(_isArray(items) && items.length){
				items.forEach((item, index) => {
					if(item.id === updated.id){
						items.splice(index, 1, updated);
					}
				});
			}

			localStorage.setItem(name, JSON.stringify(items));
			cb(null, updated);
		}

		 remove(id, cb){
		 	debugger;
		 	let name = this.name;
		 	let storedItems = JSON.parse(localStorage.getItem(name));

		 	let len;

		 	if(!cb){
				throw new Error('cb is required');
			}

			if(!_isFunction(cb)){
				throw new Error('cb should be a function');
			}

			if(!_isString(id)){
				cb('id should be a string.', null);
				return;
			}

			if(!storedItems){
				cb('there is no collection in the store', null);
				return;
			}else{
				if(_isArray(storedItems)){
					len = storedItems.length;
				}else{
					len = 0;
				}
			}

			if(len > 0){
				storedItems.forEach((item, index) =>{
					if(item.id === id){
						storedItems.splice(index,1);
						localStorage.setItem(name, JSON.stringify(storedItems));
					}
				});
			}

			if(len > storedItems.length){
				cb(null, 'The object with id '+ id + ' is removed.');
			}else{
				cb('There is no item with an id matching '+id, null);
			}
		 }
	}
	

	return Collection;

}());


let persons =  new Collection('persons');

// let data = {
// 	name : 'Edu',
// 	age:25
// };

// persons.save(data, (err, response) =>{
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(response);
// 	}
// });

// persons.findAll((err, response) => {
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(response);
// 	}
// });

// let id ="id-j3rglonvfs";

// persons.findById(id, (err, response) =>{
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(response);
// 	}
// });


// let item;
// let id ="id-n1gfkt4wgps";

// persons.findById(id, (err, response) =>{
// 	if(err){
// 		console.log(err);
// 	}else{
// 		item = response;
// 	}
// });


// item.name = 'Rosman';

// persons.update(item, (err, response) => {
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(response);
// 	}
// });


let item;
let id ="id-n1gfkt4wgps";

persons.remove(id, (err, response) =>{
	if(err){
		console.log(err);
	}else{
		console.log(response);
	}
});