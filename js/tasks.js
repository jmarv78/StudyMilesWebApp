let totalTokens = 0;
document.addEventListener('DOMContentLoaded', () => {
    function update() {
        totalTokens = parseInt(localStorage.getItem('totalTokens')) || 0; 
    }

    update();
    const tokens = document.querySelector('.tokenCount');
    tokens.textContent = totalTokens;
    
    const optionsContainer = document.querySelector('.options');
    const milesContainer = document.querySelector('.miles');

    const assignmentContent = `
        <div class="mile">
            <p>Assignment 3: x+y in python</p>
            <div class="img">
                +2<img src="img/icons/token.png" alt="">
            </div>
        </div>
        <div class="mile">
            <p>Assignment 2: Defining var in python</p>
            <div class="img">
                +2<img src="img/icons/token.png" alt="">
            </div>
        </div>
        <div class="mile complete">

            <p><img src="img/done.png" alt="" class="done">Assignmnet 1: "Hello World" in python</p>
            <div class="img">
                +2<img src="img/icons/token.png" alt="">
            </div>
        </div>
    `;


    const peerReviewContent = `
        <div class="mile">
            <p>Peer review 2</p>
            <div class="img">
                +3<img src="img/icons/token.png" alt="">
            </div>
        </div>
        <div class="mile">
            <p>Peer Review 1</p>
            <div class="img">
                +5<img src="img/icons/token.png" alt="">
            </div>
        </div>
        
    `;


    milesContainer.innerHTML = assignmentContent;


    optionsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'H3') {
            // Toggle classes for visual indication
            const options = optionsContainer.querySelectorAll('h3');
            options.forEach(item => {
                item.classList.remove('select');
                item.classList.add('unselect');
            });
            e.target.classList.remove('unselect');
            e.target.classList.add('select');

            // Change the content based on the selected option
            if (e.target.textContent.trim() === "Assignments") {
                milesContainer.innerHTML = assignmentContent;
            } else if (e.target.textContent.trim() === "Peer Reviews") {
                milesContainer.innerHTML = peerReviewContent;
            }
        }
    });
});