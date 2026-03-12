// 1. Khai báo biến toàn cục
let students = []; // Mảng gốc lưu trữ toàn bộ dữ liệu
let sortDirection = 0; // 0: mặc định, 1: tăng dần, -1: giảm dần

// 2. Truy vấn các phần tử DOM cần thiết
const tableBody = document.getElementById("studentTableBody");
const searchInput = document.getElementById("searchInput");
const filterRank = document.getElementById("filterRank");
const sortScoreBtn = document.getElementById("sortScore");
const sortIcon = document.getElementById("sortIcon");
const emptyMsg = document.getElementById("emptyMsg");

// Các phần tử hiển thị thống kê
const totalDisplay = document.getElementById("totalStudents");
const avgDisplay = document.getElementById("avgScore");

// 3. Hàm xác định xếp loại dựa trên điểm
const getRanking = (score) => {
  if (score >= 8.5) return "Giỏi";
  if (score >= 7.0) return "Khá";
  if (score >= 5.0) return "Trung bình";
  return "Yếu";
};

// 4. Hàm tính toán và hiển thị thống kê (Tổng số & Trung bình)
const updateStats = (dataList) => {
  const total = dataList.length;
  let avg = 0;

  if (total > 0) {
    // Tính tổng điểm bằng phương thức reduce
    const sum = dataList.reduce((acc, student) => acc + student.score, 0);
    avg = (sum / total).toFixed(2);
  }

  totalDisplay.textContent = total;
  avgDisplay.textContent = avg;
};

// 5. Hàm lọc, tìm kiếm và sắp xếp đồng thời (Logic chính)
const applyFilters = () => {
  const keyword = searchInput.value.toLowerCase();
  const rankValue = filterRank.value;

  // Bước 1: Lọc dữ liệu theo tên và xếp loại
  let filtered = students.filter((s) => {
    const matchName = s.name.toLowerCase().includes(keyword);
    const matchRank =
      rankValue === "Tất cả" || getRanking(s.score) === rankValue;
    return matchName && matchRank;
  });

  // Bước 2: Sắp xếp theo điểm nếu người dùng yêu cầu
  if (sortDirection !== 0) {
    filtered.sort((a, b) => (a.score - b.score) * sortDirection);
  }

  // Bước 3: Cập nhật thống kê dựa trên mảng đã qua lọc
  updateStats(filtered);

  // Bước 4: Hiển thị ra bảng
  renderTable(filtered);
};

// 6. Hàm hiển thị dữ liệu ra HTML
const renderTable = (dataList) => {
  tableBody.innerHTML = ""; // Xóa trắng bảng cũ

  if (dataList.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
    dataList.forEach((s, index) => {
      const row = document.createElement("tr");

      // Tô màu vàng nếu điểm dưới 5
      if (s.score < 5) row.classList.add("weak-student");

      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${s.name}</td>
                <td>${s.score}</td>
                <td>${getRanking(s.score)}</td>
                <td><button onclick="deleteStudent(${s.id})" style="color:red">Xóa</button></td>
            `;
      tableBody.appendChild(row);
    });
  }
};

// 7. Hàm xử lý thêm sinh viên mới
document.getElementById("btnAdd").onclick = () => {
  const nameEl = document.getElementById("fullname");
  const scoreEl = document.getElementById("score");

  const name = nameEl.value.trim();
  const score = parseFloat(scoreEl.value);

  // Kiểm tra tính hợp lệ của dữ liệu
  if (name && !isNaN(score) && score >= 0 && score <= 10) {
    // Thêm vào mảng gốc với ID duy nhất bằng Date.now()
    students.push({ id: Date.now(), name, score });

    // Reset form và focus lại
    nameEl.value = "";
    scoreEl.value = "";
    nameEl.focus();

    // Chạy lại bộ lọc để cập nhật bảng ngay lập tức
    applyFilters();
  } else {
    alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
  }
};

// 8. Hàm xóa sinh viên
const deleteStudent = (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
    students = students.filter((s) => s.id !== id);
    applyFilters();
  }
};

// 9. Gắn sự kiện lắng nghe (Event Listeners)
searchInput.oninput = applyFilters; // Tìm kiếm ngay khi gõ
filterRank.onchange = applyFilters; // Lọc ngay khi đổi select

// Xử lý sự kiện click tiêu đề cột Điểm để sắp xếp
sortScoreBtn.onclick = () => {
  if (sortDirection === 0 || sortDirection === -1) {
    sortDirection = 1; // Sắp xếp tăng dần
    sortIcon.textContent = "▲";
  } else {
    sortDirection = -1; // Sắp xếp giảm dần
    sortIcon.textContent = "▼";
  }
  applyFilters();
};
