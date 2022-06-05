//logged in users can post a comment
const commentHandler = async (event) => {
  event.preventDefault();

  //get text from the comment text area and trim trailing spaces
  const commentText = document.getElementById('comment-text').value.trim();

  //retrieve book_id from the URL by splitting to string and grabbing the final element from the array
  const bookId = window.location.toString().split('/').pop();

  const response = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ comment_text: commentText, book_id: bookId }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace(`/api/books/${bookId}`);
  } else {
    alert("Sorry! We couldn't add your comment!");
  }
};

document
  .querySelector('.add-comment')
  .addEventListener('submit', commentHandler);
