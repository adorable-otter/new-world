const member1 = document.getElementById('member1');
const member2 = document.getElementById('member2');
const member3 = document.getElementById('member3');
const member4 = document.getElementById('member4');
const member5 = document.getElementById('member5');
const modalCloseButton = document.getElementById('modalCloseButton');
const modal = document.getElementById('modalContainer');

member1.addEventListener('click', () => {
    $('#modalContainer').toggle();
});

member2.addEventListener('click', () => {
    $('#modalContainer').toggle();
});

member3.addEventListener('click', () => {
    $('#modalContainer').toggle();
});

member4.addEventListener('click', () => {
    $('#modalContainer').toggle();
});

member5.addEventListener('click', () => {
    $('#modalContainer').toggle();
});

modalCloseButton.addEventListener('click', () => {
    $('#modalContainer').toggle();
});