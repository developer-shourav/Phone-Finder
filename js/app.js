

const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
    
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById("phone-container");
    phonesContainer.innerHTML = " ";
   
    /* For displaying only 20 result and Show all button*/

    /* Show all result button দিয়ে সকল result দেখার ৩ টি উপায় আছে। 
      --------------------------------------------------------------------

      ১। এটা সর্বত্তম ঃ প্রথমে api থকেই ২০ টা লোড করা। পরে আমার ২০ এর পরের গুলা api থেকে load করা
      ২। ২০ এর পরের গুলা slice করে golbal variable এ রেখে ব্যাবহার করা। 
      
      ৩। ফকিরা উপায় ঃ ২ বার সম্পুর্ন api load করা। প্রথম বার load kora slice করে দেখাব । পরের বার Show all button এ ক্লিক করলে সব আমার load করে সবি আবার দেখানো।
    
    
    */

    
    const showAllButton = document.getElementById('show-all');
    if((dataLimit == 20) && (phones.length > 20)){
        phones = phones.slice(0,20);
        showAllButton.classList.remove('d-none');
    }

    else{
        showAllButton.classList.add('d-none');
    }

    /* For Displaying result count */
    const resultCount = document.getElementById("result-count");
    resultCount.innerText = phones.length;


    /* For Displaying  Empty result massage */
    const zeroResultErrorMassage = document.getElementById('empty-result-massage');
    if(phones.length === 0){
        zeroResultErrorMassage.classList.remove("d-none")
    }

    else{
        zeroResultErrorMassage.classList.add("d-none")
    }

    /* For Displaying all result */
    phones.forEach( phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = ` 
        <div class="col shadow h-100">
                      <div class="card h-100">
                        <img src="${phone.image}" class="card-img-top rounded-4 shadow-lg w-50 pt-3 mx-auto" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Brand: ${phone.brand}</h5>
                          <h4 class="card-title">Model: ${phone.phone_name}</h4>
                          <p class="card-text">Code: ${phone.slug}</p>
                          <button onclick ="loadDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                        </div>
                      </div>
                </div>
        `;

        phonesContainer.appendChild(phoneDiv)

    });

    /*========= Stop Loader ==========*/
    toggleLoader(false);
}


/* ======Search processor ======== */

const processSearch = (dataLimit) => {
    const searchField = document.getElementById('search-field');
    const searchFor = document.getElementById('search-for');
    const searchText = searchField.value;
    searchFor.innerText = `'${searchText}'`;
    loadPhones(searchText, dataLimit);

 /*    searchField.value = ''; */
  /*========= Start Loader ==========*/
  toggleLoader(true);


}


/* ======= Handle Search button click =============*/
document.getElementById('btn-search').addEventListener('click', function (){
   processSearch(20)

})

/* ======= Handle Search with key Enter =============*/
document.getElementById('search-field').addEventListener('keypress', function (e){
    if( e.key === "Enter"){
        processSearch(20)
    }
})



const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('loader');
    /* isLoading যদি true হয় */
    if(isLoading){
        loaderSection.classList.remove("d-none")
    }

    else{
        loaderSection.classList.add("d-none")
    }
}

/*========== Not the best way to load show all ========= */
document.getElementById('btn-show-all').addEventListener('click', function (){
    processSearch()

})

/*========== load phone details ========= */
const loadDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data)
}

const displayDetails = phoneData => {
    console.log(phoneData);
}

/*========== Default Function call with argument ========= */
loadPhones('iphone');



