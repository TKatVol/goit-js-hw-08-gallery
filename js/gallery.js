import items from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  lightboxCloseButton: document.querySelector('button[data-action="close-lightbox"]'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
};

const cardImages = createGalleryCard(items);

refs.gallery.insertAdjacentHTML('beforeend', cardImages);
refs.gallery.addEventListener('click', onImageClick);
refs.lightboxCloseButton.addEventListener('click', onCloseButtonClick);
refs.lightboxOverlay.addEventListener('click', onClickCloseLightbox);
document.addEventListener('keydown', onEscKeyCloseLightbox);
document.addEventListener('keydown', arrowKeysSlideshow);

function createGalleryCard(images) {
  
  return images.map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
          <a class="gallery__link" href="${original}"  >
          <img class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}" />
          </a>
      </li>
      `;
    })
    .join('');
}

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  refs.lightbox.classList.add('is-open');
  refs.lightboxImage.src = event.target.getAttribute('data-source');
  refs.lightboxImage.alt = event.target.getAttribute('alt');

}

function onCloseButtonClick(event) {
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
 }

function onClickCloseLightbox(event) {
  if (event.currentTarget === event.target) {
    onCloseButtonClick();
   }
}
 
function onEscKeyCloseLightbox(event) {
  if (event.code === 'Escape') {
    onCloseButtonClick();
  }
}

function arrowKeysSlideshow(event) {
  if (event.code !== 'ArrowRight' && event.code !== 'ArrowLeft') {
    return;
  }

  const images = document.querySelectorAll('[data-source]');
  const arrayImages = [];
  let newIndex;
  
  images.forEach(images => arrayImages.push(images.dataset.source));
  
  const currentImage = refs.lightboxImage.src;
  const currentId = arrayImages.indexOf(currentImage);

  if (event.key === 'ArrowLeft') {
    newIndex = currentId - 1;
    if (newIndex == -1) {
      newIndex = arrayImages.length - 1;
    }
  } else if (event.key === 'ArrowRight') {
    newIndex = currentId + 1;
    if (newIndex === arrayImages.length) {
      newIndex = 0;
    }
  }
  refs.lightboxImage.src = arrayImages[newIndex];
}
