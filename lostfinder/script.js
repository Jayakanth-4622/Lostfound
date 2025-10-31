// Load saved items from localStorage
let foundItems = JSON.parse(localStorage.getItem("foundItems")) || [{
        name: "Brown Wallet",
        location: "Found near Chennai Central Station",
        image: "https://via.placeholder.com/200"
    },
    {
        name: "iPhone 12",
        location: "Found in Marina Beach",
        image: "https://via.placeholder.com/200"
    }
];

// Save to localStorage
function saveItems() {
    localStorage.setItem("foundItems", JSON.stringify(foundItems));
}

// Popup messages
function showPopup(message, type = "success") {
    const popup = document.getElementById("popupMessage");
    popup.textContent = message;
    popup.className = `popup ${type}`;
    popup.style.opacity = "1";
    setTimeout(() => (popup.style.opacity = "0"), 2000);
}

// Display all items
function displayItems() {
    const grid = document.getElementById("itemGrid");
    grid.innerHTML = "";

    foundItems.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "item-card";
        card.innerHTML = `
      <img src="${item.image || 'https://via.placeholder.com/200'}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.location}</p>
      <button onclick="deleteItem(${index})">Delete</button>
    `;
        grid.appendChild(card);
    });
}

// Delete item
function deleteItem(index) {
    foundItems.splice(index, 1);
    saveItems();
    displayItems();
    showPopup("❌ Item deleted!", "error");
}

// Add new item
document.getElementById("addItemForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("itemName").value;
    const location = document.getElementById("itemLocation").value;
    const fileInput = document.getElementById("itemImageFile");
    const file = fileInput.files[0];

    if (name && location) {
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                foundItems.push({ name, location, image: event.target.result });
                saveItems();
                displayItems();
                showPopup("✅ Item added successfully!", "success");
                document.getElementById("addItemForm").reset();
            };
            reader.readAsDataURL(file); // convert image to base64
        } else {
            foundItems.push({
                name,
                location,
                image: "https://via.placeholder.com/200"
            });
            saveItems();
            displayItems();
            showPopup("✅ Item added successfully!", "success");
            document.getElementById("addItemForm").reset();
        }
    }
});

// On page load
window.sonload = displayItems;