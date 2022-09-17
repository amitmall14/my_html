
function show_more(){

  document.getElementById("subject").style.height ="200px";
    document.getElementById("less").style.display ="block";
      document.getElementById("more").style.display ="none";

}

function show_less(){

  document.getElementById("subject").style.height ="150px";
  document.getElementById("more").style.display ="block";
  document.getElementById("less").style.display ="none";
}
function show_more1() {

  document.getElementById("skills").style.height ="200px";
}
function showmore() {

  document.getElementById("level").style.height ="200px";
}
function closs() {

    document.getElementById("column-left").style.display="none";
  }

function filter() {


  document.getElementById("column-left").style.display="block";
}

/*
const xhttp = new XMLHttpRequest();


xhttp.onload = function() {

  document.getElementById("demo").innerHTML = this.responseText;
  const shows = JSON.parse(this.responseText);
  let output = '';
  for(var key in shows) {


            for(var key1 in shows[key]) {

                  output +='  <div class="grid"><div class="grid-main">' +shows[key][key1].email+'|'+shows[key][key1].last_name;
                  if(shows[key][key1].id==1 || (shows[key][key1].id==5 && shows[key][key1].email=="rogerbacon@yahoo.com")){
                    output+="free";
                  }else if(shows[key][key1].id==3){
                    output+="sale";
                  }
                  else{
                  output+="off";
                  }
                    output +=shows[key][key1].id;
                  output +='</div> </div>';


           }

  }

  document.getElementById("category").innerHTML = output;

}

  // Here you can use the Data


// Send a request
xhttp.open("GET", "http://127.0.0.1:8887/data/ajax_info.json");
//xhttp.setRequestHeader('Accept', 'application/json');

xhttp.send();


*/





/*for(i=1; i<=5; i++)
{
  console.log(i);
  if(i==1){
    console.log("papa");
    console.log("cpmall");
  }
  else if (i==2) {
    console.log("mummy");
    console.log("narvada");
  }
  else if (i==3) {
    console.log("amit");
  }
  else if (i==4) {
    console.log("tutu");
    console.log("child");
  }
  else if (i==5) {
    console.log("laddu");
    console.log("child");
  }
}*/
/*const days=['mon','tue','wed','thr','fri','sat','sun'];
//console.log(days);
//console.log("days");
for(i=0; i<=6;i++){
  //console.log(i);

  console.log(days[i]);
  // console.log(i);

  if(days[i] == 'wed'){
    console.log("good friday");
  }
  else if(days[i] == 'sat' || days[i] == 'sun'){
    console.log("weakoff");
  }
  else{
    console.log("working");

  }

}
*/
/*for(i=0; i<=10;i++){
  console.log(i);
  if(i%2 == 0){
    console.log("even");
    }
  else{
    console.log("odd")
  }
}*/

/*  for(i=1; i<=10;i++){
    if(i%2 !=0){
      console.log(i);
    }

}*/
/*for(i=1; i<=4;i++){
  if(i==1){
    console.log("*");
  }
  if(i==2){
    console.log("**");
  }
  if(i==3){
    console.log("***");
  }
  if(i==4){
    console.log("****");
  }

}*/
/*let sum=0;
for (let i=0; i<=10;i++){
  sum=sum+i;

  }
  console.log(sum);*/
/*  const month=['march','dec','oct','sep'];
  console.log(month[0])
  for(i=1; i<=30; i++){
    if(i==30){
      console.log(i+" " +month[0]+" shalu bday");
    }

    if(i==14){
      console.log(i+" " +month[1]+" amit bday");
  }
  if(i==22){
    console.log(i+" " +month[2]+" laddu bday "+i+"-"+month[3]+ " tutu bday");
}
}*/
/*const table=['3','2'];
let i;
for(j=0; j<table.length; j++){
  for(i=1; i<=10; i++){

    val=table[j]*i;
    console.log(table[j]+"*"+i+ "="+val);
  }
}*/
/*const table=['2'];
let i;
let val;
for (i=1; i<=10; i++){
  console.log(val);
  val=table[0]*i;
  console.log(val);
  console.log(table[0]+"*"+i+"="+val);
  val=0;
}*/

/*let i;
let val;
for(j=0; j<2; j++){
  for (i=10; i>=1; i--){
    val=table[j]*i;
    console.log(table[j]+"*"+i+"="+val);
  }
}*/


