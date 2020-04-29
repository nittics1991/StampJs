(function() {
    Array.prototype.forEach.call(
        document.querySelectorAll('.stamp_dialog button[name="close_button"]'),
        function(elm) {
            elm.addEventListener('click', function(e) {
                e.target.parentNode.parentNode.style.display = "none";
            });
        }
    );
})();
