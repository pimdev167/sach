let users = JSON.parse(localStorage.getItem("users")) || [];
function saveToUser() {
  localStorage.setItem("users", JSON.stringify(users));
}
let timeOutDelete;
let timeOutFix;
renderUser();
function removeFromToUser(userDeleteId) {
  const newUser = []; 
  users.forEach((user) => {
    if(user.id !== userDeleteId) {
      newUser.push(user);
    }
  });
  users = newUser;
  saveToUser();
      clearTimeout(timeOutDelete);
      const containerMessage = document.querySelector('.container-message-heart');
      containerMessage.style.transform = 'translateX(320px)';
      containerMessage.style.opacity = '1';
      timeOutDelete = setTimeout(() => {
        containerMessage.style.opacity = '0';
        containerMessage.style.transform = 'translateX(-330px)';
      }, 1500);
}
function updateFromToUser(userFixId) {
  const userToFix = users.find(user => user.id === parseInt(userFixId));
  document.querySelector('.modal-title').innerText = `Chỉnh sửa người dùng: ${userToFix.id}`;
  document.querySelector('.modal-body').innerHTML = `
    <div class="mb-3">
      <label for="phoneUser" class="form-label">Số điện thoại</label>
      <input type="text" class="form-control" id="phoneUserFix" value="${userToFix.phoneUser}">
    </div>
    <div class="mb-3">
      <label for="passwordUser" class="form-label">Mật khẩu</label>
      <input type="text" class="form-control" id="passwordUserFix" value="${userToFix.passWordUser}">
    </div>
  `;

  const myModal = new bootstrap.Modal(document.getElementById('modalFixUser'));
  myModal.show();

  const fixSaveBtn = document.getElementById("fixSave");
  const newFixSaveBtn = fixSaveBtn.cloneNode(true);
  fixSaveBtn.replaceWith(newFixSaveBtn);

  newFixSaveBtn.addEventListener('click', () => {
    const phoneUserFix = document.getElementById('phoneUserFix').value;
    const passwordUserFix = document.getElementById('passwordUserFix').value;
    
    let testPhoneUserFix = true;
    users.forEach((user) => {
      if (user.phoneUser === phoneUserFix && user.id !== parseInt(userFixId)) {
        testPhoneUserFix = false;
      }
    });
    if (testPhoneUserFix) {
      users.forEach((user) => {
        if (user.id === parseInt(userFixId)) {
          user.phoneUser = phoneUserFix;
          user.passWordUser = passwordUserFix;
        }
      });
      saveToUser();
      myModal.hide();
      clearTimeout(timeOutFix);
      const containerMessageSave = document.querySelector('.container-message-save');
      containerMessageSave.style.transform = 'translateX(320px)';
      containerMessageSave.style.opacity = '1';
      timeOutFix = setTimeout(() => {
        containerMessageSave.style.opacity = '0';
        containerMessageSave.style.transform = 'translateX(-330px)';
      }, 1500);
      renderUser(); 
    } else {
      alert("Tên tài khoản đã tồn tại!");
    }
  });
}

function renderUser() {
  const usersInfo = document.querySelector('.users-info');
  let todoUsers = "";
  let numberRow = 0;
  users.forEach((user) => {
    numberRow++;
    todoUsers += `
      <tr>
        <th scope="row">${numberRow}</th>
        <td>${user.id}</td>
        <td>${user.phoneUser}</td>
        <td>${user.passWordUser}</td>
        <td>
          <button type="button" class="fix-btn btn btn-warning mx-2" data-user=${user.id}>Sửa</button>
          <button  type="button" class="delete-btn btn btn-danger mx-2"  data-user=${user.id}>Xóa</button>
        </td>
      </tr>
    `
  });
  usersInfo.innerHTML = todoUsers;
  document.querySelectorAll('.delete-btn').forEach((fixBtn) => {
    fixBtn.addEventListener('click', () => {
      const userDeleteId = parseInt(fixBtn.dataset.user);
      removeFromToUser(userDeleteId);
      renderUser();
    });
  });
  document.querySelectorAll('.fix-btn').forEach((fixBtn) => {
    fixBtn.addEventListener('click', () => {
      const userFixId = fixBtn.dataset.user;
      updateFromToUser(userFixId);
    })
  });
}

