(function() {
    document.querySelector('#file_dialog [name="file_name"]')
        .addEventListener('change', function(e) {
        
        document.querySelector('#file_dialog')
            .style.display = "none";
        
        let reader = new FileReader();
        let files = e.target.files;
        reader.readAsText(files[0]);
        
        reader.addEventListener('load', function(e) {
            let dataset = JSON.parse(e.result);
            
            if (dataset == null ||
                dataset == [] ||
                !Array.isArray(dataset)
            ) return;
            
            let selector = document.querySelector(
                '#file_dialog [name="id"]'
            ).value;
            
            dataset.forEach(function(json) {
                let data = JSON.parse(json)
                StampJsView.save('frame1', data);
            });
            
            StampJsView.clearForm('#frame1');
        });
    });
})();
