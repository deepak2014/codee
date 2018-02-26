function clone(obj) {
	if (null == obj || "object" != typeof obj) return obj;
	var copy = obj.constructor();
	for (var attr in obj) {
		if (obj.hasOwnProperty(attr)){
			if(typeof obj[attr] == 'object'){
				copy[attr] = clone(obj[attr]);
			}else{
				copy[attr] = obj[attr];
			}
		}
	}
	return copy;
}
function precise_round(num,decimals) {
	return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
function toArray(value){
	return (_.isArray(value)) ? value : [value];
}
function toBoolean(value){
	if(_.isUndefined(value)){
		return false;
	}else{
		return (value == "true" || value);
	}
}
var tempO = [1, 2, 4, 5];
Array.prototype.populate = function(countN) {
	for(var i=0; i<countN; i++){
		this.push(i+1);
	}
	return this;
}
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
Array.prototype.searchItem = function(value) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == value){
     return i
    }
  }
  return -1;
};
Array.prototype.getRange = function(){
	var rangeA = [];
	this.shift();
	this.clean('')
	this.sort(function(a, b){return a-b});

	rangeA[0] = this[0];
	rangeA[1] = this[this.length-1];

	return rangeA;
}
Array.prototype.titleCase = function(){
  for (var i = 0; i < this.length; i++) {
  }
}
Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};
Array.prototype.shitElements = function(itemsArrayToMove, moveLeft){
    var finalA = new Array(this.length);
    
    for(var i=0; i<this.length; i++){
        for(var j=0; j<itemsArrayToMove.length; j++){
            if(this[i] == itemsArrayToMove[j]){
                var finalIndex = (moveLeft) ? (i-1) : (i+1);
                finalIndex = Math.max(finalIndex, 0);
                finalIndex = Math.min(finalIndex, this.length - 1);
                finalA[finalIndex] = this[i];
                this[i] = undefined;
            }
        }
    }
    for(i=0; i<this.length; i++){
        if(this[i] !== undefined){
            for(j=0; j<finalA.length; j++){
                if(finalA[j] === undefined){
                    finalA[j] = this[i];
                    break;
                }
            }
        }
    }
    return finalA;
}
String.prototype.replaceMultipleSpaces = function(){
	return this.replace(/\s{2,}/g, ' ');
}
String.prototype.toBoolean = function(){
	return (this == 'true');
}
String.prototype.replaceMultipleCharacters = function(character){
	var lastIndexN = this.lastIndexOf(character);
	if(this.indexOf(character) == lastIndexN){
		return this;
	}else{
		return (this.substring(0, lastIndexN) + this.substring(lastIndexN+1));
	}
}
String.prototype.underscoreToTitleCase = function(){
    return this.replace(new RegExp("_", 'g'), ' ').titleCase()
}
String.prototype.expandExponential = function(){
	return this.replace(/^([+-])?(\d+).?(\d*)[eE]([-+]?\d+)$/, function(x, s, n, f, c){
		var l = +c < 0, i = n.length + +c, x = (l ? n : f).length,
		c = ((c = Math.abs(c)) >= x ? c - x + l : 0),
		z = (new Array(c + 1)).join("0"), r = n + f;
		return (s || "") + (l ? r = z + r : r += z).substr(0, i += l ? z.length : 0) + (i < r.length ? "." + r.substr(i) : "");
	});
};	   
String.prototype.ellipsifyText = function(maxChars){
	if(this.length > maxChars){
		return (this.substr(0, maxChars-3) + '...')
	}
	return this;
}
String.prototype.titleCase = function(){
    var returnA = this.split(' ');
    returnA.forEach(function(currentValue, index, arr){
        returnA[index] = currentValue.substr(0,1).toUpperCase() + currentValue.substr(1)
    })
    return returnA.join(' ');
}
//
function searchXML(xml, tagName, attribute, value)
{
    var $xml = $(xml);
	var searchString = tagName + '[' + attribute + '="' + value + '"]';
	return $xml.find(searchString);
}