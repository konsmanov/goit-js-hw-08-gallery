const gallery = document.querySelector('.gallery');
const modalWindow = document.querySelector('.lightbox');
const btnClose = document.querySelector('button[data-action="close-lightbox"]')
const imgGal = modalWindow.querySelector('.lightbox__image')
const overlay = modalWindow.querySelector('.lightbox__overlay')
let outData = '';
let target;

galData.forEach(element => {
    outData += `<li class="gallery__item">
                <a  class="gallery__link" href="${element.original}">
                <img class="gallery__image"  src="${element.preview}" data-source="${element.original}" alt="${element.description}"/>
                </a>
                </li>`
})
gallery.insertAdjacentHTML('beforeend', outData);

function modalWindowEvent(event) {
    if (event.target.matches('.gallery__image')) {
        event.preventDefault();
        target = event.target;
        modalWindow.classList.add('is-open');
        imgGal.setAttribute('src', target.getAttribute('data-source'));
        imgGal.setAttribute('alt', target.getAttribute('alt'));
    }
}

function closeModalWindow() {
    modalWindow.classList.remove('is-open');
    imgGal.removeAttribute('src');
    imgGal.removeAttribute('alt');
}


function shiftImg(ev) {
    if (ev.code === 'ArrowRight' && imgGal.hasAttribute('src')) {
        if (gallery.lastChild.querySelector('.gallery__image') === target) {
            target = gallery.firstChild.querySelector('.gallery__image');
        }
        else {
        target = target.parentNode.parentNode.nextSibling.querySelector('.gallery__image');
    }
        imgGal.setAttribute('src', target.getAttribute('data-source'));
        imgGal.setAttribute('alt', target.getAttribute('alt'));

    } else if (ev.code === 'ArrowLeft' && imgGal.hasAttribute('src')) {
        if (gallery.firstChild.querySelector('.gallery__image') === target) {
            target = gallery.lastChild.querySelector('.gallery__image');
        } else {
                target = target.parentNode.parentNode.previousSibling.querySelector('.gallery__image');
            }
        imgGal.setAttribute('src', target.getAttribute('data-source'));
        imgGal.setAttribute('alt', target.getAttribute('alt'));
    } else if (ev.code === 'Escape') closeModalWindow();
}

gallery.addEventListener('click', modalWindowEvent);
btnClose.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);
document.addEventListener('keydown', shiftImg);
