'use strict';

app.home = kendo.observable({
    onShow: function() {},
    afterShow: function() {
    }
});
app.localization.registerView('home');

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// récupération de la liste des cilly tendance  
var dataSource = new kendo.data.DataSource({
  transport: {
    read:  {
      url: "http://www.goethals.fr/CillyWeb/php/getListCillyTrend.php",
      dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
    }
  }
});

var template = kendo.template("\
    <div class='cillyMessage'>\
        <p>#= message #</p>\
       </div>\
    <img class='thumbnail hide' src='#= userPictureLink #'>\
    <div class='card-media hide'>\
        <video id='video#= idCilly #' width='100%' playsinline>\
            <source src='https://www.goethals.fr/CillyWeb/video/#= cillyVideoLink #' type='video/mp4'>\
            Your browser does not support HTML5 video.\
        </video>\
    </div>\
    <div id='cilly#= idCilly #' class='cillyInfo card-title has-avatar'>\
        <img class='card-avatar' src='#= userPictureLink #'>\
        <div id='userDate' class=''>\
            <p class='cillyUser'>#= userName #</p>\
            <p class='cillyDate'>#= cillyDate #</p>\
        </div>\
    </div>\
    <a  id='playCilly#= idCilly #' onclick='playPause(#= idCilly #)' data-role='button'' class='km-primary'' data-icon='play'></a>\
    </div>\
");


// affichage de la liste des cilly tendance  
function initListViewTrend(e) {
    e.view.element.find("#listviewCillyTrend").kendoMobileListView({
        template : template,
        dataSource: dataSource
    });

    //ajout badge
    /*var tabstrip = e.view.footer.find(".km-tabstrip").data("kendoMobileTabStrip");
        // Set the first tab badge value to 5
     tabstrip.badge(0, 5);*/
}

function playPause(idCilly) {
   //window.plugins.toast.showShortTop('Hello there!', function(a){console.log('toast success: ' + a)});
    var myVideo = document.getElementById("video" + idCilly); 

    if (myVideo.paused) 
        myVideo.play(); 
    else 
        myVideo.pause(); 
}


//var myScroll = new IScroll('#homeScreen');
