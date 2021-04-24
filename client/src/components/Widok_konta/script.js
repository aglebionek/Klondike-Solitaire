document.getElementById('edit-profile-header').addEventListener('click', function (){
   document.querySelector('.background-modal').style.display = 'flex';
});

document.querySelector('.modal-button-cancel').addEventListener('click',function (){
    document.querySelector('.background-modal').style.display = 'none';
});