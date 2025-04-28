import { LESes } from './data.js';

let completedPercentage = [0, 0, 0];
let totalTokens = 0;
let seconds = 0;
let takenSeconds = {
    section1: [0, 0, 0],
    section2: [0, 0, 0],
    section3: [0, 0, 0]
};

document.addEventListener("DOMContentLoaded", function () {
    function update() {
        completedPercentage = JSON.parse(localStorage.getItem('completedPercentage')) || [0, 0, 0];
        seconds = parseInt(localStorage.getItem('seconds')) || 0;
        totalTokens = parseInt(localStorage.getItem('totalTokens')) || 0; 
        takenSeconds = JSON.parse(localStorage.getItem('takenSeconds')) || {
            section1: [0, 0, 0],
            section2: [0, 0, 0],
            section3: [0, 0, 0]
        };
    }

    update();
    const percentages = document.querySelectorAll(".compStat");
    percentages.forEach((percentage, index) => {
        percentage.textContent = "completed: " + completedPercentage[index] + "%";
    })
    const tokens = document.querySelector('.tokenCount');
    tokens.textContent = totalTokens;

    const lessons = document.querySelectorAll(".title");
    lessons.forEach((lesson, lessonIndex) =>{
        const colorimg = lesson.querySelector('.color-image');
        colorimg.style.width = completedPercentage[lessonIndex];
        let CP;
        CP = 100 - completedPercentage[lessonIndex];
        colorimg.style.clipPath = `inset(0 ${CP}% 0 0)`;
    });
    const display = document.getElementById('display');
    function updateDisplay() {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        display.textContent = `${hrs}:${mins}:${secs}`;
    }
    updateDisplay();
    

    const historyButton = document.querySelector('.historylink'); 
    const historyContainer = document.querySelector('.hitoryCont'); 
    const closebtn = document.querySelector('.closeHistory'); 
   

    historyButton.addEventListener('click', () => {
        historyContainer.style.display = 'block';
    });


    closebtn.addEventListener('click', () => {
        historyContainer.style.display = 'none';
        
    });



    const historyItems = document.querySelectorAll('.historyItem');
    historyItems.forEach((history, i) => {
        const h61 = document.createElement('h6');
        const h62 = document.createElement('h6');
        const h63 = document.createElement('h6');

        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');

        const sectionKey = `section${i + 1}`;
        const lessons = LESes[sectionKey]; // Get all lessons for the current section

        // Check if lessons exist and access only valid entries
        const lessonData = lessons && lessons[0] && lessons[0].title ? lessons[0] : null;
        const lessonData2 = lessons && lessons[1] && lessons[1].title ? lessons[1] : null;
        const lessonData3 = lessons && lessons[2] && lessons[2].title ? lessons[2] : null;

        // Format time for span1, span2, and span3 using takenSeconds
        const formatTime = (seconds) => {
            const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
            const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
            const secs = String(seconds % 60).padStart(2, '0');
            return `${hrs}:${mins}:${secs}`;
        };

        span1.textContent = formatTime(takenSeconds[`section${i + 1}`][0]); // Time for the first lesson
        span2.textContent = formatTime(takenSeconds[`section${i + 1}`][1]); // Time for the second lesson
        span3.textContent = formatTime(takenSeconds[`section${i + 1}`][2]); // Time for the third lesson

        span1.classList.add('timer'); // Add the 'timer' class to span1
        span2.classList.add('timer'); // Add the 'timer' class to span2
        span3.classList.add('timer'); // Add the 'timer' class to span3

        
        // Add text content or fallback to 'No data available'
        h61.textContent = lessonData ? lessonData.title : 'No data available';
        h61.appendChild(span1); // Append the time span to h61
        h62.textContent = lessonData2 ? lessonData2.title : 'No data available';
        h62.appendChild(span2); // Append the time span to h62
        h63.textContent = lessonData3 ? lessonData3.title : 'No data available';
        h63.appendChild(span3); // Append the time span to h63

        // Append the created <h6> elements to the current history item
        history.appendChild(h61);
        history.appendChild(h62);
        history.appendChild(h63); 
    });
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active'); // Toggle the 'active' class on the nav bar
    });
}); 