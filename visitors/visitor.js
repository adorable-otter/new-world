const nameInput = document.getElementsByClassName('user-input')[0];
const commentInput = document.getElementsByClassName('user-input')[1];
const addBtn = document.getElementById('addBtn');
const container = document.getElementById('container');

function addComment() {
    const name = nameInput.value;
    const comment = commentInput.value;

    if (name && comment) {
        const commentDiv = document.createElement('div');
        const paragraph = document.createElement('p');
        paragraph.textContent = `${name}: ${comment}`;

        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        const saveBtn = document.createElement('button');
        const cancelBtn = document.createElement('button');

        editBtn.textContent = "수정";
        deleteBtn.textContent = "삭제";
        saveBtn.textContent = "저장";
        cancelBtn.textContent = "취소";

        const buttonGroup = document.createElement('div'); // 버튼그룹 즉, "수정" , "삭제" , "취소" , "저장" 버튼의 묶음

        // 수정 버튼 눌렀을때 작동하는 코드
        editBtn.addEventListener('click', function() {
            const updatename = document.createElement('input');
            updatename.type = 'text';
            updatename.value = name;

            const updatecomment = document.createElement('input');
            updatecomment.type = 'text';
            updatecomment.value = comment;

            // 저장 버튼 눌렀을때 동작하는 코드, 저장 버튼은 수정 버튼을 눌렀을때만 나오는 코드 따라서 수정버튼 이벤트 코드 안에 있어야 적절함
            saveBtn.addEventListener('click', function() {
                const updatedName = updatename.value;
                const updatedComment = updatecomment.value;
                paragraph.textContent = `${updatedName}: ${updatedComment}`;
                commentDiv.replaceChild(paragraph, updatename); // replaceChiled 구문은 앞 쪽 요소를 추가하고 뒷 쪽 요소를 빼주는 역할을 한다.
                commentDiv.removeChild(updatecomment); // removeChild 구문은 자식요소를 부모요소에서 제외 시켜주는 역할을 한다.
                buttonGroup.replaceChild(editBtn, saveBtn);  // 저장 버튼을 수정 버튼으로 바꿔주는 코드
                buttonGroup.removeChild(cancelBtn);
            });

            // 취소 버튼 눌렀을 때 동작하는 코드, 저장 버튼과 마찬가지로 수정버튼을 눌렀을때만 작동
            cancelBtn.addEventListener('click', function() {
                commentDiv.replaceChild(paragraph, updatename);
                commentDiv.removeChild(updatecomment);
                buttonGroup.replaceChild(editBtn, saveBtn);  // 수정 버튼으로 복구
                buttonGroup.removeChild(cancelBtn);  // 취소 버튼 제거
            });

            commentDiv.replaceChild(updatename, paragraph); // paragraph가 빠지고 updatename이 commentDiv에 추가된다는 의미이다.
            commentDiv.appendChild(updatecomment); // 바로 위 문장에서 paragraph빠졌으므로 또 삭제할 이유가 없다. 따라서 추가만 시켜주면 된다.
            buttonGroup.replaceChild(saveBtn, editBtn);  // 수정 버튼을 저장 버튼으로 바꾸는 코드
            buttonGroup.appendChild(cancelBtn);  // 취소 버튼 추가
        });

        deleteBtn.addEventListener('click', function() {
            container.removeChild(commentDiv);
        });

        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(deleteBtn);

        commentDiv.appendChild(paragraph);
        commentDiv.appendChild(buttonGroup);
        container.appendChild(commentDiv);

        nameInput.value = '';
        commentInput.value = '';
    } else {
        alert('이름과 댓글을 모두 입력하세요!');
    }
}

addBtn.addEventListener('click', addComment);

commentInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addComment();
    }
});

nameInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addComment();
    }
});