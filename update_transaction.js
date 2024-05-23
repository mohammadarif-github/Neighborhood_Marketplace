const getParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
};

const loadDetails = async () => {
    const transactionId = getParams();
    const Token = localStorage.getItem("token");

    const url = `https://neighborhood-marketplace-869o.onrender.com/api/transactions/${transactionId}/`;
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
            document.getElementById("status").value = data.status;
        } else {
            console.error('Failed to fetch transaction details:', response.status);
            // Optionally display an error message to the user
        }
    } catch (error) {
        console.error("Error fetching transaction details:", error);
        // Optionally display an error message to the user
    }
};


const editTransaction = async () => {
    const transactionId = getParams();
    const Token = localStorage.getItem("token");
    const status = document.getElementById("status").value;
    console.log("Transact ID:", transactionId);

    const url = `https://neighborhood-marketplace-869o.onrender.com/api/transactions/${transactionId}/`;
    const options = {
        method: "PATCH",
        headers: {
            "Authorization": `Token ${Token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: status })
    };

    try {
        const response = await fetchWithToken(url, options);
        if (response.ok) {
            alert("Transaction updated successfully.");
            window.location.href = "transaction.html"; // Redirect back to the transactions page
        } else {
            alert("Failed to update transaction.");
        }
    } catch (error) {
        console.error("Error updating transaction:", error);
        // Optionally display an error message to the user
    }
};

loadDetails();