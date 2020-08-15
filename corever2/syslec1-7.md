# データベースを使おう

疲れてきますね。こんだけ書いていると。

## 何をするのか
何を書いているのか、開発時のどういう部分になるのかがわからないと、何を勉強しているのかまったくわからないです。前に載せた図をもう一度、載せます。

![サーバーの構築](https://themarketingtechnologist-ghost.s3.amazonaws.com/2017/May/1200_628_MarketingTechnologist_Post_header_Template-1496124936584.png)


いままで、expressとaxiosというパッケージを使って、クライアントとサーバー間のGET通信POST通信を書いていきました。今回の内容はデータベースサーバーMondoDBとapiとなるサーバー間の通信についての方法です。

より詳しく述べるとフロントとなるクライアントのアプリから、ユーザーから入力されたデータやデータをサーバーに対して、要求してきます。そういう際、サーバーのMongoDBからどうやって、データを取り込むかを見ていくということです。

## パッケージについて
Node.jsでMongoDBに接続するパッケージはいくつかあります。有名なのでは、`node-mongodb-native`というパッケージと`mongoose`というパッケージがあります。去年は`node-mongodb-native`を使いましたが、なんとなく今年は`mongoose`がいいのではという気持ちになったので、これで行きます。


## MongoDB
さて、MongoDBに接続する前に、まずMongoDBの気持ちを知らないといけません。MongoDBは以下のように、データベースの中にコレクションというまとまりがあります。そして、コレクションの中に、オブジェクトのようなドキュメントがたくさん並んび、配列みたいな感じになっています。

![MongoDB](https://tracpath.com/works/wp-content/uploads/2016/06/image.png)

## MongoDBサーバーと接続する
さて、mongooseを使っていきましょう。
```
npm install mongoose
```

```javascript
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParse: true});

const db = mongoose.connection;
```

少し解説を加えていきたいと思います。
まずここですが、ここでmongodbと接続しています。mongodb://localhost:27017はmongodbの場所です。testはデータベース名です。第二引数はおまじないでいいです。
``` javascript
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParse: true});
```

## コレクションのスキーマを決める

次にスキーマを書いていきましょう。スキーマはドキュメントの形を決めるものです。
ここでは以下のような感じにしておきます。

``` javascript
{
    name: 名前,
    age: 年齢,
    data: 時刻
}
```

スキーマを設定するには以下のようにします。
``` javascript
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    age: Number,
    data: {
        default: Date.now,
        type: Data,
    }
});

let userModel = mongoose.model('users', userSchema);
```

では、解説をしていきます。


``` javascript
const Schema = mongoose.Schema;
```
これは変数に入れなおしているだけです。

``` javascript
const userSchema = new Schema({
    name: String,
    age: Number,
    data: {
        default: Date.now,
        type: Data,
    }
});
```
`new Schema`でmongodb内でのデータの形を決めています。
これを見るとわかるのですが、キーと型の形式になっています。これに妥当しないデータをはじくようにします。
よく見ると、`default`という部分があると思うのですが、これはデフォルトの値を設定しています。


``` javascript
let userModel = mongoose.model('users', userSchema);
```

ここでは、コレクションにスキーマを紐づけています。`usres`がコレクション名です。この時、大文字だと小文字になり、`user`と指定すると、勝手にsがつくようになります。第2引数でさっきのスキーマを紐づけています。

## データを保存する
データを保存するときは以下のようにします。
``` javascript
let user = new userModel();
user.name = "javascript";
user.age = 25;
user.save();
```

`new userModel()`でデータを入れる変数を宣言しています。そのあと、このオブジェクトの中にデータを入れていき、最後に`user.save();`で保存しています。

では、mongodbにアクセスしてみて、保存されているか見てみましょう！

``` javascript
monogo

use test

db.users.find()
```
でmongodb内を検索することができます。

## データを取り出そう。
取り出すときは以下のようにします。
``` javascript
let result = await useModel.find({}).exec()
console.log(JSON.stringify(result));
```
`find`の中に検索条件を入れていきます。検索条件は[いろいろ](https://docs.mongodb.com/manual/reference/operator/query/)あります。

## データを消す
以下のようにデータを消すことができます。
``` javascript
userModel.deleteMany(クエリ, コールバック関数)
```

例えば、以下のようにします。
``` javascript
userModel.deleteMany({name: "javascript"})
```

## 上書きする
``` javascript
userModel.update({ name: "javascript"}, {$set: {age: 35}}, {upsert: false, multi: true },
function (error) {
    if (error) console.log(error)
})
```
以上のようにします。第1引数はさっきと同じクエリで、第2引数で何を上書きするのか、第3引数でオプションをつけています。
upsertは、ない場合に新規にデータを挿入するかという条件で、multiは複数の上書きを許可するというものです（おそらく）





[https://tech-waplus.com/programming/20190415-node-js-expressmongo-mongoose/#DB](https://tech-waplus.com/programming/20190415-node-js-expressmongo-mongoose/#DB)このページみれば使い方がわかる。
