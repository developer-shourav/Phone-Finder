

const loadPhones = async() => {
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
    
}

const displayPhones = (phones) => {
    console.log(phones.length);
    const phonesContainer = document.getElementById("phone-container");

    phones.forEach( phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = ` 
        <div class="col">
                      <div class="card h-100">
                        <img src="..." class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                      </div>
                </div>
        `;

        phonesContainer.appendChild(phoneDiv)

    })
}

loadPhones();

