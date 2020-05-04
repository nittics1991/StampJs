# StampJs

印鑑イメージをCanvasで生成する

## 使用例

```HTML:inex.htm

<div id="stamp"></div>

<script src="main.js"></script>

```

```Javascript:main.js

var dataset = {
	frame:{
		stamp_type:'circle',        //種別 
		stamp_width:200,            //全体幅
		stamp_height:200,           //全体高
		line_weight:3,              //線幅
		stamp_color:'red',          //印影色
		border_direction:'H',       //仕切線方向
		text_placement:'V',         //文字方向
		text_direction:'H',         //文字配置方向
		option_position:'bottom',   //追加情報
	},
	data:[
		{   //1番
			stamp_text:'(営業1)M',    //表示文字
			font_family:'',         //フォント    
			font_size:30,           //サイズ
			text_align:'center',    //横配置
			vertical_align:'bottom',//縦配置
			margin_size:0,          //マージン
		},
		{   //2番
			stamp_text:moment().format('YYYY-MM-DD'),
			font_family:'',
			font_size:30,
			text_align:'center',
			vertical_align:'middle',
			margin_size:0,
		},
		{   //3番
			stamp_text:'青木 太郎',
			font_family:null,
			font_size:30,
			text_align:'center',
			vertical_align:'top',
			margin_size:5,
		},
		{   //4番 (追加情報ありの場合、追加情報データ)
			stamp_text:'代',
			font_family:null,
			font_size:30,
			text_align:'right',
			vertical_align:'bottom',
			margin_size:0,
		},
	],
};

let stampJs = new StampJs('#stamp', dataset);
stampJs.render();

```



frame.option_position<>'non'の場合、
data[]の最後の設定をoptionのデータとする
