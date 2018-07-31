var deepDiffMapper = function() {
  return {
    VALUE_CREATED: 'created',
    VALUE_UPDATED: 'updated',
    VALUE_DELETED: 'deleted',
    VALUE_UNCHANGED: 'unchanged',
    map: function(obj1, obj2, no_unchanged) {
      if (this.isFunction(obj1) || this.isFunction(obj2)) {
        throw new Error('Invalid argument. Function given, object expected.');
      }
      if (this.isValue(obj1) || this.isValue(obj2)) {
        let r = {
          type: this.compareValues(obj1, obj2),
          data: (obj1 === undefined) ? obj2 : obj1
        };

        return no_unchanged && r.type === this.VALUE_UNCHANGED ?
          null :
          r.type === this.VALUE_UPDATED && obj1 !== undefined ?
            { ...r, data: { old: obj1, new: obj2 }}:
            r;
      }
        
      var diff = {};
      for (var key1 in obj1) {
        if (this.isFunction(obj1[key1])) {
          continue;
        }
            
        var value2 = undefined;
        if ('undefined' !== typeof(obj2[key1])) {
          value2 = obj2[key1];
        }
            
        diff[key1] = this.map(obj1[key1], value2, no_unchanged);
      }
      for (var key2 in obj2) {
        if (this.isFunction(obj2[key2]) || ('undefined' !== typeof(diff[key2]))) {
          continue;
        }
            
        diff[key2] = this.map(undefined, obj2[key2], no_unchanged);
      }

      if(no_unchanged){
        for(var d in diff){
          if(diff[d] === null){ delete diff[d]; }
        }
      }
        
      return Object.keys(diff).length > 0 ? diff : null;
    },
    compareValues: function(value1, value2) {
      if (value1 === value2) {
        return this.VALUE_UNCHANGED;
      }
      if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
        return this.VALUE_UNCHANGED;
      }
      if ('undefined' === typeof(value1)) {
        return this.VALUE_CREATED;
      }
      if ('undefined' === typeof(value2)) {
        return this.VALUE_DELETED;
      }
        
      return this.VALUE_UPDATED;
    },
    isFunction: function(obj) {
      return {}.toString.apply(obj) === '[object Function]';
    },
    isArray: function(obj) {
      return {}.toString.apply(obj) === '[object Array]';
    },
    isObject: function(obj) {
      return {}.toString.apply(obj) === '[object Object]';
    },
    isDate: function(obj) {
      return {}.toString.apply(obj) === '[object Date]';
    },
    isValue: function(obj) {
      return !this.isObject(obj) && !this.isArray(obj);
    }
  };
}();

export default deepDiffMapper;