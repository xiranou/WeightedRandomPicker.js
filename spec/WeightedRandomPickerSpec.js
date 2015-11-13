describe('Can initiate', function() {
  it('should initiate with empty weightedValues', function() {
    var picker = new WeightedRandomPicker();
    expect(picker.weightedValues).toEqual({});
  });
});