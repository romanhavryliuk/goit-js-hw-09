const STORAGE_KEY = 'feedback-form-state';
const formData = {
    email: "",
    message: "",
};

const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');
const emailInput = form.querySelector('input[name="email"]');

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);
populateForm();


function onFormInput(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();
    if (name !== 'email' && name !== 'message') {
    return;
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!email || !message) {
        alert('Fill please all fields');
        return;
    }
    console.log('formData:', formData);
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    formData.email = '';
    formData.message = '';
}


function populateForm() {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    if (!savedValue) {
        return;
    }

    let parsedValue = {};
    try {
        parsedValue = JSON.parse(savedValue);
    } catch {
        return;
    }

    formData.email = (parsedValue.email ?? '').trim();
    formData.message = (parsedValue.message ?? '').trim();
    emailInput.value = formData.email;
    textarea.value = formData.message;
}