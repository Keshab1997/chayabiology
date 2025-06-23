// Function to shuffle options
function shuffleOptions() {
    const questionContainers = document.querySelectorAll('.question');
    questionContainers.forEach(container => {
        const optionsContainer = container.querySelector('.options');
        const options = Array.from(optionsContainer.children);
        
        // Fisher-Yates Shuffle Algorithm
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        
        // Clear and re-append shuffled options
        optionsContainer.innerHTML = '';
        options.forEach(option => optionsContainer.appendChild(option));
    });
}

// Function to check answer
function checkAnswer(element, isCorrect) {
    const resultElement = element.parentElement.nextElementSibling;
    const explanationElement = resultElement.nextElementSibling;
    const options = element.parentElement.querySelectorAll('.option');

    // Disable all options after selection
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });

    if (isCorrect === 'true') {
        element.classList.add('correct');
        resultElement.classList.remove('hidden');
        resultElement.classList.add('correct');
        resultElement.innerHTML = '👍 সঠিক!';
        explanationElement.classList.remove('hidden');
        speak('সঠিক');
    } else {
        element.classList.add('incorrect');
        resultElement.classList.remove('hidden');
        resultElement.classList.add('incorrect');
        resultElement.innerHTML = '❌ ভুল!';
        explanationElement.classList.remove('hidden');
        speak('ভুল');
    }
}

// Function for text-to-speech
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bn-BD';
    window.speechSynthesis.speak(utterance);
}

// Shuffle options when the page loads
window.onload = shuffleOptions;