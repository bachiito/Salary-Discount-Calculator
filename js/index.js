let salary = 0;
let extraHours = 0;
let bonifications = 0;
let AFPDiscount = 0;
let SFSDiscount = 0;
let validInputs = true;

const AFPercentage = 0.0287;
const AFPMaxValue = 8954.4;
const SFSPercentage = 0.0304;
const SFSMaxValue = 4742.4;
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
    AFPDiscount = getDiscount(salary * AFPercentage, "AFP");
    SFSDiscount = getDiscount(salary * SFSPercentage, "SFS");

    console.log(`EXTRA HOURS: ${extraHours}`);

    salary = formatNumber(salary);

    result.innerText = `Salary: $${salary}
        AFP discount: $${AFPDiscount}
        SFS discount: $${SFSDiscount}
        Salary after discounts: 
    `;
}

function getTaxesDiscount(salary) {}

function getDiscount(salary, entity) {
    switch (entity) {
        case "AFP":
            if (salary > AFPMaxValue) {
                return formatNumber(AFPMaxValue);
            }
            return formatNumber(salary);

        case "SFS":
            if (salary > SFSMaxValue) {
                return formatNumber(SFSMaxValue);
            }
            return formatNumber(salary);

        default:
            return "Unable to get this value.";
    }
}

function formatNumber(number) {
    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "DOP",
    }).format(number);
}

function assignValues() {
    salary = document.querySelector(`#${requiredId}`).value;
    extraHours = document.querySelector("#extra-hours").value;
    bonifications = document.querySelector("#bonifications").value;
}

function invalidateInput(alert) {
    validInputs = false;
    alert.classList.remove("d-none");
}

copyrightYear.textContent = year;
