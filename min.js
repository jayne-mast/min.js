$ = (function (document, $) {
    var element = Element.prototype,
        nodeList = NodeList.prototype,
        htmlCollection = HTMLCollection.prototype,
        forEach = 'forEach',
        trigger = 'trigger',
        each = [][forEach],
        dummy = document.createElement();

    nodeList[forEach] = each;

    element.on = function (events, fn) {
        var self = this
        each.call(events.split(' '), function(event) {
            self.addEventListener(event, fn, false);
        })
        return self;
    };

    element.getWidth = function () {
        var styles = window.getComputedStyle(this);
        if (styles) {
            return parseFloat(styles.width);
        } else {
            return 0;
        }
    }

    element.getHeight = function () {
        var styles = window.getComputedStyle(this);
        if (styles) {
            return parseFloat(styles.height);
        } else {
            return 0;
        }
    }

    element.getFullWidth = function () {
        var styles = window.getComputedStyle(this);
        if (styles) {
            return parseFloat(styles.width) + parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
        } else {
            return 0;
        }
    };

    element.getFullHeight = function () {
        var styles = window.getComputedStyle(this);
        if (styles) {
            return parseFloat(styles.height) + parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
        } else {
            return 0;
        }
    };

    nodeList.on = function (events, fn) {
        var self = this;
        each.call(events.split(' '), function(event) {
            each.call(self, function (el) {
                el.on(event, fn);
            });
        });
        return self;
    };

    nodeList.width = nodeList.height = nodeList.getFullHeight = nodeList.getFullHeight = function () {
        return 0;
    };

    htmlCollection.on = function (events, fn) {
        var self = this;
        each.call(events.split(' '), function(event) {
            each.call(self, function (el) {
                el.on(event, fn);
            });
        });
        return self;
    };

    element.trigger = function (type, data) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(type, true, true);
        event.data = data || {};
        event.eventName = type;
        event.target = this;
        this.dispatchEvent(event);
        return this;
    };

    nodeList.trigger = function (event) {
        each.call(this, function (el) {
            el[trigger](event);
        });
        return this;
    };

    element.find = function (s) {
        var r = this.querySelectorAll(s || '☺'),
            length = r.length;
        return length == 1 ? r[0] : !length ? nodeList : r;
    }

    $ = function (s) {
        var r = document.querySelectorAll(s || '☺'),
            length = r.length;
        return length == 1 ? r[0] : !length ? nodeList : r;
    };

    $.on = element.on.bind(dummy);
    $.trigger = element[trigger].bind(dummy);

    $.ajax = function (settings) {
        var r = new XMLHttpRequest();

        if  (typeof settings !== 'object') {
            settings = {url: settings};
        }

        if (typeof settings.type === 'undefined') {
            settings.type = 'GET';
        }
        if (typeof settings.url === 'undefined') {
            settings.url = document.URL;
        }
        if (typeof settings.data === 'undefined') {
            settings.data = '';
        }

        r.open(settings.type, settings.url, true);

        if (typeof settings.complete === 'function') {
            r.onreadystatechange = function (e) {
                if (r.readyState != 4 || r.status != 200) return;
                settings.complete(e.target.responseText);
            };
        }
        r.send(settings.data);
    };

    return $;
})(document);
