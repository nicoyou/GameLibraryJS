/*!/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
_/
_/			汎用ゲームライブラリ
_/			(C) 2021-2025 Nicoyou All Rights Reserved.
_/
_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/



// 型エイリアス
/** 整数型 */
type int = number;
/** 浮動小数点 */
type float = number;
/** キーコード */
type key_code_t = KEY_CODE | string;
/** ラジアン */
type angle_t = float;
/** json 等で使用できる 値 */
type value_t = number | string | boolean;



/** game_library のバージョン */
const GAME_LIBRARY_VERSION = "1.5.0";
/** キー入力の種類 */
const KEY_INPUT_MAX = 256;
/** Color オブジェクトにおける 3 原色の最大値 */
const COLOR_MAX = 0xFF;
/** Color オブジェクトにおける Hue の最大値 */
const HUE_MAX = 360;
/** デフォルトのフォント名 */
const DEFAULT_FONT_NAME = "sans-serif";
/** デフォルトのフォントサイズ */
const DEFAULT_FONT_SIZE = 16;
/** 文字列からカラータグとカラータグに囲まれた文字列を抜き出す正規表現 */
const TAG_PATTERN = /<#([\dA-Fa-f]{6})>(.*?)<\/>/g;
/** 複数行の文字を描画するときの行間 */
const TEXT_BREAK_MARGIN = 5;
/** テキストのアウトラインの太さ ( アウトラインを使用するときのデフォルト値 ) */
const DEFAULT_TEXT_OUTLINE_THICKNESS = 2;
/** テキストの影の太さ ( 影を使用するときのデフォルト値 ) */
const DEFAULT_TEXT_SHADOW_THICKNESS = 6;
/** 特定のフォントで文字を描画したときの高さを取得するための半角ダミー文字 */
const DUMMY_TEXT = "A";
/** 特定のフォントで文字を描画したときの高さを取得するための全角ダミー文字 */
const DUMMY_TEXT_FULL = "1Aあ";



/** キーボードのキーコード */
enum KEY_CODE {
	back_space = "Backspace",
	tab = "Tab",
	enter = "Enter",
	shift = "ShiftLeft",
	ctrl = "ControlLeft",
	alt = "AltLeft",
	esc = "Escape",
	space = "Space",
	left = "ArrowLeft",
	up = "ArrowUp",
	right = "ArrowRight",
	down = "ArrowDown",
	d0 = "Digit0",
	d1 = "Digit1",
	d2 = "Digit2",
	d3 = "Digit3",
	d4 = "Digit4",
	d5 = "Digit5",
	d6 = "Digit6",
	d7 = "Digit7",
	d8 = "Digit8",
	d9 = "Digit9",

	f1 = "F1",
	f2 = "F2",
	f3 = "F3",
	f4 = "F4",
	f5 = "F5",
	f6 = "F6",
	f7 = "F7",
	f8 = "F8",
	f9 = "F9",
	f10 = "F10",
	f11 = "F11",
	f12 = "F12",

	a = "KeyA",
	b = "KeyB",
	c = "KeyC",
	d = "KeyD",
	e = "KeyE",
	f = "KeyF",
	g = "KeyG",
	h = "KeyH",
	i = "KeyI",
	j = "KeyJ",
	k = "KeyK",
	l = "KeyL",
	m = "KeyM",
	n = "KeyN",
	o = "KeyO",
	p = "KeyP",
	q = "KeyQ",
	r = "KeyR",
	s = "KeyS",
	t = "KeyT",
	u = "KeyU",
	v = "KeyV",
	w = "KeyW",
	x = "KeyX",
	y = "KeyY",
	z = "KeyZ",
	/** グローバルカウンタ */
	count = "Count",
};
/** 図形の種類 */
enum SHAPE_TYPE {
	/** 不明な図形 */
	unknown,
	/** 点 */
	dot,
	/** 円 */
	circle,
	/** 正方形 */
	square,
	/** 矩形 */
	rectangle,
}
/** ClickableButton の状態 */
enum BUTTON_STATUS {
	/** デフォルト状態 */
	normal,
	/** 接触開始 */
	hover_start,
	/** 接触中 */
	hover,
	/** クリック開始 */
	click_start,
	/** クリック中 */
	click,
	/** クリック状態を終わる ( 決定 ) */
	enter,
	/** クリックしながらボタン外の範囲に離れる */
	click_leave,
}
/** 上下左右の 4 方向を表す */
enum DIRECTION {
	/** 上 */
	up = 0,
	/** 右 */
	right = 1,
	/** 下 */
	down = 2,
	/** 左 */
	left = 3,
	/** 方向の合計数 */
	length = 4,
	/** 不明な方向 */
	unknown = -1,
}



/** copy メソッドを持つクラスのインターフェース */
interface copyable_t<T> {
	/** インスタンスのコピーを取得する */
	copy(): T;
}
/** 各辺と中央で 9 つに分割された画像をすべて保持するインターフェース */
interface split9_images_t {
	/** 上の画像 */
	n: HTMLImageElement;
	/** 下の画像 */
	s: HTMLImageElement;
	/** 右の画像 */
	e: HTMLImageElement;
	/** 左の画像 */
	w: HTMLImageElement;
	/** 右上の画像 */
	ne: HTMLImageElement;
	/** 左上の画像 */
	nw: HTMLImageElement;
	/** 右下の画像 */
	se: HTMLImageElement;
	/** 左下の画像 */
	sw: HTMLImageElement;
	/** 中央の画像 */
	c: HTMLImageElement;
}



/** 2 次元の値を保持する */
class Vector2 {
	/** x 座標 */
	public x: number;
	/** y 座標 */
	public y: number;

	/**
	 * @class
	 * @param pos 座標
	 */
	constructor(pos: Vector2);
	/**
	 * @class
	 * @param x x 座標
	 * @param y y 座標
	 */
	constructor(x?: number, y?: number);
	/** @inheritdoc */
	constructor(x: number | Vector2 = 0, y: number = 0) {
		this.x = 0;
		this.y = 0;
		this.set(x, y);
	}
	/**
	 * 値を登録する
	 * @param x x 座標か Vector2 クラス
	 * @param y y 座標 ( x に Vector2 を渡した場合は空にする )
	 */
	public set(x: number | Vector2, y: number = 0): void {
		if (x instanceof Vector2) {
			this.x = x.x;
			this.y = x.y;
			return;
		}
		this.x = x;
		this.y = y;
	}
	/**
	 * コピーを取得する
	 * @returns クローンされたインスタンス
	 */
	public copy(): Vector2 {
		return new Vector2(this.x, this.y);
	}
	/**
	 * 現在の値の小数点以下を四捨五入する
	 * @returns 四捨五入されたインスタンス
	 */
	public round(): Vector2 {
		return new Vector2(Math.round(this.x), Math.round(this.y));
	}
	/**
	 * 現在の値の小数点以下を切り捨てる
	 * @returns 切り捨てられたインスタンス
	 */
	public floor(): Vector2 {
		return new Vector2(Math.floor(this.x), Math.floor(this.y));
	}
	/**
	 * 現在の値の小数点以下を切り上げる
	 * @returns 切り上げられたインスタンス
	 */
	public ceil(): Vector2 {
		return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
	}
	/**
	 * 指定された座標との距離を計算する
	 * @param other もう一つの座標
	 * @returns もう一方のベクトルとの距離
	 */
	public distance(other: Vector2): float {
		return Math.sqrt((other.x - this.x) * (other.x - this.x) + (other.y - this.y) * (other.y - this.y));
	}
	/**
	 * 指定された距離だけ移動させた座標を取得する
	 * @param angle 移動する方向
	 * @param length 移動する距離
	 * @returns 移動後の座標
	 */
	public advance(angle: angle_t, length: float): Vector2 {
		return new Vector2(this.x + Math.cos(angle) * length, this.y + Math.sin(angle) * length);
	}
	/**
	 * 座標を特定の方向に指定分だけ進める
	 * @param direction 方向
	 * @param length 直線に進める距離
	 * @returns 指定された方向にに指定された分だけ進めた座標
	 */
	public advance_direction(direction: DIRECTION, length: float): Vector2 {
		switch (direction) {
			case DIRECTION.up:
				return this.add_y(-length);
			case DIRECTION.down:
				return this.add_y(length);
			case DIRECTION.right:
				return this.add_x(length);
			case DIRECTION.left:
				return this.add_x(-length);
			default:
				throw new Error("未定義の direction です");
		}
		return this;
	}
	/**
	 * 原点を中心に、指定した角度だけ回転させた座標を取得する
	 * @param angle 回転する角度
	 * @returns 回転後の座標
	 */
	public rotate(angle: angle_t): Vector2 {
		const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
		const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
		return new Vector2(x, y);
	}
	/**
	 * 指定された座標との角度を計算する
	 * @param other もう一つの座標
	 * @returns 指定された座標との角度
	 */
	public angle(other: Vector2): float {
		return Math.atan2(other.y - this.y, other.x - this.x);
	}
	/**
	 * 指定された座標に指定された距離だけ近づけた座標を取得する
	 * @param other 目標とする座標
	 * @param length 移動できる最大の距離
	 * @returns 目標の座標に近づけた座標
	 */
	public approach(other: Vector2, length: float): Vector2 {
		const distance = this.distance(other);
		if (distance == 0) return other.copy();
		else if (distance > length) return this.advance(this.angle(other), length);
		else return this.advance(this.angle(other), distance);
	}
	/**
	 * 現在の値までの大きさの乱数を得る
	 * @returns x, y がそれぞれ 0 から現在の値までの間で生成された乱数
	 */
	public mul_rand(): Vector2 {
		return new Vector2(get_rand(this.x), get_rand(this.y));
	}
	/**
	 * 指定された座標との内分点を計算する
	 * @param other もう一つの座標
	 * @param t 割合を 0 ~ 1 の間で指定する
	 * @returns 内分点
	 */
	public subdivide(other: Vector2, t: float): Vector2 {
		return this.mul(1 - t).add(other.mul(t));
	}
	/**
	 * x だけ置き換えた座標を取得する
	 * @param x 置き換える x 座標
	 * @returns x だけを置き換えた座標
	 */
	public with_x(x: float): Vector2 {
		return new Vector2(x, this.y);
	}
	/**
	 * y だけ置き換えた座標を取得する
	 * @param y 置き換える y 座標
	 * @returns y だけを置き換えた座標
	 */
	public with_y(y: float): Vector2 {
		return new Vector2(this.x, y);
	}
	/**
	 * x に特定の値を加算した座標を取得する
	 * @param x 加算する x 座標
	 * @returns x に加算された座標
	 */
	public add_x(x: float): Vector2 {
		return this.add(new Vector2(x, 0));
	}
	/**
	 * y に特定の値を加算した座標を取得する
	 * @param y 加算する y 座標
	 * @returns y に加算された座標
	 */
	public add_y(y: float): Vector2 {
		return this.add(new Vector2(0, y));
	}
	/**
	 * 指定された時間で指定された座標に移動するアニメーションを設定する
	 * @param dest 目標の座標
	 * @param duration アニメーションの時間 ( 秒 )
	 */
	public tween_to(dest: Vector2, duration: float): void {
		game_library.tween_events.push(new TweenEventVector2(this, dest, duration));
	}
	/**
	 * ランダムな Vector2 を取得する
	 * @param max 乱数の最大値
	 * @param min 乱数の最小値
	 * @returns ランダムな Vector2
	 */
	public static random(max: float = 1, min: float = 0): Vector2 {
		return new Vector2(get_rand(max, min), get_rand(max, min));
	}
	/**
	 * 0 が中心となるランダムな Vector2 を取得する
	 * @param width_max 絶対値の最大値 ( 3 を指定した場合は -3 ~ 3 の乱数を得る )
	 * @param width_min 絶対値の最小値
	 * @returns 指定された範囲内の乱数
	 */
	public static random_w(width_max: float, width_min: float = 0): Vector2 {
		return new Vector2(get_rand_w(width_max, width_min), get_rand_w(width_max, width_min));
	}
	/** x, y のうち大きいほうの値を取得する */
	public get max(): float {
		return Math.max(this.x, this.y);
	}
	/** x, y のうち小さいほうの値を取得する */
	public get min(): float {
		return Math.min(this.x, this.y);
	}
	/** ベクトルの長さを取得する */
	public get length(): float {
		return Math.hypot(this.x, this.y);
	}

	// 演算子
	/**
	 * 加算
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns 計算結果
	 */
	public add(other: float | Vector2): Vector2 {
		return typeof other == "object" ? new Vector2(this.x + other.x, this.y + other.y) : this.add(new Vector2(other, other));
	}
	/**
	 * 減算
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns 計算結果
	 */
	public sub(other: float | Vector2): Vector2 {
		return typeof other == "object" ? new Vector2(this.x - other.x, this.y - other.y) : this.sub(new Vector2(other, other));
	}
	/**
	 * 乗算
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns 計算結果
	 */
	public mul(other: float | Vector2): Vector2 {
		return typeof other == "object" ? new Vector2(this.x * other.x, this.y * other.y) : this.mul(new Vector2(other, other));
	}
	/**
	 * 除算
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns 計算結果
	 */
	public div(other: float | Vector2): Vector2 {
		return typeof other == "object" ? new Vector2(this.x / other.x, this.y / other.y) : this.div(new Vector2(other, other));
	}
	/**
	 * 比較 ( == )
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns x, y が共に同じ値なら true
	 */
	public equals(other: float | Vector2): boolean {
		return typeof other == "object" ? (this.x == other.x && this.y == other.y) : this.equals(new Vector2(other, other));
	}
	/**
	 * 比較 ( != )
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns x, y のどちらかが異なる値なら true
	 */
	public not_equals(other: float | Vector2): boolean {
		return this.equals(other) == false;
	}
	/**
	 * 比較 ( < )
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns x, y が共に指定された値より小さければ true
	 */
	public less(other: float | Vector2): boolean {
		return typeof other == "object" ? (this.x < other.x && this.y < other.y) : this.less(new Vector2(other, other));
	}
	/**
	 * 比較 ( > )
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns x, y が共に指定された値より大きければ true
	 */
	public greater(other: float | Vector2): boolean {
		return typeof other == "object" ? (this.x > other.x && this.y > other.y) : this.greater(new Vector2(other, other));
	}

	/** x=0, y=0 のベクトルを取得する */
	public static get zero(): Vector2 {
		return new Vector2(0, 0);
	}
	/** x=1, y=1 のベクトルを取得する */
	public static get one(): Vector2 {
		return new Vector2(1, 1);
	}
	/** x=0, y=-1 のベクトルを取得する */
	public static get up(): Vector2 {
		return new Vector2(0, -1);
	}
	/** x=0, y=1 のベクトルを取得する */
	public static get down(): Vector2 {
		return new Vector2(0, 1);
	}
	/** x=1, y=0 のベクトルを取得する */
	public static get right(): Vector2 {
		return new Vector2(1, 0);
	}
	/** x=-1, y=0 のベクトルを取得する */
	public static get left(): Vector2 {
		return new Vector2(-1, 0);
	}
	/** x=0.5, y=0.5 のベクトルを取得する */
	public static get center(): Vector2 {
		return new Vector2(0.5, 0.5);
	}
	/** int で表せる最大座標 */
	public static get max_safe_integer(): Vector2 {
		return new Vector2(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
	}
}

/** 座標と角度を保持する */
class Transform2D {
	/** 座標 */
	public pos: Vector2;
	/** 角度 */
	public angle: angle_t;

	/**
	 * @class
	 * @param pos 座標
	 * @param angle 角度
	 */
	constructor(pos: Vector2 = Vector2.zero, angle: angle_t = 0) {
		this.pos = pos;
		this.angle = angle;
	}
}

/** シード値を設定して、実行結果を再現できる乱数生成クラス ( XorShift ) */
class Random {
	/** 乱数のもととなる内部値 */
	private x: int;
	/** 乱数のもととなる内部値 */
	private y: int;
	/** 乱数のもととなる内部値 */
	private z: int;
	/** 乱数のもととなる内部値 */
	private w: int;

	/**
	 * @class
	 * @param seed シード値
	 */
	constructor(seed: int = 0) {
		this.x = 123456789;
		this.y = 987654321;
		this.z = 555555555;
		this.w = seed;
	}
	/**
	 * 0 ~ 1 の乱数を取得して内部で保存している値を更新する
	 * @returns 0 ~ 1 の乱数
	 */
	private next(): float {
		const ACCURACY = 100000;		// 生成する乱数の精度 ( 小数点以下の単位 ) ※大きくしすぎると偏りが発生するため注意
		const t = this.x ^ (this.x << 11);
		this.x = this.y;
		this.y = this.z;
		this.z = this.w;
		this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
		return (Math.abs(this.w) % ACCURACY) / ACCURACY;
	}
	/**
	 * 乱数を取得する
	 * @param max 最大値
	 * @param min 最小値
	 * @returns 最大値から最小値までの乱数
	 */
	public get(max: float = 1, min: float = 0): float {
		if (max < min) {
			print_error_log("max より大きな min が指定されました [max=" + max + ", min=" + min + "]");
			const temp = max;
			max = min;
			min = temp;
		}
		return this.next() * (max - min) + min;
	}
	/**
	 * 0 が中心となる乱数を取得する
	 * @param width_max 絶対値の最大値 ( 3 を指定した場合は -3 ~ 3 の乱数を得る )
	 * @param width_min 絶対値の最小値
	 * @returns 指定された範囲内の乱数
	 */
	public get_w(width_max: float, width_min: float = 0): float {
		if (width_max < width_min) {
			print_error_log("width_max より大きな width_min が指定されました [width_max=" + width_max + ", width_min=" + width_min + "]");
			const temp = width_max;
			width_max = width_min;
			width_min = temp;
		}
		let width = this.get((width_max - width_min) * 2);
		width -= (width_max - width_min);
		return width >= 0 ? width + width_min : width - width_min;
	}
	/**
	 * 整数の乱数を取得する
	 * @param max 最大値
	 * @param min 最小値
	 * @returns ( min ～ max - 1 ) の乱数を取得する
	 */
	public get_int(max: int, min: int = 0): int {
		return Math.floor(this.get(max, min));
	}
	/**
	 * 0 が中心で整数の乱数を取得する
	 * @param width_max 絶対値の最大値 ( 3 を指定した場合は -3 ~ 3 の乱数を得る )
	 * @param width_min 絶対値の最小値
	 * @returns 指定された範囲内の乱数を取得するが、width_min を出力する確率はほとんど無い
	 */
	public get_int_w(width_max: int, width_min: int = 0): int {
		const n = this.get_w(width_max, width_min);
		if (n >= 0) return Math.ceil(n);
		return Math.floor(n);
	}
	/**
	 * boolean 型の乱数を取得する
	 * @param true_ratio 結果が true になる確率を 0 ~ 1 の間で指定する ( デフォルトは 50% )
	 * @returns true か false
	 */
	public get_bool(true_ratio: float = 0.5): boolean {
		if (true_ratio <= 0) return false;
		if (true_ratio >= 1) return true;
		return this.get(1) <= true_ratio;
	}
	/**
	 * 配列の中からランダムに要素を取得する
	 * @param array 配列
	 * @returns 配列の中からランダムに選ばれた要素
	 */
	public choice<T>(array: T[]): T {
		return array[this.get_int(array.length)];
	}
	/**
	 * 各選択肢の選ばれる割合を指定して、選択肢を取得する
	 * @param ratio_list 各選択肢の選ばれる割合を指定する
	 * @returns 選択された選択肢の index
	 */
	public random_choice_ratio_index(ratio_list: float[]): int {
		let rand = this.get(ratio_list.sum());
		for (const [i, ratio] of ratio_list.entries()) {
			if (rand < ratio) return i;
			rand -= ratio;
		}
		return ratio_list.length - 1;
	}
}

/** 上下左右の 4 つの方向を保持するクラス */
class Direction {
	/** 保持している方向 */
	public value: DIRECTION;

	/**
	 * @class
	 * @param direction 方向
	 */
	constructor(direction: int = DIRECTION.unknown) {
		this.value = direction;
	}
	/**
	 * 右周りにに指定数分だけ方向転換する
	 * @param rotation_count 90° 回転する回数
	 * @returns 指定回数だけ回転した後の角度
	 */
	public right_rotate(rotation_count: int = 1): Direction {
		if (this.value == DIRECTION.unknown) return new Direction();

		let new_direction = this.value + rotation_count;			// 引き数の数だけ回転させる
		new_direction %= 4;
		if (new_direction < 0) new_direction += 4;
		return new Direction(new_direction);
	}
	/**
	 * 左周りにに指定数分だけ方向転換する
	 * @param rotation_count 90° 回転する回数
	 * @returns 指定回数だけ回転した後の角度
	 */
	public left_rotate(rotation_count: int = 1): Direction {
		return this.right_rotate(-rotation_count);
	}
	/** ラジアン */
	public get angle(): angle_t {
		switch (this.value) {
			case DIRECTION.right:
				return 0;
			case DIRECTION.down:
				return Math.PI * 0.5;
			case DIRECTION.left:
				return Math.PI;
			case DIRECTION.up:
				return Math.PI * 1.5;
		}
		return 0;
	}
}

/** 色を保存するクラス */
class Color {
	/** 赤色の含有量 0 ~ COLOR_MAX */
	public r: float;
	/** 緑色の含有量 0 ~ COLOR_MAX */
	public g: float;
	/** 青色の含有量 0 ~ COLOR_MAX */
	public b: float;
	/** 不透明度 0 ~ 1 */
	public opacity: float;

