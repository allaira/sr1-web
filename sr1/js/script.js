const books = [];

async function populate() {
  const requestURL = "https://api.jsonbin.io/v3/b/6acb8e1dffd5d16053617c5c";

  const request = new Request(requestURL);
  const response = await fetch(request);

  if (response.ok) {
    const data = await response.json();
    const records = data.record ? data.record : data;

    createBooksArray(records);
    showHeader();
    showBooks();
  } else {
    alert("Помилка завантаження даних із хмарного сховища: " + response.status);
  }
}

function createBooksArray(dataArray) {
  for (const item of dataArray) {
    const bookItem = new Book(item.title, item.category);
    books.push(bookItem);
  }
}

function showHeader() {
  const header = document.querySelector(".card-header");
  const h1 = document.createElement("h1");
  h1.innerText = "Каталог книг за категоріями";
  header.appendChild(h1);
}

function showBooks() {
  const container = document.querySelector(".card-content");

  const colKids = document.createElement("div");
  const colTeens = document.createElement("div");
  const colAdults = document.createElement("div");

  colKids.className = "category-col";
  colTeens.className = "category-col";
  colAdults.className = "category-col";

  const h2Kids = document.createElement("h2");
  h2Kids.textContent = "Для дітей";
  const h2Teens = document.createElement("h2");
  h2Teens.textContent = "Для підлітків";
  const h2Adults = document.createElement("h2");
  h2Adults.textContent = "Для дорослих";

  const ulKids = document.createElement("ul");
  const ulTeens = document.createElement("ul");
  const ulAdults = document.createElement("ul");

  for (const b of books) {
    const li = document.createElement("li");
    li.textContent = b.title;

    if (b.category === "kids") {
      ulKids.appendChild(li);
    } else if (b.category === "teens") {
      ulTeens.appendChild(li);
    } else {
      ulAdults.appendChild(li);
    }
  }

  colKids.appendChild(h2Kids);
  colKids.appendChild(ulKids);

  colTeens.appendChild(h2Teens);
  colTeens.appendChild(ulTeens);

  colAdults.appendChild(h2Adults);
  colAdults.appendChild(ulAdults);

  container.appendChild(colKids);
  container.appendChild(colTeens);
  container.appendChild(colAdults);
}

populate();