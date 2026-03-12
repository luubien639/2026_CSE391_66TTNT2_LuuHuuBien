const students = [];
const btnAdd = document.getElementById("btnAdd");
const inputFullname = document.getElementById("fullname");
const inputScore = document.getElementById("score");
const tableBody = document.getElementById("studentTableBody");

// Hàm xếp loại
const getRanking = (score) => {
  if (score >= 8.5) return "Giỏi";
  if (score >= 7.0) return "Khá";
  if (score >= 5.0) return "Trung bình";
  return "Yếu";
};

// Hàm vẽ lại bảng và tính toán thống kê
const renderTable = () => {
  tableBody.innerHTML = "";
  let total = 0;

  students.forEach((s, index) => {
    const row = document.createElement("tr");
    if (s.score < 5) row.classList.add("weak-student");

    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${s.name}</td>
            <td>${s.score}</td>
            <td>${getRanking(s.score)}</td>
            <td><button class="btnDelete" data-index="${index}">Xóa</button></td>
        `;
    tableBody.appendChild(row);
    total += s.score;
  });

  // Cập nhật thống kê
  document.getElementById("totalStudents").textContent = students.length;
  const avg = students.length > 0 ? (total / students.length).toFixed(2) : 0;
  document.getElementById("avgScore").textContent = avg;
};

// Xử lý thêm sinh viên
const addStudent = () => {
  const name = inputFullname.value.trim();
  const score = parseFloat(inputScore.value);

  if (!name || isNaN(score) || score < 0 || score > 10) {
    alert("Vui lòng nhập tên và điểm hợp lệ (0-10)!");
    return;
  }

  students.push({ name, score });
  inputFullname.value = "";
  inputScore.value = "";
  inputFullname.focus();
  renderTable();
};

btnAdd.addEventListener("click", addStudent);

// Nhấn Enter ở ô điểm để thêm
inputScore.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addStudent();
});

// Event Delegation cho nút Xóa
tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnDelete")) {
    const index = e.target.getAttribute("data-index");
    students.splice(index, 1);
    renderTable();
  }
});
