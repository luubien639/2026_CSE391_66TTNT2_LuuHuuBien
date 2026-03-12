const form = document.getElementById("registerForm");

// --- HÀM TIỆN ÍCH ---
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`err-${fieldId}`);
  field.classList.add("invalid");
  field.classList.remove("valid");
  errorSpan.innerText = message;
  errorSpan.style.display = "block";
  return 0; // Trả về 0 (false)
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorSpan = document.getElementById(`err-${fieldId}`);
  field.classList.remove("invalid");
  field.classList.add("valid");
  errorSpan.style.display = "none";
  return 1; // Trả về 1 (true)
}

// --- CÁC HÀM VALIDATE RIÊNG BIỆT ---
const validateFullname = () => {
  const val = document.getElementById("fullname").value.trim();
  const regex = /^[a-zA-ZÀ-ỹ\s]{3,}$/;
  if (!val) return showError("fullname", "Họ tên không được để trống");
  if (!regex.test(val))
    return showError("fullname", "Họ tên ít nhất 3 ký tự, không chứa số");
  return clearError("fullname");
};

const validateEmail = () => {
  const val = document.getElementById("email").value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!val) return showError("email", "Email không được để trống");
  if (!regex.test(val))
    return showError("email", "Định dạng email không hợp lệ");
  return clearError("email");
};

const validatePhone = () => {
  const val = document.getElementById("phone").value.trim();
  const regex = /^0[0-9]{9}$/;
  if (!regex.test(val))
    return showError("phone", "SĐT phải có 10 số và bắt đầu bằng số 0");
  return clearError("phone");
};

const validatePassword = () => {
  const val = document.getElementById("password").value;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!regex.test(val))
    return showError(
      "password",
      "Mật khẩu yếu (cần 8 ký tự, 1 hoa, 1 thường, 1 số)",
    );
  return clearError("password");
};

const validateConfirmPassword = () => {
  const pass = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  if (!confirm || confirm !== pass)
    return showError("confirmPassword", "Mật khẩu xác nhận không khớp");
  return clearError("confirmPassword");
};

const validateGender = () => {
  const gender = document.querySelector('input[name="gender"]:checked');
  const errSpan = document.getElementById("err-gender");
  if (!gender) {
    errSpan.innerText = "Vui lòng chọn giới tính";
    errSpan.style.display = "block";
    return 0;
  }
  errSpan.style.display = "none";
  return 1;
};

const validateTerms = () => {
  const terms = document.getElementById("terms").checked;
  const errSpan = document.getElementById("err-terms");
  if (!terms) {
    errSpan.innerText = "Bạn phải đồng ý với điều khoản";
    errSpan.style.display = "block";
    return 0;
  }
  errSpan.style.display = "none";
  return 1;
};

// --- GẮN SỰ KIỆN ---
// Validate khi rời khỏi ô (blur)
document.getElementById("fullname").onblur = validateFullname;
document.getElementById("email").onblur = validateEmail;
document.getElementById("phone").onblur = validatePhone;
document.getElementById("password").onblur = validatePassword;
document.getElementById("confirmPassword").onblur = validateConfirmPassword;

// Xóa lỗi ngay khi đang gõ (input)
document.querySelectorAll("input").forEach((input) => {
  input.oninput = function () {
    const id = this.id || this.name;
    const errSpan = document.getElementById(`err-${id}`);
    if (errSpan) {
      this.classList.remove("invalid");
      errSpan.style.display = "none";
    }
  };
});

// Xử lý Submit
form.onsubmit = function (e) {
  e.preventDefault();

  // Sử dụng toán tử & để chạy tất cả các hàm
  const isValid =
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirmPassword() &
    validateGender() &
    validateTerms();

  if (isValid === 1) {
    document.getElementById("registration-container").style.display = "none";
    document.getElementById("success-msg").style.display = "block";
    document.getElementById("user-display").innerText =
      document.getElementById("fullname").value;
  }
};
