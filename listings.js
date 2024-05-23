
async function listings() {
    const id = localStorage.getItem("id");
    const url = "https://neighborhood-marketplace-869o.onrender.com/api/listings/"
    const options = {
        method : "GET",
    }
    try {
        const response = await fetchWithToken(url,options);
        if (response.ok) {
            const data = await response.json();
            showlisting(data);
        } else {
            console.error('Failed to fetch profile data:', response.status);
            // Optionally display an error message to the user
        }
    } catch (error) {
        console.error('Error fetching profile data:', error);
        // Optionally display an error message to the user
    }
}
const showlisting =(items)=>{
    const gallerySection = document.getElementById("gallery");
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container");
    
    let rowDiv ;
    items.forEach((item,index)=>{
        if(index%3===0){
            rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            containerDiv.appendChild(rowDiv);
        }
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-lg-4","mb-4");
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        cardDiv.innerHTML = `
        <img src="${item.image}"alt="" class="card-img-top">
        <div class="card-body">
        <h3 class="card-title">Title : ${item.title}</h3>
        <h4 class="card-title">Condition : ${item.condition} </h4>
        <h5 class="card-price">Price : ${item.price} BDT</h5>
        <p class="card-text">Description : ${item.description.slice(0, 120)}</p>
        <button class="btn btn-outline-success btn-sm buy-button" data-id="${item.id}">Buy</button>
        </div>`;
        colDiv.appendChild(cardDiv);
        rowDiv.appendChild(colDiv);
    });
    containerDiv.appendChild(rowDiv);
    gallerySection.appendChild(containerDiv);
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const listingId = event.target.getAttribute('data-id');
            createTransaction(listingId);
        });
    });
};

const createTransaction = async (listingId, event) => {
    const access_token = localStorage.getItem("access_token"); // Use access_token key
    const user_id = localStorage.getItem("user_id");
    console.log("Buyer:", user_id);
    console.log("Token:", access_token);
    console.log("Listing:", listingId);
    
    const info = {
        listing: listingId,
        status: "Pending",
        buyer: user_id, // Include buyer ID in the request payload
    };
    
    const url = "https://neighborhood-marketplace-869o.onrender.com/api/transactions/";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            const data = await response.json();
            if (data.detail) {
                alert("You must be logged in to buy an item!");
                window.location.href = "login.html";
            } else {
                alert("Transaction created successfully.");
                window.location.href = `transaction.html`;
            }
        } else {
            alert("Failed to create transaction.");
            console.error('Failed to create transaction:', response.status);
            // Optionally display an error message to the user
        }
    } catch (error) {
        alert("Error creating transaction.");
        console.error('Error creating transaction:', error);
        // Optionally display an error message to the user
    }
};
listings();