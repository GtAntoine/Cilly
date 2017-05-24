(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);