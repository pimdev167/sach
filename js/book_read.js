import { login, sign, checkAfterlogin } from "../data/login.js";
const cartDetail = JSON.parse(localStorage.getItem('cartDetail'));
const cartComment = JSON.parse(localStorage.getItem('cartComment')) || [];
function saveToComment(){
 localStorage.setItem("cartComment",JSON.stringify(cartComment));
}
function renderDetail() {
  commentOfUser();
  const img = `
    <img src="${cartDetail[0].img}" alt="">
  `;
  document.querySelector('.img-item').innerHTML = img;

  const title = `
    <h3 class="title">${cartDetail[0].title}</h3>
  `;
  document.querySelector('.title-container').innerHTML = title;

  const HTML = `
    <div class="container-inf">
      <div class="author_nha_xuat_ban">
        <span class="author">Tác giả</span>
        <span class="name_author">${cartDetail[0].author}</span>
        <span class="nha_xuat_ban">Nhà xuất bản</span>
        <span class="name_nha_xuat_ban">${cartDetail[0].bookPublisher}</span>
      </div>
      <div class="container-service">
        <span class="category">Thể loại</span>
        <span class="name_category">${cartDetail[0].category}</span>
        <span class="package">Gói cước</span>
        <span class="name_package">Mua lẻ</span>
      </div>
    </div>
  `;
  document.querySelector('.container-full-inf').innerHTML = HTML;

  const content = `
    <div class="container-content">
      <p class="content">${cartDetail[0].content}</p>
    </div>
    <div class="moreOrShorten js-moreOrShorten">...Xem thêm</div>
    <p class="review">Độc giả nói gì về "${cartDetail[0].title}"</p>
  `;
  document.querySelector('.container-full-content').innerHTML = content;

  const containerContent = document.querySelector('.container-content');
  const moreOrShorten = document.querySelector('.js-moreOrShorten');
  let isToggle = true;
  moreOrShorten.addEventListener('click', () => {
    containerContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (isToggle) {
      containerContent.style.maxHeight = "500px";
      moreOrShorten.textContent = "Rút gọn";
      isToggle = false;
    } else {
      containerContent.style.maxHeight = "40px";
      moreOrShorten.textContent = "...Xem thêm";
      isToggle = true;
    }
  });
  
  const comment = document.querySelector('.js-comment');
  const review = document.querySelector('.js-review');
  const containerComment = document.querySelector('.img-and-note');
  const containerReview = document.querySelector('.container-reaction-full');
  
  containerComment.style.visibility = "visible";
  containerReview.style.visibility = "hidden";
  comment.style.color = "rgb(29, 194, 155)";
    comment.addEventListener('click', () => {
      containerComment.style.visibility = "visible";
      containerReview.style.visibility = "hidden";
      comment.style.color = "rgb(29, 194, 155)";
      review.style.color = "rgb(139, 138, 138)";
    });
    
    review.addEventListener('click', () => {
      containerReview.style.visibility = "visible";
      containerComment.style.visibility = "hidden";
      review.style.color = "rgb(29, 194, 155)";
      comment.style.color = "rgb(139, 138, 138)";
    });
  document.querySelector('.js-icon-download').addEventListener
  ('click', () => {
    const blob = new Blob([""], { type: 'application/octet-stream' }); 
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'file-rong.txt'; 
    document.body.appendChild(a);
    a.click(); 
    document.body.removeChild(a); 
    URL.revokeObjectURL(url); 
  })
  function commentOfUser() {
    let HTMLcomment = ``;
   const containerShowComment =  document.querySelector('.container-show-comment');
   const img = document.querySelector('.js-img');
   let isToggleComment = false;
   let count = 0;
    cartComment.forEach((element) => {
     if(element.id === cartDetail[0].id){
      count++;
      isToggleComment = true;
      HTMLcomment += `
          <div class="show-comment">
              <div class="img">
              <img src="image_book_special/user.jpg" alt="">
              </div>
              <div class="infomation-of-user">
                  <p class="name-user">User</p>
                  <p class="comment-user">${element.comment}</p>
              </div> 
          </div>
      `;
     }
    });
    if(isToggleComment){
      img.style.visibility = 'hidden';
      containerShowComment.innerHTML = HTMLcomment;
    }
    const countReview = document.querySelector('.js-review');
    countReview.textContent = `Đánh giá & nhận xét(${count})`;
  }
  function handleCommentSubmit() {
    const body = document.querySelector("body");
    const containerComment = document.querySelector('.container-comment');
    const commentInput = document.querySelector('.comment-input');
    if (commentInput.value.trim() !== '') {
        cartComment.unshift({
            id: cartDetail[0].id,
            comment: commentInput.value,
        });
        saveToComment();
        commentInput.value = ''; 
        containerComment.style.visibility = 'hidden';
        body.style.overflowY = "auto";
    }
    commentOfUser();
  }
  function writeComment(){ 
    const body = document.querySelector("body");
    const containerComment = document.querySelector('.container-comment');
    const closeComment = document.getElementById('closeCommentBtn');
    const giveComment = document.querySelector('.give-comment');
    containerComment.style.visibility = 'visible';
    body.style.overflowY = "hidden";
    closeComment.addEventListener('click', () => {
    containerComment.style.visibility = 'hidden';
    body.style.overflowY = "auto";
    })
    document.querySelector('.comment-input').value = '';
    const commentInput = document.querySelector('.comment-input');
    const containerDigits = document.querySelector('.digits');
    commentInput.addEventListener('keydown', () => {
      let countDigits = commentInput.value.length;
      giveComment.style.backgroundColor = 'rgb(29, 194, 155)';
      if(commentInput.value === ''){
      giveComment.style.backgroundColor = '#09392d';
      countDigits = 0;
      }
      containerDigits.innerHTML = `
      <span class="js-count-digits">${countDigits}/50</span>
      `
    });
    giveComment.removeEventListener('click', handleCommentSubmit);
    
    giveComment.addEventListener('click', handleCommentSubmit);
    console.log(cartComment); 
  }
  document.querySelector('.js-read-update-btn').addEventListener
  ('click', () => {
    const user = localStorage.getItem("isLoggedIn") === "true";
    if(user){
      writeComment();
    }else {
     alert('Bạn phải đăng nhập trước khi sử dụng tính năng này');
    }
  })
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
  checkAfterlogin();
  icon();
  login();
  sign();
}
renderDetail();

