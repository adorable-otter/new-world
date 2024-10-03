const nameInput = document.getElementsByClassName('user-input')[0];
const commentInput = document.getElementsByClassName('user-input')[1];
const addBtn = document.getElementById('addBtn');
const container = document.getElementById('container');

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

function addComment() {
    const name = nameInput.value;
    const comment = commentInput.value;

    if (name && comment) {
        const commentDiv = document.createElement('div'); // 이름 및 댓글 내용, 수정 및 삭제버튼이 들어간 공간 
        const paragraph = document.createElement('p');
        paragraph.textContent = `${name}: ${comment}`;

        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        editBtn.textContent = "수정";
        deleteBtn.textContent = "삭제";

        // 수정 버튼 눌렀을때 작동하는 코드
        editBtn.addEventListener('click', function () {
            const nameInputField = document.createElement('input');
            nameInputField.type = 'text';
            nameInputField.value = name;

            const commentInputField = document.createElement('input');
            commentInputField.type = 'text';
            commentInputField.value = comment;

            const saveBtn = document.createElement('button');
            saveBtn.textContent = "저장";

            // 저장 버튼 눌렀을때 동작하는 코드
            saveBtn.addEventListener('click', function () {
                const updatedName = nameInputField.value;
                const updatedComment = commentInputField.value;
                paragraph.textContent = `${updatedName}: ${updatedComment}`;
                commentDiv.replaceChild(paragraph, nameInputField);
                commentDiv.replaceChild(paragraph, commentInputField);
                commentDiv.replaceChild(editBtn, saveBtn);  // 저장 버튼을 수정 버튼으로 바꿔주는 코드
            });

            commentDiv.replaceChild(nameInputField, paragraph);
            commentDiv.appendChild(commentInputField);
            commentDiv.replaceChild(saveBtn, editBtn); // 수정 버튼을 저장 버튼으로 바꿔주는 코드
        });

        deleteBtn.addEventListener('click', function () {
            container.removeChild(commentDiv);
        });

        commentDiv.appendChild(paragraph);
        commentDiv.appendChild(editBtn);
        commentDiv.appendChild(deleteBtn);

        container.appendChild(commentDiv);

        nameInput.value = '';
        commentInput.value = '';
    } else {
        alert('이름과 댓글을 모두 입력하세요!');
    }
}

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

document.addEventListener('DOMContentLoaded', () => {
    createBookPage();
});

function createBookPage() {
    const page = document.createElement('li');
    page.classList.add('book__page');
    page.appendChild(createPageHeader());
    page.appendChild(createPageContent());
    
    document.querySelector('ul').appendChild(page);
}

function createPageHeader() {
    const pageHeader = document.createElement('div');
    pageHeader.classList.add('page_header');
    
    const pageHeaderName = document.createElement('div');
    pageHeaderName.classList.add('page_header__name');
    pageHeaderName.textContent = '신상용';
    
    const pageHeaderDate = document.createElement('div');
    pageHeaderDate.classList.add('page_header__date');
    pageHeaderDate.textContent = '( 24.10.03 10:00 )';
    
    const updateButton = document.createElement('button');
    updateButton.classList.add('page_header__update');
    updateButton.textContent = '수정';
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('page_header__delete');
    deleteButton.textContent = '삭제';

    pageHeader.appendChild(pageHeaderName);
    pageHeader.appendChild(pageHeaderDate);
    pageHeader.appendChild(updateButton);
    pageHeader.appendChild(deleteButton);
    return pageHeader;
}

function createPageContent() {
    const pageContent = document.createElement('div');
    pageContent.classList.add('page_content');
    
    const pageContentImg = document.createElement('div');
    pageContentImg.classList.add('page_content__img');
    
    const pageContentMessage = document.createElement('div');
    pageContentMessage.classList.add('page_content__mesage');
    pageContentMessage.innerHTML = '안녕 나는 상용핑 <br> 아재개그를 좋아해 핑';
    
    pageContent.appendChild(pageContentImg);
    pageContent.appendChild(pageContentMessage);
    return pageContent;
}