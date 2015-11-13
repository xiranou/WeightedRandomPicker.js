function WeightedRandomPicker (initialWeightedValues) {

  var initialWeightedValues = initialWeightedValues || {};
  this.weightedValues = initialWeightedValues;

  this.randomPick = function(options){
    var options = options || {};
    var uniq = options.uniq || false;
    var times = options.times || 1;
    var picks = [];

    for (var i=0; i<times; i++){
      picks.push(_randomPick.call(this, uniq));
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

var weightedValues = {"A": 0.1, "B": 0.7, "C": 0.7, "D": 0.8};

var picker = new WeightedRandomPicker(weightedValues);

var picks = picker.randomPick({times: 3});
console.log(picks);

var uniqPicks = picker.randomPick({times: 3, uniq: true});
console.log(uniqPicks);