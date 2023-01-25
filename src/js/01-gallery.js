import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');

const markupGalleryPictures = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`
  )
  .join('');

galleryEl.innerHTML = markupGalleryPictures;

galleryEl.addEventListener('click', showLargePicture);

/**
 * the function removes the default link actions, gets the address of a large image, creates an active image and displays it on the screen, adds closing the image on pressing the "Esc" button
 * @param {Object} event from EventListener
 */
function showLargePicture(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();

  const ImgSource = event.target.dataset.source;

  const activePicture = createActivePicture(ImgSource);
  console.log(activePicture);

  activePicture.show();

  closePictureButtonEsc(activePicture);
}

/**
 * the function creates HTML markup for active picture
 * @param {String} img address of the picture from function getImgSource
 * @returns string with HTML markup
 */
function createActivePicture(img) {
  return basicLightbox.create(
    `
    <img src="${img}" width="800" height="600">
`
  );
}

/**
 * the function closes the active picture if the button "Esc" is pressed and there is an active picture on the screen, it works once
 * @param {object} activePicture from the function createActivePicture
 */
function closePictureButtonEsc(activePicture) {
  document.addEventListener(
    'keydown',
    event => {
      if (event.code !== 'Escape') {
        return;
      } else if (!basicLightbox.visible()) {
        return;
      } else {
        activePicture.close();
      }
    },
    { once: true }
  );
}
