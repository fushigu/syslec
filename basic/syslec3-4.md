# 条件式
## 目標
if、if else、else文を使えるようになる。

## if文
さて、ここから本格的にプログラミングをしていくことになります。ここで、もう一度、実行の順番は上からであることを思い出しましょう。頑張りましょう！

まず、if文です。以下のように書きます。

```javascript
if (条件式) {
    条件式が真なら処理される内容
}
```
実際に、動かす前に条件式の書き方を勉強しましょう！

以下のことは覚えるといいと思います。

### 同値
同値です。`=`ではなく、`===`とかくと同値かどうかを判定できます。

例
```javascript
let a = 1
if (a === 1) {
    console.log("aは1です")
}
```
```javascript
let a = "あ"
if (a === "あ") {
    console.log("aはあです。")
}
```

### 同値でない
同値の逆です。`!==`と書きます。なんか`=`を一つ`!`に変えた形ですね。

例
```javascript
let a = 1
if (a !== 1) {
    console.log("aは1ではないです。")
}
```
### 不等号
大小比較をします。主に、数値が入った変数同士を比較するのに使われます。

例
```javascript
let a = 1
if (a > 0) {
    console.log("aは正です。")
}
```
`≧`も使えます。この場合は、`>=`のように`=`を後ろにずらします。

例
```javascript
let a = 0
if (a >= 0) {
    console.log("aは0以上です")
}
```

### 論理演算子
数学でいう「かつ」、「または」と否定に当たります。

まず、「かつ」にあたるものから見ていこうと思います。`式 && 式`みたいにしてあげればいいです。

例
```javascript
let a = 0
let b = 12
if (a >= 0 && b >= 0) {
    console.log("aもbも負数ではないです。")
}
```

「または」は、`式 || 式`みたいにしてあげればいいです。

例
```javascript
let a = 3
let b = -12
if (a >= 0 || b >= -12) {
    console.log("aまたはbが負数ではないです。")
}
```
否定は、`!(式)`のように書き、式のところの真偽をひっくり返します。

例
```javascript
let a = 3
if (!(a < 0)) {
    console.log("aは負数ではないです。")
}
```

## else文
さて、そろそろif文では満足できなくなってきた頃でしょうか？ おそらく、条件式で偽になった時の処理を書きたいを思っているのではないでしょうか？ そういう時にelse文を使いましょう。以下のようになります。

```javascript
if (条件式) {
    条件式が真なら処理される
}
else {
    条件式が偽なら処理される
}
```

僕は、これでも満足できません。例えば、条件式で偽になった時、もう一度、if文で何かを評価したくなります。
そういう時に、if else文があります。

```javascript
if (条件式A) {
    条件式Aが真のとき
}
else if (条件式B) {
    条件式Aが偽で、条件式Bが真のとき
}
else {
    条件式Aが偽で、条件式Bも偽のとき
}
```

## 何かしよう！
当然、何かをしたくなりますよね。では、倍数の判定をしてみましょう！剰余の演算子`%`は覚えていますか？ それを使っていこうと思います。

```javascript
let num = prompt("数字を入れてください")
if (num % 4 === 0) { // 4の倍数なら
    alert("4の倍数です")
}
else if (num % 2 === 0) { // 4の倍数でなく、2の倍数なら
    alert("4の倍数ではなく、2の倍数です。")
}
else { //上のいずれでもない
    alert("4の倍数でもなく、2の倍数でもないです。")
}
```

ぜひ、ほかの条件も入れて見て、いろいろ遊んでみてください。

この章はこれで終わりです。

## 補足1
補足です。これは時間的にと頭に余裕があれば扱います。

いままで扱ってきた変数の値は何でしょうか？ おそらく、数値と文字列の2種類だと思います。これ以外にも変数の値があります。

### 真偽値
多分、は？ってなったと思います。変数には真偽の値を入れることができます。
```javascript
let a = true
let b = false
if (a) {
    console.log("真")
}
if (!b) {
    console.log("偽")
} 
```

### undefined
undefinedです。そのままで、変数が未定義のときにこの値を代入したり、もとからこの値が入っています。

```javascript
let a
console.log(a)
```

### null
nullです。僕はよくわかりません。[公式リファレンス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/null)によると、存在しないときに用いるそうです。

```javascript
let foo = null
console.log(foo)
```

### NaN
ナンです。またまた、[公式リファレンス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/NaN)によると、変数から数値を読み取るときに失敗したときに使われるそうです。自分では使わないとも書いてあります。

例が思い浮かばなかった。

## 補足2
補足です。わざわざ補足を書いているのは、ここをやりたかったということもあります。さて、if文の条件式にちゃんと数学的に真偽が定まるものを入れたと思います。なにが言いたいかわからないと思うので以下を実行してみてください。

```javascript
let a = 1
if (a) {
    console.log("真だよ")
}
else {
    console.log("偽だよ")
}
```
どうなりましたか。たぶん、真となったのではないでしょうか。不思議ですね。実は、JavaScriptはこんな感じで条件式では数学的な真偽を判断しているわけではないです。

試しにほかの値も入れてみてください。どうですか？ 上の`undefined`とかも試しましたか？ `0`とかも試してみるといいと思います。

ここに覚えておいてほしい真偽値の値の一覧を書いておきます。偽となるものを覚えておいてほしいです。どうせ、開発すると何度もundefinedの文字は見るからいやでも覚えます。

真となるもの

* undefined === undefined
* null === null
* 0以外の数字と文字（"0"は文字で真だよ)
* "0"

偽となるもの
* 0
* undefined
* null
* NaN
* NaN === NaN（これはおもしろいから載せた）

補足終わり