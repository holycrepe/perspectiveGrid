
/* global define, Handlebars, isCordova  */
define(function(require, exports, module) {
    //noinspection NpmUsedModulesInstalled,JSUnusedLocalSymbols
    var bootstraptoggle = require("bootstraptoggle");

    function create_switch(selector, onText, onIcon, offText, offIcon, isChecked) {
        var options = {
            on:       '<i class="fa fa-'+onIcon+'"></i><span class="text">'+onText+'</span>',
            off:      '<i class="fa fa-'+offIcon+'"></i><span class="text">'+offText+'</span>',
            style:    'image-switch',
            onstyle:  'success',
            offstyle: 'danger',
            width:    150,
            height:   30
        };
        return $(selector)
            .bootstrapToggle(options)
            .bootstrapToggle(isChecked === true ? "on" : "off");
    }

    // API Methods
    exports.create_switch_button = create_switch;

});
