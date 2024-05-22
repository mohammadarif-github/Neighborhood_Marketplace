const getParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
};

const loadDetails = () => {
    const id = localStorage.getItem("id");
    const Token = localStorage.getItem("token");
    console.log(id);
    fetch(`https://neighborhood-marketplace-869o.onrender.com/profile/${id}/`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${Token}`,
        }
    })
    .then(response => response.json())
    .then((data)=>showdetails(data))
    .catch(error => console.error("Error fetching Profile details:", error));
};
const showdetails=(data)=>{
    document.getElementById("username").innerText = data.username;
    document.getElementById("first-name").innerText = data.first_name;
    document.getElementById("last-name").innerText = data.last_name;
    document.getElementById("email").innerText = data.email;
    document.getElementById("phone").innerText = data.phone;
    document.getElementById("address").innerText = data.address;

    // document.querySelector(".edit-profile-btn").dataset.userId = data.id;

};
const redirectToEditProfile = () => {
    window.location.href = `edit_profile.html`;
};
loadDetails();