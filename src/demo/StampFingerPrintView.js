/**
*   フィンガープリント 画面ヘルパー
*
*/
let StampFingerPrintView = {
    /**
    *   queryToForm
    *
    *   @param string selector
    */
    queryToForm:function(selector) {
    
        let url = new URL(window.location.href)
        let urlSearchParams = new URLSearchParams(url.search);
        
        if (!urlSearchParams.has('stamp_select'))
            throw new Error('not define stamp select');
        
        if (!urlSearchParams.has('stamp_name'))
            throw new Error('not define stamp stamp_name');
        
        document.querySelector(selector + ' [name="stamp_select"]').value = 
            urlSearchParams.get('stamp_select');
        
        document.querySelector(selector + ' [name="stamp_name"]').value = 
            urlSearchParams.get('stamp_name');
    },
    
    /**
    *   formToData
    *
    *   @param string selector
    *   @return object data
    */
    formToData:function(selector) {
        let inputs = document.querySelectorAll(
            selector + ' input'
        );
        
        let dataset = {};
        Array.prototype.forEach.call(inputs, function(elm) {
            dataset[elm.name] = elm.value;
        });
        
        return dataset;
    },
    
    /**
    *   dataToFrom
    *
    *   @param string selector
    *   @param object dataset
    */
    dataToFrom:function(selector, dataset) {
        Object.keys(dataset).forEach(function(name) {
            document.querySelector(
                selector + ' [name="' + name + '"]'
            ).value = dataset[name];
        });
    },
    
    /**
    *   save
    *
    *   @param string id
    *   @param string content
    */
    save:function(id, dataset) {
        let repository = new StampRepository('StampFingerPrintView');
        
        repository.save(
            id + '_' + dataset.stamp_select,
            dataset
        );
    },
    
    /**
    *   remove
    *
    *   @param string id
    *   @param string content
    */
    remove:function(id, dataset) {
        let repository = new StampRepository('StampFingerPrintView');
        
        repository.remove(
            id + '_' + dataset.stamp_select
        );
    },
    
    /**
    *   load
    *
    *   @param string id
    *   @param string stamp_select
    *   @return object
    */
    load:function(id, stamp_select) {
        let repository = new StampRepository('StampFingerPrintView');
        
        return repository.load(
            id + '_' + stamp_select
        );
    },
    
    /**
    *   download
    *
    *   @param string selector
    */
    download:function(selector) {
        let dataset = StampFingerPrintView.formToData(selector);
        StampFileDownloader.download(JSON.stringify(dataset), 'setting.json')
    },
};
