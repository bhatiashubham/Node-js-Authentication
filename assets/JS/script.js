let profile = document.getElementById('profile');
let dropdown = document.getElementById('dropdown');
let xmark = document.getElementById('X-mark')
function myfuntion(){
    dropdown.style.opacity = '1';
}
xmark.addEventListener('click', ()=>{
    dropdown.style.opacity = '0';
    // dropdown.style.animation = 'else-in-out 1s'
})
profile.addEventListener('click', myfuntion);