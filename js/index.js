let salary = 0;
let extraHours = 0;
let bonifications = 0;
let validInputs = true;

const taxesAnualEscale = {
    /* Anual Salary & Tax Rent */
    416220: 0.15,
    624329: 0.2,
    867123: 0.25,
};

const AFPercentage = 0.0287;
const AFPMaxValue = 8954.4;
const SFSPercentage = 0.0304;
const SFSMaxValue = 4742.4;
const monthsInYear = 12;
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

function showResult() {
    let AFPDiscount = getDiscount(salary * AFPercentage, "AFP");
    let SFSDiscount = getDiscount(salary * SFSPercentage, "SFS");
    let salaryDiscounted = salary - AFPDiscount - SFSDiscount;
    let taxDiscount = getTaxDiscount(salaryDiscounted, taxesAnualEscale);
    let netSalary = salaryDiscounted - taxDiscount;
    let discounted = AFPDiscount + SFSDiscount + taxDiscount;

    result.innerText = `Salary: $${salary}
        AFP discount: $${formatNumber(AFPDiscount)}
        SFS discount: $${formatNumber(SFSDiscount)}
        Tax dicount: $${formatNumber(taxDiscount)}
        Total discount: $${formatNumber(discounted)}
        Net salary: $${formatNumber(netSalary)}
    `;
}

function getTaxDiscount(salary, taxesEscale) {
    let taxExcedent = 0;
    let taxPercentage = 0;
    let taxExcedentAdded = 0;
    let anualAfterExcedent = 0;
    let anualSalary = salary * monthsInYear;

    for (const anualRent of Object.keys(taxesEscale).reverse()) {
        if (anualSalary > anualRent) {
            taxExcedent = anualRent;
            taxPercentage = taxesEscale[anualRent];
            break;
        }
    }

    if (taxPercentage === 0.2) taxExcedentAdded = 31216;
    if (taxPercentage === 0.25) taxExcedentAdded = 79776;

    anualAfterExcedent = (anualSalary - taxExcedent) * taxPercentage;

    console.log(`Tax Excedent: ${taxExcedent}`);
    console.log(`Tax Excedent Added: ${taxExcedentAdded}`);
    console.log(`Tax Percentage: ${taxPercentage}`);
    console.log(`Anual Salary: ${anualSalary}`);
    console.log(`Anual Salary After Excedent: ${anualAfterExcedent}`);

    if (taxPercentage === 0) return 0;
    return (anualAfterExcedent + taxExcedentAdded) / monthsInYear;
}

function getDiscount(salary, entity) {
    switch (entity) {
        case "AFP":
            if (salary > AFPMaxValue) {
                return AFPMaxValue;
            }
            return salary;

        case "SFS":
            if (salary > SFSMaxValue) {
                return SFSMaxValue;
            }
            return salary;

        default:
            return "Unable to get this value.";
    }
}

function reviewInputs(inputsGroups) {
    for (const inputGroup of inputsGroups) {
        const input = inputGroup.querySelector("input");
        const alertMsg = inputGroup.querySelector(".alert-msg");

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
