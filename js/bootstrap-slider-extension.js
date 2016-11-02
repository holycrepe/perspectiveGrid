
/* global define, Handlebars, isCordova  */
define(function(require, exports, module) {
    //noinspection NpmUsedModulesInstalled
    var Slider          = require('bootstrapslider');

    function create_ticked_slider(options, selector) {
        var $input = $(selector);
        var id             = $input.attr('id');
        var defaultOptions = {
            activeClass: "slider-tick-label-active",
            valueLabel:  true
        };
        if (id) {
            defaultOptions.id = id + "-slider";
        }
        options         = _.extend(defaultOptions, options);
        var activeClass = options.activeClass;
        var ticks       = false,
            tick_count  = 0;
        if (options.ticks_labels) {
            tick_count   = options.ticks_labels.length;
            var interval = (options.max - options.min) / (tick_count - 1);
            ticks        = _.map(options.ticks_labels, function (tick, i) {
                var key       = tick.toLowerCase().split(" ").join("-");
                var value     = Math.round(options.min + interval * i);
                var className = "slider-tick-label-" + key;
                return {
                    name:  tick,
                    index: i,
                    value: value,
                    key:   key,
                    class: className,
                    label: "<label data-tick-value='" + value + "' class='slider-tick-label " + className + "'>" + tick + "</label>"
                };
            });
            //debugger;
        }

        var $value = false;
        if (options.valueLabel === true) {
            $value = $input.siblings(".slider-value").first();
        } else if (options.valueLabel) {
            $value = $(options.valueLabel);
        }

        if (ticks && !options.ticks) {
            options.ticks_labels = _.map(ticks, _.property('label'));
            options.ticks        = _.map(ticks, _.property('value'));
        }
        var $slider = new Slider(selector, options);
        var $labels = $($slider.tickLabelContainer).children();
        $labels.each(function (i, label) {
            var tick   = ticks[i];
            var $label = $(label);
            $label
                .addClass(tick.class)
                .attr("data-tick-value", tick.value);
        });
        var onSliderValueChanged = function (value) {
            if ($value) {
                $value.text(value);
            }
            if (!ticks) {
                return;
            }
            var tick = ticks[0];
            for (var i = 0; i < tick_count; i++) {
                if (value >= ticks[i].value)
                    tick = ticks[i];
            }
            $labels.removeClass(activeClass);
            $labels.find("label.slider-tick-label").removeClass(activeClass);
            var $label = $labels.filter("." + tick.class);
            $label.addClass(activeClass);
        };
        $labels.find("label").on("click", function (e) {
            $slider.setValue(Number($(e.currentTarget).attr('data-tick-value')), true, true);
        });
        $slider.on("change", function (e) {
            onSliderValueChanged(e.newValue);
        });
        onSliderValueChanged(options.value);
        return $slider;
    }

    // API Methods

    exports.create_ticked_slider = create_ticked_slider;

});
