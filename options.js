var slider = document.getElementById('limit');
var slider_dis = document.getElementsByClassName('range-val')[0];
var fromLang = document.getElementById('fromLang');
var toLang = document.getElementById('toLang');

var languages = [
  new lang("English","en"),
  new lang("Geraman","de"),
  new lang("Japanese","ja"),
  new lang("French","fr"),
  new lang("Spanish","es"),
  new lang("Russian","ru"),
  new lang("Chinese","zh"),
  new lang("Polish","pl"),
  new lang("Italian","it"),
  new lang("Hindi","hi")
]

document.addEventListener("DOMContentLoaded",function(){
  applySelection(languages, fromLang);
  applySelection(languages, toLang);
  fromLang.value= localStorage.fromLang;
  toLang.value = localStorage.toLang;
  slider.value = localStorage.limit;
  slider_dis.innerHTML = slider.value;
});


slider.addEventListener("change", function(){
    //dynamic
    localStorage.limit = slider.value;
    slider_dis.innerHTML = slider.value;
})
fromLang.addEventListener("change", function(){
    //dynamic
    localStorage.fromLang = this.value;
})
toLang.addEventListener("change", function(){
    //dynamic
    localStorage.toLang = this.value;
})



// custom functions
function lang(fullname, short){
  this.fullname = fullname;
  this.short = short;
}

function applySelection(lan, dom){
  for (var i = 0; i < lan.length; i++) {
    dom.innerHTML += "<option value='"+lan[i].short+"'>"+lan[i].fullname+"</option>";
  }
}
