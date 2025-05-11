import { LESes } from './data.js';
import { assignments } from './data.js';

let totalTokens = 0;
let timer;
let seconds = 0;
let running = false;
let userID = 0;
let incentiveID = 0;
let completedLessons = {
    section1: [false, false, false],
    section2: [false, false, false],
    section3: [false, false, false]
    // Add more sections if needed...
};

let takenSeconds = {
    section1: [0, 0, 0],
    section2: [0, 0, 0],
    section3: [0, 0, 0]
};

let completedPercentage = [0, 0, 0];



let currentSection = 0;
let currentLesson = 0;

document.addEventListener("DOMContentLoaded", async () => {
    function saveProgressToLocalStorage() {
        localStorage.setItem('currentSection', currentSection);
        localStorage.setItem('currentLesson', currentLesson);
        localStorage.setItem('totalTokens', totalTokens);
        localStorage.setItem('seconds', seconds);
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
        localStorage.setItem('takenSeconds', JSON.stringify(takenSeconds));
        localStorage.setItem('completedPercentage', JSON.stringify(completedPercentage));
    }
    function loadProgressFromLocalStorage() {
        currentSection = parseInt(localStorage.getItem('currentSection')) || 0; // Default to 0 if not set
        currentLesson = parseInt(localStorage.getItem('currentLesson')) || 0;   // Default to 0 if not set
        incentiveID = parseInt(localStorage.getItem('incentiveID')) || 0;      // Default to 0 if not set
        seconds = parseInt(localStorage.getItem('seconds')) || 0;             // Default to 0 if not set
        completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || {
            section1: [false, false, false],
            section2: [false, false, false],
            section3: [false, false, false]
            // Add more sections if needed...
            
        };
        takenSeconds = JSON.parse(localStorage.getItem('takenSeconds')) || {
            section1: [0, 0, 0],
            section2: [0, 0, 0],
            section3: [0, 0, 0]
        }
        completedPercentage = JSON.parse(localStorage.getItem('completedPercentage')) || [0, 0, 0];
        userID = localStorage.getItem('userID');
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
    
        // Ensure the elements exist
        if (!sectionCompleteAnimation || !planetImage || !conquerMessage) {
            console.error("Animation elements not found!");
            return;
        }
    
        // Set the planet image and message based on the section
        const planets = [
            { name: "Mars", image: "img/marsConquered.png" },
            { name: "Jupiter", image: "img/jupconc.png" },
            { name: "Uranus", image: "img/uranusConquered.png" }
        ];
    
        if (planets[sectionIndex - 1]) {
            planetImage.src = planets[sectionIndex - 1].image;
            conquerMessage.textContent = `You have conquered Planet ${planets[sectionIndex - 1].name}!`;
        }
    
        // Reset the animation by removing and re-adding the animation
        sectionCompleteAnimation.style.animation = "none"; // Reset the animation
        sectionCompleteAnimation.offsetHeight; // Trigger reflow to restart the animation
        sectionCompleteAnimation.style.animation = "growAndFadeSection 2s ease-in-out forwards";
    
        // Ensure the element is visible
        sectionCompleteAnimation.style.display = "block";
    
        // Remove the element from the layout after the animation finishes
        setTimeout(() => {
            sectionCompleteAnimation.style.animation = "none"; // Reset the animation
            sectionCompleteAnimation.style.display = "none"; // Completely remove it from the layout
        }, 2000); // Match the duration of the animation (2 seconds)
    }
 
    function updateDisplay() {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        display.textContent = `${hrs}:${mins}:${secs}`;
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
    
    if (!userID) {
        alert("No user ID found. Please log in again.");
        window.location.href = "login.html";
        return;
    }
    
    try {
        const response = await fetch(`https://studymiles-2.onrender.com/new_user/${userID}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();

        document.querySelector("#userName").textContent = userData.name;

    } catch (error) {
        console.error("Error fetching user data:", error);
    }

    try {
        const response = await fetch(`https://studymiles-2.onrender.com/incentive/${incentiveID}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch incentive data");
        }

        const incentiveData = await response.json();

        document.querySelector("#tokenCount").textContent = incentiveData.earnedTokens;
        
    } catch (error) {
        console.error("Error fetching incentive data:", error);
    }

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
                const initSec = seconds;
                updateDisplay();
                
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

                
                if (!lessonData) {
                    console.error(`No data found for ${sectionKey}, lesson ${lessonIndex}`);
                    return;
                }
                
                const display = document.getElementById('display');
                

                  if (!running) {
                    running = true;
                    timer = setInterval(() => {
                      seconds++;
                      updateDisplay();
                    }, 1000);
                  }

                document.getElementById('modalTitle').textContent = lessonData.title;
                document.getElementById('modalDetails').innerHTML = `
                    <strong>${lessonData.description}</strong> <br/><br/>
                    ${lessonData.paragraph1} <br/><br/>
                    ${lessonData.paragraph2}
                `;
                document.getElementById('lessonModal').classList.add('active');
                document.body.classList.add('modal-active');



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

                    running = false;
                    clearInterval(timer);
                
                    document.getElementById('lessonModal').classList.add('active');
                    document.body.classList.add('modal-active');
                    console.log(lessonData.question1.question);
                    
                    
                }
            
                const compltBtn = document.querySelector('.complete');
            
                
                const newCompltBtn = compltBtn.cloneNode(true);
                compltBtn.parentNode.replaceChild(newCompltBtn, compltBtn);
                newCompltBtn.textContent = 'Completed'
                if ((currentSection === sectionIn && currentLesson === lessonIndex)) {
                    newCompltBtn.style.display = "block"; // Show the complete button
                }else{
                    newCompltBtn.style.display = "none"; // Hide the complete button
                    running = false;
                    clearInterval(timer);
                }

                
                console.log(lessonIndex);
                
                
                
                newCompltBtn.addEventListener('click', () => {
                    document.getElementById('lessonModal').classList.remove('active');
                    document.body.classList.remove('modal-active');
                    lesson.classList.add('completed');
                    completedLessons[sectionKey][lessonIndex] = true;
                    if(currentLesson === 4){
                        currentLesson = -1;
                        currentSection += 1;
                        triggerSectionCompleteAnimation(currentSection);
                        newCompltBtn.textContent = 'submit';
                    }

                    for (let i=0; i<3; i++) {
                        if(sectionIn === i){
                            completedPercentage[i] += 25;
                        }
                        console.log(completedPercentage[i]);
                    }
                    // Increment currentLesson
                    currentLesson += 1;
                    running = false;
                    clearInterval(timer);
                    takenSeconds[sectionKey][lessonIndex] = seconds - initSec;
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
        running = false;
        clearInterval(timer);
    });

    const modal = document.getElementById('lessonModal');
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-active');
        }
    });

    const upCont = document.querySelector('.taskStat')
    const ul = document.createElement('ul');
    for(let i = 0; i < 3; i++){
        const li = document.createElement('li');
        li.textContent = assignments[i].title;
        ul.appendChild(li);
    }
    upCont.appendChild(ul);

    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active'); // Toggle the 'active' class on the nav bar
    });
});

