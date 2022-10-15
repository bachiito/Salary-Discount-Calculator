let salary = 0;
let extraHours = 0;
let bonifications = 0;
let validInputs = true;
const AFPDiscount = 0.0287;
const SFSDiscount = 0.0304;
const year = new Date().getFullYear();
const requiredId = "monthly-salary";

const form = document.querySelector("form");
const inputGroups = document.querySelectorAll(".input-group");
const result = document.querySelector(".result");
const copyrightYear = document.querySelector(".year");

form.addEventListener("submit", (e) => {
    validInputs = true;
    e.preventDefault();

    if (reviewInputs(inputGroups)) {
        assignValues();
        showResult();
    }
});

function reviewInputs(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i].querySelector("input");
        const alertMsg = inputs[i].querySelector(".alert-msg");

        if (input.getAttribute("id") === requiredId && !input.value.trim()) {
            alertMsg.textContent = "This field is required.";
            invalidateInput(alertMsg);
            continue;
        }

        if (input.value.includes(",")) {
            alertMsg.textContent = "Commas are not allowed.";
            invalidateInput(alertMsg);
            continue;
        }

        if (isNaN(input.value)) {
            alertMsg.textContent = "Enter only numbers.";
            invalidateInput(alertMsg);
            continue;
        }

        if (input.value < 0) {
            alertMsg.textContent = "Enter only positive numbers.";
            invalidateInput(alertMsg);
            continue;
        }

        alertMsg.classList.add("d-none");
    }

    return validInputs;
}

function showResult() {
    const finalSalary = formartNumber(
        salary - salary * AFPDiscount - salary * SFSDiscount
    );
    const afterAFP = formartNumber(salary * AFPDiscount);
    const afterSFS = formartNumber(salary * SFSDiscount);
    salary = formartNumber(salary);

    result.innerText = `Salary: $${salary}
        AFP discount: $${afterAFP}
        SFS discount: $${afterSFS}
        Salary after discounts: $${finalSalary}
    `;
}

function assignValues() {
    salary = document.querySelector(`#${requiredId}`).value;
    bonifications = document.querySelector("#bonifications").value;
    extraHours = document.querySelector("#extra-hours").value;
}

function invalidateInput(alert) {
    validInputs = false;
    alert.classList.remove("d-none");
}

function formartNumber(number) {
    return new Intl.NumberFormat().format(number);
}

copyrightYear.textContent = year;

/* 
    After discounting AFP, SFS and taxes from your salary it is equal to DOP$ 
    ${new Intl.NumberFormat().format(finalSalary)} 
*/
