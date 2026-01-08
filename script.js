let total = 0;

function showPopup(msg){
  document.getElementById("popupText").innerText = msg;
  document.getElementById("popup").style.display = "flex";
}

function closePopup(){
  document.getElementById("popup").style.display = "none";
}

/* ================= SCROLL ================= */
function scrollToBooking(){
  document.getElementById("booking-section")
    .scrollIntoView({ behavior:"smooth" });
}

/* ================= EMPTY CART MESSAGE ================= */
function toggleEmptyMessage(){
  const cart = document.getElementById("cartItems");
  const emptyRow = document.getElementById("emptyRow");

  if(cart.querySelectorAll("tr[data-item]").length === 0){
    emptyRow.style.display = "";
  } else {
    emptyRow.style.display = "none";
  }
}

/* ================= ADD / REMOVE ITEM ================= */
function toggleItem(btn, name, price){
  const cart = document.getElementById("cartItems");
  const existingRow = cart.querySelector(`tr[data-item="${name}"]`);

  if(!existingRow){
    const tr = document.createElement("tr");
    tr.setAttribute("data-item", name);
    tr.innerHTML = `
      <td></td>
      <td>${name}</td>
      <td>₹${price}</td>
    `;
    cart.appendChild(tr);

    total += price;
    btn.innerText = "Remove";
    btn.classList.add("remove");

    showToast(`${name} added to cart`);
  } else {
    cart.removeChild(existingRow);

    total -= price;
    if(total < 0) total = 0;

    btn.innerText = "Add Item";
    btn.classList.remove("remove");

    showToast(`${name} removed from cart`, "remove");
  }

  updateSerialNumbers();
  toggleEmptyMessage();
  document.getElementById("total").innerText = total;
}

/* ================= SERIAL NUMBER ================= */
function updateSerialNumbers(){
  const rows = document.querySelectorAll("#cartItems tr[data-item]");
  rows.forEach((row, index) => {
    row.children[0].innerText = index + 1;
  });
}

/* ================= SEND EMAIL ================= */
function sendEmail(){
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if(!name || !email || !phone || total === 0){
    alert("Please fill details and add services");
    return;
  }

  emailjs.send(
    "service_25k3exr",
    "template_a7vitxg",
    {
      name,
      email,
      phone,
      total: "₹" + total
    }
  ).then(() => {

    showToast("Booking successful!");

    /* RESET CART */
    document.getElementById("cartItems").innerHTML = `
      <tr id="emptyRow">
        <td colspan="3" style="text-align:center; color:#888;">
          No item added
        </td>
      </tr>
    `;
    total = 0;
    document.getElementById("total").innerText = "0";

    /* RESET FORM */
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    /* RESET BUTTONS */
    document.querySelectorAll(".services-box button").forEach(btn => {
      btn.innerText = "Add Item";
      btn.classList.remove("remove");
    });

    toggleEmptyMessage();
  });
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", toggleEmptyMessage);
