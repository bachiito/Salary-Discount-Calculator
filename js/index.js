let validInputs = true;
const requiredId = "monthly-salary";

const salaryForm = document.querySelector("#salary-form");
const inputSalary = document.querySelector(`#${requiredId}`);
const alertMsg = document.querySelector(".alert-msg");
const resultList = document.querySelector(".result-ul");
const copyBtn = document.querySelector(".copy");
const copyrightYear = document.querySelector(".year");

salaryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    copyBtnChangeIcon();
    resultList.classList.add("d-none");
    validInputs = true;

    if (reviewInputs(inputSalary)) {
        showResult();
    }
});

function showResult() {
    const incomeTaxScale = {
        /* Anual Salary & Income Tax Percentage */
        416220: 0.15,
        624329: 0.2,
        867123: 0.25,
    };

    const AFPercentage = 0.0287;
    const SFSPercentage = 0.0304;
    const salary = document.querySelector(`#${requiredId}`).value;
    const AFPDiscount = getDiscount(salary * AFPercentage, "AFP");
    const SFSDiscount = getDiscount(salary * SFSPercentage, "SFS");
    const salDiscounted = salary - AFPDiscount - SFSDiscount;
    const incomeTaxDiscount = getIncomTxDiscount(salDiscounted, incomeTaxScale);
    const discounted = AFPDiscount + SFSDiscount + incomeTaxDiscount;
    const netSalary = salDiscounted - incomeTaxDiscount;
    const resultListItems = document.querySelectorAll(".result-li");

    const conversionResults = [
        formatNumber(salary),
        formatNumber(AFPDiscount),
        formatNumber(SFSDiscount),
        formatNumber(incomeTaxDiscount),
        formatNumber(discounted),
        formatNumber(netSalary),
    ];

    resultListItems.forEach((listItem, index) => {
        const result = `${conversionResults[index]}`;
        const listItemSpan = listItem.querySelector(".fw-500");

        listItem.innerHTML = "";
        listItem.append(listItemSpan, result);
    });

    resultList.classList.remove("d-none");
    copyBtn.classList.remove("d-none");
}

function getIncomTxDiscount(salary, taxesEscale) {
    let excess = 0;
    let percentage = 0;
    let percentageCarryOver = 0;
    let anualSalAfterExcess = 0;
    const monthsInYear = 12;
    const twentyPercentCOver = 31216;
    const twentyFivePercentCOver = 79776;
    const anualSalary = salary * monthsInYear;

    for (const anualSalExcess of Object.keys(taxesEscale).reverse()) {
        if (anualSalary > anualSalExcess) {
            excess = anualSalExcess;
            percentage = taxesEscale[anualSalExcess];
            break;
        }
    }

    if (percentage === 0.2) percentageCarryOver = twentyPercentCOver;
    if (percentage === 0.25) percentageCarryOver = twentyFivePercentCOver;

    anualSalAfterExcess = (anualSalary - excess) * percentage;

    if (percentage === 0) return 0;
    return (anualSalAfterExcess + percentageCarryOver) / monthsInYear;
}

function getDiscount(salary, entity) {
    const AFPMaxValue = 8954.4;
    const SFSMaxValue = 4742.4;

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

function reviewInputs(input) {
    if (input.getAttribute("id") === requiredId && !input.value.trim()) {
        alertMsg.textContent = "This field is required.";
        invalidateInput(alertMsg);
        return;
    }

    if (input.value.includes(",")) {
        alertMsg.textContent = "Commas are not allowed.";
        invalidateInput(alertMsg);
        return;
    }

    if (isNaN(input.value)) {
        alertMsg.textContent = "Enter only numbers.";
        invalidateInput(alertMsg);
        return;
    }

    if (input.value < 0) {
        alertMsg.textContent = "Enter only positive numbers.";
        invalidateInput(alertMsg);
        return;
    }

    alertMsg.classList.add("d-none");
    return validInputs;
}

function formatNumber(number) {
    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "DOP",
    })
        .format(number);
}

function invalidateInput(alert) {
    validInputs = false;
    alert.classList.remove("d-none");
}

copyBtn.addEventListener("click", () => {
    const salary = inputSalary.value;
    const copiedIcon = "<i class='fa-regular fa-paste fa-lg'></i>";

    navigator.clipboard.writeText(resultList.innerText);
    copyBtn.innerHTML = copiedIcon;
    copyBtn.setAttribute("title", "Copied");
    inputSalary.value = "Copied!";
    inputSalary.style.color = "red";

    setTimeout(() => {
        inputSalary.value = salary;
        inputSalary.style.color = "black";
    }, 2000);
});

function copyBtnChangeIcon() {
    const copyIcon = "<i class='fa-regular fa-copy fa-lg'></i>";
    copyBtn.setAttribute("title", "Copy");
    copyBtn.innerHTML = copyIcon;
    copyBtn.classList.add("d-none");
}

copyrightYear.textContent = new Date().getFullYear();
