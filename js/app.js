

const loadPhones = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
    
}

const displayPhones = (phones) => {
    const phonesContainer = document.getElementById("phone-container");

    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = " ";
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
    const searchText = searchField.value;
    loadPhones(searchText);

    searchField.value = '';

})

loadPhones('iphone');

