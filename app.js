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
    let required = [currentUser.name, currentUser.contact, currentUser.country, currentUser.state, currentUser.degree, currentUser.city];
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
// ================= SOCKET.IO SETUP =================
const script = document.createElement('script');
script.src = 'https://cdn.socket.io/4.5.4/socket.io.min.js';
document.head.appendChild(script);

let socket = null;
let socketReady = false;
let pendingLoginEmail = null;
let unreadMessages = JSON.parse(localStorage.getItem("unreadMessages")) || {};

function initSocket() {
    if (socketReady) return;
    if (!window.io) return;

    socket = io();
    socketReady = true;

    socket.off('receive_message');
    socket.off('message_notification');
    socket.off('user_online');
    socket.off('user_offline');
    socket.off('message_failed');

    socket.on('receive_message', (data) => {
        handleIncomingMessage(data);
    });

    socket.on('message_notification', (data) => {
        showMessageNotification(data);
    });

    socket.on('user_online', (data) => {
        console.log(`${data.email} is online`);
    });

    socket.on('user_offline', (data) => {
        console.log(`${data.email} is offline`);
    });

    socket.on('message_failed', (data) => {
        alert(`Failed to send message to ${data.to}: ${data.reason}`);
    });

    if (pendingLoginEmail) {
        socket.emit('user_login', pendingLoginEmail);
        pendingLoginEmail = null;
    }
}

// Connect to server when Socket.io is ready
script.onload = function() {
    initSocket();
};

// Update navbar chat button with unread count
function updateChatNavBadge() {
    const totalUnread = Object.values(unreadMessages).reduce((a, b) => a + b, 0);
    const chatBtn = document.querySelector('#dashboardNav button[data-section="chat"]');
    
    if(!chatBtn) return;
    
    // Remove old badge
    const oldBadge = chatBtn.querySelector('.nav-badge');
    if(oldBadge) oldBadge.remove();
    
    // Add new badge if there are unread messages
    if(totalUnread > 0) {
        const badge = document.createElement('span');
        badge.className = 'nav-badge';
        badge.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ef4444;
            color: white;
            border-radius: 50%;
            width: 22px;
            height: 22px;
            text-align: center;
            line-height: 22px;
            font-size: 11px;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;
        badge.innerText = totalUnread > 99 ? '99+' : totalUnread;
        
        chatBtn.style.position = 'relative';
        chatBtn.appendChild(badge);
    }
}

// Handle incoming messages
function handleIncomingMessage(data) {
    if(!currentUser) return;
    
    const chatId = getChatId(currentUser.email, data.from);
    const chats = JSON.parse(localStorage.getItem("chats")) || {};
    chats[chatId] = chats[chatId] || [];
    
    chats[chatId].push({
        from: data.from,
        to: currentUser.email,
        text: data.text,
        time: data.time
    });
    
    localStorage.setItem("chats", JSON.stringify(chats));
    
    // Track unread messages (like WhatsApp)
    unreadMessages[data.from] = (unreadMessages[data.from] || 0) + 1;
    localStorage.setItem("unreadMessages", JSON.stringify(unreadMessages));
    
    // Update navbar badge
    updateChatNavBadge();
    
    // Refresh chat if open
    if(chatPartnerEmail === data.from) {
        renderChat();
    } else {
        // Update UI indication with unread count
        updateChatPartnerBadge(data.from, unreadMessages[data.from]);
    }
    
    // Play notification sound
    playNotificationSound();
}

// Play WhatsApp-like notification sound
function playNotificationSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Create a pleasant notification tone (like WhatsApp)
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Show notification when message arrives (WhatsApp style)
function showMessageNotification(data) {
    if(!currentUser) return;
    
    // Check if browser supports Notification API
    if('Notification' in window && Notification.permission === 'granted') {
        const unreadCount = unreadMessages[data.from] || 1;
        new Notification('💬 ' + data.from, {
            body: data.preview + `\n(${unreadCount} unread)`,
            icon: '💬',
            tag: 'chat-' + data.from,
            requireInteraction: true,  // Keep notification persistent
            badge: '💬'
        });
    }
    
    // Create WhatsApp-style notification bubble in dashboard
    createWhatsAppStyleNotification(data);
}

