const listed =()=> {
    const Token = localStorage.getItem("token");
    fetch("https://neighborhood-marketplace-869o.onrender.com/user_listing/",{
        method : "GET",
        headers :{
            "Authorization":`Token ${Token}`,
        }
    })
    .then((res)=>res.json())
    .then((data)=>showlisted(data))
    .catch((error)=>console.log("Error Fetching Listed",error));
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
const deleteListed = (id) => {
    const Token = localStorage.getItem("token")
    fetch(`https://neighborhood-marketplace-869o.onrender.com/listings/${id}/`, {
        method: 'DELETE',
        headers :{
            "Authorization":`Token ${Token}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Items deleted successfully');
        window.location.href = "user_listing.html";
    })
    .catch(error => {
        console.error('Error deleting Item:', error);
    });
};

listed();