document.addEventListener("DOMContentLoaded", () => {
    const subjectsContainer = document.getElementById("subjects");

    // Updated path: assumes study-cards.json is in the SAME folder as index.html
    fetch("study-cards.json")  // Changed from "content/study-cards.json"
        .then(response => {
            if (!response.ok) throw new Error("Failed to load study cards.");
            return response.json();
        })
        .then(data => {
            // Rest of your existing code (unchanged)...
        })
        .catch(error => {
            console.error("Error loading study cards:", error);
            subjectsContainer.innerHTML = `<p style="color: red;">Error loading study cards. Check the console.</p>`;
        });
});