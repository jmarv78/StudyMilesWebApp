const completedLessons = {
    section1: [false, false, false],
    section2: [false, false, false]
    // Add more sections if needed...
};



let currentSection = 0;
let currentLesson = 0;

document.addEventListener("DOMContentLoaded", () => {
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

    
    /* function updateCmpltBtn() {
        const compltBtn = document.querySelector('.complete'); // Shared button
    
        sections.forEach((section, sectionIndex) => {
            const lessons = section.querySelectorAll('.lesson');
            lessons.forEach((lesson, lessonIndex) => {
                const sectionKey = `section${sectionIndex + 1}`;
                const sectionIn = parseInt(sectionKey.slice(7)) - 1;
    
                // Check if the current lesson matches
                if (currentSection === sectionIn && currentLesson === lessonIndex) {
                    compltBtn.style.display = "block"; // Show the complete button
                    compltBtn.onclick = () => {
                        document.getElementById('lessonModal').classList.remove('active');
                        document.body.classList.remove('modal-active');
                        lesson.classList.add('completed');
                        completedLessons[sectionKey][lessonIndex] = true;
    
                        // Increment currentLesson
                        currentLesson += 1;
    
                        // Reapply the logic
                        updateLessonStyles();
                        updateHere();
                        updateLockedLessons();
                        updateCmpltBtn();
                    };
                } else {
                    compltBtn.style.display = "none"; // Hide the complete button
                }
            });
        });
    } */
    /* function updateCmpltBtn() {
        const compltBtn = document.querySelector('.complete'); // Shared button
        sections.forEach((section, sectionIndex) => {
            const lessons = section.querySelectorAll('.lesson');
            lessons.forEach((lesson, lessonIndex) => {
                const sectionKey = `section${sectionIndex + 1}`;
                const sectionIn = parseInt(sectionKey.slice(7)) - 1;
                lesson.addEventListener('click', () => {
                    
                });
                // Check if the current lesson matches
                
            });
        });
    } */
    

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

    const LESes = {
        section1: [
            {
                Head: "Lesson 1.1",
                title: "Lesson 1: Python Introduction",
                description: "Learn the basics of Python programming, including syntax, variables, and data types.",
                paragraph1: "Python is a versatile programming language that is widely used in various fields, including web development, data analysis, artificial intelligence, and more. In this lesson, we will cover the fundamental concepts of Python programming, including syntax, variables, and data types. By the end of this lesson, you will have a solid understanding of the basics of Python and be ready to start writing your own programs.",
                paragraph2: "Python is known for its simplicity and readability, making it an excellent choice for beginners. We will start by installing Python on your computer and setting up a development environment. Then, we will dive into the basics of Python syntax, including how to write and run Python programs. You will learn about variables, data types, and how to perform basic operations with them. By the end of this lesson, you will be able to write simple Python programs and understand the fundamental concepts of programming."
            },
            {
                Head: "Lesson 1.2",
                title: "Lesson 2: Data Structures in Python",
                description: "Explore lists, tuples, and dictionaries in Python and how to use them effectively.",
                paragraph1: "In this lesson, we will explore the different data structures available in Python, including lists, tuples, and dictionaries. These data structures are essential for storing and manipulating data in your programs. We will cover how to create, access, and modify these data structures, as well as their advantages and disadvantages.",
                paragraph2: "Lists are mutable sequences that can store a collection of items. Tuples are similar to lists but are immutable. Dictionaries are key-value pairs that allow you to store and retrieve data efficiently. By the end of this lesson, you will have a solid understanding of how to use these data structures in your Python programs."
            },
            {
                Head: "Lesson 1.3",
                title: "Lesson 3: Control Flow and Functions in Python",
                description: "Learn about control flow statements and how to define and use functions in Python.",
                paragraph1: "In this lesson, we will cover control flow statements in Python, including if statements, loops, and functions. Control flow statements allow you to control the execution of your programs based on certain conditions. Functions are reusable blocks of code that can be called multiple times in your program.",
                paragraph2: "We will start by learning about if statements and how to use them to make decisions in your programs. Then, we will explore loops, including for and while loops, which allow you to repeat a block of code multiple times. Finally, we will learn how to define and use functions in Python. By the end of this lesson, you will be able to write more complex Python programs using control flow statements and functions."
            }
        ],
        section2: [
            {   
                Head: "Lesson 2.1",
                title: "Lesson 1: Basics of Python",
                description: "Introduction to Python syntax, file structure, and conventions.",
                paragraph1: "In this lesson, we cover the basics of Python programming—from its syntax and file structures to best practices. You'll learn about variables, operators, and how to run a Python script using the command line or an IDE.",
                paragraph2: "We also introduce you to some essential tools and techniques for debugging and writing clean code. By the end of this lesson, you'll have a strong foundation to start exploring more advanced topics in Python."
            },
            {
                Head: "Lesson 2.2",
                title: "Lesson 2: Python Environment Setup",
                description: "Setting up your development environment for Python programming.",
                paragraph1: "This lesson guides you through installing Python on your system and configuring your development environment. You'll learn about popular IDEs like VS Code and PyCharm and how to install necessary extensions and packages.",
                paragraph2: "Furthermore, we cover the usage of virtual environments to manage dependencies and streamline project development. With these tools, you'll be ready to dive into programming with Python."
            },
            {
                Head: "Lesson 2.3",
                title: "Lesson 3: Python Environment Setup",
                description: "Setting up your development environment for Python programming.",
                paragraph1: "This lesson guides you through installing Python on your system and configuring your development environment. You'll learn about popular IDEs like VS Code and PyCharm and how to install necessary extensions and packages.",
                paragraph2: "Furthermore, we cover the usage of virtual environments to manage dependencies and streamline project development. With these tools, you'll be ready to dive into programming with Python."
            }
        ]
    };
    sections.forEach((section, sectionIndex) => {
        const lessons = section.querySelectorAll('.lesson');
        lessons.forEach((lesson, lessonIndex) => {
            const sectionKey = `section${sectionIndex + 1}`;
            const lessonData = LESes[sectionKey] && LESes[sectionKey][lessonIndex];
            const sectionIn = parseInt(sectionKey.slice(7)) - 1;

            if (lessonData) {
                let descElement = document.createElement('div');
                descElement.classList.add('desc');
                descElement.innerHTML = `<p class="descHead">${lessonData.Head}</p><p>${lessonData.description}</p>`;
                lesson.appendChild(descElement);
            }

            if (currentSection === sectionIn && currentLesson === lessonIndex) {
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
                if (currentSection === sectionIn && currentLesson === lessonIndex) {
                    newCompltBtn.style.display = "block"; // Show the complete button
                    console.log("currentlesson!!!")
                }else{
                    newCompltBtn.style.display = "none"; // Hide the complete button
                }
                
                
                newCompltBtn.addEventListener('click', () => {
                    document.getElementById('lessonModal').classList.remove('active');
                    document.body.classList.remove('modal-active');
                    lesson.classList.add('completed');
                    completedLessons[sectionKey][lessonIndex] = true;
            
                    // Increment currentLesson
                    currentLesson += 1;
            
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

