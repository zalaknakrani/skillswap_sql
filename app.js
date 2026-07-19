function refreshCurrentUser(){
    let users = JSON.parse(localStorage.getItem("users")) || [];
    currentUser = users.find(u => u.email === currentUser.email) || currentUser;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function isPhoneValid(phone){
    return /^\d{10}$/.test(phone || "");
}

function isContactUnique(contact){
    let users = JSON.parse(localStorage.getItem("users")) || [];
    return !users.some(u => u.contact === contact && u.email !== currentUser?.email);
}

function validateContact(){
    let contactEl = document.getElementById("contact");
    let help = document.getElementById("contactHelp");
    if(!contactEl || !help) return false;

    let digits = contactEl.value.replace(/\D/g, "");
    if(contactEl.value !== digits){
        contactEl.value = digits;
    }

    let valid = isPhoneValid(digits);
    let unique = valid && isContactUnique(digits);

    if(digits.length > 0 && !valid){
        help.innerText = "Mobile number must be 10 digits, no letters or special characters.";
        help.style.display = "block";
    } else if(digits.length > 0 && !unique){
        help.innerText = "This phone number is already used by another user.";
        help.style.display = "block";
    } else {
        help.style.display = "none";
    }

    return valid && unique;
}

const stateOptionsByCountry = {
    "India": [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
        "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
        "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
        "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
    ],
    "United States": [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
        "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
        "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
        "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
        "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "District of Columbia"
    ],
    "Canada": [
        "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador",
        "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
        "Northwest Territories", "Nunavut", "Yukon"
    ],
    "Australia": [
        "Australian Capital Territory", "New South Wales", "Northern Territory", "Queensland", "South Australia",
        "Tasmania", "Victoria", "Western Australia"
    ],
    "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
    "Germany": [
        "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse",
        "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Rhineland-Palatinate",
        "Saarland", "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"
    ],
    "France": [
        "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany", "Centre-Val de Loire", "Corsica",
        "Grand Est", "Hauts-de-France", "Île-de-France", "Normandy", "Nouvelle-Aquitaine",
        "Occitanie", "Pays de la Loire", "Provence-Alpes-Côte d'Azur"
    ],
    "Brazil": [
        "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo",
        "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba",
        "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul",
        "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
    ],
    "South Africa": [
        "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga",
        "Northern Cape", "North West", "Western Cape"
    ],
    "China": [
        "Anhui", "Fujian", "Gansu", "Guangdong", "Guangxi", "Guizhou", "Hainan", "Hebei", "Heilongjiang",
        "Henan", "Hubei", "Hunan", "Jiangsu", "Jiangxi", "Jilin", "Liaoning", "Qinghai", "Shaanxi",
        "Shandong", "Shanghai", "Shanxi", "Sichuan", "Tianjin", "Xinjiang", "Yunnan", "Zhejiang",
        "Chongqing", "Inner Mongolia", "Ningxia", "Tibet", "Hong Kong", "Macau"
    ],
    "Mexico": [
        "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua",
        "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México",
        "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo",
        "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz",
        "Yucatán", "Zacatecas"
    ],
    "Pakistan": ["Balochistan", "Gilgit-Baltistan", "Islamabad Capital Territory", "Khyber Pakhtunkhwa", "Punjab", "Sindh"],
    "Nigeria": [
        "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
        "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
        "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
        "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "Federal Capital Territory"
    ]
};

function updateStateOptions(){
    let country = document.getElementById("country")?.value;
    let stateSelect = document.getElementById("state");
    if(!stateSelect) return;

    let states = stateOptionsByCountry[country] || [];
    stateSelect.innerHTML = "";

    if(states.length){
        stateSelect.innerHTML = `<option value="" disabled selected>Select State</option>`;
        states.forEach(state => {
            stateSelect.innerHTML += `<option value="${state}">${state}</option>`;
        });
    } else {
        stateSelect.innerHTML = `<option value="" disabled selected>Select State</option><option value="Other">Other</option>`;
    }

    if(currentUser && currentUser.state){
        if([...stateSelect.options].some(o => o.value === currentUser.state)){
            stateSelect.value = currentUser.state;
        } else {
            let custom = document.createElement('option');
            custom.value = currentUser.state;
            custom.text = currentUser.state;
            stateSelect.appendChild(custom);
            stateSelect.value = currentUser.state;
        }
    }
}

function isProfileComplete(){
    if(!currentUser) return false;
    let required = [currentUser.name, currentUser.contact, currentUser.country, currentUser.state, currentUser.degree, currentUser.address];
    return required.every(field => typeof field === 'string' && field.trim().length > 0) && isPhoneValid(currentUser.contact);
}

function updateNavButtons(){
    let buttons = document.querySelectorAll('#dashboardNav button');
    let complete = isProfileComplete();
    buttons.forEach(btn => {
        if(btn.dataset.section !== 'profile'){
            btn.disabled = !complete;
            btn.style.opacity = complete ? '1' : '0.5';
            btn.style.cursor = complete ? 'pointer' : 'not-allowed';
        }
    });
}
// ---------------- USER SESSION ----------------
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// redirect if not logged in
if (window.location.pathname.includes("dashboard.html") && !currentUser) {
    window.location.href = "login.html";
}

// ---------------- REGISTER ----------------
function register(){
    let email = document.getElementById("email").value.trim().toLowerCase();
    let pass = document.getElementById("password").value.trim();

    if(!email || !pass){
        alert("Enter email & password");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(u => u.email.toLowerCase() === email);
    if(exists){
        alert("Email id already exists. Please login instead.");
        return;
    }

    users.push({
    email: email,
    password: pass,
    skills: [],
    learn: [],
    coins: 0,
    name: "",
    contact: "",
    country: "",
    state: "",
    degree: "",
    address: ""
});

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully ✅");
}

// ---------------- LOGIN ----------------
function login(){
    let email = document.getElementById("email").value.trim().toLowerCase();
    let pass = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email.toLowerCase() === email && u.password === pass);

    if(!user){
        alert("Invalid credentials ❌");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Login Success 🎉");
    window.location.href = "dashboard.html";
}

// ---------------- LOGOUT ----------------
function logout(){
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}


// ---------------- SAVE SKILL ----------------
function saveSkill(){
    let skill = document.getElementById("skill").value.trim();
    let learn = document.getElementById("learn").value.trim();

    if(!skill || !learn){
        alert("Enter both fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(u => {
        if(u.email === currentUser.email){

            u.skills = u.skills || [];
            u.learn = u.learn || [];

            if(!u.skills.includes(skill)){
                u.skills.push(skill);
            }

            if(!u.learn.includes(learn)){
                u.learn.push(learn);
            }

            currentUser = u;
        }
        return u;
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    alert("Skill Saved ✅");

    loadDropdowns(); // 👈 update dropdown after saving
}
// ---------------- MATCHING ----------------
function findMatches(){
    let matchList = document.getElementById("matchList");
    let users = JSON.parse(localStorage.getItem("users")) || [];

    matchList.innerHTML = "";
    let found = false;

    if(!currentUser || !currentUser.email){
        matchList.innerHTML = "No matches found ❌";
        return;
    }

    let user = users.find(u => u.email === currentUser.email);
    if(!user || !Array.isArray(user.skills) || !Array.isArray(user.learn) || !user.skills.length || !user.learn.length){
        matchList.innerHTML = "No matches found ❌";
        return;
    }

    users.forEach(other => {
        if(other.email === user.email) return;

        if(
            Array.isArray(other.skills) && other.skills.length &&
            Array.isArray(other.learn) && other.learn.length &&
            other.skills.some(s => user.learn.includes(s)) &&
            user.skills.some(s => other.learn.includes(s))
        ){
            found = true;
            matchList.innerHTML += `
    <div style="border:1px solid #ccc; padding:10px; margin:5px;">
        <p>🤝 ${user.email} ↔ ${other.email}</p>

        <div style="margin:10px 0; text-align:left;">
            <p><b>Offers:</b> ${other.skills.join(", ")}</p>
            <p><b>Wants:</b> ${other.learn.join(", ")}</p>
        </div>

        <button onclick="viewProfile('${other.email}')">
            View ${other.email} Profile
        </button>
    </div>
`;
        }
    });

    if(!found){
        matchList.innerHTML = "No matches found ❌";
    }
}

// ---------------- COINS SYSTEM ----------------
let sessionInterval;
let seconds = 0;

function startSession(){
    if(sessionInterval){
        alert("Session already running!");
        return;
    }

    sessionInterval = setInterval(()=>{
        seconds++;

        document.getElementById("timerText").innerText =
            "Session: " + seconds + " sec";

        if(seconds % 5 === 0){
            addCoins(2);
        }

        if(seconds % 30 === 0){
            addCoins(10);
            alert("🔥 Bonus Coins!");
        }

    }, 1000);
}

function stopSession(){
    if(sessionInterval){
        clearInterval(sessionInterval);
        sessionInterval = null;

        alert("Session ended 💰");
        seconds = 0;

        document.getElementById("timerText").innerText = "Session: 0 sec";
    }
}

function addCoins(amount){
    if(!currentUser || !currentUser.email) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(u=>{
        if(u.email === currentUser.email){
            u.coins = (u.coins || 0) + amount;
            currentUser = u;
        }
        return u;
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    document.getElementById("coinDisplay").innerText =
        "Coins: " + (currentUser.coins || 0);
}


function getSuggestions(){
    let learn = document.getElementById("learn").value.toLowerCase();
    let box = document.getElementById("suggestions");

    // 🔒 Consent check FIRST
    if(!document.getElementById("consent").checked){
        alert("Please accept AI usage");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let suggestions = new Set();

    // 🤖 Collect suggestions
    users.forEach(u=>{
        (u.skills || []).forEach(skill=>{
            if(skill.toLowerCase().includes(learn)){
                suggestions.add(skill);
            }
        });
    });

    // ⚖️ Bias prevention (LIMIT results)
    let result = [...suggestions].slice(0,5);

    // 📊 Display suggestions
    if(result.length === 0){
        box.innerHTML = "AI could not find suggestions 🤖";
    } else {
        box.innerHTML = "<b>AI Suggestions:</b><br>" + result.join(", ");
    }

    // 🔍 Explain AI decision (VERY IMPORTANT)
    let explain = document.getElementById("aiExplain");
    if(explain){
        explain.innerText =
        "Suggestions are based on other users' skills. No personal data is used.";
    }
}

function loadUsers(){
    let list = document.getElementById("userList");
    let users = JSON.parse(localStorage.getItem("users")) || [];

    list.innerHTML = "";

    if(users.length === 0){
        list.innerHTML = "No users found ❌";
        return;
    }

    users.forEach(u=>{
        list.innerHTML += `
            <div style="border:1px solid #ccc; padding:10px; margin:5px;">
                <b>${u.email}</b><br>
                Offers: ${u.skills.join(", ")}<br>
Wants: ${u.learn.join(", ")}
            </div>
        `;
    });
}
function addSkill(){
    let skill = document.getElementById("skill").value.trim();

    if(!skill) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(u=>{
        if(u.email === currentUser.email){

            if(!u.skills.includes(skill)){
                u.skills.push(skill);
                currentUser = u;
            }
        }
        return u;
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    displayMySkills();
}
function addLearn(){
    let learn = document.getElementById("learn").value.trim();

    if(!learn) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(u=>{
        if(u.email === currentUser.email){

            if(!u.learn.includes(learn)){
                u.learn.push(learn);
                currentUser = u;
            }
        }
        return u;
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    displayMyLearn();
}
function displayMySkills(){
    let box = document.getElementById("mySkills");

    if(!currentUser || !Array.isArray(currentUser.skills) || currentUser.skills.length === 0){
        box.innerHTML = "";
        return;
    }

    box.innerHTML = currentUser.skills.map(s =>
        `<span style="border:1px solid gray; padding:5px; margin:3px;">
            ${s}
        </span>`
    ).join("");
}
function displayMyLearn(){
    let box = document.getElementById("myLearn");

    if(!currentUser || !Array.isArray(currentUser.learn) || currentUser.learn.length === 0){
        box.innerHTML = "";
        return;
    }

    box.innerHTML = currentUser.learn.map(l =>
        `<span style="border:1px solid gray; padding:5px; margin:3px;">
            ${l}
        </span>`
    ).join("");
}

function loadDropdowns(){
    // Placeholder for any future dropdown population.
    // Currently there are no dropdowns in this HTML, but this prevents runtime errors.
}

window.onload = function(){
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if(currentUser){
        currentUser = users.find(u => u.email === currentUser.email) || currentUser;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    if(currentUser && document.getElementById("coinDisplay")){
        document.getElementById("coinDisplay").innerText =
            "Coins: " + (currentUser.coins || 0);
    }

    displayMySkills();
    displayMyLearn();
    displayProfile();   // ⭐ ADD THIS
    populateProfileForm();
    loadDropdowns();
    updateNavButtons();
    validateContact();

    if(!isProfileComplete()){
        showSection('profile');
    }
};
function showSection(id){
    if(!isProfileComplete() && id !== 'profile'){
        alert('Please complete your profile first to access Skills, Matches, and Session.');
        id = 'profile';
    }
    let sections = document.querySelectorAll(".section");
    sections.forEach(sec => sec.style.display = "none");
    document.getElementById(id).style.display = "block";
}
function saveProfile(){
    let name = document.getElementById("name").value.trim();
    let contact = document.getElementById("contact").value.trim();
    let country = document.getElementById("country").value;
    let state = document.getElementById("state").value;
    let degree = document.getElementById("degree").value.trim();
    let address = document.getElementById("address").value.trim();

    if(!validateContact()){
        document.getElementById("contact").focus();
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(u=>{
        if(u.email === currentUser.email){
            u.name = name;
            u.contact = contact;
            u.country = country;
            u.state = state;
            u.degree = degree.toLowerCase();
            u.address = address;

            currentUser = u;
        }
        return u;
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    refreshCurrentUser();   // ⭐ IMPORTANT

    alert("Profile Saved ✅");
    displayProfile();       // ⭐ SHOW IMMEDIATELY
    updateNavButtons();
    populateProfileForm();
    showSection('skills');
}

function populateProfileForm(){
    if(!currentUser) return;

    document.getElementById("name").value = currentUser.name || "";
    document.getElementById("contact").value = currentUser.contact || "";
    document.getElementById("country").value = currentUser.country || "";
    updateStateOptions();
    document.getElementById("state").value = currentUser.state || "";
    document.getElementById("degree").value = currentUser.degree || "";
    document.getElementById("address").value = currentUser.address || "";
}

function displayProfile(){
    let box = document.getElementById("profileDisplay");

    if(!currentUser) return;

    box.innerHTML = `
        <p><b>Email:</b> ${currentUser.email || "-"}</p>
        <p><b>Name:</b> ${currentUser.name || "-"}</p>
        <p><b>Contact:</b> ${currentUser.contact || "-"}</p>
        <p><b>Country:</b> ${currentUser.country || "-"}</p>
        <p><b>State:</b> ${currentUser.state || "-"}</p>
        <p><b>Degree:</b> ${currentUser.degree || "-"}</p>
        <p><b>Address:</b> ${currentUser.address || "-"}</p>
    `;
}

function viewProfile(email){
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === email);

    let box = document.getElementById("profileViewer");

    if(!user){
        box.innerHTML = "<p>User not found.</p>";
        return;
    }

    box.innerHTML = `
        <div style="border:2px solid #333; padding:10px;">
            <h3>${user.email}</h3>
            <p><b>Name:</b> ${user.name || "-"}</p>
            <p><b>Contact:</b> ${user.contact || "Hidden"}</p>
            <p><b>Country:</b> ${user.country || "-"}</p>
            <p><b>Degree:</b> ${user.degree || "-"}</p>

            <p><b>Skills:</b> ${(user.skills || []).join(", ")}</p>
            <p><b>Wants:</b> ${(user.learn || []).join(", ")}</p>
        </div>
    `;
}