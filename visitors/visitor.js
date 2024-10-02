const nameInput = document.getElementsByClassName('user-input')[0]; // 첫 번째 입력 필드 (이름)
const commentInput = document.getElementsByClassName('user-input')[1]; // 두 번째 입력 필드 (댓글)
const addBtn = document.getElementById('addBtn');
const container = document.getElementById('container');

// addBtn.addEventListener('click', function() {
//     const name = nameInput.value; // 이름 입력값
//     const comment = commentInput.value; // 댓글 입력값
//     const paragraph = document.createElement('p'); // 문단(p)생성, 문단을 생성하지 않으면 댓글을 입력할때마다 초기화됨.. 

//     paragraph.textContent = `${name}: ${comment}`;  // 문자열로 연결하여 출력

//     container.appendChild(paragraph); // 문단(자식요소)를 컨테이너(부모요소)에 넣어 화면에 출력하는 기능
//     nameInput.value = ''; // 값 초기화
//     commentInput.value = ''; // 값 초기화
// });

// commentInput.addEventListener('keydown', function(event) {
//     if (event.key === 'Enter') { // event.key의 역할은 사용자의 입력값을 문자열로 반환해준다. 
//         const name = nameInput.value;
//         const comment = commentInput.value;
//         const paragraph = document.createElement('p');

//         paragraph.textContent = `${name}: ${comment}`;

//         container.appendChild(paragraph);
//         nameInput.value = '';
//         commentInput.value = '';
//     }
// });

function addComment() {
    const name = nameInput.value;
    const comment = commentInput.value;

    if (name && comment) { // 이름과 댓글이 모두 입력된 경우에만 댓글을 추가하는 함수
        const editBtn = document.createElement('button'); // 그 다음 아이디어가.. 떠오르지 않아.. 댓글창을 묶을 div도 하나 만들어야 겠고 그 div 안에서수정 삭제 버튼도 보이게 만들어야 하고
        const deleteBtn = document.createElement('button');
        const paragraph = document.createElement('p');
        paragraph.textContent = `${name}: ${comment}`;
        container.appendChild(paragraph);
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

// 남은 과제
// 1. 댓글창에 '수정' , '삭제' 할 수 있는 기능 구현
// 2. 메인페이지와 어울릴 적절한 CSS 구현 등
// 3. 댓글을 올렸을때 CSS 구현(싸이월드 미니홈피), 샘플 댓글창
// 4. 숫자가 들어가도 댓글이 올라간다..