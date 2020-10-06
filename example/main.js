import { Application, Style, Skin, Label } from 'piu/MC';
import Timer from 'timer';
import TouchButton from 'touch-button';

const ExamplaAppcation = Application.template($ => ({
  contents:[
    Label($, {
      anchor:"MAIN_SCREEN",
      top: 0, bottom: 0, left: 0, right: 0,
      style:new Style({ font:'OpenSans-Regular-52', color:'white'}),
      skin: new Skin({ fill: 'black' }),
      string: "button test",
    }),
    new TouchButton(null, { name:'a', left:10,  top:241, width:80, height:40 }),
    new TouchButton(null, { name:'b', left:130, top:241, width:70, height:40 }),
    new TouchButton(null, { name:'c', left:230, top:241, width:80, height:40 })
  ],
  Behavior: class extends Behavior {
    onCreate(application, data) {
      this.data = data;
    }
    onTouchButtonChanged(application, name, down) {
      trace(`[onTouchButtonChanged]${name} / ${down}\n`);
      this.data["MAIN_SCREEN"].string = `${name}/${down}`;

      if(!down) {
        Timer.set(() => {
          this.data["MAIN_SCREEN"].string = 'button test';
        }, 500);
      }
      
      // global.button compatible
      if(global.button[name] ) global.button[name].down = down;
      if(global.button[name] ) global.button[name].onChanged?.();
    }
  }
}));

const application = new ExamplaAppcation({});

// global.button compatible
class Button {
  down = false;
  onChanged() { /* no operation. */ }
  read() { return this.down; }
}

global.button = {
  a: new Button(),
  b: new Button(),
  c: new Button(),
}

global.button.a.onChanged = function() {
  if (this.read()) {
    trace('buttonA:press');
  } else {
    trace('buttonA:release');
  }
}
global.button.b.onChanged = function() {
  if (this.read()) {
    trace('buttonB:press');
  } else {
    trace('buttonB:release');
  }
}
global.button.c.onChanged = function() {
  if (this.read()) {
    trace('buttonB:press');
  } else {
    trace('buttonB:release');
  }
}

