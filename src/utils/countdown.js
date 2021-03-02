import mitt from 'mitt';

export default class Countdown {
  constructor() {
    const m = mitt();
    Object.assign(this, m);
  }

  start(secondsToGo) {
    this.seconds = secondsToGo;
    this.secondsLeft = secondsToGo;
    this.currentTime = Math.ceil(Date.now() / 1000);
    this.startTime = Math.ceil(Date.now() / 1000);
    this.interval = setInterval(() => this.reduceSecondsLeft(), 1000);
  }

  get timeDifference() {
    return this.currentTime - this.startTime;
  }

  reduceSecondsLeft() {
    this.currentTime = Math.ceil(Date.now() / 1000);
    this.secondsLeft = this.seconds - this.timeDifference;
    this.emit('time-updated', this.secondsLeft);
    if (this.secondsLeft <= 0) {
      this.stop();
      this.emit('time-expired');
    }
  }

  stop() {
    clearInterval(this.interval);
  }
}
