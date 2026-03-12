// Bảng giá sản phẩm
const prices = {
  ao_thun: 150000,
  quan_jean: 250000,
  giay_sneaker: 500000,
};

// Truy vấn DOM elements
const form = document.getElementById("orderForm");
const mainFormDiv = document.getElementById("mainForm");
const confirmModal = document.getElementById("confirmModal");
const displayTotal = document.getElementById("displayTotal");
const charCountSpan = document.getElementById("charCount");

// Hàm tiện ích hiển thị lỗi
const showError = (fieldId, message) => {
  const el = document.getElementById(fieldId);
  const errSpan = document.getElementById(`err-${fieldId}`);
  if (el) {
    el.classList.add("error");
    el.classList.remove("success");
  }
  errSpan.textContent = message;
  errSpan.style.display = "block";
  return 0; // false cho toán tử bitwise &
};

// Hàm tiện ích xóa lỗi
const clearError = (fieldId) => {
  const el = document.getElementById(fieldId);
  const errSpan = document.getElementById(`err-${fieldId}`);
  if (el) {
    el.classList.remove("error");
    el.classList.add("success");
  }
  errSpan.style.display = "none";
  return 1; // true
};

// --- VALIDATION FUNCTIONS ---
const valProduct = () => {
  const val = document.getElementById("product").value;
  if (!val) return showError("product", "Vui lòng chọn sản phẩm.");
  return clearError("product");
};

const valQty = () => {
  const val = parseInt(document.getElementById("quantity").value);
  if (isNaN(val) || val < 1 || val > 99)
    return showError("quantity", "Số lượng phải từ 1 đến 99.");
  return clearError("quantity");
};

const valDate = () => {
  const val = document.getElementById("deliveryDate").value;
  if (!val) return showError("deliveryDate", "Vui lòng chọn ngày giao hàng.");

  // Xử lý Date Object để so sánh timestamp
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Đưa về 0h hôm nay

  const inputDate = new Date(val);
  inputDate.setHours(0, 0, 0, 0);

  // Tính ngày tối đa (30 ngày sau hôm nay)
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 30);

  if (inputDate < today)
    return showError(
      "deliveryDate",
      "Ngày giao hàng không được ở trong quá khứ.",
    );
  if (inputDate > maxDate)
    return showError(
      "deliveryDate",
      "Ngày giao hàng không được quá 30 ngày từ hôm nay.",
    );
  return clearError("deliveryDate");
};

const valAddress = () => {
  const val = document.getElementById("address").value.trim();
  if (val.length < 10)
    return showError("address", "Địa chỉ phải ít nhất 10 ký tự.");
  return clearError("address");
};

const valNotes = () => {
  const val = document.getElementById("notes").value;
  if (val.length > 200)
    return showError("notes", "Ghi chú vượt quá 200 ký tự.");
  return clearError("notes");
};

const valPayment = () => {
  const checked = document.querySelector('input[name="payment"]:checked');
  if (!checked)
    return showError("payment", "Vui lòng chọn phương thức thanh toán.");
  return clearError("payment");
};

// --- TÍNH TỔNG TIỀN TỰ ĐỘNG ---
const calculateTotal = () => {
  const productKey = document.getElementById("product").value;
  const qty = parseInt(document.getElementById("quantity").value) || 0;

  if (productKey && qty > 0 && qty < 100) {
    const total = prices[productKey] * qty;
    // Định dạng số tiền kiểu VNĐ (vd: 150.000)
    displayTotal.textContent = total.toLocaleString("vi-VN") + " VNĐ";
  } else {
    displayTotal.textContent = "0 VNĐ";
  }
};

// --- GẮN SỰ KIỆN ---
// Validate khi rời khỏi ô
document.getElementById("product").onblur = valProduct;
document.getElementById("quantity").onblur = valQty;
document.getElementById("deliveryDate").onblur = valDate;
document.getElementById("address").onblur = valAddress;
document.getElementById("notes").onblur = valNotes;

// Xóa lỗi và tự tính tiền khi nhập/thay đổi
document.getElementById("product").onchange = () => {
  clearError("product");
  calculateTotal();
};
document.getElementById("quantity").oninput = () => {
  clearError("quantity");
  calculateTotal();
};
document.getElementById("deliveryDate").oninput = () =>
  clearError("deliveryDate");
document.getElementById("address").oninput = () => clearError("address");

// Đếm ký tự Ghi chú Realtime
document.getElementById("notes").oninput = function () {
  clearError("notes");
  const length = this.value.length;
  charCountSpan.textContent = `${length}/200`;

  if (length > 200) {
    charCountSpan.classList.add("exceeded");
    showError("notes", "Vượt quá số ký tự cho phép!");
  } else {
    charCountSpan.classList.remove("exceeded");
  }
};

// Xóa lỗi cho Payment Radio
document.querySelectorAll('input[name="payment"]').forEach((radio) => {
  radio.onchange = () => clearError("payment");
});

// --- SUBMIT FORM & MODAL ---
form.onsubmit = (e) => {
  e.preventDefault();

  const isFormValid =
    valProduct() &
    valQty() &
    valDate() &
    valAddress() &
    valNotes() &
    valPayment();

  if (isFormValid) {
    // Cập nhật thông tin lên Modal
    const productName =
      document.getElementById("product").options[
        document.getElementById("product").selectedIndex
      ].text;

    document.getElementById("sumProduct").textContent =
      productName.split(" (")[0]; // Chỉ lấy tên, bỏ giá trong ngoặc
    document.getElementById("sumQty").textContent =
      document.getElementById("quantity").value;
    document.getElementById("sumDate").textContent =
      document.getElementById("deliveryDate").value;
    document.getElementById("sumTotal").textContent = displayTotal.textContent;

    // Ẩn form, hiện modal
    mainFormDiv.style.display = "none";
    confirmModal.style.display = "block";
  }
};

// Nút Xác nhận trên Modal
document.getElementById("btnConfirm").onclick = () => {
  confirmModal.style.display = "none";
  document.getElementById("successMessage").style.display = "block";
};

// Nút Hủy trên Modal
document.getElementById("btnCancel").onclick = () => {
  confirmModal.style.display = "none";
  mainFormDiv.style.display = "block"; // Trở lại form
};
