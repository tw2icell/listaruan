let watchList = JSON.parse(localStorage.getItem('marvelList')) || [
  { id: 1, text: "Iron Man (2008)", watched: false },
  { id: 2, text: "The Incredible Hulk (2008)", watched: false },
  { id: 3, text: "Iron Man 2 (2010)", watched: false },
  { id: 4, text: "Thor (2011)", watched: false },
  { id: 5, text: "Captain America: The First Avenger (2011)", watched: false },
  { id: 6, text: "The Avengers (2012)", watched: false },
  { id: 7, text: "Captain America: The Winter Soldier (2014)", watched: false },
  { id: 8, text: "Guardians of the Galaxy (2014)", watched: false },
  { id: 9, text: "Avengers: Age of Ultron (2015)", watched: false },
  { id: 10, text: "Captain America: Civil War (2016)", watched: false },
  { id: 11, text: "Doctor Strange (2016)", watched: false },
  { id: 12, text: "Spider-Man: Homecoming (2017)", watched: false },
  { id: 13, text: "Thor: Ragnarok (2017)", watched: false },
  { id: 14, text: "Black Panther (2018)", watched: false },
  { id: 15, text: "Avengers: Infinity War (2018)", watched: false },
  { id: 16, text: "Avengers: Endgame (2019)", watched: false },
  { id: 17, text: "Doctor Strange in the Multiverse of Madness (2022)", watched: false },
  { id: 18, text: "Deadpool & Wolverine (2024)", watched: false }
];

function saveToLocalStorage() {
  localStorage.setItem('marvelList', JSON.stringify(watchList));
}

function renderList() {
  const listEl = document.getElementById('list');
  listEl.innerHTML = '';

  const watched = watchList.filter(item => item.watched).length;
  document.getElementById('progress').textContent = `${watched} de ${watchList.length} assistidos`;

  watchList.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = `item ${item.watched ? 'watched' : ''}`;
    div.innerHTML = `
      <input type="checkbox" ${item.watched ? 'checked' : ''} onchange="toggleWatched(${index})">
      <span>${item.text}</span>
      <div class="remove-btn" onclick="removeItem(${index})">×</div>
    `;
    listEl.appendChild(div);
  });
}

function addItem() {
  const input = document.getElementById('itemInput');
  const text = input.value.trim();
  
  if (text === '') return;

  watchList.push({ id: Date.now(), text: text, watched: false });
  input.value = '';
  saveToLocalStorage();
  renderList();
}

function toggleWatched(index) {
  watchList[index].watched = !watchList[index].watched;
  saveToLocalStorage();
  renderList();
}

function removeItem(index) {
  if (confirm('Remover este título?')) {
    watchList.splice(index, 1);
    saveToLocalStorage();
    renderList();
  }
}

document.getElementById('itemInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') addItem();
});

renderList();