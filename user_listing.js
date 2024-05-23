const listed = async () => {
    const Token = localStorage.getItem("token");
    const url = "https://neighborhood-marketplace-869o.onrender.com/api/user_listing/";
    const options = {
        method: "GET",
        headers: {
            "Authorization": `Token ${Token}`,
        }
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            const data = await response.json();
            showlisted(data);
        } else {
            console.error('Failed to fetch user listings:', response.status);
            // Optionally display an error message to the user
        }
    } catch (error) {
        console.error('Error fetching user listings:', error);
        // Optionally display an error message to the user
    }
};

const showlisted =(items) =>{
    const listingTable = document.getElementById("listingTable");
    
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Id</th>
        <th>Title</th>
        <th>Condition</th>
        <th>Price</th>
        <th>Date Added</th>
        <th>Action</th>
    `;
    listingTable.appendChild(headerRow);

    items.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.condition}</td>
            <td>${item.price}</td>
            <td>${item.date}</td>
            <td>
                <button class="btn btn-warning btn-sm mx-1" onclick="updateListed(${item.id})">Update</button>
                <button class="btn btn-danger btn-sm" onclick="deleteListed(${item.id})">Delete</button>
            </td>
        `;
        listingTable.appendChild(row);
    });
};
const updateListed = (id) => {
    window.location.href = `update_listed.html?id=${id}`;
};
const deleteListed = async (id) => {
    try {
        const Token = localStorage.getItem("token");
        const url = `https://neighborhood-marketplace-869o.onrender.com/api/listings/${id}/`;
        const options = {
            method: 'DELETE',
            headers: {
                "Authorization": `Token ${Token}`,
            }
        };

        const response = await fetchWithToken(url, options);
        if (response.ok) {
            console.log('Item deleted successfully');
            window.location.href = "user_listing.html";
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error deleting Item:', error);
    }
};

listed();