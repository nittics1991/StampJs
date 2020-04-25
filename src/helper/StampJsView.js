/**
*   StampJsView 画面ヘルパー
*
*/
let StampJsView =  {
    /**
    *   clearForm
    *
    *   @param string prefix
    */
    clearForm:function(prefix) {
        let inputs = [
            'input[type="text"][name^="' + prefix + '_"]',
            'input[type="date"][name^="' + prefix + '_"]',
            'input[type="number"][name^="' + prefix + '_"]',
        ];
        
        inputs.forEach(function(selector) {
            let elms = document.querySelectorAll(selector);
            Array.prototype.forEach.call(elms, function(elm) {
                elm.value = '';
            });
        });
        
        let selects = document.querySelectorAll(
            'select[name^="' + prefix + '_"] option:first-child'
        );
        Array.prototype.forEach.call(selects, function(elm) {
            elm.selected = true;
        });
        
        let radios = document.querySelectorAll(
            'input[type="radio"][name^="' + prefix + '_"]:default',
        );
        Array.prototype.forEach.call(radios, function(elm) {
            elm.checked = true;
        });
    },
    
     /**
    *   clearFormFor
    *
    *   @param string prefix
    *   @param int no
    */
    clearFormFor:function(prefix, no) {
        let inputs = [
            'input[type="text"][name^="' + prefix + '_"][name$="[' + no + ']"]',
            'input[type="date"][name^="' + prefix + '_"][name$="[' + no + ']"]',
            'input[type="number"][name^="' + prefix + '_"][name$="[' + no + ']"]',
        ];
        
        inputs.forEach(function(selector) {
            let elms = document.querySelectorAll(selector);
            Array.prototype.forEach.call(elms, function(elm) {
                elm.value = '';
            });
        });
        
        let selects = document.querySelectorAll(
            'select[name^="' + prefix + '_"][name$="[' + no + ']"] option:first-child'
        );
        Array.prototype.forEach.call(selects, function(elm) {
            elm.selected = true;
        });
        
        let radios = document.querySelectorAll(
            'input[type="radio"][name^="' + prefix + '_"][name$="[' + no + ']"]:default',
        );
        Array.prototype.forEach.call(radios, function(elm) {
            elm.checked = true;
        });
    },
    
    /**
    *   clearImage
    *
    *   @param string prefix
    */
    clearImage:function(prefix) {
        let delete_target = document.getElementById(prefix + '_stamp_image');

        while(delete_target.firstChild){
          delete_target.removeChild(delete_target.firstChild);
        }     
    },
    
    /**
    *   formToData
    *
    *   @param string prefix
    *   @return array data
    */
    formToData:function(prefix) {
        let dataset = {
            stamp_select:'',
            frame:{},
            data:[{},{},{},{}]
        };
        
        let frame_inputs = document.querySelectorAll(
            '.setting_full input[type="number"][name^="' + prefix + '_"]'
        );
        
        Array.prototype.forEach.call(frame_inputs, function(elm) {
            let property = elm.name.replace(prefix + '_', '');
            dataset.frame[property] = parseInt(elm.value);
        });
            
        let frame_radios = document.querySelectorAll(
            '.setting_full input[type="radio"][name^="' + prefix + '_"]:checked'
        );
        
        Array.prototype.forEach.call(frame_radios, function(elm) {
            let name = elm.name.replace(prefix + '_', '');
            let property = name.replace(/\[\]/, '');
            dataset.frame[property] = elm.value;
        });
        
        let funcSetData = function(elm, val) {
            let name = elm.name.replace(prefix + '_', '');
            let property = name.replace(/\[\d\]/, '');
            let positions = name.match(/\[\d\]/);
            
            if (positions == null) return;
            
            let position = parseInt(
                positions[0].replace(/[\[\]]/g, '')
            ) - 1;
            
            dataset.data[position][property] = val;
       };
        
        let data_numbers = document.querySelectorAll(
            '.setting_parts input[type="number"][name^="' + prefix + '_"]'
        );
        
        Array.prototype.forEach.call(data_numbers, function(elm) {
            funcSetData(elm, parseInt(elm.value));
        });
        
        let inputs = [
            '.setting_parts input[type="text"][name^="' + prefix + '_"]',
            '.setting_parts input[type="date"][name^="' + prefix + '_"]',
        ];
        
        inputs.forEach(function(selector) {
            let _funcSetData = funcSetData;
            
            let data_texts = document.querySelectorAll(selector);
            Array.prototype.forEach.call(data_texts, function(elm) {
                _funcSetData(elm, elm.value);
            });
        });
        
        let data_selects = document.querySelectorAll(
            '.setting_parts select[name^="' + prefix + '_"]'
        );
        
        Array.prototype.forEach.call(data_selects, function(elm) {
            funcSetData(elm, elm.value);
        });
        
        let stamp_select = document.querySelector(
            'select[name^="' + prefix + '_stamp_select"]'
        );
        
        dataset.stamp_select = stamp_select.value;
        
        for (let i = 0; i < dataset.data.length; i++) {
            if (!dataset.data[i].stamp_text) {
                for (let j = dataset.data.length; j > i; j--) {
                    dataset.data.pop();
                }
                break;
            }
        }
        
        return dataset;
    },
    
    /**
    *   renderData
    *
    *   @param string prefix
    *   @param object dataset
    *   @example <input type="text" name="frame1_stamp_width">
    *       render('frame1', data)
    */
    dataToFrom:function(prefix, dataset) {
        let stamp_select = document.querySelector(
            'select[name^="' + prefix + '_stamp_select"]'
        );
        stamp_select.value = dataset.stamp_select;
        
        StampJsView._frameToForm(prefix, dataset);
        StampJsView._dataToForm(prefix, dataset);
        return;
    },
    
    /**
    *   _frameToForm
    *
    *   @param string prefix
    *   @param object dataset
    */
    _frameToForm:function(prefix, dataset) {
        if (dataset.frame == null) return;
        
        Object.keys(dataset.frame).forEach((name) => {
            //テキスト要素
            let elm = document.querySelector(
                '[name="' + prefix + '_' + name + '"]'
            );
            
            if (elm != null) {
                elm.value = dataset.frame[name];
                return;
            }
            
            //選択要素
            let elms = document.querySelectorAll(
                '[name="' + prefix + '_' + name + '[]"]'
            );
            
            if (elms.length == 0) return;
            
            let val = dataset.frame[name];
            
            Array.prototype.forEach.call(elms, (elm) => {
                if (elm.value == val) {
                    switch (elm.type.toLowerCase()) {
                        case 'radio':
                            elm.checked = true;
                            break;
                        case 'select':
                            elm.value = val;
                            break;
                    }
                }
            });
        });
    },
    
    /**
    *   _dataToForm
    *
    *   @param string prefix
    *   @param object dataset
    */
    _dataToForm:function(prefix, dataset) {
        if (dataset.data == null ||
            ! Array.isArray(dataset.data)
        ) return;
        
        dataset.data.forEach((obj, index) => {
            if (typeof obj != 'object') return;
            
            let data = dataset.data[index];
            
            Object.keys(obj).forEach((name) => {
            
                //テキスト要素
                let elm = document.querySelector(
                    '[name="' + prefix + '_' + name + '[' + (index + 1) + ']"]'
                );
                
                if (elm == null) return;
                elm.value = data[name];
           });
        });
    },    
    
    /**
    *   save
    *
    *   @param string id
    *   @param string content
    */
    save:function(id, dataset) {
        window.localStorage.setItem(
            id + '_' + dataset.stamp_select,
            JSON.stringify(dataset)
        );
    },
    
    /**
    *   remove
    *
    *   @param string id
    *   @param string content
    */
    remove:function(id, dataset) {
        window.localStorage.removeItem(
            id + '_' + dataset.stamp_select
        );
    },
    
    /**
    *   load
    *
    *   @param string id
    *   @param string content
    *   @return object
    */
    load:function(id, dataset) {
        return window.localStorage.getItem(
            id + '_' + dataset.stamp_select
        );
    },
    
    /**
    *   disableTo
    *
    *   @param string prefix
    *   @param array columnNos
    */
    disableTo:function(prefix, columnNos) {
        
        for (let i = 1; i <= 4; i++) {
            if (columnNos.includes(i)) {
                StampHelper.disableTableColumn('.setting_parts', i+1);
                StampJsView.clearFormFor(prefix, i);
                
            } else {
                StampHelper.enableTableColumn('.setting_parts', i+1);
            }
        }
    },
    
    
};
