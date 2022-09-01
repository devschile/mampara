/* Jah v0.1.0 */

(function(root, factory) {
  /* ======= Global Jah ======= */
  (typeof module === "object" && module.exports) ? module.exports = factory() : root.Jah = factory();
}(this, function() {
    var MutableDestroy = null;
    var target = null;
    var tested = {};
    
    var initState = function(store) {
      var currentInstance = null;
      var instances = store.instances;
      var map = store.map;
      var state = store.state;
      var _state = store._state;
    
      var loop = function ( key ) {
        Object.defineProperty(state, key, {
          get: function() {
            if(target !== null) {
              if(map[target] === undefined) {
                map[target] = {};
              }
    
              map[target][key] = true;
            }
    
            return _state[key];
          },
          set: function(value) {
            _state[key] = value;
    
            for(var i = 0; i < instances.length; i++) {
              if(map[(currentInstance = instances[i]).$name][key] === true) {
                currentInstance.build();
              }
            }
          }
        });
      };
    
      for(var key in _state) loop( key );
    }
    
    var defineProperty = function(obj, prop, value, def) {
      if(value === undefined) {
        obj[prop] = def;
      } else {
        obj[prop] = value;
      }
    }
    
    
    function Jah(options) {
      // Setup state
      this.state = {};
      defineProperty(this, "_state", options.state, {});
    
      // Setup actions
      defineProperty(this, "actions", options.actions, {});
    
      // Setup instances
      this.instances = [];
    
      // Setup dependency map
      this.map = {};
    
      // Initialize Reactive State
      initState(this);
    }
    
    Jah.prototype.dispatch = function(name, payload) {
      this.actions[name](this.state, payload);
    }
    
    Jah.prototype.install = function(instance) {
      // Remove store when destroyed
      var store = this;
      instance.destroy = function() {
        var instances = store.instances;
        instances.splice(instances.indexOf(this), 1);
        MutableDestroy.apply(this, arguments);
      }
    
      // Add to set of instances to update
      this.instances.push(instance);
    }
    
    Jah.init = function(Mutable) {
      var MutableRender = Mutable.prototype.render;
      MutableDestroy = Mutable.prototype.destroy;
      
      Mutable.prototype.render = function() {
        var name = null;
        var dom = null;
        var store = null;
    
        if((store = this.$options.store) !== undefined) {
          this.$data.store = store;
          store.install(this);
    
          if(tested[(name = this.$name)] !== true) {
            // Mark this component as tested
            tested[name] = true;
    
            // Setup target to capture dependencies
            target = name;
    
            // Mount
            dom = MutableRender.apply(this, arguments);
    
            // Stop capturing dependencies
            target = null;
          } else {
            dom = MutableRender.apply(this, arguments);
          }
        } else {
          dom = MutableRender.apply(this, arguments);
        }
    
        this.render = MutableRender;
        return dom;
      }
    }
    
    return Jah;
}));
