document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // PHẦN 1: CÁC TÍNH NĂNG NÂNG CẤP (REAL-TIME)
  // ==========================================

  // 1. Đếm ký tự họ và tên
  const fullnameInput = document.getElementById('fullname');
  const nameCounter = document.getElementById('name-counter');

  fullnameInput.addEventListener('input', function() {
    nameCounter.innerText = `${this.value.length}/50`;
  });

  // 2. Tính năng Hiển thị/Ẩn mật khẩu (Toggle)
  function setupPasswordToggle(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggleBtn = document.getElementById(toggleId);
    
    toggleBtn.addEventListener('click', function() {
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      this.innerText = type === 'password' ? '👁' : '🙈';
    });
  }

  setupPasswordToggle('password', 'toggle-password');
  setupPasswordToggle('confirmPassword', 'toggle-confirm');

  // 3. Thanh mức độ mạnh mật khẩu
  const passwordInput = document.getElementById('password');
  const strengthBar = document.getElementById('strength-bar');

  passwordInput.addEventListener('input', function() {
    const val = this.value;
    let strength = 0;
    
    if (val.length > 0) {
      if (val.length >= 6) strength += 1; // Mức Yếu
      if (val.match(/[A-Z]/) && val.match(/[0-9]/)) strength += 1; // Mức Trung bình
      if (val.match(/[^a-zA-Z0-9]/) && val.length >= 8) strength += 1; // Mức Mạnh
    }

    // Reset class
    strengthBar.className = 'strength-meter';
    
    // Đổi màu
    if (strength === 1) strengthBar.classList.add('strength-weak');
    else if (strength === 2) strengthBar.classList.add('strength-medium');
    else if (strength >= 3) strengthBar.classList.add('strength-strong');
  });


  // ==========================================
  // PHẦN 2: KIỂM TRA FORM KHI SUBMIT (VALIDATION)
  // ==========================================

  document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    // Hàm hiển thị lỗi
    const showError = (inputId, errId, message) => {
      document.getElementById(inputId)?.classList.add('invalid');
      document.getElementById(inputId)?.classList.remove('valid');
      const errSpan = document.getElementById(errId);
      if (errSpan) {
        errSpan.innerText = message;
        errSpan.style.display = 'block';
      }
      isValid = false;
    };

    // Hàm hiển thị hợp lệ
    const showSuccess = (inputId, errId) => {
      document.getElementById(inputId)?.classList.remove('invalid');
      document.getElementById(inputId)?.classList.add('valid');
      const errSpan = document.getElementById(errId);
      if (errSpan) errSpan.style.display = 'none';
    };

    // 1. Kiểm tra Họ và tên
    const fullname = document.getElementById('fullname').value.trim();
    if (fullname.length < 3) {
      showError('fullname', 'err-fullname', 'Họ và tên phải có ít nhất 3 ký tự.');
    } else {
      showSuccess('fullname', 'err-fullname');
    }

    // 2. Kiểm tra Email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('email', 'err-email', 'Email không hợp lệ.');
    } else {
      showSuccess('email', 'err-email');
    }

    // 3. Kiểm tra Số điện thoại
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^(0)[0-9]{9}$/; 
    if (!phoneRegex.test(phone)) {
      showError('phone', 'err-phone', 'Số điện thoại gồm 10 số, bắt đầu bằng 0.');
    } else {
      showSuccess('phone', 'err-phone');
    }

    // 4. Kiểm tra Mật khẩu
    const password = document.getElementById('password').value;
    if (password.length < 6) {
      showError('password', 'err-password', 'Mật khẩu phải có ít nhất 6 ký tự.');
    } else {
      showSuccess('password', 'err-password');
    }

    // 5. Kiểm tra Xác nhận mật khẩu
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword === '' || confirmPassword !== password) {
      showError('confirmPassword', 'err-confirmPassword', 'Mật khẩu xác nhận không trùng khớp.');
    } else {
      showSuccess('confirmPassword', 'err-confirmPassword');
    }

    // 6. Kiểm tra Giới tính
    const genders = document.getElementsByName('gender');
    let genderSelected = Array.from(genders).some(radio => radio.checked);
    const errGender = document.getElementById('err-gender');
    if (!genderSelected) {
      errGender.innerText = 'Vui lòng chọn giới tính.';
      errGender.style.display = 'block';
      isValid = false;
    } else {
      errGender.style.display = 'none';
    }

    // 7. Kiểm tra Điều khoản
    const terms = document.getElementById('terms');
    const errTerms = document.getElementById('err-terms');
    if (!terms.checked) {
      errTerms.innerText = 'Bạn phải đồng ý với điều khoản.';
      errTerms.style.display = 'block';
      isValid = false;
    } else {
      errTerms.style.display = 'none';
    }

    // Xử lý thành công
    if (isValid) {
      document.getElementById('registration-container').style.display = 'none';
      document.getElementById('user-display').innerText = fullname;
      document.getElementById('success-msg').style.display = 'block';
    }
  });
});