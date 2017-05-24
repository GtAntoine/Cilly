'use strict';

app.cilly = kendo.observable({
    onShow: function() {},
    afterShow: function() {
        createChart();
    }
});
app.localization.registerView('cilly');

// START_CUSTOM_CODE_cilly
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

function createChart() {
   
}
// END_CUSTOM_CODE_cilly