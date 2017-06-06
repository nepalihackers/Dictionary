// var btn = document.getElementById('search');
var loading = true;
var fromLang = "eng";
var dstLang = "eng";
localStorage.limit = 3;

var default_out = "<p class=\"tips mr-side-m\">Tip: This is a work in progress chrome extenction. For more detail visit our <a href=\"http://www.github.com/prabinzz/\">repo</a> on GitHub.</p>"
var btn = document.getElementById("search");
btn.addEventListener("click", function(){
  if(document.getElementById('word').value != ''){
    getMeaning(word.value);
  }
});


function getMeaning(w){
  xreq = new XMLHttpRequest();
		xreq.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200) {
       			// Typical action to be performed when the document is ready:
       			data = JSON.parse(xreq.responseText);
            if(data.result == "ok"){
              dataParse(data);
            }else{
              dataError(data);
            }
    		}

      else if (this.readyState < 4) {
        onLoading();
      }

    	}
      xreq.open("get","https://glosbe.com/gapi/translate?from="+fromLang+"&dest="
      +dstLang+"&format=json&phrase="+w+"&pretty=true", true);
    	xreq.send(null);
}

function onLoading(){
  output.innerHTML = "<img class='loading' src='./img/loading.gif' alt='loading'>";
}

function dataParse(data){
  var temp = '';

    for (var i = 0; i < data.tuc[0].meanings.length && i< localStorage.limit; i++) {
      temp+="<li>"+data.tuc[0].meanings[i].text+"</li>";
    }
    output.innerHTML = temp;
}

function dataError(){

}
