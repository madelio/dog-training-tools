import Component from '@ember/component';

export default Component.extend({
    duration: 0,
    actions: {
        incrementDuration() {
            this.set('duration', this.duration + 1);
        }
    }
});
