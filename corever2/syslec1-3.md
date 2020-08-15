# axiosを使おう

## axiosを入れる
axiosと呼ばれるnodeのパッケージがあります。それを入れましょう。
このパッケージではHTTP通信をするための関数を用意していてくれます。
入れ方は
```
npm install axios
```
とコマンドを打つとできます。

というわけで使っていきましょうとしてもいいですが、まずHTTP通信とは何かを知らないといけません。

## どこにサーバーが建っているの？

さて、みなさんページが表示されていると思います。どこに表示されているのでしょうか。まずは、普通のウェブページがどのように表示されているかを考えましょう。

普通のウェブページを表示するために皆さんのパソコンと同じものがインターネットにつながっています。IPアドレスというビルの住所みたいなものをもとに、そのウェブページがおいてあるパソコンにアクセスします。そして、ビル（ウェブページがあるパソコン）の部屋にあたるものがポート番号です。上のコードの`3000`というところでポート番号を指定しています。

では、どのようにウェブページを見るときにアクセスしていますか？ もちろん、IPアドレスでもアクセスできます。
ためしに、[http://216.58.220.131/](http://216.58.220.131/)にアクセスしてみてください。ちゃんとつながります。

しかし、IPアドレスではアクセスせず、urlでアクセスしていると思います。実は、ブラウザはurlが入力されたときに、urlとIPアドレスの対応表を持っているサーバー（ごまかしが入っている）にアクセスするようになっています。それで、IPアドレスを取ってきて、そのサイトにアクセスできるようになります。

![参考図](https://xtech.nikkei.com/it/article/COLUMN/20100120/343515/A55.jpg)

## 通信方法について

どこにあるサーバーから情報を取ってくるかわかったと思います。では、次にどのように取ってくるのかをを知りましょう。
情報の教科書でGETとかPOSTとかという言葉を聞いたことはあるでしょうか。情報を取ってくる際には、HTTP通信と呼ばれるHTTPというプロトコル（約束事）を決めて通信をします。
HTTPというプロトコルにはいくつかのメソッドが存在します。

- GET       / 指定されたURIのリソースを取り出す。
- POST      / 指定されたURIのリソースを取り出す。
- PUT       / 指定したURIにリソースを保存する。
- DELETE    / 指定したURIのリソースを削除する。

などです。GET通信はウェブページを見る際、一番最初にする通信です。
GET通信は普段ウェブページを閲覧するときにしている通信です。このおかげで、htmlファイルをurlで指定したウェブサーバーからとってくることができます。

今回はGET通信に焦点を当てて、PUTとかは紹介だけして、終わります。使い分けに関しては、REST APIで検索するといいかもしれません。

## 実際にGET通信をしてみる

では、実際にGET通信をしてみましょう。以下のようにするとGET通信をすることができます。
``` javascript
const axios = require('axios')

const respond = axios.get("https://google.com")
```

ここで、`axios.get`は引数にurlを取ってGET通信をしてくれる関数です。
では、respondをコンソールに表示させてみましょう。

おそらくうまくいかず、`Promise`と表示されたのではないでしょうか。
これは非同期関数と呼ばれていて、実行の順番が変わっています。つまり、上から順番に実行されるという原則が少し崩れます。
というわけで非同期関数について学習していきましょう。

## 非同期関数について
### まずは同期関数から
関数には、2種類の評価があり、同期処理と非同期処理という分類があります。

同期処理とは今まで書いてきたものがそうです。順番に実行されて行って、実行されている処理が終わるまで次の実行がされません。
しかし、これには一つ問題があります。

``` javascript
// 指定した`timeout`ミリ秒経過するまで同期的にブロックする関数
function blockTime(timeout) {
    const startTime = Date.now();
    // `timeout`ミリ秒経過するまで無限ループをする
    while (true) {
        const diffTime = Date.now() - startTime;
        if (diffTime >= timeout) {
            return; // 指定時間経過したら関数の実行を終了
        }
    }
}
console.log("処理を開始");
blockTime(1000); // 他の処理を1000ミリ秒（1秒間）ブロックする
console.log("この行が呼ばれるまで処理が1秒間ブロックされる");
```

上の関数を実行してみてください。
そうすると、上のblockTimeを実行している間、下に書いてある関数が実行できなくなります。これは問題で、例えば、描画に関する関数が
下のほうで実行されているとすると、画面がフリーズしたようになります。つまり、画面をスクロールするという処理ができないといった影響が出ます。

### 非同期関数へ

どうしましょうか。非同期関数を作るところから見てもいいのですが、今回は非同期関数を使うに焦点を当てましょう。

非同期関数は関数の処理が**完了**するのをひとまず置いといて、次の処理に行く関数です。こうすると、関数の終了時点を取得するというコードを書かないといけませんが、全体の実行が早くなります。

いろいろな実現方法がありますが、まずはコールバック関数と呼ばれる種類の非同期関数を見てみましょう。

というわけで手ごろな非同期関数として、ファイルを読む`fs.readFile`という関数を使いましょう。

``` javascript
const fs = require('fs')
fs.readFile("./hoge.txt", function(error, data) {
    if (error) {
        // エラーが発生したとき
        console.error("Something wrong. Maybe file is not found")
    }
    else {
        // データが正しく読み込まれたとき
        console.log("This is content.", data)
    }
})
console.log("fs.readFileの直後の関数")
```
上のコードを実行すると非同期処理の順番とかがわかるでしょうか。fs.readFileが非同期関数でその処理が終わったら、次に実行する関数として引数に渡しています。

さて、これで実行が早くなってめでたしめでたしとはなりません。以下の処理をしたい時があります。その場合どういうコードを書くことになるのでしょうか。

1. hoge.txtを読み込む
2. 1を受けて、次にfuga.txtを読み込む
3. 2を受けて、次にexample.txtを読み込む

上の「読み込む」というところはすべて非同期関数で実行しようと思います。そうすると以下のような実装になるんではないでしょうか。

``` javascript
const fs = require('fs')

fs.readFile("./hoge.txt", function (error, data) {
    if (error) {
        console.error('cannot read hoge.txt')
    }
    else {
        console.log(data)
        fs.readFile("./fuga.txt", function (error, data) {
            if (error) {
                console.error('cannot read fuga.txt')
            }
            else {
                console.log(data)
                fs.readFile("./example.txt", function (error, data) {
                    if (error) {
                        console.error('cannot read example.txt')
                    }
                    else {
                        console.log(data)
                    }
                })
            }
        })
    }
})
```

上の実装ははっきり言って読みにくいです。どこが読みにくいというかというと、コールバック関数の中にコールバック関数が入れ子になっていて、それが続いているからということに気づきます。
このことを改善するために、Promiseと呼ばれるものができました。

では、Promiseはどうやって非同期処理を行うのでしょうか。基本的には処理の内容はコールバック関数と同じことをしていますが、うまくパターン化して関数の外にその非同期処理の次に行いたいことを記述することにしました。
ここでは、Promiseを使った関数を使うに焦点を当てていきたいと思います。ゆくゆくは自分でもPromiseを使った非同期処理を書けるようになってほしいです。

例を見ていきましょう。
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

しかし、よく見ると、`.then(無名関数)`と`.catch(無名関数)`というものが関数に引っ付いているのがわかるでしょうか。非同期関数が正常に実行を終えたら`.then`内の関数を、正常に終えなかったら`.catch`内の関数を実行するようになります。この時、`.catch()`は必ず書きましょう。

上の例では`asycnFunc`に42を渡すとエラーを吐くようにしたので、遊んでみてください。

この時、.then()という部分はいくつも連ねることができます。

```javascript
function asyncFunc(num) {
    return new Promise((resolve, reject) => {
        if (num === 42) reject(new Error(42))
        resolve(num)
    })
}
let num = 10
asyncFunc(num)
.then(function(res) {
    console.log(res)
    return asyncFunc(12)
})
.then(function (res) {
    console.log(res)
    return asyncFunc(42)
})
.then(function (res) {
    console.log(num)
})
.catch(function(err) { console.log("error num: " + String(err)) })
console.log("hello")
```
上の例では、asyncFunc()を.then()の中の関数で呼んで返しています。

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

という感じになります。エラーが起きても起きなくても処理したい内容のためにfinallyというものがあることに触れといて非同期関数については終わりにします。

## 本題へ
何をしていましたか。覚えていますか。はい、GET通信をするんでした。
では、htmlファイルを取ってきましょう！

``` javascript
const axios require('axios')

axios.get('https://google.com')
.then((response) => {
    console.log(response.data)
})
```
htmlファイルが表示されたでしょうか。

もうちょっとまとめると以下の感じになります。ここで通信の種類というのはHTTP通信の種類です。つまり、GET通信やPOST通信といったものです。
``` javascript
axios.[通信の種類](url)
```
結果はPromiseを使ってあげて、.then()の中に入れる関数の第一引数に入っています。

## 天気予報を取得しよう
GET通信を使って何かしてみましょう。

今回は天気予想を取得できる[サービス](http://weather.livedoor.com/weather_hacks/webservice)を使って行きたいと思います。

### urlのパラメータについて
urlに情報をわたしてアクセスをしてあげることができます。パラメータと呼ばれます。

![パラメータ付きurlの例](https://innova-jp.com/files/8215/5184/4395/para_03.png)

urlの最後に`?`から始まる部分です。基本的には`パラメータ名=値`という感じで並んでいると思います。

### では、天気予報を取得しよう
GET通信する先は以下のように指定してあげてください。

```
http://weather.livedoor.com/forecast/webservice/json/v1?city=[都市の番号]
```
都市の番号は[さっきのページ](http://weather.livedoor.com/weather_hacks/webservice)から調べてください。
では、GET通信したデータを表示してみましょう。

そうすると何やら複雑なデータが出てくると思います。これも[さっきのページ](http://weather.livedoor.com/weather_hacks/webservice)を見てみてください。そして正しく表示してみましょう。






