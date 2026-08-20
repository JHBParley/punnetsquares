
// fakeApi
// loren mork 3/6/2013
// use as demo only!



// add indexOf to Array prototype for browsers 
// which do not support - ie IE
// see http://stackoverflow.com/questions/1744310/how-to-fix-array-indexof-in-javascript-for-ie-browsers
// indexOf is needed to determine if array already has action number in it

if (!Array.prototype.indexOf) { 
    Array.prototype.indexOf = function(obj, start) {
         for (var i = (start || 0), j = this.length; i < j; i++) {
             if (this[i] === obj) { return i; }
         }
         return -1;
    }
}



// fakeApi adds action numbers, as integers,  to an array when 
// sent a unique integer via reportAction() function
// action number array is retrieved 
// via requestActions function
// requestPreviousActions is called at start to get prior play
// from the database

var fakeApi = {
	
	  actionNumbers:[],
	
	  // add number to array
	  reportAction: function(p_ActionNumberAsInteger) {
		
		 if (this.actionNumbers.indexOf(p_ActionNumberAsInteger) === -1)
		 {
		    	this.actionNumbers.push(p_ActionNumberAsInteger);
		 }
		
      },
	   
	  
	  // return array 
	  requestActions: function() {
		
		 return this.actionNumbers;	
			
	  },
	
	
	  // request previous actions at start - async callback
	  requestPreviousActions: function(callback)
	  {
		// this will be used in actual api at start to get the inital array
		// of completed actions from the database
		// it will trigger a callback function that will receive completed actions
	  }
	
	  
       
  }