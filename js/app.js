//manipulating DOM and creating the <li> with the results of assert
(function(){
	var results;
	this.assert = function assert(value, desc){
		var li = document.createElement("li");
		li.className = value ? "pass" : "fail";
		li.appendChild(document.createTextNode(desc));
		results.appendChild(li);
		if(!value){
			li.parentNode.parentNode.className = "pass";
		}
		return li;
	};
	this.test = function test(name, fn){
		results = document.getElementById("results");
		results = assert(true,name).appendChild(document.createElement("ul"));
		fn();
	}

})();


// 2.4.3 - Asynchronous testing
// Asynchronous testing = tests whose results will come back after a nondeterministic amount of time 
// has passed. Ex: Ajax requests
// 1. Assertions that rely upon the same asynchronous operation need to be grouped into a 
// unifying test group
// 2. Each test group needs to be place on a queue to be run after all the previous test groups
// have finished running.

//2.5 - Implementation of test grouping

(function(){
	var results;
	this.assert = function assert(value, desc){
		var li = document.createElement("li");
		li.className = value ? "pass" : "fail";
		li.appendChild(document.createTextNode(desc));
		results.appendChild(li);
		if(!value){
			li.parentNode.parentNode.className = "fail";
		}
		return li;
	};
	this.test = function test(name, fn){
		results = document.getElementById("results");
		results = assert(true,name).appendChild(document.createElement("ul"));
		fn();
	}

})();

window.onload = function(){
	test("A test. ", function(){
		assert(true, "First assertion completed");
 		assert(true, "Second assertion completed");
 		assert(true, "Third assertion completed");
	});
	test("Another test", function(){
		assert(true, "First test completed");
		assert(false,  "Second test failed");
		assert(true,  "Third assertion completed");
	});
	test("Another third test", function(){
		assert(null, "Fail");
		assert(5,  "Pass");
	});
}

// //2.6 - A simple asynchronous test suite
(function(){
	var queue = []; 
	var paused = false; 
	var results;
	this.test = function(name,fn){
		queue.push(function(){
			results = document.getElementById("results");
			results = assert(true, name).appendChild(document.createElement("ul"));
		fn();	
		});
		runTest();
	};
	this.pause = function(){
		paused = true;
	};
	this.resume = function(){
		paused = false;
		setTimeout(runTest, 1);
	}
	function runTest(){
		if(!paused && queue.length){
			queue.shift()();
		if(!paused){
			resume();
			}	
		}
	}
	this.assert = function assert(value, desc){
		var li = document.createElement("li");
		li.className = value ? "pass" : "fail";
		li.appendChild(document.createTextNode(desc));
		results.appendChild(li);
		if(!value){
			li.parentNode.parentNode.className = "fail";
		}
		return li;
	}
})();
window.onload = function(){
	test("Async Test #1", function(){
		pause();
		setTimeout(function(){
			assert(true, "Second test completed");
			resume();
		}, 1000);
	})
}

// 3 publicly accessible functions: test(), pause(), resume()
// these 3 functions have the following capabilites: 
// test(fn) = synchronously OR asynchronously await execution
// pause() = tells the test suite to pause executing tests until the test group is done.
// resume() = unpauses the tests and starts the next running after a short delay.

// 3 - Functions are fundamental
// functions are First-class objects = they coexist and can be treated like any other Javascript
// object.
// Objects in Javascript enjoy certain capabilites:
// 	- They can be created via literals
// 	- They can be assigned to variables, array entries, and properties of other objects.
// 	- They can be passed as arguments to functions.
// 	- They can be returned as values from functions.
// 	- They can possess properties that can be dynamically created and assigned

// Functions are invoked and that invocation is frequently discharded in an asynchronous manner.

// The browser event loop = single-threaded (every event is placed into an event queue)
// 	- Set up the user interface
// 	- Enter a loop waiting for events to occur
// 	- Invoke handlers (also called listeners) for those events

window.onload = function(){console.log("functions are first-class objects!")};


