const getParams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
};

const loadDetails = () => {
    const transactionId = getParams();
    const Token = localStorage.getItem("token");

    fetch(`https://neighborhood-marketplace-869o.onrender.com/transactions/${transactionId}/`, {
        method: "GET",
        headers: {
            "Authorization": `Token ${Token}`,
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("status").value = data.status;
    })
    .catch(error => console.error("Error fetching transaction details:", error));
};

const editTransaction = () => {
    const transactionId = getParams();
    const Token = localStorage.getItem("token");
    const status = document.getElementById("status").value;
    console.log("Transact ID:",transactionId);

    fetch(`https://neighborhood-marketplace-869o.onrender.com/transactions/${transactionId}/`, {
        method: "PATCH",
        headers: {
            "Authorization": `Token ${Token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: status })
    })
    .then(response => {
        if (response.ok) {
            alert("Transaction updated successfully.");
            window.location.href = "transaction.html"; // Redirect back to the transactions page
        } else {
            alert("Failed to update transaction.");
        }
    })
    .catch(error => console.error("Error updating transaction:", error));
};

loadDetails();