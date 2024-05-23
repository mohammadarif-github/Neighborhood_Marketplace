const loadDetails = async () => {
    const id = localStorage.getItem("id");
    const url = `https://neighborhood-marketplace-869o.onrender.com/api/profile/${id}/`;
    const options = {
        method: "GET",
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            const data = await response.json();
            document.getElementById("first_name").value = data.first_name;
            document.getElementById("last_name").value = data.last_name;
            document.getElementById("email").value = data.email;
            document.getElementById("address").value = data.address;
            document.getElementById("phone").value = data.phone;
            // document.getElementById("image").files[0] = data.image;
        } else {
            console.error('Failed to fetch profile details:', response.status);
            // Optionally display an error message to the user
        }
    } catch (error) {
        console.error("Error fetching profile details:", error);
        // Optionally display an error message to the user
    }
};


const editProfile = async () => {
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

    const url = `https://neighborhood-marketplace-869o.onrender.com/api/profile/${id}/`;
    const options = {
        method: "PATCH",
        headers: {
            "Authorization": `Token ${Token}`,
        },
        body: formdata
    };

    try {
        const response = await fetchWithToken(url, options);
        console.log("Response status:", response.status);
        if (response.ok) {
            alert("Profile updated successfully.");
            window.location.href = "index.html"; 
        } else {
            alert("Failed to update Profile.");
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        localStorage.setItem("error", error);
        // Optionally display an error message to the user
    }
};

loadDetails();