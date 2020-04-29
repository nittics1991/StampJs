/**
*   ファイルダウンローダー
*
*/
let StampFileDownloader =  {
    /**
    *   ファイルダウンロード
    *
    *   @param string content
    *   @param string fileName
    */
    download:function(content, fileName) {
        let blob = new Blob([content], {'type':'text/plain'})
        
        try {
            StampFileDownloader._msDownload(blob, fileName);
        } catch (e) {
            StampFileDownloader._downloadByAnchor(blob, fileName);
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
};
