document.addEventListener('DOMContentLoaded', () => {
    const optionsContainer = document.querySelector('.options');
    const milesContainer = document.querySelector('.miles');

    const ongoingContent = `
        <div class="mile">
            <p>Complete the assignment before deadline</p>
            <div class="img">
                +2<img src="img/icons/token.png" alt="">
            </div>
        </div>
        <div class="mile">
            <p>Conquer Planet Mars</p>
            <div class="img">
                +2<img src="img/icons/token.png" alt="">
            </div>
        </div>
        <div class="mile">
            <p>Day 3 Streak</p>
            <div class="img">
                +2<img src="img/icons/token.png" alt="">
            </div>
        </div>
    `;


    const completedContent = `
        <div class="mile">
            <p>Completed Challenge 1: Finish the first lesson</p>
            <div class="img">
                +3<img src="img/icons/token.png" alt="">
            </div>
        </div>
        <div class="mile">
            <p>Completed Challenge 2: Day 2 Streak</p>
            <div class="img">
                +5<img src="img/icons/token.png" alt="">
            </div>
        </div>
        
    `;


    milesContainer.innerHTML = ongoingContent;


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
            if (e.target.textContent.trim() === "Ongoing Challenges") {
                milesContainer.innerHTML = ongoingContent;
            } else if (e.target.textContent.trim() === "Completed") {
                milesContainer.innerHTML = completedContent;
            }
        }
    });
});