(function() {
    document.querySelector('#date_dialog button[name="exec_button"]')
        .addEventListener('click', function(e) {
        
        document.querySelector('#date_dialog')
            .style.display = "none";
        
        let date_input = document.querySelector(
            '#date_dialog [name="date_input"]'
        ).value;
        
        let date_format = document.querySelector(
            '#date_dialog [name="date_format"]'
        ).value;
        
        let date_target = document.querySelector(
            '#date_dialog [name="date_target"]:checked'
        ).value;
        
        let str = moment(date_input).format(date_format);
        
        document.querySelector(
            '#frame1 [name="stamp_text[' + date_target + ']"]'
        ).value = str;
    });
})();
