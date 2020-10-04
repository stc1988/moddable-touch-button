const Button = Container.template($ => ({
  id:$.id,
  active:true,
  top: 0, bottom:0, left:$.left, width:$.width,
  Behavior: class extends Behavior {
    onCreate(content, data, context) {
      this.id = data.id;
      this.down = false;
    }
    onTouchBegan(content, id, x, y, ticks) {
      this.down = true;
    //  trace(`${this.id}(${this.down})${x} / ${y}\n`);
      content.bubble("onTouchButton", this.id, this.down);
    }
    onTouchEnded(content, id, x, y, ticks) {
      this.down = false;
    //   trace(`${this.id}(${this.down})${x} / ${y}\n`);
      content.bubble("onTouchButton", this.id, this.down);
    }
  }
}));

let touchButton = new Container(null, {
  top: 240, height: 40, left: 0, right: 0,
  contents:[
    new Button({id:'a', left:10,  width:80}),
    new Button({id:'b', left:130, width:70}),
    new Button({id:'c', left:230, width:80}),
  ],
  Behavior: class extends Behavior {
    onTouchButton(conainer, id, down) {
        // trace(`[onButtonTouched]${id}/${down}\n`);
      }
  }
});

export default touchButton;