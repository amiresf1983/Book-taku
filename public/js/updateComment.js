const editButton = document.getElementsByClassName('edit-button');

const displayUpdateForm = () => {
  let updateForm = document.getElementById('update-comment-form');
  console.log('click comment form');
  console.log(updateForm);
  updateForm.classList.toggle('hidden');
};
for (let i = 0; i < editButton.length; i++) {
  editButton[i].addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    event.preventDefault();
    console.log('clicked button'), displayUpdateForm();
  });
}
