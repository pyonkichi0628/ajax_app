const buildHTML = (XHR) => {
  //レスポンスの中から投稿されたメモの情報を抽出し変数itemに格納
  const item = XHR.response.post;

  //item内に格納されたメモ情報をもとにブラウザに描画するためのHTMLを生成し、htmlに格納
  const html = `
     <div class="post">
        <div class="post-date">
           投稿日時：${item.created_at}
        </div>
        <div class="post-content">
           ${item.content}
        </div>
      </div>`;
        return html;
};

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

    //リクエストの送信が成功した際に実行 レスポンス受信に成功した場合の記述
    XHR.onload = () => {
      //レスポンスの内容

      if (XHR.status != 200){
        //XHR.statusにHTTPステータスコードが格納され、XHR.statusTextにはステータスコードに応じたメッセージ格納される
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        //javascriptの処理から抜け出す(エラーの場合はこの後の処理を行わない)
        return null;
      };

      //新しいメモを挿入するための要素を取得し、listに格納
      const list = document.getElementById("list");

      //リセットの対象となるフォームの要素contentを取得しformTextに格納
      const formText = document.getElementById("content");

      //第一引数にafterendを指定することでlistに格納された要素の直後に生成したHTMLを挿入
      list.insertAdjacentHTML("afterend", buildHTML(XHR));

      //formTextのvalue属性に空の文字列を指定することで、フォームの中身をリセット
      formText.value = "";
    };
  });
};

window.addEventListener('load', post);
