document.addEventListener('DOMContentLoaded', loadMoods);

document.getElementById('moodForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const emoji = document.getElementById('emoji').value;
  const note = document.getElementById('note').value.trim();
  const date = new Date().toLocaleDateString();

  if (!emoji) return;

  const entry = { date, emoji, note };

  let moods = JSON.parse(localStorage.getItem('moods')) || [];
  moods.push(entry);
  localStorage.setItem('moods', JSON.stringify(moods));

  this.reset();
  loadMoods();
});

document.getElementById('clearAll').addEventListener('click', () => {
  if (confirm("Are you sure you want to delete all entries?")) {
    localStorage.removeItem('moods');
    loadMoods();
  }
});

function loadMoods() {
  const entriesList = document.getElementById('entries');
  entriesList.innerHTML = '';

  const moods = JSON.parse(localStorage.getItem('moods')) || [];
  moods.forEach((entry, index) => {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.className = 'entry-text';
    span.textContent = `${entry.date} - ${entry.emoji} ${entry.note ? '(' + entry.note + ')' : ''}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      deleteMood(index);
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);
    entriesList.appendChild(li);
  });
}

function deleteMood(index) {
  let moods = JSON.parse(localStorage.getItem('moods')) || [];
  moods.splice(index, 1);
  localStorage.setItem('moods', JSON.stringify(moods));
  loadMoods();
}
