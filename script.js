document.addEventListener("DOMContentLoaded", () => {
    const subjectsContainer = document.getElementById("subjects");

    fetch("study-cards.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load study cards.");
            return response.json();
        })
        .then(data => {
            const subjects = data.subjects;

            subjects.forEach(subject => {
                const subjectKey = subject.name.toLowerCase().replace(/ /g, '-');
                const section = document.createElement("section");
                section.classList.add("subject-section", subjectKey);
                section.id = subjectKey;

                section.innerHTML = `
                    <h2>${subject.name}</h2>
                    <div class="flashcard-container">
                        <div class="flashcard front"></div>
                        <div class="flashcard back"></div>
                    </div>
                    <div class="controls">
                        <button class="prevBtn">Previous</button>
                        <button class="flipBtn">Flip Card</button>
                        <button class="nextBtn">Next</button>
                    </div>
                    <div class="progress-bar"></div>
                `;

                subjectsContainer.appendChild(section);

                // Get elements AFTER they're added to DOM
                const flashcards = subject.cards;
                let currentIndex = 0;
                
                const flashcardContainer = section.querySelector(".flashcard-container");
                const frontCard = section.querySelector(".front");
                const backCard = section.querySelector(".back");
                const flipBtn = section.querySelector(".flipBtn");
                const nextBtn = section.querySelector(".nextBtn");
                const prevBtn = section.querySelector(".prevBtn");
                const progressBar = section.querySelector(".progress-bar");

                // Initialize first card
                updateCard();

                function updateCard() {
                    const card = flashcards[currentIndex];
                    frontCard.textContent = card.question;
                    backCard.textContent = card.answer;
                    updateProgressBar();
                }

                function updateProgressBar() {
                    progressBar.textContent = `Card ${currentIndex + 1} of ${flashcards.length}`;
                }

                flipBtn.addEventListener("click", () => {
                    flashcardContainer.classList.toggle('flipped');
                });

                nextBtn.addEventListener("click", () => {
                    currentIndex = (currentIndex + 1) % flashcards.length;
                    flashcardContainer.classList.remove('flipped');
                    updateCard();
                });

                prevBtn.addEventListener("click", () => {
                    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
                    flashcardContainer.classList.remove('flipped');
                    updateCard();
                });
            });
        })
        .catch(error => {
            console.error("Error:", error);
            subjectsContainer.innerHTML = `<p style="color: red;">Error loading cards. Check console.</p>`;
        });
});