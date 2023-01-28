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

/**
 *fills in the initial form data. If there is no local form data, then the form fields are empty. If not, then the form and objectDataForm are filled with data from local storage
 */
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

/**
 *on an event, the objectDataForm is filled with the values email and message and transferred to the local storage in the format JSON
 * @param {object} event input on email and massage
 */
function createobjectDataForm(event) {
  if (event.target.getAttribute('name') === emailInput) {
    objectDataForm.email = event.target.value;
    localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(objectDataForm));
  } else if (event.target.getAttribute('name') === messageTaxtaria) {
    objectDataForm.message = event.target.value;
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
  localStorage.removeItem(FEEDBACK_FORM_STATE);
}
