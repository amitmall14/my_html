//start (cookie class for set and get)
class Cookie {
  constructor() {

  }

  set(name,value) {
    document.cookie=name+"="+value;
  }
  //end this function will create cookie

  //start this function will get cookie by name
    get(name) {
    console.log(name);
    let allcookie=document.cookie;
    console.log(allcookie);
    if(allcookie !='') {
      let singlecookie=allcookie.split("; ");
      console.log(singlecookie);
      for(let i=0 ;i<singlecookie.length;i++){
        console.log(singlecookie[i]);
        let valcookie=singlecookie[i].split("=");
        console.log(valcookie);
        if (name==valcookie[0]){
          console.log(valcookie[1]);
          return valcookie[1];

        }

      }
    }
  }
}
//end this function will create cookie by name
/*let today_date=new Date();
console.log(today_date);
let day=today_date.getDay();
console.log(day);
let color=['red', 'green', 'blue', 'white','yellow','lightgray','pink'];
document.getElementById('home').style.backgroundColor=color[day];
let month=today_date.getMonth()+1;
let date=today_date.getDate();
let year=today_date.getFullYear();
console.log(year);

console.log("hii");
console.log(date);
console.log(month);
let current_date=(date+"-"+ month+"-"+year);
document.getElementById('home').innerHTML=current_date;*/
function showmenu() {
  console.log("hii");
    document.getElementById('menu-item').style.color = "white";
  document.getElementById('menu-list').style.display = "block";
  document.getElementById('header').style.boxShadow="10px 20px 30px blue";
  document.getElementById('arrow').className = "fa-solid fa-caret-up";

}
function show_menu_1() {
  console.log("hii..");
  document.getElementById('menu-dropdown-1').style.display="block";
//  document.getElementById('menu-item-1').style.backgroundColor="#282a35";
  //document.getElementById('menu-item-1').style.color="white";
  document.getElementById('arrow-1').className = "fa-solid fa-caret-up";
  document.getElementById('menu-dropdown-2').style.display="none";
  document.getElementById('menu-dropdown-3').style.display="none";
  document.getElementById('menu-item-1').classList.add("active");
  document.getElementById('menu-item-2').classList.remove("active");
  document.getElementById('menu-item-3').classList.remove("active");

}
function closemenu() {
  console.log("helloo");
  document.getElementById('menu-item').style.color ="black";
  document.getElementById('menu-list').style.display ="none";
  document.getElementById('arrow').className = "fa-solid fa-caret-down";
}
function show_menu_2(){
  console.log("hii");
  document.getElementById('menu-dropdown-2').style.display="block";
//  document.getElementById('menu-item-2').style.backgroundColor="#282a35";
//  document.getElementById('menu-item-2').style.color="white";
  document.getElementById('arrow-2').className = "fa-solid fa-caret-up";
  document.getElementById('menu-dropdown-1').style.display="none";
  document.getElementById('menu-dropdown-3').style.display="none";
  document.getElementById('menu-item-2').classList.add("active");
  document.getElementById('menu-item-1').classList.remove("active");
  document.getElementById('menu-item-3').classList.remove("active");
}
function show_menu_3(){
  console.log("hii");
  document.getElementById('menu-dropdown-3').style.display="block";
  document.getElementById('arrow-3').className = "fa-solid fa-caret-up";
  document.getElementById('menu-dropdown-2').style.display="none";
  document.getElementById('menu-dropdown-1').style.display="none";
  document.getElementById('menu-item-3').classList.add("active");
  document.getElementById('menu-item-1').classList.remove("active");
  document.getElementById('menu-item-2').classList.remove("active");
}
function menu() {
  //console.log("hey guys")
  let x = document.getElementById('menuline');
  x.classList.toggle("show");

}

setTimeout(show_loader,1000);
function show_loader()
{
  document.getElementById('loader').style.display ="none";
}

function cross(){
  let cookie=new Cookie();
  cookie.set("closebtn",1);
  document.getElementById('top-bar').style.display="none";
  }

