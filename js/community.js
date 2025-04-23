let totalTokens = 0;
document.addEventListener("DOMContentLoaded", () => {
    function update() {
        totalTokens = parseInt(localStorage.getItem('totalTokens')) || 0; 
    }
    const messagesCont = document.querySelector('.messagesCont');
    messagesCont.scrollTop = messagesCont.scrollHeight;

    update();
    const tokens = document.querySelector('.tokenCount');
    tokens.textContent = totalTokens;

});