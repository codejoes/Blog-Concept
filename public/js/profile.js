const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#project-name').value.trim();
  const text = document.querySelector('#project-desc').value.trim();

  if (title && text) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

const updatePostHandler = async (event) => {
  event.preventDefault();

  console.log('1=====================================');

  const updatedTitle = document.querySelector('#updated-title').value.trim();
  const updatedText = document.querySelector('#updated-text').value.trim();

  
    if (event.target.hasAttribute('data-id')) {
      const postId = event.target.getAttribute('data-id');

      const response = await fetch (`/api/posts/:id`, {
        where: {
          id: postId,
        },
        method: 'PUT',
        body: JSON.stringify({ title: `${updatedTitle}`, text: `${updatedText}` }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
 
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to udpate post');
      }
    }
  
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('.update-post-form')
  .addEventListener('submit', updatePostHandler);