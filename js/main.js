let page = 0;

const apiKey = "65deb3b4-e14f-46c6-b7c8-b703f8ee06c9";

const toggleButtons = (buttonStates) => {
  buttonStates.forEach((item) => {
    const btn = document.querySelector(`.${item.name}`);
    btn.disabled = item.disabled;
  });
};

const drawPageNumber = () => {
  const pageNum = document.querySelector("#pageNum");
  pageNum.innerHTML = page;
};

const loadApi = async () => {
  // disable both button
  const inactivateButtonState = [
    { name: "previous", disabled: true },
    { name: "next", disabled: true },
  ];
  toggleButtons(inactivateButtonState);
  // hide fault when start API call
  const fault = document.querySelector("#fault");
  fault.classList.add("hide");
  // show loader
  const loading = document.querySelector("#loading");
  loading.classList.remove("hide");

  // add api key
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-api-key", apiKey);

  // draw page number
  drawPageNumber();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  try {
    const result = await fetch(
      `https://api.thecatapi.com/v1/images/search?order=asc&page=${page}&limit=12`,
      requestOptions
    );
    const cats = await result.json();

    updateBtn();

    //hide loader
    loading.classList.add("hide");

    drawImages(cats);
  } catch (err) {
    // we have error with api or no internet

    // show error
    fault.classList.remove("hide");
    //hide loader
    loading.classList.add("hide");
    updateBtn();
    const gallery = document.querySelector(".gallery");
    // empty old images
    gallery.innerHTML = "";
  }
};

const updateBtn = () => {
  // active buttons again
  const buttonState = [{ name: "next", disabled: false }];
  if (page === 0) {
    buttonState.push({ name: "previous", disabled: true });
  } else {
    buttonState.push({ name: "previous", disabled: false });
  }
  toggleButtons(buttonState);
};

const drawImages = (cats) => {
  const gallery = document.querySelector(".gallery");
  // empty old images
  gallery.innerHTML = "";

  cats.forEach((cat) => {
    const tmpImg = document.createElement("img");
    tmpImg.src = cat.url;
    gallery.appendChild(tmpImg);
  });
};

const init = () => {
  document.querySelector(".next").addEventListener("click", () => {
    console.log("next button");
    page++;
    loadApi();
  });

  document.querySelector(".previous").addEventListener("click", () => {
    page--;
    loadApi();
    console.log("prev button");
  });

  //load cats
  loadApi();
};

init();