function accept() {
  let cookie=new Cookie();
  cookie.set("acceptbtn",1);

  document.getElementById('footer-bar').style.display="none";
}
window.onload=check_cookie('closebtn');
function check_cookie() {
  let cookie=new Cookie();
  console.log(cookie);
  let cook_val = cookie.get("closebtn");
  if(cook_val == 1) {
      document.getElementById('top-bar').style.display="none";
  }
}
window.onload=findcookie();
function findcookie() {
  let cookie=new Cookie();
  let find_cookie= cookie.get('acceptbtn');
  console.log(find_cookie);
  if(find_cookie==1){
    document.getElementById('footer-bar').style.display="none";
  }
}

function change_color(){
  document.getElementsByTagName('body')[0].classList.toggle("mystyle");
  let cookie=new Cookie();
  cookie.set("color",1);

}
window.onload=check_color();
function check_color(){
  let cookie=new Cookie();
  let colorvalue=cookie.get("color");
  if (colorvalue==1){
    document.getElementsByTagName('body')[0].classList.add("mystyle");
    }
  }
function loginbtn() {

  document.getElementsByClassName('popup')[0].style.display="block";
  }
  function popupcross() {
    document.getElementsByClassName('popup')[0].style.display="none";

  }
window.onload=check_login();
function check_login() {
  let cookie=new Cookie();
  let username=cookie.get("name");
  console.log(username);
  if (username) {
    document.getElementById('login').innerText="Welcome, "+username.toUpperCase();

  }
}
function Passwords() {
  console.log("hi...");
  let input_type= document.getElementById("inputpassword").type;
  console.log(input_type);
  if (input_type=='password'){
    document.getElementById("inputpassword").type='text';
  }
  else if(  input_type=='text'){
    document.getElementById("inputpassword").type='password';
  }
}

function passwordblure(inputvalue) {
  console.log(inputvalue.length);
  let paasword_msg="";
  if(inputvalue ==""){
    paasword_msg+="please enter password <br>";
    console.log("please enter password")
  }

  if (inputvalue.length>8 || inputvalue.length <3){
    paasword_msg+="Password cannot be less than 3 and greater than 8";
    console.log("Password cannot be less than 3 and greater than 8");
  }
document.getElementById("errorpassword").innerHTML=paasword_msg;
}


let current=0;
window.onload = bottan(0);

function bottan(num){
var element = document.getElementsByClassName('img_one');
  document.getElementById('total_slide').innerHTML=element.length;
  let text="";
  let i;
  for(i=0; i<element.length;i++){
   let count = i+1;
   text +="<a onclick= bottan("+i+") >"+count+"</a>";
   document.getElementsByClassName('links')[0].innerHTML=text;

  document.getElementsByClassName('img_one')[i].style.display="none";
  }
  console.log(text);
  if (num > 0) {
    current +=1; // 1, 2, 3
  }
  if (num < 0) { // 3
    current -=1;
  }
  //circular next
  if (current >= element.length) {
    current = 0;
  }
  //circular previous
  if (current < 0) {
   current = element.length-1;
 }

    console.log(current);

    document.getElementsByClassName('img_one')[current].style.display="block";
    document.getElementById('current_slide').innerHTML=current+1;
}


var Interval = setInterval(function(){
  document.getElementById('next').click();
} , 2000);

const count=6;
window.onload= newslide();
function newslide() {
  console.log("heloo");

  let i;
  let box="";
  let circle="";
  for(i=0;i<count;i++){

    const sum=i+1;
    console.log(i+1);
    box+='<div class="box_one">'+sum+'</div>';
    circle+='<a onclick="color_change('+i+')">'+sum+'</a>';
  }
  console.log(circle);
  document.getElementsByClassName('main_box')[0].innerHTML=box;
  document.getElementsByClassName('links')[1].innerHTML=circle;
}
function color_change(parums) {
  console.log(parums);
  for(i=0;i<count;i++){
  console.log(i);
  document.getElementsByClassName('box_one')[i].style.backgroundColor="unset";

  }
  document.getElementsByClassName('box_one')[parums].style.backgroundColor="yellow";

}
