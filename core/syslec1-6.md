# axios

## axiosとは何か

さて、前回`express`というパッケージを紹介しました。最後、POST通信の待ち受けをどのようにするかを書きましたが、実際にPOST通信を行いませんでした。というわけで、今回はPOST通信を行いたいと思います。

つまり、**クライアントと同じように**POST通信するので、前回までの話とまったく逆の視点からの話になります。

## axiosを入れる
そろそろ慣れてきたと思います。

```
npm install axios
```
コマンドで以上のコマンドを打ちましょう。
では、まずPOST通信をする前に、適当なサイトにGET通信を行いましょう。

以下のコードを打ち込んでください。

```javascript
const axios = require('axios')

const res = axios.get("https://www.google.com/")

res.then((res) => {
    console.log(res.data)
})
```
では、関数について、説明していきましょう。

```javascript
axios.get("https://www.google.com/")
```
この関数は、引数に取ったurl先にGET通信をします。非同期関数です。

```javascript
res.then((res) => {
    console.log(res.data)
})
```

非同期関数の`axios.get()`は戻り値で、GET通信した後サーバーからのレスポンスを返すことになります。
そして、戻り値を受け取った`res`の`.data`というプロパティには、メインになるデータが入っています。今回は、GET通信で、htmlファイルをとってきたので、タグとかが表示されているのではないでしょうか？

## POST通信をしよう
さて、以下のexpressのサーバーを起動した状態にしてください。

```javascript
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('hello')
})
app.post('/', (req, res) => {
    res.send({'greeting': 'goodbye'})
    const data = req.body;
    console.log(data)
})

app.listen(3000)
```
とりあえず、上のコードを見ていきましょう。ここで上のコードは、サーバー側のコードであることに注意しましょう。`app.get`は大丈夫だと思うので、`app.post`について復習しましょう。

`app.post()`の第2引数は、二つの引数をとる関数であることは説明したと思います。そして、POST通信はクライアントからのデータをとってくるものであることも思い出してください。`req.body`という部分にサーバー向けに送られてきたデータが入っています。

今回のコードでは、`console.log(data)`という部分で送られてきた内容をexpressのサーバーが立っているコンソールで表示しています。

では、肝心のクライアント側の説明に移ろうと思います。以下のコードをexpressのコードとはまた別のjsファイルに書いて、新しくターミナルを起動して、実行してみましょう。

```javascript
const axios = require('axios')

const res = axios.post('http://localhost:3000/', {'greeting': 'Hello'})

res.then((res) => {
    console.log(res.data)
})
```

まず、ここの関数です。

```javascript
axios.post('http://localhost:3000/', {'greeting': 'Hello'})
```
この関数は、POST通信を**する**関数です。第1引数にはPOST通信する先のurlで、第二引数には、POST通信する際のデータが入っています。このデータは、オブジェクトで渡してあげましょう。

つまり、今回はこれを書いてあげると、サーバー側で`console.log`されることになります。そして、サーバー側から、`{'greeting': 'goodbye'}`が返されます。

そして、クライアント側の`console.log(res.data)`で表示されることになります。

この処理を追えるようちょっと時間をかけて、見直してください。今回はこれで終わりです。