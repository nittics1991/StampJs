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
		stamp_type:'circle',        //種別 circle:rect
		stamp_width:200,            //全体幅 0〜
		stamp_height:200,           //全体高 0〜
		line_weight:3,              //線幅 1〜
		stamp_color:'red',          //印影色 css style
		border_direction:'H',       //仕切線方向 H:V
		text_placement:'V',         //文字方向 H:V
		text_direction:'H',         //文字配置方向 H:V
		option_position:'bottom',   //追加情報 non:top:bottom:left:loght
	},
	data:[
		{   //1番
			stamp_text:'(営業1)M',    //表示文字
			font_family:'',         //フォント
			font_size:30,           //サイズ
			text_align:'center',    //横配置 left:center:light
			vertical_align:'bottom',//縦配置 top:middle:bottom
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
		{   //4番 (option_position=non以外の場合、追加情報データ扱い)
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

## 標準パターン

- 日付印 dateStamp
- 認印 signetStamp
- 角印 squareStamp
- 会社印 companyStamp

```Javascript:main.js

let factory = new StampFactory();
let builder = factory.builder();

let stampJs = builder.dateStamp('#stamp', dataset);
//let stampJs = builder.signetStamp('#stamp', dataset);
//let stampJs = builder.squareStamp('#stamp', dataset);
//let stampJs = builder.companyStamp('#stamp', dataset);

stampJs.render();

```

##デモ

- demo/StampJsView.htm メイン画面
- demo/StampFingerPrint.htm 指紋管理画面

- Javascript内で定義したスタンプを初期表示
- 画面より設定値を入力・表示
- 標準パターンの選択
- 独自に5パターン追加する事が可能
- 設定値をlocalStorageに保存可能
- localStorageの設定値に対し、ファイルimport/export
- カレンダーダイアログで簡単日付文字入力(momentjsフォーマット指定)
- 印影に指紋挿入機能
- 指紋の履歴をlocalStorageに保存
- 指紋の設定もスタンプと同様に保存操作可能

##サンプル

sample/*.htm
