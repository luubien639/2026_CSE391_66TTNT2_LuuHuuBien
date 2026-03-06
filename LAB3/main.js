console.log("Hello from JavaScript!");
let name = "Bien";
let yearOfBirth = 2006;
let currentYear = 2026;
let age = currentYear - yearOfBirth;

console.log("Xin chào, mình là " + name + ", năm nay mình " + age + " tuổi.");
function tinhDiemTrungBinh(m1, m2, m3) {
  let avg = (m1 + m2 + m3) / 3;
  return avg;
}

function xepLoai(avg) {
  if (avg >= 8) {
    return "Giỏi";
  } else if (avg >= 6.5) {
    return "Khá";
  } else if (avg >= 5) {
    return "Trung bình";
  } else {
    return "Yếu";
  }
}
function kiemTraTuoi(age) {
  if (age >= 18) {
    console.log("Đủ 18 tuổi");
  } else {
    console.log("Chưa đủ 18 tuổi");
  }
}
