(function() {
    document.querySelector('#file_dialog [name="file_name"]')
        .addEventListener('change', function(e) {
        
        document.querySelector('#file_dialog')
            .style.display = "none";
        
        let reader = new FileReader();
        let files = e.target.files;
        reader.readAsText(files[0]);
        
        reader.addEventListener('load', function(e) {
            let dataset = JSON.parse(e.target.result);
            
            if (dataset == null ||
                typeof dataset != 'object'
            ) return;
            
            StampFingerPrintView.save('frame1', dataset);
            StampFingerPrintView.load('frame1', dataset.stamp_select);
        });
    });
})();
