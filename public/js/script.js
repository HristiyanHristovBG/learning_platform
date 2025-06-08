document.addEventListener('DOMContentLoaded', () => {
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
});