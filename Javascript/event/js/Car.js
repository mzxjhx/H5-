

  function Car() {
    this.logo = 0;
    this.Speed = 0;
    this.count=0;
    this.event = new CustomEvent('run', 
      { 
        type: 'run', detail: 'your speed is beyond!',
      }
    );
  }
  Car.prototype.add = function(array) {
    array.forEach(function(entry) {
      this.Speed += entry;
      ++this.count;
    }, this);
    this.Run();
  };
  /*注册事件*/ 
  Car.prototype.AddEvent = function(type,fn){
    window.addEventListener(type,fn);
  }

  Car.prototype.Run =function(){
    //触发事件
    if(this.Speed > 10){
        if(window.dispatchEvent) {  
          window.dispatchEvent(this.event);
      } else {
          window.fireEvent(this.event);
      }
    }

  }
