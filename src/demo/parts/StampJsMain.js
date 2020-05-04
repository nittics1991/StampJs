
var inidata = {
	stamp_select:'dateStamp',
	frame:{
		stamp_type:'circle',
		stamp_width:200,
		stamp_height:200,
		line_weight:3,
		stamp_color:'red',
		border_direction:'H',
		text_placement:'V',
		text_direction:'H',
		option_position:'bottom',
	},
	data:[
		{
			stamp_text:'(営業1)M',
			font_family:'',
			font_size:30,
			text_align:'center',
			vertical_align:'bottom',
			margin_size:0,
		},
		{
			stamp_text:moment().format('YYYY-MM-DD'),
			font_family:'',
			font_size:30,
			text_align:'center',
			vertical_align:'middle',
			margin_size:0,
		},
		{
			stamp_text:'青木 太郎',
			font_family:null,
			font_size:30,
			text_align:'center',
			vertical_align:'top',
			margin_size:5,
		},
		{
			stamp_text:'代',
			font_family:null,
			font_size:30,
			text_align:'right',
			vertical_align:'bottom',
			margin_size:0,
		},
	],
};

//load
window.addEventListener('load', function() {
    StampJsView.dataToFrom('#frame1', inidata);
    document.querySelector('#frame1 button[name="refresh_button"]').click();
    
    let date_format = document.querySelector(
        '#date_dialog [name="date_format"]'
    ).value;
    
    document.querySelector(
        '#date_dialog [name="date_input"]'
    ).value = moment().format(date_format);
});

//main button
document.querySelector('#frame1 button[name="refresh_button"]')
    .addEventListener('click', function(e) {
	
    StampJsView.clearImage('#frame1');
    
    let data = StampJsView.formToData('#frame1');
    let factory = new StampFactory();
	let builder = factory.builder();
	let stamp;
    
    switch (data.stamp_select) {
        case 'dateStamp':
            data.frame.stamp_height = data.frame.stamp_width;
            stamp = builder.dateStamp('#frame1 .stamp_image', data);
            break;
        case 'signetStamp':
            data.frame.stamp_height = data.frame.stamp_width;
            stamp = builder.signetStamp('#frame1 .stamp_image', data);
            break;
        case 'squareStamp':
            stamp = builder.squareStamp('#frame1 .stamp_image', data);
            break;
        case 'companyStamp':
            stamp = builder.companyStamp('#frame1 .stamp_image', data);
            break;
        case '':
            return;
        default:
            if (data.frame.stamp_type == 'circle') {
                data.frame.stamp_height = data.frame.stamp_width;
            }
            stamp = new StampJs('#frame1 .stamp_image', data);
            break;
    }
	stamp.render();
    
    if (document.querySelector(
        '#frame1 [name="finger_stamp"]:checked'
        ).value == 'true'
     ) {
        
        let config = StampFingerPrintView.load('frame1', data.stamp_select);
        let fingerPrint = new StampFingerPrint(
            '#frame1',
            'frame1',
            config.stamp_expire
        );
        
        fingerPrint.stamp(
            config.stamp_x,
            config.stamp_y,
            config.stamp_color
        );
    }
    
    let imgUri = StampCanvasExchanger.exchangeToImage('#frame1 canvas');
});

document.querySelector('#frame1 button[name="load_button"]')
    .addEventListener('click', function(e) {
    
    let select = document.querySelector(
        '#frame1 [name="stamp_select"]'
    );
    
    if (!window.confirm('May I load ?')) return;
    let data = StampJsView.load('frame1', select.value);
    
    if (data == null) return;
    
    StampJsView.dataToFrom('#frame1', data);
    document.querySelector('#frame1 button[name="refresh_button"]').click();
});

document.querySelector('#frame1 button[name="save_button"]')
    .addEventListener('click', function(e) {
    
    if (!window.confirm('May I save ?')) return;
    let data = StampJsView.formToData('#frame1');
    StampJsView.save('frame1', data);
});

document.querySelector('#frame1 button[name="remove_button"]')
    .addEventListener('click', function(e) {
    
    if (!window.confirm('May I remove ?')) return;
    let data = StampJsView.formToData('#frame1');
    StampJsView.remove('frame1', data);
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
    
    StampJsView.download('frame1', '#frame1');
});

document.querySelector('#frame1 button[name="date_button"]')
    .addEventListener('click', function(e) {
    
    document.querySelector('#date_dialog')
        .style.display = "block";
});

//clear button
document.querySelector('#frame1 button[name="clear1"]')
    .addEventListener('click', function(e) {
    
    StampJsView.clearFormFor('#frame1', 1);
});

document.querySelector('#frame1 button[name="clear2"]')
    .addEventListener('click', function(e) {
    
    StampJsView.clearFormFor('#frame1', 2);
});

document.querySelector('#frame1 button[name="clear3"]')
    .addEventListener('click', function(e) {
    
    StampJsView.clearFormFor('#frame1', 3);
});

document.querySelector('#frame1 button[name="clear4"]')
    .addEventListener('click', function(e) {
    
    StampJsView.clearFormFor('#frame1', 4);
});

//stamp_select
document.querySelector('#frame1 [name="stamp_select"]')
    .addEventListener('change', function(e) {
    
    switch (e.target.value) {
        case 'dateStamp':
            StampJsView.disableTo('#frame1', []);
            StampJsView.hiddenInStandard('#frame1', e.target.value);
            break;
        case 'signetStamp':
            StampJsView.disableTo('#frame1', [2,3,4]);
            StampJsView.hiddenInStandard('#frame1', e.target.value);
            break;
        case 'squareStamp':
        case 'companyStamp':
            StampJsView.disableTo('#frame1', [4]);
            StampJsView.hiddenInStandard('#frame1', e.target.value);
            break;
        default:
            StampJsView.disableTo('#frame1', []);
            StampJsView.visibleInStandard('#frame1', e.target.value);
            break;
    }
});

//finger button
document.querySelector('#frame1 button[name="finget_setting_button"]')
    .addEventListener('click', function(e) {
    
    let stamp_select = document.querySelector(
        '#frame1 [name="stamp_select"]'
    );
    
    window.open(
        'StampFingerPrint.htm?stamp_select=' + stamp_select.value
            + '&stamp_name='
            + stamp_select.options[stamp_select.selectedIndex].text
    );
});
