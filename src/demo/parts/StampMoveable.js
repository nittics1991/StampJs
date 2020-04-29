(function() {
    Array.prototype.forEach.call(
        document.querySelectorAll('.moveable'),
        function(elm) {
            elm.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData(
                    "text/plain",
                    '#' + elm.id
                );
                e.stopPropagation();
            });
        }
    );

    document.querySelector('body')
        .addEventListener('dragover', function(e) {
        
        e.preventDefault();
    });

    document.querySelector('body')
        .addEventListener('dragenter', function(e) {
        
        e.preventDefault();
    });

    document.querySelector('body')
        .addEventListener('drop', function(e) {
        
        e.preventDefault();
        e.stopPropagation();
        
        let target = document.querySelector(
            e.dataTransfer.getData('text/plain')
        );
        
        target.style.top = e.clientY + 'px';
        target.style.left = e.clientX + 'px';
    });
})();
