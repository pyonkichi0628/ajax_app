function post (){
  //リクエストを送信する処理
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    //イベントを無効化（投稿ボタンのクリックを無効化) eはイベントオブジェクト
    e.preventDefault();
    //フォームの要素の取得
    const form = document.getElementById("form");
    //フォームに入力された値の取得
    const formData = new FormData(form);
    //非同期通信のためのXMLHttpRequestオブジェクトの生成
    const XHR = new XMLHttpRequest();
    //リクエストの初期化（HTTPメソッド、パス、非同期であるか）
    XHR.open("POST", "/posts", true);
    //サーバからのレスポンス形式の指定
    XHR.responseType = "json";
    //フォームに入力された内容をサーバに送信
    XHR.send(formData);
  });
};

window.addEventListener('load', post);
