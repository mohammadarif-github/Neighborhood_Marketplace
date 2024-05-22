
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
            fetch("https://neighborhood-marketplace-869o.onrender.com/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.id) {
                    document.getElementById("success").innerText = "Registration Successful!";
                    alert("Registration successfull.Please Login to enjoy all Features");
                    window.location.href = "login.html";
                } else {
                    document.getElementById("error").innerText = data.detail || "Registration failed!";
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
    
    info = {
        username,
        password,
    };
    console.log(info);
    if (username,password){
        fetch("https://neighborhood-marketplace-869o.onrender.com/login/",{
            method : "POST",
            headers : {"content-type":"application/json"},
            body : JSON.stringify(info),
        })
        .then((res)=>res.json())
        .then((data)=> {console.log(data);
            
            if(data.token && data.user_id){
                localStorage.setItem("token",data.token);
                localStorage.setItem("id",data.user_id);
                localStorage.setItem("authenticated", "true");
                document.getElementById("success").innerText= "Login Successfull";
                alert("Login successfull.");
                window.location.href="profile.html";
            }
            else {
                document.getElementById("login_error").innerText= "Wrong Credential !!!";
                window.location.href("login.html")
            }
        })
        .catch((error)=>{
            console.error("Login Error :", error);
            document.getElementById("login_error").innerText = "Wrong Credential";
            window.location.href("login.html")
        });
    }
    else {
        document.getElementById("login_error").innerText = "Wrong Credential !!!";
    }
};


const Logout = () => {
    const token = localStorage.getItem("token");
    fetch("https://neighborhood-marketplace-869o.onrender.com/logout/", {
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
            "content-type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.setItem("authenticated", "false");
        alert("Logout successfull.");
        window.location.href = "login.html";
    });
};

const get_value = (id) => {
    const value = document.getElementById(id).value;
    return value;
};

const updateNavbar = () => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("id")
    const authButtons = document.getElementById("auth-buttons");
    const authenticated = localStorage.getItem("authenticated")
    if (token) {
      // If authenticated, show the logout button
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
            <li class ="nav-item">
            <a href="profile.html?id=${user_id}"class="profile-link">
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

