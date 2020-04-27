/**
*   フィンガープリント
*
*/
let StampFingerPrint =  {
    /**
    *   捺印
    *
    *   @param string selector
    *   @param int x
    *   @param int y
    *   @param string color
    */
    stamp:function(selector, x, y, color) {
        let text = StampFingerPrint._generateStampText();
        StampFingerPrint._save(text);
        StampFingerPrint.render(selector, x, y, color, text);
   },
    
    /**
    *   描画
    *
    *   @param string selector
    *   @param int x
    *   @param int y
    *   @param string color
    */
    render:function(selector, x, y, color, text) {
        let canvas = document.querySelector(selector + ' canvas');
        let ctx = canvas.getContext('2d');
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';        
        ctx.font = '10px "serif"';
        ctx.fillStyle = color != null? color:'#ffffff';
        
        let canvas_width = canvas.width;
        let write_text = StampFingerPrint._toAdjustText(
            ctx,
            canvas_width,
            text
        );
        ctx.fillText(write_text, x, y);
    },
    
    /**
    *   文字長さ調整
    *
    *   @param object ctx
    *   @param int canvas_width
    *   @param string text
    *   @return string
    */
    _toAdjustText:function(ctx, canvas_width, text) {
        if (canvas_width < 6) throw newError('invalid canvas width');
        if (text.length < 8) throw newError('invalid text length');
        
        let text_metrics = ctx.measureText(text);
        
        if (text_metrics.width <= 6) throw newError('invalid text width');
        
        if (text_metrics.width > (canvas_width * 0.9)) {
            return StampFingerPrint._toAdjustText(
                ctx,
                canvas_width,
                text.slice(1)
            );
        }
        return text;
    },
    
    /**
    *   捺印文字生成
    *
    *   @return string
    */
    _generateStampText:function() {
        let ar = new Uint8Array(8);
        crypto.getRandomValues(ar);
        
        let result = '';
        ar.forEach(function(num) {
            result += num.toString(16);
        });
        return (new Date()).toISOString() + '_' + result;
    },
    
    /**
    *   保存
    *
    *   @return string
    */
    _save:function() {
        
        
        
        
        
        
        
    },
};
