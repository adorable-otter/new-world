const nameInput = document.getElementsByClassName('user-input')[0];
const commentInput = document.getElementsByClassName('user-input')[1];
const addBtn = document.getElementById('addBtn');
const container = document.getElementById('container'); // 댓글이 추가 될 div (댓글이 추가될 부분) 큰 박스
let comments = []; // 댓글 데이터를 저장할 배열 생성

document.addEventListener('DOMContentLoaded', () => { // 페이지가 로드되면 그 이후에 이벤트가 설정되도록하는 함수, DOM이 준비되기 전에 로딩된는 것을 방지
    addBtn.addEventListener('click', addComment);
    commentInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') addComment();
    });
    nameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') addComment();
    });

    container.addEventListener('click', (e) => {
        const target = e.target; // 실제 클릭된 요소 가르키기
        const div = target.closest('.book__page'); // 클릭된 요소 찾는 구문
        const commentId = parseInt(div.dataset.id);
        const commentTextArea = div.querySelector('textarea'); // div 안에 있는 첫번째 textarea 출력

        if (target.dataset.name === 'delete') {
            removeComment(commentId);
        } else if (target.dataset.name === 'update') {
            editComment(div, commentTextArea);
        } else if (target.dataset.name === 'save') {
            saveComment(commentId, commentTextArea.value);
        } else if (target.dataset.name === 'cancel') {
            cancelEdit(div, commentId);
        }
    });
});

function addComment() {
    const name = nameInput.value;
    const comment = commentInput.value;
    if (name && comment) {
        const commentId = comments.length;
        comments.push({ id: commentId, name, comment });
        renderComment({ id: commentId, name, comment });
        nameInput.value = '';
        commentInput.value = ''; 
    } else {
        alert('이름과 댓글을 모두 입력하세요!');
    }
}

function renderComment({ id, name, comment }) { // id, 이름, 댓글 내용을 받아와 화면에 렌더링 해주는 함수.. 어떻게 구성하지..
    const div = document.createElement('div');
    div.classList.add('book__page');
    div.setAttribute('data-id', id);

    div.innerHTML = ` `; // 아... 동적으로 구성해라..

    container.appendChild(div);
}

function removeComment(id) { 
    comments = comments.filter(comment => comment.id !== id); // 
    const div = document.querySelector(`div[data-id='${id}']`);
    div.remove(); 
}

function editComment(div, commentTextArea) {
    commentTextArea.readOnly = false;
    toggleButtons(div, true); // 수정 버튼 토글
}

function saveComment(id, newComment) {
    const comment = comments.find(comment => comment.id === id);
    comment.comment = newComment;
    const div = document.querySelector(`div[data-id='${id}']`);
    div.querySelector('textarea').value = newComment;
    toggleButtons(div, false); // 저장 후 버튼 상태 변경
}

function cancelEdit(div, id) {
    const comment = comments.find(comment => comment.id === id);
    div.querySelector('textarea').value = comment.comment;
    toggleButtons(div, false); // 취소 후 버튼 상태 변경
}

function toggleButtons(div, editing) { // 버튼을 숨기거나 보여지게 하는 함수.. 구현 필요

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