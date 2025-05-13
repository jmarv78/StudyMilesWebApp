let totalTokens;
document.addEventListener('DOMContentLoaded', () => {
    function update() {
        totalTokens = parseInt(localStorage.getItem('totalTokens')) || 0; 
    }

    update();
    const tokens = document.querySelector('.tokenCount');
    tokens.textContent = totalTokens;

    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active'); // Toggle the 'active' class on the nav bar
    });
});