  const buttonHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    console.log(title);
    console.log(content);
    if (title && content) {
      const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to Post.');
      }
    }
  };

  document
  .querySelector('.post-form')
  .addEventListener('submit', buttonHandler);