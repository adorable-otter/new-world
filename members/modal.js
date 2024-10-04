const member1 = document.getElementById('member1');
const member2 = document.getElementById('member2');
const member3 = document.getElementById('member3');
const member4 = document.getElementById('member4');
const member5 = document.getElementById('member5');
const modalCloseButton1 = document.getElementById('modalCloseButton1');
const modalCloseButton2 = document.getElementById('modalCloseButton2');
const modalCloseButton3 = document.getElementById('modalCloseButton3');
const modalCloseButton4 = document.getElementById('modalCloseButton4');
const modalCloseButton5 = document.getElementById('modalCloseButton5');
const modal1 = document.getElementById('modalContainer1');
const modal2 = document.getElementById('modalContainer2');
const modal3 = document.getElementById('modalContainer3');
const modal4 = document.getElementById('modalContainer4');
const modal5 = document.getElementById('modalContainer5');

member1.addEventListener('click', () => {
    $('#modalContainer1').toggle();
});

member2.addEventListener('click', () => {
    $('#modalContainer2').toggle();
});

member3.addEventListener('click', () => {
    $('#modalContainer3').toggle();
});

member4.addEventListener('click', () => {
    $('#modalContainer4').toggle();
});

member5.addEventListener('click', () => {
    $('#modalContainer5').toggle();
});

modalCloseButton1.addEventListener('click', () => {
    $('#modalContainer1').toggle();
});

modalCloseButton2.addEventListener('click', () => {
    $('#modalContainer2').toggle();
});

modalCloseButton3.addEventListener('click', () => {
    $('#modalContainer3').toggle();
});

modalCloseButton4.addEventListener('click', () => {
    $('#modalContainer4').toggle();
});

modalCloseButton5.addEventListener('click', () => {
    $('#modalContainer5').toggle();
});