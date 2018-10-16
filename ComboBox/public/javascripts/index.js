var data;   // 输入框中的数据
var time;   // 请求节流
var lastFetchId = 0;// 最后一次请求的ID,请求时序实现的辅助参数
var page = 0; // 当前请求页，分页请求辅助参数
var loading = false; // 判断是否在加载中
var allPage; //数据总页数，判断是否将后台数据加载完

var input = document.getElementById('input');
var ul = document.getElementsByTagName("ul");
var myul = ul[0];
var list = [];
var box = document.getElementById('box');


function loadXMLDoc()
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    lastFetchId += 1;
        const fetchId = lastFetchId;
        xmlhttp.onreadystatechange=function()
        {
            if(fetchId !== lastFetchId){ // 时序不对
                return true;
            }
        else if (xmlhttp.readyState === 1)  //数据加载中
        {
            loading = true;
            var load = document.createElement("li");
            var img = document.createElement("img");
            img.src = "../images/loading.gif";
            load.appendChild(img);
            myul.appendChild(load);
        }
        else if (xmlhttp.readyState === 4 && xmlhttp.status === 200)  // 请求成功
        {
            loading = false;
            var childs = myul.childNodes;
            var length = childs.length;
            myul.removeChild(childs[length - 1]);
            var res = xmlhttp.response;
            allPage = res[0].allPage;
            for(var i = 0;i < res.length;i++){
                var li = document.createElement("li");
                li.innerHTML = res[i].id;
                myul.appendChild(li);
            }
            list = document.getElementsByTagName("li");
            for(var j = 0;j<list.length;j++){
                list[j].onmouseover = function(){
                    this.style.backgroundColor = '#b3ccff';
                };
                list[j].onmouseleave = function(){
                    this.style.backgroundColor = "white";
                };
            }
        }
    };

    xmlhttp.open("post","http://localhost:3000/api/users",true);
    xmlhttp.setRequestHeader('Content-Type','application/json');
    xmlhttp.responseType = 'json';
    xmlhttp.send(JSON.stringify({name: data,page:page}));
}

window.onload = function () {
    lastFetchId = 0;
};
// var list = document.getElementsByTagName("li");

input.addEventListener('focus',function () {
    page = 0;
    var childs = myul.childNodes;
    var length = childs.length;
    for(var k = length-1; k >= 0; k--) {
        myul.removeChild(childs[k]);
    }
    data = input.value;
    loadXMLDoc();
    box.style.display = 'block';
},false);
input.addEventListener('input',function () {
    page = 0;
    var childs = myul.childNodes;
    var length = childs.length;
    for(var k = length-1; k >= 0; k--) {
        myul.removeChild(childs[k]);
    }
    clearTimeout(time);
    data = input.value;
    time=setTimeout("loadXMLDoc()", 300);
},false);

document.addEventListener('click', function(e) {
    if (e.target.id !== 'input') {
        box.style.display = 'none';
    }
}, false);



//给每个li绑定事件
myul.onclick = function(ev){
    var event = ev || window.event;
    var target = event.target || event.srcElemnt;

    for(var i = 0, len = list.length; i < len; i++){
        if(list[i] === target){
            input.value = list[i].innerHTML;
        }
    }
    box.style.display = 'none';
};


box.onscroll = function () {
    if(page !== allPage && loading === false && box.clientHeight === 155 && box.scrollHeight-box.scrollTop === box.clientHeight){
        console.log("到达底部");
        page += 1;
        loadXMLDoc();
    }
};
