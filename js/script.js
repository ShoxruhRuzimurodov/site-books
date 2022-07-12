`use strict`

const elInput = document.querySelector('.input');
const elbooks = document.querySelector(".books");
const span = document.querySelector(".span")
const logout = document.querySelector(".btn-box")
const returns = document.querySelector(".main-order")
const bookmarsPush = document.querySelector(".book-storage")
const cardBookmarks = document.querySelector(".card-bookmars")
const moreBookBtn = document.querySelector(".container-modal");
const rigthBtn=document.querySelector(".rigth-btn")

let search = "beautiful";
let orderNew = "orderBy=newest";
let parmetr = 15;
parmetr *= 1;

const getBook = async function () {

  const request = await
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}?offset=${parmetr}`);
  data = await request.json();
  displaybooks(data.items, elbooks);
  resultData(data)
  readingBook(data.items)
};
getBook();

const getMovies = async function () {

  const request = await
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}?offset=${parmetr}&${orderNew}`);
  data = await request.json();
  displaybooks(data.items, elbooks);
  resultData(data)
};
getMovies();


const localBookmark = JSON.parse(localStorage.getItem("localStorageBookmark"));
let data;
const arr = localBookmark || [];
// console.log(arr);
const displaybooks = function (data, uls) {
  elbooks.innerHTML = null;
  data.forEach((data) => {
    const htmls = `
    <li class="card">
      <a class="books-link" href="#">
        <img src="${data.volumeInfo.imageLinks.thumbnail}
        " class="card-img" width="202" height="202" alt=" a books">
      </a>
      <h3 class="headings">${data.volumeInfo.title}</h3>
      <p class="texts">${data.volumeInfo.authors}</p>
      <span class="text-item">${data.volumeInfo.publishedDate}</span>
      <div>
        <button class="book-btn" data-bookmarkid="${data.id}">Bookmark</button>
        <button class="more-btn" data-bookmarkid="${data.id}">More info</button>
      </div>
      <div>
      <a class="read-btn" href="${data.volumeInfo.previewLink}"  >Read</a>
      </div>
    </li>

    `;
    uls.insertAdjacentHTML("beforeend", htmls);
  });
};

const inputs=
elInput.addEventListener('change', function () {
  const inputValue = elInput.value;
  search = inputValue;
  getBook();
  if (inputValue === " ") {
    alert("Qaytadan kiriting");
  }
})




elbooks.addEventListener("click", (e) => {
  if (e.target.matches(".book-btn")) {
  }
});


function resultData(data) {
  span.textContent = data.totalItems;
}


const localToken = window.localStorage.getItem("token");

if (!localToken) {
  window.location.replace("password.html");
}

logout.addEventListener("click", function () {
  window.localStorage.removeItem("token");
  window.location.replace("password.html");
});

returns.addEventListener("click", (e) => {
  e.preventDefault();
  getMovies(search, orderNew)

});



elbooks.addEventListener("click", (evt) => {
  const elBookmarkBtn = evt.target.matches(".book-btn");

  if (elBookmarkBtn) {
    const elBtnId = evt.target.dataset.bookmarkid;

    const elFilm = data.items.find((film) => film.id === elBtnId);

    if (!arr.includes(elFilm)) {
      arr.push(elFilm);

      localStorage.setItem("localStorageBookmark", JSON.stringify(arr));
      cardBookmarks.innerHTML = null;

      readingBook(arr);
      renderBook(data, elbooks);
    }
  }
});



function readingBook(data) {
  // let i = 0;
  data.forEach((item) => {
    const letilBook = `
    <div class="books-item__card">
      <div class="card-item-text">
       <h3>${item.volumeInfo.title}</h3>
      <p>${item.volumeInfo.authors}</p>
      </div>
     <div class="card-imgs">
        <img class="card-img" src="./img/book-open.png" alt="book" />
        <img data-deleteid="${data.id}" class="card-imgage" src="./img/delete.png" alt="delete" />
      </div>
    </div>
    `;
    data.id++;
    cardBookmarks.insertAdjacentHTML("beforeend", letilBook);
  });
}


bookmarsPush.addEventListener("click", (evt) => {
  const isBookmarkedBtn = evt.target.matches(".card-imgage");
  const Abook = document.querySelector(".books-item__card");

  if (isBookmarkedBtn) {
    const ElId = evt.target.dataset.deleteid;
    arr.splice(ElId, 1);

    window.localStorage.setItem("localStorageBookmark", JSON.stringify(arr));
    Abook.innerHTML = null;

    renderBook(data, bookmarsPush);
  }
});


const cont = document.querySelector(".container-modal");
elbooks.addEventListener("click", (evt) => {
  const isBookmarkBtn = evt.target.matches(".more-btn");
  if (isBookmarkBtn) {
    const foundBtnId = evt.target.dataset.bookmarkid;
    cont.classList.toggle(".active");

    const foundFilm = data.items.find((film) => film.id === foundBtnId);

    if (!arr.includes(foundFilm)) {
      arr.push(foundFilm);
      elbooks.innerHTML = null;
      moreBookBtn.innerHTML = null;
      moreBtn(arr);
    }
  }
});


function moreBtn(data) {
  data.forEach((item) => {
    const more = `
    <div class="modal">
      <h3>${item.volumeInfo.title}</h3>
      <img class="vector" src="./img/Vector.png" alt="Vector" />
    </div>
    <img class="card__a" width="300" src="${item.volumeInfo.imageLinks.thumbnail}" alt="img" />
    <div class="title">
        <p>
           ${item.volumeInfo.description}
        </p>
          </div>
          <div class="all-modal">
          <div class="all all-author">
          <h3>Author :</h3>
          <p>${item.volumeInfo.authors}</p>
          </div>
          <div class="all all-publisher">
          <h3>Published :</h3>
          <p>${item.volumeInfo.publishedDate}</p>
          </div>
          <div class="all all-publishers">
          <h3>Publishers:</h3>
          <p>${item.volumeInfo.publisher}</p>
          </div>
          <div class="all all-categories">
          <h3>Categories:</h3>
          <p>${item.volumeInfo.categories}</p>
          </div>
          <div class="all all-pages">
          <h3>Pages Count:</h3>
          <p>${item.volumeInfo.pageCount}</p>
    </div>
    <a href="${item.volumeInfo.previewLink}" class="card__btn" >Read</a>
    </div>

    `;
    moreBookBtn.insertAdjacentHTML("beforeend", more);
  });
}

moreBookBtn.addEventListener("click", (e) => {
  if (e.target.matches(".vector")) {
    cont.classList.toggle("active");
    getBook()
  }
});
