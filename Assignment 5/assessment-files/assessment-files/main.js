// Show/hide comments with proper ARIA
const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.getElementById('comments');

commentWrapper.hidden = true;
showHideBtn.setAttribute('aria-expanded', 'false');
showHideBtn.textContent = 'Show comments';

showHideBtn.addEventListener('click', () => {
  const willShow = commentWrapper.hidden;
  commentWrapper.hidden = !willShow;
  showHideBtn.setAttribute('aria-expanded', String(willShow));
  showHideBtn.textContent = willShow ? 'Hide comments' : 'Show comments';
});

// Add comment with simple validation
const form = document.querySelector('.comment-form');
const nameField = document.getElementById('name');
const commentField = document.getElementById('comment');
const list = document.querySelector('.comment-container');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameValue = nameField.value.trim();
  const commentValue = commentField.value.trim();
  if (!nameValue || !commentValue) return;

  const li = document.createElement('li');
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');
  namePara.textContent = nameValue;
  commentPara.textContent = commentValue;

  li.appendChild(namePara);
  li.appendChild(commentPara);
  list.appendChild(li);

  nameField.value = '';
  commentField.value = '';

  // Ensure comments are visible after adding one
  if (commentWrapper.hidden) {
    commentWrapper.hidden = false;
    showHideBtn.setAttribute('aria-expanded', 'true');
    showHideBtn.textContent = 'Hide comments';
  }

  // Move focus to the new comment for feedback
  li.tabIndex = -1;
  li.focus();
});
