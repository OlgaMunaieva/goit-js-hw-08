import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('[name = "email"]');
const massageEl = document.querySelector('[name = "message"]');

const FEEDBACK_FORM_STATE = 'feedback-form-state';

const emailInput = 'email';
const messageTaxtaria = 'message';

const objectDataForm = {
  [emailInput]: '',
  [messageTaxtaria]: '',
};

complectionDefaultForm();
formEl.addEventListener('input', throttle(createobjectDataForm, 500));
formEl.addEventListener('submit', submitForm);

function complectionDefaultForm() {
  if (!localStorage.getItem(FEEDBACK_FORM_STATE)) {
    emailEl.value = '';
    massageEl.value = '';
  } else {
    const emailLocal = JSON.parse(
      localStorage.getItem(FEEDBACK_FORM_STATE)
    ).email;
    const massageLocal = JSON.parse(
      localStorage.getItem(FEEDBACK_FORM_STATE)
    ).message;
    emailEl.value = emailLocal;
    objectDataForm.email = emailLocal;
    massageEl.value = massageLocal;
    objectDataForm.message = massageLocal;
  }
}

function createobjectDataForm(event) {
  // console.log(event.target.getAttribute('name'));
  if (event.target.getAttribute('name') === emailInput) {
    // console.log(event.target.value);
    objectDataForm.email = event.target.value;
    // console.log(objectDataForm);
    localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(objectDataForm));
  } else if (event.target.getAttribute('name') === messageTaxtaria) {
    console.log(event.target.value);
    objectDataForm.message = event.target.value;
    console.log(objectDataForm);
    localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(objectDataForm));
  }
}

function submitForm(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }
  objectDataForm.email = emailEl.value;
  objectDataForm.message = massageEl.value;
  console.log(objectDataForm);
  objectDataForm.email = '';
  objectDataForm.message = '';
  emailEl.value = '';
  massageEl.value = '';
  console.log(objectDataForm);
  localStorage.removeItem(FEEDBACK_FORM_STATE);
  // event.Target.reset();
}
