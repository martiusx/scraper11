
//siemens
const tablicaSku = [
    'WG44G2ZWPL',
    // 'CT718L1B0',
    // 'KU21WAHG0'
  ];

//miele
// const tablicaSku = [
//     'G 7985 SCVi K2O XXL AutoDos',
//     'G 7605 SCi XXL AutoDos',
//     'KM 7361 FL'
//   ];

  //ciarko

  // const tablicaSku = [
  //   'delta',
  //   'cre'
  // ]

  //elica

//   const tablicaSku = [
//     'haiku',
//     'NikolaTesla Alpha'
//   ];

//bosh
// const tablicaSku = [
//     'HSG636BB1',
//     'SMH4ECX21E',
//     'PVS811B16E',
//     'KUL22VFD0',
//     'SMV8YCX02E',
//     'CBG7341B1',
//     'CMG7241B1',
//     'SMP6ZCS80S',
//     'CMG7241W1',
//     'SPV6ZMX17E',
//     'SMV4ETX00E',
//     'KIV87NSE0',
//     'DWK85DK60',
//     'DWB66BC6012',
//     'KIV86NFF0'
// ];

//LIEBHERR
// const tablicaSku = [
//   'WPgbi 7473',
//   'WPbsi 5052'
  // 'TK 14Vd00',
  // 'KGBNsf 52Vc23',
  // 'KU22LVFD0',
//   // 'SWTNes 4285'
// ];

//aeg
// const tablicaSku = [
//   'ABE818E6NC',
//   'MSB2547D-M',
//   'LWR98165XP',
//   'FSB72907P',
//   'LWR73166OP',
//   'LWR85165OP',
//   'L9WBAN61BC',
//   'L9WBA61BC'
// ]

//falmec

// const tablicaSku = [
//     'Mira White',
//     'mercurio black'
// ];

//fulgor
// const tablicaSku = [
//     'FCLSO 7510 TEM BK',
//     'FUSO 7505 MT IX',
//     'FUH 7541 G DWK MBK'
//   ]

const coChceszWyciagnac = {
  cena: 1,
  opis: 1,
  zdjecia: 0,
  ean: 1,
};

const jakiProducent = "siemens";

const linkiDoWyszukiwaniaProduktow = {
  siemens: "https://www.siemens-home.bsh-group.com/pl/lista-produktow/ekspresy-do-kawy/automatyczne-ekspresy-do-kawy-do-zabudowy/",
  bosh: "https://www.bosch-home.pl/lista-produktow/gotowanie-i-pieczenie/piekarniki/piekarniki-do-zabudowy/",
  miele: "https://www.miele.pl/e/wyszukiwarka-s?text=",
  liebherr: "https://home.liebherr.com/pl/pol/global/search/search.html?searchterm=",
  ciarko: "https://ciarko.com/linia-basic/",
  elica: "https://www.elica.com/PL-pl/okapy/wyspa/",
  aeg: "https://www.aeg.pl/kitchen/cooling/freezers/built-in-freezer/",
  falmec: "https://www.falmec.com/pl-pl/search-result/?search=",
  fulgor: "https://www.fulgor-milano.com/int/en/global-search?keyword="
};

let processedCount = 0;

var script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/gh/martiusx/scrapereree@main/funkcje.js';
script.type = 'text/javascript';
document.head.appendChild(script);

