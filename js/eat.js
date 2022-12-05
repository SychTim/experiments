const ящики = document.querySelectorAll('.box');
const кнопка = document.querySelector('.js_btn');
const игра = document.querySelector('.game');
const ряды = [document.querySelectorAll('[data-r="1"]'), document.querySelectorAll('[data-r="2"]'), document.querySelectorAll('[data-r="3"]'), document.querySelectorAll('[data-r="4"]'), document.querySelectorAll('[data-r="5"]')];
const столбцы = [document.querySelectorAll('[data-h="1"]'), document.querySelectorAll('[data-h="2"]'), document.querySelectorAll('[data-h="3"]'), document.querySelectorAll('[data-h="4"]'), document.querySelectorAll('[data-h="5"]'), document.querySelectorAll('[data-h="6"]'), document.querySelectorAll('[data-h="7"]')];
let первыйВыбор;
let второйВыбор;

стартИгры();

function стартИгры() {
    for (const box of ящики) {
        const рандомноеЧисло = Math.random() * 6;
         let адрессСсылки;
         let кодКартинки;

        const картинка = box.firstChild;

        if (рандомноеЧисло >= 0 && рандомноеЧисло < 1) {
             адрессСсылки = '/images/eat/burger.jpg';
             кодКартинки = 'bg';
        }else if (рандомноеЧисло >= 1 && рандомноеЧисло < 2) {
             адрессСсылки = '/images/eat/butterbroad.jpg';
             кодКартинки = 'bb';
        }else if (рандомноеЧисло >= 2 && рандомноеЧисло < 3) {
             адрессСсылки = '/images/eat/hotdog.jpg';
             кодКартинки = 'hd';
        }else if (рандомноеЧисло >= 3 && рандомноеЧисло < 4) {
             адрессСсылки = '/images/eat/pizza.jpg';
             кодКартинки = 'pz';
        }else if (рандомноеЧисло >= 4 && рандомноеЧисло < 5) {
             адрессСсылки = '/images/eat/ponchik.jpg';
             кодКартинки = 'ph';
        }else {
             адрессСсылки = '/images/eat/potetofree.jpg';
             кодКартинки = 'pf';
         };
         
         картинка.src = адрессСсылки;
         картинка.dataset.img = кодКартинки;
    };
};

игра.addEventListener('click', функцияПервогоВыбора);

function функцияПервогоВыбора(ивент) {
     if (ивент.target.nodeName !== "IMG") {
          return;
     };

     первыйВыбор = ивент.target;
     первыйВыбор.classList.add('boxCurrent');
     console.log('h', первыйВыбор.dataset.h, 'r', первыйВыбор.dataset.r, 'vybor');
     игра.removeEventListener('click', функцияПервогоВыбора);
     игра.addEventListener('click', функцияВторогоВыбора);
};

function функцияВторогоВыбора(ивент) {
     if (ивент.target.nodeName !== "IMG") {
          return;
     };

     второйВыбор = ивент.target;
     console.log('h', второйВыбор.dataset.h, 'r', второйВыбор.dataset.r, 'vtoroy vybor');

     if (первыйВыбор.dataset.r == второйВыбор.dataset.r - 1 && первыйВыбор.dataset.h == второйВыбор.dataset.h) {
          console.log('vnyz');
          первыйВыбор.classList.add('moveVnyz1');
          второйВыбор.classList.add('moveVnyz2');
          setTimeout(сменаКартинок, 300);
     } else if (первыйВыбор.dataset.r - 1 == второйВыбор.dataset.r && первыйВыбор.dataset.h == второйВыбор.dataset.h) {
          console.log('vverh');
          первыйВыбор.classList.add('moveTop1');
          второйВыбор.classList.add('moveTop2');
          setTimeout(сменаКартинок, 300);
     } else if (первыйВыбор.dataset.h - 1 == второйВыбор.dataset.h && первыйВыбор.dataset.r == второйВыбор.dataset.r) {
          console.log('vlevo'); 
          первыйВыбор.classList.add('moveVlevo1');
          второйВыбор.classList.add('moveVlevo2');
          setTimeout(сменаКартинок, 300);
     } else if (первыйВыбор.dataset.h == второйВыбор.dataset.h - 1 && первыйВыбор.dataset.r == второйВыбор.dataset.r) {
          console.log('vpravo');
          первыйВыбор.classList.add('moveVpravo1');
          второйВыбор.classList.add('moveVpravo2');
          setTimeout(сменаКартинок, 300);
     } else {
          console.log('nevozmozno');
     };

     первыйВыбор.classList.remove('boxCurrent');
     игра.removeEventListener('click', функцияВторогоВыбора);
     игра.addEventListener('click', функцияПервогоВыбора);
};

function сменаКартинок() {
     const адресс1 = первыйВыбор.src;
     const адресс2 = второйВыбор.src;
     первыйВыбор.src = адресс2;
     второйВыбор.src = адресс1;

     первыйВыбор.classList.remove('moveTop1');
     второйВыбор.classList.remove('moveTop2');
     первыйВыбор.classList.remove('moveVnyz1');
     второйВыбор.classList.remove('moveVnyz2');
     первыйВыбор.classList.remove('moveVlevo1');
     второйВыбор.classList.remove('moveVlevo2');
     первыйВыбор.classList.remove('moveVpravo1');
     второйВыбор.classList.remove('moveVpravo2');

     проверкаСовпадений();
};

function проверкаСовпадений() {
     for (const массив of ряды) {
          let совпадение;
          let счетчикСовпадений = 0;

          for (const картинка of массив) {
               if (картинка.src === совпадение) {
                    счетчикСовпадений += 1;
               } else if (счетчикСовпадений < 2) {
                    счетчикСовпадений = 0;
               } else if (счетчикСовпадений >= 2) {
                    return console.log('pobeda!!!');
               };

               совпадение = картинка.src;

               console.log(счетчикСовпадений);

          };
     };

     console.log('ne svezlo');
};
