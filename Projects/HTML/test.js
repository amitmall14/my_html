const name='Amit kumar mall ';
console.log("hi");
if (name!=""){
document.getElementById('names').innerHTML='<a href="">'+name+'</a><br>';


document.getElementById('names').innerHTML+='<span class="fontcolors">'+"Hi, "+name+'</span><br>';
let fullname = name.split(' ');
console.log(fullname[0]);
console.log(fullname[1]);
console.log(fullname[3]);



if(fullname[0]!="" && fullname[1]!=""){
  document.getElementById('names').innerHTML+="My first name is "+fullname[0]+" and middle name is "+fullname[1]+" and Last name is "+fullname[2];
}
else if (fullname[0]!="" && fullname[1]=="" && fullname[2]=="") {
 document.getElementById('names').innerHTML+="My first name is "+fullname[0];
}
}
else if (name=="") {
  document.getElementById('names').document.getElementById("myTable").deleteRow(0);innerHTML="Please fill the name";

}
let count=1;
let gtotal=0;
function submits() {

  console.log("hello");
  let stnames=document.getElementById('stname').value;
  console.log(stname);
  let unit=document.getElementById('unit').value;
  console.log(unit);
  let price=document.getElementById('price').value;
  console.log(price);
  let r= unit*price;
  console.log(r);
  document.getElementById('total').value=r;
  gtotal +=r;

  document.getElementById('gtotal').value=gtotal;
  console.log(gtotal);
  let rowid="row_"+count;
  document.getElementById('adddata').innerHTML+="<tr id="+rowid+"><td>"+count+"</td><td>"+stnames+"</td><td>"+unit+"</td><td>"+price+"</td><td>"+r+"</td><td><input type='button' value='delete'onclick=window.deleterow("+count+","+r+")></td></tr>";
  count=count+1;
document.getElementById('totalamount').innerHTML=gtotal;
}
function deleterow(id,amount) {
  console.log(id);
  console.log(amount);
  let rowid="row_"+id;
  document.getElementById(rowid).remove();
let ftotal= parseInt(document.getElementById('totalamount').innerText);
console.log(ftotal);
let c;
 c= ftotal-amount;
 console.log(c);
 document.getElementById('totalamount').innerHTML=c;
 document.getElementById('gtotal').value=c;
}
