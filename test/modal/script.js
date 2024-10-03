const modalOpenButton = document.getElementById('modalOpenButton');
const modalCloseButton = document.getElementById('modalCloseButton');
const modal = document.getElementById('modalContainer');
modal.addEventListener('click', function() {
    
})

modalOpenButton.addEventListener('click', ()=> {
        // modal.classList.remove('hidden');
        // $('#modalContainer').toggle()
        modal.style.display = 'block'         
    });

modalCloseButton.addEventListener('click', ()=> {
        // modal.classList.add('hidden');
        // $('#modalContainer').toggle()
        modal.style.display = 'none'
    });