
(function(window, document) {

	var myjQClone = function(arr){

		this.elements = arr;
			

		this.length = this.elements.length;

		for (var i = 0; i < this.length; i++) {
            this[i] = this.elements[i];
        }
        
        return this; 

	}
	


	myjQClone.prototype = {


		first : function() {
			if(this.length > 0){
				
				return new myjQClone([this[0]]);
			}
			else{
				return new myjQClone([]);
			}
		},


		last : function() {
			if(this.length > 0){
				return new myjQClone([this[this.length - 1]]);
			}
			else{
				return new myjQClone([]);
			}
		}, 

		each : function(callback){

			for(var i = 0; i < this.length; i++){
				callback.call(i, this[i]);
			}
			return this;
		},

		find: function(arg){

			var resultArr = [];
			for(var i = 0; i < this.length; i++){

				var currArr = this[i].querySelectorAll(arg);

				var resultArrLen = resultArr.length;

				for(var j = 0; j < currArr.length; j++){
					resultArr[resultArrLen + j] = currArr[j];
				}

			}
			return new myjQClone(resultArr);		

		}, 

		hasClass: function(nameOfClass) {


			 if(this.length > 0){
			 	
				var classesArray = this[0].className.split(" ");			 	

				//console.log(classesArray);
				for(var i = 0; i < classesArray.length; i++){
					if(classesArray[i] == nameOfClass.trim())
						return true;
				}
			 	
				return false;
			 }else{
			 	return false;
			 }

		},

		addClass: function(nameOfClass) {
			for(var i = 0; i < this.length; i++){

				var classesArray = this[i].className.split(" ");

				var givenClassesNames = nameOfClass.split(" ");

				for(var j = 0; j < givenClassesNames.length; j++){

					var index = classesArray.indexOf(givenClassesNames[j].trim());

					if (index > -1) {
					    
					}else{
						classesArray.push(givenClassesNames[j].trim());
					}

					this[i].className = classesArray.join(" ");
				}

			}
			return this;
		},

		

		removeClass: function(nameOfClass) {

			for(var i = 0; i < this.length; i++){

				var classesArray = this[i].className.split(" ");

				var givenClassesNames = nameOfClass.split(" ");

				for (var j = 0; j < givenClassesNames.length; j++) {
					
					var index = classesArray.indexOf(givenClassesNames[j].trim());

					if (index > -1) {
					    classesArray.splice(index, 1);
					}

					this[i].className = classesArray.join(" ");

				}
			}
							
			return this;
	  	},

		toggleClass: function() {

			var nameOfClass = arguments[0];

			if(arguments.length == 1){
				
			
				for(var i = 0; i < this.length; i++){

					var classesArray = this[i].className.split(" ");

					var givenClassesNames = nameOfClass.split(" ");

					for(var j = 0; j < givenClassesNames.length; j++){

						var index = classesArray.indexOf(givenClassesNames[j].trim());

						if (index > -1) {
						    classesArray.splice(index, 1);
						}else{
							classesArray.push(givenClassesNames[j].trim());
						}
						this[i].className = classesArray.join(" ");
					}
				}
			}else{
				if(arguments[1] === true){
					this.addClass(nameOfClass);
				}else{
					this.removeClass(nameOfClass);
				}
			}
			return this;
		},


		attr : function  () {
			if(this.length > 0){

				if(arguments.length == 1){

					if (typeof arguments[0] === 'string' || arguments[0] instanceof String){
						return this[0].getAttribute(arguments[0]);
					}else{

						var obj = arguments[0];

						for(var i = 0; i < this.length; i++){

							for(var key in obj){
						    	this[i].setAttribute(key, obj[key]);
							}
						}
						
						return this;
					}

				
				}else if(arguments.length == 2){

					 if(arguments[1] instanceof Function){
					 	for(var i = 0; i < this.length; i++){
							var funcres = arguments[1].call(i, this[i]);
							this[i].setAttribute(arguments[0], funcres);
					 	}

					 }else{
					 	for(var i = 0; i < this.length; i++){

					 		var res = this[i].setAttribute(arguments[0], arguments[1]);
					 	}
					 	
					 }
					 return this;
				}
				

			}else{
				return null;
			}
		},

		css : function(){
			if(this.length < 1) return null;
			if(arguments.length == 1){
				if (typeof arguments[0] === 'string' || arguments[0] instanceof String){
					var value = this[0].style[arguments[0]];
					if(value.length == 0){
						return window.getComputedStyle(this[0], null).getPropertyValue(arguments[0]);
					}else{
						return value;
					}
				}else if(arguments[0] instanceof Array){
					var givenArr = arguments[0];
					var resultObj = {};

					for(var i = 0; i < givenArr.length; i++){

						var value = this[0].style[givenArr[i]];
						if(value.length == 0){
							value =  window.getComputedStyle(this[0], null).getPropertyValue(givenArr[i]);
						}
						resultObj[givenArr[i]] = value;

					}
					return resultObj;
				}else {
					var obj = arguments[0];

					for(var key in obj){

						var value = obj[key];

						for(var i = 0; i < this.length; i++){
							if(f instanceof Function){
								var currentValue = this[i].style[arguments[0]];
						
								if(currentValue.length == 0){
									currentValue =  window.getComputedStyle(this[i], null).getPropertyValue(arguments[0]);
								}
								value = f.call(i, this[i], currentValue);
							}

							this[i].style[key] = value;
						}
					}
					return this;
				}
			}else{
				if(arguments[1] instanceof Function){
					for(var i = 0; i < this.length; i++){
						
						var currentValue = this[i].style[arguments[0]];
						
						if(currentValue.length == 0){
							currentValue =  window.getComputedStyle(this[i], null).getPropertyValue(arguments[0]);
						}

						var funcres = arguments[1].call(i, this[i], currentValue);
							
						this[i].style[arguments[0]] =  funcres;
					 }
				}else{
					for(var i = 0; i < this.length; i++){
						this[i].style[arguments[0]] = arguments[1];	
					}
									
				}

				return this;

			}
		},

		data : function(){
			if(arguments.length == 0){
				var obj = {};

				if (this[0].hasAttributes()) {
             		
             		var attributeArray = this[0].attributes;

             		for(var i = 0; i < attributeArray.length; i++){

             			var index = attributeArray[i].name.indexOf("data-");

             			if(index != 0){
             				var key = attributeArray[i].name;

             				obj[key] = attributeArray[i].value;
             			}
             		}
              }
              return obj;


			}else if(arguments.length == 1){
				var result;
				if(typeof arguments[0] === 'string' || arguments[0] instanceof String){
					var attributeString = "data-" + arguments[0];
					result = this.attr(attributeString);
					

					return result;
				}else{
					var obj = arguments[0];

					for(var key in obj){

						 if (obj.hasOwnProperty(key)) {

						 	var attributeString = "data-" + key;
						 	var value = JSON.stringify(obj[key]);

							result = this.attr(attributeString, value);
		                
		                }
					}

					return this;
				}

			}else{
				var arr = [];
				for(var i = 0; i < arguments.length; i++){
					var attributeString = "data-" + arguments[i];
					arr[i] = this.attr(attributeString);
				}
				
				return arr;
			}

		},

		on : function(){

			var funcName = arguments[0];
			
			if(arguments.length == 1){
				
			 	this[0][funcName]();

          	}else{
           
           		this[0].addEventListener(funcName, arguments[1], false);
         
         	}
         	return this;

		}, 

		html : function(){

			if(arguments.length == 0)
				return this[0].innerHTML;
			if(arguments.length == 1){

				if(typeof arguments[0] === 'string' || arguments[0] instanceof String){
					for(var i = 0; i < this.length; i++){

						this[i].innerHTML = arguments[0];

					}
				}else{
					for(var i = 0; i < this.length; i++){

						this[i].innerHTML = arguments[0].call(i, this[i], this[i].innerHTML);

					}	
				}

			}

			return this;
		}, 

		append : function(){

			if(arguments.length == 1){
				if(typeof arguments[0] === 'string' || arguments[0] instanceof String){

					for(var i = 0; i < this.length; i++){

						this[i].innerHTML += arguments[0];
					}
				}else{
					for(var i = 0; i < this.length; i++){

						this[i].appendChild(arguments[0]);

					}
				}
			}

			return this;
			
		},

		

		prepend : function(){
			if(arguments.length == 1){
				if(typeof arguments[0] === 'string' || arguments[0] instanceof String){
					for(var i = 0; i < this.length; i++){

						this[i].innerHTML = arguments[0] + this[i].innerHTML;
					}
				}else{
					for(var i = 0; i < this.length; i++){
						this[i].insertBefore(arguments[0], this[i].firstChild);
					}

				}
			}


			return this;
		},

		empty : function(){

			if (arguments.length == 0){
				for(var i = 0; i < this.length; i++){
					this[i].innerHTML = "";
				}
			}
		},

		ajax : function(){

			
		}

		


	} 

	

	window.jQClone = function(){

		
		var arr = [];

		if(arguments.length == 1){
			this.arr = document.querySelectorAll(arguments[0]);
			
		}
		else if(arguments.length == 2){

			var arg1 = arguments[1];

			
			var arr = [];

			if(arg1 instanceof Array || arg1 instanceof jQClone 
				|| arg1 instanceof NodeList){

				for(var i = 0; i < arg1.length; i++){

					var resArr = arg1[i].querySelectorAll(arguments[0]);

					var arrLen = arr.length;

					for(var j = 0; j < resArr.length; j++){
						arr[arrLen + j] = resArr[j];
					}
				}
				this.arr = arr;


			}else{


				this.arr = node.querySelectorAll(arguments[0]);
			}

			
		}

		return new myjQClone(this.arr);
	}
	window.$ = window.jQClone;

})(window, document);


// $('#dsds').first().dada()


