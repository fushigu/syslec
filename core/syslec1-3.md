# Node.jsについて知ろう

## はじめに
僕がNode.jsの勉強を始めてちょうど1年ぐらいになります。一応、リファレンスやそのほかの記事を読み漁りながらの勉強なので、関数や言葉の使い方が間違っている、こういう考え方は違うということがあると思います。特にurlという言葉は本当に雑に扱います。というわけで、このテキストは自分が知っていることをできる限り触れるようにしていき、より深いことを学ぶ一助となればいいなと思います。

## Node.jsとは

みなさん、JavaScriptをどのように勉強してきましたか？
ブラウザで開いて見ていたと思います。
おそらくそこでふと思います。「JavaScript書くのにいちいちhtmlのファイルも作るなんてめんどくさい」「JavaScript単体でテストしたい」と。

そんなあなたにNode.jsというわけです。（これは創作です。実際の開発目的は別です。）

つまり、Node.jsはブラウザのJavaScriptを実行する部分だけを持ってきたものです。ちなみに、Node.jsはブラウザのV8という名前のJavaScript実行エンジンをもとに作られています。

というわけでJavaScriptを実行してみましょう。まず、適当なフォルダを作り、そこでtest.jsというjsファイルを作りましょう。そして、以下のコードを書き込んでください。

```javascript
console.log("Hello World!")
```

さて、お待ちかねの実行です。まず、ターミナルでtest.jsというファイルがある階層まで移ってください。これ以降この階層でコマンドを打つこととします。そして、以下のコマンドを打ってください。

```
node test.js
```

ちゃんと表示されたでしょうか？

ちなみに、jsファイルを表す`.js`の部分は省略可能です。

また、ブラウザでいう画面がないので、`alert()`とか`prompt()`という関数は（たぶん）使えないはずです。

## node package managerを使ってみよう

さて、みなさんJavaScriptをかけますね。というわけなので、サーバーを立ててください。と言われても、おそらく無理でしょう。

そういう時に便利な関数のセットをダウンロードすることができます。その仕組みがnode package managerです。

補足ですが、`yarn`というマネージャーもあります。今回は正しい入れ方がよくわからないので、npmでいこうと思います。

というわけで使いましょう。使う際はフォルダごとにパッケージをインストールできます。（ここ重要）というわけで、さっきjsファイルを作ったフォルダでパッケージを使いましょう。

```
npm init
```

とりあえず、何か出てきますが、それはパッケージの設定です。基本的にはリリースをしなければ関係ないです。

`package.json`というファイルができたと思います。ここにはどういうパッケージをインストールしたか、コマンドのショートカットみたいなものが書かれていきます。こうすることで、インストールしたパッケージ全部を共有しなくても、この`package.json`を共有すればよくなります。

これで使えるようになりました。試しに、なんかのパッケージをインストールしましょう。

今回は`nanoid`をインストールして、どのようにパッケージをインストールできるかをみてみましょう。`nanoid`はランダムな文字列を生成する関数が入ったパッケージです。

パッケージは以下のようにインストールできます。
```
npm install パッケージ名 --save
```

ちなみに、`--save`という部分はどういうパッケージをインストールしたかを記述させるオプションです。つけましょう。

`nanoid`をインストールしましょう。
```
npm install nanoid --save
```
とします。これでインストールできました。


インストールしたら、`package.json`を見てください。dependencyという欄に、`nanoid`が増えていますでしょうか。こういう感じで、インストールしたパッケージが書かれていきます。

では、jsファイルでnanoidを使いましょう。以下のように書きます。

```javascript
const 変数 = require("パッケージ名")
```

変数の中に関数が入っていく感じです。`nanoid`の場合は
```javascript
const nanoid = require("nanoid")
```
というわけで、これでnanoidをjsファイルの中で使えるようになりました。では、以下のコードをコピペして動かしましょう。

```javascript
const nanoid = require("nanoid")

let str = nanoid()
console.log(str)
```

さて、いま`node test.js`みたいにして、動かしたと思います。実はnpmにはコマンドを保存する機能がついています。
```
"script": {
    "名前": "呼び出すコマンド",
}
```

では、試しに`package.json`の`script`を以下のように書き換えてみてください。
```
"script": {
    "test": "node test.js",
}
```

これで、コマンドが使えるようになりました。コマンドの呼び出し方は以下のようになります。

```
npm run 名前
```

というわけで、ここでは
```
npm run test
```
となります。

これで、npmは使えるようになりましたね。


## require文について

さて、大きなプロジェクトを開発していくと一つのファイルにまとめると開発しづらいですね。そういう時のために、実はNode.jsはファイルを分割出来ます。

次のは分割したファイルです。

compare.js
```javascript
function max(x, y) {
    if (x > y) return x
    else y
}
function min(x, y) {
    if (x > y) return y
    else x
}

module.export = {
    max: max,
    min: min
}
```

test.js
```javascript
const comp = require("compare.js")

console.log(comp.max(10, 5))
console.log(comp.min(10, 5))
```

