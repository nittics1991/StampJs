/**
*   フィンガープリント 履歴画面ヘルパー
*
*/
let StampFingerPrintHistory = {
    /**
    *   dataToFrom
    *
    *   @param string id
    *   @param string selector
    */
    render:function(id, selector) {
        let repository = new StampRepository('StampFingerPrint');
        
        let histories = repository.load(id);
        
        if (histories == null) return;
        
        histories.reverse();
        
        let elment_text = histories.reduce(function(prev, data) {
            return prev + '<tr><td>' + data + '</td></tr>\n';
        }, '');
        
        document.querySelector(selector)
            .insertAdjacentHTML('beforeend', elment_text);
    },
};
