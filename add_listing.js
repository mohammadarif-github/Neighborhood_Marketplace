const add_listing = async (event) => {
    event.preventDefault();

    const user_id = localStorage.getItem("id");
    console.log("ID", user_id);
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const condition = document.getElementById("condition").value;
    const slug = slugify(title, { lower: true, replacement: '-', remove: /[*+~.()'"!:@]/g });

    let imagefile = null;
    const image = document.getElementById("image");
    if (image.files.length > 0) {
        imagefile = image.files[0];
    }

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("price", price);
    formdata.append("description", description);
    formdata.append("slug", slug);
    formdata.append("condition", condition);
    formdata.append("user", user_id);

    if (imagefile) {
        formdata.append("image", imagefile);
    }

    const url = "https://neighborhood-marketplace-869o.onrender.com/api/listings/";
    const options = {
        method: "POST",
        body: formdata,
    };

    try {
        const response = await fetchWithToken(url, options);
        const data = await response.json();

        console.log("Response:", data);

        if (data.detail) {
            alert("You must be logged in to upload item!");
            window.location.href = "login.html";
        } else if (data.id) {
            alert("Item listed successfully.");
            window.location.href = "listings.html";
        } else {
            alert("Failed to list item.");
            console.log(data);
        }
    } catch (error) {
        console.error('Error uploading item:', error);
    }
};

document.getElementById("submitBtn").addEventListener("click", add_listing);

