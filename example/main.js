import { Application, Style, Skin, Label } from 'piu/MC';
import Timer from 'timer';
import TouchButton from 'touch-button';

const ExampleApplication = Application.template($ => ({
  contents:[
    Label($, {
      top: 0, bottom: 0, left: 0, right: 0,
      style:new Style({ font:'OpenSans-Regular-52', color:'white'}),
      skin: new Skin({ fill: 'black' }),
      string: "button test",
    }),
    new TouchButton("buttonAchanged", { left:10,  top:241, width:80, height:40 }),
    new TouchButton("buttonBchanged", { left:130, top:241, width:70, height:40 }),
    new TouchButton("buttonCchanged", { left:230, top:241, width:80, height:40 })
  ],
  Behavior: class extends Behavior {
    onCreate(application, data) {
      this.data = data;
    }
    onDisplaying(application) {
      // M5stack compatible
      if (undefined !== global.button) {
				let button = global.button;
				button.a.onChanged = function() {
					application.delegate("buttonAchanged", Boolean(!this.read()));
				}
				button.b.onChanged = function() {
          application.delegate("buttonBchanged", Boolean(!this.read()));
				}
				button.c.onChanged = function() {
          application.delegate("buttonCchanged", Boolean(!this.read()));
				}
			}
    }
    buttonAchanged(application, down) {
      application.first.string = `a/${down}`;
      if(!down) {
        Timer.set(() => {
          application.first.string = 'button test';
        }, 500);
      }
    }
    buttonBchanged(application, down) {
      application.first.string = `b/${down}`;
      if(!down) {
        Timer.set(() => {
          application.first.string = 'button test';
        }, 500);
      }
    }
    buttonCchanged(application, down) {
      application.first.string = `c/${down}`;
      if(!down) {
        Timer.set(() => {
          application.first.string = 'button test';
        }, 500);
      }
    }
  }
}));

export default new ExampleApplication({});