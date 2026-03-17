const nextBtns = document.querySelectorAll(".btn-next");
const backBtns = document.querySelectorAll(".btn-back");
const steps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".step-indicator");

let currentStep = 0; 

function updateForm() {
    // 1. Trượt các form qua trái/phải
    steps.forEach((step, index) => {
        step.style.left = `${(index - currentStep) * 100}%`;
    });

    // 2. Cập nhật màu thanh tiến trình hình mũi tên
    progressSteps.forEach((progressStep, index) => {
        if (index <= currentStep) {
            progressStep.classList.add("active");
        } else {
            progressStep.classList.remove("active");
        }
    });
}

nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateForm();
        }
    });
});

backBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            updateForm();
        }
    });
});