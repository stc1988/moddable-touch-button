import Timer from 'timer';

const TouchButton = Container.template($ => ({
  id:$.id,
  active:true,
  left:$.x, top: $.y, width:$.width, height:$.height,
  Behavior: class extends Behavior {
    onCreate(content, data) {
      this.id = data.id;
      this.down = false;
      this.vibration = { enable: true, duration:100 };
    }
    onTouchBegan(content, x, y) {
      this.down = true;
      // trace(`${this.id}:${this.down} / ${x} / ${y}\n`);
      if(this.vibration.enable) {
        this.vibrate(this.vibration.duration);
      }
      content.bubble("onTouchButton", this.id, this.down);
    }
    onTouchEnded(content, x, y) {
      this.down = false;
      // trace(`${this.id}${this.down} / ${x} / ${y}\n`);
      content.bubble("onTouchButton", this.id, this.down);
    }
    vibrate(duration) {
      if(global.vibration) {
        global.vibration.write(true);
          Timer.set(() => {
            global.vibration.write(false);
          }, duration);
      }
    }
  }
}));

export default TouchButton;