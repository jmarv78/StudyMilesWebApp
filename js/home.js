import { LESes } from './data.js';

let totalTokens = 0;

let completedLessons = {
    section1: [false, false, false],
    section2: [false, false, false],
    section3: [false, false, false]
    // Add more sections if needed...
};

let completedPercentage = [0, 0, 0];



let currentSection = 0;
let currentLesson = 0;

document.addEventListener("DOMContentLoaded", () => {
    function saveProgressToLocalStorage() {
        localStorage.setItem('currentSection', currentSection);
        localStorage.setItem('currentLesson', currentLesson);
        localStorage.setItem('totalTokens', totalTokens);
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
        localStorage.setItem('completedPercentage', JSON.stringify(completedPercentage));
    }
    function loadProgressFromLocalStorage() {
        currentSection = parseInt(localStorage.getItem('currentSection')) || 0; // Default to 0 if not set
        currentLesson = parseInt(localStorage.getItem('currentLesson')) || 0;   // Default to 0 if not set
        totalTokens = parseInt(localStorage.getItem('totalTokens')) || 0;      // Default to 0 if not set
        completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || {
            section1: [false, false, false],
            section2: [false, false, false],
            section3: [false, false, false]
            // Add more sections if needed...
            
        };
        completedPercentage = JSON.parse(localStorage.getItem('completedPercentage')) || [0, 0, 0];
}
    function updateLessonStyles() {
        sections.forEach((section, sectionIndex) => {
            const lessons = section.querySelectorAll('.lesson');
            lessons.forEach((lesson, lessonIndex) => {
                const sectionKey = `section${sectionIndex + 1}`;
                const sectionIn = parseInt(sectionKey.slice(7)) - 1;
                if (
                    completedLessons[sectionKey] &&
                    ((currentSection === sectionIn && currentLesson === lessonIndex) || completedLessons[sectionKey][lessonIndex])
                ) {
                    lesson.style.filter = "none";
                } else {
                    lesson.style.filter = "grayscale(100%)";
                }
            });
        });
    }

    function updateHere() {
        sections.forEach((section, sectionIndex) => {
            const lessons = section.querySelectorAll('.lesson');
            lessons.forEach((lesson, lessonIndex) => {
                const sectionKey = `section${sectionIndex + 1}`;
                const sectionIn = parseInt(sectionKey.slice(7)) - 1;
                const here = lesson.querySelector('.here');
    
                // Check if the .here element exists
                if (!here) {
                    return; // Skip this iteration if .here is not found
                }
    
                if (currentSection === sectionIn && currentLesson === lessonIndex) {
                    here.style.display = "block"; // Show the "you're here" image
                    
                } else {
                    here.style.display = "none"; // Hide the "you're here" image
                }
            });
        });
    }

    
    function updateLockedLessons() {
        sections.forEach((section, sectionIndex) => {
            const lessons = section.querySelectorAll('.lesson');
            lessons.forEach((lesson, lessonIndex) => {
                const sectionKey = `section${sectionIndex + 1}`;
                const sectionIn = parseInt(sectionKey.slice(7)) - 1;
                const compltBtn = lesson.querySelector('.complete'); // Select the button inside the lesson
    
                // Ensure the button exists
                if (!compltBtn) {
                    console.warn(`Complete button not found in lesson ${lessonIndex + 1} of section ${sectionKey}`);
                    return;
                }
    
                // Check if the lesson should be locked
                if (
                    !(currentSection === sectionIn && currentLesson === lessonIndex) ||
                    !completedLessons[sectionKey][lessonIndex]
                ) {
                    // Lock the lesson
                    document.getElementById('modalTitle').textContent = "Locked Lesson";
                    document.getElementById('modalDetails').innerHTML = `
                        <h3>Please Finish Previous Lessons</h3>
                    `;
                    document.getElementById('lessonModal').classList.add('active');
                    document.body.classList.add('modal-active');
                    /* compltBtn.style.display = "none"; */
                } 
            });
        });
    }

    
function triggerSectionCompleteAnimation(sectionIndex) {
    const sectionCompleteAnimation = document.getElementById('sectionCompleteAnimation');
    const planetImage = document.getElementById('planetImage');
    const conquerMessage = document.getElementById('conquerMessage');

    // Set the planet image and message based on the section
    const planets = [
        { name: "Mars", image: "img/marsConquered.png" },
        { name: "Jupiter", image: "img/jupiter2.png" },
        { name: "Uranus", image: "img/uranus.png" }
    ];

    if (planets[sectionIndex - 1]) {
        planetImage.src = planets[sectionIndex - 1].image;
        conquerMessage.textContent = `You have conquered Planet ${planets[sectionIndex - 1].name}!`;
    }

    // Trigger the animation
    sectionCompleteAnimation.style.animation = "growAndFadeSection 2s ease-in-out forwards";

    // Reset the animation after it finishes
    setTimeout(() => {
        sectionCompleteAnimation.style.animation = "none";
    }, 200000);
}

    
    

    console.log('Loaded completedLessons:', completedLessons);

    

    const main = document.querySelector(".main");
    const planet = document.querySelector(".planet");
    const sections = document.querySelectorAll(".section");

    const planetImages = [
        "img/mars.svg",
        "img/jupiter2.png",
        "img/uranus.png"
    ];

    main.addEventListener("scroll", () => {
        sections.forEach((section, index) => {
            const sectionTop = section.getBoundingClientRect().top - main.getBoundingClientRect().top;
            if (sectionTop <= main.clientHeight / 2 && sectionTop >= -main.clientHeight / 2) {
                if (planet.src.indexOf(planetImages[index]) === -1) {
                    planet.src = planetImages[index];
                    planet.style.transition = "all 1s ease";
                }
            }
        });
    });

    const tokenCountElement = document.getElementById('tokenCount'); // Token counter element
    const tokenAnimation = document.getElementById('tokenAnimation');
    const tokenMessage = document.getElementById('tokenMessage');
    
    loadProgressFromLocalStorage();
    updateLessonStyles();
    sections.forEach((section, sectionIndex) => {
        tokenCountElement.textContent = totalTokens;
        const lessons = section.querySelectorAll('.lesson');
        lessons.forEach((lesson, lessonIndex) => {
            const sectionKey = `section${sectionIndex + 1}`;
            const lessonData = LESes[sectionKey] && LESes[sectionKey][lessonIndex];
            const sectionIn = parseInt(sectionKey.slice(7)) - 1;

            if (lessonData) {
                // Create the description element
                let descElement = document.createElement('div');
                descElement.classList.add('desc');
                descElement.innerHTML = `<p class="descHead">${lessonData.Head}</p><p>${lessonData.description}</p>`;
                lesson.appendChild(descElement);
            
                // Check if currentLesson is 4 and remove the description element
                if (lessonIndex === 4 || lessonIndex === 3) {
                    if (lesson.contains(descElement)) {
                        lesson.removeChild(descElement);
                    }
                }
            }
            

            if ((currentSection === sectionIn && currentLesson === lessonIndex) || completedLessons[sectionKey][lessonIndex]) {
                lesson.style.filter = "none";
            } else {
                lesson.style.filter = "grayscale(100%)";
            }

            const here = lesson.querySelector('.here');
            if (currentSection === sectionIn && currentLesson === lessonIndex) {
                here.style.display = "block";
            } else {
                here.style.display = "none";
            }


            lesson.addEventListener('click', () => {
                
                if (lessonIndex === 3 && currentLesson === 3) { // Fourth lesson (index starts from 0)
                    const tokensToReward = parseInt(lessonData.Token.replace('+', '').replace(' Tokens', '')) || 0;
                    totalTokens += tokensToReward;

                    // Update the token counter in the UI
                    tokenCountElement.textContent = totalTokens;

                    // Update the token message
                    tokenMessage.textContent = `+${tokensToReward} Tokens`;

                    // Trigger the animation
                    tokenAnimation.style.animation = "growAndFade 1.5s ease-in-out forwards";

                    // Reset the animation after it finishes
                    setTimeout(() => {
                        tokenAnimation.style.animation = "none";
                    }, 1500);

                    // Mark the lesson as completed
                    currentLesson += 1;
                    saveProgressToLocalStorage();
                    updateLessonStyles();
                    updateHere();
                    updateLockedLessons();
                    return;
                }

                if (lessonIndex === 3 && currentLesson > 3) {
                    // Update the token message
                    tokenMessage.textContent = "Tokens already received!";
                    tokenMessage.style.color = "red"; // Change text color to red

                    // Trigger the animation
                    tokenAnimation.style.animation = "growAndFade 1.5s ease-in-out forwards";

                    // Reset the animation after it finishes
                    setTimeout(() => {
                        tokenAnimation.style.animation = "none";
                    }, 15000);
                    return;
                }
                if (lessonIndex === 3 && currentLesson < 3) {
                    // Update the token message
                    tokenMessage.textContent = "Finish your lessons to recieve a token!";
                    tokenMessage.style.color = "red"; // Change text color to red

                    // Trigger the animation
                    tokenAnimation.style.animation = "growAndFade 1.5s ease-in-out forwards";

                    // Reset the animation after it finishes
                    setTimeout(() => {
                        tokenAnimation.style.animation = "none";
                    }, 15000);
                    return;
                }

                if (lessonIndex === 4 && currentLesson === 4) {
                    document.querySelector('.complete').textContent = 'Submit'
                    document.getElementById('modalDetails').innerHTML = `
                        <strong>${lessonData.description}</strong> <br/><br/>
                    `;
                
                    // Loop through the questions dynamically
                    for (let i = 1; i <= 3; i++) {
                        const question = lessonData[`question${i}`];
                        if (question) {
                            document.getElementById('modalDetails').innerHTML += `
                                ${i}, ${question.question}<br/>
                                <input type="radio" name="question${i}">${question.answer1}<br/>
                                <input type="radio" name="question${i}">${question.answer2}<br/>
                                <input type="radio" name="question${i}">${question.answer3}<br/>
                                <input type="radio" name="question${i}">${question.answer4}<br/><br/>
                            `;
                        }
                    
                        
                    }
                
                    document.getElementById('lessonModal').classList.add('active');
                    document.body.classList.add('modal-active');
                    console.log(lessonData.question1.question);
                    return;
                }
                if (!lessonData) {
                    console.error(`No data found for ${sectionKey}, lesson ${lessonIndex}`);
                    return;
                }
                
            
                document.getElementById('modalTitle').textContent = lessonData.title;
                document.getElementById('modalDetails').innerHTML = `
                    <strong>${lessonData.description}</strong> <br/><br/>
                    ${lessonData.paragraph1} <br/><br/>
                    ${lessonData.paragraph2}
                `;
                document.getElementById('lessonModal').classList.add('active');
                document.body.classList.add('modal-active');

             
            
                const compltBtn = document.querySelector('.complete');
            
                
                const newCompltBtn = compltBtn.cloneNode(true);
                compltBtn.parentNode.replaceChild(newCompltBtn, compltBtn);
                newCompltBtn.textContent = 'Completed'
                if ((currentSection === sectionIn && currentLesson === lessonIndex)) {
                    newCompltBtn.style.display = "block"; // Show the complete button
                }else{
                    newCompltBtn.style.display = "none"; // Hide the complete button
                }
                
                
                newCompltBtn.addEventListener('click', () => {
                    document.getElementById('lessonModal').classList.remove('active');
                    document.body.classList.remove('modal-active');
                    lesson.classList.add('completed');
                    completedLessons[sectionKey][lessonIndex] = true;
                    if(currentLesson === 4){
                        currentLesson = -1;
                        currentSection += 1;
                        triggerSectionCompleteAnimation(currentSection);
                    }

                    for (let i=0; i<3; i++) {
                        if(sectionIn === i){
                            completedPercentage[i] += 25;
                        }
                        console.log(completedPercentage[i]);
                    }
                    // Increment currentLesson
                    currentLesson += 1;

                    saveProgressToLocalStorage();
            
                    // Reapply the grayscale logic
                    updateLessonStyles();
                    updateHere();
                    updateLockedLessons();
                    
                    
                });
                
                if((!(currentSection === sectionIn && currentLesson === lessonIndex) &&
                    !completedLessons[sectionKey][lessonIndex])){
                    document.getElementById('modalTitle').textContent = lessonData.title;
                    document.getElementById('modalDetails').innerHTML = `
                    <h3>Please Finish Previous Lessons</h3>
                `;
                document.getElementById('lessonModal').classList.add('active');
                document.body.classList.add('modal-active');
                }

                
            });

            if (completedLessons[sectionKey] && completedLessons[sectionKey][lessonIndex]) {
                lesson.classList.add('completed');
            }

            
            
        });
    });

    const closeModalBtn = document.querySelector('.closeModal');
    closeModalBtn.addEventListener('click', () => {
        document.getElementById('lessonModal').classList.remove('active');
        document.body.classList.remove('modal-active');
    });

    const modal = document.getElementById('lessonModal');
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-active');
        }
    });
});

