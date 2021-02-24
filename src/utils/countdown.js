import EventEmitter from 'events';

export default class Countdown extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
  }

  start(secondsToGo) {
    this.seconds = secondsToGo;
    this.secondsLeft = secondsToGo;
    this.currentTime = 0;
    this.startTime = Math.ceil(Date.now() / 1000);
    this.interval = setInterval(this.reduceSecondsLeft.bind(this), 1000);
  }

  get timeDifference() {
    return this.currentTime - this.startTime;
  }

  reduceSecondsLeft() {
    this.currentTime = Math.ceil(Date.now() / 1000);
    this.secondsLeft = this.seconds - this.timeDifference;
    this.emit('time-updated');
    if (this.timeDifference >= this.seconds) {
      clearInterval(this.interval);
      this.emit('time-expired');
    }
  }
}
