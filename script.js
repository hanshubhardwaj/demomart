let total = 0;

function scrollToBooking(){
  document.getElementById("booking-section")
    .scrollIntoView({ behavior:"smooth" });
}

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
  }
  else{
    cart.removeChild(existingRow);
    total -= price;

    btn.innerText = "Add Item";
    btn.classList.remove("remove");
  }

  updateSerialNumbers();
  document.getElementById("total").innerText = total;
}
function updateSerialNumbers(){
  const rows = document.querySelectorAll("#cartItems tr");
  rows.forEach((row, index) => {
    row.children[0].innerText = index + 1;
  });
}
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
  ).then(()=>{

    alert("Booking successful!");

    document.getElementById("cartItems").innerHTML = "";
    document.getElementById("total").innerText = "0";
    total = 0;

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    document.querySelectorAll(".services-box button").forEach(btn=>{
      btn.innerText = "Add Item";
      btn.classList.remove("remove");
    });
  });
}
