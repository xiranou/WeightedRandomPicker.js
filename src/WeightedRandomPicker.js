function WeightedRandomPicker (initialWeightedValues) {

  //clones the initialWeightedValues:
  //set default to empty object for the JSON lib clone trick to work
  initialWeightedValues = initialWeightedValues || {};
  // clones param object to property of this
  this.weightedValues = JSON.parse(JSON.stringify(initialWeightedValues));

  this.randomPick = function(options){
    var picks = [];
    options = options || {};
    options.uniq = options.uniq || false;
    options.times = options.times || 1;

    if (options.uniq && options.times > this.getKeys().length) {
      throw new InvalidUniqTimesException();
    } else {
      for (var i=0; i<options.times; i++){
        picks.push(randomPick.call(this, options));
      }
      if (options.uniq) {
        // uniq picks deletes from this.weightedValues
        // re-clone from initial after uniq pick completes
        this.weightedValues = JSON.parse(JSON.stringify(initialWeightedValues));
      }
    }

    return picks;
  };

  this.getKeys = function(){
    return Object.keys(this.weightedValues);
  };

  this.getValues = function(){
    var values = this.getKeys().map(function(key) {
      return this.weightedValues[key];
    }.bind(this));
    return values;
  };

  var InvalidUniqTimesException = function(){
    this.toString = function(){
      return "While uniq is set to true, times option cannot be more than what the actual number of key/values in object. Please confirm.";
    };
  };

  var getSumOfWeights = function(){
    var sumOfWeights = this.getValues().reduce(function(a,b){
        return a + b;
      });
    return sumOfWeights;
  };

  var getRandom = function(max, min){
    var min = min || 0;
    var max = max || getSumOfWeights.call(this);
    return Math.random() * max;
  };

  var randomPick = function(options){
    var random = getRandom.call(this);
    var pick;
    this.getKeys().forEach(function(key, index){
      var weight = this.weightedValues[key];
      if (weight >= random) {
        pick = pick || key; //only store the first pick
        if (options.uniq && this.weightedValues[pick]) {
          // delete from pick not from key since
          // it is not breaking out from forEach
          // also checks if the pick exists in
          // the object
          delete this.weightedValues[pick];
        }
      }
      random -= weight;
    }.bind(this));
    return pick;
  };
}

WeightedRandomPicker.pickFrom = function(weightedValues, options){
  return (new WeightedRandomPicker(weightedValues)).randomPick(options);
};