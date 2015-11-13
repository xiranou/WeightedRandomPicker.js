function WeightedRandomPicker (initialWeightedValues) {

  var initialWeightedValues = initialWeightedValues || {};
  this.weightedValues = initialWeightedValues;

  this.randomPick = function(options){
    var options = options || {};
    var uniq = options.uniq || false;
    var times = options.times || 1;
    var picks = [];

    if (uniq && times > this.keys().length) {
      throw new InvalidUniqTimesException();
    } else {
      for (var i=0; i<times; i++){
        picks.push(_randomPick.call(this, uniq));
      }
    }

    return options.times > 1 ? picks : picks[0];
  };

  this.keys = function(){
    return Object.keys(this.weightedValues);
  };

  this.values = function(){
    var values = this.keys().map(function(key) {
      return this.weightedValues[key];
    }.bind(this));
    return values;
  };

  var InvalidUniqTimesException = function(){
    this.toString = function(){
      return "While uniq is set to true, times option cannot be more than what the actual number of key/values in object. Please confirm.";
    };
  };

  var _getSumOfWeights = function(){
    var sumOfWeights = this.values().reduce(function(a,b){
        return a + b;
      });
    return sumOfWeights;
  };

  var _getRandom = function(max, min){
    var min = min || 0;
    var max = max || _getSumOfWeights.call(this);
    return Math.random() * max;
  };

  var _randomPick = function(uniq){
    var random = _getRandom.call(this);
    var pick;
    this.keys().forEach(function(key, index){
      var weight = this.weightedValues[key];
      if (weight >= random) {
        pick = pick || key; //only store the first pick
        if (uniq && this.weightedValues[pick]) {
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