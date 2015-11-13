function WeightedRandomPicker (initialWeightedValues) {

  var initialWeightedValues = initialWeightedValues || {};
  this.weightedValues = initialWeightedValues;

  this.randomPick = function(options){
    var options = options || {};
    var times = options.times || 1;
    var picks = [];
    for (var i=0; i<times; i++){
      picks.push(_randomPick.call(this));
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

  var _randomPick = function(){
    var random = _getRandom.call(this);
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