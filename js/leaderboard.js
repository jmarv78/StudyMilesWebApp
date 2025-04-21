document.addEventListener('DOMContentLoaded', () => {
    const optionsContainer = document.querySelector('.options');
    const milesContainer = document.querySelector('.miles');

    const dailyContent = `
        <div class="mile">
            <div class="pfpInfo">
                <img src="img/lead1.png">
                <img src="img/icon2/profile3.svg">
                <p>Eyuel</p>
            </div>
            <div class="img">
                <div class="xpEarned">
                    <img src="img/bolt.svg">
                    <p>XP Earned: 150</p>
                </div>
                <div class="tokenEarned">
                    <img src="img/icons/token.png">
                    <p>Token Earned: 30</p>
                </div>
            </div>
        </div>
        
        <div class="mile">
            <div class="pfpInfo">
                <img src="img/lead2.png">
                <img src="img/pfps/pfp1.png">
                <p>Eyuel</p>
            </div>
            <div class="img">
                <div class="xpEarned">
                    <img src="img/bolt.svg">
                    <p>XP Earned: 150</p>
                </div>
                <div class="tokenEarned">
                    <img src="img/icons/token.png">
                    <p>Token Earned: 30</p>
                </div>
            </div>
        </div>
        
        <div class="mile">
            <div class="pfpInfo">
                <img src="img/lead3.png">
                <img src="img/pfps/pfp2.png">
                <p>Eyuel</p>
            </div>
            <div class="img">
                <div class="xpEarned">
                    <img src="img/bolt.svg">
                    <p>XP Earned: 150</p>
                </div>
                <div class="tokenEarned">
                    <img src="img/icons/token.png">
                    <p>Token Earned: 30</p>
                </div>
            </div>
        </div>
        
        <div class="mile">
            <div class="pfpInfo">
                <p>4</p>
                <img src="img/pfps/pfp3.png">
                <p>Eyuel</p>
            </div>
            <div class="img">
                <div class="xpEarned">
                    <img src="img/bolt.svg">
                    <p>XP Earned: 150</p>
                </div>
                <div class="tokenEarned">
                    <img src="img/icons/token.png">
                    <p>Token Earned: 30</p>
                </div>
            </div>
        </div>
        
    `;


    const weeklyContent = `
        <div class="mile">
            <div class="pfpInfo">
                <img src="img/lead1.png">
                <img src="img/icon2/profile3.svg">
                <p>Eyuel</p>
            </div>
            <div class="img">
                <div class="xpEarned">
                    <img src="img/bolt.svg">
                    <p>XP Earned: 150</p>
                </div>
                <div class="tokenEarned">
                    <img src="img/icons/token.png">
                    <p>Token Earned: 30</p>
                </div>
            </div>
        </div>
        
        <div class="mile">
            <div class="pfpInfo">
                <img src="img/lead2.png">
                <img src="img/pfps/pfp1.png">
                <p>Eyuel</p>
            </div>
            <div class="img">
                <div class="xpEarned">
                    <img src="img/bolt.svg">
                    <p>XP Earned: 150</p>
                </div>
                <div class="tokenEarned">
                    <img src="img/icons/token.png">
                    <p>Token Earned: 30</p>
                </div>
            </div>
        </div>
        
        <div class="mile">
            <div class="pfpInfo">
                <img src="img/lead3.png">
                <img src="img/pfps/pfp2.png">
                <p>Eyuel</p>
            </div>
            <div class="img">
                <div class="xpEarned">
                    <img src="img/bolt.svg">
                    <p>XP Earned: 150</p>
                </div>
                <div class="tokenEarned">
                    <img src="img/icons/token.png">
                    <p>Token Earned: 30</p>
                </div>
            </div>
        </div>
        
    `;

    const alltimeContent = `
        <div class="mile">
            <div class="pfpInfo">
                <img src="img/lead1.png">
                <img src="img/icon2/profile3.svg">
                <p>Eyuel</p>
            </div>
            <div class="img">
                <div class="xpEarned">
                    <img src="img/bolt.svg">
                    <p>XP Earned: 150</p>
                </div>
                <div class="tokenEarned">
                    <img src="img/icons/token.png">
                    <p>Token Earned: 30</p>
                </div>
            </div>
        </div>
        
        <div class="mile">
            <div class="pfpInfo">
                <img src="img/lead2.png">
                <img src="img/pfps/pfp1.png">
                <p>Eyuel</p>
            </div>
            <div class="img">
                <div class="xpEarned">
                    <img src="img/bolt.svg">
                    <p>XP Earned: 150</p>
                </div>
                <div class="tokenEarned">
                    <img src="img/icons/token.png">
                    <p>Token Earned: 30</p>
                </div>
            </div>
        </div>
        
        
    `;


    milesContainer.innerHTML = dailyContent;


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
            if (e.target.textContent.trim() === "Daily") {
                milesContainer.innerHTML = dailyContent;
            } else if (e.target.textContent.trim() === "Weekly") {
                milesContainer.innerHTML = weeklyContent;
            }else if (e.target.textContent.trim() === "All time") {
                milesContainer.innerHTML = alltimeContent;
            }
        }
    });
});