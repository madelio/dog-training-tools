import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    duration: 0,
    lowerLimit: 1,
    upperLimit: 0,
    iteration: 0,
    timerText: '00:00',

    durationText: computed('duration', function () {
        var minutes = Math.floor(this.duration / 60);
        var seconds = `${this.duration - minutes * 60} seconds`;

        if (this.duration > 60) {
            return minutes + "mins " + seconds;
        }

        return this.duration;
    }),



    actions: {
        incrementDuration() {
            this.set('iteration', this.iteration + 1);
            this.set('upperLimit', this.upperLimit + (this.iteration * 2));
            this.set('lowerLimit', this.lowerLimit + 1);

            this.set('duration', Math.floor(Math.random() * this.upperLimit) + this.lowerLimit);
        },

        startTimer(duration) {
            var timer = duration, minutes, seconds;
            var component = this;
            var interval = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                component.set('timerText', minutes + ":" + seconds);

                if (--timer < 0) {
                     clearInterval(interval);
                } 
            }, 1000);
        },
    }
});
