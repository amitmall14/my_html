let text = '{"product":[' +
'{"id":"1","name":"Parle G","price":"30","mrp":"130","date":"2022-09-12","stock":"130","img_src":"https://www.bigbasket.com/media/uploads/p/l/1203913-2_1-parle-gluco-biscuits-parle-g.jpg"},' +
'{"id":"2","name":"Namkeen","price":"","mrp":"130","date":"2022-09-18","stock":"0","img_src":"https://m.media-amazon.com/images/I/91b7L1LlR7L._SL1500_.jpg" },' +
'{"id":"3","name":"Namkeen","price":"49","mrp":"130","date":"2022-09-13","stock":"130","img_src":"https://m.media-amazon.com/images/I/91b7L1LlR7L._SL1500_.jpg" },' +
'{"id":"4","name":"Namkeen","price":"","mrp":"130","date":"2022-09-07","stock":"130","img_src":"https://m.media-amazon.com/images/I/91b7L1LlR7L._SL1500_.jpg" },' +
'{"id":"5","name":"Namkeen","price":"49","mrp":"130","date":"2022-09-10","stock":"0","img_src":"https://m.media-amazon.com/images/I/91b7L1LlR7L._SL1500_.jpg" },' +
'{"id":"6","name":"Namkeen","price":"130","mrp":"130","date":"2022-09-08","stock":"130","img_src":"https://m.media-amazon.com/images/I/91b7L1LlR7L._SL1500_.jpg" },' +
'{"id":"7","name":"Namkeen","price":"49","mrp":"130","date":"2022-09-10","stock":"0","img_src":"https://m.media-amazon.com/images/I/91b7L1LlR7L._SL1500_.jpg" },' +
'{"id":"8","name":"Bread","price":"100","mrp":"130","date":"2022-09-10","stock":"130","img_src":"https://www.bigbasket.com/media/uploads/p/xxl/40091805_2-britannia-atta-bread.jpg" }]}';
let p=JSON.parse(text);
//console.log(p.product);
let data=p.product;
//console.log(data.length);
for(i=0;i<data.length;i++){
  //console.log(i);

//console.log(data[i].name+" "+data[i].price);
let prod_name=data[i].name;
let prod_price=data[i].price;
let prod_img=data[i].img_src;
let prod_stock=data[i].stock;
let prod_mrp=data[i].mrp;
let np;
let soldout="";
let discount1="";
let discount=prod_price/prod_mrp*100;
let final_discount=Math.round(discount);
let prod_date=data[i].date;
let prod_id=data[i].id;
console.log("jjjiiii");
console.log(prod_id);
let url="detail.html?id="+prod_id;
console.log(url);
if(prod_mrp!=prod_price){
  console.log(final_discount);
}
if(prod_stock==0){
  console.log(prod_stock);
  soldout="<span class='soldout'> sold out</span>";
}

if(prod_price==prod_mrp){
   np="<span>₹"+prod_price+"</span>";
  console.log("a");
  addcart="<span class='addcart'>Add Cart</span>";

}
else if (prod_mrp!="" && prod_price=="" ) {
   np="<span>₹"+prod_mrp+"</span>";

console.log("b");
}

  else if (prod_mrp!="" && prod_price!="" && prod_mrp!=prod_price) {
     np="<span><s>₹"+prod_mrp+"</s></span><span> ₹"+prod_price+"</span>";
console.log("c");


  }
  discount1 = "<div class='discount'>"+final_discount+"%"+"off"+"</div>";
console.log(np);



let todaydate=new Date();
console.log(todaydate);
let t_date = todaydate.getFullYear()+'-' + (todaydate.getMonth()+1) + '-'+todaydate.getDate() +' 05:30:00 ';
let pre_date = todaydate.getFullYear()+'-' + (todaydate.getMonth()+1) + '-'+(todaydate.getDate()-1) +' 05:30:00 ';


let previous=new Date(pre_date);
let currdate=new Date(t_date);
let pp_date = new Date(prod_date);
console.log(previous);

console.log(currdate);
console.log(pp_date);
console.log(previous.getTime());

console.log(pp_date.getTime());
console.log("kkk");


newarival="";
if (pp_date.getTime() == currdate.getTime() || pp_date.getTime() ==previous.getTime()){
  newarival = "<div class='newproduct'>New</div>";
  console.log("match");

}

else {
  console.log("not match");
}


document.getElementById('products').innerHTML+="<div class='grid'><a href= "+url+"><img src="+prod_img+" width='200' height='200'></a>"+soldout+discount1+newarival+"<div class='price'>"+np+"</div><div class='name'>"+prod_name+"(Stock : "+prod_stock+")</div><div class='addtocart'><button onclick=addcarts()>Add Cart</button></div></div>";

if(prod_stock==0 ){
document.getElementsByClassName('addtocart')[i].style.display="none";

}

if(prod_price=="" || prod_mrp==prod_price || prod_stock==0){
document.getElementsByClassName('discount')[i].style.display="none";
}

}

/*setInterval(function () {
  console.log("hi");
  const currenttime=new Date();
  console.log(currenttime);
  document.getElementById('time').innerHTML=currenttime;


  document.getElementById('hours').innerHTML=currenttime.getHours();

  let min=currenttime.getMinutes();
  let mindegree=6*min;
  let hour=currenttime.getHours();
  let hourdegree=30*hour+min/2;

  document.getElementById('minutes').innerHTML=min;
  let sec=currenttime.getSeconds();
  let secdegree=6*sec;
  document.getElementById('seconds').innerHTML=sec;

  document.querySelector('.second').style.transform= 'rotate('+secdegree+'deg)';

    document.querySelector('.minute').style.transform= 'rotate('+mindegree+'deg)';
      document.querySelector('.hour').style.transform= 'rotate('+hourdegree+'deg)';

}, 1000);*/

/*let count= 0;
document.getElementById('counting').innerText=count;
function increase() {
  console.log("jai ho");
  count= count+1;
    document.getElementById('counting').innerText=count;
}

function decrease() {
count= count-1;

document.getElementById('counting').innerText=count;
if (count<1){
  document.getElementById('counting').innerText=0;
}


}
function reset() {
  count=0;
  document.getElementById('counting').innerText=count;

}
*/
