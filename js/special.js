import { cart } from "../data/cart.js";
import {sign, login, checkAfterlogin } from "../data/login.js";
let cartDetail = JSON.parse(localStorage.getItem('cartDetail'));
function saveToCart() {
  localStorage.setItem("cartDetail", JSON.stringify(cartDetail));
}
function render(){
  const track = document.querySelector('.carousel-track');
  const prevButton = document.querySelector('.prev-btn');
  const nextButton = document.querySelector('.next-btn');
  let currentIndex = 1;
  let HTML = ``;
  for(let i = 30; i < 46; i ++){
    HTML += `
    <div class="slide"><img src="${cart[i].img}" alt="Book 1"></div>
    `
  }
  track.innerHTML = HTML;
  const slides = Array.from(track.children);

  function readBook() {
    const readBtn = document.querySelector(".read-book");
    readBtn.addEventListener("click", () => {
        const bookId = readBtn.dataset.bookId;
        console.log(bookId);
        if (cartDetail.length !== 0) {
          cartDetail = [];
          saveToCart();
        }
        cart.forEach((book) => {
          if (book.id === bookId) {
            cartDetail.push(book);
            saveToCart();
          }
        });
      });
  }
  function icon() {
    const iconHeart = document.querySelector('.js-icon-heart');
    const iconSave = document.querySelector('.js-icon-save');
    let timeOut;
    let timeOutSave;
    let isToggleIconHeart = true;
    let isToggleIconSave = true;
  
    iconHeart.addEventListener('click', () => {
      let HTMLiconHeart = ``;
      if (isToggleIconHeart) {
        clearTimeout(timeOut);
        HTMLiconHeart = `<i style="color: green;" class="fa-solid fa-heart"></i>`;
        iconHeart.innerHTML = HTMLiconHeart;
        isToggleIconHeart = false;
        const containerMessage = document.querySelector('.container-message-heart');
        containerMessage.style.transform = 'translateX(346px)';
        containerMessage.style.opacity = '1';
        timeOut = setTimeout(() => {
          containerMessage.style.opacity = '0';
          containerMessage.style.transform = 'translateX(-346px)';
        }, 2500);
      } else {
        HTMLiconHeart = `<i class="fa-regular fa-heart"></i>`;
        iconHeart.innerHTML = HTMLiconHeart;
        isToggleIconHeart = true;
      }
    });
  
    iconSave.addEventListener('click', () => {
      let HTMLiconSave = ``;
      if (isToggleIconSave) {
        clearTimeout(timeOutSave);
        HTMLiconSave = `<i style="color: green;" class="fa-solid fa-share-nodes"></i>`;
        iconSave.innerHTML = HTMLiconSave;
        isToggleIconSave = false;
        const containerMessageSave = document.querySelector('.container-message-save');
        containerMessageSave.style.transform = 'translateX(346px)';
        containerMessageSave.style.opacity = '1';
        timeOutSave = setTimeout(() => {
          containerMessageSave.style.opacity = '0';
          containerMessageSave.style.transform = 'translateX(-346px)';
        }, 2500);
      } else {
        HTMLiconSave = `<i class="fa-solid fa-share-nodes"></i>`;
        iconSave.innerHTML = HTMLiconSave;
        isToggleIconSave = true;
      }
    });
  }
  function updateSlides() {
      const activeSlide = slides[currentIndex];
      const prevSlide = slides[(currentIndex - 1 + slides.length) % slides.length];
      const nextSlide = slides[(currentIndex + 1) % slides.length];
  
      slides.forEach(slide => slide.classList.remove('prev', 'active', 'next'));
  
      prevSlide.classList.add('prev');
      activeSlide.classList.add('active');
      nextSlide.classList.add('next');
      let countContent = 30;
      countContent += currentIndex;
      const HTMLcontent = `
        <p class="content-book">${cart[countContent].content}</p>
          </div>
      `
      document.querySelector('.content').innerHTML = HTMLcontent;
      const HTMLtitle = `
            <h3 class="title-book">${cart[countContent].title}</h3>
      `
      document.querySelector('.title').innerHTML = HTMLtitle;
      const attribute = document.querySelector('.attribute');
      const HTMLAtribute = `
          <a href="book-read.html">
          <button class="read-book" data-book-id="${cart[countContent].id}"><i class="fa-solid fa-book-open-reader"></i> Đọc sách</button>
          </a>
          <div class="icon-like js-icon-heart">
            <i class="fa-regular fa-heart"></i>
          </div>
          <div class="icon-save js-icon-save">
            <i class="fa-solid fa-share-nodes"></i>
          </div>
      `
      attribute.innerHTML = HTMLAtribute;
      readBook();
      icon();

  }
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  });

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
  });
  function showDetail() {
    document.querySelectorAll(".show-detail").forEach((button) => {
      button.addEventListener("click", () => {
        const bookId = button.dataset.bookId;
        if (cartDetail.length !== 0) {
          cartDetail = [];
          saveToCart();
        }
        cart.forEach((book) => {
          if (book.id === bookId) {
            cartDetail.push(book);
            saveToCart();
            console.log(cartDetail);
          }
        });
      });
    });
  }

  function categoryBook(){
    let HTMLkinhdi = ``;
    for (let i = 47; i < 52; i++) {
      HTMLkinhdi += `
      <div class="book-item">
          <img src="${cart[i].img}">
          <h3>${cart[i].title}</h3>
          <p>Tác giả: ${cart[i].author}</p>
          <p>Thể loại: ${cart[i].category}</p>
          <a href="book-read.html" >
              <button class="show-detail" data-book-id="${
                i + 1
              }">Chi Tiết</button>
          </a>
      </div>
      `;
    }
    const containerBookKinhDi = document.querySelector('.container-book-kinh-di');
    containerBookKinhDi.innerHTML = HTMLkinhdi;
    let HTMLvanhoc = ``;
    for (let i = 51; i < 56; i++) {
      HTMLvanhoc += `
        <div class="book-item">
          <img src="${cart[i].img}">
          <h3>${cart[i].title}</h3>
          <p>Tác giả: ${cart[i].author}</p>
          <p>Thể loại: ${cart[i].category}</p>
          <a href="book-read.html" >
              <button class="show-detail" data-book-id="${
                i + 1
              }">Chi Tiết</button>
          </a>
        </div>
      `;
    }
    console.log(cart[52].title);
    const containerBookVanHoc = document.querySelector('.container-book-van-hoc');
    containerBookVanHoc.innerHTML = HTMLvanhoc;
    showDetail();
  }
  categoryBook();
  checkAfterlogin();
  updateSlides(); 
  sign();
  login();
}
render();
