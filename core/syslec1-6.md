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
では、まず適当なサイトにGET通信を行いましょう。

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