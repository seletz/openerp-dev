openerp.testing.section('timer', function (test) {
    test('format_time', function (instance) {
        var w = new instance.web_example.Action();

        strictEqual(
            w.format_time(0),
            '00:00:00');
        strictEqual(
            w.format_time(543),
            '00:00:00',
            "should round sub-second times down to zero");
        strictEqual(
            w.format_time(5340),
            '00:00:05',
            "should floor sub-second extents to the previous second");
        strictEqual(
            w.format_time(60000),
            '00:01:00');
        strictEqual(
            w.format_time(3600000),
            '01:00:00');
        strictEqual(
            w.format_time(86400000),
            '24:00:00');
        strictEqual(
            w.format_time(604800000),
            '168:00:00');

        strictEqual(
            w.format_time(22733958),
            '06:18:53');
        strictEqual(
            w.format_time(41676639),
            '11:34:36');
        strictEqual(
            w.format_time(57802094),
            '16:03:22');
        strictEqual(
            w.format_time(73451828),
            '20:24:11');
        strictEqual(
            w.format_time(84092336),
            '23:21:32');
    });
    test('update_counter', function (instance, $fixture) {
        var w = new instance.web_example.Action();
        // $fixture is a DOM tree whose content gets cleaned up before
        // each test, so we can add whatever we need to it
        $fixture.append('<div class="oe_web_example_timer">');
        // Then set it on the widget
        w.setElement($fixture);

        // Update the counter with a known value
        w.update_counter(22733958);
        // And check the DOM matches
        strictEqual($fixture.text(), '06:18:53');

        w.update_counter(73451828)
        strictEqual($fixture.text(), '20:24:11');
    });
    test('display_record', function (instance, $fixture) {
        var w = new instance.web_example.Action();
        $fixture.append('<ol class="oe_web_example_saved">')
        w.setElement($fixture);

        w.display_record({time: 41676639});
        w.display_record({time: 84092336});

        var $lis = $fixture.find('li');
        strictEqual($lis.length, 2, "should have printed 2 records");
        strictEqual($lis[0].textContent, '11:34:36');
        strictEqual($lis[1].textContent, '23:21:32');
    });
    test('start', {templates: true, rpc: 'mock', asserts: 3}, function (instance, $fixture, mock) {
        // Rather odd-looking shortcut for search+read in a single RPC call
        mock('/web/dataset/search_read', function () {
            // ignore parameters, just return a pair of records.
            return {records: [
                {time: 22733958},
                {time: 84092336}
            ]};
        });

        var w = new instance.web_example.Action();
        return w.appendTo($fixture)
        .then(function () {
            var $lis = $fixture.find('li');
            strictEqual($lis.length, 2);
            strictEqual($lis[0].textContent, '06:18:53');
            strictEqual($lis[1].textContent, '23:21:32');
        });
    });
    test('watch_stop', {templates: true, rpc: 'mock', asserts: 3}, function (instance, $fix, mock) {
        var created = false;
        mock('web_example.stopwatch:create', function (args, kwargs) {
            created = true;
            // return a fake id (unused)
            return 42;
        });
        mock('/web/dataset/search_read', function () {
            return {records: []};
        });

        var w = new instance.web_example.Action();
        return w.appendTo($fix)
        .then(function () {
            // Virtual start point 5s before 'now'
            w._start = new Date() - 5000;
            return w.watch_stop();
        })
        .done(function () {
            ok(created, "should have called create()");
            strictEqual($fix.find('.oe_web_example_timer').text(),
                        '00:00:05',
                        "should have updated the timer");
            strictEqual($fix.find('li')[0].textContent,
                        '00:00:05',
                        "should have added the new time to the list");
        });
    });
});
