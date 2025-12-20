const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');
const emailInput = form.querySelector('input[name="email"]');

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);
populateForm();
// Populate form fields on page load
function onFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!email || !message) {
        alert('Fill please all fields');
        return;
    }
    console.log({ email, message });
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
}


function onFormInput() {
    const formData = {
        email: emailInput.value.trim(),
        message: textarea.value.trim(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    if (savedValue) {
        const formData = JSON.parse(savedValue);
        emailInput.value = formData.email || '';
        textarea.value = formData.message || '';
    }
}