# JavaScriptを書いてみよう

## はじめに

第3回、第4回のテキストは初めてプログラミングに触る人向けに書きました。もし、触ったことがあるなら、適宜読み飛ばしてください。

### 今回の目標
皆さんは第1回、第2回でhtmlとcssを用いて、簡単なページを作ったと思います。今回はJavaSriptをどこに書けばいいのかがわかるのが目標です。

### 内容に入る前に
JavaScript（以下、JS）で何かできるのでしょう。
[公式のリファレンス](https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/What_is_JavaScript)から自分の言葉で要約していこうと思います。

第1回でも扱ったかもしれませんが、（第1回の内容を把握していません）ウェブページを作る上で、以下のように機能が分かれています。

#### HTML
これは、文章の構造を決めるんでしたね。

#### CSS
これは文章の装飾をするんですね。

さて、本題のJSですが、これは主にウェブページで複雑な機能や動きをつけるプログラミング言語です。ですから、ボタンを押したらページの色が変わるとか、ゲームを作るとか、[要素がふわりと浮かび上がってくる](https://office.cybozu.co.jp/)のとかを実装することができます。

### 補足
用語の補足をしていこうと思います。

#### プログラミング言語
プログラミングをするのにあたって、いろいろな書き方やルールがあります。それぞれを言語と呼びます。例えば、HTMLやCSSもそれぞれ異なる言語と言えます。ほかには、PythonやC++とかJava（JavaScriptとはまったく別の言語）とかの言語もあります。

ちなみに、HTMLのような文章の構造を表す言語のことをプログラミング言語ではなく、**マークアップ言語**と読んだりします。

#### コード
コードです。プログラミング言語で書く文章があると思います。その文章をコードと呼びます。プログラミング言語を書くことを「コードを書く」とか言ったりします。

* * * 

## Hello World!
何ができるか書かないとわからない思うのでとりあえず、書いてみましょう！
以下のコードをhtmlファイルの`head`タグの中に書きましょう。

```html
<script>alert("Hello World!")</script>
```

では、書いたhtmlファイルを見てください。そうすると、うえから「Hello World!」と現れたと思います。
ここで`alert()`のかっこの中に何か入れるとそれが表示されると思っといてください。

そこで、今度は、`Hello World!`の所を`こんにちは`と置き換えてください。そうすると「Hello World!」となっているところが変わりましたか？

## 一文ずつ実行される？

プログラミングをするうえで大変なのは、どういう順番で実行されるのかを把握することだと思います。

以下のコードを書いてみましょう！
```javascript
alert("Hello World!")
alert("こんにちは")
```
そうすると、「Hello World!」→「こんにちは」の順番で表示されたとおもいます。このように**基本的には**上から順番に実行されていきます。

## ファイルを分けよう

ここで、少しCSSを書いたときを思い出しましょう。おそらく、cssのファイルを分けたと思います。
同じようにJSでもファイルを分けることができます。そのほうが、機能ごとにどこを直せばいいかが見やすくなりますね。

ということで、htmlファイルと同じ階層に、`main.js`というファイルを作りましょう！ わからない場合には周りの2年生に聞いてみてください。
そして、以下のようにさっき書いたHTMLファイルのコードを変えてみてください。

```html
<script type="text/javascript" src="main.js"></script>
```
さて、htmlファイルを見てみてください。何も起きないはずです。何かを起こしてみましょう！

まず、さっきの`main.js`というファイルをVS Codeで開いてください。そして、以下のコードを追加しましょう。
```javascript
alert("Hello World")
```
はい、再びhtmlファイルを見てみてください。そうするとさっきと同じようにHello World!と出ていると思います。やった！

## デバッグをしよう！

プログラムがうまく動かない時があります。その時、動かない原因を**バグ**（bug）といいます。そして、バグを取り除くことを、デバッグ（de + bug）といいます。

では、動かない時、どのようにデバッグすればいいのでしょうか？ 今回のようにいちいちウィンドウの上にHello World!とか出していたらうっとおしいですね。というわけで、以下のように普通はします。

では、jsファイルの中を消してもらって、以下のコードを書いてみましょう！

```javascript
console.log("Hello World!")
console.log("こんにちは")
```
今度はどこに表示されたのでしょうか。ブラウザで検証を開きましょう！そして、consoleと書いている所を押してもらうと見えたでしょうか？ 今回はエラーは出ていませんが、何かエラーが出たらこのコンソールに表示されます。今後いろいろ開発するときに、こんな感じにいろいろ表示させて、これからデバッグをしていきます。

## 数字を出してみよう！

今度は数字を出してみましょう！ では、せっかく`console.log`を勉強したので、それを使って以下のように書いてみましょう!

```javascript
console.log(1)
```
では、検証を見てください。`1`と出力されているはずです。

## コメントを書こう！
開発していくに当たって1か月前に自分が書いたところを書き直すといったことをする場合がよくあります。
その時、何をしたかったのか基本的には忘れます。そういうとき、自分の書いたコードに対して、ここはこういうことをしたんだよみたいにコメントをつけたくなると思います。

では、JSでのコメントを書いてみましょう。二通りの書き方があります。
```javascript
// コメント
console.log("Hello World!")　//コメント
/*コメント*/ console.log("Hello World!")
```
`//`のほうは、`//`を書いた後ろがすべてコメントになります。

`/**/`のほうは、その中身がコメントになります。

## htmlでコメントを書くには
htmlファイルやcssファイルにコメントをかけないのかみたいな疑問を覚えたでしょう。たぶん。ちゃんと書けます。

### htmlの場合
`<!--中身-->`こんな感じのもので囲った部分がコメントとなります。
```html
<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <p>Hello World!</p>
        <!--　コメント
            コメント
         -->
    </body>
</html>
```
### cssの場合
`/*中身*/`で囲った部分がコメントとなります。
```css
hoge {
    color: #ffff00;
    /*コメント*/
}
```

この章はこの辺で終わります。