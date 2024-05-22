const getParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
};

const loadDetails = () => {
    const listingID = getParams();
    const Token = localStorage.getItem("token");

    fetch(`https://neighborhood-marketplace-869o.onrender.com/listings/${listingID}/`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${Token}`,
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("title").value = data.title;
        document.getElementById("description").value = data.description;
        document.getElementById("price").value = data.price;
        document.getElementById("condition").value = data.condition;
        // document.getElementById("image").files[0] = data.image;
    })
    .catch(error => console.error("Error fetching item details:", error));
};

const editListed = () => {
    const listingID = getParams();
    const Token = localStorage.getItem("token");
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const condition = document.getElementById("condition").value;
    const image = document.getElementById("image").files[0];

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("price", price);
    formdata.append("description", description);
    formdata.append("condition", condition);
    if (image) {
        formdata.append("image", image);
    }

    fetch(`https://neighborhood-marketplace-869o.onrender.com/listings/${listingID}/`, {
        method: "PATCH",
        headers: {
            "Authorization": `Token ${Token}`,
        },
        body: formdata
    })
    .then(response => {
        if (response.ok) {
            alert("Item updated successfully.");
            window.location.href = "user_listing.html"; 
        } else {
            alert("Failed to update Items.");
        }
    })
    .catch(error => console.error("Error updating Items:", error));
};
loadDetails();