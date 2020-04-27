/**
*   フィンガープリント
*
*   @param string selector
*/
let StampFingerPrint = function(selector) {
    this._selector = selector;
    this.font_size = 10;
    this.min_canvas_width = 20;
    this.min_text_length = 8;
    this.min_text_metrics_width = 8;
    this.cyepto_length = 16;
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
        text
    );
    ctx.fillText(write_text, x, y);
};

/**
*   文字長さ調整
*
*   @param object ctx
*   @param int canvas_width
*   @param string text
*   @return string
*/
StampFingerPrint.prototype._toAdjustText = function(ctx, canvas_width, text) {
    if (canvas_width < this.min_canvas_width)
        throw newError('invalid canvas width');
    if (text.length < this.min_text_length)
        throw newError('invalid text length');

    let text_metrics = ctx.measureText(text);

    if (text_metrics.width <= this.min_text_metrics_width)
        throw newError('invalid text width');

    if (text_metrics.width > canvas_width) {
        return this._toAdjustText(
            ctx,
            canvas_width,
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
*   @return string
*/
StampFingerPrint.prototype._save = function() {







};
