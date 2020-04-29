/**
*   フィンガープリント
*
*   @param string selector
*   @param string id
*/
let StampFingerPrint = function(selector, id) {
    this._selector = selector;
    this._id = id;
    
    this.font_size = 10;
    this.min_canvas_width = 20;
    this.min_text_length = 8;
    this.min_text_metrics_width = 8;
    this.cyepto_length = 16;
    this.storage_expire_minite = 60 * 1;
};

/**
*   捺印
*
*   @param int x
*   @param int y
*   @param string color
*/
StampFingerPrint.prototype.stamp = function(x, y, color) {
    let text = this._generateStampText();
    this._save(text);
    this._render(x, y, color, text);
}

/**
*   描画
*
*   @param int x
*   @param int y
*   @param string color
*   @param string text
*/
StampFingerPrint.prototype._render = function(x, y, color, text) {
    let canvas = document.querySelector(this._selector + ' canvas');
    let ctx = canvas.getContext('2d');
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = this.font_size + 'px "serif"';
    ctx.fillStyle = color != null? color:'#ffffff';

    let canvas_width = canvas.width;
    let write_text = this._toAdjustText(
        ctx,
        canvas_width,
        x,
        text
    );
    ctx.fillText(write_text, x, y);
};

/**
*   文字長さ調整
*
*   @param object ctx
*   @param int canvas_width
*   @param int x
*   @param string text
*   @return string
*/
StampFingerPrint.prototype._toAdjustText = function(
    ctx,
    canvas_width,
    x,
    text
) {
    let width = canvas_width - x;
    
    if (width < this.min_canvas_width)
        throw newError('invalid canvas width');
    if (text.length < this.min_text_length)
        throw newError('invalid text length');

    let text_metrics = ctx.measureText(text);

    if (text_metrics.width <= this.min_text_metrics_width)
        throw newError('invalid text width');

    if (text_metrics.width > width) {
        return this._toAdjustText(
            ctx,
            canvas_width,
            x,
            text.slice(1)
        );
    }
    return text;
};

/**
*   捺印文字生成
*
*   @return string
*/
StampFingerPrint.prototype._generateStampText = function() {
    let ar = new Uint8Array(8);
    crypto.getRandomValues(ar);

    let result = '';
    ar.forEach(function(num) {
        result += num.toString(this.cyepto_length);
    });
    return (new Date()).toISOString() + '_' + result;
};

/**
*   保存
*
*   @param string text
*/
StampFingerPrint.prototype._save = function(text) {
    let saved_data = window.localStorage.getItem(
        'StampFingerPrint_' + this._id
    );
    
    let new_data = [];
    
    if (!saved_data) {
        new_data.push(text);
    } else {
        let parsed_data = JSON.parse(saved_data);
        
        let _this = this;
        new_data = parsed_data.filter(function(val) {
            let splited = val.split('_');
            if (splited[0] == null) throw new Error('invalid date');
            
            let utc_time = (new Date(splited[0])).getTime();
            
            let limit_time = (new Date()).getTime()
                - _this.storage_expire_minite * 1000;
            
            return utc_time > limit_time;
        });
        
        new_data.push(text);
    }
    
    window.localStorage.setItem(
        'StampFingerPrint_' + this._id,
        JSON.stringify(new_data)
    );
};
