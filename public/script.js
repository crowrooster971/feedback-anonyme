document.getElementById('feedback-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const product = document.getElementById('product').value;
    const comment = document.getElementById('comment').value;

    const response = await fetch('/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, comment })
    });

    if (response.ok) {
        document.getElementById('feedback-form').reset();
        loadFeedback();
    }
});

async function loadFeedback() {
    const response = await fetch('/feedback');
    const feedbackList = await response.json();
    const feedbackContainer = document.getElementById('feedback-list');
    feedbackContainer.innerHTML = '';

    feedbackList.forEach(feedback => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${feedback.product}</strong><p>${feedback.comment}</p>`;
        feedbackContainer.appendChild(div);
    });
}

loadFeedback();