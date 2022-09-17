// Custom Variable class
function CustomVariableHelper(instant_ad_vars_default_in) {
  // Default custom variable values.
  this.instant_ad_vars_default = instant_ad_vars_default_in;
}

// clean function for custom variables.
CustomVariableHelper.prototype.clean = function(feeds) {
	var keys = Object.keys(this.instant_ad_vars_default);
	for(var i=0; i<keys.length; i++) {
		var key = keys[i];
    if(instant_ad_vars[key] && (instant_ad_vars[key].indexOf('|') > -1 || instant_ad_vars[key].indexOf('+') > -1 || feeds[0][instant_ad_vars[key].toLowerCase()] !== undefined)) {
      instant_ad_vars[key] = instant_ad_vars[key].toLowerCase();
    }
    else {
      instant_ad_vars[key] = this.instant_ad_vars_default[key];
    }
  }
};

// process function for custom variable
CustomVariableHelper.process = function(feed, customVariable) {
  var invalid = false;
	var value = "";
  var customVariableValues = customVariable.split('+');
	for(var i=0; i<customVariableValues.length; i++) {
		var node = customVariableValues[i];
		if(node.charAt(0) === "[" && node.charAt(node.length-1) === "]") {
			value += node.slice(1, node.length-1);
		}
  	else if(feed[node] === undefined) {
    	invalid = true;
    }
    else {
    	value += feed[node];
    }
  }
  return ((invalid) ? "" : value);
};
