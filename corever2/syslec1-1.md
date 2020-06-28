
# 環境構築（Windows編）

プログラミングをするのに一番大変なことは環境構築だと思います。だって、言語のこと知らないのに、言語の知識が要求される。難しい。

## Node.jsのバージョン管理ツールをいれる

Node.jsはなんだという疑問は今は置いときましょう。まず、Nodistを入れましょう。

[Nodistのページ](https://github.com/nullivex/nodist/releases)から、最新のインストーラーをダウンロード。そうです。2020年4月12日現在最新のNodistSetup-v0.9.1.exeというやつです。

ダウンロードし終わったら、起動をして、ポチポチ押します。

そうしたら、コマンドプロンプトまたはPowerShellで以下のコマンドを打ちましょう。

```
nodist stable
```
<!-- ```
nodist list
```
そして、表示されたバージョンの一番新しいのを（番号が大きいのを）確認して、以下のコマンドを打ってください。
```
nodist global さっきのバージョン
``` -->
確認のため、
```
node -v
```
と打ってください。ちゃんとさっき指定したバージョンが出てくれば大丈夫です。
最後に、
```
nodist npm global match
```
```
npm -v
```
と打ち込んでください。それっぽい数字が出てきたらオッケーです。

Nodistのバージョンが古い場合、一番下のコマンドがうまく行かない可能性があります。そういう場合は、Nodist/npmvというプログラムファイルから上のコマンドでインストールしようとしたバージョンのフォルダを消してください。僕はこうやって、対処してきました。絶対何かを間違えている気がします。

## MongoDB

MongoDBのサーバーを立てましょう。なんのこっちゃと思ってもいいです。とりあえず立てましょう。

サーバーの方とバージョンが異なっても大丈夫でしょう。（独り言）
[MongoDBのサイト](https://www.mongodb.com/download-center/community)にアクセスして、current releaseのインストーラーをダウンロードして、インストールしてください。とりあえず、デフォルトでかまいません。最後に出てくる`MongoCompass`のインストールは任意です。GUI操作が僕は好きなので僕は入れました。

以下のコマンドを打ってください。

```
mongo
```
```
exit
```
うまく動けばいいです。

## Gitを入れていく

windowsの環境にはGitが入っていません。なんだGitってみたいなことを思っている人がいるかもしれませんが、まあ細かいことは後で行うのでこれを入れましょう。

[git for windows](https://gitforwindows.org/)のホームページから入れましょう。

### 手順
- Information 同意してください
- Select Destination Location 特になければそのままでいいはずです。
- Select Components そのまま
- Select Start Menu Folder そのまま
- Choosing the default editor used by Git : Visual Studio Code as Git's default editorでいいです。
- Adjusting your PATH environment : 真ん中（Use Git from the Windows Command Prompt）
- Choosing HTTPS transport backend : Use the OpenSSL library
- Configuring the line ending conversions : Checkout Windows-style,commit Unix-style line endings を選択
- Configuring extra option : デフォルトでいいと思います。よくわかっていない。

とりあえずここまででいいです。

# 環境構築（Mac編）

筆者はMacを持っていません。なので想像で書いています。

## Homebrewを入れよう
Homebrewは何かはおいておきましょう。入れてください。Xcodeを丸々入れずに入れる方法もあるみたいです。好みです。僕はWindowsユーザーなので知りません。誰かが加筆してくれるでしょう。と思いましたが、自分で書くことにします。

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
以上をコマンドに打ち込んでください。おそらくこれでいけるはず。

## nodenvを入れよう
anyenvを使いたい人は勝手にしてください。よくわからないよという人はこのまま読み進めてください。

以下のコマンドを入れましょう。
```
brew install nodenv
```
```
nodenv -v
```

数字が表示されたでしょうか。次に、ホームディレクトリにある`.bash_profile`というファイルを開いて、`eval "$(nodenv init -)"`を書き込みます。
ようわからんなら、以下を打ち込めばいいです。
```
echo 'eval "$(nodenv init -)"' >> ~/.bash_profile
```

macっていま、bashじゃないのか。zshなのか。ちょっとこれ変わるかも。

## Node.jsを入れよう
とりあえず、入れよう

以下のコマンドを打ってください。バージョンの番号はNode.jsの安定板の最新のものを入れれば大丈夫です。よくわからなければ教えます。
```
nodenv install "安定板の最新のもの"
```
```
nodenv global "安定板の最新のもの"
```
```
node -v
```
バージョンの番号が出てくればオッケーです。

## MongoDBを入れよう
MongoDBのサーバーを立てましょう。なんのこっちゃと思ってもいいです。とりあえず立てましょう。

サーバーの方とバージョンが異なっても大丈夫でしょう。（独り言）
[MongoDBのサイト](https://www.mongodb.com/download-center/community)にアクセスして、On-Premises>MongoDB Community Server>current releaseのインストーラーをダウンロードして、インストールしてください。とりあえず、デフォルトでかまいません。最後に出てくる`MongoCompass`のインストールは任意です。GUI操作が僕は好きなので僕は入れました。

ターミナルで以下のコマンドを打ってください。

```
mongo
```
```
exit
```
うまく動けばいいです。