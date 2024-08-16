const Register = (event) => {
    event.preventDefault();

    const username = get_value("username");
    const first_name = get_value("first_name");
    const last_name = get_value("last_name");
    const email = get_value("email");
    const password = get_value("password");
    const confirm_password = get_value("confirm_password");

    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
    };

    if (password === confirm_password) {
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&\-_])[A-Za-z\d@$!%*#?&\-_]{8,}$/.test(password)) {
            fetch("https://neighborhood-marketplace-869o.onrender.com/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => {
                if (data.username && data.username.includes("already exists")) {
                    document.getElementById("error").innerText = "Username already exists. Please choose a different one.";
                } else if (data.email && data.email.includes("already exists")) {
                    document.getElementById("error").innerText = "Email already exists. Please use a different one.";
                } else if (data.id) {
                    document.getElementById("success").innerText = "Registration Successful!";
                    alert("Registration successful. Please login to enjoy all features.");
                    window.location.href = "login.html";
                } else {
                    document.getElementById("error").innerText = "Registration failed!";
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                document.getElementById("error").innerText = "An error occurred during registration.";
            });
        } else {
            document.getElementById("error").innerText = "Password must contain eight characters, at least one letter, one number, and one special character (@, $, !, %, *, #, ?, &, -, _).";
        }
    } else {
        document.getElementById("error").innerText = "Password and Confirm Password do not match!";
    }
};


const Login = (event) => {
    event.preventDefault();
    const username = get_value("login_username");
    const password = get_value("login_password");
    
    const info = {
        username,
        password,
    };

    if (username && password) {
        fetch("https://neighborhood-marketplace-869o.onrender.com/api/token/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(info),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((data) => {
            if (data.access && data.user_id) {
                localStorage.setItem("access_token", data.access);
                localStorage.setItem("refresh_token", data.refresh);
                localStorage.setItem("id", data.user_id);
                localStorage.setItem("authenticated", "true");
                document.getElementById("success").innerText = "Login Successful";
                alert("Login successful.");
                window.location.href = "profile.html";
            } else {
                document.getElementById("login_error").innerText = "Wrong credentials!";
            }
        })
        .catch((error) => {
            console.error("Login Error:", error);
            document.getElementById("login_error").innerText = "An error occurred during login.";
        });
    } else {
        document.getElementById("login_error").innerText = "Please enter username and password.";
    }
};



const Logout = () => {
    const token = localStorage.getItem("access_token"); // Assuming access token is used for authentication
    fetch("https://neighborhood-marketplace-869o.onrender.com/api/logout/",{
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`, // Using Bearer token format for JWT
            "Content-Type": "application/json", // Fixed content-type typo
        },
        body: JSON.stringify({ refresh_token: localStorage.getItem("refresh_token") }), // Send refresh token if needed
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    })
    .then((data) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("id"); // Remove user ID as well
        localStorage.setItem("authenticated", "false");
        alert("Logout successful.");
        window.location.href = "login.html";
    })
    .catch((error) => {
        console.error("Logout Error:", error);
        alert("An error occurred during logout.");
    });
};


const get_value = (id) => {
    const value = document.getElementById(id).value;
    return value;
};

const updateNavbar = () => {
    const access_token = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");
    const authButtons = document.getElementById("auth-buttons");

    if (access_token) {
        // If authenticated, show the logout button and user profile link
        authButtons.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="listings.html">Listings</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="add_listing.html">Add Listing</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="Logout()">Logout</a>
            </li>
            <li class="nav-item profile-link-item"> <!-- Added a class for consistent styling -->
                <a href="profile.html?id=${user_id}" class="nav-link profile-link">
                    <div class="profile-icon">
                        <i class="fas fa-user-circle"></i>
                    </div>
                </a>
            </li>
        `;
    } else {
        // If not authenticated, show the login and sign up buttons
        authButtons.innerHTML = `
            <li class="nav-item">
                <a class="nav-link btn btn-secondary mx-4" href="login.html">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link btn btn-secondary" href="register.html">Sign Up</a>
            </li>
        `;
    }
};
document.addEventListener("DOMContentLoaded", updateNavbar);

