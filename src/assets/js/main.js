
(function(){
    setTimeout(() => {
        var s=document.getElementsByTagName("header")[0];
        console.log(s)
        //add class selected to order status
       
        var orderStatus=document.querySelectorAll(".order-status");
        orderStatus.forEach(element => {
            element.addEventListener("click",function(){
                var selected=this;
              orderStatus.forEach(ele=>{
                    selected==ele?ele.classList.toggle("status-selected"):ele.classList.remove("status-selected")
                }
                )

                
            });
        });
        },200);
}());