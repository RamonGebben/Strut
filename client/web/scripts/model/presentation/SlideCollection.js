// Generated by CoffeeScript 1.2.1-pre
/*
@author Matt Crinklaw-Vogt
*/

define(["common/Calcium", "./Slide"], function(Backbone, Slide) {
  var slideComparator;
  slideComparator = function(l, r) {
    return l.get("num") - r.get("num");
  };
  return Backbone.Collection.extend({
    model: Slide,
    initialize: function() {
      this.on("add", this._updateNumbers, this);
      return this.on("remove", this._updateNumbers, this);
    },
    _updateNumbers: function() {
      return this.models.forEach(function(model, idx) {
        return model.set("num", idx);
      });
    },
    sort: function(opts) {
      var swapped,
        _this = this;
      opts || (opts = {});
      swapped = {};
      this.models.forEach(function(model, idx) {
        var num;
        num = model.get("num");
        if (num !== idx && !swapped[num]) {
          swapped[num] = true;
          swapped[idx] = true;
          return _this._swapTransitionPositions(model, _this.models[num]);
        }
      });
      return this.models.sort(slideComparator);
    },
    _swapTransitionPositions: function(l, r) {
      var silent, tempPosData;
      tempPosData = l.getPositionData();
      silent = {
        silent: true
      };
      l.set(r.getPositionData(), silent);
      return r.set(tempPosData, silent);
    }
  });
});
