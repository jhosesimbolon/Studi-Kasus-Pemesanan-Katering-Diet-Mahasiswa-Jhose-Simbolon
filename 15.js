const orderForm = document.getElementById("orderForm");
const customerName = document.getElementById("customerName");
const packageSelect = document.getElementById("package");
const daysInput = document.getElementById("days");
const formMessage = document.getElementById("formMessage");

const summaryPackage = document.getElementById("summaryPackage");
const summaryCalories = document.getElementById("summaryCalories");
const summaryDays = document.getElementById("summaryDays");
const summaryTotal = document.getElementById("summaryTotal");

const rupiah = (amount) => new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
}).format(amount);

function updateSummary() {
  const selectedOption = packageSelect.selectedOptions[0];
  const packageName = selectedOption.dataset.name;
  const calories = Number(selectedOption.dataset.calories);
  const pricePerDay = Number(selectedOption.dataset.price);
  const days = Number(daysInput.value) || 0;

  summaryPackage.textContent = packageName;
  summaryCalories.textContent = `${calories.toLocaleString("id-ID")} kkal`;
  summaryDays.textContent = `${days} hari`;
  summaryTotal.textContent = rupiah(pricePerDay * Math.max(days, 0));
}

packageSelect.addEventListener("change", updateSummary);
daysInput.addEventListener("input", updateSummary);

orderForm.addEventListener("submit", function (event) {
  event.preventDefault();
  formMessage.className = "form-message";
  formMessage.textContent = "";

  const name = customerName.value.trim();
  const days = Number(daysInput.value);

  if (!name) {
    formMessage.textContent = "Silakan isi nama mahasiswa terlebih dahulu.";
    formMessage.classList.add("error");
    customerName.focus();
    return;
  }

  // Sesuai studi kasus: minimal langganan 5 hari (Senin–Jumat).
  if (!Number.isInteger(days) || days < 5) {
    alert("Langganan katering minimal 5 hari (Senin–Jumat)!");
    formMessage.textContent = "Pesanan belum diproses. Jumlah hari minimal 5 hari.";
    formMessage.classList.add("error");
    daysInput.focus();
    return;
  }

  // Menu mingguan yang tersedia terdiri dari 5 hari.
  if (days > 5) {
    formMessage.textContent = "Menu mingguan tersedia untuk maksimal 5 hari (Senin–Jumat).";
    formMessage.classList.add("error");
    daysInput.focus();
    return;
  }

  const selectedOption = packageSelect.selectedOptions[0];
  const packageName = selectedOption.dataset.name;
  const total = Number(selectedOption.dataset.price) * days;

  formMessage.textContent = `Pesanan berhasil dibuat atas nama ${name}. ${packageName}, ${days} hari. Total: ${rupiah(total)}.`;
  formMessage.classList.add("success");
  alert("Pesanan berhasil dibuat! Periksa ringkasan pesanan di halaman.");
});

updateSummary();
