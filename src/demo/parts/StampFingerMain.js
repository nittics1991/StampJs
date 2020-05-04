
//load
window.addEventListener('load', function() {
    StampFingerPrintView.queryToForm('#frame1');
    
    StampFingerPrintHistory.render(
        'frame1',
        '#frame1 .finger_data tbody'
    );
    
    let stamp_select = document.querySelector(
        '#frame1 [name="stamp_select"]'
    );
    let data = StampFingerPrintView.load('frame1', stamp_select.value);
    
    if (data == null) return;
    StampFingerPrintView.dataToFrom('#frame1', data);
});


//button
document.querySelector('#frame1 button[name="save_button"]')
    .addEventListener('click', function(e) {
    
    if (!window.confirm('May I save ?')) return;
    let data = StampFingerPrintView.formToData('#frame1');
    StampFingerPrintView.save('frame1', data);
});

document.querySelector('#frame1 button[name="remove_button"]')
    .addEventListener('click', function(e) {
    
    if (!window.confirm('May I remove ?')) return;
    let data = StampFingerPrintView.formToData('#frame1');
    StampFingerPrintView.remove('frame1', data);
});

document.querySelector('#frame1 button[name="upload_button"]')
    .addEventListener('click', function(e) {
    
    document.querySelector('#file_dialog input[name="id"]')
        .value = '#frame1';
    
    document.querySelector('#file_dialog')
        .style.display = "block";
});

document.querySelector('#frame1 button[name="download_button')
    .addEventListener('click', function(e) {
    
    StampFingerPrintView.download('frame1');
});
