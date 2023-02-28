

const loadPhones = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
    
}

const displayPhones = (phones) => {
    const phonesContainer = document.getElementById("phone-container");
    phonesContainer.innerHTML = " ";
   
    /* For displaying only 20 result and Show all button*/
    const showAllButton = document.getElementById('show-all');
    if(phones.length > 20){
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
        <div class="col shadow">
                      <div class="card h-100">
                        <img src="${phone.image}" class="card-img-top rounded-4 shadow-lg w-50 pt-3 mx-auto" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Brand: ${phone.brand}</h5>
                          <h4 class="card-title">Model: ${phone.phone_name}</h4>
                          <p class="card-text">Slug: ${phone.slug}</p>
                        </div>
                      </div>
                </div>
        `;

        phonesContainer.appendChild(phoneDiv)

    });

    /*========= Stop Loader ==========*/
    toggleLoader(false);
}

document.getElementById('btn-search').addEventListener('click', function (){
    const searchField = document.getElementById('search-field');
    const searchFor = document.getElementById('search-for');
    const searchText = searchField.value;
    searchFor.innerText = `'${searchText}'`
    loadPhones(searchText);

    searchField.value = '';
  /*========= Start Loader ==========*/
  toggleLoader(true);

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




loadPhones('iphone');

