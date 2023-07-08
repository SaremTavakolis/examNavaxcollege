let request = new XMLHttpRequest();
request.onload = function(){
    let response =JSON.parse(this.responseText);
    console.log(response.data.tabs);
    const dataUrl = response.data.tabs
    const header = document.createElement('header');
    const main = document.createElement('main')
    document.body.appendChild(header);
    document.body.appendChild(main);
    for(let i = 0 ; i < dataUrl.length ; i++){
        const is_active= response.data.tabs[i].is_active;
        if(i < dataUrl.length){
            let div = document.createElement('div');
            header.appendChild(div)
            div.textContent=  response.data.tabs[i].title
            if(div.textContent.length > 10){
                div.textContent = "... "+ div.textContent.slice(0,7) 
            }
            div.style.cursor = 'pointer';
            if(is_active === true){
                div.classList.add('isActive')
            }
            div.addEventListener('click',function(){
                const allDiv = document.querySelector('header').children;
                for(let g = 0 ; g < allDiv.length ; g++){
                    allDiv[g].classList.remove('isActive')
                    main.textContent = ""
                }
                div.classList.add('isActive')
                if(div.classList.contains('isActive')){
                    for(let j = 0 ; j < response.data.tabs[i].body.length ; j++){
                        let div = document.createElement('div');
                        main.appendChild(div)
                        div.textContent=  response.data.tabs[i].body[j]
                    } 
                 }
            })
         }
         if(is_active === true){
            for(let j = 0 ; j < response.data.tabs[i].body.length ; j++){
                let div = document.createElement('div');
                main.appendChild(div)
                div.textContent=  response.data.tabs[i].body[j]
            } 
         }
    }
}
request.open('GET',"https://lms.navaxcollege.com/exam.php");
request.send();