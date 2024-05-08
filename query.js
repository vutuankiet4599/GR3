function getTreatment() {
    let list = document.querySelectorAll("#company-profile .mt-8 li");
    let result = [...list].map((item) => item.innerHTML);
    return JSON.stringify(result);
}

function getArrayDataOfJob() {
    let firstChild = document.querySelector("#JobDescription").firstChild;
    let secondChild = firstChild.nextSibling;
    let thirdChild = secondChild.nextSibling;

    let work = firstChild.querySelectorAll("li");
    let skill = secondChild.querySelectorAll("li");
    let welfare = thirdChild.querySelectorAll("li");

    work = [...work].map((item) => item.innerText);
    skill = [...skill].map((item) => item.innerText);
    welfare = [...welfare].map((item) => item.innerText);

    let interview = document.querySelectorAll("section.sticky.flex.w-full li");
    interview = [...interview].map((item) => item.innerText);

    work = JSON.stringify(work);
    skill = JSON.stringify(skill);
    welfare = JSON.stringify(welfare);
    interview = JSON.stringify(interview);

    return {
        work,
        skill,
        welfare,
        interview,
    };
}
