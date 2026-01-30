let allVideos = [];
let perPage = 10;
let visible = perPage;

const grid = document.querySelector(".grid");
const loadMore = document.getElementById("loadMore");
const searchInput = document.getElementById("searchInput");

fetch("videos.json")
  .then(res => res.json())
  .then(data => {
    allVideos = data;
    render();
  });

function render(list = allVideos) {
  grid.innerHTML = "";

  list.slice(0, visible).forEach(v => {
    grid.innerHTML += `
      <a class="card" href="${v.video}">
        <img src="${v.thumb}">
        <p>${v.title}</p>
      </a>
    `;
  });

  loadMore.style.display =
    visible >= list.length ? "none" : "block";
}

loadMore.onclick = () => {
  visible += perPage;
  render();
};

function searchContent() {
  let q = searchInput.value.toLowerCase();

  if (!q) {
    visible = perPage;
    render();
    return;
  }

  let filtered = allVideos.filter(v =>
    v.title.toLowerCase().includes(q)
  );

  render(filtered);
  loadMore.style.display = "none";
}
