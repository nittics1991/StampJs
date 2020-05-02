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
                dataset == [] ||
                !Array.isArray(dataset)
            ) return;
            
            dataset.forEach(function(json) {
                let data = JSON.parse(json)
                StampFingerPrintView.save('frame1', data);
            });
            
            let stamp_select = document.querySelector(
                '#frame1 [name="stamp_select"]'
            ).value;
            
            let newdata = StampFingerPrintView.load('frame1', stamp_select);
            
            if (newdata == null) return;
            
            StampFingerPrintView.dataToFrom('#fram1', newdata);
        });
    });
})();