// Create WhatsApp-style notification bubble
function createWhatsAppStyleNotification(data) {
    let notifContainer = document.getElementById("whatsappNotificationContainer");
    
    if(!notifContainer) {
        notifContainer = document.createElement('div');
        notifContainer.id = "whatsappNotificationContainer";
        notifContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            max-height: 80vh;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(notifContainer);
    }
    
    const unreadCount = unreadMessages[data.from] || 1;
    
    // Check if notification for this user already exists
    let existingNotif = document.getElementById('notif-' + data.from);
    if(existingNotif) {
        // Update unread count
        existingNotif.querySelector('.unread-badge').innerText = unreadCount;
        existingNotif.style.animation = 'none';
        setTimeout(() => {
            existingNotif.style.animation = 'slideInRight 0.3s ease-out';
        }, 10);
        return;
    }
    
    const notifDiv = document.createElement('div');
    notifDiv.id = 'notif-' + data.from;
    notifDiv.style.cssText = `
        background: white;
        border-radius: 12px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        padding: 15px;
        animation: slideInRight 0.3s ease-out;
        cursor: pointer;
        transition: all 0.3s ease;
        border-left: 5px solid #25d366;
        min-width: 350px;
    `;
    
    notifDiv.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:start; gap:10px;">
            <div style="flex:1;">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                    <strong style="color:#000; font-size:16px;">💬 ${data.from}</strong>
                    <span class="unread-badge" style="
                        background:#25d366;
                        color:white;
                        border-radius:50%;
                        width:24px;
                        height:24px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        font-size:12px;
                        font-weight:bold;
                    ">${unreadCount}</span>
                </div>
                <p style="margin:5px 0 0 0; color:#555; font-size:14px; word-wrap:break-word;">${data.preview}${data.preview.length === 50 ? '...' : ''}</p>
            </div>
            <button onclick="dismissNotification('${data.from}')" style="
                background:none;
                border:none;
                color:#999;
                font-size:20px;
                cursor:pointer;
                padding:0;
                width:24px;
                height:24px;
                display:flex;
                align-items:center;
                justify-content:center;
            ">✕</button>
        </div>
    `;
    
    notifDiv.onclick = (e) => {
        if(e.target.tagName !== 'BUTTON' && !e.target.classList.contains('unread-badge')) {
            selectChatPartner(data.from);
            showSection('chat');
        }
    };
    
    notifContainer.appendChild(notifDiv);
}

// Dismiss individual notification
function dismissNotification(email) {
    const notif = document.getElementById('notif-' + email);
    if(notif) {
        notif.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notif.remove(), 300);
    }
}

// Update chat partner badge with unread count
function updateChatPartnerBadge(email, unreadCount) {
    const partnerButtons = document.querySelectorAll('#chatPartnerList button');
    partnerButtons.forEach(btn => {
        if(btn.textContent.includes(email)) {
            // Remove old badge if exists
            const oldBadge = btn.querySelector('.chat-badge');
            if(oldBadge) oldBadge.remove();
            
            // Add new badge with count
            const badge = document.createElement('span');
            badge.className = 'chat-badge';
            badge.style.cssText = `
                display: inline-block;
                background: #25d366;
                color: white;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                text-align: center;
                line-height: 24px;
                font-size: 12px;
                font-weight: bold;
                margin-left: 10px;
            `;
            badge.innerText = unreadCount > 99 ? '99+' : unreadCount;
            btn.appendChild(badge);
        }
    });
}

// Clear unread messages when opening chat
function clearUnreadMessages(email) {
    if(unreadMessages[email]) {
        delete unreadMessages[email];
        localStorage.setItem("unreadMessages", JSON.stringify(unreadMessages));
        
        // Update navbar badge
        updateChatNavBadge();
        
        // Remove notification
        dismissNotification(email);
        
        // Remove badge from chat list
        const partnerButtons = document.querySelectorAll('#chatPartnerList button');
        partnerButtons.forEach(btn => {
            if(btn.textContent.includes(email)) {
                const badge = btn.querySelector('.chat-badge');
                if(badge) badge.remove();
            }
        });
    }
}

// Add animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
`;
document.head.appendChild(style);

// Request notification permission
if('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// ================= USER SESSION =================
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let authAction = 'login';

// redirect if not logged in
if (window.location.pathname.includes("dashboard.html") && !currentUser) {
    window.location.href = "login.html";
}

// If user is already logged in on dashboard, notify server
if (currentUser && window.location.pathname.includes("dashboard.html")) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            if (socketReady) {
                socket.emit('user_login', currentUser.email);
            } else {
                pendingLoginEmail = currentUser.email;
            }
            console.log('Notified server: ' + currentUser.email + ' is online');
        }, 1000);
    });
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
    city: ""
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
    
    // Notify server that user logged in via Socket.io
    if (socketReady) {
        socket.emit('user_login', email);
    } else {
        pendingLoginEmail = email;
    }

    alert("Login Success 🎉");
    window.location.href = "dashboard.html";
}

function toggleForgotPassword(show){
    const section = document.getElementById("forgotPasswordSection");
    if(!section) return;
    section.style.display = show ? "block" : "none";
    if(show){
        document.getElementById("forgotEmail").value = document.getElementById("email").value || "";
    } else {
        document.getElementById("forgotEmail").value = "";
        document.getElementById("forgotNewPassword").value = "";
        document.getElementById("forgotConfirmPassword").value = "";
    }
}

