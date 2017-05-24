'use strict';

app.record = kendo.observable({
    onShow: function() {},
    afterShow: function() {
        if (path == null || path === undefined || path == ''){
            $("#btnPlay").data("kendoMobileButton").enable(false);
            $("#btnUpl").data("kendoMobileButton").enable(false);
        }
         
    }
});
app.localization.registerView('record');

// START_CUSTOM_CODE_record
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
var path = '';

function captureVideo() {
    // capture callback
    var captureSuccess = function(mediaFiles) {
        path = mediaFiles[0].fullPath;

        //on rajoute la vidéo enregistrée dans une div cachée pour pouvoir la lire
        var v = "<video id='newRecord' class='hide' controls='controls'>";
            v += "<source src='" + path + "' type='video/mp4'>";
            v += "</video>";
            document.querySelector("#videoArea").innerHTML = v;

        //boutons état 2 Après enregistrement video
        $('#btnRec').removeClass('activeFull');   
        $('#btnRec').addClass('activeLight');
        $('#btnPlay').addClass('activeLight');
        $('#btnUpl').addClass('activeFull'); 
        $("#btnPlay").data("kendoMobileButton").enable(true);
        $("#btnUpl").data("kendoMobileButton").enable(true);
    };

    // capture error callback
    var captureError = function(error) {
        //navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };

    // start video capture
    navigator.device.capture.captureVideo(captureSuccess, captureError,  {limit:1, duration:7});
}

function playRecord() {
    var myVideo = document.getElementById("newRecord"); 
    if (myVideo.paused) 
        myVideo.play(); 
    else 
        myVideo.pause(); 
}

function uploadCilly() {
    //boutons état 1 état initial
    $('#btnRec').addClass('activeFull');   
    $('#btnRec').removeClass('activeLight');  
    $('#btnPlay').removeClass('activeLight');
    $('#btnUpl').removeClass('activeFull');

    //ajouter  un spinner sur recordZone pendant l'upload
    $("#loadingRecord").removeClass('hide');
    disableEnableAllButton(false);

    var win = function (r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        window.plugins.toast.showShortCenter('Video uploaded !', function(a){console.log('toast success: ' + a)});
        //navigator.notification.alert( "win" + r.response);
        path = '';
        changeMsg();
        $("#loadingRecord").addClass('hide');
        disableEnableAllButton(true);
    }

    var fail = function (error) {
        navigator.notification.alert(error.code);
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
        $("#loadingRecord").addClass('hide');
        disableEnableAllButton(true);
    }

    var fileURL = path;

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "video/mp4";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("https://goethals.fr/CillyWeb/php/uploadCillyMobile.php"), win, fail, options);
}

function changeMsg() {;
    //boutons état 1 état initial
    $('#btnRec').addClass('activeFull');   
    $('#btnRec').removeClass('activeLight');  
    $('#btnPlay').removeClass('activeLight');
    $('#btnUpl').removeClass('activeFull');

    $("#btnPlay").data("kendoMobileButton").enable(false);
    $("#btnUpl").data("kendoMobileButton").enable(false);

    //$("#loadingRecord").removeClass('hide');
}

function disableEnableAllButton(bool) {
    $("#btnRefresh").data("kendoMobileButton").enable(bool);
    $("#btnRec").data("kendoMobileButton").enable(bool);
    $("#btnPlay").data("kendoMobileButton").enable(bool);
    $("#btnUpl").data("kendoMobileButton").enable(bool);
}
