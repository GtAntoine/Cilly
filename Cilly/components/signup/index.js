'use strict';

app.signup = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});
app.localization.registerView('signup');

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes


// fonction d'inscription
function _userSignup() {
    var FormData = require('form-data');
    var form = new FormData();
    form.append('username', 'vince');
    form.append('password', 'mdp');

    fetch("http://vps372084.ovh.net:8080/user/token", {
    method: "POST",
    headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body: form,
    })
    .then((response) => response.json())
    .then((responseData) => {
    this._onValueChange(STORAGE_KEY, responseData.id_token),
    Alert.alert(
        "Signup Success!",
        "Click the button to get a Chuck Norris quote!"
    )
    })
    .done();
}


function fbLogin(){
    var fbLoginSuccess = function (userData) {
        alert("UserInfo: " + JSON.stringify(userData));
    }

    facebookConnectPlugin.login(["public_profile"],
        fbLoginSuccess,
        function (error) { alert("" + error) }
    );
}