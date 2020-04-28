/**
*   Canvas変換
*
*/
let StampCanvasExchanger =  {
    /**
    *   canvas => png変換
    *
    *   @param string canvasSelector
    *   @return text dataUri
    */
    canvasToImage:function(canvasSelector) {
        let canvas = document.querySelector(canvasSelector);
        return canvas.toDataURL();
    },
    
    /**
    *   canvas要素=>img要素置換
    *
    *   @param string canvasSelector
    *   @return text dataUri
    */
    exchangeToImage:function(canvasSelector) {
        let canvas = document.querySelector(canvasSelector);
        let imgUri = StampCanvasExchanger.canvasToImage(canvasSelector);
        let html = '<img src="' + imgUri + '">';
        
        canvas.parentNode.insertAdjacentHTML('afterbegin', html);
        canvas.parentNode.removeChild(canvas);
    },
};
