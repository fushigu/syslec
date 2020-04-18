# データベースを使おう

疲れてきますね。こんだけ書いていると。

## 何をするのか
何を書いているのか、開発時のどういう部分になるのかがわからないと、何を勉強しているのかまったくわからないです。3回目の開発とはの図をもう一度、載せます。

いままで、expressとaxiosというパッケージを使って、クライアントとサーバー間のGET通信POST通信を書いていきました。今回の内容はデータベースサーバーMondoDBとapiとなるサーバー間の通信についての方法です。

より詳しく述べるとフロントとなるクライアントのアプリから、ユーザーから入力されたデータやデータをサーバーに対して、要求してきます。そういう際、サーバーのMongoDBからどうやって、データを取り込むかを見ていくということです。

## パッケージについて
Node.jsでMongoDBに接続するパッケージはいくつかあります。有名なのでは、`node-mongodb-native`というパッケージと`mongoose`というパッケージがあります。去年は`node-mongodb-native`を使いましたが、なんとなく今年は`mongoose`がいいのではという気持ちになったので、これで行きます。


## MongoDB
さて、MongoDBに接続する前に、まずMongoDBの気持ちを知らないといけません。MongoDBは以下のように、データベースの中にコレクションというまとまりがあります。そして、コレクションの中に、オブジェクトのようなドキュメントがたくさん並んび、配列みたいな感じになっています。

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

[https://tech-waplus.com/programming/20190415-node-js-expressmongo-mongoose/#DB](https://tech-waplus.com/programming/20190415-node-js-expressmongo-mongoose/#DB)このページみれば使い方がわかる。
