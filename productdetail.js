var xhr;
let productData = [];
let arraydata102 = [];
let fliterObjects = {
    categories:[]
};
const placingdata = document.getElementById('rightpanel');
const modify = document.getElementById('caro');
//------------------------creating xhr request--------------------------
const load = () => {
    xhr = new XMLHttpRequest();
    if(!xhr) {
        alert('Unable to create XHR Object');
        return false;
    }
    xhr.onreadystatechange = renderContent;
    xhr.open('GET', '../productdata.json');
    xhr.send();
    function renderContent() {
        console.log(xhr.readyState);
        if(xhr.readyState === 4) {
            console.log('Received the data');
            if(xhr.status === 200){
            productData = JSON.parse(xhr.responseText).productinfoarray; 
            arraydata102 = [...productData];
            initialdata();   
            carouselimplement();       
        }
            else {
            console.log('Problem making AJAX request');
            }
        }
    }
}
window.onload = load;
// //-----------------------------------------------------------------------
const applyfilters = () => {
    arraydata102 = [...productData];
    const {categories} = fliterObjects 
   
    sortCategory(categories)
    initialdata()
}
//-----------------------------------------------------------------------
const carouselimplement = () =>{
    if(productData){
        console.log(productData)
        modify.innerHTML="";
        for(const {logo} of arraydata102){
        const havingvalue = modify.appendChild(document.createElement('div'));
        havingvalue.innerHTML=(`<div class="item"><h4><img class="caro_image" src="${logo}" alt="image"></h4></div>`)    
    }
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        autoplay: true,
        autoplayTimeout: 3000, 
        nav:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    })     
    }
}



// --------------------Products view in the starting---------------------
const initialdata = () =>{
    if(productData){
        placingdata.innerHTML = "";
        for(const {name, view, imdbrating, logo} of arraydata102 ){
            const keepvalue = placingdata.appendChild(document.createElement('div'));
            keepvalue.className='keep-value';
            keepvalue.innerHTML=(`<img src="${logo}" class="right" alt="product images"/> 
            <div class="text">
            <button class="naming">${name}</button><br>
            <button class="plus">+</button>
            <img src="star.png" alt="starimage" class="ratingstar"/>
            <span class="j1">${imdbrating}</span>
            <button class="viewerinfo">${view}</button>
            </div>
            
            `)        
        }
    }
    else{
        console.error('problem loading request');
    }
}
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
const sortCategory = categories => {
     if(categories.length){
         arraydata102 = arraydata102.filter(element => categories.includes(element.group));
     }
}
// //------------------------------------------------------------------------
const reset = () => {
    arraydata102 = [...productData];   
    fliterObjects.categories = [];
    applyfilters()
}
// //------------------------------------------------------------------------
const handleFilters = (filter,type) => {    
    if(type==="categories"){                            //if parameter type has categories
        let categories = fliterObjects.categories
        if(categories.includes(filter)){                //determines whether a string contains given character or not
            categories = categories.filter(element => element !== filter)
        }
        else{
            categories.push(filter)
        }
        fliterObjects.categories = categories
    }  
    applyfilters()   
}
// //--------------------------------------------------------------------------