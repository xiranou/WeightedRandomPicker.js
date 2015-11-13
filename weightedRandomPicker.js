function weightedRandomPicker (initialWeightedValues) {

  var initialWeightedValues = initialWeightedValues || {};
  this.weightedValues = initialWeightedValues;

  this.randomPick = function(){
    var sumOfWeights = _getSumOfWeights.call(this);
    var random = _getRandom.call(this, sumOfWeights);
    return _randomPick.call(this, random);
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

  var _getSumOfWeights = function(){
    var sumOfWeights = this.values().reduce(function(a,b){
        return a + b;
      });
    return sumOfWeights;
  };

  var _getRandom = function(max, min){
    var min = min || 0;
    return Math.random() * max;
  };

  var _randomPick = function(random){
    var pick;
    this.keys().forEach(function(key, index){
      var weight = this.weightedValues[key];
      if (weight >= random) {
        pick = pick || key; //only store the first pick
      }
      random -= weight;
    }.bind(this));
    return pick;
  };
}