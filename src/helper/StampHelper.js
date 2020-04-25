/**
*   ヘルパー
*
*/
let StampHelper =  {
    /**
    *   ファイルダウンロード
    *
    *   @param string content
    *   @param string fileName
    */
    downloadFile:function(content, fileName) {
        let blob = new Blob([content], {'type':'text/plain'})
        
        try {
            StampHelper._msDownload(blob, fileName);
        } catch (e) {
            StampHelper._downloadByAnchor(blob, fileName);
        }
    },
    
    /**
    *   ファイルダウンロード(IE)
    *
    *   @param Blob blob
    *   @param string fileName
    */
    _msDownload:function(blob, fileName) {
        window.navigator.msSaveBlob(blob, fileName); 
    },
    
    /**
    *   ファイルダウンロード(Anchor利用)
    *
    *   @param Blob blob
    *   @param string fileName
    */
    _downloadByAnchor:function(blob, fileName) {
        let anchor = document.createElement('a');
        anchor.href = window.URL.createObjectURL(blob);
        anchor.download = fileName;
        anchor.target = '_blank';
        anchor.click();
        
    },
    
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
        let imgUri = StampHelper.canvasToImage(canvasSelector);
        let html = '<img src="' + imgUri + '">';
        
        canvas.parentNode.insertAdjacentHTML('afterbegin', html);
        canvas.parentNode.removeChild(canvas);
    },
    
    /**
    *   テーブル行非表示
    *
    *   @param string selector
    *   @param int no
    */
    disableTableRow:function(selector, no) {
        document.querySelector(selector + ' > tbody > tr:nth-child(' + no + ')')
            .style.display = 'none';
    },
    
    /**
    *   テーブル行表示
    *
    *   @param string selector
    *   @param int no
    */
    enableTableRow:function(selector, no) {
        document.querySelector(selector + ' > tbody > tr:nth-child(' + no + ')')
            .style.display = 'table-row';
    },
    
    /**
    *   テーブル列非表示
    *
    *   @param string selector
    *   @param int no
    */
    disableTableColumn:function(selector, no) {
         let tds = document.querySelectorAll(
            selector + ' tr > td:nth-child(' + no + ')'
        );
        
        Array.prototype.forEach.call(tds, function(elm){
            elm.style.display = 'none';
        });
        
         let ths = document.querySelectorAll(
            selector + ' tr > th:nth-child(' + no + ')'
        );
        
        Array.prototype.forEach.call(ths, function(elm){
            elm.style.display = 'none';
        });
    },
    
    /**
    *   テーブル列表示
    *
    *   @param string selector
    *   @param int no
    */
    enableTableColumn:function(selector, no) {
        let tds = document.querySelectorAll(
            selector + ' tr > td:nth-child(' + no + ')'
        );
        
        Array.prototype.forEach.call(tds, function(elm){
            elm.style.display = 'table-cell';
        });
        
        let ths = document.querySelectorAll(
            selector + ' tr > th:nth-child(' + no + ')'
        );
        
        Array.prototype.forEach.call(ths, function(elm){
            elm.style.display = 'table-cell';
        });
    },
     
    
    
    
    
    
    
    
};
