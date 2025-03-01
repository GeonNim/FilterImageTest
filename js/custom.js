//Create button element

const btnChars = ['all', 'bag', 'shoe', 'watch', 'camera', 'headphone'];
const btnsWrapper = document.querySelector('.filter-btns');

btnChars.map(function (btnChar) {
  const modifiedChar = btnChar.charAt(0).toUpperCase() + btnChar.slice(1);
  // charAt(): 문자열의 첫 번째 글자만 반환 (*괄호 안 인덱스 번호에 따라 달라짐)
  // toUpperCase(): 문자열을 대문자로 변환
  // toLowerCase(): 문자열을 소문자로 변환
  // slice(): 문자열의 해당 인덱스부터 끝까지 반환

  const btnElement = `
  <button class="filter-btn" data-filter="${btnChar}">${modifiedChar}</button>
  `;
  btnsWrapper.insertAdjacentHTML('beforeend', btnElement);
});

//Firtst button add actiove class
const btns = document.querySelectorAll('.filter-btn');
btns[0].classList.add('active');

// Create images element
const images = [
  'bag-1.jpg',
  'camera-1.jpg',
  'camera-2.jpg',
  'headphone-1.jpg',
  'headphone-2.jpg',
  'shoe-1.jpg',
  'shoe-2.jpg',
  'watch-1.jpg',
];
const imagesWrapper = document.querySelector('.filter-images');

images.map(function (image) {
  // console.log(img.split('-')[0]);

  const imgElement = `
     <div class="filter-image" data-filter="${image.split('-')[0]}">
        <span><img src="images/${image}" alt="" /></span>
     </div>
  `;

  imagesWrapper.insertAdjacentHTML('beforeend', imgElement);
});

const imageElements = document.querySelectorAll('.filter-image');

//Filter Images
function activateFilter() {
  btns.forEach((btn) => {
    btn.classList.remove('active');
  });
  this.classList.add('active');

  const selectedBtn = this.getAttribute('data-filter');

  // map, filter, reduce 함수는 DOM 요소에 사용할 수 없다.
  // Array.from()을 사용하여 배열로 변환한다.
  Array.from(imageElements).filter((imageElement) => {
    imageElement.classList.add('hide');

    setTimeout(() => {
      if (
        imageElement.getAttribute('data-filter') === selectedBtn ||
        selectedBtn === 'all'
      ) {
        imageElement.classList.remove('hide');
        imageElement.classList.add('show');
      } else {
        imageElement.classList.remove('show');
        imageElement.classList.add('hide');
      }
    }, 100);
    //시간 지연 함수(promise) : 첫번째 파라미터 = callback function, 두번째 파라미터 = 시간(밀리초)
  });
}

btns.forEach(function (btn) {
  btn.addEventListener('click', activateFilter);
});
const lightBox = document.querySelector('.light-box');
const overLay = document.querySelector('.overlay');
// activate light box when click each image
const showLightBox = (e) => {
  const taget = e.currentTarget;
  const selectedImage = taget.children[0].children[0].getAttribute('src');
  const categoryName = taget.getAttribute('data-filter');

  const lightBoxImage = document.querySelector('.light-box-image img');
  const categoryElement = document.querySelector('.title p');

  // getAttribute(): 파라미터 속성 값 가져오기
  // setAttribute(a, b): a: 속성 이름, b: 변경할 속성 값
  // a.textContent = b: a 요소에 b 텍스트 입력

  lightBoxImage.setAttribute('src', selectedImage);
  categoryElement.textContent = categoryName;
  lightBox.style.display = 'block';
  overLay.style.display = 'block';
};

imageElements.forEach((imageElement) => {
  imageElement.addEventListener('click', showLightBox);
});

// close light bx
const closeBtn = document.querySelector('.close');

const closeLightBox = () => {
  lightBox.style.display = 'none';
  overLay.style.display = 'none';
};

// closeBtn.addEventListener('click', closeLightBox);
// overLay.addEventListener('click', closeLightBox);

[closeBtn, overLay].forEach((element) =>
  element.addEventListener('click', closeLightBox)
);
