const nameInput = document.getElementsByClassName('user-input')[0];
const commentInput = document.getElementsByClassName('user-input')[1];
const addBtn = document.getElementById('addBtn');
const container = document.getElementById('container');
const book = document.querySelector('ul')
const comments = new Map();

// function addComment() {
//     const name = nameInput.value;
//     const comment = commentInput.value;

//     if (name && comment) {
//         const commentDiv = document.createElement('div'); // 이름 및 댓글 내용, 수정 및 삭제버튼이 들어간 공간 
//         const paragraph = document.createElement('p');
//         paragraph.textContent = `${name}: ${comment}`;

//         const editBtn = document.createElement('button');
//         const deleteBtn = document.createElement('button');
//         editBtn.textContent = "수정";
//         deleteBtn.textContent = "삭제";

//         // 수정 버튼 눌렀을때 작동하는 코드
//         editBtn.addEventListener('click', function () {
//             const nameInputField = document.createElement('input');
//             nameInputField.type = 'text';
//             nameInputField.value = name;

//             const commentInputField = document.createElement('input');
//             commentInputField.type = 'text';
//             commentInputField.value = comment;

//             const saveBtn = document.createElement('button');
//             saveBtn.textContent = "저장";

//             // 저장 버튼 눌렀을때 동작하는 코드
//             saveBtn.addEventListener('click', function () {
//                 const updatedName = nameInputField.value;
//                 const updatedComment = commentInputField.value;
//                 paragraph.textContent = `${updatedName}: ${updatedComment}`;
//                 commentDiv.replaceChild(paragraph, nameInputField);
//                 commentDiv.replaceChild(paragraph, commentInputField);
//                 commentDiv.replaceChild(editBtn, saveBtn);  // 저장 버튼을 수정 버튼으로 바꿔주는 코드
//             });

//             commentDiv.replaceChild(nameInputField, paragraph);
//             commentDiv.appendChild(commentInputField);
//             commentDiv.replaceChild(saveBtn, editBtn); // 수정 버튼을 저장 버튼으로 바꿔주는 코드
//         });

//         deleteBtn.addEventListener('click', function () {
//             container.removeChild(commentDiv);
//         });

//         commentDiv.appendChild(paragraph);
//         commentDiv.appendChild(editBtn);
//         commentDiv.appendChild(deleteBtn);

//         container.appendChild(commentDiv);

//         nameInput.value = '';
//         commentInput.value = '';
//     } else {
//         alert('이름과 댓글을 모두 입력하세요!');
//     }
// }

document.addEventListener('DOMContentLoaded', () => {
    addBtn.addEventListener('click', addComment);
    commentInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addComment();
        }
    });
    nameInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addComment();
        }
    });
    book.addEventListener('click', handleBtnClickInPageHeader);
    createBookPage({ name: '1', comment: '2' });
});

function handleBtnClickInPageHeader(e) {
    const target = e.target;
    const name = target.dataset.name;
    const li = target.closest('li');
    const commentId = Number(li.dataset.id);
    const comment = li.querySelector('textarea[data-name=comment]')

    if (target.nodeName === 'BUTTON') {
        if (name === 'delete') {
            li.remove();
            comments.delete(commentId);
            return;
        } else if (name === 'update') {
            comment.readOnly = false;
        } else if (name === 'save') {
            comment.readOnly = true;
            comments.set(commentId, comment.value);
        } else if (name === 'cancel') {
            comment.readOnly = true;
            comment.value = comments.get(commentId);
        }
        toggleAllBtn(li);
    }
}

function toggleAllBtn(li) {
    const buttons = [
        li.querySelector('button[data-name=update]'),
        li.querySelector('button[data-name=delete]'),
        li.querySelector('button[data-name=save]'),
        li.querySelector('button[data-name=cancel]'),
    ]
    buttons.forEach((btn) => $(btn).toggle());
}

function addComment() {
    const name = nameInput.value;
    const comment = commentInput.value;
    if (name && comment) {
        createBookPage({ name, comment });
    } else {
        alert('이름과 댓글을 모두 입력하세요!');
    }
}

function createBookPage(inputData) {
    const page = document.createElement('li');
    const id = new Date().getTime();
    page.classList.add('book__page');
    page.setAttribute('data-id', id)
    page.appendChild(createPageHeader(inputData));
    page.appendChild(createPageContent(inputData));

    document.querySelector('ul').appendChild(page);
    debugger
    comments.set(id,inputData.comment);
}

function createPageHeader({ name }) {
    const pageHeader = document.createElement('div');
    pageHeader.classList.add('page-header');

    const pageHeaderName = document.createElement('div');
    pageHeaderName.classList.add('page-header__name');
    pageHeaderName.textContent = name;

    const pageHeaderDate = document.createElement('div');
    pageHeaderDate.classList.add('page-header__date');
    pageHeaderDate.textContent = `( ${yymmddhhmm()} )`;

    const updateButton = document.createElement('button');
    updateButton.classList += 'btn btn_primary page-header__update';
    updateButton.setAttribute('data-name', 'update');
    updateButton.textContent = '수정';

    const deleteButton = document.createElement('button');
    deleteButton.classList += 'btn btn_delete page-header__delete';
    deleteButton.setAttribute('data-name', 'delete');
    deleteButton.textContent = '삭제';

    const saveButton = document.createElement('button');
    saveButton.classList += 'btn btn_success btn_hide page-header__update';
    saveButton.setAttribute('data-name', 'save');
    saveButton.textContent = '저장';

    const cancelButton = document.createElement('button');
    cancelButton.classList += 'btn btn_delete btn_hide page-header__delete';
    cancelButton.setAttribute('data-name', 'cancel');
    cancelButton.textContent = '취소';

    pageHeader.appendChild(pageHeaderName);
    pageHeader.appendChild(pageHeaderDate);
    pageHeader.appendChild(updateButton);
    pageHeader.appendChild(saveButton);
    pageHeader.appendChild(deleteButton);
    pageHeader.appendChild(cancelButton);
    return pageHeader;
}

function createPageContent({ comment }) {
    const pageContent = document.createElement('div');
    pageContent.classList.add('page-content');

    const pageContentImg = document.createElement('div');
    pageContentImg.classList.add('page-content__img');

    const pageContentMessage = document.createElement('textarea');
    pageContentMessage.classList.add('page-content__comment');
    pageContentMessage.setAttribute('data-name', 'comment');
    pageContentMessage.setAttribute('maxlength', 1000);
    pageContentMessage.value = comment;
    pageContentMessage.readOnly = true;

    pageContent.appendChild(pageContentImg);
    pageContent.appendChild(pageContentMessage);
    return pageContent;
}

function yymmddhhmm() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
}