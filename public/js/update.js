const updateHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
      ];

    if (title && content) {
      const response = await fetch(`/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content, id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to Update.');
      }
    }
  };


const deleteHandler = async () => {
    console.log("works")
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
      ];

    const response = await fetch(`/post/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to Delete.');
      }
}



  document
  .querySelector('.post-form')
  .addEventListener('submit', updateHandler);

  document
  .querySelector('.post-form button')
  .addEventListener('click', deleteHandler);