(function(){
	var results;
	this.assert = function assert(value, desc){
		var li = document.createElement("li");
		li.className = value ? "pass" : "fail";
		li.appendChild(document.createTextNode(desc));
		results.appendChild(li);
		if(!value){
			li.parentNode.parentNode.className = "fail";
		}
		return li;
	};
	this.test = function test(name, fn){
		results = document.getElementById("results");
		results = assert(true,name).appendChild(document.createElement("ul"));
		fn();
	}

})();
// // The Callback Concept
// // Every time we set a up a function that we want to call at a later time, whether by the browser
// // or other code, we're setting up what is termed a callback.

window.onload = function(){
	test("A test. ", function(){
		function useless(callback){ return callback(); }
		var text = 'Domo arigato!';
		assert(useless(function(){ return text; }) === text, "The useless function works " + text);
	});
}



var values = [ 2318, 16, 54, 10, 1965, 57, 9 ];
values.sort(function(value1, value2){ return value2 - value1; });
console.log(values);

// Javascript allows us to create a function as a stand-alone entity, just as we can any other object type
// and to pass it as an argument to a method, just like any other object type, which can accept it as a 
// parameter. 

//3.1 - Proving things about the way that functions are declared

(function(){
	var results;
	this.assert = function assert(value, desc){
		var li = document.createElement("li");
		//li.className = value ? "pass" : "fail";
		li.appendChild(document.createTextNode(desc));
		results.appendChild(li);
		if(!value){
			li.parentNode.parentNode.className = "pass";
		}
		return li;
	};
	this.test = function test(name, fn){
		results = document.getElementById("results");
		results = assert(true,name).appendChild(document.createElement("ul"));
		fn();
	}

})();

window.onload = function(){
	test("A test. ", function(){
		function isNimble(){ 
			return true; //the name is availble in the current scope and added as property of window
		};
		assert(typeof window.isNimble === "function", "isNimble() defined");
		assert(isNimble.name === "isNimble", "isNimble() has a name");
		var canFly = function(){ 
						return true; 
					}; //the var is a window property and the name property of the function is empty.
		assert(typeof window.canFly === "function", "canFly() defined");
		assert(canFly.name === "", "canFly() has no name");

		window.isDeadly = function(){ return true; };

		assert(typeof window.isDeadly === "function", "isDeadly() defined");

		function outer(){
			assert(typeof inner === "function", "inner() in scope before declaration");
		}
		function inner(){};
		assert(typeof inner === "function", "inner() in scope after declaration");
		assert(window.inner === undefined, "inner() not in global scope");			
	});

	outer();
	assert(window.inner === undefined, "inner() still not in global scope");
	
	window.wieldSword = function swingSword(){ return true; };

	assert(window.wieldSword.name === 'swingSword', "wieldSword's real name is swingsSword");

}

//3.2 - Scoping and functions

//Variable declarations are in scope from their point of declaration to the end of the 
// function within which they're declared, regardless of block nesting.
// Named functions are in scope within the entire function whithin which the're declared,
// regardless of block nesting (some call this hosting)
// For the purposes of declaration scopes, the global context acts like one big function
// encompassing the code on the page
// HOISTING - Hoisting is Javascript behaviour of moving declarations to the top of a scope
// (the global scope or current function scope). That means that you're able to use a function or
// a variable before it has been declared, or in other words: a function or variable can be declared
// after it has been used already.

(function(){
	var results;
	this.assert = function assert(value, desc){
		var li = document.createElement("li");
		//li.className = value ? "pass" : "fail";
		li.appendChild(document.createTextNode(desc));
		results.appendChild(li);
		if(!value){
			li.parentNode.parentNode.className = "pass";
		}
		return li;
	};
	this.test = function test(name, fn){
		results = document.getElementById("results");
		results = assert(true,name).appendChild(document.createElement("ul"));
		fn();
	}

})();

function outer(){
		var a = 1;

		function inner(){ /* does nothing */ }
		
		var b = 2;

		if(a == 1){
				var c = 3;
		}	

}

outer();

