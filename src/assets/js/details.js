function slider(){
    var images=document.querySelectorAll(".product-images .image img");
    var mainImage=document.querySelector("#mainImage");
    
     console.log(mainImage);
    
    images.forEach(image=>{
        console.log("ima")
        image.addEventListener("click",function(){
            var src=this.getAttribute("src");
            mainImage.setAttribute('src',src);
            var list=this.parentNode.parentNode.children;
            for(let child of list){
                child.classList.remove('active');
            }
            this.parentNode.classList.add('active');
        });
    })
}