	/**
	 * @class
	 * @param r 赤色の含有量
	 * @param g 緑色の含有量
	 * @param b 青色の含有量
	 * @param opacity 不透明度
	 */
	constructor(r: float, g: float, b: float, opacity?: float);
	/**
	 * @class
	 * @param color 色 ( "#ffffff" のような文字列や Color インスタンス等を指定できる )
	 */
	constructor(color?: float | Color | string);
	/** @inheritdoc */
	constructor(r?: float | string | Color, g?: float, b?: float, opacity: float = 1) {
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.opacity = 1;
		if (r !== undefined) this.set(r, g, b, opacity);
	}
	/**
	 * コピーを取得する
	 * @returns クローンされたインスタンス
	 */
	public copy(): Color {
		return new Color(this.r, this.g, this.b, this.opacity);
	}
	/**
	 * 色を指定して初期化する
	 * @param r 赤色の含有量 ( "#ffffff" のような文字列や Color インスタンス等を指定して g, b に null を渡しても初期化できる )
	 * @param g 緑色の含有量
	 * @param b 青色の含有量
	 * @param opacity 不透明度
	 * @returns 自身のインスタンス
	 */
	public set(r: float | string | Color, g?: float, b?: float, opacity: float = 1): Color {
		if (g === undefined && b === undefined) {
			if (r === undefined) {
				return this.set_scalar(0);
			}
			else if (typeof r == "string") {
				return this.set_style(r);
			}
			else if (typeof r == "number") {
				this.hex = r;
				return this;
			}
			else if (r instanceof Color) {
				return this.set_rgba(r.r, r.g, r.b, r.opacity);
			}
			else {
				throw new TypeError("引数エラー");
			}
		}
		if (typeof r == "number" && typeof g == "number" && typeof b == "number") {
			return this.set_rgba(r, g, b, opacity);
		}
		else {
			print_error_log("引数エラー");
			return this;
		}
	}
	/**
	 * RGBA 値を指定して色を設定する
	 * @param r 赤色の含有量
	 * @param g 緑色の含有量
	 * @param b 青色の含有量
	 * @param opacity 不透明度
	 * @returns 自身のインスタンス
	 */
	public set_rgba(r: float, g: float, b: float, opacity: float | null): Color {
		this.r = r;
		this.g = g;
		this.b = b;
		if (opacity !== null) this.opacity = opacity;
		return this;
	}
	/**
	 * HLS 色空間を指定して色を設定する
	 * @param h 色相
	 * @param s 彩度
	 * @param l 輝度
	 * @returns 自身のインスタンス
	 */
	public set_hsl(h: float, s: float, l: float): Color {
		h = Math.clamp_loop(h / HUE_MAX, 1);
		s = Math.clamp_zero_to_one(s);
		l = Math.clamp_zero_to_one(l);

		if (s == 0) {
			this.r = this.g = this.b = Math.round(l * COLOR_MAX);
		}
		else {
			const hue_to_rgb = (t: float, s: float, l: float): float => {
				const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
				const p = 2 * l - q;

				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p + (q - p) * 6 * t;
				if (t < 1 / 2) return q;
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			};

			this.r = Math.round(hue_to_rgb(h + 1 / 3, s, l) * COLOR_MAX);
			this.g = Math.round(hue_to_rgb(h, s, l) * COLOR_MAX);
			this.b = Math.round(hue_to_rgb(h - 1 / 3, s, l) * COLOR_MAX);
		}
		return this;
	}
	/**
	 * 一つの値をで r, g, b を設定する
	 * @param scalar 0 ~ COLOR_MAX の値
	 * @returns 指定された値を r, g, b に代入した自身のインスタンス
	 */
	public set_scalar(scalar: float): Color {
		this.r = scalar;
		this.g = scalar;
		this.b = scalar;
		return this;
	}
	/**
	 * 色を文字列で初期化する
	 * 対応している形式▽
	 * rgb(255, 0, 0) rgba(255, 0, 0, 0.5)
	 * rgb(100%, 0%, 0%) rgba(100%, 0%, 0%, 0.5)
	 * hsl(120, 50, 50) hsla(120, 50, 50, 0.5)
	 * hsl(120, 50%, 50%) hsla(120, 50%, 50%, 0.5)
	 * #ff0 #ff0000
	 * @param style 特定の色を表す文字列
	 * @returns 指定された色で初期化された自身のインスタンス
	 */
	public set_style(style: string): Color {
		let m = /^((?:rgb|hsl)a?)\(([^)]*)\)/.exec(style);
		if (m) {
			let color;
			const name = m[1];
			const components = m[2];

			switch (name) {
				case "rgb":
				case "rgba":
					color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components);
					if (color) {		// rgb(255, 0, 0) rgba(255, 0, 0, 0.5)
						this.r = Math.min(COLOR_MAX, Number.parseInt(color[1], 10));
						this.g = Math.min(COLOR_MAX, Number.parseInt(color[2], 10));
						this.b = Math.min(COLOR_MAX, Number.parseInt(color[3], 10));
						if (color[4] !== undefined) this.opacity = Math.clamp_zero_to_one(Number.parseFloat(color[4]));
						return this;
					}
					color = /^\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components);
					if (color) {		// rgb(100%, 0%, 0%) rgba(100%, 0%, 0%, 0.5)
						this.r = Math.min(COLOR_MAX, Math.round((Number.parseInt(color[1], 10) / 100) * COLOR_MAX));
						this.g = Math.min(COLOR_MAX, Math.round((Number.parseInt(color[2], 10) / 100) * COLOR_MAX));
						this.b = Math.min(COLOR_MAX, Math.round((Number.parseInt(color[3], 10) / 100) * COLOR_MAX));
						if (color[4] !== undefined) this.opacity = Math.clamp_zero_to_one(Number.parseFloat(color[4]));
						return this;
					}
					break;