window.onload = function(){
	test("A test.", function(){
		assert(true,"|----- BEFORE OUTER -----|");
		 /* test code here */
		 function outer(){
		 assert(true,"|----- INSIDE OUTER, BEFORE a -----|");
		 /* test code here */
		 var a = 1;
		 assert(true,"|----- INSIDE OUTER, AFTER a -----|");
		 /* test code here */
		 function inner(){ /* does nothing */ }
		 var b = 2;
		 assert(true,"|----- INSIDE OUTER, AFTER inner() AND b -----|");
		 /* test code here */
		 if (a == 1) {
		 var c = 3;
		 assert(true,"|----- INSIDE OUTER, INSIDE if -----|");
		 /* test code here */
		 }
		 assert(true,"|----- INSIDE OUTER, OUTSIDE if -----|");
		 /* test code here */
		 }
		 outer();
		 assert(true,"|----- AFTER OUTER -----|");
		 /* test code here */
	});
}

//3.3 Illustrating the differences between function and method Invocations
window.onload = function(){
	test("A test.", function(){
		function creep(){ return this; } //Defines a function that returns its function context. this will allow
// 										//us to examine the function context of a function from outside of it,
// 										//after it has been invoked

		assert(creep() === window, "Creeping in the window"); 	
// 		//tests invocation "as a function" and verifies that function context was the window object
	
		var sneak = creep;
// 		//creates a reference to the same function in variable sneak

		assert(sneak() === window, "Sneaking in the window");
// 		//invokes a function using the sneak variable. enven though we've used a variable, the function
// 		//is still invoked as a function, and the function context is window.

		var ninja1 = {
			skulk: creep
		}
// 		//creates an object and skulk references the original creep() function

		assert(ninja1.skulk() === ninja1, "The 1st Ninja is skulking");
// 		//invokes the function through skulk property, thus invoking as method of ninja1
// 		//the function context is no longer window but is ninja1. THAT'S OBJECT ORIENTATION
		
		var ninja2 = {
			skulk: creep
		};
// 		//Creates an object that also has a skulk property

		assert(ninja2.skulk() === ninja2, "the 2nd ninja is skulking");	
// 		//invokes a function as a method of ninja2 and the function context is ninja2

	})
}

//3.5 - Using the apply() and call() methods to supply the function context
//We can use apply() and call() to explicitly specify any object we want as the function context.

window.onload = function(){
	test("A test", function(){
		function juggle(){
			var result = 0;
			//this for() sums up arguments
			for(var n = 0; n < arguments.length; n++){
				result += arguments[n];
			}
			//stores the result on context
			this.result = result; 
		}

		//sets up the test subjects
		var ninja1 = {};
		var ninja2 = {};

		juggle.apply(ninja1, [1,2,3,4]);

		juggle.call(ninja2, 5, 6, 7, 8);

		//test the expected results
		assert(ninja1.result === 10, "juggled via apply");
		assert(ninja2.result === 26, "juggled via call");
	});
}

//3.6 - Building a for-each function to demonstrate setting a function context
//apply() and call() do pretty much the same thing
window.onload = function(){
	test("A test", function(weapons){
		//defines the for-each function
		function forEach(list, callback){
			for(var n = 0; n < list.length; n++){
			//invokes the callback
			callback.call(list[n], n);
			}
		}

		//sets up the test subject
		var weapons = ['shuriken', 'katana', 'nunchucks'];

		//tests the function
		forEach(
			weapons, function(index){
			assert(this === weapons[index], "Got the expected value of " + weapons[index]);
			}
		)	
	});
}

//Summary
//Functions are First-Class Objects
//When invoked as a simple function, the context is the global object (window).
//Invoked as a Method, the context is the object owning the method
//Invoked as a Constructor, the context is a newly allocated object
//Invoked via the apply() or call() methods of the function, the context can be whatever we want

//4.1 - Anonymous Functions

window.onload =  function(){
	test("A test", function(){
		
		var ninja = {
			shout: function(){
				assert(true, "Ninja");
			}
		}

		ninja.shout();

		setTimeout(
			function(){ assert(true, 'power!'); },
		500);

		setTimeout(
			function(){ assert(true, 'Forever'); }, 
		500);

	});
}

