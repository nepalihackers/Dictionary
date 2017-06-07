// var btn = document.getElementById('search');

if (localStorage.fromLang == undefined || "undefined") {
  localStorage.fromLang = "en";
}
if (localStorage.dstLang == undefined || "undefined") {
  localStorage.dstLang = 'en';
}
if (localStorage.limit == undefined || "undefined"){
  localStorage.limit = 5;
}

var default_out = "<p class=\"tips mr-side-m\">Tip: This is a work in progress chrome extenction. For more detail visit our <a href=\"http://www.github.com/prabinzz/\">repo</a> on GitHub.</p>"
var btn = document.getElementById("search");
btn.addEventListener("click", function(){
  if(document.getElementById('word').value != ''){
    getMeaning(word.value);
  }
});


function getMeaning(w){
  xreq = new XMLHttpRequest();
    xreq.onerror= function(){
      dataError("Error While loading.");
    }
		xreq.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200) {
       			// Typical action to be performed when the document is ready:
       			data = JSON.parse(xreq.responseText);
            if(data.result == "ok" && data.hasOwnProperty("tuc")){
              dataParse(data);
            }else{
              dataError(data);
            }
    		}

      else if (this.readyState < 4) {
        onLoading();
        }

    	}
      xreq.open("get","https://glosbe.com/gapi/translate?from="+
      localStorage.fromLang+"&dest="+localStorage.toLang+"&format=json&phrase="+
      w+"&pretty=true", true);
    	xreq.send(null);
}

function onLoading(){
  output.innerHTML = "<img class='loading' src='./img/loading.gif' alt='loading'>";
}

function dataParse(data){
  if(data == "" || data == null || data == undefined){
    dataError();
    return;
  }else{
    console.log(data);
    data_clean = getData(data);
    console.log(data_clean);
    var temp = '';
    temp+= "<h3>"+data.phrase+"</h3>";
    temp+="<ol>";
    var appended = 0;
    for (var i = 0; i < data_clean.length && appended < localStorage.limit; i++) {
      if(data_clean[i].language == localStorage.toLang){
        temp+="<li>"+data_clean[i].text+"</li>";
        appended ++;
      }
    }
    // if(appended == 0){
    //   dataError(data);
    //   return;
    // }
    temp+="</ol>";
    temp +="<a class='center' href='http://www.dictionary.com/browse/"+data.phrase+"?s=t'>"+
      "more>> </a>";
    output.innerHTML = temp;
    linkInit();
  }
}

function dataError(data){
  var temp = "";
  if(typeof(data)=='string'){
    temp += "<h4 class='center no-match'>"+data+"</h4>";

  }else{
    temp += "<h4 class='center no-match'> No match found for \""+data.phrase+"\"</h4>";
    temp += "<ul class='reasons'>"+"<li> Word Not available in current language</li>"
    +"<li> Given word is invalid. </li> "+
    "<li> Server is busy.</li>"
    +"</ul>"
    temp +="<h5> Search in: </h5><ul class='no-bul'>";
    temp +="<a  href='http://www.dictionary.com/browse/"+data.phrase+"?s=t'>"+
      "<li>dictionary.com</li></a>";
      temp +="<a  href='http://www.google.com/search?q="+data.phrase+"'>"+
      "<li>google.com</li></a>";

    temp += "</ul>";
    }
  output.innerHTML = temp;
  linkInit();
}

function newTab(obj, add){
  obj.addEventListener("click", function(){
    chrome.tabs.create({"url": add});
  })
}
function linkInit(){
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    newTab(links[i],links[i].href);
  }
}

function getData(data){
  var temp = [];
  for(var i = 0; i<data.tuc.length; i++){
    if (data.tuc[i].hasOwnProperty("meanings")) {
      for(var j= 0; j<data.tuc[i].meanings.length; j++){
        temp.push(data.tuc[i].meanings[j]);
      }
    }
  }
  return temp;
}

// _____________________________________________________
linkInit();
