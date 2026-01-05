document.addEventListener('DOMContentLoaded', () => {
    const goalInput = document.getElementById('goal-input');
    const addGoalBtn = document.getElementById('add-goal-btn');
    const goalList = document.getElementById('goal-list');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');

    let goals = JSON.parse(localStorage.getItem('goals')) || [];

    const motivationalQuotes = [
        { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { text: "The will to win, the desire to succeed, the urge to reach your full potential... these are the keys that will unlock the door to personal excellence.", author: "Confucius" }
    ];

    const saveGoals = () => {
        localStorage.setItem('goals', JSON.stringify(goals));
    };

    const updateProgress = () => {
        const completedGoals = goals.filter(goal => goal.completed).length;
        const totalGoals = goals.length;
        const progress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}% Complete`;
    };

    const renderGoals = ().
        goalList.innerHTML = '';
        goals.forEach(goal => {
            const li = document.createElement('li');
            li.textContent = goal.text;
            if (goal.completed) {
                li.classList.add('completed');
            }

            const buttonsDiv = document.createElement('div');
            
            const completeBtn = document.createElement('button');
            completeBtn.innerHTML = '&#10004;'; // Checkmark
            completeBtn.classList.add('complete-btn');
            completeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                goal.completed = !goal.completed;
                saveGoals();
                renderGoals();
                updateProgress();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '&#10006;'; // X
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                goals = goals.filter(g => g.id !== goal.id);
                saveGoals();
                renderGoals();
                updateProgress();
            });

            buttonsDiv.appendChild(completeBtn);
            buttonsDiv.appendChild(deleteBtn);
            li.appendChild(buttonsDiv);
            goalList.appendChild(li);
        });
        updateProgress();
    };

    const addGoal = () => {
        const text = goalInput.value.trim();
        if (text) {
            goals.push({ id: Date.now(), text, completed: false });
            goalInput.value = '';
            saveGoals();
            renderGoals();
        }
    };
    
    const displayRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        quoteText.textContent = `"${motivationalQuotes[randomIndex].text}"`;
        quoteAuthor.textContent = `- ${motivationalQuotes[randomIndex].author}`;
    };

    addGoalBtn.addEventListener('click', addGoal);
    goalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addGoal();
        }
    });

    renderGoals();
    displayRandomQuote();
});