//Recursion - Recursion is a concept that whenever a function calls itself, or calls a function that
//in turn calls the original function anywhere in the call tree, recursion occurs.

//4.2 - Chirping using a named function

//We're creating a function that employs recursion by calling itself by name

window.onload =  function(){
	test("A test", function(){
	//Declares a recursive chirping function that calls itself by name until
	//it determines that it's done	
	function chirp(n){
		return n > 1 ? chirp(n - 1) + "-chirp" : "chirp";
	}

	//Asserts that a ninja can chirp as planned
	assert(chirp(3) == "chirp-chirp-chirp", "Calling the named function comes naturally");

	});
}

//4.3 - Method recursion within an object

window.onload =  function(){
	test("A test", function(){
	//Declares a recursive function as a property of the ninja object. We now need to call the method
	//from within itself using the reference to the object's method
	var ninja = {
		chirp: function(n){
				return n > 1 ? ninja.chirp(n - 1) + "-chirp" : "chirp";
			}	
	}

	assert(ninja.chirp(3) == "chirp-chirp-chirp", "An object property is not confusing");

	});
}

//4.4 - Recursion using a missing function reference

window.onload =  function(){
	test("A test", function(){
	
	var ninja = {
		chirp: function(n){
				//THIS keyword is used instead of ninja.chirp so we don't loose it on samurai
				return n > 1 ? this.chirp(n - 1) + "-chirp" : "chirp";
			}	
	}

	var samurai = { chirp: ninja.chirp };

	//Redefines ninja such it has no properties and ninja.chirp goes away
	ninja = {};

	//Testing to see if things still work
	try{
		assert(samurai.chirp(3) == "chirp-chirp-chirp", "It works!");
	}catch(e){
		assert(false, "Uh, this isn't good! Where is ninja.chirp?");
	}

	});
}

//4.5 - Using an inline function in a recursive fashion
window.onload =  function(){
	test("A test", function(){
	
	var ninja = {
		chirp: function signal(n){
				//Declares a named inline function
				return n > 1 ? signal(n - 1) + "- chirp" : "chirp";
			}	
	}

	//Tests that it works just as expected
	assert(ninja.chirp(3) == "chirp-chirp-chirp", "Works as we...")

	//Creates a new object
	var samurai = { chirp: ninja.chirp };

	//Redefines ninja such it has no properties and ninja.chirp goes away
	ninja = {};

	//Testing to see if things still work and IT DOES!
	assert(samurai.chirp(3) == "chirp-chirp-chirp", "The method correctly calls itself.");

	});
}

//4.3 - Storing Functions
window.onload =  function(){
	test("A test", function(){
	//Keeps track of the next available id to be assigned
	var store = {
		nextId: 1,
	//Creates an object to serve as a cache in which we'll store functions	
		cache: {},
	//Adds functions to the cache, but only if they're unique	
		add: function(fn){
			if(!fn.id){
				fn.id = store.nextId++;
				//The !! construct turns Javascript expression into its Boolean
				return !!(store.cache[fn.id] = fn);
			}
		}
	}

	function ninja(){}

	//Tests that all works as planned
	assert(store.add(ninja), "Function was safely added");

	assert(!store.add(ninja), "But it was only added once");

	});
}

//4.9 - Memoizing previously computed values
//Memoizing = build a function that's capable of remembering its previously computed values
//Attention: Any sort of caching will certainly sacrifice memory in favor of performance.

window.onload =  function(){
	test("A test", function(){
	//Creates the cache
	function isPrime(value){
		//Checks for cached values
		if(!isPrime.answers) isPrime.answers = {};
		if(isPrime.answers[value] != null){
			return isPrime.answers[value];
		}

		var prime = value != 1;
		for(var i = 2; i < value; i++){
			if(value % i == 0){
				prime = false;
				break;
			}
		}
		//Stores the computed value
		return isPrime.answers[value] = prime;	
	}

	//Tests
	assert(isPrime(5), "5 is prime!");

	assert(isPrime.answers[5], "The answer was cached!");

	});
}

