document.addEventListener('DOMContentLoaded', () => {
  // Contact form validation
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!name || !email || !message) {
        e.preventDefault();
        alert('All fields are required.');
        return;
      }
      if (!emailRegex.test(email)) {
        e.preventDefault();
        alert('Please enter a valid email address.');
        return;
      }
    });
  }

  // Mobile menu toggle
  const openMenuBtn = document.getElementById('open-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (openMenuBtn && closeMenuBtn && mobileMenu) {
    openMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('active');
    });

    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenu.classList.add('hidden');
    });
  }

  // Quiz functionality
  const submitQuizBtn = document.getElementById('submit-quiz');
  const quizResult = document.getElementById('quiz-result');
  if (submitQuizBtn && quizResult) {
    submitQuizBtn.addEventListener('click', () => {
      const answer = document.querySelector('input[name="q1"]:checked');
      if (!answer) {
        quizResult.textContent = 'Please select an answer.';
        quizResult.style.color = '#d32f2f';
        return;
      }
      if (answer.value === 'a') {
        quizResult.textContent = 'Correct! HTML stands for Hyper Text Markup Language.';
        quizResult.style.color = '#2e7d32';
      } else {
        quizResult.textContent = 'Incorrect. The correct answer is Hyper Text Markup Language.';
        quizResult.style.color = '#d32f2f';
      }
    });
  }
});