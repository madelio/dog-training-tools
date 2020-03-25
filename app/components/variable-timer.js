import Component from '@ember/component';
import { computed, setProperties } from '@ember/object';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import {convertTextToTime, convertTimeToText} from '../utils/time-converter';

var PASS_MAX = 3;
var CLICKER_URL = "https://championofmyheart.com/wp-content/uploads/2014/03/new-relaxation-protocol-day-1.mp3";
var LIMITS = [
    { limit: 10, incrementBy: 1 },
    { limit: 30, incrementBy: 3 },
    { limit: 30, incrementBy: 3 },
    { limit: 60, incrementBy: 3 },
    { limit: 1200, incrementBy: 3 },
    { limit: 3000, incrementBy: 3 },
    { limit: 6000, incrementBy: 3 },
    { limit: 36000, incrementBy: 3 },
]

// TODO, add ways to record sessions! with different environments & distractions
export default Component.extend({

    hifi: service(),

    duration: 0,
    lowerLimit: 1,
    upperLimit: 10,
    iteration: 0,
    timerText: '00:00:00',
    isAutostart: false,

    timesPassed: 0,

    upperLimitText: computed(function() {
        return convertTimeToText(this.upperLimit);
    }),
    durationText: computed('duration', function () {
        return convertTimeToText(this.duration);
    }),

    increment: computed('upperLimit', function() {
        var limitTable = [
            { limit: "10s", increment: "3s"},
            { limit:"30s", increment: "5s"},
            { limit:"1m", increment: "10s"},
            { limit:"5m", increment: "15s"},
            { limit:"15m", increment: "1m"},
            { limit:"30m", increment: "5m"},
            { limit:"1h", increment: "10m"},
            { limit:"2h", increment: "15m"},
        ]

        for(var limit of limitTable) {
            if (this.upperLimit < convertTextToTime(limit.limit)) {
                return convertTextToTime(limit.increment);
                //return convertTextToTime(limitGroup.increment);
            }
        }
        return 0;
    }),


    incrementDuration() {
        this.set('upperLimit', parseInt(this.upperLimit) + this.increment);
        this.set('lowerLimit', parseInt(this.lowerLimit) + (this.increment/2));
    },

    actions: {
        autoStart() {
            this.toggleProperty('isAutostart');
        },
        passed() {
            this.set('timesPassed', this.timesPassed+ 1);
            if (this.timesPassed=== PASS_MAX) {
                this.set('timesPassed', 0);
                this.incrementDuration();
            }
            this.set('duration', Math.floor(Math.random() * this.upperLimit) + this.lowerLimit);
        },

        failed() {
            this.set('timesPassed', 0);
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
            //timesPassed: 0
            // })
            //console.log(this.increment);
            convertTextToTime("1h20m3s");
            var audio = new Audio('testday1.mp3');
            audio.play();
        },

        startTimer(duration) {
            this.set('iteration', this.iteration + 1);
            // var timer = duration, minutes, seconds
            var component = this;
            var interval = setInterval(function () {
                component.set('timerText', convertTimeToText(duration, "clock"));

                if (--duration < 0) {
                    // component.get('hifi').play(CLICKER_URL).then(({sound}) => {
                    //     // sound object
                    //     debugger;

                    //   }).catch(error => {

                    //   })
                    clearInterval(interval);
                    if (component.isAutostart) {
                        // var duration = this.pass;
                        later(() => {
                            component.send('passed');
                            component.send('startTimer', component.duration);
                        }, 1000);
                    }
                }
            }, 1000);
            this.set('intervalId', interval);
        },
    }
});
