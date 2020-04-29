/**
*   テンプレートローダ
*
*/
let StampLoader = {
    load:function(url, selector) {
        fetch(url)
        .then(function(responce) {
            return responce.text();
        })
        .then(function(text) {
            document.querySelector(selector)
                .insertAdjacentHTML(text, 'beforeend');
        });
    },
};










