// var btn = document.getElementById('search');
var loading = true;
if(loading === true || "true"){
  onLoading();
}

var default_out = "<p class=\"tips mr-side-m\">Tip: This is a work in progress chrome extenction. For more detail visit our <a href=\"http://www.github.com/prabinzz/\">repo</a> on GitHub.</p>"
var btn = document.getElementById("search");
btn.addEventListener("click", function(){
  if(document.getElementById('word').value != ''){
    output.innerHTML = getMeaning(word.value);
  }else{
    output.innerHTML = '';
  }
});


function getMeaning(w){
  return "<b>"+w+"</b>: "+ "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea common."
}

function onLoading(){
  output.innerHTML = "<img class='loading' src='./img/loading.gif' alt='loading'>";
}
