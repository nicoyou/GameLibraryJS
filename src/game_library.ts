/*!/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
_/
_/			汎用ゲームライブラリ
_/			(C) 2021-2023 Nicoyou All Rights Reserved.
_/
_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/



// 型エイリアス
/** 整数型 */
type int = number;
/** 浮動小数点 */
type float = number;
/** 4 つの方向を表す値 */
type direction_t = int;
/** キーコード */
type key_code_t = int;
/** ラジアン */
type angle_t = float;
/** json 等で使用できる 値 */
type value_t = number | string | boolean;



/** キーボードのキーコード */
const KEY_CODE: { [key: string]: int } = {
	BACK_SPACE: 8,
	TAB: 9,
	ENTER: 13,
	COMMAND: 15,
	SHIFT: 16,
	CTRL: 17,
	ALT: 18,
	ESC: 27,
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	K0: 48,
	K1: 49,
	K2: 50,
	K3: 51,
	K4: 52,
	K5: 53,
	K6: 54,
	K7: 55,
	K8: 56,
	K9: 57,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	COUNT: 512
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
/** ClickButton の状態 */
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

/** game_library のバージョン */
const GAME_LIBRARY_VERSION = "1.0.0";
/** キー入力の種類 */
const KEY_INPUT_MAX = 256;
/** Color オブジェクトにおける 3 原色の最大値 */
const COLOR_MAX = 0xff;
/** デフォルトのフォント名 */
const DEFAULT_FONT_NAME = "sans-serif";
/** デフォルトのフォントサイズ */
const DEFAULT_FONT_SIZE = 16;

/** 2次元の値を保持する */
class Vector2 {
	/** x 座標 */
	public x: number;
	/** y 座標 */
	public y: number;

	/**
	 * 値を初期化する
	 * @param x x 座標か Vector2 クラス
	 * @param y y 座標 ( x に Vector2 を渡した場合は空にする )
	 */
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
	set(x: number | Vector2, y: number = 0): void {
		if (typeof x == "object") {
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
	copy(): Vector2 {
		return new Vector2(this.x, this.y);
	}
	/**
	 * 指定された座標との距離を計算する
	 * @param other もう一つの座標
	 * @returns もう一方のベクトルとの距離
	 */
	distance(other: Vector2): float {
		return Math.sqrt((other.x - this.x) * (other.x - this.x) + (other.y - this.y) * (other.y - this.y));
	}
	/**
	 * 指定された距離だけ移動させた座標を取得する
	 * @param angle 移動する方向
	 * @param length 移動する距離
	 * @returns 移動後の座標
	 */
	advance(angle: angle_t, length: float): Vector2 {
		return new Vector2(this.x + Math.cos(angle) * length, this.y + Math.sin(angle) * length);
	}
	/**
	 * 原点を中心に、指定した角度だけ回転させた座標を取得する
	 * @param angle 回転する角度
	 * @returns 回転後の座標
	 */
	rotate(angle: angle_t): Vector2 {
		const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
		const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
		return new Vector2(x, y);
	}
	/**
	 * 指定された座標との角度を計算する
	 * @param other もう一つの座標
	 * @returns 指定された座標との角度
	 */
	angle(other: Vector2): float {
		return Math.atan2(other.y - this.y, other.x - this.x);
	}
	/**
	 * 指定された座標に指定された距離だけ近づけた座標を取得する
	 * @param other 目標とする座標
	 * @param length 移動できる最大の距離
	 * @returns 目標の座標に近づけた座標
	 */
	approach(other: Vector2, length: float): Vector2 {
		const distance = this.distance(other);
		if (distance == 0) return other.copy();
		else if (distance > length) return this.advance(this.angle(other), length);
		else return this.advance(this.angle(other), distance);
	}
	/**
	 * 現在の値までの大きさの乱数を得る
	 * @returns x, y がそれぞれ 0 から現在の値までの間で生成された乱数
	 */
	mul_rand(): Vector2 {
		return new Vector2(get_rand(this.x), get_rand(this.y));
	}
	/**
	 * x, y のうち大きいほうの値を取得する
	 * @returns 大きいほうの値
	 */
	max(): float {
		return this.x > this.y ? this.x : this.y;
	}
	/**
	 * x, y のうち小さいほうの値を取得する
	 * @returns 小さいほうの値
	 */
	min(): float {
		return this.x < this.y ? this.x : this.y;
	}
	/**
	 * 指定された座標との内分点を計算する
	 * @param other もう一つの座標
	 * @param t 割合を 0 ~ 1 の間で指定する
	 * @returns 内分点
	 */
	subdivide(other: Vector2, t: float): Vector2 {
		return this.mul(t).add(other.mul(1 - t));
	}
	/**
	 * x だけ置き換えた座標を取得する
	 * @param x 置き換える x 座標
	 * @returns x だけを置き換えた座標
	 */
	with_x(x: float): Vector2 {
		return new Vector2(x, this.y);
	}
	/**
	 * y だけ置き換えた座標を取得する
	 * @param y 置き換える y 座標
	 * @returns y だけを置き換えた座標
	 */
	with_y(y: float): Vector2 {
		return new Vector2(this.x, y);
	}
	/**
	 * ベクトルの長さを取得する
	 * @returns ベクトルの長さ
	 */
	get length(): float {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	// 演算子
	/**
	 * 加算
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns 計算結果
	 */
	add(other: float | Vector2): Vector2 {
		if (typeof other == "object") return new Vector2(this.x + other.x, this.y + other.y);
		else return this.add(new Vector2(other, other));
	}
	/**
	 * 減算
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns 計算結果
	 */
	sub(other: float | Vector2): Vector2 {
		if (typeof other == "object") return new Vector2(this.x - other.x, this.y - other.y);
		else return this.sub(new Vector2(other, other));
	}
	/**
	 * 乗算
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns 計算結果
	 */
	mul(other: float | Vector2): Vector2 {
		if (typeof other == "object") return new Vector2(this.x * other.x, this.y * other.y);
		else return this.mul(new Vector2(other, other));
	}
	/**
	 * 除算
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns 計算結果
	 */
	div(other: float | Vector2): Vector2 {
		if (typeof other == "object") return new Vector2(this.x / other.x, this.y / other.y);
		else return this.div(new Vector2(other, other));
	}
	/**
	 * 比較 ( == )
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns x, y が共に同じ値なら true
	 */
	equal(other: float | Vector2): boolean {
		if (typeof other == "object") return (this.x == other.x && this.y == other.y);
		else return this.equal(new Vector2(other, other));
	}
	/**
	 * 比較 ( != )
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns x, y のどちらかが異なる値なら true
	 */
	not_equal(other: float | Vector2): boolean {
		return this.equal(other) == false;
	}
	/**
	 * 比較 ( < )
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns x, y が共に指定された値より小さければ true
	 */
	less(other: float | Vector2): boolean {
		if (typeof other == "object") return (this.x < other.x && this.y < other.y);
		else return this.less(new Vector2(other, other));
	}
	/**
	 * 比較 ( > )
	 * @param other 座標を渡すと x, y でそれぞれ独立して計算し、数値を渡すと x, y にそれぞれ同じ数値で計算する
	 * @returns x, y が共に指定された値より大きければ true
	 */
	greater(other: float | Vector2): boolean {
		if (typeof other == "object") return (this.x > other.x && this.y > other.y);
		else return this.greater(new Vector2(other, other));
	}
}

/** シード値を設定して、実行結果を再現できる乱数生成クラス ( XorShift ) */
class Random {
	private x: int;
	private y: int;
	private z: int;
	private w: int;

	/**
	 * シード値を指定して初期化する
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
	get_rand(max: float = 1, min: float = 0): float {
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
	get_rand_w(width_max: float, width_min: float = 0): float {
		if (width_max < width_min) {
			print_error_log("width_max より大きな width_min が指定されました [width_max=" + width_max + ", width_min=" + width_min + "]");
			const temp = width_max;
			width_max = width_min;
			width_min = temp;
		}
		let width = this.get_rand((width_max - width_min) * 2);
		width -= (width_max - width_min);
		if (width >= 0) return width + width_min;
		else return width - width_min;
	}
	/**
	 * 整数の乱数を取得する
	 * @param max 最大値
	 * @param min 最小値
	 * @returns ( min ～ max - 1 ) の乱数を取得する
	 */
	get_rand_int(max: int, min: int = 0): int {
		return Math.floor(this.get_rand(max, min));
	}
	/**
	 * 0 が中心で整数の乱数を取得する
	 * @param width_max 絶対値の最大値 ( 3 を指定した場合は -3 ~ 3 の乱数を得る )
	 * @param width_min 絶対値の最小値
	 * @returns 指定された範囲内の乱数を取得するが、width_min を出力する確率はほとんど無い
	 */
	get_rand_int_w(width_max: int, width_min: int = 0): int {
		const n = this.get_rand_w(width_max, width_min);
		if (n >= 0) return Math.ceil(n);
		return Math.floor(n);
	}
	/**
	 * boolean 型の乱数を取得する
	 * @param true_ratio 結果が true になる確率を 0 ~ 1 の間で指定する ( デフォルトは 50% )
	 * @returns true か false
	 */
	get_rand_bool(true_ratio: float = 0.5): boolean {
		return (this.get_rand(1) < true_ratio);
	}
}

/** 上下左右の4つの方向を保持するクラス */
class Direction {
	/** 上 */
	static readonly up = 0;
	/** 右 */
	static readonly right = 1;
	/** 下 */
	static readonly down = 2;
	/** 左 */
	static readonly left = 3;
	/** 不明な方向 */
	static readonly unknown = 4;
	/** 保持している方向 */
	public direction: direction_t;

	/**
	 * 方向を指定して初期化する
	 * @param direction 方向
	 */
	constructor(direction: int = Direction.unknown) {
		this.direction = direction;
	}
	/**
	 * 右周りにに指定数分だけ方向転換する
	 * @param num 90° 回転する回数
	 * @returns 指定回数だけ回転した後の角度
	 */
	right_rot(num: int = 1): Direction {
		if (this.direction == Direction.unknown) return new Direction();		// static 変数は static メソッドからしか this アクセスできない

		let new_direction = this.direction + num;			// 引き数の数だけ回転させる
		new_direction %= 4;
		if (new_direction < 0) new_direction += 4;

		return new Direction(new_direction);
	}
	/**
	 * 左周りにに指定数分だけ方向転換する
	 * @param num 90° 回転する回数
	 * @returns 指定回数だけ回転した後の角度
	 */
	left_rot(num: int = 1): Direction {
		return this.right_rot(-num);
	}
	/**
	 * Vector2 型の座標を現在の方向に指定分だけ進める
	 * @param pos 座標
	 * @param length 直線に進める距離
	 * @returns 指定された角度に指定された分だけ進めた座標
	 */
	advance_vector2(pos: Vector2, length: float): Vector2 {
		pos = pos.copy();
		switch (this.direction) {
			case Direction.up:
				pos.y -= length;
				break;
			case Direction.down:
				pos.y += length;
				break;
			case Direction.right:
				pos.x += length;
				break;
			case Direction.left:
				pos.x -= length;
				break;
			default:
				throw new Error("未定義の direction です");
		}
		return pos;
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
	public a: float;

	/**
	 * 色を指定して初期化する
	 * @param r 赤色の含有量 ( "#ffffff" のような文字列や Color インスタンス等を指定して g, b に null を渡しても初期化できる )
	 * @param g 緑色の含有量
	 * @param b 青色の含有量
	 * @param a 不透明度
	 */
	constructor(r: float | string | Color | null = null, g: float | null = null, b: float | null = null, a: float | null = 1) {
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = 1;
		this.set(r, g, b, a);
	}
	/**
	 * コピーを取得する
	 * @returns クローンされたインスタンス
	 */
	copy(): Color {
		return new Color(this.r, this.g, this.b, this.a);
	}
	/**
	 * 色を指定して初期化する
	 * @param r 赤色の含有量 ( "#ffffff" のような文字列や Color インスタンス等を指定して g, b に null を渡しても初期化できる )
	 * @param g 緑色の含有量
	 * @param b 青色の含有量
	 * @param a 不透明度
	 * @returns 自身のインスタンス
	 */
	set(r: float | string | Color | null = null, g: float | null = null, b: float | null = null, a: float | null = 1): Color {
		if (g === null && b === null) {
			if (r === null) {
				return this.set_scalar(0);
			}
			else if (typeof r == "string") {
				return this.set_style(r);
			}
			else if (typeof r == "number") {
				this.hex = r;
				return this;
			}
			else if (typeof r == "object") {
				return this.set_rgba(r.r, r.g, r.b, r.a);
			}
		}
		if (typeof r == "number" && typeof g == "number" && typeof b == "number") {
			return this.set_rgba(r, g, b, a);
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
	 * @param a 不透明度
	 * @returns 自身のインスタンス
	 */
	set_rgba(r: float, g: float, b: float, a: float | null): Color {
		this.r = r;
		this.g = g;
		this.b = b;
		if (a !== null) this.a = a;
		return this;
	}
	/**
	 * HLS 色空間を指定して色を設定する
	 * @param h 色相
	 * @param s 彩度
	 * @param l 輝度
	 * @returns 自身のインスタンス
	 */
	set_hsl(h: float, s: float, l: float): Color {
		h = normalize_num_loop(h / 360, 1);
		s = normalize_zero_to_one(s);
		l = normalize_zero_to_one(l);

		if (s == 0) {
			this.r = this.g = this.b = Math.round(l * COLOR_MAX);
		} else {
			const hue_to_rgb = (t: float, s: float, l: float) => {
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
	set_scalar(scalar: float): Color {
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
	set_style(style: string): Color {
		let m = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(style);
		if (m) {
			let color;
			const name = m[1];
			const components = m[2];

			switch (name) {
				case "rgb":
				case "rgba":
					color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components);
					if (color) {		// rgb(255, 0, 0) rgba(255, 0, 0, 0.5)
						this.r = Math.min(COLOR_MAX, parseInt(color[1], 10));
						this.g = Math.min(COLOR_MAX, parseInt(color[2], 10));
						this.b = Math.min(COLOR_MAX, parseInt(color[3], 10));
						if (color[4] !== undefined) this.a = normalize_zero_to_one(parseFloat(color[4]));
						return this;
					}
					color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components);
					if (color) {		// rgb(100%, 0%, 0%) rgba(100%, 0%, 0%, 0.5)
						this.r = Math.min(COLOR_MAX, Math.round((parseInt(color[1], 10) / 100) * COLOR_MAX));
						this.g = Math.min(COLOR_MAX, Math.round((parseInt(color[2], 10) / 100) * COLOR_MAX));
						this.b = Math.min(COLOR_MAX, Math.round((parseInt(color[3], 10) / 100) * COLOR_MAX));
						if (color[4] !== undefined) this.a = normalize_zero_to_one(parseFloat(color[4]));
						return this;
					}
					break;

				case "hsl":
				case "hsla":
					color = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components);
					if (color) {		// hsl(120, 50, 50) hsla(120, 50, 50, 0.5)
						const h = parseFloat(color[1]);
						const s = parseFloat(color[2]) / 100;
						const l = parseFloat(color[3]) / 100;
						if (color[4] !== undefined) this.a = normalize_zero_to_one(parseFloat(color[4]));
						return this.set_hsl(h, s, l);
					}
					color = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components);
					if (color) {		// hsl(120, 50%, 50%) hsla(120, 50%, 50%, 0.5)
						const h = parseFloat(color[1]);
						const s = parseFloat(color[2]) / 100;
						const l = parseFloat(color[3]) / 100;
						if (color[4] !== undefined) this.a = normalize_zero_to_one(parseFloat(color[4]));
						return this.set_hsl(h, s, l);
					}
					break;
			}
		}
		else if (m = /^\#([A-Fa-f\d]+)$/.exec(style)) {
			const hex = m[1];
			const size = hex.length;
			if (size === 3) {				// #ff0
				this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
				this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
				this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
				return this;
			} else if (size === 6) {		// #ff0000
				this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16);
				this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16);
				this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16);
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
	with_r(r: float): Color {
		let color = this.copy();
		color.a = r;
		return color;
	}
	/**
	 * G だけを変更した Color を取得する
	 * @param g 緑色の含有量
	 * @returns 緑色の含有量だけを変更した Color インスタンス
	 */
	with_g(g: float): Color {
		let color = this.copy();
		color.a = g;
		return color;
	}
	/**
	 * B だけを変更した Color を取得する
	 * @param b 青色の含有量
	 * @returns 青色の含有量だけを変更した Color インスタンス
	 */
	with_b(b: float): Color {
		let color = this.copy();
		color.a = b;
		return color;
	}
	/**
	 * 不透明度だけを変更した Color を取得する
	 * @param a 不透明度 ( 0 ~ 1 )
	 * @returns 不透明度だけを変更した Color インスタンス
	 */
	with_a(a: float): Color {
		let color = this.copy();
		color.a = a;
		return color;
	}
	/**
	 * 0 ~ 255 の数字を 16 進数の文字列に変換する
	 * @param num 0 ~ 255 の整数
	 * @returns 16 進数に変換された 2 文字の文字列
	 */
	one_color_to_hex(num: float): string {
		const hexadecimal = Math.floor(num).toString(16);
		return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
	}
	/**
	 * 現在の色を 16 進数のカラーコードに変換する
	 * @returns 16 進数のカラーコードに変換した文字列
	 */
	to_str_hex(): string {
		return "#" + this.one_color_to_hex(this.r) + this.one_color_to_hex(this.g) + this.one_color_to_hex(this.b);
	}
	/**
	 * 現在の色を rgb(50, 100, 150) 形式の文字列に変換して取得する
	 * @returns rgb(50, 100, 150) 形式の文字列
	 */
	to_str_rgb(): string {
		return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
	}
	/**
	 * 現在の色を rgba(50, 100, 150, 0.5) 形式の文字列に変換して取得する
	 * @returns rgba(50, 100, 150, 0.5) 形式の文字列
	 */
	to_str_rgba(): string {
		return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
	}
	/**
	 * 現在の色を一般的に色を表す文字列に変換する
	 * @returns 16 進数のカラーコードに変換した文字列
	 */
	to_str(): string {
		return this.to_str_hex();
	}
	/**
	 * 指定された色に近づけた色を取得する
	 * @param othre 目標とする色
	 * @param num 各色の要素を目標の色に近づける最大値
	 * @returns 現在の色を目標の色に指定された分だけ近づけた色
	 */
	approach(othre: Color, num: float): Color {
		return new Color(approach_num(this.r, othre.r, num), approach_num(this.g, othre.g, num), approach_num(this.b, othre.b, num), approach_num(this.a, othre.a, num / COLOR_MAX));
	}
	/**
	 * 一つの値を色がとりえる範囲内の値に正規化する
	 * @param n 色の要素の値
	 * @returns 0 ~ COLOR_MAX の間で正規化する
	 */
	normalize_num(n: float): float {
		if (n < 0) n = 0;
		if (n > COLOR_MAX) n = COLOR_MAX;
		return n;
	}
	/**
	 * 現在の値をとりえる範囲内の値に正規化する
	 * @returns r, g, b, a の全ての値を本来とりえる範囲内の値に正規化する
	 */
	normalize(): Color {
		return new Color(this.normalize_num(this.r), this.normalize_num(this.g), this.normalize_num(this.b), normalize_zero_to_one(this.a));
	}
	/**
	 * 色が完全に同じかどうかを比較する
	 * @param other 比較対象の色
	 * @returns 完全に同じ色の場合は true
	 */
	equal(other: Color): boolean {
		return (this.equal_rgb(other) && this.a == other.a);
	}
	/**
	 * RGB 値だけが完全に同じかどうかを比較する
	 * @param other 比較対象の色
	 * @returns RGB 値だけが完全に同じ場合は true
	 */
	equal_rgb(other: Color): boolean {
		return (this.r == other.r && this.g == other.g && this.b == other.b);
	}
	/**
	 * 似た色かどうかを比較する ( 不透明度は考慮しない )
	 * @param other 比較対象の色
	 * @param tolerance 同じ色とみなす誤差の閾値
	 * @returns 似た色なら true
	 */
	nearly_equal(other: Color, tolerance: float = COLOR_MAX * 0.1) {
		return this.equal_rgb(other.approach(this, tolerance));
	}
	/**
	 * 現在の色に特定の色かスカラーを加算した色を取得する
	 * @param other 加算する色か、数値 ( 数値を指定した場合は r, g, b それぞれに数値を加算する )
	 * @returns 指定された色を加算した色
	 */
	add(other: Color | float): Color {
		if (typeof other == "object") return new Color(this.r + other.r, this.g + other.g, this.b + other.b, this.a);
		else return new Color(this.r + other, this.g + other, this.b + other, this.a);
	}
	/**
	 * 複数の色を混ぜ合わせる
	 * @param others 混ぜ合わせる色を指定する ( 可変長引数 )
	 * @returns 指定された色を全て混ぜ合わせた色
	 */
	merge(...others: float[] | string[] | Color[]): Color {
		let r = this.r;
		let g = this.g;
		let b = this.b;
		let a = this.a;
		for (let i = 0; i < others.length; i++) {
			const temp = new Color(others[i]);
			r += temp.r;
			g += temp.g;
			b += temp.b;
			a += temp.a;
		}
		return new Color(Math.floor(r / (others.length + 1)), Math.floor(g / (others.length + 1)), Math.floor(b / (others.length + 1)), Math.floor(a / (others.length + 1)));
	}
	/**
	 * ランダムな色を取得する ( 不透明度は 1 固定 )
	 * @returns ランダムな色
	 */
	get_random(): Color {
		return new Color(get_rand_int(COLOR_MAX), get_rand_int(COLOR_MAX), get_rand_int(COLOR_MAX), 1);
	}
	/**
	 * ランダムで綺麗な色を取得する
	 * @returns 特定のあまりきれいではない色を排除したランダムな色を取得する
	 */
	get_random_bright(): Color {
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
	/** 色を 16 進数の値として取得する */
	get hex(): int {
		let hex = 0;
		hex += (Math.floor(this.r) << 16);
		hex += (Math.floor(this.g) << 8);
		hex += Math.floor(this.b);
		return hex;
	}
	/** 16 進数の値を指定して色を設定する */
	set hex(hex: int) {
		hex = Math.floor(hex);

		this.r = (hex >> 16 & COLOR_MAX);
		this.g = (hex >> 8 & COLOR_MAX);
		this.b = (hex & COLOR_MAX);
	}
	/** HLS 色空間の H を取得する */
	get h(): float {
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
	get s(): float {
		const r = this.r / COLOR_MAX;
		const g = this.g / COLOR_MAX;
		const b = this.b / COLOR_MAX;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);

		return (max - min) / (1 - (Math.abs(max + min - 1)));
	}
	/** HLS 色空間の L を取得する */
	get l(): float {
		const r = this.r / COLOR_MAX;
		const g = this.g / COLOR_MAX;
		const b = this.b / COLOR_MAX;

		return (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
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
	 * フォント情報を設定する
	 * @param font フォント名 ( null でデフォルトフォント )
	 * @param size px 単位のフォントサイズ ( null でデフォルトサイズ )
	 * @param bold 太字かどうか
	 * @param italic イタリック体かどうか
	 */
	constructor(font: string | null = null, size: float | null = null, bold: boolean = false, italic: boolean = false) {
		this.font = font ? font : DEFAULT_FONT_NAME;
		this.size = size ? size : DEFAULT_FONT_SIZE;
		this.bold = bold;
		this.italic = italic;
	}
	/**
	 * コピーを取得する
	 * @returns クローンされたインスタンス
	 */
	copy(): Font {
		return new Font(this.font, this.size, this.bold, this.italic);
	}
	/**
	 * フォント情報を文字に変換する
	 * @returns 全てのフォント情報が含まれた文字列
	 */
	to_str(): string {
		let result = "";
		if (this.bold) {
			result += "bold ";
		}
		if (this.italic) {
			result += "italic ";
		}
		if (this.size !== null) {
			result += this.size + "px ";
		}
		if (this.font !== null) {
			result += this.font;
		}
		return result;
	}
	/**
	 * サイズだけを変更したフォントを取得する
	 * @param size フォントサイズ
	 * @returns サイズのみ変更したフォント
	 */
	with_size(size: float): Font {
		let font = this.copy();
		font.size = size;
		return font;
	}
	/**
	 * 太字かどうかだけを変更したフォントを取得する
	 * @param flag 太字かどうか
	 * @returns 太字かどうかのみ変更したフォント
	 */
	with_bold(flag: boolean = true): Font {
		let font = this.copy();
		font.bold = flag;
		return font;
	}
	/**
	 * イタリック体かどうかだけを変更したフォントを取得する
	 * @param flag イタリック体かどうか
	 * @returns イタリック体かどうかのみ変更したフォント
	 */
	with_italic(flag: boolean = true): Font {
		let font = this.copy();
		font.italic = flag;
		return font;
	}
	/**
	 * フォントの設定項目を初期設定に戻す
	 * @returns 自身のインスタンス
	 */
	reset_default(): Font {
		this.font = DEFAULT_FONT_NAME;
		this.size = DEFAULT_FONT_SIZE;
		this.bold = false;
		this.italic = false;
		return this;
	}
}

/** アニメーションの開始値と終了値、移動速度を保持するクラス */
class Tween<T, U = T> {
	/** 値 */
	public value: T;
	/** 目標とする値 */
	public dest: T;
	/** 目標とする値に近づける速度 */
	public speed: U;

	/**
	 * 初期化する
	 * @param value 値
	 * @param speed 目標とする値に近づける速度
	 */
	constructor(value: T, speed: U) {
		this.value = value;
		this.dest = value;
		this.speed = speed;
	}
}

/** 数値を保存するための拡張 Tween クラス */
class TweenNumber extends Tween<number>{
	/** 現在の値を目標の値に近づける */
	approach(): void {
		this.value = approach_num(this.value, this.dest, this.speed);
	}
}

/** 角度を保存するための拡張 Tween クラス */
class TweenAngle extends Tween<angle_t>{
	/** 現在の値を目標の値に近づける */
	approach(): void {
		this.value = approach_angle(this.value, this.dest, this.speed);
	}
}

/** 座標を保存するための拡張 Tween クラス */
class TweenVector2 extends Tween<Vector2, float>{
	/** 現在の値を目標の値に近づける */
	approach(): void {
		this.value = this.value.approach(this.dest, this.speed);
	}
}

/** 色を保存するための拡張 Tween クラス */
class TweenColor extends Tween<Color, float>{
	/** 現在の値を目標の値に近づける */
	approach(): void {
		this.value = this.value.approach(this.dest, this.speed);
	}
}

/** マウスやタップに対応したボタン */
class ClickButton {
	/** ボタンの位置 */
	protected rect: Rectangle;
	/** ボタンのステータス */
	public status: BUTTON_STATUS;

	/**
	 * ボタンの位置を指定して初期化する
	 * @param rect ボタンの位置
	 */
	constructor(rect: Rectangle) {
		this.rect = rect.copy();
		this.status = BUTTON_STATUS.normal;
	}
	/** オーバーライドしてボタンの状態に対する処理を実装するためのメソッド */
	update(): void {
		if (this.is_hover_start) print_log("hover start");
		if (this.is_click_start) print_log("click start");
		if (this.is_enter) print_log("enter");
	}
	/** ボタンのステータスを更新する */
	update_status(): void {
		if (Collision.check(this.rect, new Dot(get_mouse_pos().x, get_mouse_pos().y))) {
			if (get_mouse_click() == 1) this.status = BUTTON_STATUS.click_start;
			else if (get_mouse_click()) this.status = BUTTON_STATUS.click;
			else if (get_mouse_no_click() == 1) this.status = BUTTON_STATUS.enter;
			else if (this.status == BUTTON_STATUS.normal) this.status = BUTTON_STATUS.hover_start;
			else this.status = BUTTON_STATUS.hover;
		}
		else if (get_mouse_click() && this.status == BUTTON_STATUS.click) {		// ボタンを押しながら範囲から離れたら
			this.status = BUTTON_STATUS.click_leave;
		}
		else this.status = BUTTON_STATUS.normal;

		if ((get_touche() || get_no_touche() == 1) && Collision.check(this.rect, new Dot(get_touche_pos().x, get_touche_pos().y))) {
			if (get_touche() == 1) this.status = BUTTON_STATUS.hover_start;			// click_start ではなく、イベントが登録されている確率が高い hover_start にする
			else if (get_touche()) this.status = BUTTON_STATUS.hover;
			else if (get_no_touche() == 1) this.status = BUTTON_STATUS.enter;
		}
	}
	/** オーバーライド用のボタンを描画するメソッド ( デフォルトでデバッグ用のボタンが描画される ) */
	draw(): void {
		let color = COLOR.white;
		if (this.is_hover) color = COLOR.p_yellow;
		if (this.is_click) color = COLOR.p_green;
		const ctx = game_lib.canvas?.getContext("2d");
		ctx?.draw_box(this.rect.ul_pos.x, this.rect.ul_pos.y, this.rect.br_pos.x, this.rect.br_pos.y, color);
	}
	/** マウスがホバー状態かどうか */
	get is_hover(): boolean {
		return (this.status == BUTTON_STATUS.hover_start || this.status == BUTTON_STATUS.hover);
	}
	/** ホバーが開始されたフレームかどうか */
	get is_hover_start(): boolean {
		return (this.status == BUTTON_STATUS.hover_start);
	}
	/** クリックされているかどうか */
	get is_click(): boolean {
		return (this.status == BUTTON_STATUS.click_start || this.status == BUTTON_STATUS.click);
	}
	/** クリックが開始されたフレームかどうか */
	get is_click_start(): boolean {
		return (this.status == BUTTON_STATUS.click_start);
	}
	/** ボタンが決定されたかどうか ( クリックを離した瞬間のフレームかどうか ) */
	get is_enter(): boolean {
		return (this.status == BUTTON_STATUS.enter);
	}
	/** ボタンがアクティブな状態 ( ホバーかクリックされている状態 ) かどうか */
	get is_active(): boolean {
		return (this.status != BUTTON_STATUS.normal && this.status != BUTTON_STATUS.click_leave);
	}
	/** ボタンがアクティブな状態 ( ホバーかクリックされている状態 ) ではないかどうか */
	get is_inactive(): boolean {
		return (this.is_active == false);
	}
}

/** セレクトボタンをグループ管理して、キーボード選択にも対応させるクラス */
class ClickButtonSelectGroup {
	/** 決定ボタンとして使用するキーコードのリスト */
	private readonly enter_key_code_list: int[];
	/** 一度ボタンが決定されれば、全てのボタンステータスをロックするかどうか */
	private readonly one_click_only: boolean;
	/** ボタンを格納するリスト */
	private select_button_list: ClickButton[][];
	/** 現在アクティブ ( 選択されている ) ボタンのインデックス */
	private active_index: Vector2;
	/** 現在アクティブなボタンがアクティブになってからのカウンター */
	private active_count: int;
	/** 全てのボタンステータスを更新しない状態かどうか */
	public lock: boolean;

	/**
	 * コンストラクタ
	 * @param enter_key_code_list 決定ボタンとして使用するキーコードのリスト
	 * @param one_click_only 一度ボタンが決定されれば、全てのボタンステータスをロックするかどうか
	 */
	constructor(enter_key_code_list: int[] = [KEY_CODE.ENTER], one_click_only: boolean = false) {
		this.enter_key_code_list = enter_key_code_list;
		this.one_click_only = one_click_only;
		this.select_button_list = [[]];
		this.active_index = new Vector2();
		this.active_count = 1;
		this.lock = false;
	}
	/** ボタングループの状態を更新する */
	update(): void {
		if (this.lock == false) {
			if (get_key_long_press(KEY_CODE.RIGHT)) {
				if (this.active_index.x < this.select_button_list[this.active_index.y].length - 1) {		// 右に移動
					this.active_index.x++;
					this.active_count = 0;
				}
				else if (this.active_index.y < this.select_button_list.length - 1) {						// 下の段に移動
					this.active_index.x = 0;
					this.active_index.y++;
					this.active_count = 0;
				}
			}
			if (get_key_long_press(KEY_CODE.LEFT)) {														// 左に移動
				if (this.active_index.x > 0) {
					this.active_index.x--;
					this.active_count = 0;
				}
				else if (this.active_index.y > 0) {															// 上の段に移動
					this.active_index.y--;
					this.active_index.x = this.select_button_list[this.active_index.y].length - 1;
					this.active_count = 0;
				}
			}
			if (get_key_long_press(KEY_CODE.DOWN) && this.active_index.y < this.select_button_list.length - 1) {
				this.active_index.y++;
				if (this.active_index.x >= this.select_button_list[this.active_index.y].length) {		// x の数が異なり、オーバーした場合は調節する
					this.active_index.x = this.select_button_list[this.active_index.y].length - 1;
				}
				this.active_count = 0;
			}
			if (get_key_long_press(KEY_CODE.UP) && this.active_index.y > 0) {
				this.active_index.y--;
				if (this.active_index.x >= this.select_button_list[this.active_index.y].length) {		// x の数が異なり、オーバーした場合は調節する
					this.active_index.x = this.select_button_list[this.active_index.y].length - 1;
				}
				this.active_count = 0;
			}

			let button_active: Vector2 | null = null;						// マウス等で直接アクティブになったボタンを探す
			for (let iy = 0; iy < this.select_button_list.length; iy++) {
				for (let ix = 0; ix < this.select_button_list[iy].length; ix++) {
					this.select_button_list[iy][ix].update_status();		// 各ボタンのステータスを最新に更新する
					if (this.select_button_list[iy][ix].is_active) button_active = new Vector2(ix, iy);
					if (this.select_button_list[iy][ix].is_enter && this.one_click_only) this.lock = true;
				}
			}
			if (button_active !== null && this.active_index.not_equal(button_active)) this.active_index.set(button_active);		// 直接マウスホバーされればアクティブの位置を切り替える
		}

		for (let iy = 0; iy < this.select_button_list.length; iy++) {
			for (let ix = 0; ix < this.select_button_list[iy].length; ix++) {
				if (ix == this.active_index.x && iy == this.active_index.y) {			// 現在グループで選択されているものであれば
					if (this.select_button_list[iy][ix].is_inactive) {
						if (this.active_count == 0) {
							this.select_button_list[iy][ix].status = BUTTON_STATUS.hover_start;
						} else {
							this.select_button_list[iy][ix].status = BUTTON_STATUS.hover;
						}
					}
					if (get_keys(...this.enter_key_code_list) == 1) {
						this.select_button_list[iy][ix].status = BUTTON_STATUS.enter;
						if (this.one_click_only) this.lock = true;
					}
				}
				this.select_button_list[iy][ix].update();
			}
		}
		this.active_count++;
	}
	/** 全てのボタンを描画する */
	draw(): void {
		for (const row of this.select_button_list) {
			for (const button of row) {
				button.draw();
			}
		}
	}
	/**
	 * 水平に新しいボタンを追加する
	 * @param button 追加するボタンオブジェクト
	 * @param active 選択された状態にするかどうか
	 */
	push_select_button(button: ClickButton, active: boolean = false): void {
		this.select_button_list[this.select_button_list.length - 1].push(button);
		if (active) this.active_index.set(this.select_button_list[this.select_button_list.length - 1].length - 1, this.select_button_list.length - 1);		// アクティブなボタンを変更する
	}
	/**
	 * 垂直に新しいボタンを追加する
	 * @param button 追加するボタンオブジェクト
	 * @param active 選択された状態にするかどうか
	 */
	push_select_button_vertical(button: ClickButton, active: boolean = false): void {
		if (this.select_button_list[0].length != 0) this.new_line();
		this.push_select_button(button);
		if (active) this.active_index.set(this.select_button_list[this.select_button_list.length - 1].length - 1, this.select_button_list.length - 1);		// アクティブなボタンを変更する
	}
	/** ボタンの挿入位置を改行する */
	new_line(): void {
		this.select_button_list.push([]);
	}
}

/** デバッグ用の処理時間計測クラス */
class DebugTimer {
	/** 計測した時間を表示するウィジェットの左上の座標 */
	public pos: Vector2;
	/** 計測ブロックの時間を格納したリスト */
	private time_list: float[];
	/** 計測時の処理名を格納するリスト */
	private process_name_list: string[];

	/** コンストラクタ */
	constructor() {
		this.pos = new Vector2(0, 0);
		this.time_list = [];
		this.process_name_list = [];
	}
	/**
	 * 1 フレームの計測を開始する
	 * @param process_name この地点から始まる処理ブロックの名前
	 */
	start_frame(process_name: string = ""): void {
		this.time_list = [];
		this.process_name_list = [];
		this.time_list.push(performance.now());
		this.process_name_list.push(process_name);
	}
	/**
	 * 計測ポイントを設置する
	 * @param process_name この地点から始まる処理ブロックの名前
	 */
	step_frame(process_name: string = ""): void {
		this.time_list.push(performance.now());
		this.process_name_list.push(process_name);
	}
	/**
	 * 計測を終了する
	 * @param process_name 全ての処理ブロックの合計時間を表示するときの名前
	 */
	stop_frame(process_name: string | null = null): void {
		process_name ??= "合計処理時間";
		this.step_frame(process_name);
	}
	/**
	 * 処理にかかった時間を描画する
	 * @param ctx 描画先のコンテキスト
	 * @param draw_fps フレームレートを表示するかどうか
	 * @param font 処理時間を表示する文字フォント
	 */
	draw_time(ctx: CanvasRenderingContext2D, draw_fps: boolean = false, font: Font = new Font(null, 20)): void {
		const STR_PAD = 5;
		const str_height = ctx.get_height_str("0", font) + STR_PAD;
		let process_name_width = 0;			// 一番長い処理名の横幅を求める
		for (let i = 0; i < this.process_name_list.length; i++) {
			if (process_name_width < ctx.get_width_str(this.process_name_list[i], font)) {
				process_name_width = ctx.get_width_str(this.process_name_list[i], font);
			}
		}
		process_name_width += 30;
		let color = COLOR.white;
		let y = this.pos.y + str_height;
		let back_y_size = str_height * this.time_list.length + STR_PAD;
		if (draw_fps) back_y_size += str_height;	// フレームレート表示分も背景を長くする

		ctx.save();
		ctx.globalAlpha = 0.5;
		ctx.draw_box(this.pos.x, this.pos.y, this.pos.x + process_name_width + 120, this.pos.y + back_y_size, COLOR.black);
		ctx.restore();
		if (this.time_list.length >= 3) {			// step が 3 つ以上登録されていれば途中の処理時間を表示する
			for (let i = 0; i < this.time_list.length - 1; i++) {
				ctx.draw_text(this.process_name_list[i], this.pos.x + STR_PAD, y, color, 0, null, font);
				ctx.draw_text((this.time_list[i + 1] - this.time_list[i]).toFixed(3), this.pos.x + process_name_width, y, color, 0, null, font);
				y += str_height;
			}
		}
		if (this.time_list.length >= 2) {			// 合計の処理時間を描画する
			if (this.time_list[this.time_list.length - 1] - this.time_list[0] > 16.6666) color = COLOR.p_red;
			ctx.draw_text(this.process_name_list[this.time_list.length - 1], this.pos.x + STR_PAD, y, color, 0, null, font);
			ctx.draw_text((this.time_list[this.time_list.length - 1] - this.time_list[0]).toFixed(3), this.pos.x + process_name_width, y, color, 0, null, font);
			y += str_height;
		}
		if (draw_fps) {
			ctx.draw_text("フレームレート", this.pos.x + STR_PAD, y, color, 0, null, font);
			ctx.draw_text((this.frame_rate).toFixed(0) + " fps", this.pos.x + process_name_width, y, color, 0, null, font);
		}
	}
	/** フレームレートを取得する ( stop_frame() を呼んで計測完了してから使用する ) */
	get frame_rate(): float {
		if (this.time_list.length >= 2) {
			return 1000 / (this.time_list[this.time_list.length - 1] - this.time_list[0]);
		} else {
			return 0;
		}
	}
}

/** 各図形の抽象クラス */
abstract class Shape {
	/** 図形の種類 */
	public readonly type: SHAPE_TYPE;
	/** 図形の中心座標 */
	public pos: Vector2;

	/**
	 * 図形の情報を初期化する
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
	abstract copy(): Shape;
}

/** 点 */
class Dot extends Shape {
	/**
	 * コンストラクタ
	 * @param x x 座標
	 * @param y y 座標
	 */
	constructor(x: float = 0, y: float = 0) {
		super(SHAPE_TYPE.dot, x, y);
	}
	/** @inheritdoc */
	copy(): Dot {
		return new Dot(this.pos.x, this.pos.y);
	}
}

/** 円 */
class Circle extends Shape {
	/** 半径 */
	public r: float;

	/**
	 * コンストラクタ
	 * @param x 中心の x 座標
	 * @param y 中心の y 座標
	 * @param r 半径
	 */
	constructor(x: float = 0, y: float = 0, r: float = 0) {
		super(SHAPE_TYPE.circle, x, y);
		this.r = r;
	}
	/** @inheritdoc */
	copy(): Circle {
		return new Circle(this.pos.x, this.pos.y, this.r);
	}
	/**
	 * 同じ中心座標で ( 円の半径 * 2 = 長方形の辺 ) の正方形に変換する
	 * @returns Square クラスのインスタンス
	 */
	to_square(): Square {
		return new Square(this.pos.x, this.pos.y, this.r);
	}
}

/** 中心座標と辺の長さ / 2 の値で正方形を格納するクラス */
class Square extends Shape {
	/** 辺の長さ / 2 の値 */
	public r: float;

	/**
	 * コンストラクタ
	 * @param x 中心の x 座標
	 * @param y 中心の y 座標
	 * @param r 辺の長さ / 2 の値
	 */
	constructor(x: float = 0, y: float = 0, r: float = 0) {
		super(SHAPE_TYPE.square, x, y);
		this.r = r;
	}
	/** @inheritdoc */
	copy(): Square {
		return new Square(this.pos.x, this.pos.y, this.r);
	}
	/**
	 * 同じ中心座標で ( 長方形の辺 / 2 = 円の半径 ) の円に変換する
	 * @returns Circle クラスのインスタンス
	 */
	to_circle(): Circle {
		return new Circle(this.pos.x, this.pos.y, this.r);
	}
	/** 左上の座標を取得する */
	get ul_pos(): Vector2 {
		return new Vector2(this.pos.x - this.r, this.pos.y - this.r);
	}
	/** 右下の座標を取得する */
	get br_pos(): Vector2 {
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
	 * コンストラクタ
	 * @param x 中心の x 座標
	 * @param y 中心の y 座標
	 * @param width 横幅
	 * @param height 高さ
	 */
	constructor(x: float = 0, y: float = 0, width: float = 0, height: float = 0) {
		super(SHAPE_TYPE.rectangle, x, y);
		this.width = width;
		this.height = height;
	}
	/** @inheritdoc */
	copy(): Rectangle {
		return new Rectangle(this.pos.x, this.pos.y, this.width, this.height);
	}
	/**
	 * 左上の座標と右下の座標から座標を初期化する
	 * @param x1 左上の x 座標
	 * @param y1 左上の y 座標
	 * @param x2 右下の x 座標
	 * @param y2 右下の y 座標
	 * @returns 
	 */
	from_ulbr(x1: float, y1: float, x2: float, y2: float): Rectangle {
		this.width = Math.abs(x2 - x1);
		this.height = Math.abs(y2 - y1);
		this.pos.set(Math.min(x1, x2) + this.width / 2, Math.min(y1, y2) + this.height / 2);
		return this;
	}
	/** 左上の座標 */
	get ul_pos(): Vector2 {
		return new Vector2(this.pos.x - this.width / 2, this.pos.y - this.height / 2);
	}
	/** 右下の座標 */
	get br_pos(): Vector2 {
		return new Vector2(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
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
	static check(shape1: Shape, shape2: Shape): boolean {
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
	static circle(circle1: Circle, circle2: Circle): boolean {
		return circle1.pos.distance(circle2.pos) <= circle1.r + circle2.r;
	}
	/**
	 * 円と点との当たり判定を行う
	 * @param circle 円
	 * @param dot 点
	 * @returns 衝突している場合は true
	 */
	static circle_dot(circle: Circle, dot: Dot): boolean {
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
	static rectangle(rect1_pos1: Vector2, rect1_pos2: Vector2, rect2_pos1: Vector2, rect2_pos2: Vector2): boolean {
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
	static rectangle_dot(rect_pos1: Vector2, rect_pos2: Vector2, dot: Dot): boolean {
		if (rect_pos1.x < dot.pos.x && rect_pos1.y < dot.pos.y && rect_pos2.x > dot.pos.x && rect_pos2.y > dot.pos.y) return true;
		return false;
	}
}


/** 一般的な色のカラーオブジェクト */
const COLOR = {
	/** 赤色 */
	red: new Color(255, 0, 0),
	/** 緑色 */
	green: new Color(0, 255, 0),
	/** 青色 */
	blue: new Color(0, 0, 255),
	/** 桃色 */
	pink: new Color(255, 0, 255),
	/** 黄色 */
	yellow: new Color(255, 255, 0),
	/** 水色 */
	aqua: new Color(0, 255, 255),

	/** パステル版 赤色 */
	p_red: new Color(255, 128, 128),
	/** パステル版 緑色 */
	p_green: new Color(128, 255, 128),
	/** パステル版 青色 */
	p_blue: new Color(128, 128, 255),
	/** パステル版 桃色 */
	p_pink: new Color(255, 128, 255),
	/** パステル版 黄色 */
	p_yellow: new Color(255, 255, 128),
	/** パステル版 水色 */
	p_aqua: new Color(128, 255, 255),

	/** ダークカラー版 赤色 */
	d_red: new Color(128, 0, 0),
	/** ダークカラー版 緑色 */
	d_green: new Color(0, 128, 0),
	/** ダークカラー版 青色 */
	d_blue: new Color(0, 0, 128),
	/** ダークカラー版 桃色 */
	d_pink: new Color(128, 0, 128),
	/** ダークカラー版 黄色 */
	d_yellow: new Color(128, 128, 0),
	/** ダークカラー版 水色 */
	d_aqua: new Color(0, 128, 128),

	/** 白色 */
	white: new Color(255, 255, 255),
	/** パステル版 ねずみ色 */
	p_gray: new Color(191, 191, 191),
	/** ねずみ色 */
	gray: new Color(128, 128, 128),
	/** ークカラー版 ねずみ色 */
	d_gray: new Color(40, 40, 40),
	/** 明るめの黒 */
	brightblack: new Color(20, 20, 20),
	/** 黒色 */
	black: new Color(0, 0, 0),

	/** マゼンタ */
	magenta: new Color(255, 0, 128),
	/** 紫色 */
	purple: new Color(128, 0, 255),
	/** オレンジ色 */
	orange: new Color(255, 128, 0),
	/** ライム色 */
	lime: new Color(128, 255, 0),
	/** エメラルドグリーン */
	emerald: new Color(0, 255, 128),
	/** アジュールブルー */
	azure: new Color(0, 128, 255),
};

/** ゲームライブラリ内で使用するグローバル変数 */
namespace game_lib {
	/** キャンバスオブジェクト */
	export let canvas: HTMLCanvasElement | null = null;
	/** 各キーが今のフレームで入力されているかどうか */
	export let key_input: boolean[] = new Array(KEY_INPUT_MAX);
	/** 各キーが押されている長さ */
	export let key_input_count: int[] = new Array(KEY_INPUT_MAX);
	/** ゲームを起動してからのカウント */
	export let key_count: int = 0;
	/** 入力を無効化するキー */
	export let key_disable: { [key: int]: boolean } = {};

	/** マウスの座標 */
	export let mouse_pos: Vector2 = new Vector2();
	/** マウスがクリックされているかどうか */
	export let mouse_click: boolean = false;
	/** マウスがクリックされている長さ */
	export let mouse_click_count: int = 0;
	/** マウスがクリックされていない長さ */
	export let mouse_no_click_count: int = 0;
	/** マウスホイールの移動量 */
	export let mouse_wheel: int = 0;

	/** タップ開始位置 */
	export let touch_s: Vector2 = new Vector2();
	/** 現在の移動した後の位置 */
	export let touch_m: Vector2 = new Vector2();
	/** 移動した距離 */
	export let touch_l: Vector2 = new Vector2();
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
	export let touch_num: int = 0;
	/** 複数タップされている場合は、最初の 2 点座標の距離 */
	export let touch_distance_old: float = 0;
	/** 複数タップされている場合は、最初の 2 点座標の距離 */
	export let touch_distance: float = 0;
}


// ライブラリ系関数
/**
 * ライブラリを初期化する ( ゲーム起動時に必ず一回呼ぶ関数 )
 * @param canvas 描画先のキャンバスオブジェクト ( 描画関係の処理を使用しない場合は不要 )
 */
function game_lib_init(canvas: HTMLCanvasElement | null = null): void {
	game_lib.canvas = canvas;
	game_lib.key_input.fill(false);
	game_lib.key_input_count.fill(0);
}
/** ライブラリをゲームループ毎に更新する */
function game_lib_update(): void {
	key_input_update();
	mouse_input_update();
	touche_input_update();
	game_lib.mouse_wheel = 0;
}



// システム系
/**
 * エラーログを出力する
 * @param text 出力するメッセージ
 */
function print_error_log(text: string): void {
	console.trace();
	console.log("\u001b[31m" + text + "\u001b[0m");
}
/**
 * デバッグ用のログを出力する ( リリース時に内部の処理を削除すればログは出力されない )
 * @param text メッセージ
 */
function print_log(text: any): void {
	console.log(text);
}



// 入力管理系関数
/**
 * キーボード押下時のコールバック関数
 * @param event イベント
 */
document.onkeydown = function (event) {
	if (event && event.keyCode) {
		if (game_lib.key_input[event.keyCode] == false) game_lib.key_input[event.keyCode] = true;
	}
};
/**
 * キーボードを離したときのコールバック関数
 * @param event イベント
 */
document.onkeyup = function (event) {
	if (event && event.keyCode) {
		game_lib.key_input[event.keyCode] = false;
	}
};
/** キーボード入力を更新する */
function key_input_update(): void {
	for (let i = 0; i < KEY_INPUT_MAX; i++) {
		if (!game_lib.key_disable[i]) {							// キー入力が無効化されていなければ ( undefined の可能性もあるため ! を使う )
			if (game_lib.key_input[i]) game_lib.key_input_count[i]++;
			else game_lib.key_input_count[i] = 0;
		}
	}
	game_lib.key_count++;
}
/**
 * キーボード入力を取得する
 * @param key_code 入力状態を取得したいキーのキーコード
 * @returns 指定されたキーが連続で入力されているフレームのカウント ( 押されていない場合は 0 )
 */
function get_key(key_code: key_code_t): int {
	if (key_code == KEY_CODE.COUNT) return game_lib.key_count;		// キーカウンタを返す
	return game_lib.key_input_count[key_code];
}
/**
 * キーボード入力を複数のキーコードを指定して取得する
 * @param key_codes 入力状態を取得したいキーのキーコードを複数指定する
 * @returns 一番長く押されているキーが連続で入力されているフレームのカウント ( 押されていない場合は 0 )
 */
function get_keys(...key_codes: key_code_t[]): int {
	let result = 0;
	for (let i = 0; i < key_codes.length; i++) {
		if (get_key(key_codes[i]) > result) result = get_key(key_codes[i]);
	}
	return result;
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
 * 特定のキー入力を無効化する
 * @param key_code 入力を無効化したいキーのキーコード
 */
function key_disable(key_code: key_code_t): void {
	game_lib.key_disable[key_code] = true;
}
/**
 * 特定のキー入力を有効化する
 * @param key_code 入力を有効化したいキーのキーコード
 */
function key_enable(key_code: key_code_t): void {
	game_lib.key_disable[key_code] = false;
}
/**
 * キー入力カウントを強制的に上書きする
 * @param key_code キー入力カウントを強制的に上書きするキーコード
 * @param n 上書きする値
 */
function key_input_set(key_code: key_code_t, n: int): void {
	game_lib.key_input_count[key_code] = n;
}
/**
 * キー入力カウントを強制的にインクリメントする
 * @param key_code キー入力カウントを
 */
function key_input_increment(key_code: key_code_t): void {
	game_lib.key_input_count[key_code]++;
}

/** マウス移動時のコールバックイベント */
document.addEventListener("mousemove", e => {
	if (game_lib.canvas === null) {
		game_lib.mouse_pos.x = e.clientX;
		game_lib.mouse_pos.y = e.clientY;
	} else {
		game_lib.mouse_pos.x = e.clientX - game_lib.canvas.getBoundingClientRect().x;		// キャンバス内の座標を取得する
		game_lib.mouse_pos.y = e.clientY - game_lib.canvas.getBoundingClientRect().y;
		game_lib.mouse_pos.x /= game_lib.canvas.clientWidth / game_lib.canvas.width;		// 表示サイズとキャンバスの実サイズの比率を修正する
		game_lib.mouse_pos.y /= game_lib.canvas.clientHeight / game_lib.canvas.height;
	}
});
/** マウスボタン押下時のコールバックイベント */
document.addEventListener("mousedown", e => {
	game_lib.mouse_click = true;
});
/** マウスボタン開放時のコールバックイベント */
document.addEventListener("mouseup", e => {
	game_lib.mouse_click = false;
});
/** マウス入力を更新する */
function mouse_input_update(): void {
	if (game_lib.mouse_click) {
		game_lib.mouse_click_count++;
		game_lib.mouse_no_click_count = 0;
	}
	else {
		game_lib.mouse_click_count = 0;
		game_lib.mouse_no_click_count++;
	}
}
/**
 * マウスのキャンバス上の座標を取得する
 * @returns マウスの座標
 */
function get_mouse_pos(): Vector2 {
	return game_lib.mouse_pos.copy();
}
/**
 * マウスが連続でクリックされているカウントを取得する
 * @returns マウスが連続でクリックされているカウント ( 未クリック状態は 0 )
 */
function get_mouse_click(): int {
	return game_lib.mouse_click_count;
}
/**
 * マウスが連続でクリックされていないカウントを取得する
 * @returns マウスが連続でクリックされていないカウント ( クリック状態は 0 )
 */
function get_mouse_no_click(): int {
	return game_lib.mouse_no_click_count;
}

/** マウスホイールイベント ( onmousewheel は非推奨 ) */
document.addEventListener("wheel", e => {
	if (e.deltaY < 0) game_lib.mouse_wheel--;
	else if (e.deltaY > 0) game_lib.mouse_wheel++;
});
/**
 * マウスホイールのスクロール量を取得する
 * @returns スクロール量 ( 下回転は + 上回転は - で移動量を返す )
 */
function get_mouse_wheel(): int {
	return game_lib.mouse_wheel;
}

/**
 * タップ開始イベントのコールバック関数
 * @param event イベント
 */
document.ontouchstart = function (event) {
	game_lib.touch_num = event.touches.length;
	if (game_lib.touch_num >= 1) {	// タップされ始めれば
		game_lib.touch_s.set(event.touches[0].pageX, event.touches[0].pageY);
		game_lib.touch_m.set(event.touches[0].pageX, event.touches[0].pageY);
		game_lib.touch = true;
	}
	if (game_lib.touch_num >= 2) {		// 2つ以上入力があれば
		game_lib.touch_distance = Math.sqrt(Math.pow(event.touches[1].pageX - event.touches[0].pageX, 2) + Math.pow(event.touches[1].pageY - event.touches[0].pageY, 2));
		game_lib.touch_distance_old = game_lib.touch_distance;
	}
};
/**
 * タップしながら移動した時のコールバック関数
 * @param event イベント
 */
document.ontouchmove = function (event) {
	game_lib.touch_num = event.touches.length;
	if (game_lib.touch_num >= 1) {
		game_lib.touch_m.set(event.touches[0].pageX, event.touches[0].pageY);
	}
	if (game_lib.touch_num >= 2) {
		game_lib.touch_distance = Math.sqrt(Math.pow(event.touches[1].pageX - event.touches[0].pageX, 2) + Math.pow(event.touches[1].pageY - event.touches[0].pageY, 2));
	}
};
/**
 * タップ終了イベントのコールバック関数
 * @param event イベント
 */
document.ontouchend = function (event) {
	game_lib.touch_num = event.touches.length;
	if (game_lib.touch_num >= 1) {						// 1つ以上入力があれば
		game_lib.touch_s.set(event.touches[0].pageX, event.touches[0].pageY);		// 入力個数が減っただけなら、残っているほうの座標で初期化する (テレポート対策)
		game_lib.touch_m.set(event.touches[0].pageX, event.touches[0].pageY);
	}
	if (game_lib.touch_num <= 1) {
		game_lib.touch_distance_old = 0;
		game_lib.touch_distance = 0;
	}
	if (game_lib.touch_num == 0) {						// 完全に入力がなくなれば初期化する
		game_lib.touch_s.set(0, 0);
		game_lib.touch_m.set(0, 0);
		game_lib.touch = false;
	}
};
/** タップ入力を更新する */
function touche_input_update(): void {
	if (game_lib.touch) {
		game_lib.touch_count++;
		game_lib.no_touch_count = 0;
	}
	else {
		game_lib.touch_count = 0;
		game_lib.no_touch_count++;
	}
	if (game_lib.touch_num == 2) {
		game_lib.touch_2_count++;
		game_lib.no_touch_2_count = 0;
	}
	else {
		game_lib.touch_2_count = 0;
		game_lib.no_touch_2_count++;
	}

	game_lib.touch_l.x = game_lib.touch_m.x - game_lib.touch_s.x;
	game_lib.touch_l.y = game_lib.touch_m.y - game_lib.touch_s.y;
	game_lib.touch_s.x = game_lib.touch_m.x;
	game_lib.touch_s.y = game_lib.touch_m.y;

	game_lib.touch_distance_old = game_lib.touch_distance;
}
/**
 * タップされているかどうかを取得する
 * @returns 連続でタップされているフレーム数
 */
function get_touche(): int {
	return game_lib.touch_count;
}
/**
 * ダブルタップされているかどうかを取得する
 * @returns 連続でダブルタップされているフレーム数
 */
function get_2point_touche(): int {
	return game_lib.touch_2_count;
}
/**
 * タップされていないかどうかを取得する
 * @returns 連続でタップされていないフレーム数
 */
function get_no_touche(): int {
	return game_lib.no_touch_count;
}
/**
 * ダブルタップされているかどうかを取得する
 * @returns 連続でダブルタップされているフレーム数
 */
function get_no_2point_touche(): int {
	return game_lib.no_touch_2_count;
}
/**
 * 同時タップされている個数を取得する
 * @returns 同時タップされている個数
 */
function get_touche_num(): int {
	return game_lib.touch_num;
}
/**
 * ピンチアウトされた距離を取得する
 * @returns ピンチアウトされた距離 ( ピンチアウトされていない場合は 0 )
 */
function get_pinch_out(): float {
	if (game_lib.touch_num >= 2) {
		return game_lib.touch_distance - game_lib.touch_distance_old;
	}
	return 0;
}
/**
 * タップされた座標を取得する
 * @returns タップされた座標を取得する ( タップされていない場合は x=0, y=0 を返す )
 */
function get_touche_pos(): Vector2 {
	return game_lib.touch_m.copy();
}
/**
 * スライドされた座標を取得する
 * @returns タップ開始座標からの移動量を取得する
 */
function get_touche_move(): Vector2 {
	return game_lib.touch_l.copy();
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
		print_error_log("max より大きな min が指定されました [max=" + max + ", min=" + min + "]");
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
		print_error_log("width_max より大きな width_min が指定されました [width_max=" + width_max + ", width_min=" + width_min + "]");
		const temp = width_max;
		width_max = width_min;
		width_min = temp;
	}
	let width = get_rand((width_max - width_min) * 2);
	width -= (width_max - width_min);
	if (width >= 0) return width + width_min;
	else return width - width_min;
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
	return (get_rand(1) < true_ratio);
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

	let re_img: any = new Image();
	re_img.putImageData(pixels, 0, 0);		// 変更後のピクセルデータで上書きする
	return re_img;
}
/**
 * 一定の範囲をとる値を 0 から最大値までの間で正規化する ( 超過した場合は最大値にするのではなく、最大値で割った余りを返す )
 * @param num 正規化する値
 * @param max 最大値
 * @returns 0 ~ 最大値の間で正規化された値
 */
function normalize_num_loop(num: float, max: float): float {
	num %= max;
	if (num < 0) num += max;
	return num + 0;
}
/**
 * 渡した値を 0 ~ 1 の間に正規化する ( 超過した場合はその値で止める )
 * @param n 正規化する値
 * @returns 0 ~ 1 の値
 */
function normalize_zero_to_one(n: float): float {
	if (n < 0) return 0;
	if (n > 1) return 1;
	return n;
}
/**
 * ラジアン角度 0 ~ PI*2 の範囲に収まるように正規化する
 * @param angle 角度
 * @returns 0 ~ PI*2 の範囲内に正規化された角度
 */
function normalize_angle(angle: angle_t): angle_t {
	return normalize_num_loop(angle, Math.PI * 2);
}
/**
 * num を dest_num まで add_num だけ近づける
 * @param num 値
 * @param dest_num 目標とする値
 * @param add_num 近づけることができる最大の値
 * @returns num を dest_num まで add_num だけ近づけた値
 */
function approach_num(num: float, dest_num: float, add_num: float): float {
	if (num > dest_num + add_num) return num - add_num;
	else if (num < dest_num - add_num) return num + add_num;
	return dest_num;
}
/**
 * ラジアン角度 angle を dest_angle まで最短ルートで add_angle だけ近づける
 * @param angle 角度
 * @param dest_angle 目標とする角度
 * @param add_angle 変更できる最大の角度
 * @returns angle を dest_angle まで最短ルートで add_angle だけ近づけた角度
 */
function approach_angle(angle: angle_t, dest_angle: angle_t, add_angle: angle_t): angle_t {
	angle = normalize_angle(angle);
	dest_angle = normalize_angle(dest_angle);

	angle -= dest_angle;
	angle = normalize_angle(angle);

	if (angle >= Math.PI && angle < Math.PI * 2 - add_angle) angle += add_angle;			// 角度を目標角度に修正する
	if (angle <= Math.PI && angle > add_angle) angle -= add_angle;							// 角度を目標角度に修正する
	if (angle > Math.PI * 2 - add_angle || angle < add_angle) angle = 0;					// 目標と同じ角度をセットする
	return angle + dest_angle;
}
/**
 * 0 ~ 1 の値を徐々に減速しながら増加していく 0 ~ 1 の値に変換する
 * @param n 0 ~ 1 の値
 * @returns 0 ~ 1 の値を 0 の時は 0、1 の時は 1 だが、それ以外は基本的にある程度の値が加算された数値を返す
 */
function get_slow_stop(n: float): float {
	n = Math.sin(normalize_zero_to_one(n) * Math.PI * 0.5);
	return n;
}
/**
 * 徐々に減速するために毎フレーム加算する値の倍率を取得する
 * @param count 現在のカウント
 * @param count_num カウントの最大値 ( 最大カウントまでの返り値の合計がこの値と同じになる )
 * @returns そのカウントで加算すべき値の倍率 ( 1 であれば等速直線運動になる )
 */
function get_slow_stop_add_from_count(count: int, count_num: int): float {
	return (get_slow_stop((count + 1) / count_num) - get_slow_stop(count / count_num)) * count_num;
}
/**
 * 3 次ベジェ曲線を取得する
 * @param t ベジェ曲線の点の位置 0 ~ 1 の範囲で指定する
 * @param control_point_x 曲線の制御点の x 座標
 * @param control_point_y 曲線の制御点の y 座標
 * @returns ベジェ曲線の点の y 座標
 */
function get_cubic_bezier_point(t: float, control_point_x: float = 0.9, control_point_y: float = 0.9): float {
	t = normalize_zero_to_one(t);
	const control_points = [
		new Vector2(0, 0),
		new Vector2(0, control_point_y),
		new Vector2(control_point_x, 1),
		new Vector2(1, 1),
	];

	if (t === 0) {
		return control_points[0].y;
	} else if (t === 1) {
		return control_points[3].y;
	}

	let sub0 = control_points[1].subdivide(control_points[0], t);
	let sub1 = control_points[2].subdivide(control_points[1], t);
	let sub2 = control_points[3].subdivide(control_points[2], t);

	sub0 = sub1.subdivide(sub0, t);
	sub1 = sub2.subdivide(sub1, t);
	return sub1.subdivide(sub0, t).y;
}
/**
 * 数字や文字に対してゼロパディングする
 * @param num ゼロパティングする数値
 * @param length 文字列の長さ
 * @param pad_string パディングする文字
 * @returns ゼロパディングされた文字列
 */
function zero_pad(num: number | string, length: int, pad_string: string = "0"): string {
	return num.toString().padStart(length, pad_string);
}
/**
 * ミリ秒を hh:mm:ss の形式の文字列に変換する
 * @param ms 変換するミリ秒
 * @returns hh:mm:ss の形式に変換されたミリ秒の文字列
 */
function millisecond_to_str(ms: int): string {
	const sec = zero_pad(Math.floor((ms / 1000) % 60), 2);
	const min = zero_pad(Math.floor(ms / 1000 / 60) % 60, 2);
	const hour = zero_pad(Math.floor(ms / 1000 / 60 / 60), 2);
	return hour + ":" + min + ":" + sec;
}


interface Math {
	/**
	 * 配列の総和を取得する
	 * @param array 総和を求める数値のリスト
	 * @returns 配列の総和
	 */
	sum(array: number[]): number;
	/**
	 * 最大公約数を求める
	 * @param a 値 1
	 * @param b 値 2
	 * @returns 最大公約数
	 */
	gcd(a: int, b: int): number;
}
Math.sum = function (array) {
	let total = 0;
	for (let i = 0; i < array.length; i++) {
		total += array[i];
	}
	return total;
};
Math.gcd = function (a, b) {
	if (b == 0) {
		return a;
	}
	else return Math.gcd(b, a % b);
};


interface CanvasRenderingContext2D {
	/**
	 * 左上と右下の座標を指定して矩形を描画する
	 * @param x1 左上の x 座標
	 * @param y1 左上の y 座標
	 * @param x2 右下の x 座標
	 * @param y2 右下の y 座標
	 * @param color 色
	 * @param fill 塗りつぶすかどうか
	 * @param thickness 塗りつぶさない場合は枠線の太さ
	 */
	draw_box(x1: number, y1: number, x2: number, y2: number, color: Color | string, fill?: boolean, thickness?: int): void;
	/**
	 * 円を描画する
	 * @param x 中心の x 座標
	 * @param y 中心の y 座標
	 * @param radius 半径
	 * @param color 色
	 * @param fill 塗りつぶすかどうか
	 * @param thickness 塗りつぶさない場合は枠線の太さ
	 * @param start_angle 描画を開始する角度
	 * @param end_angle 描画を終了する角度
	 * @param counterclockwise 反時計回りに描画するかどうか
	 */
	draw_circle(x: number, y: number, radius: number, color: Color | string, fill?: boolean, thickness?: int, start_angle?: angle_t, end_angle?: angle_t, counterclockwise?: boolean): void;
	/**
	 * 線を描画する
	 * @param x1 描画開始位置の x 座標
	 * @param y1 描画開始位置の y 座標
	 * @param x2 描画終了位置の x 座標
	 * @param y2 描画終了位置の y 座標
	 * @param color 色
	 * @param thickness 線の太さ
	 */
	draw_line(x1: number, y1: number, x2: number, y2: number, color: Color | string, thickness?: number): void;
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
	draw_progress_bar(x1: number, y1: number, x2: number, y2: number, now: number, max: number, color1: Color | string, color2: Color | string, thickness?: number): void;
	/**
	 * フォントオブジェクトを文字列に変換する
	 * @param font_object フォントオブジェクトか、フォント情報を表す文字列
	 * @returns フォント情報を表す文字列
	 */
	font_to_str(font_object: Font | string): string;
	/**
	 * カラーブジェクトを文字列に変換する
	 * @param color_object カラーオブジェクトか、カラーを表す文字列
	 * @returns カラーを表す文字列
	 */
	color_to_str(color_object: Color | string): string;
	/**
	 * 左下の座標を指定して文字列を描画する
	 * @param str 描画する文字列
	 * @param x 左下の x 座標
	 * @param y 左下の y 座標
	 * @param color 色
	 * @param outline_thickness アウトラインの太さ
	 * @param outline_color アウトラインの色
	 * @param font フォント
	 */
	draw_text(str: string, x: number, y: number, color: Color | string, outline_thickness?: number | null, outline_color?: Color | string | null, font?: Font | string | null): void;
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
	draw_text_right(str: string, x: number, y: number, color: Color | string, outline_thickness?: number | null, outline_color?: Color | string | null, font?: Font | string | null): void;
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
	draw_text_center(str: string, x: number, y: number, color: Color | string, outline_thickness?: number | null, outline_color?: Color | string | null, font?: Font | string | null): void;
	/**
	 * 中心の座標を指定して文字列を描画する
	 * @param str 描画する文字列
	 * @param x 中央の x 座標
	 * @param y 中央の y 座標
	 * @param color 色
	 * @param outline_thickness アウトラインの太さ
	 * @param outline_color アウトラインの色
	 * @param font フォント
	 */
	draw_text_center_y(str: string, x: number, y: number, color: Color | string, outline_thickness?: number | null, outline_color?: Color | string | null, font?: Font | string | null): void;
	/**
	 * 左上の座標を指定して文字列を描画し、改行文字で改行する
	 * @param str 描画する文字列
	 * @param x 左上の x 座標
	 * @param y 左上の y 座標
	 * @param color 色
	 * @param outline_thickness アウトラインの太さ
	 * @param outline_color アウトラインの色
	 * @param font フォント
	 * @param pad_y 改行時の y 座標の間隔
	 */
	draw_text_new_line(str: string, x: number, y: number, color: Color | string, outline_thickness?: number | null, outline_color?: Color | string | null, font?: Font | string | null, pad_y?: float): void;
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
	 * 改行を考慮してフォントを適応した文字の横幅を取得する
	 * @param str 横幅を取得する文字列
	 * @param font 適応するフォント ( 指定しない場合はデフォルトのフォント )
	 */
	get_width_str_new_line(str: string, font?: Font | string | null): float;
	/**
	 * 改行を考慮してフォントを適応した文字の高さを取得する
	 * @param str 高さを取得する文字列
	 * @param font 適応するフォント ( 指定しない場合はデフォルトのフォント )
	 * @param pad_y 改行時の y 座標の間隔
	 */
	get_height_str_new_line(str: string, font?: Font | string | null, pad_y?: float): float;
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
	draw_image(img: any, x: number, y: number, width?: number | null, height?: number | null, sx?: number | null, sy?: number | null, s_width?: number | null, s_height?: number | null): void;
	/**
	 * 画像を回転描画する
	 * @param img 描画する画像
	 * @param x 画像を描画する中心の x 座標
	 * @param y 画像を描画する中心の y 座標
	 * @param angle 回転する角度
	 * @param scale 表示する画像の拡大率
	 */
	draw_rota_image(img: any, x: number, y: number, angle?: angle_t, scale?: float): void;
	/**
	 * 画像を疑似的に 3D 描画する
	 * @param img 描画する画像
	 * @param x 画像を描画する中心の x 座標
	 * @param y 画像を描画する中心の y 座標
	 * @param angle_z オイラー角で画像の回転角度を指定する
	 * @param angle_x オイラー角で画像の回転角度を指定する
	 * @param angle_y オイラー角で画像の回転角度を指定する
	 * @param scale 表示する画像の拡大率
	 */
	draw_rota_image_3d(img: any, x: number, y: number, angle_z?: angle_t, angle_x?: angle_t, angle_y?: angle_t, scale?: float): void;
	/**
	 * シームレス画像を指定された範囲に描画する
	 * @param img 描画する画像
	 * @param screen_x 描画範囲の横幅
	 * @param screen_y 描画範囲の高さ
	 * @param image_x 画像の横幅
	 * @param image_y 画像の高さ
	 * @param add_x x 方向のスクロール量
	 * @param add_y y 方向のスクロール量
	 */
	draw_seamless_image(img: any, screen_x: int, screen_y: int, image_x: int, image_y: int, add_x: float, add_y: float): void;
}



// 描画関係
CanvasRenderingContext2D.prototype.draw_box = function (x1, y1, x2, y2, color, fill = true, thickness = 1) {
	this.save();
	this.lineWidth = thickness;
	this.beginPath();
	this.rect(x1, y1, x2 - x1, y2 - y1);
	if (fill) {
		this.fillStyle = this.color_to_str(color);
		this.fill();
	}
	else {
		this.strokeStyle = this.color_to_str(color);
		this.stroke();
	}
	this.restore();
};
CanvasRenderingContext2D.prototype.draw_circle = function (x, y, radius, color, fill = true, thickness = 1, start_angle = 0, end_angle = Math.PI * 2, counterclockwise = false) {
	this.save();
	this.lineWidth = thickness;
	this.beginPath();
	this.arc(x, y, radius, start_angle, end_angle, counterclockwise);
	if (fill) {
		this.fillStyle = this.color_to_str(color);
		this.fill();
	} else {
		this.strokeStyle = this.color_to_str(color);
		this.stroke();
	}
	this.restore();
};
CanvasRenderingContext2D.prototype.draw_line = function (x1, y1, x2, y2, color, thickness = 1) {
	this.save();
	this.strokeStyle = this.color_to_str(color);
	this.lineWidth = thickness;
	this.beginPath();
	this.moveTo(x1, y1);
	this.lineTo(x2, y2);
	this.stroke();
	this.restore();
};
CanvasRenderingContext2D.prototype.draw_progress_bar = function (x1, y1, x2, y2, now, max, color1, color2, thickness = 5) {
	this.draw_box(x1, y1, x2, y2, color1);
	x2 = x1 + ((x2 - x1) - thickness * 2) * normalize_zero_to_one(now / max) + thickness * 2;
	this.draw_box(x1 + thickness, y1 + thickness, x2 - thickness, y2 - thickness, color2);
};
CanvasRenderingContext2D.prototype.font_to_str = function (font_object) {
	switch (typeof font_object) {
		case "string":
			return font_object;
		case "object":
			return font_object.to_str();
		default:
			print_error_log("不明なオブジェクトが渡されました");
			return font_object;
	}
};
CanvasRenderingContext2D.prototype.color_to_str = function (color_object) {
	switch (typeof color_object) {
		case "string":
			return color_object;
		case "object":
			return color_object.to_str();
		default:
			print_error_log("不明なオブジェクトが渡されました");
			return color_object;
	}
};
CanvasRenderingContext2D.prototype.draw_text = function (str, x, y, color, outline_thickness = 0, outline_color = COLOR.white, font = null) {
	this.save();
	outline_color ??= COLOR.white;
	if (font !== null) this.font = this.font_to_str(font);
	if (outline_thickness) {
		this.lineWidth = outline_thickness * 2;
		this.strokeStyle = this.color_to_str(outline_color);
		this.strokeText(str, x, y);
	}
	this.fillStyle = this.color_to_str(color);
	this.fillText(str, x, y);
	this.restore();
};
CanvasRenderingContext2D.prototype.draw_text_right = function (str, x, y, color, outline_thickness = 0, outline_color = COLOR.white, font = null) {
	this.draw_text(str, x - this.get_width_str(str, font), y, color, outline_thickness, outline_color, font);
};
CanvasRenderingContext2D.prototype.draw_text_center = function (str, x, y, color, outline_thickness = 0, outline_color = COLOR.white, font = null) {
	this.draw_text(str, x - (this.get_width_str(str, font) / 2), y, color, outline_thickness, outline_color, font);
};
CanvasRenderingContext2D.prototype.draw_text_center_y = function (str, x, y, color, outline_thickness = 0, outline_color = COLOR.white, font = null) {
	this.draw_text(str, x - (this.get_width_str(str, font) / 2), y + (this.get_height_str(str, font) / 2), color, outline_thickness, outline_color, font);
};
CanvasRenderingContext2D.prototype.draw_text_new_line = function (str, x, y, color, outline_thickness = 0, outline_color = COLOR.white, font = null, pad_y = 5) {
	const text_list = str.split("\n");
	y += + this.get_height_str(text_list[0], font) + 1;
	for (const row of text_list) {
		this.draw_text(row, x, y, color, outline_thickness, outline_color, font);
		y += this.get_height_str(row, font) + pad_y;
	}
};
CanvasRenderingContext2D.prototype.get_width_str = function (str, font = null) {
	this.save();
	if (font !== null) this.font = this.font_to_str(font);
	const width = this.measureText(str).width;
	this.restore();
	return width;
};
CanvasRenderingContext2D.prototype.get_height_str = function (str, font = null) {
	this.save();
	if (font !== null) this.font = this.font_to_str(font);
	const height = this.measureText(str).actualBoundingBoxAscent + this.measureText(str).actualBoundingBoxDescent;
	this.restore();
	return height;
};
CanvasRenderingContext2D.prototype.get_width_str_new_line = function (str, font = null) {
	const text_list = str.split("\n");
	let width = 0;
	this.save();
	if (font !== null) this.font = this.font_to_str(font);
	for (const row of text_list) {
		if (this.get_width_str(row, font) > width) width = this.get_width_str(row, font);
	}
	this.restore();
	return width;
};
CanvasRenderingContext2D.prototype.get_height_str_new_line = function (str, font = null, pad_y = 5) {
	const text_list = str.split("\n");
	let height = 0;
	this.save();
	if (font !== null) this.font = this.font_to_str(font);
	for (const row of text_list) {
		height += this.get_height_str(row, font) + pad_y;
	}
	height -= pad_y;
	this.restore();
	return height;
};
CanvasRenderingContext2D.prototype.draw_image = function (img, x, y, width = null, height = null, sx = null, sy = null, s_width = null, s_height = null) {
	if (sx !== null && sy !== null) {
		s_width ??= width;
		s_height ??= height;

		if (s_width === null || s_height === null || width === null || height === null) {
			print_error_log("引数エラー");
			return;
		}

		this.drawImage(img, sx, sy, s_width, s_height, x, y, width, height);		// 画像を描画
	}
	else {
		width ??= img.width;
		height ??= img.height;

		if (width === null || height === null || width === undefined || height === undefined) {
			print_error_log("引数エラー");
			return;
		}

		this.drawImage(img, x, y, width, height);		// 画像を描画
	}
};
CanvasRenderingContext2D.prototype.draw_rota_image = function (img, x, y, angle = 0, scale = 1) {
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
	this.drawImage(img, (x / scale - img.width / 2), (y / scale - img.height / 2));		// 画像を描画
	this.restore();
};
CanvasRenderingContext2D.prototype.draw_rota_image_3d = function (img, x, y, angle_z = 0, angle_x = 0, angle_y = 0, scale = 1) {
	this.save();
	angle_x = normalize_angle(angle_x * 2 + Math.PI);
	if (angle_x > Math.PI) angle_x = Math.PI * 2 - angle_x;
	angle_y = normalize_angle(angle_y * 2 + Math.PI);
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
CanvasRenderingContext2D.prototype.draw_seamless_image = function (img, screen_x, screen_y, image_x, image_y, add_x, add_y) {
	let count = 0;
	add_x = add_x % image_x;
	add_y = add_y % image_y;
	if (add_x > 0) add_x -= screen_x;
	if (add_y > 0) add_y -= screen_y;

	for (let iy = -1; iy * image_y + add_y < screen_y; iy++) {
		for (let ix = -1; ix * image_x + add_x < screen_x; ix++) {
			this.drawImage(img, Math.floor(ix * image_x + add_x), Math.floor(iy * image_y + add_y), image_x, image_y);
			count++;
		}
	}
	return count;
};



// 特殊系
/**
 * ローカルストレージのキーの名称を渡すと、そのキーに対する値を返す
 * @param key ローカルストレージのキー
 * @param default_val キーが存在しなかった場合のデフォルト値
 * @returns ローカルストレージの値
 */
function get_from_local_storage(key: string, default_val: string | null = null): string | null {
	const val = localStorage.getItem(key);
	if (val === null) {
		return default_val;
	}
	return val;
}
/**
 * 2 次元配列を生成する
 * @param m 一次元の要素数
 * @param n 二次元の要素数
 * @param val 初期値
 * @returns 2 次元配列
 */
function generate_2d_array(m: int, n: int, val: any = undefined): any[][] {
	return Array.from(new Array(m), _ => new Array(n).fill(val));
}
/**
 * Date 型を文字列に変換する
 * @param date 日時
 * @param include_seconds 結果に秒を含めるかどうか
 * @returns 文字列に変換された日時
 */
function date_to_string(date: Date, include_seconds: boolean = true): string {
	let result = date.getFullYear() + "/" + zero_pad(date.getMonth() + 1, 2) + "/" + zero_pad(date.getDate(), 2) + " " + zero_pad(date.getHours(), 2) + ":" + zero_pad(date.getMinutes(), 2);
	if (include_seconds) result += ":" + zero_pad(date.getSeconds(), 2);
	return result;
}