//4.10 - Simulating array-like methods
window.onload =  function(){
	test("A test", function(){
	
	var elems = {
		//Stores the count of elements. If we're going to pretend we're an array
		//we're going to need someplace to store the number of items that we're storring
		length: 0,

		//Implements the method to add elements to our collection. The prototype for Array
		//already has a method to do this
		add: function(elem){
			Array.prototype.push.call(this,elem);
		},

		//Implements a method named gather() to find elements by their id values
		//and add them to our collection
		gather: function(id){
			this.add(document.getElementById(id));
		}

	};
	//Test the gather() and add() methods
	elems.gather("first");
	assert(elems.length == 1 && elems[0].nodeType, "Verify that we have an element in our stash");
	elems.gather("second");
	assert(elems.length == 2 && elems[1].nodeType, "Verify the other insertion");

	});
}

//4.1.1 - Traversing variable-length argument lists
window.onload =  function(){
	test("A test", function(){
	
	function merge(root){
		//Implements the merge() function
		//we iterate through nth arguments in the list, starting at index 1 in order to skip the 
		//first argument
		for(var i = 1; i < arguments.length; i++){
			//this for-in loop is necessary to loop through the properties of an object
			for(var key in arguments[i]){
				root[key] = arguments[i][key];
			}
		}
		return root;
	}

// 	//Calls the implemented function and creates the 2 objects inside
	var merged = merge({ name: "Batou" }, { city: "Niihama" });

	assert(merged.name === "Batou", "The original name is intact");
	assert(merged.city === "Niihama", "And the city has been copied over");
	});
}

//4.15 - A method-overloading function

window.onload =  function(){
	test("A test", function(){
	
	var ninja = {
	 	whatever: function() {
		 switch (arguments.length) {
		 case 0:
		 /* do something */
		 break;
		 case 1:
		 /* do something else */
		 break;
		 case 2:
		 /* do yet something else */
		 break;
		 //and so on ...
		 }
	 	}
	}
	
	//Stores the previous function because we may need to call it if the passed
	//function doesn't have a matching number of arguments
	function addMethod(object, name, fn){
		var old = object[name];
		//Creates a new anonymous function that becomes the method
		object[name] = function(){
		//Invokes the passed function if its parameter and argument counts match	
			if(fn.length === arguments.length){
				return fn.apply(this, arguments)
			}else if(typeof old === 'function'){
				return old.apply(this, arguments);
			}
		};
	}

	var ninja = {};
	addMethod(ninja,'whatever',function(){ /* do something */ });
	addMethod(ninja,'whatever',function(a){ /* do something else */ });
	addMethod(ninja,'whatever',function(a,b){ /* yet something else */ });

	});

	//4.16 - Testing the addMethod() function
	
	//Declares an object as base
	var ninjas = {
		values: [ "Dean Edwards", "Sam Stephenson", "Alex Russell" ],

		//Binds a no-argument method to the base object
		addMethod(ninjas, 'whatever', function(){
			return this.values;
		});

		//Binds a single-argument method to the base object
		addMethod(ninjas, 'whatever', function(name){
			
			var ret = [];

			for(var i = 0; i < this.values.length; i++){
				if(this.values[i].indexOf(name) === 0){
					ret.push(this.values[i]);
				return ret;	
				}
			}
		});

		//Binds a dual-argument method to the base object
		addMethod(ninjas, 'whatever', function(first, last){
			var ret = [];
			for(var i = 0; i < this.values.length; i++){
				if(this.values[i] === ( first + " " + last )){
					ret.push(this.values[i]);				
				}
			return ret;	
			}
		});
		
		//Test the bound methods
		assert(ninjas.find().length === 3, "Found all");
		assert(ninjas.find("Sam").length === 1, "Found ninja by first name");
		assert(ninjas.find("Dean", "Edwards").length === 1, "Found ninja by first and second name");
		assert(ninjas.find("Alex", "Russell", "Jr") === null, "Found nothing");
	}

}