function resetPassword(){
    let email = document.getElementById("forgotEmail").value.trim().toLowerCase();
    let newPass = document.getElementById("forgotNewPassword").value.trim();
    let confirmPass = document.getElementById("forgotConfirmPassword").value.trim();

    if(!email || !newPass || !confirmPass){
        alert("Please fill in all reset fields.");
        return;
    }

    if(newPass !== confirmPass){
        alert("Passwords do not match.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userIndex = users.findIndex(u => u.email.toLowerCase() === email);

    if(userIndex === -1){
        alert("Email not found. Please register first.");
        return;
    }

    users[userIndex].password = newPass;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password updated successfully ✅. Please log in with your new password.");
    toggleForgotPassword(false);
}

// ---------- LOGOUT ----------
function logout(){
    // Clear unread messages
    unreadMessages = {};
    localStorage.removeItem("unreadMessages");
    
    if(socket) {
        socket.disconnect();
    }
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}


// ---------------- SAVE SKILL ----------------
function saveSkill(){
    let skill = document.getElementById("skill").value.trim().toUpperCase();
    let learn = document.getElementById("learn").value.trim().toUpperCase();

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

    const exactMatches = [];
    const partialMatches = [];

    const userSkills = (user.skills || []).map(s => String(s).toLowerCase());
    const userLearn = (user.learn || []).map(s => String(s).toLowerCase());

    users.forEach(other => {
        if(other.email === user.email) return;

        const otherSkills = (other.skills || []).map(s => String(s).toLowerCase());
        const otherLearn = (other.learn || []).map(s => String(s).toLowerCase());

        const isExact = otherSkills.length && otherLearn.length &&
            arraysEqualAsSets(otherSkills, userLearn) &&
            arraysEqualAsSets(otherLearn, userSkills);

        const matchedOffers = otherSkills.filter(s => userLearn.includes(s));
        const matchedWants = otherLearn.filter(s => userSkills.includes(s));
        const isPartial = !isExact && (matchedOffers.length || matchedWants.length);

        if(isExact){
            exactMatches.push(other);
        } else if(isPartial){
            partialMatches.push({ other, matchedOffers, matchedWants });
        }
    });

    if(exactMatches.length > 0){
        matchList.innerHTML += `<h3>Exact Matches</h3>`;
        exactMatches.forEach(other => {
            matchList.innerHTML += `
    <div style="border:1px solid #ccc; padding:10px; margin:5px;">
        <p>🤝 ${user.email} ↔ ${other.email}</p>

        <div style="margin:10px 0; text-align:left;">
            <p><b>Offers:</b> ${formatSkillList(other.skills)}</p>
            <p><b>Wants:</b> ${formatSkillList(other.learn)}</p>
        </div>

        <button onclick="viewProfile('${other.email}')">
            View ${other.email} Profile
        </button>
    </div>
`;
        });
    }

    if(partialMatches.length > 0){
        matchList.innerHTML += `<h3>Users with another skill match</h3>`;
        partialMatches.forEach(item => {
            const other = item.other;
            const offerText = item.matchedOffers.length ? `Offers matched: ${item.matchedOffers.join(", ")}` : "";
            const wantText = item.matchedWants.length ? `Wants matched: ${item.matchedWants.join(", ")}` : "";
            matchList.innerHTML += `
    <div style="border:1px solid #999; padding:10px; margin:5px; background:#111; border-radius:10px;">
        <p>🔁 ${user.email} ↔ ${other.email}</p>
        <div style="margin:10px 0; text-align:left; color:#d1d5db;">
            <p><b>Offers:</b> ${formatSkillList(other.skills)}</p>
            <p><b>Wants:</b> ${formatSkillList(other.learn)}</p>
            <p style="margin-top:8px; color:#a5f3fc;">${offerText} ${offerText && wantText ? ' | ' : ''}${wantText}</p>
        </div>
        <button onclick="viewProfile('${other.email}')">
            View ${other.email} Profile
        </button>
    </div>
`;
        });
    }

    if(exactMatches.length === 0 && partialMatches.length === 0){
        matchList.innerHTML = "No matches found ❌";
    }
}

function getMatchesForUser(user){
    if(!user || !Array.isArray(user.skills) || !Array.isArray(user.learn)) return [];

    const userSkills = user.skills.map(s => String(s).toLowerCase());
    const userLearn = user.learn.map(s => String(s).toLowerCase());
    let users = JSON.parse(localStorage.getItem("users")) || [];

    return users.filter(other => {
        if(other.email === user.email) return false;
        if(!Array.isArray(other.skills) || !Array.isArray(other.learn)) return false;

        const otherSkills = other.skills.map(s => String(s).toLowerCase());
        const otherLearn = other.learn.map(s => String(s).toLowerCase());

        return otherSkills.length && otherLearn.length &&
            arraysEqualAsSets(otherSkills, userLearn) &&
            arraysEqualAsSets(otherLearn, userSkills);
    });
}

function arraysEqualAsSets(a, b){
    const setA = [...new Set(a.map(x => String(x).trim()))].sort();
    const setB = [...new Set(b.map(x => String(x).trim()))].sort();
    if(setA.length !== setB.length) return false;
    return setA.every((value, index) => value === setB[index]);
}

function getChatId(email1, email2){
    return [email1, email2].sort().join("__");
}

function loadChatMatches(){
    let list = document.getElementById("chatPartnerList");
    let partners = getMatchesForUser(currentUser);
    let chatArea = document.getElementById("chatArea");
    chatArea.style.display = "none";

    if(partners.length === 0){
        list.innerHTML = "No matched users available for chat.";
        return;
    }

    list.innerHTML = partners.map(p => {
        const unreadCount = unreadMessages[p.email];
        const badge = unreadCount ? `<span class="chat-badge" style="display:inline-block;background:#25d366;color:white;border-radius:50%;width:24px;height:24px;text-align:center;line-height:24px;font-size:12px;font-weight:bold;margin-left:10px;">${unreadCount > 99 ? '99+' : unreadCount}</span>` : '';
        
        return `
        <div style="margin:6px 0;">
            <button style="width:100%; max-width:720px; text-align:left; display:flex; align-items:center; justify-content:space-between;" onclick="selectChatPartner('${p.email}')">
                <span>${p.email} — Offers: ${formatSkillList(p.skills)} | Wants: ${formatSkillList(p.learn)}</span>
                ${badge}
            </button>
        </div>
    `;
    }).join('');
    
    // Update navbar badge
    updateChatNavBadge();
}

let chatPartnerEmail = null;

function selectChatPartner(email){
    chatPartnerEmail = email;
    document.getElementById("chatArea").style.display = "block";
    document.getElementById("chatTitle").innerText = `Chat with ${email}`;
    clearUnreadMessages(email);  // Mark as read when opening chat
    renderChat();
}

function renderChat(){
    let box = document.getElementById("chatBox");
    if(!chatPartnerEmail || !currentUser) return;

    let chatId = getChatId(currentUser.email, chatPartnerEmail);
    let chats = JSON.parse(localStorage.getItem("chats")) || {};
    let messages = chats[chatId] || [];

    // Deduplicate messages by `id` (fallback to composite key)
    const seen = new Set();
    const cleaned = [];
    for (const msg of messages) {
        const key = msg.id || `${msg.from}__${msg.to}__${msg.time}__${msg.text}`;
        if (seen.has(key)) continue;
        seen.add(key);
        cleaned.push(msg);
    }

    // If duplicates were removed, persist the cleaned array
    if (cleaned.length !== messages.length) {
        chats[chatId] = cleaned;
        localStorage.setItem("chats", JSON.stringify(chats));
        messages = cleaned;
    }

    if(messages.length === 0){
        box.innerHTML = "<p style='color:#c7c5cd;'>No messages yet. Start the conversation.</p>";
        return;
    }

    box.innerHTML = messages.map(msg => `
        <div style="margin-bottom:10px; text-align:${msg.from === currentUser.email ? 'right' : 'left'};">
            <div style="display:inline-block; background:${msg.from === currentUser.email ? '#5b34a3' : '#0b0618'}; padding:10px; border-radius:10px; max-width:80%; text-align:left; color:#fff;">
                <small style="color:#bbb;">${msg.from === currentUser.email ? 'You' : msg.from}</small><br>
                ${msg.text}
            </div>
        </div>
    `).join('');
    box.scrollTop = box.scrollHeight;
}

function sendMessage(){
    let input = document.getElementById("chatInput");
    let text = input.value.trim();
    if(!text) return;
    if(!chatPartnerEmail || !currentUser) return;

    let chatId = getChatId(currentUser.email, chatPartnerEmail);
    let chats = JSON.parse(localStorage.getItem("chats")) || {};
    chats[chatId] = chats[chatId] || [];
    
    const messageData = {
        from: currentUser.email,
        to: chatPartnerEmail,
        text,
        time: new Date().toISOString()
    };

    
    chats[chatId].push(messageData);
    localStorage.setItem("chats", JSON.stringify(chats));
    
    // Send message via Socket.io for real-time notification
    if(socket) {
        socket.emit('send_message', messageData);
    }
    
    input.value = "";
    renderChat();
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

        // Earn coins based on seconds
        if(seconds % 3600 === 0){
            addCoins(1);  // 2 coins every 5 seconds
        }

        if(seconds % 86400 === 0){
            addCoins(5);  // 10-coin bonus every 30 seconds
            alert("🔥 Bonus Coins Earned!");
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

// ========== VIDEO INITIALIZATION WITH PERMISSION HANDLING ==========
let mediaStream = null;

function initializeVideo(){
    const videoElement = document.getElementById("localVideo");
    const videoStatus = document.getElementById("videoStatus");
    const videoContainer = document.getElementById("videoContainer");

    if(!videoElement){
        alert("Video element not found");
        return;
    }

    // Request camera and mic permissions
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            mediaStream = stream;
            
            // Display the video stream
            videoElement.srcObject = stream;
            videoElement.play();
            
            // Show video container and status
            videoContainer.style.display = "block";
            videoStatus.innerText = "✅ Camera access granted";
            videoStatus.style.color = "#4ade80";
            
            // Start the session (coins will accumulate)
            startSession();
            
            console.log("✅ Video stream initialized");
        })
        .catch(error => {
            console.error("❌ Permission denied or error:", error);
            videoStatus.innerText = "❌ Camera access denied";
            videoStatus.style.color = "#ef4444";
            videoStatus.style.display = "block";
            
            // Show alert to user
            alert("❌ Please enable camera access to use video teaching.\n\nYou can try 'Start Teaching (Audio Only)' instead.");
        });
}

function stopVideoSession(){
    // Stop all tracks in the media stream
    if(mediaStream){
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
    }
    
    // Hide video container
    const videoContainer = document.getElementById("videoContainer");
    if(videoContainer){
        videoContainer.style.display = "none";
    }
    
    // Also stop any audio session resources
    stopAudioSession();

    // Stop the session timer and reset
    stopSession();
}

// ========== AUDIO SESSION + TRANSCRIPTION ===========
let mediaAudioStream = null;
let recognition = null;
let audioAnalyser = null;
let audioAnimationId = null;
let isAudioSessionActive = false;

function startAudioSession(){
    const audioEl = document.getElementById("localAudio");
    const transcriptEl = document.getElementById("transcript");
    const statusEl = document.getElementById("audioStatus");
    const meterCanvas = document.getElementById("audioMeter");

    if(statusEl) statusEl.innerText = 'Requesting microphone access...';
    if(transcriptEl) transcriptEl.innerText = 'Waiting for audio...';

    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
        alert("Audio capture not supported in this browser.");
        if(statusEl) statusEl.innerText = 'Audio capture not supported.';
        return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaAudioStream = stream;
            isAudioSessionActive = true;

            if(audioEl){
                audioEl.srcObject = stream;
                audioEl.style.display = "none";
            }

            if(statusEl) statusEl.innerText = '🎙️ Audio session active. Listening...';

            // Setup analyser for audio pumping / meter
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaStreamSource(stream);
            audioAnalyser = audioContext.createAnalyser();
            audioAnalyser.fftSize = 256;
            source.connect(audioAnalyser);
            drawAudioMeter(meterCanvas, audioAnalyser);

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if(SpeechRecognition){
                recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'en-US';

                let finalTranscript = '';
                recognition.onstart = () => {
                    if(statusEl) statusEl.innerText = '🎙️ Captions active. Speak now.';
                };
                recognition.onresult = (event) => {
                    let interim = '';
                    for(let i = event.resultIndex; i < event.results.length; ++i){
                        const res = event.results[i];
                        if(res.isFinal){
                            finalTranscript += res[0].transcript + '\n';
                        } else {
                            interim += res[0].transcript;
                        }
                    }
                    if(transcriptEl) transcriptEl.innerText = finalTranscript + interim;
                };

                    recognition.onerror = (e) => {
                    console.error('Speech recognition error', e);
                    const errName = (e && e.error) ? e.error : (e && e.message) ? e.message : 'unknown';
                    if(statusEl) statusEl.innerText = `Speech recognition error: ${errName}`;
                    if(transcriptEl) transcriptEl.innerText = `Speech recognition error: ${errName}`;
                    const ccSupport = document.getElementById('ccSupport');
                    if(ccSupport){
                        ccSupport.innerHTML = `Error: <b>${errName}</b>. Make sure microphone permission is allowed and use Chrome/Edge on localhost/HTTPS.`;
                    }
                };

                recognition.onend = () => {
                    if(isAudioSessionActive){
                        try {
                            recognition.start();
                        } catch(e){
                            console.error('Restart recognition failed', e);
                        }
                    }
                };

                recognition.start();
            } else {
                if(transcriptEl) transcriptEl.innerText = 'Transcription not supported in this browser or HTTPS context.';
                if(statusEl) statusEl.innerText = 'Captions unavailable.';
                const ccSupport = document.getElementById('ccSupport');
                if(ccSupport){
                    ccSupport.innerHTML = 'Your browser does not support Live Captions (SpeechRecognition). For best results use Chrome or Edge on <b>localhost</b> or an <b>HTTPS</b> page.';
                }
            }

            startSession();
        })
        .catch(err => {
            console.error('Audio permission denied or error', err);
            alert('Please allow microphone access to start audio session.');
            if(statusEl) statusEl.innerText = 'Microphone access denied.';
            if(transcriptEl) transcriptEl.innerText = '';
        });
}

