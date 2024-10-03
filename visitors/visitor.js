const nameInput = document.getElementsByClassName('user-input')[0];
const commentInput = document.getElementsByClassName('user-input')[1];
const addBtn = document.getElementById('addBtn');
const container = document.getElementById('container');

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
});

function test() {
}