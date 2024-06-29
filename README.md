## clone後のsetup
node -v で v20.9.0　になるようにしておく。
```
npm i
```
```
touch .env.local
```
.env.localに記述 (Github, Google認証のセットアップあり)
```
# portは各自変える
NEXT_PUBLIC_API_BASE="http://localhost:8080/api/v1"

# next-authのGithub認証
# https://qiita.com/y_inoue15/items/d6942cd6e71ff3169822
GITHUB_ID=Ov23li9Bjfkmyd7L9fEV
GITHUB_SECRET=a12b1cdf7d98e7f62d08619454197e0cc090407c
# ランダムな文字列
SECRET=gavivahwkhgwusisbwwihwwso

# next-authのGoogle認証
# https://zenn.dev/hayato94087/articles/91179fbbe1cad4
GOOGLE_ID=7159146072-vot4k35259jtqfpcik8ikcb7ig9el16n.apps.googleusercontent.com
GOOGLE_SECRET=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
```

## 起動

```
npm run dev
```

## node version

node -v

```
v20.9.0
```