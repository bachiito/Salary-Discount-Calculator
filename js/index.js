const form = document.querySelector("form");
const inputGroups = document.querySelectorAll(".input-group");
const copyrightYear = document.querySelector(".year");
const year = new Date().getFullYear();
const numRegex = /\d/g;

copyrightYear.textContent = year;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    inputGroups.forEach((inputGroup) => {
        const input = inputGroup.querySelector("input[type='text']");
        const errorMsg = inputGroup.querySelector(".alert-msg");

        if (!input.value.match(numRegex)) {
            errorMsg.textContent = "Please enter only numbers.";
        } else {
            errorMsg.textContent = "";
        }
    });
});
