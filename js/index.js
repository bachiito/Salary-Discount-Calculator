let salary = 0;
const AFPDiscount = 2.87;
const SFSDiscount = 3.04;
const year = new Date().getFullYear();
const requiredInputId = "monthly-salary";

const form = document.querySelector("form");
const inputGroups = document.querySelectorAll(".input-group");
const result = document.querySelector(".result");
const copyrightYear = document.querySelector(".year");

copyrightYear.textContent = year;

form.addEventListener("submit", (e) => {
    let validInputs = true;
    e.preventDefault();

    inputGroups.forEach((inputGroup) => {
        const input = inputGroup.querySelector("input");
        const alertMsg = inputGroup.querySelector(".alert-msg");

        if (isNaN(input.value)) {
            alertMsg.classList.remove("d-none");
            validInputs = false;
        } else {
            alertMsg.classList.add("d-none");
        }

        if (input.getAttribute("id") === requiredInputId && !input.value) {
            validInputs = false;
            alertMsg.textContent = "This field is required.";
            alertMsg.classList.remove("d-none");
        }
    });

    if (validInputs) {
        salary = document.querySelector(`#${requiredInputId}`).value;
        result.textContent = `"The inputs given are valid" OUR SALAY IS $RDS ${salary}`;
    } else {
        result.textContent = "The inputs given are NOT valid";
    }
});