`compare.js`の最後の部分は以下のようにもかけます。
```javascript
module.export.max = max
module.export.min = min
```
これ以外の書き方もあるんですが、リファレンス読んでも、これ以外の書き方について理解が生えなかったので、これで終わります。

## 非同期関数について補足

かなり重要なことをこれから説明したいと思います。確かJavaScript入門のところでプログラムは上から順番に実行されると書きました。しかし、それでは不便な場合があります。具体的には、一つの処理をするのに、時間がかかるときにほかの処理に移りたい時があります。実はそういうことがNode.jsでは簡単にすることができる機能があります。

より詳細に説明すると、ある処理を終わらせることなく、関数から抜ける関数が定義できます。基本的には、自分で定義することは少ない（定義するようなことをしない）ので、ここではどういう風に定義されている非同期関数を扱うのかを見ていくことにします。気になる人はPromiseを勉強してください。教えてもいいんですが、今回はもっとほかの内容も説明しきりたいので、この部分を書くのに参考にした[Promiseの本](https://azu.github.io/promises-book/)という教材をシェアしておきます。

以下をコピペしてください。
```javascript
setTimeout(() => console.log("16ms have been passed"), 16)
console.log("Hello World")
```
実行してみると、setTimeoutの中に書かれた処理より、下の処理が先に実行されました。これが非同期関数のお気持ちです。このように、実行する順番に気をつけないといけないことがわかりましたか。例えば、非同期関数の戻り値を使って何かをするとき、その非同期関数が実行し終わったかをちゃんと確認しないといけないです。

## then catchを使う
非同期関数にはいくつかの種類がありますが、いま一般的なものはPromiseを使った関数です。その場合のとき、どのように扱うのかについて注目して、見ていきたいと思います。

本来は、Promiseについて詳細に扱った上で、色々教えたいのですが、ほかの話題も扱いたい関係上、割愛します。もし、意欲があるなら上のPromiseの本を読んでみてください。非常に丁寧に書かれています。

```javascript
function asyncFunc(num) {
    return new Promise((resolve, reject) => {
        if (num === 42) reject(new Error(42))
        resolve(num)
    })
}
let num = 10
asyncFunc(num)
.then(function(res) { console.log(res) })
.catch(function(err) { console.log("error num: " + String(err)) })
console.log("hello")
```
上の例をコピーして実行してみてください。そうすると、`hello`の後に`num`という順番で表示されたのがわかるでしょうか。そうです。`asyncFunc()`は非同期関数です。

しかし、よく見ると、`.then(無名関数)`と`.catch(無名関数)`というものが関数に引っ付いているのがわかるでしょうか。非同期関数が正常に実行を終えたら`.then`内の関数を、正常に終えなかったら`.catch`内の関数を実行するようになります。

上の例では`asycnFunc`に42を渡すとエラーを吐くようにしたので、遊んでみてください。

## async await
上の書き方では、非同期関数が続くと`.then`や`.catch`が何個も続いてうざったいです。そういう時に、普通の関数と同じ**ように**書く方法があります。それが、`async await`を用いる方法です。

簡単に説明すると、async関数内で非同期関数にawaitをつけると同期関数と同じようにふるまいます。何を言っているかわからいと思うので、以下の例を見てください。

```javascript
//非同期関数
function asyncFunc(num) {
    return new Promise((resolve, reject) => {
        if (num === 42) reject(new Error(42))
        resolve(num)
    })
}

async function callasync() { //先頭に`async`とつけることでaysnc関数になります。
    let value = await asyncFunc(12) //非同期関数の先頭に、`await`とつけることでasyncFuncが実行を終えるまで待ってくれます。
    console.log(value)
    console.log("Hello")
}

callasync()
```
あんまりよくない例ですね。一応、同期関数っぽいふるまいをしていることを実感するために`await`を外してみてください。そうすると、`value`がよくわからないPromiseなんちゃらみたいな文字列になっていますね。

とりあえず、非同期関数がこれからよく出てくるので、非同期関数の戻り値を使って何かをする場合には気を付けましょう。

さて、一番重要なことを忘れています。そうです。エラー処理です。`async await`にしたことで、.catchにあたる部分がなくなってしまします。そういう時は`try{}catch{}`です。

これは`try{中身}`に書いた処理で何かしらのエラーがおこった場合、catchのほうに処理が移ります。

さっきのコードを書き直してみると、
```javascript
//非同期関数
function asyncFunc(num) {
    return new Promise((resolve, reject) => {
        if (num === 42) reject(new Error(42))
        resolve(num)
    })
}

async function callasync() { //先頭に`async`とつけることでaysnc関数になります。
    try{
        let value = await asyncFunc(12) //非同期関数の先頭に、`await`とつけることでasyncFuncが実行を終えるまで待ってくれます。
        console.log(value)
    }
    catch{
        console.error("error")
    }
    console.log("Hello")
}

callasync()
```

という感じになります。エラーが起きても起きなくても処理したい内容のためにfinallyというものがあることに触れといて終わります。
