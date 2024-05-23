const getParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
};

const loadDetails = async () => {
    const listingID = getParams();
    const url = `https://neighborhood-marketplace-869o.onrender.com/api/listings/${listingID}/`;
    const options = {
        method: "GET",
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            const data = await response.json();
            document.getElementById("title").value = data.title;
            document.getElementById("description").value = data.description;
            document.getElementById("price").value = data.price;
            document.getElementById("condition").value = data.condition;
            // document.getElementById("image").files[0] = data.image; // This line can't be directly set in JS
        } else {
            console.error('Failed to fetch item details:', response.status);
        }
    } catch (error) {
        console.error("Error fetching item details:", error);
    }
};
const editListed = async () => {
    const listingID = getParams();
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

    const url = `https://neighborhood-marketplace-869o.onrender.com/api/listings/${listingID}/`;
    const options = {
        method: "PATCH",
        body: formdata
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            alert("Item updated successfully.");
            window.location.href = "user_listing.html"; 
        } else {
            alert("Failed to update Items.");
        }
    } catch (error) {
        console.error("Error updating Items:", error);
    }
};
loadDetails();