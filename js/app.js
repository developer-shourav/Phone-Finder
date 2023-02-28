

const loadPhones = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
    
}

const displayPhones = (phones) => {
    const phonesContainer = document.getElementById("phone-container");
    phonesContainer.innerHTML = " ";
    const resultCount = document.getElementById("result-count");
    resultCount.innerText = phones.length;
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

    })
}

document.getElementById('btn-search').addEventListener('click', function (){
    const searchField = document.getElementById('search-field');
    const searchFor = document.getElementById('search-for');
    const searchText = searchField.value;
    searchFor.innerText = `'${searchText}'`
    loadPhones(searchText);

    searchField.value = '';

})

loadPhones('iphone');

