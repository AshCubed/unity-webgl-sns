mergeInto(LibraryManager.library, {

   zappar_sns_initialize: function(canvas, unityObject, onSavedFunc, onSharedFunc, onClosedFunc) {
       var canva = document.querySelector(UTF8ToString(canvas));
       if(typeof canva === 'undefined' || canva === null) {
           this.snsInitialized=false;
           console.log(UTF8ToString(canvas)+" not found in document");
           return false;
       }
       this.unityCanvas = canva;
       this.unitySNSObjectListener = UTF8ToString(unityObject);
       this.unitySNSOnSavedFunc = UTF8ToString(onSavedFunc);
       this.unitySNSOnSharedFunc = UTF8ToString(onSharedFunc);
       this.unitySNSOnClosedFunc = UTF8ToString(onClosedFunc);
       if (typeof ZapparSharing === 'undefined' || ZapparSharing === null) {
            var scr = document.createElement("script");
            scr.src="https://libs.zappar.com/zappar-sharing/1.1.3/zappar-sharing.min.js";
            scr.addEventListener('load', function() {
                console.log("Zappar-sharing version 1.1.3 added");
                window.snsInitialized = true;
            });
            document.body.appendChild(scr);
        }else{
            this.snsInitialized = true;
        }
        return true;
   },

   zappar_sns_is_initialized : function() {
       if(typeof this.snsInitialized === 'undefined') return false;
       return this.snsInitialized;
   },

   zappar_sns_jpg_snapshot : function(img, size) {
       if(typeof this.snsInitialized === 'undefined' || this.snsInitialized === false) return;
        //this.snapUrl = this.unityCanvas.toDataURL('image/jpeg',0.9);
        var binary = '';
        for (var i = 0; i < size; i++)
            binary += String.fromCharCode(HEAPU8[img + i]);
        this.snapUrl = 'data:image/jpeg;base64,' + btoa(binary);
   },

   zappar_sns_png_snapshot : function(img, size) {
       if(typeof this.snsInitialized === 'undefined' || this.snsInitialized === false) return;
        //this.snapUrl = this.unityCanvas.toDataURL('image/png',0.9);
        var binary = '';
        for (var i = 0; i < size; i++)
            binary += String.fromCharCode(HEAPU8[img + i]);
        this.snapUrl = 'data:image/png;base64,' + btoa(binary);
   },

   zappar_sns_open_snap_prompt : function() {
       if(typeof this.snsInitialized === 'undefined' || this.snsInitialized === false) return;
       ZapparSharing({
        data: this.snapUrl,
        onSave: () => {
            window.uarGameInstance.SendMessage(this.unitySNSObjectListener, this.unitySNSOnSavedFunc);
        },
        onShare: () => {
          window.uarGameInstance.SendMessage(this.unitySNSObjectListener, this.unitySNSOnSharedFunc);
        },
        onClose: () => {
          window.uarGameInstance.SendMessage(this.unitySNSObjectListener, this.unitySNSOnClosedFunc);
        },
       });
   },

   zappar_sns_open_video_prompt : function() {
       if(typeof this.snsInitialized === 'undefined' || this.snsInitialized === false) return;
       ZapparSharing({
        data: window.videoRecUrl,
        onSave: () => {
            window.uarGameInstance.SendMessage(this.unitySNSObjectListener, this.unitySNSOnSavedFunc);
        },
        onShare: () => {
          window.uarGameInstance.SendMessage(this.unitySNSObjectListener, this.unitySNSOnSharedFunc);
        },
        onClose: () => {
          window.uarGameInstance.SendMessage(this.unitySNSObjectListener, this.unitySNSOnClosedFunc);
        },
       });
   },
});