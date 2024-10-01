// 댓글 작성란: 댓글(텍스트), 사진(이미지 추가 가능?)
// 등록 버튼을 누르면 다른 div에 추가되는 형식


const userInput = document.getElementById('user-input');
const addBtn = document.getElementById('addBtn');
const container = document.getElementById('container');


addBtn.addEventListener('click', function() {
    const text = userInput.value;
    const paragraph = document.createElement('p'); 
    paragraph.textContent = text; 
    container.appendChild(paragraph); 
    userInput.value = ''; 
});

addBtn.addEventListener('Enter', function() {
    const text = userInput.value;
    const paragraph = document.createElement('p'); 
    paragraph.textContent = text; 
    container.appendChild(paragraph); 
    userInput.value = ''; 
});


