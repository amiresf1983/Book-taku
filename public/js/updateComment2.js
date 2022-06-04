const updateCommentHandler = async (event) => {
  event.preventDefault();
  // event.stopImmediatePropogation();
  console.log('click');

  const commentText = document
    .getElementById('updated-comment-text')
    .value.trim();

  const bookId = parseInt(window.location.toString().split('/').pop());

  const commentId = document
    .querySelector(event.target.closest('.updated-comment-text'))
    .addEventListener(event.target.closest(this.dataset.id), () => {
      const commentIdVal = commentId.dataset.id;
      return commentIdVal;
    });

  // const commentIdVal = el.getAttribute('data-id');
  // const commentIdVal = 27;

  // const commentIdVal = event.target.closest(['data-id']);

  const response = await fetch(`/api/books/${bookId}`, commentIdVal, {
    method: 'PUT',
    body: JSON.stringify({ commentIdVal, commentText, bookId }),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(response);
  console.log(commentIdVal);
  if (response.ok) {
    console.log(response);
    // let updateForm = document.getElementById('update-comment-form');
    // updateForm.classList.toggle('hidden');

    // document.location.replace(`/api/books/${bookId}`);
  } else {
    alert('Sorry! Something went wrong!');
  }
};
// document
//   .querySelector('#update-comment-form')
//   .addEventListener('submit', delegateFunction);
document
  .querySelector('#update-comment-form')
  .addEventListener('submit', updateCommentHandler);
