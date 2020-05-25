# 何か作ろう

さて、何かを作りましょう。といってもできることはまだ限られています。
`prompt`と`alert`で何かを作ろうと思います。

何もいい案が思いつかないのですが、今思いついたプロフィール帳みたいなものを作ってみましょう！

簡単に考えると以下の機能に分割できます。

1. 名前を入れてもらう
2. 名前をもとに検索する
3. 検索結果の人のプロフィールを表示する
4. 終了するか聞く
5. 終了する

あと、プロフィールをどのように変数に入れておくかも考えないといけないです。
それはこっちのほうで用意しておこうかなと思います。
とりあえず、以下のような連想配列の配列にしましょう。

```javascript
[
    {
        firstName: "Java",
        secondName: "Script",
        class: 22
    },
    {
        firstName: "C",
        secondName: "++",
        class: 23
    }
]
```

機能を分割したので、それぞれに対応する関数を作っていけばいいですね。

ちなみに、たぶんこのような、データに対して関数を細かく定めていく、開発方針のことをオブジェクト指向と言うと思います。（自分はオブジェクト指向的な考えに染まっているので。）

オブジェクト指向とよく比較される設計方針に関数型プログラミングがあげられます。僕はどういうものか知りません。知りたければ、Haskellという言語を学ぶといいと思います。

## 1をつくる

getNameという関数を作りましょう。名前を入れてもらって、その名前を戻り値とすればいいですね。

<details><summary>コード</summary><div>

```javascript
function getName() {
    let name = prompt("苗字を入れてください")
    return name
}
```
</div></details>

できましたか？

## 2をつくる

searchPersonという関数を作ることにしましょうか？ いろいろな実装方法があると思いますが、とりあえず、引数に全員分のデータと探す対象の名前を取り込んで、戻り値としてその人のデータの部分を返すようにしましょうか？

とりあえず、少しずつ実装していきましょう。まず、引数を書きましょう。

<details><summary>コード</summary>

```javascript
function searchPerson(data, firstName) {

}
```

</details>

検索部分を作りましょう。配列の最初から最後まで順番に参照していって、それぞれのfirstNameと一致するかを評価すればいいですね。

<details><summary>コード</summary>

```javascript
function searchPerson(data, firstName) {
    for (let i = 0;i < data.length;i = i + 1) {
        if (data[i].firstName === firstName) {
            //　見つかった
        }
    }
    // 見つからなかった
}
```

</details>

あとは、戻り値を書けばいいですね。ちなみに、関数の途中にreturn文を書くと、そこで関数が終了します。見つからなかった場合は-1をとりあえず、返しておきましょうか。

おそらく、実際は`null`を返しておくといいと思います。でも、教えていないので、気にしなくていいです。気になる人は、4回目のテキストの補足を見直すといいです。

<details><summary>コード</summary>

```javascript
function searchPerson(data, firstName) {
    for (let i = 0;i < data.length;i = i + 1) {
        if (data[i].firstName === firstName) {
            return data[i]
        }
    }
    return -1
}
```
</details>

## 3をつくる

関数名は、`showProfile`とでもしておきますか。引数に表示する人のプロフィールをとって、`alert`で表示してみましょう。

ちなみに、文字列の中に`\n`を入れて、`alert`関数に渡すとその部分が改行されます。

<details><summary>コード</summary>

```javascript
function showProfile(profile) {
    alert("名前は" + profile.firstName + "\n姓は" + profile.secondName + "/nクラスは" + profile.class)
}
```
</details>

## 組み合わせる

4はwhile文を使ったほうがいいです。for文を使ってもいいですが。
というわけで後回しにして、動くものを作っていきます。

1. `getName`で名前を取り込んでその名前をとりあえず、変数に持っておきましょう。
2. searchPersonで人を探しましょう。
3. 2の結果をshowProfileに代入して、プロフィールを表示しましょう。

さて、上の方針でかけますか？

<details><summary>コード</summary>

```javascript
//関数の定義とdataは省略

let name = getName()
let profile = searchPerson(data, name)
showProfile(profile)
```
</details>

さて、足りないところがありますよね。そうです。プロフィールが見つからなかったら、-1が返ってきます。その時呼び出す関数を書きましょう。名前はshowNoDataとでもしましょうか。

```javascript
function shoeNoData() {
    alert("プロフィールが存在しません")
}
```

それに合わせて、さっきのコードを変更しましょう。ifを使うといいですね。

<details><summary>コード</summary>

```javascript
//関数の定義とdataは省略

let name = getName()
let profile = searchPerson(data, name)
if (profile === -1) {
    showNoData()
}
else {
    shoeProfile(profile)
}
```
</details>


さて、教えるのはここまでにしておきます。多分時間がないので。一応、全体のコードをまとめておきますね。

<details><summary>全体のコード</summary><div>

```javascript
let data = [
    {
        firstName: "Java",
        secondName: "Script",
        class: 22
    },
    {
        firstName: "C",
        secondName: "++",
        class: 23
    }
]

function getName() {
    let name = prompt("苗字を入れてください")
    return name
}

function searchPerson(data, firstName) {
    for (let i = 0;i < data.length;i = i + 1) {
        if (data[i].fisrtName === firstName) {
            return data[i]
        }
    }
    return -1
}

function showProfile(profile) {
    alert("名前は" + profile.firstName + "\n姓は" + profile.secondName + "/nクラスは" + profile.class)
}

function shoeNoData() {
    alert("プロフィールが存在しません")
}

let name = getName()
let profile = searchPerson(data, name)
if (profile === -1) {
    showNoData()
}
else {
    shoeProfile(profile)
}
```

</div></details>

## 4をつくろう

ここからはオプションです。自由にしてください。

終了するか聞く関数を書きましょう。
confirmという関数があります。それを使いましょう。はいならtrue、いいえならfalseが返ってきます。

頑張ってください。

<details><summary>答え</summary>

```javascript
//関数の定義とdataは省略
let flag = true //スコープを知らないと厳しいか
while(flag) {
    let name = getName()
    let profile = searchPerson(data, name)
    if (profile === -1) {
        showNoData()
    }
    else {
        shoeProfile(profile)
    }
    flag = confirm("終わりますか")
}
```

</details>

以上でsyslec終わりです。