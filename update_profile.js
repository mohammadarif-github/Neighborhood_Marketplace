const loadDetails = () => {
    const id = localStorage.getItem("id");
    const Token = localStorage.getItem("token");

    fetch(`https://neighborhood-marketplace-869o.onrender.com/profile/${id}/`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${Token}`,
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("first_name").value = data.first_name;
        document.getElementById("last_name").value = data.last_name;
        document.getElementById("email").value = data.email;
        document.getElementById("address").value = data.address;
        document.getElementById("phone").value = data.phone;
        // document.getElementById("image").files[0] = data.image;
    })
    .catch(error => console.error("Error fetching profile details:", error));
};

const editProfile = () => {
    const id = localStorage.getItem("id");
    const Token = localStorage.getItem("token");
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const image = document.getElementById("image").files[0];

    const formdata = new FormData();
    formdata.append("first_name", first_name);
    formdata.append("last_name", last_name);
    formdata.append("email", email);
    formdata.append("phone", phone);
    formdata.append("address", address);
    if (image) {
        formdata.append("image", image);
    }

    fetch(`https://neighborhood-marketplace-869o.onrender.com/profile/${id}/`, {
        method: "PATCH",
        headers: {
            "Authorization": `Token ${Token}`,
        },
        body: formdata
    })
    
    .then(response => {
        console.log("Response status:", response.status);
        if (response.ok) {
            alert("Profile updated successfully.");
            window.location.href = "index.html"; 
        } else {
            alert("Failed to update Profile.");
        }
    })
    .catch(error => {
        console.error("Error updating profile:", error);
        localStorage.setItem("error",error);
    });
};
loadDetails();