import { cart } from "../data/cart.js";
import { login, sign, checkAfterlogin} from "../data/login.js";
export let cartDetail = [];
function saveToCart() {
  localStorage.setItem("cartDetail", JSON.stringify(cartDetail));
}

function render() {
  checkAfterlogin();
  const containerSearch = document.querySelector(".container-search");
  containerSearch.style.display = "none";
  let HTML = ``;
  for (let i = 5; i < 15; i++) {
    HTML += `
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
  document.querySelector(".container-book").innerHTML = HTML;
  let HTML1 = ``;
  for (let i = 15; i < 25; i++) {
    HTML1 += `
    <div class="book-item">
        <img src="${cart[i].img}">
        <h3>${cart[i].title}</h3>
        <p>Tác giả: ${cart[i].author}</p>
        <p>Thể loại: ${cart[i].category}</p>
        <a href="book-read.html">
            <button class="show-detail" data-book-id="${
              i + 1
            }">Chi Tiết</button>
        </a>
    </div>
    `;
  }
  let thuVienDeXuat = document.querySelector(".thu_vien_de_xuat");
  thuVienDeXuat.querySelector(".container-book").innerHTML = HTML1;
  let HTML2 = ``;
  for (let i = 25; i < 30; i++) {
    HTML2 += `
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
  const sach_dang_xem = document.querySelector(".sach_dang_xem");
  sach_dang_xem.querySelector(".container-book").innerHTML = HTML2;
  const container = document.querySelector(".container-book");
  let currentSlide = 0;
  const totalSlides = 10;
  const slidesToShow = 5;
  document.querySelector(".js-arrow-right").addEventListener("click", () => {
    if (currentSlide < totalSlides - slidesToShow) {
      currentSlide += slidesToShow;
      container.style.transform = `translateX(-${currentSlide * 300}px)`;
    }
  });
  document.querySelector(".js-arrow-left").addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide -= slidesToShow;
      container.style.transform = `translateX(-${currentSlide * 300}px)`;
    }
  });
  let currentSlide1 = 0;
  const totalSlides1 = 10;
  const slidesToShow1 = 5;
  const thu_vien_de_xuat = document.querySelector(".thu_vien_de_xuat");
  let containerThuVien = thu_vien_de_xuat.querySelector(".container-book");

  thu_vien_de_xuat
    .querySelector(".js-arrow-right")
    .addEventListener("click", () => {
      if (currentSlide1 < totalSlides1 - slidesToShow1) {
        currentSlide1 += slidesToShow1;
        containerThuVien.style.transform = `translateX(-${
          currentSlide1 * 300
        }px)`;
      }
    });
  thu_vien_de_xuat
    .querySelector(".js-arrow-left")
    .addEventListener("click", () => {
      if (currentSlide1 > 0) {
        currentSlide1 -= slidesToShow1;
        containerThuVien.style.transform = `translateX(-${
          currentSlide1 * 300
        }px)`;
      }
    });
  function showDetail() {
    document.querySelectorAll(".show-detail").forEach((button) => {
      button.addEventListener("click", () => {
        const bookId = button.dataset.bookId;
        console.log(bookId);
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
  showDetail();
  function search() {
    const input = document.querySelector(".search-input");
    const search = document.querySelector(".icon-search");
    const deleteValue = document.querySelector(".delete_value");
    deleteValue.style.visibility = "hidden";
    input.value = ``;
    input.classList.toggle("active");
    search.classList.toggle("active");
    input.addEventListener("keyup", () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => (section.style.display = "none"));
      const containerSearch = document.querySelector(".container-search");
      containerSearch.style.display = "block";
      const containerBookSearch = document.querySelector(
        ".container-book-search"
      );
      const containerNotFind = document.querySelector(".not-find");
      const showResult = document.querySelector(".show-result");
      deleteValue.addEventListener("click", () => {
        input.value = ``;
        deleteValue.style.visibility = "hidden";
        sections.forEach((section) => (section.style.display = "block"));
        containerSearch.style.display = "none";
      });
      let showResultHTML = `
       <div class="icon-find">
                  <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <div class="result">
                  <h2>Kết quả tìm kiếm cho "<span>${input.value}</span>"</h2>
              </div>
      `;
      showResult.innerHTML = showResultHTML;
      if (input.value === "") {
        deleteValue.style.visibility = "hidden";
        sections.forEach((section) => (section.style.display = "block"));
        containerSearch.style.display = "none";
      } else {
        deleteValue.style.visibility = "visible";
      }
      const searchBook = input.value.toLowerCase();
      const results = cart.filter((book) =>
        book.title.toLowerCase().includes(searchBook)
      );
      if (searchBook) {
        if (results.length > 0) {
          const searchHTML = `
            <div class="book-search">
                <img src="${results[0].img}">
                <h3>${results[0].title}</h3>
                <p>Tác giả: ${results[0].author}</p>
                <p>Thể loại: ${results[0].category}</p>
                <a href="book-read.html" >
                    <button class="show-detail" data-book-id="${results[0].id}">Chi Tiết</button>
                </a>
            </div>  
          `;
          containerBookSearch.innerHTML = searchHTML;
          containerNotFind.innerHTML = ``;
          showDetail();
        } else {
          containerBookSearch.innerHTML = ``;
          containerNotFind.innerHTML = ` 
            <i class="fa-solid fa-magnifying-glass"></i>
            <p>Không tìm thấy kết quả nào liên quan</p>
            <p style="color: rgb(137, 137, 137);">Bạn vui lòng thay đổi từ khóa, giá trị phù hợp</p>`;
        }
      }
    });
  }
  document.querySelector(".fa-magnifying-glass")
  .addEventListener("click", () => {
    search();
  });
  login();
  sign();
}
render();



