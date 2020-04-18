# express

## はじめに
これからサーバーを建てることになるんですが、クライアントとサーバー、どっちの立場でGET、POST通信の話をしているかをしっかりと区別しましょう。具体的には、今書いているコードはGET通信をするほうなのか、されるほうなのかしっかり区別をつけましょう。そのうえで、このテキストを読まないと、今、自分はなんの処理を書いているのかがまったくわからなくなっていしまいます。 

## 内容に入るよ

さて、前回はデフォルトで入っている`http`というパッケージを使って、実際にサーバーを建ててみました。思い返すと、あれはGET通信される、POST通信される側の処理を書いているのでした。

`http`のパッケージは、デフォルトということもあり、基本的な機能しかついていなく使いづらいです。具体的には、サーバーのルーティングやGET、POST通信の使い分け、ミドルウェアの作成などが面倒です。

というわけで、より機能がついている`express`というパッケージを使って、まずはサーバーを建ててみたいと思います。

まずは、
```
npm install express
```
で、パッケージをインストールしてください。

まずはexpressでサーバーを建てましょう。

```javascript
const express = require("express")
const app = express()

app.get("/", (request, response) => {
    response.send("Hello World!")
})

app.listen(3000)
```

以上を実行してみてください。そして、[http://localhost:3000](http://localhost:3000)にアクセスしてみてください。ちゃんと表示されましたか？ 簡単に書けますね。

では、詳しい（関数の使い方の）説明に移りたいと思います。

```javascript
const express = require("express")
const app = express()
```
ここの部分はおまじないでいいです。こういうものだと思いましょう。

```javascript
app.get("/", (request, response) => {
    response.send("Hello World!")
})
```
この関数からです。この関数はGET通信が**された**際の処理について書かれています。第一引数はurlです。え？ 短くないって？ これより上のurlはこのサーバーが立っている場所を指定するもので、その後のurlについての指定をしています。

今回の例では、`http://localhost:3000`までがこのプログラムのサーバーをさすurlで、その下の`/`というところは、`http://localhost:3000/`という場所をさすことになります。つまり、`/hoge`とかにすれば、`http://localhost:3000/hoge`についての処理を書くことになります。

第二引数について見ていきたいと思います。これは関数ですね。requestやresponseのメソッドを実行することで、いろいろな処理を書くことができます。いちおう、request、responseに何が入っているのかをみましょうか。

[expressのリファレンス](https://expressjs.com/ja/api.html)を見るといろいろなメソッドがあることがわかります。今回は`send()`と`end()`について、プレーンテキストを送信する方法だけを説明します。もちろんhtmlファイルを送ったり、htmlテンプレートやjsxもパッケージを入れることで確か扱えるはずです。

`.send()`は簡単です。渡してあげたものがGET通信された際、クライアントに送られます。
例では、プレーンテキストを送信しています。

`.end()`はサーバーとの通信が終わったことを示します。明示的に読んであげるといいです。（呼ばなくても、`express`が何とかしてくれると信じています。

以上、GET通信の**待ち受ける**関数です。
```javascript
app.listen(3000)
```
ここで、サーバーを立てるポート番号を指定します。はい。ちなみに第2引数に関数をとることができ、サーバーが立った後、実行されます。

## POST通信も待ち受けよう

POST通信を待ち受けることもexpressなら簡単です。

まず、以下のコードを`require()`の直後においてください。
```javascript
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
```

そのうえで、以下のように書くことができます。
```javascript
app.post("/", (request, response) => {
    let body = request.body
    response.send('Hello')
})
```
ほとんど、GET通信の場合と同じです。少し違うのは、`request.body`というプロパティを使っているところでしょうか？ ここには、POST通信に送られてきたオブジェクトが入っています。

こういう感じで、使うことができます。
