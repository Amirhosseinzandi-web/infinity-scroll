function showLoading() {
  document.querySelector(".pic").innerHTML =
    "<img src='https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif'>";
}
function showLoadingOne() {
  document.querySelector(".pic").innerHTML =
    "<img src='pic/loadPic.gif'>";
}

function hideLoading() {
  document.querySelector(".pic").innerHTML =
    "<img class='hide' src='https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif'>";
}
function hideLoadingOne() {
  document.querySelector(".pic").innerHTML =
  "<img class='hide' src='pic/loadPic.gif'>";
}

let url = "https://jsonplaceholder.typicode.com/photos";
let _main = document.getElementsByTagName("main")[0];
let picUrl = "https://randomuser.me/api/?results=500";

async function getData() {
  showLoading();
  _file = await fetch(url);
  _data = await _file.json();
  return _data;
}

async function getDataOne() {
  _photo = await fetch(picUrl);
  _pic = await _photo.json();
  return _pic;
}
getData().then((response) => {
  getDataOne().then((suces) => {
    console.log(suces);
    hideLoading();
    results(response, suces);
  });
});

function results(response, suces) {
  class shortStory {
    constructor(title, img, desk, price) {
      this.title = title;
      this.img = img;
      this.desk = desk;
      this.price = price;
    }
    Text() {
      let _div1 = document.createElement("div");
      _div1.innerHTML = ` <h2>${this.title}</h2> <p>${this.desk}</p> <strong>${this.price}</strong>`;
      return _div1;
    }
    Img() {
      let _div2 = document.createElement("div");
      _div2.innerHTML = ` <img src="${this.img}"> `;
      return _div2;
    }
    finall() {
      let _sec = document.createElement("section");
      _sec.appendChild(this.Text());
      _sec.appendChild(this.Img());
      return _sec;
    }
  }
  // **************************************************************************************

  let z;
  let k = 10;
  for (i = 0; i < 10; i++) {
    x = new shortStory(
      response[i].title,
      suces.results[i].picture.large,
      response[i].albumId,
      response[i].id
    );
    document.querySelector(".container").appendChild(x.finall());
  }

  function ahmad() {
    _main.scrollTo(0, _main.scrollTop - 120);
  }

  let scr = true;
  _main.addEventListener("scroll", function () {
    if (_main.scrollTop + window.innerHeight >= _main.scrollHeight - 100) {
      if (scr == true) {
        showLoadingOne();
        z = setTimeout(ahmad, 0);
        _main.classList.replace("add", "remove");
      }

      if (
        document.querySelector(".container").childElementCount >=
        response.length - 10
      ) {
        scr = false;
        _main.removeEventListener("scroll", function () {});
      }
      console.log(scr);
      setTimeout(() => {
        _main.classList.replace("remove", "add");
        console.log(
          document.querySelector(".container").childElementCount +
            " - " +
            response.length
        );
        if (
          document.querySelector(".container").childElementCount >=
          response.length
        ) {
          _main.removeEventListener("scroll", function () {});
        } else {
          hideLoadingOne();
          for (j = k; j < k + 10; j++) {
            x = new shortStory(
              response[j].title,
              suces.results[j].picture.large,
              response[j].albumId,
              response[j].id
            );
            document.querySelector(".container").appendChild(x.finall());
          }
          k = k + 10;
        }
      }, 800);
    }
  });
  // *****************************************************************************************
}
