'use strict';

app.message = kendo.observable({
    onShow: function() {},
    afterShow: function() {
        activeSetMessageButton();
        $('#txtMsg').keyup(function(){
            activeSetMessageButton();
        });
    }
});
app.localization.registerView('message');

// START_CUSTOM_CODE_message
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// récupération de la liste des messages
var dataSourceMessage = new kendo.data.DataSource({
  transport: {
    read:  {
      url: "http://www.goethals.fr/CillyWeb/php/getMessageToRecord.php",
      dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
    }
  }
});

function initListView(e) {
    e.view.element.find("#listviewMessage").kendoMobileListView({
       template : "<p>#:data.message#</p>\
       <div class='right'><p class='msgDate'>#:data.dateMessage#</p></div>",
        /*template : "
            <p>#:data.message#</p> 
            # if (true) { # ... non-script content here ... # } #
            "
        */
        dataSource: dataSourceMessage
    });

}

function activeSetMessageButton() {
    var message = $("#txtMsg").val();
    if(message.length){
        $("#sendMessage").data("kendoMobileButton").enable(true);
        $("#sendMessage").addClass('activeFull');
    }
    else{
        $("#sendMessage").data("kendoMobileButton").enable(false);
        $("#sendMessage").removeClass('activeFull');
    }
}

function sendClick() {
    // On reprend le même id que dans le précédent chapitre
    var message = $("#txtMsg").val();
    setMessage(message);
    $("#txtMsg").val('');
}

function setMessage(message) {
    $.ajax({
        url : 'https://goethals.fr/CillyWeb/php/setMessage.php',
        type : 'POST', // Le type de la requête HTTP, ici devenu POST
        data : {
            message: message,
            idUser: "666"
        },
        dataType : 'html',
        success : function(code_html, statut){
            console.log('success');
        },

        error : function(resultat, statut, erreur){
            console.log('error');
        },
        complete : function(resultat, statut){
            console.log('complete');
            $("#txtMsg").val('');
            activeSetMessageButton();

            // ajoute automatiquement le message à l'ui
            dataSourceMessage.add({ message: message });

            scrollTo();
        }
    });
}

function scrollToBottom() {
    var scroller = app.scroller();
        var offset = scroller.height();
        if (offset == 0)
            offset = 100;
        scroller.scrollTo(0, scroller.scrollHeight() * -1 + offset);
  }

function scrollTo() {
    $("#scroller").data("kendoMobileScroller").animatedScrollTo(0, 0);
}
// END_CUSTOM_CODE_message

