import Timer from 'timer';

const TouchButton = Content.template($ => ({
  active:true,
  Behavior: class extends Behavior {
    onCreate(content, data) {
      this.event = data;
      this.down = false;
      this.vibration = { enable: true, duration:100 };
    }
    onTouchBegan(content, x, y) {
      this.down = true;
      // trace(`${content.name}:${this.down} / ${x} / ${y}\n`);
      if(this.vibration.enable) {
        this.vibrate(this.vibration.duration);
      }
      content.bubble(this.event, this.down);
    }
    onTouchEnded(content, x, y) {
      this.down = false;
      // trace(`${content.name}${this.down} / ${x} / ${y}\n`);
      content.bubble(this.event, this.down);
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