/*let input = "a";
if(input=="a" || input=="e" ||input=="i" || input=="o" || input=="u"){
  console.log(input + " is vowels");
}
else if(input==""){
  console.log(input + " is consent");
}
else{
  console.log("not a valid alphabat");

}*/
/*let input = "amit";
input=input.slice(1,2);

console.log(input);
const vowels=['a','e','i','o','u'];
if(vowels.includes(input)){
  console.log(input + " is vowels");
}
else if (input.length>1 || input.length==0) {

  console.log("entes one character only");

}
else if (!isNaN(input)) {
  console.log(input + " is not alphabat");
}
else{
  console.log(input + " is consonants");

}*/
/*function amit() {


  let x=parseInt(document.getElementById('val1').value);
 let y=parseInt(document.getElementById('val2').value);


  console.log(x);
  console.log(y);
  let i;
  let error= 0;
  let msg="";
  if(x>y){
    error= 1;
    console.log("x should be less then y");
    msg="x should be less then y";
  }
  else if(x==y){
    error= 1;
    console.log("should not be equal");
    msg="x should be less then y";
  }
  else if(x==0 || y==0){
    error= 1;
    console.log("value should not be zero");
    msg="x should be less then y";

  }

  if (error==1 && msg!=""){
    document.getElementById('msg').innerHTML="<div style='color:red;'>"+msg+"</div>";
  }
 if(error==0){

  for(i=x; i<=y; i++){
    console.log(i);
    msg="x should be less then y";
  }
    msg="x should be less then y";
  }
}*/


/*for(i=1; i<=10; i++){
    msg="x should be less then y";
  }
}

}
/*for(i=1; i<=10; i++){
  console.log(i);
}*/
  //document.getElementById("category").innerHTML = "hii";




/*for(i=1; i<=10; i++){
  console.log(i);
for(i=0; i<=10; i++){
    console.log(i);

}
  if(i%2 == 0){
  console.log("even");
    }
  else{
    console.log("odd")
  }*/



  //document.getElementById("category").innerHTML = "hii";

/*function check_mobile() {
let msg="";
let mobile=(document.getElementById('mobile_num').value);
let mobile_length=mobile.toString().length;
  console.log(mobile_length);
  if(isNaN(mobile)){
    console.log("Enter numeric only");
    msg="Enter numeric only";
  }

  else if(mobile_length>10 ||mobile_length<10){
    console.log("Please Enter 10 Digit Number");
      msg="Please Enter 10 Digit Number";
   }
   else {
     console.log("sucess");
     document.getElementById("otp").style.display ="block";
    msg="OTP Send Sucessfully On Your Mobile " + "+91"+mobile;
   }
   document.getElementById("error").innerHTML=msg;
 }*/

/* function  print_all_input()
  {
    let first_name=(document.getElementById('fname').value);
    console.log(first_name.length);
    let last_name=(document.getElementById('lname').value);
    console.log(last_name);
    let email=(document.getElementById('ename').value);
    console.log(email);
    let mobile=(document.getElementById('mname').value);
    console.log(mobile);
    let password=(document.getElementById('pname').value);
    console.log(password);
    let confirm_password=(document.getElementById('cname').value);
    console.log(confirm_password);
    console.log(mobile.length);
    let error= 0;
    let msg="";
    if (first_name=="" || last_name=="" || email=="" || mobile=="" || password==""){
    error= 1;
    console.log("Input can Not be Blank")
    msg="Input can Not be Blank";
    }
    else if (!isNaN(first_name)){
      console.log("Not alphabat..");

    }
    else if(first_name.length<3 || first_name.length>10 || password.length<3 || password.length>10 ){
      console.log("Name should be greater then 3 and less then 10");
    }
    else if(mobile.length>10 || mobile.length<10){
      console.log("only 10 digit number");
    }
    else if (isNaN(mobile)){
      console.log("Only Number");

    }
    else if (password!=confirm_password){
      console.log("Password did not match");

    }
    document.getElementById('error').innerHTML=msg;
}
let i;
let total=0;
let average;
for(i=1; i<=10; i++){
  total=total+i;
  }console.log(total)







function nth_item1() {
  console.log("hi..");
let nth_val=document.getElementById('nth_val').value;
  console.log(nth_val);
  let i;
  let total=0;
  let average;
  for(i=1; i<=nth_val; i++){
    total=total+i;

}
console.log(total);
average=total/10;
console.log(average);
}

function nth_item() {
  let nth_val=document.getElementById('nth_val').value;

  let i;
  let cube;
  for(i=1; i<=nth_val; i++){
  cube=i*i*i;
   console.log("Number is"+i+"and cube of the"+i+"is :"+cube);
}

}*/
function integer() {
  let table= parseInt(document.getElementById('table').value);//15
  let i;
  let error=0;

  if (isNaN(table)) {
    console.log("Only Numeric");
    error=1;



  }
  let outpute="";
  if(error==0){
      for (i=1; i<=10;i++){
        let mul=table*i;
      //   output=table+"*"+i+"="+mul+"\n";
      outpute=outpute+table+"*"+i+"="+mul+"\n";
         //console.log(output);

      }

        document.getElementById("table_display").innerText=outpute;
        console.log(outpute);
  }
}

let value="";
for(i=1;i<=4;i++){
console.log(value+i);
  value=value+i;




}

for(i=1;i<=4;i++){
  for(j=1; j<=i; j++){
    console.log(i);
  }




}
