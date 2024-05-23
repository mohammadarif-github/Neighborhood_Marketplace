
async function loadDetails() {
    const id = localStorage.getItem("id");
    const url = `https://neighborhood-marketplace-869o.onrender.com/api/profile/${id}`;
    const options = {
        method: "GET",
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            const data = await response.json();
            showDetails(data);
        } else {
            console.error('Failed to fetch profile data:', response.status);
            // Optionally display an error message to the user
        }
    } catch (error) {
        console.error('Error fetching profile data:', error);
        // Optionally display an error message to the user
    }
}
const showDetails=(data)=>{
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
