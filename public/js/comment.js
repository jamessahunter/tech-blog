const buttonHandler = async (event) => {
    event.preventDefault();
    const content = document.querySelector('#comment-content').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
      ];

    if (content) {
      const response = await fetch('/api/posts/comments', {
        method: 'POST',
        body: JSON.stringify({  content, id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace(`/post/${id}`);
      } else {
        alert('Failed to Post.');
      }
    }
  };

  document
  .querySelector('.comment-form')
  .addEventListener('submit', buttonHandler);