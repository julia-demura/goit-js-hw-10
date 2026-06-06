let formData = {
    email: "",
    message: "",
};
const formElem = document.querySelector('.feedback-form');
const savedData = localStorage.getItem("feedback-form-state");

if (savedData) {
    formData = JSON.parse(savedData);
    formElem.elements.email.value = formData.email || "";
    formElem.elements.message.value = formData.message || "";
}
formElem.addEventListener('input', evt => {
    formData[evt.target.name] = evt.target.value.trim();
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
});
formElem.addEventListener('submit', evt => {
    evt.preventDefault();
    if (formData.email === "" || formData.message === "") {
        alert("Fill please all fields");
        return;
    }

    console.log(formData);
    localStorage.removeItem("feedback-form-state");
    formData = { email: "", message: "" };
    formElem.reset();
});
