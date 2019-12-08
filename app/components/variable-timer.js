import Component from '@ember/component';
import { computed, setProperties } from '@ember/object';
import { inject as service } from '@ember/service';

var PASS_MAX = 3;
var CLICKER_URL = "https://championofmyheart.com/wp-content/uploads/2014/03/new-relaxation-protocol-day-1.mp3";

// TODO, add ways to record sessions! with different environments & distractions
export default Component.extend({

    hifi: service(),

    duration: 0,
    lowerLimit: 1,
    upperLimit: 10,
    iteration: 0,
    timerText: '00:00',
    isAutostart: false,

    passCount: 0,

    durationText: computed('duration', function () {
        var minutes = Math.floor(this.duration / 60);
        var seconds = `${this.duration - minutes * 60} seconds`;

        if (this.duration > 60) {
            return minutes + "mins " + seconds;
        }

        return this.duration;
    }),



    incrementDuration() {
        this.set('upperLimit', parseInt(this.upperLimit) + (this.iteration * 2));
        this.set('lowerLimit', parseInt(this.lowerLimit) + 1);
        

        // fix iteration so that
        /* 
        fix iteration so that upper limit is a round number
        upper limit, increase table
         for limit < 10, increments by 3
         for 10 < limit < 30, increments by 5
         for 30 < limit < 60, increments by 10
         for 60 < limit < 1200, increments by 15
         for 1200 < limit < 3000, increments by 30
         for 1300 < limit < 6000, increments by 60
         for 6000 < limit < 36000, increments by 5 min? 
        */
    },

    // randomizeDuration() {
    //     var duration = Math.floor(Math.random() * this.upperLimit) + this.lowerLimit;
    //     this.set('duration', duration);
    //     return duration;
    // },

        autoStartRecurse() {
            if (this.isAutostart) {
                this.send('passed');
                this.send('startTimer', this.duration);
                // this.autoStartRecurse();
            } 
        },
        passedFunc() {
            this.set('passCount', this.passCount + 1);

            if (this.passCount === PASS_MAX) {
                this.set('passCount', 0);
                this.incrementDuration();
            }

            // const randomDuration = this.randomizeDuration();
             var duration = Math.floor(Math.random() * this.upperLimit) + this.lowerLimit;
             this.set('duration', duration);
            //return duration;


        },
    actions: {
        autoStart() {
            this.toggleProperty('isAutostart');
            // this.autoStartRecurse();
        },
        passed() {
            this.passedFunc();
        },

        failed() {
            this.set('passCount', 0);
        },

        stopTimer() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }

        },

        reset() {
            // this.setProperties({
            //     lowerLimit: 0,
            //     upperLimit: 1,
            //     iteration: 0,
            //     passCount: 0
            // })
                var audio = new Audio('testday1.mp3');
                audio.play();
        },

        startTimer(duration) {
            this.set('iteration', this.iteration + 1);
            var timer = duration, minutes, seconds;
            var component = this;
            var interval = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                component.set('timerText', minutes + ":" + seconds);

                if (--timer < 0) {
                // component.get('hifi').play(CLICKER_URL).then(({sound}) => {
                //     // sound object
                //     debugger;
            
                //   }).catch(error => {
            
                //   })
                    clearInterval(interval);
                    if (component.isAutostart) {
                        // var duration = this.pass;
                        component.passedFunc();
                        component.send('startTimer', component.duration);
                    } 
                }
            }, 1000);
            this.set('intervalId', interval);
        },
    }
});