tablicaSku.forEach((el, index) => {
  setTimeout(()=>{

  console.log(el.replace(/ /g, "-"));
  if(window.location.href.includes('https://www.falmec.com/')){
      var newWindow = window.open(
          linkiDoWyszukiwaniaProduktow[jakiProducent] + el.replace(/ /g, "%"),
          "_blank"
      );
  }else{
      var newWindow = window.open(
          linkiDoWyszukiwaniaProduktow[jakiProducent] + el.replace(/ /g, "-"),
          "_blank"
      );
  }
  

  if (newWindow) {
      newWindow.onload = function () {
          newWindow.eval(`
              function przejscieNaProduktZListyWyszukiwania(coChceszWyciagnac){
                  let selektorDo1WynikuWyszukiwania = '';
                  
                  if(window.location.href.includes('www.siemens-home.bsh-group.com')){
                      selektorDo1WynikuWyszukiwania = document.querySelector('.prd-results .prd-results__results-area .js-searchlist_tabcontent:not(.hidden) .prd-results__results-area--list:nth-of-type(1) .prd-results__item:nth-of-type(1) .prd-tile__button.js-product_link');
                  }

                  if(window.location.href.includes('https://home.liebherr.com/')){
                      selektorDo1WynikuWyszukiwania = document.querySelector('.result section.search_result_module:nth-of-type(2) h2 a');
                  }

                  if(window.location.href.includes('https://www.falmec.com/')){
                      selektorDo1WynikuWyszukiwania = document.querySelector('.p-searchresults .p-searchresults__result.cell:nth-of-type(1) a');
                  }

                  if(window.location.href.includes('https://www.fulgor-milano.com/')){
                      console.log('test');
                      selektorDo1WynikuWyszukiwania = document.querySelector('.global-search-details .view-content .views-row:nth-of-type(1) h2 a');
                  }

                  linkDoProduktu = selektorDo1WynikuWyszukiwania.getAttribute('href');
                  var newWindow2 = window.open(linkDoProduktu, "_blank");

                  if (newWindow2) {
                      newWindow2.onload = function () {
                          newWindow2.eval(\`
                              window.addEventListener('message', async (event) => {
                                  if (event.data && event.data.type === 'coChceszWyciagnac') {
                                      let coChceszWyciagnac = event.data.payload;
                                      var script = document.createElement('script');
                                      script.src = 'https://cdn.jsdelivr.net/gh/martiusx/scrapereree@main/funkcje.js';
                                      script.type = 'text/javascript';
                                      document.head.appendChild(script);

                                      script.onload = async function() {
                                          console.log('Skrypt został załadowany!');
                                          if (typeof opis === 'function') {
                                              let trescOpisu;
                                              try {
                                                  trescOpisu = await opis(coChceszWyciagnac);
                                                  console.log(trescOpisu);
                                              } catch (error) {
                                                  trescOpisu = { maintext: 'blad' };
                                              }

                                              console.log(trescOpisu.maintext);
                                              saveDataToLocalStorage(trescOpisu.maintext);

                                              if(coChceszWyciagnac.zdjecia === 1 && trescOpisu.maintext != 'blad') {
                                                  downloadImages(trescOpisu.nazwaPoFormacie);
                                              }
                                          } else {
                                              console.log('Funkcja opis nie została znaleziona.');
                                              let trescOpisu = { maintext: 'blad' };
                                              saveDataToLocalStorage(trescOpisu.maintext);
                                          }
                                      };
                                  }
                              });

                              setTimeout(() => {
                                  window.opener.postMessage({ type: 'coChceszWyciagnac', payload: ${JSON.stringify(coChceszWyciagnac)} }, '*');
                              }, 4000);
                          \`);
                      }
                  }
              }

              let koniec = false;

              setInterval(() => {
                  if (!koniec) {
                      if (document.querySelectorAll('body').length > 0) {
                          koniec = true;
                          var script = document.createElement('script');
                          script.src = 'https://cdn.jsdelivr.net/gh/martiusx/scrapereree@main/funkcje.js';
                          script.type = 'text/javascript';
                          document.head.appendChild(script);

                          script.onload = async function() {
                              if (typeof opis === 'function') {
                                  if (window.location.href.includes('wyszukiwarka-s') || window.location.href.includes('search') || window.location.href.includes('global-search?')) {
                                      przejscieNaProduktZListyWyszukiwania(${JSON.stringify(coChceszWyciagnac)});
                                      setTimeout(()=>{
                                          window.opener.postMessage('dataSaved', '*');
                                      },4500);
                                  } else {
                                      let trescOpisu;
                                      try {
                                          trescOpisu = await opis(${JSON.stringify(coChceszWyciagnac)});
                                          console.log(trescOpisu);

                                          const apiKey = 'sk-proj-';


                                            // Żądanie do API OpenAI z trescOpisu.maintext
                                            fetch('https://api.openai.com/v1/chat/completions', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': "Bearer " + apiKey,
                                                },
                                                body: JSON.stringify({
                                                    "model": "gpt-3.5-turbo",
                                                    "messages": [
                                                        {"role": "user", "content": "stworz ktorki opis na podstawie" + trescOpisu.maintext} // Tutaj przekazujesz zmienną
                                                    ],
                                                })
                                            }).then(response => {
                                                return response.json();
                                            }).then(data => {
                                                console.log(data.choices);
                                            }).catch(error => {
                                                console.error('Błąd:', error);
                                            });

                                      } catch (error) {
                                          trescOpisu = { maintext: 'blad' };
                                      }

                                      if (!trescOpisu || typeof trescOpisu.maintext === 'undefined') {
                                          trescOpisu = { maintext: 'blad' };
                                      }

                                      console.log(trescOpisu.maintext);
                                      
                                      


                                      saveDataToLocalStorage(trescOpisu.maintext);

                                      if(${JSON.stringify(coChceszWyciagnac)}.zdjecia === 1 && trescOpisu.maintext != 'blad') {
                                          downloadImages(trescOpisu.nazwaPoFormacie);
                                      }
                                  }
                              } else {
                                  console.log('Funkcja opis nie została znaleziona.');
                                  let trescOpisu = { maintext: 'blad' };
                                  saveDataToLocalStorage(trescOpisu.maintext);
                              }
                          };
                      }
                  }
              }, 4000);
          `);
      };
  } else {
      console.log("Nie udało się otworzyć nowego okna.");
  }
},index * 2000)
});


window.addEventListener("message", (event) => {
  if (event.data === "dataSaved") {
      processedCount++;
      console.log(processedCount + '--' + tablicaSku.length);
      if (processedCount === tablicaSku.length) {
          const allData = JSON.parse(localStorage.getItem("allData")) || [];
          zapisOpisuDoPliku(allData);
          localStorage.removeItem("allData");
      }
  }
});
