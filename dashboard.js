const users = document.querySelector("#users");
const shop = document.querySelector("#shop");
const Settings = document.querySelector("#Settings")
const cards_section = document.querySelector(".cards");
const shop_section = document.querySelector(".shoppingcart");
const searchinput = document.querySelector("#search");

let allusers = [];
let portalcart = [];
let activelink = null;

// Fetch GitHub Users
// const alllinks = document.querySelector("#users","#shop")
// alllinks.forEach((link) => {
//     link.addEventListener("click",()=>{
//         if (link.innerText==="users"){
//             fetchUsers()
//             activelink="users"
//         }
//         else if (link.innerText==="shop"){
//             fetchShop()
//             activelink="shop"
//         }
//         else if(link.innerText==="Settings"){
//             alert("You clicked on settings link")
//         }
//         else{
//             alert("You clicked unknown option")
//         }

//     })
// }); 
const fetchUsers = async () => {
  const response = await fetch("https://api.github.com/users");
  const result = await response.json();
  allusers = result;
  displayUsers(allusers);
};

// Display GitHub Users
function displayUsers(usersList) {
  cards_section.replaceChildren();
  showDashboardHeading("👥 Welcome to Users Dashboard");
  if (usersList.length === 0) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>No data found</h3>`;
    cards_section.appendChild(card);
  } else {
    usersList.forEach((user) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}">
        <h3>${user.login}</h3>
      `;
      cards_section.appendChild(card);
    });
  }
}

// Fetch Fake Store Products
const fetchShop = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const result = await response.json();
  portalcart = result;
  displayCart(portalcart);
};

// Display Shop Products
function displayCart(cartList) {
  cards_section.replaceChildren(); // Using same section to display either users or products
  showDashboardHeading("🛒 Welcome to Shop Dashboard");
  if (cartList.length === 0) {
    const portal = document.createElement("div");
    portal.className = "portal";
    portal.innerHTML = `<h3>No data found</h3>`;
    cards_section.appendChild(portal);
  } else {
    cartList.forEach((product) => {
      const portal = document.createElement("div");
      portal.className = "portal";
      portal.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
      `;
      cards_section.appendChild(portal);
    });
  }
}
function displaySettings() {
  cards_section.replaceChildren();

  const settings = fetchSettings();

  const settingsDiv = document.createElement("div");
  settingsDiv.className = "settings";
  settingsDiv.innerHTML = `
    <h2>Settings</h2>
    <form id="settings-form">
      <label>Theme:
        <select name="theme">
          <option value="light" ${settings.theme === "light" ? "selected" : ""}>Light</option>
          <option value="dark" ${settings.theme === "dark" ? "selected" : ""}>Dark</option>
        </select>
      </label><br>
      <label>Language:
        <select name="language">
          <option value="en" ${settings.language === "en" ? "selected" : ""}>English</option>
          <option value="fr" ${settings.language === "fr" ? "selected" : ""}>French</option>
        </select>
      </label><br>
      <label>Notifications:
        <input type="checkbox" name="notifications" ${settings.notifications ? "checked" : ""}>
      </label><br>
      <button type="submit">Save Settings</button>
      <button type="button" id="resetBtn">Reset to Default</button>
    </form>
  `;
  cards_section.appendChild(settingsDiv);

  const form = document.querySelector("#settings-form");
  const resetBtn = document.querySelector("#resetBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const newSettings = {
      theme: formData.get("theme"),
      language: formData.get("language"),
      notifications: formData.get("notifications") === "on",
    };
    updateSettings(newSettings);
    alert("Settings updated!");
    displaySettings(); // re-render
  });

  resetBtn.addEventListener("click", () => {
    resetSettings();
    alert("Settings reset!");
    displaySettings(); // re-render
  });
  function displaySettings() {
  cards_section.replaceChildren();
  showDashboardHeading("⚙️ Welcome to Settings Dashboard");
  
}

}




// Event Listeners
users.addEventListener("click", () => {
  activelink = "users";
  fetchUsers();
});

shop.addEventListener("click", () => {
  activelink = "shop";
  fetchShop();
});
Settings.addEventListener("click", () => {
  activelink = "Settings";
  displaySettings();
});


// Unified Search Handler
searchinput.addEventListener("input", () => {
  const query = searchinput.value.toLowerCase();
  if (activelink === "users") {
    if (query === "") {
      displayUsers(allusers);
    } else {
      const filteredUsers = allusers.filter((user) =>
        user.login.toLowerCase().startsWith(query)
      );
      displayUsers(filteredUsers);
    }
  } else if (activelink === "shop") {
    if (query === "") {
      displayCart(portalcart);
    } else {
      const filteredCart = portalcart.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
      displayCart(filteredCart);
    }
  }
});

// ========== Settings API Simulation ========== //
const DEFAULT_SETTINGS = {
  theme: "light",
  language: "en",
  notifications: true,
};

// Simulate GET /api/settings
function fetchSettings() {
  const saved = localStorage.getItem("settings");
  return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
}

// Simulate PUT /api/settings
function updateSettings(newSettings) {
  localStorage.setItem("settings", JSON.stringify(newSettings));
  return newSettings;
}

// Simulate POST /api/settings/reset
function resetSettings() {
  localStorage.setItem("settings", JSON.stringify(DEFAULT_SETTINGS));
  return DEFAULT_SETTINGS;
}

function showDashboardHeading(text) {
  const heading = document.createElement("h2");
  heading.className = "dashboard-heading";
  heading.innerText = text;
  cards_section.appendChild(heading);
}