function drawAudioMeter(canvas, analyser){
    if(!canvas || !analyser) return;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    function draw(){
        audioAnimationId = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
        ctx.fillStyle = '#111827';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#82aaff';
        ctx.beginPath();
        const sliceWidth = canvas.width * 1.0 / bufferLength;
        let x = 0;
        for(let i = 0; i < bufferLength; i++){
            const v = dataArray[i] / 128.0;
            const y = (v * canvas.height) / 2;
            if(i === 0){
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            x += sliceWidth;
        }
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
    }
    draw();
}

function stopAudioSession(){
    isAudioSessionActive = false;
    try{
        if(recognition){
            recognition.onresult = null;
            recognition.onerror = null;
            recognition.onend = null;
            try{ recognition.stop(); } catch(e){}
            recognition = null;
        }
    } catch(e){ }

    if(mediaAudioStream){
        mediaAudioStream.getTracks().forEach(t => t.stop());
        mediaAudioStream = null;
    }

    if(audioAnimationId){
        cancelAnimationFrame(audioAnimationId);
        audioAnimationId = null;
    }
    if(audioAnalyser){
        audioAnalyser = null;
    }

    const transcriptEl = document.getElementById("transcript");
    const statusEl = document.getElementById("audioStatus");
    const meterCanvas = document.getElementById("audioMeter");
    if(transcriptEl) transcriptEl.innerText = '';
    if(statusEl) statusEl.innerText = 'Audio session stopped.';
    if(meterCanvas){
        const ctx = meterCanvas.getContext('2d');
        ctx.fillStyle = '#111827';
        ctx.fillRect(0, 0, meterCanvas.width, meterCanvas.height);
    }
}

// ========== SESSION REQUEST SYSTEM ==========
let sessionRequests = {};  // Store incoming requests: { userEmail: [{ from, skill, sessionType, timestamp }] }

function showSessionRequestPopup(sessionType){
    // Load incoming requests first
    loadIncomingRequests();
    
    if(!currentUser || !currentUser.email){
        alert("Please log in first");
        return;
    }

    if(!currentUser.skills || currentUser.skills.length === 0){
        alert("Please add your teaching skills first");
        return;
    }

    // Get all users and find who wants to learn from current user
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUserData = users.find(u => u.email === currentUser.email);

    if(!currentUserData || !currentUserData.skills || currentUserData.skills.length === 0){
        alert("❌ Please add skills you can teach first");
        return;
    }

    let availableUsers = [];

    // Find users who want to learn any of current user's skills
    users.forEach(otherUser => {
        if(otherUser.email === currentUser.email) return;
        
        const userSkills = (currentUserData.skills || []).map(s => String(s).toLowerCase());
        const otherLearn = (otherUser.learn || []).map(s => String(s).toLowerCase());

        // Check if there's any skill overlap
        userSkills.forEach(skill => {
            if(otherLearn.includes(skill)){
                if(!availableUsers.find(u => u.email === otherUser.email)){
                    availableUsers.push(otherUser);
                }
            }
        });
    });

    // If no available users, show alert and don't open popup
    if(availableUsers.length === 0){
        alert("❌ No users available to learn your skills right now.\n\nTry again later when other users join!");
        return;
    }

    // Open popup only if users are available
    const popup = document.getElementById("sessionRequestPopup");
    const overlay = document.getElementById("popupOverlay");
    const container = document.getElementById("requestContainer");

    let html = `<div style="margin-bottom:20px;">`;
    html += `<p style="margin-bottom:15px;"><b>📚 Select a user to teach:</b></p>`;
    
    availableUsers.forEach(user => {
        const userLearnSkills = (user.learn || []).map(s => s.toUpperCase()).join(", ");
        html += `
            <div style="background:#2a2a3e; border:1px solid #7c3aed; border-radius:8px; padding:12px; margin:10px 0; display:flex; justify-content:space-between; align-items:center;">
                <div style="flex:1;">
                    <p style="margin:0; color:#fff; font-weight:bold;">${user.email}</p>
                    <p style="margin:5px 0 0 0; font-size:12px; color:#b0b0cc;">Wants: ${userLearnSkills}</p>
                </div>
                <button onclick="sendSessionRequest('${user.email}', '${sessionType}')" style="background:#7c3aed; color:white; border:none; padding:8px 15px; border-radius:5px; cursor:pointer; font-weight:bold;">Start</button>
            </div>
        `;
    });

    // Show your skills for reference
    html += `<hr style="border:1px solid #444; margin:20px 0;">`;
    html += `<p style="font-size:12px; color:#888;"><b>Your Teaching Skills:</b></p>`;
    html += `<p style="color:#4ade80; margin-top:5px;">${formatSkillList(currentUserData.skills)}</p>`;

    container.innerHTML = html;
    popup.style.display = "block";
    overlay.style.display = "block";
}

function closeSessionPopup(){
    document.getElementById("sessionRequestPopup").style.display = "none";
    document.getElementById("popupOverlay").style.display = "none";
}

function sendSessionRequest(toUserEmail, sessionType){
    if(!currentUser || !currentUser.email){
        alert("User not found");
        return;
    }
    
    // Send the call request using the new notification system
    let skill = (currentUser.skills && currentUser.skills.length > 0) ? currentUser.skills[0] : "Teaching";
    const request = sendCallRequest(toUserEmail, sessionType, skill);

    if(request){
        startPollingForRequestResponse(request.id, sessionType);
        alert(`✅ ${sessionType === 'video' ? 'Video call' : 'Audio call'} request sent to ${toUserEmail}!\n\nThey will receive a notification to accept or reject your request.`);
    } else {
        alert('❌ Unable to send the request. Please try again.');
    }
    closeSessionPopup();
}

// Poll localStorage for request status changes so requester can auto-start when accepted
function startPollingForRequestResponse(requestId, sessionType){
    const pollKey = "poll_" + requestId;
    // avoid duplicate polls
    if(window[pollKey]) return;

    window[pollKey] = setInterval(()=>{
        let allRequests = JSON.parse(localStorage.getItem("callRequests")) || [];
        const mine = allRequests.find(r => r.id === requestId && r.requesterEmail === currentUser.email);

        if(mine){
            if(mine.status === "accepted"){
                clearInterval(window[pollKey]);
                window[pollKey] = null;
                alert(`✅ Your session request was accepted by ${mine.recipientEmail}. Starting ${sessionType} session now.`);
                // start a shared session record so both sides can monitor end
                startLocalSession(mine.id, sessionType, mine);
                showSection('session');
                if(sessionType === "video"){
                    initializeVideo();
                } else {
                    startAudioSession();
                }
            } else if(mine.status === "rejected"){
                clearInterval(window[pollKey]);
                window[pollKey] = null;
                alert(`❌ ${sessionType === 'video' ? 'Video call' : 'Audio call'} request was rejected by ${mine.recipientEmail}.`);
            }
        }
    }, 2000);
}


// ---------------- Session tracking (shared) ----------------
let currentSessionId = null;

function startLocalSession(sessionId, type, requestObj){
    if(!sessionId) return;
    currentSessionId = sessionId;
    const key = 'session_' + sessionId;
    const sessionData = {
        status: 'active',
        requesterEmail: requestObj.requesterEmail || requestObj.requesterEmail,
        recipientEmail: requestObj.recipientEmail || requestObj.recipientEmail,
        type: type,
        startedAt: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(sessionData));
    monitorSessionEnd(sessionId);
}

function monitorSessionEnd(sessionId){
    const key = 'session_' + sessionId;
    const pollKey = 'session_poll_' + sessionId;
    if(window[pollKey]) return;
    window[pollKey] = setInterval(()=>{
        const s = JSON.parse(localStorage.getItem(key));
        if(!s) return;
        if(s.status === 'ended'){
            clearInterval(window[pollKey]);
            window[pollKey] = null;
            // Stop local media if this client is part of the session
            if(currentSessionId === sessionId){
                try{ stopVideoSession(); }catch(e){}
                try{ stopAudioSession(); }catch(e){}
                currentSessionId = null;
            }
        }
    }, 1000);
}

function endCurrentSession(){
    if(!currentSessionId){
        alert('No active session to end.');
        return;
    }
    const key = 'session_' + currentSessionId;
    const s = JSON.parse(localStorage.getItem(key)) || {};
    s.status = 'ended';
    s.endedAt = Date.now();
    localStorage.setItem(key, JSON.stringify(s));

    // also update callRequests record if available
    let allRequests = JSON.parse(localStorage.getItem('callRequests')) || [];
    allRequests = allRequests.map(r => {
        if(r.id === currentSessionId){
            r.status = 'ended';
            r.responded = true;
        }
        return r;
    });
    localStorage.setItem('callRequests', JSON.stringify(allRequests));

    // stop local media
    try{ stopVideoSession(); }catch(e){}
    try{ stopAudioSession(); }catch(e){}
    currentSessionId = null;
}

function loadIncomingRequests(){
    if(!currentUser || !currentUser.email) return;
    
    let requests = JSON.parse(localStorage.getItem("sessionRequests")) || {};
    let myRequests = requests[currentUser.email] || [];

    // Check for pending requests
    myRequests.forEach((req, index) => {
        if(req.status === "pending"){
            showIncomingRequestAlert(req, index);
        }
    });
}

function showIncomingRequestAlert(request, index){
    const message = `📞 Teaching request from ${request.from}!\n\nDo you want to accept and start a ${request.sessionType} session?`;
    
    if(confirm(message)){
        // Accept request
        acceptSessionRequest(request.from, index);
    } else {
        // Reject request
        rejectSessionRequest(request.from, index);
    }
}

function acceptSessionRequest(fromUserEmail, index){
    let requests = JSON.parse(localStorage.getItem("sessionRequests")) || {};
    let myRequests = requests[currentUser.email] || [];
    
    if(myRequests[index]){
        // Mark this recipient copy accepted
        myRequests[index].status = "accepted";
        const acceptedReq = myRequests[index];
        requests[currentUser.email] = myRequests;

        // Mirror acceptance to sender's copy (so requester can detect it)
        const senderList = requests[acceptedReq.from] || [];
        const senderReq = senderList.find(r => r.id === acceptedReq.id);
        if(senderReq){
            senderReq.status = "accepted";
        }

        localStorage.setItem("sessionRequests", JSON.stringify(requests));

        // Close popup automatically
        closeSessionPopup();

        const sessionType = acceptedReq.sessionType;
        alert(`✅ Request accepted! Starting ${sessionType} session with ${fromUserEmail}`);

        // Start session for the acceptor (recipient)
        if(sessionType === "video"){
            initializeVideo();
        } else {
            startAudioSession();
        }
    }
}

function rejectSessionRequest(fromUserEmail, index){
    let requests = JSON.parse(localStorage.getItem("sessionRequests")) || {};
    let myRequests = requests[currentUser.email] || [];
    
    if(myRequests[index]){
        // Mark recipient copy rejected
        myRequests[index].status = "rejected";
        const rejectedReq = myRequests[index];
        requests[currentUser.email] = myRequests;

        // Mirror rejection to sender's copy
        const senderList = requests[rejectedReq.from] || [];
        const senderReq = senderList.find(r => r.id === rejectedReq.id);
        if(senderReq){
            senderReq.status = "rejected";
        }

        localStorage.setItem("sessionRequests", JSON.stringify(requests));

        alert(`❌ Request rejected from ${fromUserEmail}`);
    }
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

function getFilterValue(id){
    return (document.getElementById(id)?.value || "").trim().toLowerCase();
}

function loadUsers(){
    let list = document.getElementById("userList");
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const filterState = getFilterValue("filterState");
    const filterCity = getFilterValue("filterCity");
    const filterOffer = getFilterValue("filterOffer");
    const filterWant = getFilterValue("filterWant");
    const filterDegree = getFilterValue("filterDegree");

    const filteredUsers = users.filter(u => {
        if(filterState && !(u.state || "").toLowerCase().includes(filterState)) return false;
        if(filterCity && !(u.city || "").toLowerCase().includes(filterCity)) return false;
        if(filterDegree && !(u.degree || "").toLowerCase().includes(filterDegree)) return false;

        if(filterOffer){
            const offers = (u.skills || []).map(s => String(s || "").toLowerCase());
            if(!offers.some(skill => skill.includes(filterOffer))) return false;
        }

        if(filterWant){
            const wants = (u.learn || []).map(s => String(s || "").toLowerCase());
            if(!wants.some(skill => skill.includes(filterWant))) return false;
        }

        return true;
    });

    list.innerHTML = "";

    if(filteredUsers.length === 0){
        list.innerHTML = "No users found ❌";
        return;
    }

    filteredUsers.forEach(u=>{
        list.innerHTML += `
            <div style="border:1px solid #ccc; padding:10px; margin:5px; background:#110a27; border-radius:12px;">
                <b style="font-size:15px;">${u.email}</b><br>
                <small><b>City:</b> ${u.city || '-'} | <b>State:</b> ${u.state || '-'}</small><br>
                <small><b>Degree:</b> ${u.degree || '-'}</b></small><br>
                <div style="margin-top:8px;"><b>Offers:</b> ${formatSkillList(u.skills)}</div>
                <div><b>Wants:</b> ${formatSkillList(u.learn)}</div>
            </div>
        `;
    });
}

function clearUserFilters(){
    ['filterState','filterCity','filterOffer','filterWant','filterDegree'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.value = "";
    });
    loadUsers();
}
function addSkill(){
    let skill = document.getElementById("skill").value.trim().toUpperCase();

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
    let learn = document.getElementById("learn").value.trim().toUpperCase();

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

// Add automatic uppercase normalization for the skill inputs (offer & learn)
document.addEventListener('DOMContentLoaded', () => {
    ['skill','learn'].forEach(id => {
        const el = document.getElementById(id);
        if(!el) return;
        el.addEventListener('input', () => {
            const start = el.selectionStart;
            const end = el.selectionEnd;
            el.value = el.value.toUpperCase();
            try { el.setSelectionRange(start, end); } catch(e) { }
        });
    });
    
    // Initialize navbar badge for unread messages
    if(window.location.pathname.includes("dashboard.html")) {
        setTimeout(() => {
            updateChatNavBadge();
        }, 500);
    }
});

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

    if(document.getElementById("dashboardNav")){
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

        // Attach Enter key handler for chat input: Enter sends message, Shift+Enter inserts newline
        const chatInputEl = document.getElementById("chatInput");
        if(chatInputEl){
            chatInputEl.addEventListener('keydown', function(e){
                if(e.key === 'Enter' && !e.shiftKey){
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
    }
};

// Setup Enter-key handling for login/register page
document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');

    if(!authForm || !registerBtn || !loginBtn) return;

    authAction = 'login';
    registerBtn.addEventListener('click', () => {
        authAction = 'register';
        register();
    });
    loginBtn.addEventListener('click', () => {
        authAction = 'login';
        login();
    });

    authForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if(authAction === 'register'){
            register();
        } else {
            login();
        }
    });
});

function showSection(id){
    if(!isProfileComplete() && id !== 'profile'){
        alert('Please complete your profile first to access Skills, Matches, Chat, and Session.');
        id = 'profile';
    }
    let sections = document.querySelectorAll(".section");
    sections.forEach(sec => sec.style.display = "none");
    document.getElementById(id).style.display = "block";

    if(id === 'chat'){
        loadChatMatches();
        // Clear unread badge from chat button
        const chatBtn = document.querySelector('#dashboardNav button[data-section="chat"]');
        if(chatBtn) {
            const badge = chatBtn.querySelector('.nav-badge');
            if(badge) badge.remove();
        }
    }
    
    // Update navbar button styling
    document.querySelectorAll("#dashboardNav button").forEach(btn => {
        if(btn.getAttribute("data-section") === id){
            btn.style.background = "#7c3aed";
            btn.style.color = "#fff";
        } else {
            btn.style.background = "";
            btn.style.color = "";
        }
    });
}
function saveProfile(){
    let name = document.getElementById("name").value.trim();
    let contact = document.getElementById("contact").value.trim();
    let country = document.getElementById("country").value;
    let state = document.getElementById("state").value;
    let degree = document.getElementById("degree").value.trim();
    let city = document.getElementById("city").value.trim();

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
            u.city = city;

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
    document.getElementById("city").value = currentUser.city || "";
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
        <p><b>City:</b> ${currentUser.city || "-"}</p>
    `;
}

function formatSkillList(skills){
    return (skills || []).map(s => String(s || "").toLowerCase()).join(", ");
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

            <p><b>Skills:</b> ${formatSkillList(user.skills)}</p>
            <p><b>Wants:</b> ${formatSkillList(user.learn)}</p>
        </div>
    `;
}

// ================= INCOMING CALL/AUDIO REQUEST SYSTEM =================

let incomingRequestTimeout = null;
let incomingRequestTimerInterval = null;
let incomingRequestPopupVisible = false;
let currentRequestData = null;

// Check for incoming requests periodically
function checkIncomingRequests(){
    if(!currentUser || incomingRequestPopupVisible) return;
    
    let allRequests = JSON.parse(localStorage.getItem("callRequests")) || [];
    
    // Filter requests for current user that haven't been responded to yet
    let pendingRequests = allRequests.filter(req => 
        req.recipientEmail === currentUser.email && 
        !req.responded &&
        (Date.now() - req.timestamp) < 30000 // Only show requests less than 30 seconds old
    );
    
    if(pendingRequests.length > 0){
        let request = pendingRequests[0]; // Show the first pending request
        currentRequestData = request;
        showIncomingRequestPopup(request);
    }
}

// Show incoming request popup
function showIncomingRequestPopup(request){
    let popup = document.getElementById("incomingRequestPopup");
    let overlay = document.getElementById("incomingRequestOverlay");
    
    if(!popup || !overlay) return;
    
    incomingRequestPopupVisible = true;
    
    // Update popup with request details
    document.getElementById("requesterName").innerHTML = `📩 From: <strong>${request.requesterName || request.requesterEmail}</strong>`;
    document.getElementById("requestType").innerText = request.type === 'video' ? 'Video Call' : 'Audio Call';
    document.getElementById("requestSkill").innerText = request.skill || 'General Teaching';
    document.getElementById("requestTime").innerText = new Date(request.timestamp).toLocaleTimeString();
    
    // Reset timer text and show popup
    let timer = document.getElementById("autoCloseTimer");
    if(timer) timer.innerText = '30';
    popup.style.display = 'block';
    overlay.style.display = 'block';
    
    // Play notification sound (if available)
    playNotificationSound();
    
    // Auto-close after 30 seconds
    if(incomingRequestTimeout) clearTimeout(incomingRequestTimeout);
    if(incomingRequestTimerInterval) clearInterval(incomingRequestTimerInterval);
    
    let timeLeft = 30;
    incomingRequestTimerInterval = setInterval(() => {
        timeLeft--;
        let timer = document.getElementById("autoCloseTimer");
        if(timer) timer.innerText = timeLeft;
        
        if(timeLeft <= 0){
            clearInterval(incomingRequestTimerInterval);
            incomingRequestTimerInterval = null;
            rejectCallRequest();
        }
    }, 1000);
    
    incomingRequestTimeout = setTimeout(() => {
        rejectCallRequest();
    }, 30000);
}

// Hide the popup
function hideIncomingRequestPopup(){
    let popup = document.getElementById("incomingRequestPopup");
    let overlay = document.getElementById("incomingRequestOverlay");
    
    if(popup) popup.style.display = 'none';
    if(overlay) overlay.style.display = 'none';
    
    if(incomingRequestTimeout){
        clearTimeout(incomingRequestTimeout);
        incomingRequestTimeout = null;
    }
    if(incomingRequestTimerInterval){
        clearInterval(incomingRequestTimerInterval);
        incomingRequestTimerInterval = null;
    }
    incomingRequestPopupVisible = false;
    currentRequestData = null;
}

// Play notification sound
function playNotificationSound(){
    // Create a simple beep sound using Web Audio API
    try {
        let audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let oscillator = audioContext.createOscillator();
        let gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch(e) {
        console.log("Notification sound not available");
    }
}

// Accept call request
function acceptCallRequest(){
    if(!currentRequestData) return;
    const request = currentRequestData;

    // Mark request as responded
    let allRequests = JSON.parse(localStorage.getItem("callRequests")) || [];
    allRequests = allRequests.map(req => {
        if(req.id === request.id){
            req.responded = true;
            req.status = 'accepted';
        }
        return req;
    });
    localStorage.setItem("callRequests", JSON.stringify(allRequests));

    hideIncomingRequestPopup();

    // Show success message
    alert(`✅ Call accepted from ${request.requesterName || request.requesterEmail}!\n\nStarting ${request.type} session...`);

    // Navigate to session section
    // create a shared session record and monitor for end
    startLocalSession(request.id, request.type, request);
    showSection('session');

    // Start the session (video or audio)
    if(request.type === 'video'){
        initializeVideo();
    } else {
        startAudioSession();
    }
}

// Reject call request
function rejectCallRequest(){
    if(!currentRequestData) return;
    
    let requesterEmail = currentRequestData.requesterEmail;
    
    // Mark request as responded
    let allRequests = JSON.parse(localStorage.getItem("callRequests")) || [];
    allRequests = allRequests.map(req => {
        if(req.id === currentRequestData.id){
            req.responded = true;
            req.status = 'rejected';
        }
        return req;
    });
    localStorage.setItem("callRequests", JSON.stringify(allRequests));
    
    hideIncomingRequestPopup();
    
    console.log(`Call request from ${requesterEmail} was rejected`);
}

// Send call request to another user
function sendCallRequest(recipientEmail, type, skill){
    if(!currentUser || !recipientEmail) return null;
    
    let allRequests = JSON.parse(localStorage.getItem("callRequests")) || [];
    
    let request = {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        requesterEmail: currentUser.email,
        requesterName: currentUser.name || currentUser.email,
        recipientEmail: recipientEmail,
        type: type, // 'video' or 'audio'
        skill: skill || '',
        timestamp: Date.now(),
        responded: false,
        status: 'pending'
    };
    
    allRequests.push(request);
    localStorage.setItem("callRequests", JSON.stringify(allRequests));
    
    console.log(`Call request sent to ${recipientEmail} for ${type} session`);
    return request;
}

// Initialize request checking when dashboard loads
function initializeRequestNotifications(){
    if(!currentUser) return;
    
    // Check for incoming requests every 1 second
    setInterval(checkIncomingRequests, 1000);
    
    console.log("✅ Request notifications initialized for " + currentUser.email);
}

// Start checking when page loads
if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initializeRequestNotifications);
} else {
    initializeRequestNotifications();
}