import { Application, Style, Skin, Label } from 'piu/MC';
import Timer from 'timer';
import TouchButton from 'touch-button';

const application = new Application(null, {
  contents:[
    Label(null, {
      top: 0, bottom: 0, left: 0, right: 0,
      style:new Style({ font:'OpenSans-Regular-52', color:'white'}),
      skin: new Skin({ fill: 'black' }),
      string: "button test",
		}),
  ],
  Behavior: class extends Behavior {
    onTouchButtonChanged(content, id, down) {
      trace(`[onTouchButtonChanged]${id} / ${down}\n`);
      application.first.string = `${id}/${down}`;

      if(!down) {
        Timer.set(() => {
          application.first.string = 'button test';
        }, 500);
      }
      
      // global.button compatible
      if(global.button[id] ) global.button[id].down = down;
      if(global.button[id] ) global.button[id].onChanged?.();
    }
  }
});

application.add(new TouchButton({id:'a', x:10,    y:241,  width:80, height:40}));
application.add(new TouchButton({id:'b', x:130,   y:241,  width:70, height:40}));
application.add(new TouchButton({id:'c', x:230,   y:241,  width:80, height:40}));

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

