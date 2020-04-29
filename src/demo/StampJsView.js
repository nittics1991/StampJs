/**
*   StampJsView 画面ヘルパー
*
*/
let StampJsView =  {
    /**
    *   clearForm
    *
    *   @param string selector
    */
    clearForm:function(selector) {
        let inputs = [
            selector + ' input[type="text"]',
            selector + ' input[type="date"]',
            selector + ' input[type="number"]',
        ];
        
        inputs.forEach(function(selector) {
            let elms = document.querySelectorAll(selector);
            Array.prototype.forEach.call(elms, function(elm) {
                elm.value = '';
            });
        });
        
        let selects = document.querySelectorAll(
            selector + ' select option:first-child'
        );
        Array.prototype.forEach.call(selects, function(elm) {
            elm.selected = true;
        });
        
        let radios = document.querySelectorAll(
            selector + ' input[type="radio"]:default',
        );
        Array.prototype.forEach.call(radios, function(elm) {
            elm.checked = true;
        });
    },
    
     /**
    *   clearFormFor
    *
    *   @param string selector
    *   @param int no
    */
    clearFormFor:function(selector, no) {
        let inputs = [
            selector + ' input[type="text"][name$="[' + no + ']"]',
            selector + ' input[type="date"][name$="[' + no + ']"]',
            selector + ' input[type="number"][name$="[' + no + ']"]',
        ];
        
        inputs.forEach(function(selector) {
            let elms = document.querySelectorAll(selector);
            Array.prototype.forEach.call(elms, function(elm) {
                elm.value = '';
            });
        });
        
        let selects = document.querySelectorAll(
            selector + ' select[name$="[' + no + ']"] option:first-child'
        );
        Array.prototype.forEach.call(selects, function(elm) {
            elm.selected = true;
        });
        
        let radios = document.querySelectorAll(
            selector + ' input[type="radio"][name$="[' + no + ']"]:default',
        );
        Array.prototype.forEach.call(radios, function(elm) {
            elm.checked = true;
        });
    },
    
    /**
    *   clearImage
    *
    *   @param string selector
    */
    clearImage:function(selector) {
        let delete_target = document.querySelector(selector + ' .stamp_image');

        while(delete_target.firstChild){
          delete_target.removeChild(delete_target.firstChild);
        }     
    },
    
    /**
    *   formToData
    *
    *   @param string selector
    *   @return array data
    */
    formToData:function(selector) {
        let dataset = {
            stamp_select:'',
            frame:{},
            data:[{},{},{},{}]
        };
        
        let frame_inputs = document.querySelectorAll(
            selector + ' .setting_full input[type="number"]'
        );
        
        Array.prototype.forEach.call(frame_inputs, function(elm) {
            dataset.frame[elm.name] = parseInt(elm.value);
        });
            
        let frame_radios = document.querySelectorAll(
            selector + ' .setting_full input[type="radio"]:checked'
        );
        
        Array.prototype.forEach.call(frame_radios, function(elm) {
            let property = elm.name.replace(/\[\]/, '');
            dataset.frame[property] = elm.value;
        });
        
        let funcSetData = function(elm, val) {
            let property = elm.name.replace(/\[\d\]/, '');
            let positions = elm.name.match(/\[\d\]/);
            
            if (positions == null) return;
            
            let position = parseInt(
                positions[0].replace(/[\[\]]/g, '')
            ) - 1;
            
            dataset.data[position][property] = val;
       };
        
        let data_numbers = document.querySelectorAll(
            selector + ' .setting_parts input[type="number"]'
        );
        
        Array.prototype.forEach.call(data_numbers, function(elm) {
            funcSetData(elm, parseInt(elm.value));
        });
        
        let inputs = [
            selector + ' .setting_parts input[type="text"]',
            selector + ' .setting_parts input[type="date"]',
        ];
        
        inputs.forEach(function(selector) {
            let _funcSetData = funcSetData;
            
            let data_texts = document.querySelectorAll(selector);
            Array.prototype.forEach.call(data_texts, function(elm) {
                _funcSetData(elm, elm.value);
            });
        });
        
        let data_selects = document.querySelectorAll(
            selector + ' .setting_parts select'
        );
        
        Array.prototype.forEach.call(data_selects, function(elm) {
            funcSetData(elm, elm.value);
        });
        
        let stamp_select = document.querySelector(
            selector + ' select[name="stamp_select"]'
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
    *   dataToFrom
    *
    *   @param string selector
    *   @param object dataset
    */
    dataToFrom:function(selector, dataset) {
        let stamp_select = document.querySelector(
            selector + ' select'
        );
        stamp_select.value = dataset.stamp_select;
        
        StampJsView._frameToForm(selector, dataset);
        StampJsView._dataToForm(selector, dataset);
        return;
    },
    
    /**
    *   _frameToForm
    *
    *   @param string selector
    *   @param object dataset
    */
    _frameToForm:function(selector, dataset) {
        if (dataset.frame == null) return;
        
        Object.keys(dataset.frame).forEach(function(name) {
            let elm = document.querySelector(
                selector + ' [name="' + name + '"]'
            );
            
            if (elm != null) {
                elm.value = dataset.frame[name];
                return;
            }
            
            let elms = document.querySelectorAll(
                selector + ' [name="' + name + '[]"]'
            );
            
            if (elms.length == 0) return;
            
            let val = dataset.frame[name];
            
            Array.prototype.forEach.call(elms, function(elm) {
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
    *   @param string selector
    *   @param object dataset
    */
    _dataToForm:function(selector, dataset) {
        if (dataset.data == null ||
            ! Array.isArray(dataset.data)
        ) return;
        
        dataset.data.forEach(function(obj, index) {
            if (typeof obj != 'object') return;
            
            let data = dataset.data[index];
            
            Object.keys(obj).forEach(function(name) {
                let elm = document.querySelector(
                    selector + ' [name="' + name + '[' + (index + 1) + ']"]'
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
        let repository = new StampRepository('StampJsView');
        
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
        let repository = new StampRepository('StampJsView');
        
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
        let repository = new StampRepository('StampJsView');
        
        return repository.load(
            id + '_' + stamp_select
        );
    },
    
    /**
    *   download
    *
    *   @param string id
    *   @param string selector
    */
    download:function(id, selector) {
        let elms = document.querySelectorAll(
            selector + ' [name="stamp_select"] option'
        );
        
        let dataset = Array.prototype.map.call(elms, function(elm) {
            return window.localStorage.getItem(
                id + '_' + elm.value
            );
        }).filter(function(data) {
            return data != null;
        });
        StampFileDownloader.download(JSON.stringify(dataset), 'setting.json')
    },
    
    /**
    *   disableTo
    *
    *   @param string selector
    *   @param array columnNos
    */
    disableTo:function(selector, columnNos) {
        for (let i = 1; i <= 4; i++) {
            if (columnNos.includes(i)) {
                StampTableHelper.disableTableColumn(selector + ' .setting_parts', i+1);
                StampJsView.clearFormFor(selector, i);
                
            } else {
                StampTableHelper.enableTableColumn(selector + ' .setting_parts', i+1);
            }
        }
    },
    
    /**
    *   hiddenInStandard
    *
    *   @param string selector
    *   @param string stamp_select
    */
    hiddenInStandard:function(selector, stamp_select) {
        let hidden_targets = [
        'stamp_type[]',
        'stamp_color[]',
        'border_direction[]',
        'text_placement[]',
        'text_direction[]',
        'option_position[]',
        ];
        
        let inputs = document.querySelectorAll(
            selector + ' .setting_full input'
        );
        
        Array.prototype.forEach.call(inputs, function(elm) {
            if (hidden_targets.includes(elm.name)) {
                if (stamp_select == 'dateStamp' &&
                    elm.name == 'option_position[]'
                ) {
                    elm.style.visibility = 'visible';
                    elm.parentNode.style.visibility = 'visible';
                    return;
                }
                
                elm.style.visibility = 'hidden';
                elm.parentNode.style.visibility = 'hidden';
            }
        });
    },
    
    /**
    *   visibleInStandard
    *
    *   @param string selector
    *   @param string stamp_select
    */
    visibleInStandard:function(selector, stamp_select) {
        let hidden_targets = [
        'stamp_type[]',
        'stamp_color[]',
        'border_direction[]',
        'text_placement[]',
        'text_direction[]',
        'option_position[]',
        ];
        
        let inputs = document.querySelectorAll(
            selector + ' .setting_full input'
        );
        
        Array.prototype.forEach.call(inputs, function(elm) {
            if (hidden_targets.includes(elm.name)) {
                elm.style.visibility = 'visible';
                elm.parentNode.style.visibility = 'visible';
            }
        });
    },
    
};
