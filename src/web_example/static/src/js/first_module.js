// static/src/js/first_module.js
openerp.web_example = function (instance) {
    instance.web.client_actions.add('example.action', 'instance.web_example.Action');
    instance.web_example.Action = instance.web.Widget.extend({
        template: 'web_example.action',
        events: {
            'click .oe_web_example_start button': 'watch_start',
            'click .oe_web_example_stop button': 'watch_stop'
        },
        init: function () {
            this._super.apply(this, arguments);
            this._start = null;
            this._watch = null;
            this.model = new instance.web.Model('web_example.stopwatch');
        },
        start: function () {
            var display = this.display_record.bind(this);
            return this.model.query()
                .filter([['user_id', '=', instance.session.uid]])
                .all().done(function (records) {
                    _(records).each(display);
                });
        },
        current: function () {
            // Subtracting javascript dates returns the difference in milliseconds
            return new Date() - this._start;
        },
        display_record: function (record) {
            $('<li>')
                .text(this.format_time(record.time))
                .appendTo(this.$('.oe_web_example_saved'));
        },
        format_time: function (time) {
            var h, m, s;
            s = time / 1000;
            m = Math.floor(s / 60);
            s -= 60*m;
            h = Math.floor(m / 60);
            m -= 60*h;
            return _.str.sprintf("%02d:%02d:%02d", h, m, s);
        },
        update_counter: function (time) {
            this.$('.oe_web_example_timer').text(this.format_time(time));
        },
        watch_start: function () {
            this.$el.addClass('oe_web_example_started')
                    .removeClass('oe_web_example_stopped');
            this._start = new Date();
            // Update the UI to the current time
            this.update_counter(this.current());
            // Update the counter at 30 FPS (33ms/frame)
            this._watch = setInterval(function () {
                    this.update_counter(this.current());
                }.bind(this),
                33);
        },
        watch_stop: function () {
            var self = this;
            clearInterval(this._watch);
            var time = this.current();
            this.update_counter(time);
            this._start = this._watch = null;
            this.$el.removeClass('oe_web_example_started')
                    .addClass('oe_web_example_stopped');
            var record = {
                user_id: instance.session.uid,
                time: time,
            };
            return this.model.call('create', [record]).done(function () {
                self.display_record(record);
            });
        },
        destroy: function () {
            if (this._watch) {
                clearInterval(this._watch);
            }
            this._super();
        }
    });
};
