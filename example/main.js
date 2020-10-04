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
    vibration(content, duration) {
      global.vibration.write(true);
      Timer.set(() => {
        global.vibration.write(false);
      }, duration);
    }
    onTouchButton(container, id, down) {
      trace(`[onTouchButton]${id}/${down}\n`);
      application.first.string = `${id}/${down}`;

      if(down) {
        container.delegate("vibration", 100);
      } else {
        Timer.set(() => {
          application.first.string = 'button test';
        }, 500);
      }
    }
  }
});

application.add(TouchButton);