				case "hsl":
				case "hsla":
					color = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components);
					if (color) {		// hsl(120, 50, 50) hsla(120, 50, 50, 0.5)
						const h = Number.parseFloat(color[1]);
						const s = Number.parseFloat(color[2]) / 100;
						const l = Number.parseFloat(color[3]) / 100;
						if (color[4] !== undefined) this.opacity = Math.clamp_zero_to_one(Number.parseFloat(color[4]));
						return this.set_hsl(h, s, l);
					}
					color = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)%\s*,\s*(\d*\.?\d+)%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components);
					if (color) {		// hsl(120, 50%, 50%) hsla(120, 50%, 50%, 0.5)
						const h = Number.parseFloat(color[1]);
						const s = Number.parseFloat(color[2]) / 100;
						const l = Number.parseFloat(color[3]) / 100;
						if (color[4] !== undefined) this.opacity = Math.clamp_zero_to_one(Number.parseFloat(color[4]));
						return this.set_hsl(h, s, l);
					}
					break;
			}
		}
		else if (m = /^#([\dA-Fa-f]+)$/.exec(style)) {		// eslint-disable-line no-cond-assign
			const hex = m[1];
			const size = hex.length;
			if (size === 3) {				// #ff0
				this.r = Number.parseInt(hex.charAt(0) + hex.charAt(0), 16);
				this.g = Number.parseInt(hex.charAt(1) + hex.charAt(1), 16);
				this.b = Number.parseInt(hex.charAt(2) + hex.charAt(2), 16);
				return this;
			}
			else if (size === 6) {		// #ff0000
				this.r = Number.parseInt(hex.charAt(0) + hex.charAt(1), 16);
				this.g = Number.parseInt(hex.charAt(2) + hex.charAt(3), 16);
				this.b = Number.parseInt(hex.charAt(4) + hex.charAt(5), 16);
				return this;
			}
		}
		return this;
	}
	/**
	 * R だけを変更した Color を取得する
	 * @param r 赤色の含有量
	 * @returns 赤色の含有量だけを変更した Color インスタンス
	 */
	public with_r(r: float): Color {
		let color = this.copy();
		color.opacity = r;
		return color;
	}
	/**
	 * G だけを変更した Color を取得する
	 * @param g 緑色の含有量
	 * @returns 緑色の含有量だけを変更した Color インスタンス
	 */
	public with_g(g: float): Color {
		let color = this.copy();
		color.opacity = g;
		return color;
	}
	/**
	 * B だけを変更した Color を取得する
	 * @param b 青色の含有量
	 * @returns 青色の含有量だけを変更した Color インスタンス
	 */
	public with_b(b: float): Color {
		let color = this.copy();
		color.opacity = b;
		return color;
	}
	/**
	 * 不透明度だけを変更した Color を取得する
	 * @param opacity 不透明度 ( 0 ~ 1 )
	 * @returns 不透明度だけを変更した Color インスタンス
	 */
	public with_opacity(opacity: float): Color {
		let color = this.copy();
		color.opacity = opacity;
		return color;
	}
	/**
	 * 0 ~ 255 の数字を 16 進数の文字列に変換する
	 * @param color_value 0 ~ 255 の整数
	 * @returns 16 進数に変換された 2 文字の文字列
	 */
	public one_color_to_hex(color_value: float): string {
		const hexadecimal = Math.floor(color_value).toString(16);
		return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
	}
	/**
	 * 現在の色を 16 進数のカラーコードに変換する
	 * @returns 16 進数のカラーコードに変換した文字列
	 */
	public to_str_hex(): string {
		return `#${this.one_color_to_hex(this.r)}${this.one_color_to_hex(this.g)}${this.one_color_to_hex(this.b)}`;
	}
	/**
	 * 現在の色を rgb(50, 100, 150) 形式の文字列に変換して取得する
	 * @returns rgb(50, 100, 150) 形式の文字列
	 */
	public to_str_rgb(): string {
		return `rgb(${this.r}, ${this.g}, ${this.b})`;
	}
	/**
	 * 現在の色を rgba(50, 100, 150, 0.5) 形式の文字列に変換して取得する
	 * @returns rgba(50, 100, 150, 0.5) 形式の文字列
	 */
	public to_str_rgba(): string {
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`;
	}
	/**
	 * 現在の色を一般的に色を表す文字列に変換する
	 * @returns 16 進数のカラーコードに変換した文字列
	 */
	public to_str(): string {
		return this.to_str_hex();
	}
	/**
	 * 指定された色に近づけた色を取得する
	 * @param target_color 目標とする色
	 * @param max_adjustment_color_value 各色の要素を目標の色に近づける最大値
	 * @returns 現在の色を目標の色に指定された分だけ近づけた色
	 */
	public approach(target_color: Color, max_adjustment_color_value: float): Color {
		return new Color(
			approach_num(this.r, target_color.r, max_adjustment_color_value),
			approach_num(this.g, target_color.g, max_adjustment_color_value),
			approach_num(this.b, target_color.b, max_adjustment_color_value),
			approach_num(this.opacity, target_color.opacity, max_adjustment_color_value / COLOR_MAX),
		);
	}
	/**
	 * 一つの値を色がとりえる範囲内の値に正規化する
	 * @param color_value 色の要素の値
	 * @returns 0 ~ COLOR_MAX の間で正規化する
	 */
	public normalize_color_value(color_value: float): float {
		return Math.clamp(color_value, 0, COLOR_MAX);
	}
	/**
	 * 現在の値をとりえる範囲内の値に正規化する
	 * @returns r, g, b, a の全ての値を本来とりえる範囲内の値に正規化する
	 */
	public normalize(): Color {
		return new Color(this.normalize_color_value(this.r), this.normalize_color_value(this.g), this.normalize_color_value(this.b), Math.clamp_zero_to_one(this.opacity));
	}
	/**
	 * 色が完全に同じかどうかを比較する
	 * @param other 比較対象の色
	 * @returns 完全に同じ色の場合は true
	 */
	public equals(other: Color): boolean {
		return (this.equal_rgb(other) && this.opacity == other.opacity);
	}
	/**
	 * RGB 値だけが完全に同じかどうかを比較する
	 * @param other 比較対象の色
	 * @returns RGB 値だけが完全に同じ場合は true
	 */
	public equal_rgb(other: Color): boolean {
		return (this.r == other.r && this.g == other.g && this.b == other.b);
	}
	/**
	 * 似た色かどうかを比較する ( 不透明度は考慮しない )
	 * @param other 比較対象の色
	 * @param tolerance 同じ色とみなす誤差の閾値
	 * @returns 似た色なら true
	 */
	public nearly_equals(other: Color, tolerance: float = COLOR_MAX * 0.1): boolean {
		return this.equal_rgb(other.approach(this, tolerance));
	}
	/**
	 * 現在の色に特定の色かスカラーを加算した色を取得する
	 * @param other 加算する色か、数値 ( 数値を指定した場合は r, g, b それぞれに数値を加算する )
	 * @returns 指定されたかスカラーを加算した色
	 */
	public add(other: Color | float): Color {
		return other instanceof Color
			? new Color(this.r + other.r, this.g + other.g, this.b + other.b, this.opacity).normalize()
			: new Color(this.r + other, this.g + other, this.b + other, this.opacity).normalize();
	}
	/**
	 * 現在の色に特定の色かスカラーを減算した色を取得する
	 * @param other 減算する色か、数値 ( 数値を指定した場合は r, g, b それぞれの数値から減算する )
	 * @returns 指定された色かスカラーを減算した色
	 */
	public sub(other: Color | float): Color {
		return other instanceof Color
			? new Color(this.r - other.r, this.g - other.g, this.b - other.b, this.opacity).normalize()
			: new Color(this.r - other, this.g - other, this.b - other, this.opacity).normalize();
	}
	/**
	 * 現在の色に特定のスカラーを乗算した色を取得する
	 * @param other 乗算する数値
	 * @returns 指定された数値を乗算した色
	 */
	public mul(other: float): Color {
		return new Color(this.r * other, this.g * other, this.b * other, this.opacity).normalize();
	}
	/**
	 * 現在の色に特定のスカラーを除算した色を取得する
	 * @param other 除算する数値
	 * @returns 指定された数値を除算した色
	 */
	public div(other: float): Color {
		return new Color(this.r / other, this.g / other, this.b / other, this.opacity).normalize();
	}
	/**
	 * 複数の色を混ぜ合わせる
	 * @param others 混ぜ合わせる色を指定する ( 可変長引数 )
	 * @returns 指定された色を全て混ぜ合わせた色
	 */
	public merge(...others: float[] | string[] | Color[]): Color {
		let r = this.r;
		let g = this.g;
		let b = this.b;
		let a = this.opacity;
		for (const other of others) {
			const temp = new Color(other);
			r += temp.r;
			g += temp.g;
			b += temp.b;
			a += temp.opacity;
		}
		return new Color(Math.floor(r / (others.length + 1)), Math.floor(g / (others.length + 1)), Math.floor(b / (others.length + 1)), Math.floor(a / (others.length + 1)));
	}
	/**
	 * 指定された時間で指定された色に変化するアニメーションを設定する
	 * @param dest 目標とする色
	 * @param duration アニメーションの時間 ( 秒 )
	 */
	public tween_to(dest: Color, duration: float): void {
		game_library.tween_events.push(new TweenEventColor(this, dest, duration));
	}
	/**
	 * ランダムな色を取得する ( 不透明度は 1 固定 )
	 * @returns ランダムな色
	 */
	public static get random(): Color {
		return new Color(get_rand_int(COLOR_MAX), get_rand_int(COLOR_MAX), get_rand_int(COLOR_MAX), 1);
	}
	/**
	 * ランダムで綺麗な色を取得する
	 * @returns 特定のあまりきれいではない色を排除したランダムな色を取得する
	 */
	public static get random_bright(): Color {
		const MOVE_VALUE = 25;
		let co = new Array(3);
		let max_value = 0;
		let max_i = 0;
		let sum_value = 0;
		for (let i = 0; i < co.length; i++) {
			co[i] = get_rand_int(COLOR_MAX);		// ランダムで値を設定する

			if (max_value < co[i]) {				// 最大値を保存する
				max_value = co[i];
				max_i = i;
			}
		}

		for (let i = 0; i < co.length; i++) {
			if (i != max_i) {							// 最大でなければ
				if (co[i] >= MOVE_VALUE) {				// 移動値より多く持ってたら
					co[i] -= MOVE_VALUE;
					sum_value += MOVE_VALUE;
				}
				else {									// 移動値より小さければすべて移す
					sum_value += co[i];
					co[i] = 0;
				}
			}
		}
		co[max_i] += sum_value;

		if (co[max_i] > COLOR_MAX) {							// 溢れたら
			for (let i = 0; i < co.length; i++) {
				if (i != max_i) {								// 最大でなければ
					co[i] += (co[max_i] - COLOR_MAX) / 2;		// 余りを返す
				}
			}

			co[max_i] = COLOR_MAX;								// ちょうど最大にする
		}

		return new Color(co[0], co[1], co[2], 1);
	}
	/** 色を表す 16 進数 */
	public get hex(): int {
		return (Math.floor(this.r) << 16) + (Math.floor(this.g) << 8) + Math.floor(this.b);
	}
	public set hex(hex: int) {
		hex = Math.floor(hex);
		this.r = (hex >> 16 & COLOR_MAX);
		this.g = (hex >> 8 & COLOR_MAX);
		this.b = (hex & COLOR_MAX);
	}
	/** HLS 色空間の H を取得する */
	public get h(): float {
		const r = this.r / COLOR_MAX;
		const g = this.g / COLOR_MAX;
		const b = this.b / COLOR_MAX;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const diff = max - min;

		switch (min) {
			case max:
				return 0;
			case r:
				return (60 * ((b - g) / diff)) + 180;
			case g:
				return (60 * ((r - b) / diff)) + 300;
			case b:
				return (60 * ((g - r) / diff)) + 60;
		}
		return 0;
	}
	/** HLS 色空間の S を取得する */
	public get s(): float {
		const r = this.r / COLOR_MAX;
		const g = this.g / COLOR_MAX;
		const b = this.b / COLOR_MAX;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);

		return Math.clamp_zero_to_one((max - min) / (1 - (Math.abs(max + min - 1))));
	}
	/** HLS 色空間の L を取得する */
	public get l(): float {
		const r = this.r / COLOR_MAX;
		const g = this.g / COLOR_MAX;
		const b = this.b / COLOR_MAX;

		return Math.clamp_zero_to_one((Math.max(r, g, b) + Math.min(r, g, b)) / 2);
	}

	/** 赤色 */
	public static get red(): Color {
		return new Color(255, 0, 0);
	}
	/** 緑色 */
	public static get green(): Color {
		return new Color(0, 255, 0);
	}
	/** 青色 */
	public static get blue(): Color {
		return new Color(0, 0, 255);
	}
	/** 桃色 */
	public static get pink(): Color {
		return new Color(255, 0, 255);
	}
	/** 黄色 */
	public static get yellow(): Color {
		return new Color(255, 255, 0);
	}
	/** 水色 */
	public static get aqua(): Color {
		return new Color(0, 255, 255);
	}

	/** パステル版 赤色 */
	public static get pastel_red(): Color {
		return new Color(255, 128, 128);
	}
	/** パステル版 緑色 */
	public static get pastel_green(): Color {
		return new Color(128, 255, 128);
	}
	/** パステル版 青色 */
	public static get pastel_blue(): Color {
		return new Color(128, 128, 255);
	}
	/** パステル版 桃色 */
	public static get pastel_pink(): Color {
		return new Color(255, 128, 255);
	}
	/** パステル版 黄色 */
	public static get pastel_yellow(): Color {
		return new Color(255, 255, 128);
	}
	/** パステル版 水色 */
	public static get pastel_aqua(): Color {
		return new Color(128, 255, 255);
	}

	/** ダークカラー版 赤色 */
	public static get dark_red(): Color {
		return new Color(128, 0, 0);
	}
	/** ダークカラー版 緑色 */
	public static get dark_green(): Color {
		return new Color(0, 128, 0);
	}
	/** ダークカラー版 青色 */
	public static get dark_blue(): Color {
		return new Color(0, 0, 128);
	}
	/** ダークカラー版 桃色 */
	public static get dark_pink(): Color {
		return new Color(128, 0, 128);
	}
	/** ダークカラー版 黄色 */
	public static get dark_yellow(): Color {
		return new Color(128, 128, 0);
	}
	/** ダークカラー版 水色 */
	public static get dark_aqua(): Color {
		return new Color(0, 128, 128);
	}

	/** 白色 */
	public static get white(): Color {
		return new Color(255, 255, 255);
	}
	/** パステル版 ねずみ色 */
	public static get pastel_gray(): Color {
		return new Color(191, 191, 191);
	}
	/** ねずみ色 */
	public static get gray(): Color {
		return new Color(128, 128, 128);
	}
	/** ークカラー版 ねずみ色 */
	public static get dark_gray(): Color {
		return new Color(40, 40, 40);
	}
	/** 明るめの黒 */
	public static get brightblack(): Color {
		return new Color(20, 20, 20);
	}
	/** 黒色 */
	public static get black(): Color {
		return new Color(0, 0, 0);
	}

	/** マゼンタ */
	public static get magenta(): Color {
		return new Color(255, 0, 128);
	}
	/** 紫色 */
	public static get purple(): Color {
		return new Color(128, 0, 255);
	}
	/** オレンジ色 */
	public static get orange(): Color {
		return new Color(255, 128, 0);
	}
	/** ライム色 */
	public static get lime(): Color {
		return new Color(128, 255, 0);
	}
	/** エメラルドグリーン */
	public static get emerald(): Color {
		return new Color(0, 255, 128);
	}
	/** アジュールブルー */
	public static get azure(): Color {
		return new Color(0, 128, 255);
	}

	/** Color クラスを指定する必要があるが使用しないことを明示的に示す色 */
	public static get dummy(): Color {
		return new Color(0, 0, 0, 0);
	}
}

/** フォントを保持するクラス */
class Font {
	/** フォント名 */
	private font: string;
	/** フォントサイズ ( px ) */
	public size: float;
	/** 太字かどうか */
	public bold: boolean;
	/** イタリック体かどうか */
	public italic: boolean;

	/**
	 * @class
	 * @param font フォント名 ( null でデフォルトフォント )
	 * @param size px 単位のフォントサイズ ( null でデフォルトサイズ )
	 * @param bold 太字かどうか
	 * @param italic イタリック体かどうか
	 */
	constructor(font: string | null = null, size: float | null = null, bold: boolean = false, italic: boolean = false) {
		this.font = font ?? DEFAULT_FONT_NAME;
		this.size = size ?? DEFAULT_FONT_SIZE;
		this.bold = bold;
		this.italic = italic;
	}
	/**
	 * コピーを取得する
	 * @returns クローンされたインスタンス
	 */
	public copy(): Font {
		return new Font(this.font, this.size, this.bold, this.italic);
	}
	/**
	 * フォント情報を文字に変換する
	 * @returns 全てのフォント情報が含まれた文字列
	 */
	public to_str(): string {
		let result = "";
		if (this.bold) result += "bold ";
		if (this.italic) result += "italic ";
		if (this.size !== null) result += this.size + "px ";
		if (this.font !== null) result += this.font;
		return result;
	}
	/**
	 * サイズだけを変更したフォントを取得する
	 * @param size フォントサイズ
	 * @returns サイズのみ変更したフォント
	 */
	public with_size(size: float): Font {
		let font = this.copy();
		font.size = size;
		return font;
	}
	/**
	 * 太字かどうかだけを変更したフォントを取得する
	 * @param flag 太字かどうか
	 * @returns 太字かどうかのみ変更したフォント
	 */
	public with_bold(flag: boolean = true): Font {
		let font = this.copy();
		font.bold = flag;
		return font;
	}
	/**
	 * イタリック体かどうかだけを変更したフォントを取得する
	 * @param flag イタリック体かどうか
	 * @returns イタリック体かどうかのみ変更したフォント
	 */
	public with_italic(flag: boolean = true): Font {
		let font = this.copy();
		font.italic = flag;
		return font;
	}
	/**
	 * フォントの設定項目を初期設定に戻す
	 * @returns 自身のインスタンス
	 */
	public reset_default(): Font {
		this.font = DEFAULT_FONT_NAME;
		this.size = DEFAULT_FONT_SIZE;
		this.bold = false;
		this.italic = false;
		return this;
	}
	/**
	 * フォントが完全に同じかどうかを比較する
	 * @param other 比較対象のフォント
	 * @returns 完全に同じフォントの場合は true
	 */
	public equals(other: Font): boolean {
		return (this.font === other.font && this.size === other.size && this.bold === other.bold && this.italic === other.italic);
	}
}

/** アニメーションの開始値と終了値、移動速度を保持するクラス */
abstract class Tween<T, U = T> {
	/** 値 */
	public value: T;
	/** 目標とする値 */
	public dest: T;
	/** 目標とする値に近づける速度 */
	public speed: U;

	/**
	 * @class
	 * @param value 値
	 * @param speed 目標とする値に近づける速度
	 */
	constructor(value: T, speed: U) {
		this.value = value;
		this.dest = value;
		this.speed = speed;
	}

	/** 現在の値を目標の値に近づける */
	public abstract approach(): void;
}

/** 数値を保存するための拡張 Tween クラス */
class TweenNumber extends Tween<number> {
	/** @override */
	public approach(): void {
		this.value = approach_num(this.value, this.dest, this.speed);
	}
}

/** 角度を保存するための拡張 Tween クラス */
class TweenAngle extends Tween<angle_t> {
	/** @override */
	public approach(): void {
		this.value = approach_angle(this.value, this.dest, this.speed);
	}
}

/** 座標を保存するための拡張 Tween クラス */
class TweenVector2 extends Tween<Vector2, float> {
	/** @override */
	constructor(value: Vector2, speed: float) {
		super(value, speed);
		this.dest = value.copy();
	}

	/** @override */
	public approach(): void {
		this.value = this.value.approach(this.dest, this.speed);
	}
}

/** 色を保存するための拡張 Tween クラス */
class TweenColor extends Tween<Color, float> {
	/** @override */
	constructor(value: Color, speed: float) {
		super(value, speed);
		this.dest = value.copy();
	}

	/** @override */
	public approach(): void {
		this.value = this.value.approach(this.dest, this.speed);
	}
}

/** オブジェクトのアニメーションを計算するクラス */
abstract class TweenEventBase<T extends copyable_t<T>> {
	/** アニメーションを適用するオブジェクト */
	protected readonly value: T;
	/** アニメーションの開始値 */
	protected readonly initial: T;
	/** アニメーションの終了値 */
	protected readonly dest: T;
	/** アニメーションの時間 ( 秒 ) */
	protected readonly duration: float;
	/** アニメーションの経過時間 ( 秒 ) */
	protected time: int;

	/**
	 * @class
	 * @param value アニメーションを適応するオブジェクト
	 * @param dest アニメーションの終了値
	 * @param duration アニメーションの時間 ( 秒 )
	 */
	constructor(value: T, dest: T, duration: float) {
		this.value = value;
		this.initial = value.copy();
		this.dest = dest.copy();
		this.duration = duration;
		this.time = 0;
	}
	/**
	 * アニメーションを更新する
	 * @param delta_time 経過時間 ( 秒 )
	 * @returns アニメーションが終了した場合は false
	 */
	public update(delta_time: float): boolean {
		this.time += delta_time;
		return this.time < this.duration;
	}
}

/** Vector2 のアニメーションを計算するクラス */
class TweenEventVector2 extends TweenEventBase<Vector2> {
	/** @override */
	public update(delta_time: float): boolean {
		if (this.time == 0) this.initial.set(this.value);		// イベントを登録した直後に値を変更されても、アニメーション開始前なら変更後の値からアニメーションを開始する
		this.value.set(this.initial.add(this.dest.sub(this.initial).mul(get_cubic_bezier_point(this.time / this.duration))));
		const result = super.update(delta_time);
		if (result == false) this.value.set(this.dest);			// アニメーションの終了値が必ず目的の値になるようにする
		return result;
	}
}

/** Color のアニメーションを計算するクラス */
class TweenEventColor extends TweenEventBase<Color> {
	/** @override */
	public update(delta_time: float): boolean {
		this.value.set(this.initial.add(this.dest.sub(this.initial).mul(get_cubic_bezier_point(this.time / this.duration))));
		const result = super.update(delta_time);
		if (result == false) this.value.set(this.dest);
		return result;
	}
}

/** マウスやタップに対応したボタン */
class ClickableButton {
	/** ボタンの位置 */
	public readonly rectangle: Rectangle;
	/** ボタン選択時に呼ばれるコールバックイベント */
	protected readonly enter_callback: ((clickable_button: ClickableButton) => void) | null;
	/**
	 * ボタンがロックされているかどうか
	 * @remarks ロック状態 = クリックイベント無効化
	 */
	public is_locked: boolean;
	/**
	 * ステータスごとのカウント
	 * @remarks ステータスが変更されるたびにリセットされる
	 */
	public status_count: int;
	/** 1 フレーム前のマウス座標 */
	private old_mouse_pos: Vector2;
	/** ボタンのステータス */
	private _status: BUTTON_STATUS;

	/**
	 * @class
	 * @param rectangle ボタンの位置
	 * @param enter_callback クリック時のコールバックイベント
	 * @param is_locked 初期からロック状態にするか
	 */
	constructor(rectangle: Rectangle, enter_callback: ((clickable_button: ClickableButton) => void) | null = null, is_locked: boolean = false) {
		this.rectangle = rectangle.copy();
		this.enter_callback = enter_callback;
		this.is_locked = is_locked;
		this.status_count = 0;
		this.old_mouse_pos = get_mouse_pos();
		this._status = BUTTON_STATUS.normal;
	}
	/** オーバーライドしてボタンの状態に対する処理を実装するためのメソッド */
	public update(): void {
		if (this.enter_callback && this.is_enter) this.enter_callback(this);
		this.status_count++;
	}
	/** ボタンのステータスを更新する */
	public update_status(): void {
		if (Collision.check(this.rectangle, new Dot(get_mouse_pos()))) {
			if (get_mouse_click() == 1) this.status = BUTTON_STATUS.click_start;
			else if (get_mouse_click() && this.status == BUTTON_STATUS.normal) this.status = BUTTON_STATUS.hover_start;
			else if (get_mouse_click()) this.status = BUTTON_STATUS.click;
			else if (get_mouse_release() == 1) this.status = BUTTON_STATUS.enter;
			else if (this.status == BUTTON_STATUS.normal && this.old_mouse_pos.not_equals(get_mouse_pos())) this.status = BUTTON_STATUS.hover_start;
			else if (this.is_active) this.status = BUTTON_STATUS.hover;					// マウスに動きがないときホバー状態を更新しない
		}
		else if (get_mouse_click() && this.status == BUTTON_STATUS.click) {				// ボタンを押しながら範囲から離れたら
			this.status = BUTTON_STATUS.click_leave;
		}
		else this.status = BUTTON_STATUS.normal;
		this.old_mouse_pos = get_mouse_pos();

		if (get_touch_num() == 1 || get_no_touch() == 1) {
			if (Collision.check(this.rectangle, new Dot(get_touch_pos()))) {
				if (get_touch() == 1) this.status = BUTTON_STATUS.hover_start;			// click_start ではなく、イベントが登録されている確率が高い hover_start にする
				else if (get_touch()) this.status = BUTTON_STATUS.click;
				else if (get_no_touch() == 1) this.status = BUTTON_STATUS.enter;
			}
			else {			// 自分以外の他の場所がクリックされたら選択状態を解除する
				this.status = BUTTON_STATUS.normal;
			}
		}
	}
	/**
	 * オーバーライド用のボタンを描画するメソッド
	 * @param ctx 描画先のコンテキスト ( デバッグ用のボタンを描画する場合のみ渡す )
	 */
	public draw(ctx?: CanvasRenderingContext2D): void {
		const color = this.is_click ? Color.gray
			: this.is_hover ? Color.pastel_yellow
				: Color.white;
		if (ctx) ctx.draw_box(this.rectangle.ul_pos.x, this.rectangle.ul_pos.y, this.rectangle.br_pos.x, this.rectangle.br_pos.y, color.with_opacity(0.5));
	}
	/** ボタンのステータス */
	public get status(): BUTTON_STATUS {
		return this._status;
	}
	public set status(status: BUTTON_STATUS) {
		if (this._status != status) {
			this._status = status;
			this.status_count = 0;
		}
	}
	/** マウスがホバー状態かどうか */
	public get is_hover(): boolean {
		return (this.status == BUTTON_STATUS.hover_start || this.status == BUTTON_STATUS.hover);
	}
	/** ホバーが開始されたフレームかどうか */
	public get is_hover_start(): boolean {
		return (this.status == BUTTON_STATUS.hover_start);
	}
	/** クリックされているかどうか */
	public get is_click(): boolean {
		return ((this.status == BUTTON_STATUS.click_start || this.status == BUTTON_STATUS.click) && this.is_locked == false);
	}
	/** クリックが開始されたフレームかどうか */
	public get is_click_start(): boolean {
		return (this.status == BUTTON_STATUS.click_start);
	}
	/** ボタンが決定されたかどうか ( クリックを離した瞬間のフレームかどうか ) */
	public get is_enter(): boolean {
		return (this.status == BUTTON_STATUS.enter && this.is_locked == false);
	}
	/** ボタンがアクティブな状態 ( ホバーかクリックされている状態 ) かどうか */
	public get is_active(): boolean {
		return (this.status != BUTTON_STATUS.normal && this.status != BUTTON_STATUS.click_leave);
	}
	/** ボタンがアクティブな状態 ( ホバーかクリックされている状態 ) ではないかどうか */
	public get is_inactive(): boolean {
		return (this.is_active == false);
	}
}

/** ClickableButton クラスの draw メソッドにアニメーションを付けた、そのまま使えるデザインボタン */
class AnimatedClickableButton extends ClickableButton {
	/** ボタンの色 */
	protected readonly color: Color;
	/** ボタンを塗りつぶす色 */
	protected readonly fill_color_tween: TweenColor;
	/** アニメーション用カウンタ */
	protected count: int;
	/** ロック中にクリックされたら開始するカウンタ */
	protected locked_click_count: int;
	/** アクティブ時にボタンがアニメーションする距離 */
	protected readonly animation_distance: int;

	/**
	 * @class
	 * @param rectangle ボタンの位置
	 * @param enter_callback クリック時のコールバックイベント
	 * @param is_locked 初期からロック状態にするか
	 * @param color ボタンの色
	 * @param initial_animation_count アニメーションの初期カウント
	 */
	constructor(rectangle: Rectangle, enter_callback: ((clickable_button: ClickableButton) => void) | null = null, is_locked: boolean = false, color: Color = Color.white, initial_animation_count: int = 0) {
		super(rectangle, enter_callback, is_locked);
		this.color = color.copy();
		this.fill_color_tween = new TweenColor(color.with_opacity(0.1), 15);
		this.count = initial_animation_count;
		this.locked_click_count = 0;
		this.animation_distance = 5;
	}
	/** @override */
	public update(): void {
		super.update();
		if (this.is_active) this.fill_color_tween.dest = this.color.copy();
		else if (this.is_inactive) this.fill_color_tween.dest = this.color.with_opacity(0.1);
		else if (this.is_click) this.fill_color_tween.dest = this.color.merge(Color.black);
		this.fill_color_tween.approach();
		if (this.status == BUTTON_STATUS.click_start && this.is_locked) this.locked_click_count = 1;
		if (this.locked_click_count > 8) this.locked_click_count = 0;
		if (this.locked_click_count) this.locked_click_count++;
		this.count++;
	}
	/** @override */
	public draw(ctx?: CanvasRenderingContext2D): void {
		if (ctx) {
			ctx.draw_box(
				this.rectangle.ul_pos.x + this.animated_offset.x,
				this.rectangle.ul_pos.y + this.animated_offset.y,
				this.rectangle.br_pos.x + this.animated_offset.x,
				this.rectangle.br_pos.y + this.animated_offset.y,
				this.fill_color_tween.value.with_opacity(this.fill_color_tween.value.opacity * this.animated_mag),
			);
			ctx.draw_box(
				this.rectangle.ul_pos.x + this.animated_offset.x,
				this.rectangle.ul_pos.y + this.animated_offset.y,
				this.rectangle.br_pos.x + this.animated_offset.x,
				this.rectangle.br_pos.y + this.animated_offset.y,
				this.color.with_opacity(this.color.opacity * this.animated_mag),
				false,
				3,
			);
		}
	}
	/**
	 * 表示アニメーションの移動量
	 * @remarks 0 ~ 1 に徐々に変化し、不透明度としてはそのまま使用できる
	 */
	public get animated_mag(): float {
		return get_cubic_bezier_point(Math.clamp_zero_to_one(this.count * 0.03));
	}
	/** ボタンを描画するときのアニメーション加算座標 */
	public get animated_offset(): Vector2 {
		const x = this.locked_click_count ? get_rand_int_w(this.animation_distance) : 0;
		const y = this.animated_mag < 1 ? (1 - this.animated_mag) * 25		// アニメーション中はパラメーターをアニメーションする
			: this.is_click ? this.animation_distance							// クリック中は少し下げる
				: this.locked_click_count ? get_rand_int_w(this.animation_distance)
					: 0;
		return new Vector2(x, y);
	}
}

/** セレクトボタンをグループ管理して、キーボード選択にも対応させるクラス */
class ClickableButtonGroup<T extends ClickableButton = ClickableButton> {
	/** 決定ボタンとして使用するキーコードのリスト */
	private readonly enter_key_codes: key_code_t[];
	/** 一度ボタンが決定されれば、全てのボタンステータスをロックするかどうか */
	private readonly one_click_only: boolean;
	/** ボタンを格納するリスト */
	private readonly clickable_buttons: T[][];
	/** 全てのボタンの基準座標 */
	private readonly reference_pos: Vector2;
	/** 現在アクティブ ( 選択されている ) ボタンのインデックス */
	public readonly active_index: Vector2;
	/** 現在アクティブなボタンがアクティブになってからのカウンタ */
	private active_count: int;
	/** 全てのボタンステータスを更新しない状態かどうか */
	public is_locked: boolean;

	/**
	 * @class
	 * @param enter_key_codes 決定ボタンとして使用するキーコードのリスト
	 * @param one_click_only 一度ボタンが決定されれば、全てのボタンステータスをロックするかどうか
	 */
	constructor(enter_key_codes: key_code_t[] = [KEY_CODE.enter], one_click_only: boolean = false) {
		this.enter_key_codes = enter_key_codes;
		this.one_click_only = one_click_only;
		this.clickable_buttons = [[]];
		this.reference_pos = Vector2.zero;
		this.active_index = Vector2.zero;
		this.active_count = 1;
		this.is_locked = false;
	}
	/** ボタングループの状態を更新する */
	public update(): void {
		if (this.is_locked == false) {
			let directly_activated_button_index: Vector2 | null = null;		// マウス等で直接アクティブになったボタンを探す
			for (let iy = 0; iy < this.clickable_buttons.length; iy++) {
				for (let ix = 0; ix < this.clickable_buttons[iy].length; ix++) {
					this.clickable_buttons[iy][ix].update_status();			// 各ボタンのステータスを最新に更新する
					if (this.clickable_buttons[iy][ix].is_active) directly_activated_button_index = new Vector2(ix, iy);
					if (this.clickable_buttons[iy][ix].is_enter && this.one_click_only) this.is_locked = true;
				}
			}
			if (directly_activated_button_index !== null && this.active_index.not_equals(directly_activated_button_index)) {
				this.active_index.set(directly_activated_button_index);		// 直接マウスホバーされればアクティブの位置を切り替える
			}

			const old_active_index = this.active_index.copy();				// 現在ののアクティブインデックスを保存しておく
			let is_movement_complete = false;								// 移動完了フラグ
			while (is_movement_complete == false) {
				if (get_key_long_press(KEY_CODE.right)) {
					if (this.active_index.x < this.clickable_buttons[this.active_index.y].length - 1) {		// 右に移動
						this.active_index.x++;
					}
					else if (this.active_index.y < this.clickable_buttons.length - 1) {						// 下の段に移動
						this.active_index.x = 0;
						this.active_index.y++;
					}
					else break;
					if (this.active_button.is_locked == false) is_movement_complete = true;					// 移動できたら終了
				}
				if (get_key_long_press(KEY_CODE.left)) {													// 左に移動
					if (this.active_index.x > 0) {
						this.active_index.x--;
					}
					else if (this.active_index.y > 0) {														// 上の段に移動
						this.active_index.y--;
						this.active_index.x = this.clickable_buttons[this.active_index.y].length - 1;
					}
					else break;
					if (this.active_button.is_locked == false) is_movement_complete = true;					// 移動できたら終了
				}
				if (get_key_long_press(KEY_CODE.down)) {
					if (this.active_index.y < this.clickable_buttons.length - 1) {
						this.active_index.y++;
						if (this.active_index.x >= this.clickable_buttons[this.active_index.y].length) {	// x の数が異なり、オーバーした場合は調節する
							this.active_index.x = this.clickable_buttons[this.active_index.y].length - 1;
						}
					}
					else break;
					if (this.active_button.is_locked == false) is_movement_complete = true;					// 移動できたら終了
				}
				if (get_key_long_press(KEY_CODE.up)) {
					if (this.active_index.y > 0) {
						this.active_index.y--;
						if (this.active_index.x >= this.clickable_buttons[this.active_index.y].length) {	// x の数が異なり、オーバーした場合は調節する
							this.active_index.x = this.clickable_buttons[this.active_index.y].length - 1;
						}
					}
					else break;
					if (this.active_button.is_locked == false) is_movement_complete = true;		// 移動できたら終了
				}
				if (this.active_index.equals(old_active_index)) break;							// ロック状態に関係なく一回も移動していない = 移動キーが押されていないか端っこにいる場合は終了
				else this.clickable_buttons[old_active_index.y][old_active_index.x].status = BUTTON_STATUS.normal;		// 移動した場合は前のボタンのステータスをリセットする ( このクラスでアクティブにしている場合は不要だが、マウスなどで直接有効化されていた場合は勝手にホバー状態が解除されないため )
			}
			if (is_movement_complete == false) this.active_index.set(old_active_index);			// 移動できなかったら元に戻す
			else this.active_count = 0;															// 移動できたらカウントをリセットする
		}
		else {																		// ロック状態でも前フレームの決定状態は解除する
			for (let iy = 0; iy < this.clickable_buttons.length; iy++) {
				for (let ix = 0; ix < this.clickable_buttons[iy].length; ix++) {
					if (this.clickable_buttons[iy][ix].status == BUTTON_STATUS.enter) this.clickable_buttons[iy][ix].status = BUTTON_STATUS.normal;
				}
			}
		}

		for (let iy = 0; iy < this.clickable_buttons.length; iy++) {				// ボタン独自のステータス更新処理を実行した後に、全てのボタンのステータスを上書きする
			for (let ix = 0; ix < this.clickable_buttons[iy].length; ix++) {
				if (ix == this.active_index.x && iy == this.active_index.y) {		// 現在グループで選択されているものであれば
					if (this.clickable_buttons[iy][ix].is_inactive) {
						if (this.active_count == 0) {
							this.clickable_buttons[iy][ix].status = BUTTON_STATUS.hover_start;
						}
						else {
							this.clickable_buttons[iy][ix].status = BUTTON_STATUS.hover;
							this.clickable_buttons[iy][ix].status_count = this.active_count;
						}
					}
					if (this.is_locked == false && get_keys(...this.enter_key_codes) == 1 && this.clickable_buttons[iy][ix].is_locked == false) {
						this.clickable_buttons[iy][ix].status = BUTTON_STATUS.enter;
						if (this.one_click_only) this.is_locked = true;
					}
				}
				this.clickable_buttons[iy][ix].update();
			}
		}
		this.active_count++;
	}
	/**
	 * 全てのボタンを描画する
	 * @param ctx 描画先のコンテキスト ( 標準のボタンクラスを使用して描画も行う場合は渡す )
	 */
	public draw(ctx?: CanvasRenderingContext2D): void {
		this.clickable_buttons.flat().forEach(clickable_button => clickable_button.draw(ctx));
	}
	/**
	 * 水平に新しいボタンを追加する
	 * @param button 追加するボタンオブジェクト
	 * @param active 選択された状態にするかどうか
	 */
	public push_button(button: T, active: boolean = false): void {
		this.clickable_buttons.last().push(button);
		// ここまで登録されたボタンが全てロックされている場合は、新しく追加されたボタンをアクティブにする
		if ((this.clickable_buttons.flat().all(button => button.is_locked) && button.is_locked == false) || active) {
			this.active_index.set(this.clickable_buttons.last().length - 1, this.clickable_buttons.length - 1);
		}
	}
	/**
	 * 垂直に新しいボタンを追加する
	 * @param button 追加するボタンオブジェクト
	 * @param active 選択された状態にするかどうか
	 */
	public push_button_vertical(button: T, active: boolean = false): void {
		if (this.clickable_buttons.last().any()) this.new_line();
		this.push_button(button, active);
	}
	/**
	 * 指定したインデックスにボタンを追加する ( 但し、ボタンの間に空白がある場合は正しく動作しないため、基本的には push_button を使用することを推奨 )
	 * @param x ボタンの x インデックス
	 * @param y ボタンの y インデックス
	 * @param button 追加するボタンオブジェクト
	 * @param active 選択された状態にするかどうか
	 */
	public set_button(x: int, y: int, button: T, active: boolean = false): void {
		if (this.clickable_buttons[y] === undefined) this.clickable_buttons[y] = [];
		this.clickable_buttons[y][x] = button;
		// ここまで登録されたボタンが全てロックされている場合は、新しく追加されたボタンをアクティブにする
		if ((this.clickable_buttons.flat().all(button => button.is_locked) && button.is_locked == false) || active) {
			this.active_index.set(x, y);
		}
	}
	/** ボタンの挿入位置を改行する */
	public new_line(): void {
		this.clickable_buttons.push([]);
	}
	/**
	 * ボタンを格納するリストを取得する
	 * @returns ボタンのリスト
	 */
	public get_clickable_buttons(): T[][] {
		return this.clickable_buttons;
	}
	/** 現在選択されているボタン */
	public get active_button(): T {
		return this.clickable_buttons[this.active_index.y][this.active_index.x];
	}
	/** 基準座標 */
	public get pos(): Vector2 {
		return this.reference_pos.copy();
	}
	public set pos(pos: Vector2) {
		for (let iy = 0; iy < this.clickable_buttons.length; iy++) {
			for (let ix = 0; ix < this.clickable_buttons[iy].length; ix++) {
				this.clickable_buttons[iy][ix].rectangle.pos.set(this.clickable_buttons[iy][ix].rectangle.pos.sub(this.reference_pos));
				this.clickable_buttons[iy][ix].rectangle.pos.set(this.clickable_buttons[iy][ix].rectangle.pos.add(pos));
			}
		}
		this.reference_pos.set(pos);
	}
}

/** デバッグ用の処理時間計測クラス */
class DebugTimer {
	/** 計測した時間を表示するウィジェットの左上の座標 */
	public pos: Vector2;
	/** 計測ブロックの時間を格納したリスト */
	private times: float[];
	/** 計測時の処理名を格納するリスト */
	private process_names: string[];

	/** @class */
	constructor() {
		this.pos = Vector2.zero;
		this.times = [];
		this.process_names = [];
	}
	/**
	 * 1 フレームの計測を開始する
	 * @param process_name この地点から始まる処理ブロックの名前
	 */
	public start_frame(process_name: string = ""): void {
		this.times = [];
		this.process_names = [];
		this.times.push(performance.now());
		this.process_names.push(process_name);
	}
	/**
	 * 計測ポイントを設置する
	 * @param process_name この地点から始まる処理ブロックの名前
	 */
	public step_frame(process_name: string = ""): void {
		this.times.push(performance.now());
		this.process_names.push(process_name);
	}
	/**
	 * 計測を終了する
	 * @param process_name 全ての処理ブロックの合計時間を表示するときの名前
	 */
	public stop_frame(process_name: string | null = null): void {
		process_name ??= "合計処理時間";
		this.step_frame(process_name);
	}
	/**
	 * 処理にかかった時間を描画する
	 * @param ctx 描画先のコンテキスト
	 * @param draw_fps フレームレートを表示するかどうか
	 * @param font 処理時間を表示する文字フォント
	 */
	public draw_time(ctx: CanvasRenderingContext2D, draw_fps: boolean = false, font: Font = new Font(null, 20)): void {
		const STR_PAD = 5;
		const str_height = ctx.get_height_str("0", font) + STR_PAD;
		let process_name_width = 0;					// 一番長い処理名の横幅を求める
		for (let i = 0; i < this.process_names.length; i++) {
			if (process_name_width < ctx.get_width_str(this.process_names[i], font)) {
				process_name_width = ctx.get_width_str(this.process_names[i], font);
			}
		}
		process_name_width += 30;
		let color = Color.white;
		let y = this.pos.y + str_height;
		let back_y_size = str_height * this.times.length + STR_PAD;
		if (draw_fps) back_y_size += str_height;	// フレームレート表示分も背景を長くする

		ctx.draw_box(this.pos.x, this.pos.y, this.pos.x + process_name_width + 120, this.pos.y + back_y_size, Color.black.with_opacity(0.5));
		if (this.times.length >= 3) {			// step が 3 つ以上登録されていれば途中の処理時間を表示する
			for (let i = 0; i < this.times.length - 1; i++) {
				ctx.draw_text(this.process_names[i], this.pos.x + STR_PAD, y, color, 0, null, font);
				ctx.draw_text((this.times[i + 1] - this.times[i]).toFixed(3), this.pos.x + process_name_width, y, color, 0, null, font);
				y += str_height;
			}
		}
		if (this.times.length >= 2) {			// 合計の処理時間を描画する
			if (this.times.last() - this.times[0] > 16.6666) color = Color.pastel_red;
			ctx.draw_text(this.process_names.last(), this.pos.x + STR_PAD, y, color, 0, null, font);
			ctx.draw_text((this.times.last() - this.times[0]).toFixed(3), this.pos.x + process_name_width, y, color, 0, null, font);
			y += str_height;
		}
		if (draw_fps) {
			ctx.draw_text("フレームレート", this.pos.x + STR_PAD, y, color, 0, null, font);
			ctx.draw_text((this.frame_rate).toFixed(0) + " fps", this.pos.x + process_name_width, y, color, 0, null, font);
		}
	}
	/**
	 * フレームレート
	 * @remarks stop_frame() を呼んで計測完了していないと、正確な値が取得できない
	 */
	public get frame_rate(): float {
		return this.times.length >= 2 ? 1000 / (this.times.last() - this.times[0]) : 0;
	}
}

/** 各図形の基底クラス */
abstract class Shape {
	/** 図形の種類 */
	public readonly type: SHAPE_TYPE;
	/** 図形の中心座標 */
	public pos: Vector2;

	/**
	 * @class
	 * @param type 図形の種類
	 * @param x 図形の中心 x 座標
	 * @param y 図形の中心 y 座標
	 */
	constructor(type: SHAPE_TYPE = SHAPE_TYPE.unknown, x: float, y: float) {
		this.type = type;
		this.pos = new Vector2(x, y);
	}
	/**
	 * コピーを取得する
	 * @returns クローンされたインスタンス
	 */
	public abstract copy(): Shape;
	/**
	 * 自オブジェクトの値を登録する
	 * @param shape 登録する図形
	 */
	public abstract set(shape: this): void;
}

/** 点 */
class Dot extends Shape {
	/**
	 * @override
	 * @param pos 中心座標
	 */
	constructor(pos: Vector2);
	/**
	 * @override
	 * @param x x 座標
	 * @param y y 座標
	 */
	constructor(x?: float, y?: float);
	/** @inheritdoc */
	constructor(x: float | Vector2 = 0, y: float = 0) {
		if (x instanceof Vector2) super(SHAPE_TYPE.dot, x.x, x.y);
		else super(SHAPE_TYPE.dot, x, y);
	}
	/** @override */
	public copy(): Dot {
		return new Dot(this.pos);
	}
	/** @override */
	public set(shape: Dot): void {
		this.pos.set(shape.pos);
	}
}

/** 円 */
class Circle extends Shape {
	/** 半径 */
	public r: float;

	/**
	 * @override
	 * @param pos 中心座標
	 * @param r 半径
	 */
	constructor(pos: Vector2, r: float);
	/**
	 * @override
	 * @param x 中心の x 座標
	 * @param y 中心の y 座標
	 * @param r 半径
	 */
	constructor(x?: float, y?: float, r?: float);
	/** @inheritdoc */
	constructor(x: float | Vector2 = 0, y: float = 0, r: float = 0) {
		if (x instanceof Vector2) {
			super(SHAPE_TYPE.circle, x.x, x.y);
			this.r = y;
		}
		else {
			super(SHAPE_TYPE.circle, x, y);
			this.r = r;
		}
	}
	/** @override */
	public copy(): Circle {
		return new Circle(this.pos, this.r);
	}
	/** @override */
	public set(shape: Circle): void {
		this.pos.set(shape.pos);
		this.r = shape.r;
	}
	/**
	 * 同じ中心座標で ( 円の半径 * 2 = 長方形の辺 ) の正方形に変換する
	 * @returns Square クラスのインスタンス
	 */
	public to_square(): Square {
		return new Square(this.pos, this.r);
	}
}

/** 中心座標と辺の長さ / 2 の値で正方形を格納するクラス */
class Square extends Shape {
	/** 辺の長さ / 2 の値 */
	public r: float;

	/**
	 * @override
	 * @param pos 中心座標
	 * @param r 辺の長さ / 2 の値
	 */
	constructor(pos: Vector2, r: float);
	/**
	 * @override
	 * @param x 中心の x 座標
	 * @param y 中心の y 座標
	 * @param r 辺の長さ / 2 の値
	 */
	constructor(x?: float, y?: float, r?: float);
	/** @inheritdoc */
	constructor(x: float | Vector2 = 0, y: float = 0, r: float = 0) {
		if (x instanceof Vector2) {
			super(SHAPE_TYPE.square, x.x, x.y);
			this.r = y;
		}
		else {
			super(SHAPE_TYPE.square, x, y);
			this.r = r;
		}
	}
	/** @override */
	public copy(): Square {
		return new Square(this.pos, this.r);
	}
	/** @override */
	public set(shape: Square): void {
		this.pos.set(shape.pos);
		this.r = shape.r;
	}
	/**
	 * 同じ中心座標で ( 長方形の辺 / 2 = 円の半径 ) の円に変換する
	 * @returns Circle クラスのインスタンス
	 */
	public to_circle(): Circle {
		return new Circle(this.pos, this.r);
	}
	/** 左上の座標 */
	public get ul_pos(): Vector2 {
		return new Vector2(this.pos.x - this.r, this.pos.y - this.r);
	}
	/** 右下の座標 */
	public get br_pos(): Vector2 {
		return new Vector2(this.pos.x + this.r, this.pos.y + this.r);
	}
}

/** 中心座標と高さ、横幅で矩形を保存するクラス */
class Rectangle extends Shape {
	/** 横幅 */
	public width: float;
	/** 高さ */
	public height: float;

	/**
	 * @override
	 * @param pos 中心座標
	 * @param width 横幅
	 * @param height 高さ
	 */
	constructor(pos: Vector2, width: float, height: float);
	/**
	 * @override
	 * @param x 中心の x 座標
	 * @param y 中心の y 座標
	 * @param width 横幅
	 * @param height 高さ
	 */
	constructor(x?: float, y?: float, width?: float, height?: float);
	/** @inheritdoc */
	constructor(x: float | Vector2 = 0, y: float = 0, width: float = 0, height: float = 0) {
		if (x instanceof Vector2) {
			super(SHAPE_TYPE.rectangle, x.x, x.y);
			this.width = y;
			this.height = width;
		}
		else {
			super(SHAPE_TYPE.rectangle, x, y);
			this.width = width;
			this.height = height;
		}
	}
	/** @override */
	public copy(): Rectangle {
		return new Rectangle(this.pos.x, this.pos.y, this.width, this.height);
	}
	/** @override */
	public set(shape: Rectangle): void {
		this.pos.set(shape.pos);
		this.width = shape.width;
		this.height = shape.height;
	}
	/** 左上の座標 */
	public get ul_pos(): Vector2 {
		return new Vector2(this.pos.x - this.width / 2, this.pos.y - this.height / 2);
	}
	/** 右下の座標 */
	public get br_pos(): Vector2 {
		return new Vector2(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
	}
	/**
	 * 左上の座標と右下の座標から座標を初期化する
	 * @param x1 左上の x 座標
	 * @param y1 左上の y 座標
	 * @param x2 右下の x 座標
	 * @param y2 右下の y 座標
	 * @returns 値を変更したインスタンス
	 */
	public static from_ulbr(x1: float, y1: float, x2: float, y2: float): Rectangle {
		const width = Math.abs(x2 - x1);
		const height = Math.abs(y2 - y1);
		return new Rectangle(Math.min(x1, x2) + width / 2, Math.min(y1, y2) + height / 2, width, height);
	}
	/**
	 * 特定の座標と指定された座標の位置を表すアンカー、サイズからインスタンスを生成する
	 * @param pos 矩形の座標
	 * @param anchor 指定された座標の位置を表すアンカー
	 * @param size 矩形のサイズ
	 * @returns 生成されたインスタンス
	 */
	public static from_anchor(pos: Vector2, anchor: Vector2, size: Vector2): Rectangle {
		return new Rectangle(pos.x + size.x * (0.5 - anchor.x), pos.y + size.y * (0.5 - anchor.y), size.x, size.y);
	}
}

/** 図形同士の衝突判定を行うクラス */
class Collision {
	/**
	 * 図形同士の衝突判定を行う
	 * 対応していない図形のペアが渡された場合は例外をスローする
	 * @param shape1 一つ目の図形
	 * @param shape2 二つ目の図形
	 * @returns 衝突した場合は true
	 */
	public static check(shape1: Shape, shape2: Shape): boolean {
		if (shape1 instanceof Circle && shape2 instanceof Circle) {
			return Collision.circle(shape1, shape2);
		}
		else if ((shape1 instanceof Square || shape1 instanceof Rectangle) && (shape2 instanceof Square || shape2 instanceof Rectangle)) {
			return Collision.rectangle(shape1.ul_pos, shape1.br_pos, shape2.ul_pos, shape2.br_pos);
		}
		else if (shape1 instanceof Circle && shape2 instanceof Dot) {
			return Collision.circle_dot(shape1, shape2);
		}
		else if (shape1 instanceof Dot && shape2 instanceof Circle) {
			return Collision.circle_dot(shape2, shape1);
		}
		else if ((shape1 instanceof Square || shape1 instanceof Rectangle) && shape2 instanceof Dot) {
			return Collision.rectangle_dot(shape1.ul_pos, shape1.br_pos, shape2);
		}
		else if (shape1 instanceof Dot && (shape2 instanceof Square || shape2 instanceof Rectangle)) {
			return Collision.rectangle_dot(shape2.ul_pos, shape2.br_pos, shape1);
		}
		throw new Error("対応していない組み合わせで衝突チェックが行われました");		// 衝突判定が出来なかった場合
	}
	/**
	 * 円同士の衝突判定を行う
	 * @param circle1 円 1
	 * @param circle2 円 2
	 * @returns 衝突している場合は true
	 */
	public static circle(circle1: Circle, circle2: Circle): boolean {
		return circle1.pos.distance(circle2.pos) <= circle1.r + circle2.r;
	}
	/**
	 * 円と点との当たり判定を行う
	 * @param circle 円
	 * @param dot 点
	 * @returns 衝突している場合は true
	 */
	public static circle_dot(circle: Circle, dot: Dot): boolean {
		return circle.pos.distance(dot.pos) <= circle.r;
	}
	/**
	 * 矩形同士の当たり判定を行う
	 * @param rect1_pos1 矩形 1 の左上の座標
	 * @param rect1_pos2 矩形 1 の右下の座標
	 * @param rect2_pos1 矩形 2 の左上の座標
	 * @param rect2_pos2 矩形 2 の右下の座標
	 * @returns 衝突している場合は true
	 */
	public static rectangle(rect1_pos1: Vector2, rect1_pos2: Vector2, rect2_pos1: Vector2, rect2_pos2: Vector2): boolean {
		if (rect1_pos1.x < rect2_pos2.x && rect1_pos2.x > rect2_pos1.x && rect1_pos1.y < rect2_pos2.y && rect1_pos2.y > rect2_pos1.y) return true;
		return false;
	}
	/**
	 * 矩形と点の当たり判定を行う
	 * @param rect_pos1 矩形の左上の座標
	 * @param rect_pos2 矩形の右下の座標
	 * @param dot 点
	 * @returns 衝突している場合は true
	 */
	public static rectangle_dot(rect_pos1: Vector2, rect_pos2: Vector2, dot: Dot): boolean {
		if (rect_pos1.x < dot.pos.x && rect_pos1.y < dot.pos.y && rect_pos2.x > dot.pos.x && rect_pos2.y > dot.pos.y) return true;
		return false;
	}
}

/** ボタンの押下状態を格納する ( 内部処理用 ) */
class ButtonStatus {
	/** ボタンが押下されているかどうか */
	public is_button_pressed: boolean;
	/** ボタンが押下されている長さ */
	public button_press_duration: int;
	/** ボタンが押下されていない長さ */
	public button_release_duration: int;

	/** @class */
	constructor() {
		this.is_button_pressed = false;
		this.button_press_duration = 0;
		this.button_release_duration = 0;
	}
	/** ボタンの押下状態からカウンタの値を更新する */
	public update(): void {
		if (this.is_button_pressed) {
			this.button_press_duration++;
			this.button_release_duration = 0;
		}
		else {
			this.button_press_duration = 0;
			this.button_release_duration++;
		}
	}
}



/** ゲームライブラリ内で使用するグローバル変数 */
namespace game_library {
	/** キャンバスオブジェクト */
	export let canvas: HTMLCanvasElement | null = null;
	/**
	 * キャンバスのうち実際に描画する領域のアスペクト比
	 * @remarks キャンバス端に黒塗りのスペース等がある場合に指定すると、描画領域の左上を 0 とした座標を取得できるようになる
	 */
	export let canvas_drawing_area_aspect_ratio: float | null = null;
	/** ダミーコンテキスト */
	export const dummy_ctx: CanvasRenderingContext2D = document.createElement("canvas").getContext("2d")!;
	/** 各キーが今のフレームで入力されているかどうか */
	export const key_inputs: Set<key_code_t> = new Set();
	/** 各キーが押されている長さ */
	export const key_input_counts: Map<key_code_t, int> = new Map();
	/** ゲームを起動してからのカウント */
	export let key_count: int = 0;
	/** 入力を無効化するキー */
	export let disabled_keys: Set<key_code_t> = new Set();
	/** 前回 update が呼ばれた時間 */
	export let last_update_time: float = 0;

	/** マウスの座標 */
	export let mouse_pos: Vector2 = Vector2.zero;
	/** マウスの左ボタンが押されているかどうかの状態 */
	export let mouse_left: ButtonStatus = new ButtonStatus();
	/** マウスの右ボタンが押されているかどうかの状態 */
	export let mouse_right: ButtonStatus = new ButtonStatus();
	/** マウスホイールの移動量 */
	export let mouse_wheel: int = 0;
	/** マウスホイールの一フレーム間合計移動量 */
	export let mouse_wheel_frame: int = 0;

	/** タップ開始位置 */
	export let touch_s: Vector2 = Vector2.zero;
	/** 現在の移動した後の位置 */
	export let touch_m: Vector2 = Vector2.zero;
	/** 移動した距離 */
	export let touch_l: Vector2 = Vector2.zero;
	/** タップしているかどうか */
	export let touch: boolean = false;
	/** タップしている長さ */
	export let touch_count: int = 0;
	/** 2 箇所同時タップしている長さ */
	export let touch_2_count: int = 0;
	/** タップしていない長さ */
	export let no_touch_count: int = 0;
	/** 2 箇所同時タップしていない長さ */
	export let no_touch_2_count: int = 0;
	/** 同時にタップされている個数 */
	export let simultaneous_touch_count: int = 0;
	/** 複数タップされている場合は、最初の 2 点座標の距離 */
	export let touch_distance_old: float = 0;
	/** 複数タップされている場合は、最初の 2 点座標の距離 */
	export let touch_distance: float = 0;

	/** tween のコールバック */
	export const tween_events: TweenEventBase<any>[] = [];
}



// ライブラリ系関数
/**
 * ライブラリを初期化する
 * @param canvas 描画先のキャンバスオブジェクト ( 描画関係の処理を使用しない場合は不要 )
 * @param canvas_drawing_area_aspect_ratio キャンバスのうち実際に描画する領域のアスペクト比 ( 描画関係の処理を使用しない場合は不要 )
 * @remarks ゲーム起動時、ゲームライブラリの関数群を呼ぶ前に必ず一回呼ぶ必要がある
 */
function initialize_game_library(canvas: HTMLCanvasElement | null = null, canvas_drawing_area_aspect_ratio: float | null = null): void {
	game_library.canvas = canvas;
	game_library.canvas_drawing_area_aspect_ratio = canvas_drawing_area_aspect_ratio;
	if (game_library.canvas !== null) {			// キャンバスに対する右クリックのメニュー表示を無効化する
		game_library.canvas.oncontextmenu = (): boolean => { return false; };		// eslint-disable-line unicorn/prefer-add-event-listener
	}
}
/** ライブラリをゲームループ毎に更新する */
function update_game_library(): void {
	const delta_time = performance.now() - game_library.last_update_time;
	key_input_update();
	mouse_input_update();
	touch_input_update();
	game_library.mouse_wheel_frame = game_library.mouse_wheel;
	game_library.mouse_wheel = 0;

	for (let i = 0; i < game_library.tween_events.length; i++) {
		if (game_library.tween_events[i].update(delta_time / 1000) == false) {
			game_library.tween_events.splice(i, 1);
			i--;
		}
	}
	game_library.last_update_time += delta_time;
}



// システム系
/**
 * エラーログを出力する
 * @param text 出力するメッセージ
 */
function print_error_log(text: string): void {
	console.trace();								// eslint-disable-line no-console
	console.log(`\u001B[31m${text}\u001B[0m`);		// eslint-disable-line no-console
}
/**
 * デバッグ用のログを出力する
 * @param data 出力するデータ
 * @remarks リリース時に内部の処理を削除すればログは出力されない
 */
function print_log(...data: any[]): void {
	console.log(...data);		// eslint-disable-line no-console
}
/**
 * ブラウザの座標をキャンバスの座標に変換する
 * @param x ブラウザの x 座標
 * @param y ブラウザの y 座標
 * @returns キャンバス上の座標
 */
function browser_pos_to_canvas(x: float, y: float): Vector2 {
	const pos = new Vector2(x, y);
	if (game_library.canvas === null) return pos;
	const canvas_client_size = new Vector2(game_library.canvas.clientWidth, game_library.canvas.clientHeight);
	pos.set(pos.sub(game_library.canvas.getBoundingClientRect().to_vector2()));
	// キャンバスのアスペクト比が描画領域のアスペクト比と異なる場合は、描画領域は中央寄せで本来より長い部分は黒塗りされるため、座標を補正する ( 描画領域の左上が 0, 0 になるようにする )
	if (game_library.canvas_drawing_area_aspect_ratio && nearly_equal(canvas_client_size.x / canvas_client_size.y, game_library.canvas_drawing_area_aspect_ratio, 0.01) == false) {
		if (canvas_client_size.x / canvas_client_size.y > game_library.canvas_drawing_area_aspect_ratio) {		// キャンバスのアスペクト比が描画領域のアスペクト比よりも横長の場合
			const game_width = canvas_client_size.y * game_library.canvas_drawing_area_aspect_ratio;
			pos.x -= (canvas_client_size.x - game_width) / 2;
			canvas_client_size.x = game_width;
		}
		else {																								// キャンバスのアスペクト比が描画領域のアスペクト比よりも縦長の場合
			const game_height = canvas_client_size.x / game_library.canvas_drawing_area_aspect_ratio;
			pos.y -= (canvas_client_size.y - game_height) / 2;
			canvas_client_size.y = game_height;
		}
	}
	return pos.div(new Vector2(canvas_client_size.x, canvas_client_size.y).div(new Vector2(game_library.canvas.width, game_library.canvas.height)));		// 表示サイズとキャンバスの実サイズの比率を修正する
}



// 入力管理系関数
/**
 * キーボード押下時のコールバック関数
 * @param event イベント
 */
document.addEventListener("keydown", (event): void => {
	game_library.key_inputs.add(event.code);
});
/**
 * キーボードを離したときのコールバック関数
 * @param event イベント
 */
document.addEventListener("keyup", (event): void => {
	game_library.key_inputs.delete(event.code);
});
/** キーボード入力を更新する */
function key_input_update(): void {
	for (const key of Object.values(KEY_CODE)) {
		if (game_library.disabled_keys.has(key) == false) {
			if (game_library.key_inputs.has(key)) increment_key_input(key);
			else set_key_input(key, 0);
		}
	}
	game_library.key_count++;
}
/**
 * キーボード入力を取得する
 * @param key_code 入力状態を取得したいキーのキーコード
 * @returns 指定されたキーが連続で入力されているフレームのカウント ( 押されていない場合は 0 )
 */
function get_key(key_code: key_code_t): int {
	if (key_code == KEY_CODE.count) return game_library.key_count;		// キーカウンタを返す
	return game_library.key_input_counts.get(key_code) || 0;
}
/**
 * キーボード入力を複数のキーコードを指定して取得する
 * @param key_codes 入力状態を取得したいキーのキーコードを複数指定する
 * @returns 一番長く押されているキーが連続で入力されているフレームのカウント ( 押されていない場合は 0 )
 */
function get_keys(...key_codes: key_code_t[]): int {
	return key_codes.map(key_code => get_key(key_code)).max();
}
/**
 * 長押しを考慮してキー入力を取得する
 * @param key_code 入力状態を取得したいキーのキーコード
 * @param long_press_frame 2 回目以降の入力を受け付けるまでのフレーム数
 * @param interval 2 回目以降で定期的にキー入力を受け付けるフレームの間隔
 * @returns 指定さてたキーが押下された 1 フレーム目と、長押しの場合は一定間隔おきにキー入力カウントを取得する
 */
function get_key_long_press(key_code: key_code_t, long_press_frame: int = 30, interval: int = 5): int {
	if (get_key(key_code) == 1 || get_key(key_code) >= long_press_frame && (get_key(key_code) - long_press_frame) % interval == 0) {
		return get_key(key_code);
	}
	return 0;
}
/**
 * 長押しを考慮し、複数のキーコードを指定してキー入力を取得する
 * @param key_codes 入力状態を取得したいキーのキーコード
 * @param long_press_frame 2 回目以降の入力を受け付けるまでのフレーム数
 * @param interval 2 回目以降で定期的にキー入力を受け付けるフレームの間隔
 * @returns 指定さてたキーが押下された 1 フレーム目と、長押しの場合は一定間隔おきにキー入力カウントを取得する
 */
function get_keys_long_press(key_codes: key_code_t[], long_press_frame: int = 30, interval: int = 5): int {
	if (get_keys(...key_codes) == 1 || get_keys(...key_codes) >= long_press_frame && (get_keys(...key_codes) - long_press_frame) % interval == 0) {
		return get_keys(...key_codes);
	}
	return 0;
}
/**
 * 特定のキー入力を無効化する
 * @param key_code 入力を無効化したいキーのキーコード
 */
function disable_key(key_code: key_code_t): void {
	game_library.disabled_keys.add(key_code);
}
/**
 * 特定のキー入力を有効化する
 * @param key_code 入力を有効化したいキーのキーコード
 */
function enable_key(key_code: key_code_t): void {
	game_library.disabled_keys.delete(key_code);
}
/**
 * キー入力カウントを強制的に上書きする
 * @param key_code キー入力カウントを強制的に上書きするキーコード
 * @param n 上書きする値
 */
function set_key_input(key_code: key_code_t, n: int): void {
	game_library.key_input_counts.set(key_code, n);
}
/**
 * キー入力カウントを強制的にインクリメントする
 * @param key_code キーコード
 */
function increment_key_input(key_code: key_code_t): void {
	game_library.key_input_counts.set(key_code, get_key(key_code) + 1);
}

/** マウス移動時のコールバックイベント */
document.addEventListener("mousemove", (event): void => {
	if (get_touch()) return;							// モバイル端末でタップした場合もイベントが走ってしまうため、タップ時はマウス座標を更新しない
	game_library.mouse_pos.set(browser_pos_to_canvas(event.clientX, event.clientY));
});
/** マウスボタン押下時のコールバックイベント */
document.addEventListener("mousedown", (event): void => {
	if (event.button == 0) game_library.mouse_left.is_button_pressed = true;
	else if (event.button == 2) game_library.mouse_right.is_button_pressed = true;
});
/** マウスボタン開放時のコールバックイベント */
document.addEventListener("mouseup", (event): void => {
	if (event.button == 0) game_library.mouse_left.is_button_pressed = false;
	else if (event.button == 2) game_library.mouse_right.is_button_pressed = false;
});
/** マウス入力を更新する */
function mouse_input_update(): void {
	game_library.mouse_left.update();
	game_library.mouse_right.update();
}
/**
 * マウスのキャンバス上の座標を取得する
 * @returns マウスの座標
 */
function get_mouse_pos(): Vector2 {
	return game_library.mouse_pos.copy();
}
/**
 * マウスが連続で左クリックされているカウントを取得する
 * @returns マウスが連続で左クリックされているカウント ( 未クリック状態は 0 )
 */
function get_mouse_click(): int {
	return game_library.mouse_left.button_press_duration;
}
/**
 * マウスが連続で左クリックされていないカウントを取得する
 * @returns マウスが連続で左クリックされていないカウント ( クリック状態は 0 )
 */
function get_mouse_release(): int {
	return game_library.mouse_left.button_release_duration;
}
/**
 * マウスが連続で右クリックされているカウントを取得する
 * @returns マウスが連続で右クリックされているカウント ( 未クリック状態は 0 )
 */
function get_mouse_right_click(): int {
	return game_library.mouse_right.button_press_duration;
}
/**
 * マウスが連続で右クリックされていないカウントを取得する
 * @returns マウスが連続で右クリックされていないカウント ( クリック状態は 0 )
 */
function get_mouse_right_release(): int {
	return game_library.mouse_right.button_release_duration;
}

/** マウスホイールイベント ( onmousewheel は非推奨 ) */
document.addEventListener("wheel", (event): void => {
	if (event.deltaY < 0) game_library.mouse_wheel--;
	else if (event.deltaY > 0) game_library.mouse_wheel++;
});
/**
 * マウスホイールのスクロール量を取得する
 * @returns スクロール量 ( 下回転は + 上回転は - で移動量を返す )
 */
function get_mouse_wheel(): int {
	return game_library.mouse_wheel_frame;
}

/** タップ開始時のコールバックイベント */
document.addEventListener("touchstart", (event): void => {
	game_library.simultaneous_touch_count = event.touches.length;
	if (game_library.simultaneous_touch_count >= 1) {			// タップされ始めれば
		const pos0 = browser_pos_to_canvas(event.touches[0].pageX, event.touches[0].pageY);
		game_library.touch_s.set(pos0);
		game_library.touch_m.set(pos0);
		game_library.touch = true;
		if (game_library.simultaneous_touch_count >= 2) {		// 2 つ以上入力があれば
			const pos1 = browser_pos_to_canvas(event.touches[1].pageX, event.touches[1].pageY);
			game_library.touch_distance = Math.sqrt(Math.pow(pos1.x - pos0.x, 2) + Math.pow(pos1.y - pos0.y, 2));
			game_library.touch_distance_old = game_library.touch_distance;
		}
	}
});
/** タップしながら移動した時のコールバックイベント */
document.addEventListener("touchmove", (event): void => {
	game_library.simultaneous_touch_count = event.touches.length;
	if (game_library.simultaneous_touch_count >= 1) {
		const pos0 = browser_pos_to_canvas(event.touches[0].pageX, event.touches[0].pageY);
		game_library.touch_m.set(pos0);
		if (game_library.simultaneous_touch_count >= 2) {
			const pos1 = browser_pos_to_canvas(event.touches[1].pageX, event.touches[1].pageY);
			game_library.touch_distance = Math.sqrt(Math.pow(pos1.x - pos0.x, 2) + Math.pow(pos1.y - pos0.y, 2));
		}
	}
});
/** タップ終了時のコールバックイベント */
document.addEventListener("touchend", (event): void => {
	game_library.simultaneous_touch_count = event.touches.length;
	if (game_library.simultaneous_touch_count >= 1) {						// 1 つ以上入力があれば
		const pos = browser_pos_to_canvas(event.touches[0].pageX, event.touches[0].pageY);
		game_library.touch_s.set(pos);						// 入力個数が減っただけなら、残っているほうの座標で初期化する ( テレポート対策 )
		game_library.touch_m.set(pos);
	}
	if (game_library.simultaneous_touch_count <= 1) {
		game_library.touch_distance_old = 0;
		game_library.touch_distance = 0;
	}
	if (game_library.simultaneous_touch_count == 0) {						// 完全に入力がなくなれば初期化する
		game_library.touch_s.set(0);
		game_library.touch = false;
	}
});
/** タップ入力を更新する */
function touch_input_update(): void {
	if (game_library.touch) {
		game_library.touch_count++;
		game_library.no_touch_count = 0;
	}
	else {
		game_library.touch_count = 0;
		game_library.no_touch_count++;
	}
	if (game_library.simultaneous_touch_count == 2) {
		game_library.touch_2_count++;
		game_library.no_touch_2_count = 0;
	}
	else {
		game_library.touch_2_count = 0;
		game_library.no_touch_2_count++;
	}

	if (get_touch()) {
		game_library.touch_l.set(game_library.touch_m.sub(game_library.touch_s));
	}
	else {
		game_library.touch_l.set(0);
	}
	game_library.touch_s.set(game_library.touch_m);
	game_library.touch_distance_old = game_library.touch_distance;
}
/**
 * タップされているかどうかを取得する
 * @returns 連続でタップされているフレーム数
 */
function get_touch(): int {
	return game_library.touch_count;
}
/**
 * ダブルタップされているかどうかを取得する
 * @returns 連続でダブルタップされているフレーム数
 */
function get_2point_touch(): int {
	return game_library.touch_2_count;
}
/**
 * タップされていないかどうかを取得する
 * @returns 連続でタップされていないフレーム数
 */
function get_no_touch(): int {
	return game_library.no_touch_count;
}
/**
 * ダブルタップされているかどうかを取得する
 * @returns 連続でダブルタップされているフレーム数
 */
function get_no_2point_touch(): int {
	return game_library.no_touch_2_count;
}
/**
 * 同時タップされている個数を取得する
 * @returns 同時タップされている個数
 */
function get_touch_num(): int {
	return game_library.simultaneous_touch_count;
}
/**
 * ピンチアウトされた距離を取得する
 * @returns ピンチアウトされた距離 ( ピンチアウトされていない場合は 0 )
 */
function get_pinch_out(): float {
	if (game_library.simultaneous_touch_count >= 2) {
		return game_library.touch_distance - game_library.touch_distance_old;
	}
	return 0;
}
/**
 * タップされた座標を取得する
 * @returns タップされた座標を取得する ( タップされていない場合は最新の座標を返す )
 */
function get_touch_pos(): Vector2 {
	return game_library.touch_m.copy();
}
/**
 * スライドされた座標を取得する
 * @returns タップ開始座標からの移動量を取得する
 */
function get_touch_move(): Vector2 {
	return game_library.touch_l.copy();
}



// 演算系
/**
 * 乱数を取得する
 * @param max 最大値
 * @param min 最小値
 * @returns 最大値から最小値までの乱数
 */
function get_rand(max: float = 1, min: float = 0): float {
	if (max < min) {
		print_error_log(`max より大きな min が指定されました [max=${max}, min=${min}]`);
		const temp = max;
		max = min;
		min = temp;
	}
	return Math.random() * (max - min) + min;
}
/**
 * 0 が中心となる乱数を取得する
 * @param width_max 絶対値の最大値 ( 3 を指定した場合は -3 ~ 3 の乱数を得る )
 * @param width_min 絶対値の最小値
 * @returns 指定された範囲内の乱数
 */
function get_rand_w(width_max: float, width_min: float = 0): float {
	if (width_max < width_min) {
		print_error_log(`width_max より大きな width_min が指定されました [width_max=${width_max}, width_min=${width_min}]`);
		const temp = width_max;
		width_max = width_min;
		width_min = temp;
	}
	const width = get_rand((width_max - width_min) * 2) - (width_max - width_min);
	return width >= 0 ? width + width_min : width - width_min;
}
/**
 * 整数の乱数を取得する
 * @param max 最大値
 * @param min 最小値
 * @returns ( min ～ max - 1 ) の乱数を取得する
 */
function get_rand_int(max: int, min: int = 0): int {
	return Math.floor(get_rand(max, min));
}
/**
 * 0 が中心で整数の乱数を取得する
 * @param width_max 絶対値の最大値 ( 3 を指定した場合は -3 ~ 3 の乱数を得る )
 * @param width_min 絶対値の最小値
 * @returns 指定された範囲内の乱数を取得するが、width_min を出力する確率はほとんど無い
 */
function get_rand_int_w(width_max: int, width_min: int = 0): int {
	const n = get_rand_w(width_max, width_min);
	if (n >= 0) return Math.ceil(n);
	return Math.floor(n);
}
/**
 * boolean 型の乱数を取得する
 * @param true_ratio 結果が true になる確率を 0 ~ 1 の間で指定する ( デフォルトは 50% )
 * @returns true か false
 */
function get_rand_bool(true_ratio: float = 0.5): boolean {
	if (true_ratio <= 0) return false;
	if (true_ratio >= 1) return true;
	return get_rand(1) <= true_ratio;
}
/**
 * 各選択肢の選ばれる割合を指定して、選択肢を取得する
 * @param ratio_list 各選択肢の選ばれる割合を指定する
 * @returns 選択された選択肢の index
 */
function random_choice_ratio_index(ratio_list: float[]): int {
	let rand = get_rand(ratio_list.sum());
	for (const [i, ratio] of ratio_list.entries()) {
		if (rand < ratio) return i;
		rand -= ratio;
	}
	return ratio_list.length - 1;
}
/**
 * 渡された辞書が空かどうかを判定する
 * @param obj 判定する辞書
 * @returns 空であれば true
 */
function is_empty(obj: string | { [key: string | number]: any }): boolean {
	if (typeof obj == "string") {
		if (obj.trim() == "") return true;
		return false;
	}
	if (Object.keys(obj).any() == false) return true;
	return false;
}
/**
 * 画像の輝度を変更する
 * @param img 変更対象の画像
 * @param r 加算する赤色の含有量
 * @param g 加算する緑色の含有量
 * @param b 加算する青色の含有量
 * @returns 輝度を変更した画像
 */
function convert_image_bright(img: any, r: int, g: int, b: int): HTMLImageElement {
	const pixels = img.getImageData(0, 0, img.width, img.height);
	for (let i = 0; i < pixels.data.length; i += 4) {
		pixels.data[i] += r;
		pixels.data[i + 1] += g;
		pixels.data[i + 2] += b;
	}

	const re_img: any = new Image();
	re_img.putImageData(pixels, 0, 0);		// 変更後のピクセルデータで上書きする
	return re_img;
}
/**
 * 値を特定の値まで指定された数だけ近づける
 * @param value 値
 * @param target_value 目標とする値
 * @param step 近づけることができる最大の値
 * @returns 値を特定の値まで指定された数だけ近づけた値
 */
function approach_num(value: float, target_value: float, step: float): float {
	if (value > target_value + step) return value - step;
	else if (value < target_value - step) return value + step;
	return target_value;
}
/**
 * ラジアン角度同士の差を計算する
 * @param angle1 左辺の角度
 * @param angle2 右辺の角度
 * @returns ラジアン角度同士の差
 */
function get_angle_diff(angle1: angle_t, angle2: angle_t): angle_t {
	return ((angle1 - angle2) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
}
/**
 * ラジアン角度 angle を dest_angle まで最短ルートで additional_angle だけ近づける
 * @param angle 角度
 * @param dest_angle 目標とする角度
 * @param additional_angle 変更できる最大の角度
 * @returns angle を dest_angle まで最短ルートで additional_angle だけ近づけた角度
 */
function approach_angle(angle: angle_t, dest_angle: angle_t, additional_angle: angle_t): angle_t {
	const diff = get_angle_diff(dest_angle, angle);
	if (diff > additional_angle) return angle + additional_angle;
	else if (diff < -additional_angle) return angle - additional_angle;
	return dest_angle;
}
/**
 * 0 ~ 1 の値を徐々に減速しながら増加していく 0 ~ 1 の値に変換する
 * @param n 0 ~ 1 の値
 * @returns 0 ~ 1 の値を 0 の時は 0、1 の時は 1 だが、それ以外は基本的にある程度の値が加算された数値を返す
 */
function get_slow_stop(n: float): float {
	n = Math.sin(Math.clamp_zero_to_one(n) * Math.PI * 0.5);
	return n;
}
/**
 * 徐々に減速するために毎フレーム加算する値の倍率を取得する
 * @param count 現在のカウント
 * @param max_count カウントの最大値 ( 最大カウントまでの返り値の合計がこの値と同じになる )
 * @returns そのカウントで加算すべき値の倍率 ( 1 であれば等速直線運動になる )
 */
function get_slow_stop_additional_from_count(count: int, max_count: int): float {
	return (get_slow_stop((count + 1) / max_count) - get_slow_stop(count / max_count)) * max_count;
}
/**
 * 3 次ベジェ曲線を取得する
 * @param t ベジェ曲線の点の位置 0 ~ 1 の範囲で指定する
 * @param control_point_x 曲線の制御点の x 座標
 * @param control_point_y 曲線の制御点の y 座標
 * @returns ベジェ曲線の点の y 座標
 * @remarks 最初は早く、徐々に減速する
 */
function get_cubic_bezier_point(t: float, control_point_x: float = 0.9, control_point_y: float = 0.9): float {
	const control_point1 = Vector2.zero;
	const control_point2 = new Vector2(0, control_point_y);
	const control_point3 = new Vector2(control_point_x, 1);
	const control_point4 = Vector2.one;

	if (t <= 0) return control_point1.y;
	else if (t >= 1) return control_point4.y;

	const sub0 = control_point1.subdivide(control_point2, t);
	const sub1 = control_point2.subdivide(control_point3, t);
	const sub2 = control_point3.subdivide(control_point4, t);
	return sub0.subdivide(sub1, t).subdivide(sub1.subdivide(sub2, t), t).y;
}
/**
 * 反転した 3 次ベジェ曲線を取得する
 * @param t ベジェ曲線の点の位置 0 ~ 1 の範囲で指定する
 * @param control_point_x 曲線の制御点の x 座標
 * @param control_point_y 曲線の制御点の y 座標
 * @returns ベジェ曲線の点の y 座標
 * @remarks 最初は遅く、徐々に加速する
 */
function get_reverse_cubic_bezier_point(t: float, control_point_x: float = 0.9, control_point_y: float = 0.9): float {
	return 1 - get_cubic_bezier_point(1 - Math.clamp_zero_to_one(t), control_point_x, control_point_y);
}
/**
 * イージング関数 out elastic
 * @param t アニメーションの進行度 ( 0 ~ 1 )
 * @returns イージング関数の返り値 0 ~ 1
 */
function get_ease_out_elastic(t: float): float {
	t = Math.clamp_zero_to_one(t);
	if (t == 1) return t;
	const C4 = (2 * Math.PI) / 3;
	return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * C4) + 1;
}
/**
 * 指定された文字列や数値に対してゼロパディングを行う
 * @param target パディング対象の数値または文字列
 * @param length パディング後の文字列の長さ
 * @param fill_string パディングに使用する文字
 * @returns パディングされた文字列
 */
function pad_string(target: number | string, length: int, fill_string: string = "0"): string {
	if (typeof target == "number") target = String(target);
	if (target.startsWith("-")) return "-" + target.slice(1).padStart(length - 1, fill_string);
	return target.padStart(length, fill_string);
}
/**
 * ミリ秒を hh:mm:ss の形式の文字列に変換する
 * @param ms 変換するミリ秒
 * @returns hh:mm:ss の形式に変換されたミリ秒の文字列
 */
function millisecond_to_str(ms: int): string {
	const sec = pad_string(Math.floor((ms / 1000) % 60), 2);
	const min = pad_string(Math.floor(ms / 1000 / 60) % 60, 2);
	const hour = pad_string(Math.floor(ms / 1000 / 60 / 60), 2);
	return `${hour}:${min}:${sec}`;
}
/**
 * 数値がほぼ等しいかを判定する
 * @param first 一つ目の数値
 * @param second 二つ目の数値
 * @param tolerance 許容誤差
 * @returns 数値がほぼ等しいか
 */
function nearly_equal(first: float, second: float, tolerance: float = 0.00001): boolean {
	return Math.abs(first - second) <= tolerance;
}



// 特殊系
/**
 * ローカルストレージのキーの名称を渡すと、そのキーに対する値を返す
 * @param key ローカルストレージのキー
 * @param default_val キーが存在しなかった場合のデフォルト値
 * @returns ローカルストレージの値
 */
function get_from_local_storage(key: string, default_val: string): string;
/** @inheritdoc */
function get_from_local_storage(key: string, default_val: string | null = null): string | null {
	const val = localStorage.getItem(key);
	return (val === null) ? default_val : val;			// undefined の場合はそのまま返したいため、?? ではなく三項演算子を使用する
}
/**
 * 2 次元配列を生成する
 * @param m 一次元の要素数
 * @param n 二次元の要素数
 * @param val 初期値
 * @returns 2 次元配列
 */
function generate_2d_array<T>(m: int, n: int, val: T): T[][];
function generate_2d_array(m: int, n: int, val?: undefined): undefined[][];
/** @inheritdoc */
function generate_2d_array<T>(m: int, n: int, val: T | undefined = undefined): (T | undefined)[][] {
	return Array.from(new Array(m), _ => new Array(n).fill(val));
}
/**
 * Date 型を文字列に変換する
 * @param date 日時
 * @param include_hours 結果に時間以降を含めるかどうか
 * @param include_seconds 結果に秒を含めるかどうか
 * @returns 文字列に変換された日時
 */
function date_to_string(date: Date, include_hours: boolean = true, include_seconds: boolean = true): string {
	let result = `${date.getFullYear()}/${pad_string(date.getMonth() + 1, 2)}/${pad_string(date.getDate(), 2)}`;
	if (include_hours) {
		result += ` ${pad_string(date.getHours(), 2)}:${pad_string(date.getMinutes(), 2)}`;
		if (include_seconds) result += `:${pad_string(date.getSeconds(), 2)}`;
	}
	return result;
}
/**
 * 特定の文字列のプレースホルダを引数で渡された文字で置き換える
 * @param str 置換前文字列 プレースホルダを `{0}`, `{1}` の形式で埋め込む
 * @param args 第 2 引数以降で、置換する文字列を指定する
 * @returns 置き換えられた文字列
 */
function str_format(str: string, ...args: unknown[]): string {
	for (const [i, arg] of args.entries()) {
		const reg_exp = new RegExp(`\\{${i}\\}`, "g");
		str = str.replace(reg_exp, arg as string);
	}
	return str;
}
/**
 * ランダムで必ずユニークになる文字列を生成する
 * @returns ランダムな文字列
 */
function generate_unique_key(): string {
	return `${Date.now().toString(36)}${BigInt(`0x${globalThis.self.crypto.randomUUID().replaceAll("-", "")}`).toString(36)}`;
}
/**
 * 列挙子に含まれるすべての値を取得する
 * @param enum_object 列挙子
 * @returns 値のリスト
 */
function get_enum_values(enum_object: object): (int | string)[] {
	const values = Object.values(enum_object).filter(value => typeof value == "number");
	if (values.any()) return values;
	return Object.values(enum_object);
}



/** Array クラスの拡張メソッド */
interface Array<T> {
	/** 配列の中身を空にする */
	clear(): void;
	/**
	 * 配列のシャローコピーを取得する
	 * @returns 配列のシャローコピー
	 */
	copy(): T[];
	/**
	 * 配列の指定された位置に要素を挿入する
	 * @param index 挿入する位置
	 * @param items 挿入する要素
	 */
	insert(index: int, ...items: T[]): void;
	/**
	 * 配列の最初の要素を取得する
	 * @returns 配列の最初の要素
	 */
	first(): T;
	/**
	 *  配列の最後の要素を取得する
	 * @returns 配列の最後の要素
	 */
	last(): T;
	/**
	 * 配列の最初の要素を取得する ( 要素が存在しない場合は、デフォルト値を返す )
	 * @param default_value 要素が存在しない場合に返す値
	 * @returns 配列の最初の要素
	 */
	first_or_default(default_value: T): T;
	/** @inheritdoc */
	first_or_default(default_value: null): T | null;
	/**
	 * 配列の最後の要素を取得する ( 要素が存在しない場合は、デフォルト値を返す )
	 * @param default_value 要素が存在しない場合に返す値
	 * @returns 配列の最後の要素
	 */
	last_or_default(default_value: T): T;
	/** @inheritdoc */
	last_or_default(default_value: null): T | null;
	/**
	 * シーケンスに要素が含まれているかどうかを判断する
	 * @param predicate 各要素をテストする関数
	 * @returns シーケンスに要素が含まれている場合は true を返す
	 */
	any(predicate?: ((item: T) => boolean) | null): boolean;
	/**
	 * シーケンスのすべての要素が条件を満たしているかどうかを判断する
	 * @param predicate 各要素をテストする関数
	 * @returns シーケンスのすべての要素が条件を満たしている場合は true を返す
	 */
	all(predicate: (item: T) => boolean): boolean;
	/**
	 * 指定されたリストに含まれていない要素だけを取得する
	 * @param exclusions 除外する値のリスト
	 */
	exclude(exclusions: T[]): T[];
	/**
	 * 配列の最大値を取得する
	 * @returns 配列の最大値
	 */
	max(): T;
	/**
	 * 配列の最小値を取得する
	 * @returns 配列の最小値
	 */
	min(): T;
	/**
	 * 全要素の合計を取得する
	 * @returns 配列のすべての要素の合計
	 */
	sum(): number;
	/**
	 * 全要素の平均を取得する
	 * @returns 配列のすべての要素の平均
	 */
	average(): number;
	/**
	 * 配列の最大値が格納されているインデックスを取得する
	 * @returns 配列の最大値
	 */
	max_index(): int;
	/**
	 * 配列の最小値が格納されているインデックスを取得する
	 * @returns 配列の最小値
	 */
	min_index(): int;
	/**
	 * 配列の要素をランダムに一つ取得する
	 * @returns ランダムに選択された配列の要素
	 */
	choose_random(): T;
	/**
	 * 指定された範囲の整数の配列を生成する
	 * @param start 開始値
	 * @param stop 終了値 ( この値は含まれない )
	 * @param step 増分
	 * @returns 指定された範囲の整数の配列
	 */
	range(start: int, stop: int, step?: int): int[];
	/**
	 * 指定された範囲の整数の配列を生成する
	 * @param stop 終了値 ( この値は含まれない )
	 * @returns 指定された範囲の整数の配列
	 */
	range(stop: int): int[];
	/**
	 * 現在の配列を指定された配列と連結する
	 * @param items 連結する配列
	 */
	concat_self(...items: ConcatArray<T>[]): void;
	/**
	 * 配列を指定されたグループで分割する
	 * @param predicate どのグループかを判断する主キーを返す関数
	 * @returns グループごとに配列にまとめられた 2 次配列
	 */
	group_by<K>(predicate: (item: T) => K): T[][];
	/**
	 * 指定された型にキャストする
	 * @returns キャストされた配列
	 */
	cast<T>(): T[];
}
Array.prototype.clear = function (): void {
	this.splice(0);
};
Array.prototype.copy = function <T>(): T[] {
	return this.concat();
};
Array.prototype.insert = function <T>(index: int, ...items: T[]): void {
	this.splice(index, 0, ...items);
};
Array.prototype.first = function <T>(): T {
	return this[0];
};
Array.prototype.last = function <T>(): T {
	return this.at(-1);
};
Array.prototype.first_or_default = function <T>(default_value: T | null): T | null {
	if (this.any() == false) return default_value;
	return this.first();
};
Array.prototype.last_or_default = function <T>(default_value: T | null): T | null {
	if (this.any() == false) return default_value;
	return this.last();
};
Array.prototype.any = function <T>(predicate: ((item: T) => boolean) | null = null): boolean {
	if (predicate === null) return this.length > 0;
	return this.some(predicate);
};
Array.prototype.all = function <T>(predicate: (item: T) => boolean): boolean {
	return this.every(predicate);
};
Array.prototype.exclude = function <T>(exclusions: T[]): T[] {
	return this.filter(item => exclusions.includes(item) == false);
};
Array.prototype.max = function <T>(): T {
	return <T>Math.max.apply(null, this);
};
Array.prototype.min = function <T>(): T {
	return <T>Math.min.apply(null, this);
};
Array.prototype.sum = function (): number {
	return Math.sum(this);
};
Array.prototype.average = function (): number {
	if (this.any() == false) return 0;
	return this.sum() / this.length;
};
Array.prototype.max_index = function (): int {
	return this.indexOf(this.max());
};
Array.prototype.min_index = function (): int {
	return this.indexOf(this.min());
};
Array.prototype.choose_random = function <T>(): T {
	return this[get_rand_int(this.length)];		// 要素がなかった場合は undefined を返す
};
Array.prototype.range = function (start: int, stop?: int, step: int = 1): int[] {
	if (stop === undefined) {
		stop = start;
		start = 0;
	}
	if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) return [];

	const result = [];
	for (let i = start; step > 0 ? i < stop : i > stop; i += step) result.push(i);
	return result;
};
Array.prototype.concat_self = function <T>(...items: ConcatArray<T>[]): void {
	this.push(...items.flat());
};
Array.prototype.group_by = function <T, K>(predicate: (item: T) => K): T[][] {
	const result = new Map<K, T[]>();
	for (const item of this) {
		const key = predicate(item);
		if (result.has(key) == false) result.set(key, []);
		result.get(key)?.push(item);
	}
	return Array.from(result.values());
};
Array.prototype.cast = function <T>(): T[] {
	return this as T[];
};
Object.defineProperties(Array.prototype, {
	remove: { enumerable: false },
	clear: { enumerable: false },
	copy: { enumerable: false },
	insert: { enumerable: false },
	first: { enumerable: false },
	last: { enumerable: false },
	first_or_default: { enumerable: false },
	last_or_default: { enumerable: false },
	any: { enumerable: false },
	all: { enumerable: false },
	exclude: { enumerable: false },
	max: { enumerable: false },
	min: { enumerable: false },
	sum: { enumerable: false },
	average: { enumerable: false },
	max_index: { enumerable: false },
	min_index: { enumerable: false },
	choose_random: { enumerable: false },
	range: { enumerable: false },
	concat_self: { enumerable: false },
	group_by: { enumerable: false },
	cast: { enumerable: false },
});



/** Number クラスの拡張メソッド */
interface NumberConstructor {
	/**
	 * 渡された文字列が数値かどうかを判断する ( 小数でも true を返す )
	 * @param n 判断する値
	 * @returns 渡された値が数値であれば true を返す
	 */
	is_number(n: string): boolean;
}
Number.is_number = (n: string): boolean => {
	return Number.isNaN(Number.parseFloat(n)) == false;
};



/** Math クラスの拡張メソッド */
interface Math {
	/**
	 * 配列の総和を取得する
	 * @param array 総和を求める数値のリスト
	 * @returns 配列の総和
	 */
	sum(array: number[]): number;
	/**
	 * 渡した値を指定された値の間に正規化する ( 指定された値を含む )
	 * @param n 正規化する値
	 * @param min 最小値
	 * @param max 最大値
	 * @returns 指定された値の間に正規化された値
	 */
	clamp(n: float, min: float, max: float): float;
	/**
	 * 一定の範囲をとる値を 0 から最大値までの間で正規化する ( 超過した場合は最大値にするのではなく、最大値で割った余りを返す )
	 * @param value 正規化する値
	 * @param max 最大値
	 * @returns 0 ~ 最大値の間で正規化された値
	 */
	clamp_loop(value: float, max: float): float;
	/**
	 * 渡した値を 0 ~ 1 の間に正規化する ( 超過した場合はその値で止める )
	 * @param n 正規化する値
	 * @returns 0 ~ 1 の値
	 */
	clamp_zero_to_one(n: float): float;
	/**
	 * ラジアン角度 0 ~ PI*2 の範囲に収まるように正規化する
	 * @param angle 角度
	 * @returns 0 ~ PI*2 の範囲内に正規化された角度
	 */
	clamp_angle(angle: angle_t): angle_t;
	/**
	 * 任意の桁で四捨五入する関数
	 * @param x 四捨五入する数値
	 * @param place どの桁で四捨五入するか ( 0 => 小数第 1 位、1 => 小数第 2 位、-1 => 1 の位 )
	 * @returns 四捨五入した値
	 */
	round_place(x: float, place: float): float;
	/**
	 * 任意の桁で切り上げする関数
	 * @param x 切り上げする数値
	 * @param place どの桁で切り上げするか ( 0 => 小数第 1 位、1 => 小数第 2 位、-1 => 1 の位 )
	 * @returns 切り上げした値
	 */
	ceil_place(x: float, place: float): float;
	/**
	 * 任意の桁で切り捨てする関数
	 * @param x 切り捨てする数値
	 * @param place どの桁で切り捨てするか ( 0 => 小数第 1 位、1 => 小数第 2 位、-1 => 1 の位 )
	 * @returns 切り捨てした値
	 */
	floor_place(x: float, place: float): float;
	/**
	 * 最大公約数を求める
	 * @param a 値 1
	 * @param b 値 2
	 * @returns 最大公約数
	 */
	gcd(a: int, b: int): number;
	/**
	 * シグモイド関数
	 * @param x 入力値
	 * @returns シグモイド関数の出力値
	 */
	sigmoid(x: float): float;
}
Math.sum = (array): number => {
	return array.reduce((a, b) => a + b, 0);
};
Math.clamp = (n: float, min: float, max: float): float => {
	return Math.min(Math.max(n, min), max);
};
Math.clamp_loop = (value: float, max: float): float => {
	value %= max;
	if (value < 0) value += max;
	return value + 0;
};
Math.clamp_zero_to_one = (n: float): float => {
	return Math.clamp(n, 0, 1);
};
Math.clamp_angle = (angle: angle_t): angle_t => {
	return Math.clamp_loop(angle, Math.PI * 2);
};
Math.round_place = (x, place): float => {
	return Math.round(x * Math.pow(10, place)) / Math.pow(10, place);
};
Math.ceil_place = (x, place): float => {
	return Math.ceil(x * Math.pow(10, place)) / Math.pow(10, place);
};
Math.floor_place = (x, place): float => {
	return Math.floor(x * Math.pow(10, place)) / Math.pow(10, place);
};
Math.gcd = (a, b): number => {
	return b == 0 ? a : Math.gcd(b, a % b);
};
Math.sigmoid = (x): float => {
	return 1 / (1 + Math.exp(-x));
};



/** CanvasRenderingContext2D クラスの拡張メソッド */
interface CanvasRenderingContext2D {
	/**
	 * 線を描画する
	 * @param x1 描画開始位置の x 座標
	 * @param y1 描画開始位置の y 座標
	 * @param x2 描画終了位置の x 座標
	 * @param y2 描画終了位置の y 座標
	 * @param color 色
	 * @param thickness 線の太さ
	 */
	draw_line(x1: float, y1: float, x2: float, y2: float, color: Color | string, thickness?: float): void;
	/**
	 * 左上と右下の座標を指定して矩形を描画する
	 * @param x1 左上の x 座標
	 * @param y1 左上の y 座標
	 * @param x2 右下の x 座標
	 * @param y2 右下の y 座標
	 * @param color 色
	 * @param is_filled 塗りつぶすかどうか
	 * @param thickness 塗りつぶさない場合は枠線の太さ
	 * @param angle 回転角度
	 */
	draw_box(x1: float, y1: float, x2: float, y2: float, color: Color | string, is_filled?: boolean, thickness?: int, angle?: angle_t): void;
	/**
	 * 任意の頂点を指定して多角形を描画する
	 * @param vertices 頂点の配列
	 * @param color 色
	 * @param is_filled 塗りつぶすかどうか
	 * @param thickness 塗りつぶさない場合は枠線の太さ
	 * @param angle 回転角度
	 */
	draw_polygon(vertices: Vector2[], color: Color, is_filled?: boolean, thickness?: int, angle?: angle_t): void;
	/**
	 * 円を描画する
	 * @param x 中心の x 座標
	 * @param y 中心の y 座標
	 * @param radius 半径
	 * @param color 色
	 * @param is_filled 塗りつぶすかどうか
	 * @param thickness 塗りつぶさない場合は枠線の太さ
	 * @param start_angle 描画を開始する角度
	 * @param end_angle 描画を終了する角度
	 * @param counterclockwise 反時計回りに描画するかどうか
	 */
	draw_circle(x: float, y: float, radius: float, color: Color | string, is_filled?: boolean, thickness?: int, start_angle?: angle_t, end_angle?: angle_t, counterclockwise?: boolean): void;
	/**
	 * 三角を描画する
	 * @param x 中心の x 座標
	 * @param y 中心の y 座標
	 * @param base_length 底辺の長さ
	 * @param height 高さ
	 * @param color 色
	 * @param is_filled 塗りつぶすかどうか
	 * @param thickness 塗りつぶさない場合は枠線の太さ
	 * @param angle 三角形の向き
	 */
	draw_triangle(x: float, y: float, base_length: float, height: float, color: Color | string, is_filled?: boolean, thickness?: int, angle?: angle_t): void;
	/**
	 * プログレスバーを描画する
	 * @param x1 左上の x 座標
	 * @param y1 左上の y 座標
	 * @param x2 右下の x 座標
	 * @param y2 右下の y 座標
	 * @param now プログレスバーで表示する現在の値
	 * @param max プログレスバーの最大値
	 * @param color1 プログレスバーの枠と背景の色
	 * @param color2 プログレスバーの色
	 * @param thickness プログレスバーの枠の太さ
	 */
	draw_progress_bar(x1: float, y1: float, x2: float, y2: float, now: float, max: float, color1: Color | string, color2: Color | string, thickness?: float): void;
	/**
	 * フォントオブジェクトを文字列に変換する
	 * @param font_object フォントオブジェクトか、フォント情報を表す文字列
	 * @returns フォント情報を表す文字列
	 */
	font_to_str(font_object: Font | string): string;
	/**
	 * カラーブジェクトを文字列に変換する
	 * @param color_object カラーオブジェクトか、カラーを表す文字列
	 * @param is_alpha_set_to_global_alpha  カラーオブジェクトの不透明度を GlobalAlpha に設定するかどうか
	 * @returns カラーを表す文字列
	 */
	color_to_str(color_object: Color | string, is_alpha_set_to_global_alpha?: boolean): string;
	/**
	 * 左下の座標を指定して文字列を描画する
	 * @param str 描画する文字列
	 * @param x 左下の x 座標
	 * @param y 左下の y 座標
	 * @param color 色
	 * @param outline_thickness アウトラインの太さ
	 * @param outline_color アウトラインの色
	 * @param font フォント
	 * @param shadow_thickness 影の太さ
	 * @param shadow_color 影の色
	 */
	draw_text(
		str: string,
		x: float,
		y: float,
		color: Color | string,
		outline_thickness?: float | null,
		outline_color?: Color | string | null,
		font?: Font | string | null,
		shadow_thickness?: float | null,
		shadow_color?: Color | null,
	): void;
	/**
	 * 基準となる座標と基準の位置を指定して文字列を描画する
	 * @param str 描画する文字列
	 * @param x 基準となる x 座標
	 * @param y 基準となる y 座標
	 * @param anchor_x 基準となる x 座標の位置
	 * @param anchor_y 基準となる y 座標の位置
	 * @param color 色
	 * @param outline_thickness アウトラインの太さ
	 * @param outline_color アウトラインの色
	 * @param font フォント
	 * @param shadow_thickness 影の太さ
	 * @param shadow_color 影の色
	 */
	draw_text_anchor(
		str: string,
		x: float,
		y: float,
		anchor_x: float,
		anchor_y: float,
		color: Color | string,
		outline_thickness?: float | null,
		outline_color?: Color | string | null,
		font?: Font | string | null,
		shadow_thickness?: float | null,
		shadow_color?: Color | null,
	): void;
	/**
	 * 右下の座標を指定して文字列を描画する
	 * @param str 描画する文字列
	 * @param x 右下の x 座標
	 * @param y 右下の y 座標
	 * @param color 色
	 * @param outline_thickness アウトラインの太さ
	 * @param outline_color アウトラインの色
	 * @param font フォント
	 */
	draw_text_right(
		str: string,
		x: float,
		y: float,
		color: Color | string,
		outline_thickness?: float | null,
		outline_color?: Color | string | null,
		font?: Font | string | null,
	): void;
	/**
	 * x が中央、y が下の座標を指定して文字列を描画する
	 * @param str 描画する文字列
	 * @param x 中央の x 座標
	 * @param y 中央下の y 座標
	 * @param color 色
	 * @param outline_thickness アウトラインの太さ
	 * @param outline_color アウトラインの色
	 * @param font フォント
	 */
	draw_text_center(
		str: string,
		x: float,
		y: float,
		color: Color | string,
		outline_thickness?: float | null,
		outline_color?: Color | string | null,
		font?: Font | string | null,
	): void;
	/**
	 * 左上の座標を指定して文字列を描画し、改行文字で改行する
	 * @param str 描画する文字列
	 * @param x 左上の x 座標
	 * @param y 左上の y 座標
	 * @param color 色
	 * @param outline_thickness アウトラインの太さ
	 * @param outline_color アウトラインの色
	 * @param font フォント
	 * @param shadow_thickness 影の太さ
	 * @param shadow_color 影の色
	 * @param text_break_margin 改行時の行間
	 */
	draw_text_new_line(
		str: string,
		x: float,
		y: float,
		color: Color | string,
		outline_thickness?: float | null,
		outline_color?: Color | string | null,
		font?: Font | string | null,
		shadow_thickness?: float | null,
		shadow_color?: Color | null,
		text_break_margin?: float,
	): void;
	/**
	 * x が中央、y が下の座標を指定して文字列を描画し、改行文字で改行する
	 * @param str 描画する文字列
	 * @param x 基準となる x 座標
	 * @param y 基準となる y 座標
	 * @param anchor_x 基準となる x 座標の位置
	 * @param anchor_y 基準となる y 座標の位置
	 * @param color 色
	 * @param outline_thickness アウトラインの太さ
	 * @param outline_color アウトラインの色
	 * @param font フォント
	 * @param shadow_thickness 影の太さ
	 * @param shadow_color 影の色
	 * @param text_break_margin 改行時の行間
	 */
	draw_text_new_line_anchor(
		str: string,
		x: float,
		y: float,
		anchor_x: float,
		anchor_y: float,
		color: Color | string,
		outline_thickness?: float | null,
		outline_color?: Color | string | null,
		font?: Font | string | null,
		shadow_thickness?: float | null,
		shadow_color?: Color | null,
		text_break_margin?: float,
	): void;
	/**
	 * 左下の座標を指定してカラーコードありの文字列を描画する ( <#ff0000>red</> のように <> の中にカラーコードを記載して </> で閉じるまでの箇所が指定されたカラーコードになる )
	 * @param str 描画する文字列
	 * @param x 左下の x 座標
	 * @param y 左下の y 座標
	 * @param default_color デフォルトの色
	 * @param outline_thickness アウトラインの太さ
	 * @param outline_color アウトラインの色
	 * @param font フォント
	 * @param shadow_thickness 影の太さ
	 * @param shadow_color 影の色
	 * @example ctx.draw_text_color_tag("white<#ff0000>red</>white<#00ff00>green</><#0000ff>blue</>", 100, 100, Color.white);
	 */
	draw_text_color_tag(
		str: string,
		x: float,
		y: float,
		default_color: Color | string,
		outline_thickness?: float | null,
		outline_color?: Color | string | null,
		font?: Font | string | null,
		shadow_thickness?: float | null,
		shadow_color?: Color | null,
	): void;
	/**
	 * 右下の座標を指定してカラーコードありの文字列を描画する ( <#ff0000>red</> のように <> の中にカラーコードを記載して </> で閉じるまでの箇所が指定されたカラーコードになる )
	 * @param str 描画する文字列
	 * @param x 基準となる x 座標
	 * @param y 基準となる y 座標
	 * @param anchor_x 基準となる x 座標の位置
	 * @param anchor_y 基準となる y 座標の位置
	 * @param color 色
	 * @param outline_thickness アウトラインの太さ
	 * @param outline_color アウトラインの色
	 * @param font フォント
	 * @param shadow_thickness 影の太さ
	 * @param shadow_color 影の色
	 * @example ctx.draw_text_color_tag_anchor("white<#ff0000>red</>white<#00ff00>green</><#0000ff>blue</>", 100, 100, Color.white);
	 */
	draw_text_color_tag_anchor(
		str: string,
		x: float,
		y: float,
		anchor_x: float,
		anchor_y: float,
		color: Color | string,
		outline_thickness?: float | null,
		outline_color?: Color | string | null,
		font?: Font | string | null,
		shadow_thickness?: float | null,
		shadow_color?: Color | null,
	): void;
	/**
	 * 左上の座標を指定してカラーコードありの文字列を描画し、改行文字で改行する ( <#ff0000>red</> のように <> の中にカラーコードを記載して </> で閉じるまでの箇所が指定されたカラーコードになる )
	 * @param str 描画する文字列
	 * @param x 左下の x 座標
	 * @param y 左下の y 座標
	 * @param color 色
	 * @param outline_thickness アウトラインの太さ
	 * @param outline_color アウトラインの色
	 * @param font フォント
	 * @param shadow_thickness 影の太さ
	 * @param shadow_color 影の色
	 * @param text_break_margin 改行時の行間
	 * @example ctx.draw_text_new_line_color_tag("white<#ff0000>red</>white<#00ff00>green</><#0000ff>blue</>", 100, 100, Color.white);
	 */
	draw_text_new_line_color_tag(
		str: string,
		x: float,
		y: float,
		color: Color | string,
		outline_thickness?: float | null,
		outline_color?: Color | string | null,
		font?: Font | string | null,
		shadow_thickness?: float | null,
		shadow_color?: Color | null,
		text_break_margin?: float,
	): void;
	/**
	 * x が中央、y が下の座標を指定してカラーコードありの文字列を描画し、改行文字で改行する ( <#ff0000>red</> のように <> の中にカラーコードを記載して </> で閉じるまでの箇所が指定されたカラーコードになる )
	 * @param str 描画する文字列
	 * @param x 基準となる x 座標
	 * @param y 基準となる y 座標
	 * @param anchor_x 基準となる x 座標の位置
	 * @param anchor_y 基準となる y 座標の位置
	 * @param color 色
	 * @param outline_thickness アウトラインの太さ
	 * @param outline_color アウトラインの色
	 * @param font フォント
	 * @param shadow_thickness 影の太さ
	 * @param shadow_color 影の色
	 * @param text_break_margin 改行時の行間
	 * @example ctx.draw_text_new_line_color_tag_anchor("white<#ff0000>red</>white<#00ff00>green</><#0000ff>blue</>", 100, 100, Color.white);
	 */
	draw_text_new_line_color_tag_anchor(
		str: string,
		x: float,
		y: float,
		anchor_x: float,
		anchor_y: float,
		color: Color | string,
		outline_thickness?: float | null,
		outline_color?: Color | string | null,
		font?: Font | string | null,
		shadow_thickness?: float | null,
		shadow_color?: Color | null,
		text_break_margin?: float,
	): void;
	/**
	 * フォントを適応した文字の横幅を取得する
	 * @param str 横幅を取得する文字列
	 * @param font 適応するフォント ( 指定しない場合はデフォルトのフォント )
	 */
	get_width_str(str: string, font?: Font | string | null): float;
	/**
	 * フォントを適応した文字の高さを取得する
	 * @param str 高さを取得する文字列
	 * @param font 適応するフォント ( 指定しない場合はデフォルトのフォント )
	 */
	get_height_str(str: string, font?: Font | string | null): float;
	/**
	 * フォントを適応した文字の大きさを取得する
	 * @param str 大きさを取得する文字列
	 * @param font 適応するフォント ( 指定しない場合はデフォルトのフォント )
	 */
	get_size_str(str: string, font?: Font | string | null): Vector2;
	/**
	 * 改行を考慮してフォントを適応した文字の横幅を取得する
	 * @param str 横幅を取得する文字列
	 * @param font 適応するフォント ( 指定しない場合はデフォルトのフォント )
	 */
	get_width_str_new_line(str: string, font?: Font | string | null): float;
	/**
	 * 改行を考慮してフォントを適応した文字の高さを取得する
	 * @param str 高さを取得する文字列
	 * @param font 適応するフォント ( 指定しない場合はデフォルトのフォント )
	 * @param text_break_margin 改行時の行間
	 */
	get_height_str_new_line(str: string, font?: Font | string | null, text_break_margin?: float): float;
	/**
	 * 改行を考慮してフォントを適応した文字の大きさを取得する
	 * @param str 大きさを取得する文字列
	 * @param font 適応するフォント ( 指定しない場合はデフォルトのフォント )
	 * @param text_break_margin 改行時の行間
	 */
	get_size_str_new_line(str: string, font?: Font | string | null, text_break_margin?: float): Vector2;
	/**
	 * 画像を描画する
	 * @param img 描画する画像
	 * @param x 描画する左上の x 座標
	 * @param y 描画する左上の y 座標
	 * @param width 描画する画像の横幅 ( 指定しない場合は画像サイズのまま描画する )
	 * @param height 描画する画像の高さ ( 指定しない場合は画像サイズのまま描画する )
	 * @param sx 画像の一部を表示する場合に指定する、表示する範囲の左上の x 座標
	 * @param sy 画像の一部を表示する場合に指定する、表示する範囲の左上の y 座標
	 * @param s_width 画像の一部を表示する場合に指定する、表示する範囲の横幅
	 * @param s_height 画像の一部を表示する場合に指定する、表示する範囲の高さ
	 */
	draw_image(img: HTMLImageElement | HTMLCanvasElement, x: float, y: float, width?: float | null, height?: float | null, sx?: float | null, sy?: float | null, s_width?: float | null, s_height?: float | null): void;
	/**
	 * 基準となる座標と基準の位置を指定して画像を描画する
	 * @param img 描画する画像
	 * @param x 描画する左上の x 座標
	 * @param y 描画する左上の y 座標
	 * @param width 描画する画像の横幅 ( 指定しない場合は画像サイズのまま描画する )
	 * @param height 描画する画像の高さ ( 指定しない場合は画像サイズのまま描画する )
	 * @param anchor_x 基準となる x 座標の位置
	 * @param anchor_y 基準となる y 座標の位置
	 */
	draw_image_anchor(img: HTMLImageElement | HTMLCanvasElement, x: float, y: float, width?: float | null, height?: float | null, anchor_x?: float, anchor_y?: float): void;
	/**
	 * 画像を回転描画する
	 * @param img 描画する画像
	 * @param x 画像を描画する中心の x 座標
	 * @param y 画像を描画する中心の y 座標
	 * @param angle 回転する角度
	 * @param scale 表示する画像の拡大率
	 * @param sx 画像の一部を表示する場合に指定する、表示する範囲の左上の x 座標
	 * @param sy 画像の一部を表示する場合に指定する、表示する範囲の左上の y 座標
	 * @param s_width 画像の一部を表示する場合に指定する、表示する範囲の横幅
	 * @param s_height 画像の一部を表示する場合に指定する、表示する範囲の高さ
	 */
	draw_rota_image(img: HTMLImageElement | HTMLCanvasElement, x: float, y: float, angle?: angle_t, scale?: float, sx?: float | null, sy?: float | null, s_width?: float | null, s_height?: float | null): void;
	/**
	 * 画像を疑似的に 3D 描画する
	 * @param img 描画する画像
	 * @param x 画像を描画する中心の x 座標
	 * @param y 画像を描画する中心の y 座標
	 * @param angle_x 画像の回転角度 ( オイラー x 軸 )
	 * @param angle_y 画像の回転角度 ( オイラー y 軸 )
	 * @param angle_z 画像の回転角度 ( オイラー z 軸 )
	 * @param scale 表示する画像の拡大率
	 */
	draw_rota_image_3d(img: HTMLImageElement | HTMLCanvasElement, x: float, y: float, angle_x?: angle_t, angle_y?: angle_t, angle_z?: angle_t, scale?: float): void;
	/**
	 * シームレス画像を指定された範囲に描画する
	 * @param img 描画する画像
	 * @param screen_x 描画範囲の横幅
	 * @param screen_y 描画範囲の高さ
	 * @param image_x 画像の横幅
	 * @param image_y 画像の高さ
	 * @param additional_x x 方向のスクロール量
	 * @param additional_y y 方向のスクロール量
	 * @param x 描画開始座標
	 * @param y 描画開始座標
	 * @returns 描画後した画像の枚数
	 */
	draw_seamless_image(img: any, screen_x: int, screen_y: int, image_x: int, image_y: int, additional_x: float, additional_y: float, x?: float, y?: float): int;
	/**
	 * 各辺と中央で 9 つに分割された画像を結合して一つの画像として描画する
	 * @param split9_images 各辺と中央で分割された 9 つの画像
	 * @param ul_pos 結合された画像の左上の座標
	 * @param br_pos 結合された画像の右下の座標
	 * @param boarder_scale 中央以外の 8 画像を描画する拡大率
	 */
	draw_split9_image(split9_images: split9_images_t, ul_pos: Vector2, br_pos: Vector2, boarder_scale?: float): void;
}
CanvasRenderingContext2D.prototype.draw_line = function (x1, y1, x2, y2, color, thickness = 1): void {
	this.save();
	this.strokeStyle = this.color_to_str(color);
	this.lineWidth = thickness;
	this.beginPath();
	this.moveTo(x1, y1);
	this.lineTo(x2, y2);
	this.stroke();
	this.restore();
};
CanvasRenderingContext2D.prototype.draw_box = function (x1, y1, x2, y2, color, is_filled = true, thickness = 1, angle = 0): void {
	this.save();
	this.translate((x1 + x2) / 2, (y1 + y2) / 2);		// 回転の中心点を設定
	this.rotate(angle);									// 指定された角度だけ回転させる
	this.translate(-(x1 + x2) / 2, -(y1 + y2) / 2);		// 中心点を元に戻す

	this.lineWidth = thickness;
	this.beginPath();
	if (is_filled) {
		this.rect(x1, y1, x2 - x1, y2 - y1);
		this.fillStyle = this.color_to_str(color);
		this.fill();
	}
	else {
		this.rect(x1 + (thickness - 1) / 2, y1 + (thickness - 1) / 2, x2 - x1 - (thickness - 1), y2 - y1 - (thickness - 1));
		this.strokeStyle = this.color_to_str(color);
		this.stroke();
	}
	this.restore();
};
CanvasRenderingContext2D.prototype.draw_polygon = function (vertices, color, is_filled = true, thickness = 1, angle = 0): void {
	if (vertices.length < 3) throw new Error("頂点は必ず 3 つ以上指定してください");
	this.save();

	const center = new Vector2(vertices.map(pos => pos.x).average(), vertices.map(pos => pos.y).average());
	this.translate(center.x, center.y);
	this.rotate(angle);
	this.translate(-center.x, -center.y);

	this.lineWidth = thickness;
	this.beginPath();
	this.moveTo(vertices.first().x, vertices.first().y);
	for (let i = 1; i < vertices.length; i++) this.lineTo(vertices[i].x, vertices[i].y);
	this.closePath();

	if (is_filled) {
		this.fillStyle = this.color_to_str(color);
		this.fill();
	}
	else {
		this.strokeStyle = this.color_to_str(color);
		this.stroke();
	}
	this.restore();
};
CanvasRenderingContext2D.prototype.draw_circle = function (x, y, radius, color, is_filled = true, thickness = 1, start_angle = 0, end_angle = Math.PI * 2, counterclockwise = false): void {
	this.save();
	this.lineWidth = thickness;
	this.beginPath();
	if (is_filled) {
		this.arc(x, y, radius, start_angle, end_angle, counterclockwise);
		this.fillStyle = this.color_to_str(color);
		this.fill();
	}
	else {
		this.arc(x, y, radius - (thickness - 1) / 2, start_angle, end_angle, counterclockwise);
		this.strokeStyle = this.color_to_str(color);
		this.stroke();
	}
	this.restore();
};
CanvasRenderingContext2D.prototype.draw_triangle = function (x, y, base_length, height, color, is_filled = true, thickness = 1, angle = 0): void {
	this.save();
	this.translate(x, y);								// 回転の中心点を設定
	this.rotate(angle);									// 指定された角度だけ回転させる
	this.translate(-x, -y);								// 中心点を元に戻す

	this.lineWidth = thickness;
	this.beginPath();
	if (is_filled) {
		this.moveTo(x, y - height / 2);
		this.lineTo(x - base_length / 2, y + height / 2);
		this.lineTo(x + base_length / 2, y + height / 2);
		this.closePath();
		this.fillStyle = this.color_to_str(color);
		this.fill();
	}
	else {
		this.moveTo(x, y - height / 2 + (thickness - 1) / 2);
		this.lineTo(x - base_length / 2 + (thickness - 1) / 2, y + height / 2 - (thickness - 1) / 2);
		this.lineTo(x + base_length / 2 - (thickness - 1) / 2, y + height / 2 - (thickness - 1) / 2);
		this.closePath();
		this.strokeStyle = this.color_to_str(color);
		this.stroke();
	}
	this.restore();
};
CanvasRenderingContext2D.prototype.draw_progress_bar = function (x1, y1, x2, y2, now, max, color1, color2, thickness = 5): void {
	this.draw_box(x1, y1, x2, y2, color1);
	x2 = x1 + ((x2 - x1) - thickness * 2) * Math.clamp_zero_to_one(now / max) + thickness * 2;
	this.draw_box(x1 + thickness, y1 + thickness, x2 - thickness, y2 - thickness, color2);
};
CanvasRenderingContext2D.prototype.font_to_str = function (font_object): string {
	if (typeof font_object == "string") return font_object;
	if (font_object instanceof Font) return font_object.to_str();
	throw new TypeError("不明なオブジェクトが渡されました");
};
CanvasRenderingContext2D.prototype.color_to_str = function (color_object, is_alpha_set_to_global_alpha = true): string {
	if (typeof color_object == "string") return color_object;
	if (color_object instanceof Color) {
		if (is_alpha_set_to_global_alpha) this.globalAlpha = color_object.opacity;
		return color_object.to_str();
	}
	throw new TypeError("不明なオブジェクトが渡されました");
};
CanvasRenderingContext2D.prototype.draw_text = function (str, x, y, color, outline_thickness = 0, outline_color = Color.white, font = null, shadow_thickness = null, shadow_color = Color.white): void {
	this.save();
	if (font !== null) this.font = this.font_to_str(font);
	if (shadow_thickness) {
		this.shadowBlur = shadow_thickness;
		this.shadowColor = this.color_to_str(shadow_color ?? Color.white);
	}
	if (outline_thickness) {
		this.lineWidth = outline_thickness * 2;
		this.strokeStyle = this.color_to_str(outline_color ?? Color.white);
		this.strokeText(str, x, y);
		if (shadow_thickness) this.shadowBlur = 0;
	}
	this.fillStyle = this.color_to_str(color);
	this.fillText(str, x, y);
	this.restore();
};
CanvasRenderingContext2D.prototype.draw_text_anchor = function (str, x, y, anchor_x, anchor_y, color, outline_thickness = 0, outline_color = Color.white, font = null, shadow_thickness = 0, shadow_color = Color.white): void {
	this.draw_text(str, x - this.get_width_str(str, font) * anchor_x, y + this.get_height_str(str, font) * (1 - anchor_y), color, outline_thickness, outline_color, font, shadow_thickness, shadow_color);
};
CanvasRenderingContext2D.prototype.draw_text_right = function (str, x, y, color, outline_thickness = 0, outline_color = Color.white, font = null): void {
	this.draw_text_anchor(str, x, y, 1, 1, color, outline_thickness, outline_color, font);
};
CanvasRenderingContext2D.prototype.draw_text_center = function (str, x, y, color, outline_thickness = 0, outline_color = Color.white, font = null): void {
	this.draw_text_anchor(str, x, y, 0.5, 1, color, outline_thickness, outline_color, font);
};
CanvasRenderingContext2D.prototype.draw_text_new_line = function (str, x, y, color, outline_thickness = 0, outline_color = Color.white, font = null, shadow_thickness = 0, shadow_color = Color.white, text_break_margin = TEXT_BREAK_MARGIN): void {
	for (const row of str.split("\n")) {
		this.draw_text_anchor(row, x, y, 0, 0, color, outline_thickness, outline_color, font, shadow_thickness, shadow_color);
		y += this.get_height_str(is_empty(row) ? DUMMY_TEXT : row, font) + text_break_margin;
	}
};
CanvasRenderingContext2D.prototype.draw_text_new_line_anchor = function (str, x, y, anchor_x: float, anchor_y: float, color, outline_thickness = 0, outline_color = Color.white, font = null, shadow_thickness = 0, shadow_color = Color.white, text_break_margin = TEXT_BREAK_MARGIN): void {
	const texts = str.split("\n");
	y -= this.get_height_str_new_line(texts.slice(1).join("\n"), font, text_break_margin) * anchor_y;
	for (const row of texts) {
		this.draw_text_anchor(row, x, y, anchor_x, anchor_y, color, outline_thickness, outline_color, font, shadow_thickness, shadow_color);
		y += this.get_height_str(is_empty(row) ? DUMMY_TEXT : row, font) + text_break_margin;
	}
};
CanvasRenderingContext2D.prototype.draw_text_color_tag = function (str, x, y, default_color, outline_thickness = 0, outline_color = Color.white, font = null, shadow_thickness = 0, shadow_color = Color.white): void {
	const PADDING = 2;
	let current_x = 0;				// 現在描画したところまでの x 座標
	let current_position = 0;		// 現在描画したところまでの文字数
	let match = null;
	while ((match = TAG_PATTERN.exec(str)) !== null) {
		this.draw_text(str.slice(current_position, match.index), x + current_x, y, default_color, outline_thickness, outline_color, font, shadow_thickness, shadow_color);		// タグに囲まれていない箇所を描画する
		if (match.index - current_position > 0) current_x += this.get_width_str(str.slice(current_position, match.index), font) + PADDING;											// 描画した文字があれば今回描画したところまでを加算 ( 空の場合は PADDING が重複して加算されてしまわないようにする )
		this.draw_text(match[2], x + current_x, y, `#${match[1]}`, outline_thickness, outline_color, font, shadow_thickness, shadow_color);										// タグに囲まれている箇所をタグの色で

		if (match[2]) current_x += this.get_width_str(match[2], font) + PADDING;		// 描画した文字があれば今回描画したところまでを加算 ( 空の場合は PADDING が重複して加算されてしまわないようにする )
		current_position = match.index + match[0].length;
	}

	this.draw_text(str.slice(Math.max(0, current_position)), x + current_x, y, default_color, outline_thickness, outline_color, font, shadow_thickness, shadow_color);
};
CanvasRenderingContext2D.prototype.draw_text_color_tag_anchor = function (str, x, y, anchor_x: float, anchor_y: float, color, outline_thickness = 0, outline_color = Color.white, font = null, shadow_thickness = 0, shadow_color = Color.white): void {
	const str_no_tag = str.replaceAll(TAG_PATTERN, "$2");
	this.draw_text_color_tag(str, x - this.get_width_str(str_no_tag, font) * anchor_x, y + this.get_height_str(str, font) * (1 - anchor_y), color, outline_thickness, outline_color, font, shadow_thickness, shadow_color);
};
CanvasRenderingContext2D.prototype.draw_text_new_line_color_tag = function (str, x, y, color, outline_thickness = 0, outline_color = Color.white, font = null, shadow_thickness = 0, shadow_color = Color.white, text_break_margin = TEXT_BREAK_MARGIN): void {
	const texts = str.split("\n");
	const texts_no_tag = str.replaceAll(TAG_PATTERN, "$2").split("\n");
	if (texts.length !== texts_no_tag.length) print_error_log("正常にカラータグと改行を処理できませんでした");

	y += this.get_height_str(is_empty(texts_no_tag[0]) ? DUMMY_TEXT : texts_no_tag[0], font) + 1;
	for (const [i, text] of texts.entries()) {
		this.draw_text_color_tag(text, x, y, color, outline_thickness, outline_color, font, shadow_thickness, shadow_color);
		y += this.get_height_str(is_empty(texts_no_tag[i]) ? DUMMY_TEXT : texts_no_tag[i], font) + text_break_margin;
	}
};
CanvasRenderingContext2D.prototype.draw_text_new_line_color_tag_anchor = function (str, x, y, anchor_x: float, anchor_y: float, color, outline_thickness = 0, outline_color = Color.white, font = null, shadow_thickness = 0, shadow_color = Color.white, text_break_margin = TEXT_BREAK_MARGIN): void {
	const texts = str.split("\n");
	const texts_no_tag = str.replaceAll(TAG_PATTERN, "$2").split("\n");
	if (texts.length !== texts_no_tag.length) print_error_log("正常にカラータグと改行を処理できませんでした");

	y -= this.get_height_str_new_line(texts_no_tag.slice(1).join("\n"), font, text_break_margin) * anchor_y;
	for (const [i, text] of texts.entries()) {
		this.draw_text_color_tag_anchor(text, x, y, anchor_x, anchor_y, color, outline_thickness, outline_color, font, shadow_thickness, shadow_color);
		y += this.get_height_str(is_empty(texts_no_tag[i]) ? DUMMY_TEXT : texts_no_tag[i], font) + text_break_margin;
	}
};
CanvasRenderingContext2D.prototype.get_width_str = function (str, font = null): float {
	this.save();
	if (font !== null) this.font = this.font_to_str(font);
	const width = this.measureText(str).width;
	this.restore();
	return width;
};
CanvasRenderingContext2D.prototype.get_height_str = function (str, font = null): float {
	this.save();
	if (font !== null) this.font = this.font_to_str(font);
	const height = this.measureText(str).actualBoundingBoxAscent + this.measureText(str).actualBoundingBoxDescent;
	this.restore();
	return height;
};
CanvasRenderingContext2D.prototype.get_size_str = function (str, font = null): Vector2 {
	return new Vector2(this.get_width_str(str, font), this.get_height_str(str, font));
};
CanvasRenderingContext2D.prototype.get_width_str_new_line = function (str, font = null): float {
	return str.split("\n").map(text => this.get_width_str(text, font)).max();
};
CanvasRenderingContext2D.prototype.get_height_str_new_line = function (str, font = null, text_break_margin = TEXT_BREAK_MARGIN): float {
	if (str.includes("\n") == false && is_empty(str)) return 0;		// 改行文字がなく、表示される文字がない場合は 0 を返す
	text_break_margin++;
	return str.split("\n").map(text => is_empty(text) ? DUMMY_TEXT : text).map(text => this.get_height_str(text, font) + text_break_margin).sum() - text_break_margin;
};
CanvasRenderingContext2D.prototype.get_size_str_new_line = function (str, font = null, text_break_margin = TEXT_BREAK_MARGIN): Vector2 {
	return new Vector2(this.get_width_str_new_line(str, font), this.get_height_str_new_line(str, font, text_break_margin));
};
CanvasRenderingContext2D.prototype.draw_image = function (img, x, y, width = null, height = null, sx = null, sy = null, s_width = null, s_height = null): void {
	if (sx !== null && sy !== null) {
		s_width ??= width;
		s_height ??= height;

		if (s_width === null || s_height === null || width === null || height === null) {
			throw new Error("引数が正しくありません");
		}
		this.drawImage(img, sx, sy, s_width, s_height, x, y, width, height);
	}
	else {
		width ??= img?.width;
		height ??= img?.height;

		if (width === null || height === null || width === undefined || height === undefined) {
			return;										// 正常ではない画像の場合は描画しない
		}
		this.drawImage(img, x, y, width, height);
	}
};
CanvasRenderingContext2D.prototype.draw_image_anchor = function (img, x, y, width = null, height = null, anchor_x = 0, anchor_y = 0): void {
	width ??= img.width;
	height ??= img.height;
	this.draw_image(img, x - width * anchor_x, y - height * anchor_y, width, height);
};
CanvasRenderingContext2D.prototype.draw_rota_image = function (img, x, y, angle = 0, scale = 1, sx = null, sy = null, s_width = null, s_height = null): void {
	this.save();
	if (angle != 0) {		// 画像を回転する
		this.setTransform(
			Math.cos(angle),
			Math.sin(angle),
			-Math.sin(angle),
			Math.cos(angle),
			x - x * Math.cos(angle) + y * Math.sin(angle),
			y - x * Math.sin(angle) - y * Math.cos(angle),
		);
	}
	if (scale != 1) {
		this.scale(scale, scale);
	}
	if (sx !== null && sy !== null && s_width !== null && s_height !== null) {
		this.drawImage(img, sx, sy, s_width * scale, s_height * scale, x / scale - s_width / 2, y / scale - s_height / 2, s_width, s_height);
	}
	else {
		this.drawImage(img, x / scale - img.width / 2, y / scale - img.height / 2);
	}
	this.restore();
};
CanvasRenderingContext2D.prototype.draw_rota_image_3d = function (img, x, y, angle_x = 0, angle_y = 0, angle_z = 0, scale = 1): void {
	this.save();
	angle_x = Math.clamp_angle(angle_x * 2 + Math.PI);
	if (angle_x > Math.PI) angle_x = Math.PI * 2 - angle_x;
	angle_y = Math.clamp_angle(angle_y * 2 + Math.PI);
	if (angle_y > Math.PI) angle_y = Math.PI * 2 - angle_y;

	if (angle_z != 0) {			// 画像を回転する
		this.setTransform(
			Math.cos(angle_z),
			Math.sin(angle_z),
			-Math.sin(angle_z),
			Math.cos(angle_z),
			x - x * Math.cos(angle_z) + y * Math.sin(angle_z),
			y - x * Math.sin(angle_z) - y * Math.cos(angle_z),
		);
	}
	if (scale) {
		this.scale(scale * (angle_y / Math.PI), scale * (angle_x / Math.PI));
	}

	this.drawImage(img, (x / (scale * (angle_y / Math.PI)) - img.width / 2), (y / (scale * (angle_x / Math.PI)) - img.height / 2), img.width, img.height);		// 画像を描画
	this.restore();
};
CanvasRenderingContext2D.prototype.draw_seamless_image = function (img, screen_width, screen_height, image_width, image_height, additional_x, additional_y, x = 0, y = 0): int {
	const start_x = -image_width + (additional_x % image_width) + x;
	const start_y = -image_height + (additional_y % image_height) + y;
	let count = 0;

	for (let iy = start_y; iy < screen_height; iy += image_height) {
		for (let ix = start_x; ix < screen_width; ix += image_width) {
			this.draw_image(img, Math.floor(ix), Math.floor(iy), image_width, image_height);
			count++;
		}
	}
	return count;
};
CanvasRenderingContext2D.prototype.draw_split9_image = function (split9_images, ul_pos, br_pos, boarder_scale = 1): void {
	ul_pos = ul_pos.round();
	br_pos = br_pos.round();
	const size = br_pos.sub(ul_pos);
	const ul_size = new Vector2(split9_images.nw.width, split9_images.nw.height).mul(boarder_scale).round();
	const br_size = new Vector2(split9_images.se.width, split9_images.se.width).mul(boarder_scale).round();
	this.draw_image(split9_images.n, ul_pos.x + ul_size.x, ul_pos.y, size.x - ul_size.x - br_size.x, ul_size.y);									// 上
	this.draw_image(split9_images.s, ul_pos.x + ul_size.x, br_pos.y - br_size.y, size.x - ul_size.x - br_size.x, br_size.y);						// 下
	this.draw_image(split9_images.e, br_pos.x - br_size.x, ul_pos.y + ul_size.x, br_size.x, size.y - ul_size.y - br_size.y);						// 右
	this.draw_image(split9_images.w, ul_pos.x, ul_pos.y + ul_size.y, ul_size.x, size.y - ul_size.y - br_size.y);									// 左
	this.draw_image(split9_images.ne, br_pos.x - br_size.x, ul_pos.y, br_size.x, ul_size.y);														// 右上
	this.draw_image(split9_images.nw, ul_pos.x, ul_pos.y, ul_size.x, ul_size.y);																	// 左上
	this.draw_image(split9_images.se, br_pos.x - br_size.x, br_pos.y - br_size.y, br_size.x, br_size.y);											// 右下
	this.draw_image(split9_images.sw, ul_pos.x, br_pos.y - br_size.y, ul_size.x, br_size.y);														// 左下
	this.draw_image(split9_images.c, ul_pos.x + ul_size.x, ul_pos.y + ul_size.y, size.x - ul_size.x - br_size.x, size.y - ul_size.y - br_size.y);	// 中央
};



/** DOMRectReadOnly クラスの拡張メソッド */
interface DOMRectReadOnly {
	/**
	 * DOMRectReadOnly オブジェクトの座標を Vector2 に変換する
	 * @returns 座標を表す Vector2
	 */
	to_vector2(): Vector2;
}
DOMRectReadOnly.prototype.to_vector2 = function (): Vector2 {
	return new Vector2(this.x, this.y);
};



// 上級者向けのメソッドチェーンクラス
/** テキストデータのテンプレート */
interface text_data_template_t {
	/** 文字色 */
	color: Color;
	/** フォント */
	font: Font;
	/** アウトラインの太さ */
	outline_thickness: float;
	/** アウトラインの色 */
	outline_color: Color;
	/** 影の太さ */
	shadow_thickness: float;
	/** 影の色 */
	shadow_color: Color;
}

/** テキストデータのデフォルト値 */
const DEFAULT_TEXT_DATA_TEMPLATE: text_data_template_t = {
	color: Color.white,
	font: new Font(),
	outline_thickness: 0,
	outline_color: Color.brightblack,
	shadow_thickness: 0,
	shadow_color: Color.white,
};

/** 文字列を描画する時の情報を保持するクラス */
class TextData {
	/** 描画する文字列 */
	private _text: string;
	/** 値が設定されていないときに使用するテンプレート */
	private _template: text_data_template_t;
	/** 文字列を描画する座標の基準となる位置 */
	private readonly _anchor: Vector2;
	/** 改行を含む文字列を描画するときの行間 */
	private _text_break_margin: float;

	/** @class */
	constructor() {
		this._text = "";
		this._template = {
			color: DEFAULT_TEXT_DATA_TEMPLATE.color.copy(),
			font: DEFAULT_TEXT_DATA_TEMPLATE.font.copy(),
			outline_thickness: DEFAULT_TEXT_DATA_TEMPLATE.outline_thickness,
			outline_color: DEFAULT_TEXT_DATA_TEMPLATE.outline_color.copy(),
			shadow_thickness: DEFAULT_TEXT_DATA_TEMPLATE.shadow_thickness,
			shadow_color: DEFAULT_TEXT_DATA_TEMPLATE.shadow_color.copy(),
		};
		this._anchor = new Vector2(0, 1);
		this._text_break_margin = TEXT_BREAK_MARGIN;
	}
	/**
	 * テキストデータを複製する
	 * @returns 複製されたテキストデータ
	 */
	public copy(): TextData {
		const text_data = new TextData();
		text_data._text = this._text;
		text_data._template.color = this._template.color.copy();
		text_data._template.font = this._template.font.copy();
		text_data._template.outline_thickness = this._template.outline_thickness;
		text_data._template.outline_color = this._template.outline_color.copy();
		text_data._template.shadow_thickness = this._template.shadow_thickness;
		text_data._template.shadow_color = this._template.shadow_color.copy();
		text_data._anchor.set(this._anchor);
		return text_data;
	}
	/**
	 * 描画するテキストを取得する
	 * @returns 描画する文字列
	 */
	public text(): string;
	/**
	 * 描画するテキストを設定する
	 * @param text 描画する文字列
	 * @returns 渡された値を設定したテキストデータ
	 */
	public text(text: string): TextData;
	/** @inheritdoc */
	public text(text?: string): TextData | string {
		if (text === undefined) return this._text;
		const text_data = this.copy();
		text_data._text = text;
		return text_data;
	}
	/**
	 * 文字色を取得する
	 * @returns 文字色
	 */
	public color(): Color;
	/**
	 * 文字色を設定する
	 * @param color 文字色
	 * @returns 渡された値を設定したテキストデータ
	 */
	public color(color: Color): TextData;
	/** @inheritdoc */
	public color(color?: Color): TextData | Color {
		if (color === undefined) return this._template.color.copy();
		const text_data = this.copy();
		text_data._template.color = color.copy();
		return text_data;
	}
	/**
	 * フォントを取得する
	 * @returns フォント
	 */
	public font(): Font;
	/**
	 * フォントを設定する
	 * @param font フォント
	 * @returns 渡された値を設定したテキストデータ
	 */
	public font(font: Font): TextData;
	/** @inheritdoc */
	public font(font?: Font): TextData | Font {
		if (font === undefined) return this._template.font.copy();
		const text_data = this.copy();
		text_data._template.font = font.copy();
		return text_data;
	}
	/**
	 * アウトラインの太さを取得する
	 * @returns アウトラインの太さ
	 */
	public outline_thickness(): float;
	/**
	 * アウトラインの太さを設定する
	 * @param outline_thickness アウトラインの太さ
	 * @returns 渡された値を設定したテキストデータ
	 */
	public outline_thickness(outline_thickness: float): TextData;
	/** @inheritdoc */
	public outline_thickness(outline_thickness?: float): TextData | float {
		if (outline_thickness === undefined) return this._template.outline_thickness;
		const text_data = this.copy();
		text_data._template.outline_thickness = outline_thickness;
		return text_data;
	}
	/**
	 * アウトラインの色を取得する
	 * @returns アウトラインの色
	 */
	public outline_color(): Color;
	/**
	 * アウトラインの色を設定する
	 * @param outline_color アウトラインの色
	 * @returns 渡された値を設定したテキストデータ
	 */
	public outline_color(outline_color: Color): TextData;
	/** @inheritdoc */
	public outline_color(outline_color?: Color): TextData | Color {
		if (outline_color === undefined) return this._template.outline_color.copy();
		const text_data = this.copy();
		text_data._template.outline_color = outline_color.copy();
		return text_data;
	}
	/**
	 * 影の太さを取得する
	 * @returns 影の太さ
	 */
	public shadow_thickness(): float;
	/**
	 * 影の太さを設定する
	 * @param shadow_thickness 影の太さ
	 * @returns 渡された値を設定したテキストデータ
	 */
	public shadow_thickness(shadow_thickness: float): TextData;
	/** @inheritdoc */
	public shadow_thickness(shadow_thickness?: float): TextData | float {
		if (shadow_thickness === undefined) return this._template.shadow_thickness;
		const text_data = this.copy();
		text_data._template.shadow_thickness = shadow_thickness;
		return text_data;
	}
	/**
	 * 影の色を取得する
	 * @returns 影の色
	 */
	public shadow_color(): Color;
	/**
	 * 影の色を設定する
	 * @param shadow_color 影の色
	 * @returns 渡された値を設定したテキストデータ
	 */
	public shadow_color(shadow_color: Color): TextData;
	/** @inheritdoc */
	public shadow_color(shadow_color?: Color): TextData | Color {
		if (shadow_color === undefined) return this._template.shadow_color.copy();
		const text_data = this.copy();
		text_data._template.shadow_color = shadow_color.copy();
		return text_data;
	}
	/**
	 * アンカーを取得する
	 * @returns アンカー
	 */
	public anchor(): Vector2;
	/**
	 * アンカーを設定する
	 * @param anchor アンカー
	 * @returns 渡された値を設定したテキストデータ
	 */
	public anchor(anchor: Vector2): TextData;
	/** @inheritdoc */
	public anchor(anchor?: Vector2): TextData | Vector2 {
		if (anchor === undefined) return this._anchor.copy();
		const text_data = this.copy();
		text_data._anchor.set(anchor);
		return text_data;
	}
	/**
	 * 改行を含む文字列を描画するときの行間を取得する
	 * @returns 行間
	 */
	public text_break_margin(): float;
	/**
	 * 改行を含む文字列を描画するときの行間を設定する
	 * @param text_break_margin 行間
	 * @returns 渡された値を設定したテキストデータ
	 */
	public text_break_margin(text_break_margin: float): TextData;
	/** @inheritdoc */
	public text_break_margin(text_break_margin?: float): TextData | float {
		if (text_break_margin === undefined) return this._text_break_margin;
		const text_data = this.copy();
		text_data._text_break_margin = text_break_margin;
		return text_data;
	}
	/**
	 * テンプレートを取得する
	 * @returns テンプレート
	 */
	public template(): text_data_template_t;
	/**
	 * テンプレートを設定する
	 * @param template テンプレート
	 * @returns 渡された値を設定したテキストデータ
	 */
	public template(template: text_data_template_t): TextData;
	/** @inheritdoc */
	public template(template?: text_data_template_t): TextData | text_data_template_t {
		if (template === undefined) return this._template;
		const text_data = this.copy();
		text_data._template = template;
		return text_data.copy();				// テンプレート内のオブジェクトをそのまま渡さないためにコピーする
	}
	/**
	 * 不透明度を取得する
	 * @returns 不透明度
	 */
	public opacity(): float;
	/**
	 * 不透明度を設定する
	 * @param opacity 不透明度
	 * @returns テキストデータ
	 */
	public opacity(opacity: float): TextData;
	/** @inheritdoc */
	public opacity(opacity?: float): TextData | float {
		if (opacity === undefined) return this._template.color.opacity;
		const text_data = this.copy();
		text_data._template.color.opacity = opacity;
		text_data._template.outline_color.opacity = opacity;
		return text_data;
	}
	/**
	 * テキストデータを描画する
	 * @param ctx 描画する CanvasRenderingContext2D
	 * @param x 基準となる x 座標
	 * @param y 基準となる y 座標
	 */
	public draw(ctx: CanvasRenderingContext2D, x: float, y: float): void {
		ctx.draw_text_anchor(this.text(), x, y, this.anchor().x, this.anchor().y, this.color(), this.outline_thickness(), this.outline_color(), this.font(), this.shadow_thickness(), this.shadow_color());
	}
	/**
	 * テキストデータを描画し、改行文字で改行する
	 * @param ctx 描画する CanvasRenderingContext2D
	 * @param x 基準となる x 座標
	 * @param y 基準となる y 座標
	 */
	public draw_new_line(ctx: CanvasRenderingContext2D, x: float, y: float): void {
		ctx.draw_text_new_line_anchor(this.text(), x, y, this.anchor().x, this.anchor().y, this.color(), this.outline_thickness(), this.outline_color(), this.font(), this.shadow_thickness(), this.shadow_color(), this.text_break_margin());
	}
	/**
	 * 文字列内にカラーコードがあるテキストデータを描画する
	 * @param ctx 描画する CanvasRenderingContext2D
	 * @param x 基準となる x 座標
	 * @param y 基準となる y 座標
	 */
	public draw_color_tag(ctx: CanvasRenderingContext2D, x: float, y: float): void {
		ctx.draw_text_color_tag_anchor(this.text(), x, y, this.anchor().x, this.anchor().y, this.color(), this.outline_thickness(), this.outline_color(), this.font(), this.shadow_thickness(), this.shadow_color());
	}
	/**
	 * 文字列内にカラーコードがあるテキストデータを描画し、改行文字で改行する
	 * @param ctx 描画する CanvasRenderingContext2D
	 * @param x 基準となる x 座標
	 * @param y 基準となる y 座標
	 */
	public draw_new_line_color_tag(ctx: CanvasRenderingContext2D, x: float, y: float): void {
		ctx.draw_text_new_line_color_tag_anchor(this.text(), x, y, this.anchor().x, this.anchor().y, this.color(), this.outline_thickness(), this.outline_color(), this.font(), this.shadow_thickness(), this.shadow_color(), this.text_break_margin());
	}
	/**
	 * テキストデータが完全に同じかどうかを比較する
	 * @param text_data 比較対象のテキストデータ
	 * @returns 完全に同じテキストデータの場合は true
	 */
	public equals(text_data: TextData): boolean {
		return this.text() === text_data.text()
			&& this.color().equals(text_data.color())
			&& this.font().equals(text_data.font())
			&& this.outline_thickness() == text_data.outline_thickness()
			&& this.outline_color().equals(text_data.outline_color())
			&& this.shadow_thickness() == text_data.shadow_thickness()
			&& this.shadow_color().equals(text_data.shadow_color());
	}
	/** 描画する文字列の横幅 */
	public get width(): float {
		return game_library.dummy_ctx.get_width_str(this.text(), this.font());
	}
	/** 描画する文字列の高さ */
	public get height(): float {
		return game_library.dummy_ctx.get_height_str(this.text(), this.font());
	}
	/** 改行を考慮してフォントを適応した文字の横幅 */
	public get width_str_new_line(): float {
		return game_library.dummy_ctx.get_width_str_new_line(this.text(), this.font());
	}
	/** 改行を考慮してフォントを適応した文字の高さ */
	public get height_str_new_line(): float {
		return game_library.dummy_ctx.get_height_str_new_line(this.text(), this.font(), this.text_break_margin());
	}
}

/** 文字列系汎用処理 */
namespace StringUtility {
	/** 半角実数かを判定する正規表現 */
	const HALF_WIDTH_NUMBER_ONLY_REGULAR_EXPRESSION = /[+-]?\d+(?:\.\d+)?/m;
	/** 半角実数または全角実数かを判定する正規表現 */
	const NUMBER_REGULAR_EXPRESSION = /[+-]?[\d０-９]+(?:\.[\d０-９]+)?/m;
	/** ひらがなかを判定する正規表現 */
	const HIRAGANA_REGULAR_EXPRESSION = /[\u{3000}-\u{301C}\u{3041}-\u{3093}\u{309B}-\u{309E}]/mu;
	/** カタカナかを判定する正規表現 */
	const KATAKANA_REGULAR_EXPRESSION = /[\u{3000}-\u{301C}\u{30A1}-\u{30F6}\u{30FB}-\u{30FE}]/mu;
	/** 漢字かを判定する正規表現 */
	const KANJI_REGULAR_EXPRESSION = /([\u{3005}\u{3007}\u{303B}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu;

	/**
	 * 全て実数かどうかを判定する
	 * @param str 文字列
	 * @param is_full_width_included 全角実数を判定に含むか
	 * @returns 全て実数か
	 */
	export function is_number(str: string, is_full_width_included: boolean = false): boolean {
		return concat_regular_expressions(["^", is_full_width_included ? NUMBER_REGULAR_EXPRESSION : HALF_WIDTH_NUMBER_ONLY_REGULAR_EXPRESSION, "$"], "mu").test(str);
	}

	/**
	 * 実数が含まれているかを判定する
	 * @param str 文字列
	 * @param is_full_width_included 全角実数を判定に含むか
	 * @returns 実数が含まれているか
	 */
	export function is_contains_number(str: string, is_full_width_included: boolean = false): boolean {
		return concat_regular_expressions(is_full_width_included ? [NUMBER_REGULAR_EXPRESSION] : [HALF_WIDTH_NUMBER_ONLY_REGULAR_EXPRESSION], "mu").test(str);
	}

	/**
	 * 全てひらがなかどうかを判定する
	 * @param str 文字列
	 * @returns 全てひらがなか
	 */
	export function is_hiragana(str: string): boolean {
		return concat_regular_expressions(["^", HIRAGANA_REGULAR_EXPRESSION, "+$"], "mu").test(str);
	}

	/**
	 * ひらがなが含まれているかを判定する
	 * @param str 文字列
	 * @returns ひらがなが含まれているか
	 */
	export function is_contains_hiragana(str: string): boolean {
		return HIRAGANA_REGULAR_EXPRESSION.test(str);
	}

	/**
	 * 全てカタカナかどうかを判定する
	 * @param str 文字列
	 * @returns 全てカタカナか
	 */
	export function is_katakana(str: string): boolean {
		return concat_regular_expressions(["^", KATAKANA_REGULAR_EXPRESSION, "+$"], "mu").test(str);
	}

	/**
	 * カタカナが含まれているかを判定する
	 * @param str 文字列
	 * @returns カタカナが含まれているか
	 */
	export function is_contains_katakana(str: string): boolean {
		return KATAKANA_REGULAR_EXPRESSION.test(str);
	}

	/**
	 * 全て漢字かどうかを判定する
	 * @param str 文字列
	 * @returns 全て漢字か
	 */
	export function is_kanji(str: string): boolean {
		return concat_regular_expressions(["^", KANJI_REGULAR_EXPRESSION, "+$"], "mu").test(str);
	}

	/**
	 * 漢字が含まれているかを判定する
	 * @param str 文字列
	 * @returns 漢字が含まれているか
	 */
	export function is_contains_kanji(str: string): boolean {
		return KANJI_REGULAR_EXPRESSION.test(str);
	}

	/**
	 * 正規表現同士を結合する
	 * @param regular_expressions 正規表現のリスト
	 * @param flags 正規表現のフラグ
	 * @returns 結合された正規表現
	 * @remarks 引数に渡された正規表現に含まれるフラグは全て破棄される
	 */
	export function concat_regular_expressions(regular_expressions: (RegExp | string)[], flags?: string): RegExp {
		return new RegExp(regular_expressions.reduce((previous, current) => previous + (current instanceof RegExp ? current.source : current), ""), flags);
	}

	/**
	 * 文字列を助詞や読点・句点で改行する
	 * @param text 文字列
	 * @param max_length 一行あたりの最大文字数
	 * @param offset 一行あたりの文字数が、最大文字数より少なくなって良い文字数 ( 区切りの良い文字を行末から探す最大文字数 )
	 * @returns 改行された文字列
	 */
	export function split_text_by_delimiter(text: string, max_length: int, offset: number): string {
		const NUMBER_OR_PERIOD_CONTAINS_REGULAR_EXPRESSION = /[\d.]/m;				// 数字の左右にピリオドがある場合、ピリオドの位置に関係なくピリオドを数字とみなす ( 2 文字ずつでしか判定しないため、数字の全容を認知できない )
		const NUMBER_OR_PERIOD_ONLY_REGULAR_EXPRESSION = concat_regular_expressions(["^", NUMBER_OR_PERIOD_CONTAINS_REGULAR_EXPRESSION, "+$"], "m");
		if (offset >= max_length) throw new Error("offset は mex_length より小さい数値を指定してください");
		if (max_length < 1) throw new Error("max_length は 1 以上を指定してください");
		if (text.trim().length <= max_length) return text;
		const result: string[] = [];
		let index = 0;
		text = text.trim();
		while (index < text.length) {
			const end_index = index + max_length - 1;		// 一行あたりの最大文字数までの文字列を検査する
			let break_position = null;
			let is_priority = false;
			text = text.slice(0, index) + text.slice(index).trimStart();
			if (end_index >= text.length - 1) {				// 現在調査中の行が最後の行の場合は
				result.push(text.slice(index).trim());		// 残りのテキストを追加して終了
				break;
			}

			if (/[、。！？]/.test(text[end_index + 1])) {
				break_position = end_index + 1;
			}
			else {
				for (let i = end_index; i > end_index - offset - 1; i--) {			// i = end_index の場合、元と改行位置は変わらないが元の改行位置がベストのため、元の改行位置を break_position に入れてそれ以降の改行判定を行わない
					if (/[、。！？]/.test(text[i])) {
						break_position = i;
						break;
					}
				}
			}
			if (break_position === null) {
				for (let i = end_index; i > end_index - offset - 1; i--) {			// i = end_index の場合、元と改行位置は変わらないが元の改行位置がベストのため、元の改行位置を break_position に入れてそれ以降の改行判定を行わない
					if (/[がにのはへを]/.test(text[i])) {
						break_position = i;
						break;
					}
				}
				if (is_priority == false) {
					for (let i = end_index + 1; i > end_index - offset; i--) {		// end_index の +1 は文字チェックするときに現在文字の左と右を比較する時に、i が右の文字を指しているため
						if ((StringUtility.is_kanji(text.slice(i - 1, i + 1)) == false && StringUtility.is_contains_kanji(text.slice(i - 1, i + 1)))
							|| (StringUtility.is_katakana(text.slice(i - 1, i + 1)) == false && StringUtility.is_contains_katakana(text.slice(i - 1, i + 1)))
							|| (NUMBER_OR_PERIOD_ONLY_REGULAR_EXPRESSION.test(text.slice(i - 1, i + 1)) == false && NUMBER_OR_PERIOD_CONTAINS_REGULAR_EXPRESSION.test(text.slice(i - 1, i + 1)))
						) {
							if (break_position === null || i > break_position) break_position = i - 1;
							break;
						}
					}
				}
			}
			result.push(text.slice(index, (break_position ?? end_index) + 1).trim());	// 現在の位置から改行位置までのテキストを結果に追加
			index = (break_position ?? end_index) + 1;									// 次の検索開始位置を更新
		}
		return result.join("\n");
	}
}
