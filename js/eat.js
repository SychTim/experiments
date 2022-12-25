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
               адрессСсылки = './images/eat/burger.jpg';
               кодКартинки = 'bg';
          } else if (рандомноеЧисло >= 1 && рандомноеЧисло < 2) {
               адрессСсылки = './images/eat/butterbroad.jpg';
               кодКартинки = 'bb';
          } else if (рандомноеЧисло >= 2 && рандомноеЧисло < 3) {
               адрессСсылки = './images/eat/hotdog.jpg';
               кодКартинки = 'hd';
          } else if (рандомноеЧисло >= 3 && рандомноеЧисло < 4) {
               адрессСсылки = './images/eat/pizza.jpg';
               кодКартинки = 'pz';
          } else if (рандомноеЧисло >= 4 && рандомноеЧисло < 5) {
               адрессСсылки = './images/eat/ponchik.jpg';
               кодКартинки = 'ph';
          } else {
               адрессСсылки = './images/eat/potetofree.jpg';
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
     for (const ряд of ряды) {
          let совпадение;
          let счетчикСовпадений = 0;
          const победныеКартинки = [];

          for (const картинка of ряд) {
               if (картинка.src === совпадение) {
                    счетчикСовпадений += 1;
                    победныеКартинки.push(картинка);
               } else if (счетчикСовпадений < 2) {
                    счетчикСовпадений = 0;
                    победныеКартинки.length = 0;
                    победныеКартинки.push(картинка);
               } else if (счетчикСовпадений >= 2) {
                    победныйКлич(победныеКартинки);
                    return console.log('pobeda!!!', победныеКартинки);
               };

               совпадение = картинка.src;

               console.log(счетчикСовпадений);
          };

          if (счетчикСовпадений >= 2) {
               победныйКлич(победныеКартинки);
               return console.log('победа', победныеКартинки);
          };
     };

     for (const столбец of столбцы) {
          let совпадение;
          let счетчикСовпадений = 0;
          const победныеКартинки = [];

          for (const картинка of столбец) {
               if (картинка.src === совпадение) {
                    счетчикСовпадений += 1;
                    победныеКартинки.push(картинка);
               } else if (счетчикСовпадений < 2) {
                    счетчикСовпадений = 0;
                    победныеКартинки.length = 0;
                    победныеКартинки.push(картинка);
               } else if (счетчикСовпадений >= 2) {
                    победныйКлич(победныеКартинки);
                    return console.log('pobeda!!!', победныеКартинки);
               };

               совпадение = картинка.src;

               console.log(счетчикСовпадений);
          };

          if (счетчикСовпадений >= 2) {
               победныйКлич(победныеКартинки);
               return console.log('победа', победныеКартинки);
          };
     };

     console.log('ne svezlo');
};

function победныйКлич(победныеКартинки) {
     победныеКартинки.forEach(картинка => {
          картинка.classList.add('WinCard');
          картинка.dataset.img = "false";
     });

     setTimeout(падениеКарт, 300);
};

function падениеКарт() {
     for (let index = 0; index < 60; index += 1) {
          const падающаяКарта = document.querySelector('[data-img="false"]');
          if (падающаяКарта === null) {
               return проверкаСовпадений();
          };

          const номерРяда = падающаяКарта.dataset.r;
          const номерСтолба = падающаяКарта.dataset.h;
          console.log(падающаяКарта);
          if (номерРяда === '1') {
               const рандомноеЧисло = Math.random() * 6;

               if (рандомноеЧисло >= 0 && рандомноеЧисло < 1) {
                    падающаяКарта.src = './images/eat/burger.jpg';
               } else if (рандомноеЧисло >= 1 && рандомноеЧисло < 2) {
                    падающаяКарта.src = './images/eat/butterbroad.jpg';
               } else if (рандомноеЧисло >= 2 && рандомноеЧисло < 3) {
                    падающаяКарта.src = './images/eat/hotdog.jpg';
               } else if (рандомноеЧисло >= 3 && рандомноеЧисло < 4) {
                    падающаяКарта.src = './images/eat/pizza.jpg';
               } else if (рандомноеЧисло >= 4 && рандомноеЧисло < 5) {
                    падающаяКарта.src = './images/eat/ponchik.jpg';
               } else {
                    падающаяКарта.src = './images/eat/potetofree.jpg';
               };

               падающаяКарта.classList.remove('WinCard');
               
               падающаяКарта.dataset.img = "true";

               console.log("верхняя");


          } else {
               const верхняяКарта = document.querySelector(`[data-r="${Number(номерРяда) - 1}"][data-h="${номерСтолба}"]`);
               падающаяКарта.classList.remove('WinCard');
               падающаяКарта.src = верхняяКарта.src;
               падающаяКарта.dataset.img = "true";
               верхняяКарта.dataset.img = "false";
          };
     };
};