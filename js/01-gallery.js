import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery')

const renderList = (pictures) => pictures.reduce((acc, picture) => acc + 
`<div class="gallery__item">
  <a class="gallery__link" href=${picture.original}>
    <img
      class="gallery__image"
      src="${picture.preview}"
      data-source="${picture.original}"
      alt=${picture.descrption}/>
  </a>
  </div>`, "");

const addGalleryItems = (string) => {
    galleryContainer.insertAdjacentHTML('beforeend', renderList(galleryItems) );
};

addGalleryItems(renderList(galleryItems))

galleryContainer.addEventListener('click', handlerClick);

function handlerClick(event) {
    event.preventDefault();
    if (!event.target.classList.contains('gallery__image')) {
        return;
    }

    const instance = basicLightbox.create(
        `<img src=${event.target.dataset.source} width="800" height="600">`,
    {
        onShow: (instance) => {
                window.addEventListener('keydown', modalClose)
            },
        onClose: (instance) => {
            window.removeEventListener('keydown', modalClose)
        }
        })
    
    function modalClose(event) {
        if (event.code === 'Escape') {
            instance.close();
    }
}

instance.show()
}
