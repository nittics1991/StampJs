/**
*   StampTableHelper
*
*/
let StampTableHelper =  {
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
