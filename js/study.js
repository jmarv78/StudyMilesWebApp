let completedPercentage = [0, 0, 0];
let totalTokens = 0;

document.addEventListener("DOMContentLoaded", function () {
    function update() {
        completedPercentage = JSON.parse(localStorage.getItem('completedPercentage')) || [0, 0, 0];
        totalTokens = parseInt(localStorage.getItem('totalTokens')) || 0; 
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

    
});