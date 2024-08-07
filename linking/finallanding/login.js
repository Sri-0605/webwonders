const wrapper=document.querySelector('.wrapper');
const Loginlink=document.querySelector('.login-link');
const registerlink=document.querySelector('.register-link');
const btn=document.querySelector('btnLogin-popup')

registerlink.addEventListener('click',()=>{
    wrapper.classList.add('active');

})

Loginlink.addEventListener('click',()=>{
    wrapper.classList.remove('active');
    
})


