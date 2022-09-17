/*let text = '{"product":[' +
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
console.log(data.length);

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
 let my_id = urlParams.get('id');
console.log(my_id);
for(i=0; i<data.length; i++){

  let prod_id=data[i].id;
 if(prod_id==my_id){
    let prod_name=data[i].name;
    let prod_price=data[i].price;
    let prod_img=data[i].img_src;
    let prod_stock=data[i].stock;
    let prod_mrp=data[i].mrp;
    let np="";
    let discount=prod_price/prod_mrp*100;
    let final_discount=Math.round(discount);


  if(prod_mrp==prod_price){
    np='<div><span>₹'+prod_mrp+'</span></div>';
      addcart="<span class='addcart'>Add Cart</span>";

}
else if (prod_mrp!="" && prod_price=="") {
  np='<div><span>₹'+prod_mrp+'</span></div>';


}
else if (prod_mrp!=prod_price) {
    np='<div><span><s>₹'+prod_mrp+'</s></span><span>  ₹'+prod_price+'</span></div>';

}
    console.log("hi");
    console.log(prod_name);
    document.getElementById('detail').innerHTML='<div class="left"><img src='+prod_img+'></div><div class="right"><h1>'+prod_name+'</h1>'+np+''+final_discount+'% off<div class="addtocart"><button onclick=addcarts()>Add Cart</button></div></div>';

  }


}
*/
const a=[4,4.2,0.6];
for(i=0;i<a.length;i++){
  console.log(Math.ceil(a[i]));
}

let email="shalu@mall@gmail.com"
let newemail= email.split("@");
console.log(newemail[2]);


let inp= "a";
if(inp=="a"||inp=="e"||inp=="i"||inp=="o"||inp=="u"){
  console.log(inp+" is vovels");
}
else{
  console.log("consonent");
}
