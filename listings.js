const listings =()=>{
    const Token = localStorage.getItem("token");
    fetch("https://neighborhood-marketplace-869o.onrender.com/listings/",{
        method : "GET",
        headers :{
            "Authorization":`Token ${Token}`,
        }
    })
    .then((res)=>res.json())
    .then((data)=>showlisting(data))
    .catch((error)=>console.log("Error Fetching Listings",error));
};

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

const createTransaction = (listingId,event) => {
    const Token = localStorage.getItem("token");
    const user_id = localStorage.getItem("id")
    const sellerId = event.target.getAttribute('data-seller-id'); 
    console.log("Buyer:",user_id)
    console.log("Token:",Token)
    console.log("Listing:",listingId)
    info ={
        listing: listingId,
        status: "Pending",
    };
    fetch("https://neighborhood-marketplace-869o.onrender.com/transactions/", {
        method: "POST",
        headers: {
            "Authorization": `Token ${Token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info)
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.detail) {
            alert("You must be logged in to buy an item!");
            window.location.href = "login.html";
        } else {
            alert("Transaction successfully.");
            window.location.href = `transaction.html`;
        }
        // window.location.href="transaction.html";
    })
    .catch(error => {
        console.error('Error creating transaction:', error);
    });
};
listings();