
async function opis(coChceszWyciagnac) {
    let maintext = '';
    let nazwaProduktu = '';
    let nazwaPoFormacie = '';

    maintext += ' \n\n '; // Dodanie dwóch linijek odstępu
    maintext += '----------------------------------------------------------------------------------------------------------------';
    maintext += ' \n\n '; // Dodanie dwóch linijek odstępu




    if (window.location.href.includes('www.siemens-home.bsh-group.com')) {
        const daneDoWyciagniecia = {
            cena: '',
            ean: '',
            tytul: '',
            opisTekstowy: '',
            opisListaZDanymi: ''
        };
        let typ = '';
        let model = '';
        let gotowyOpis = '';
        
        //Dane to uzupełnienia
        let cenaSelektor = '';
        let eanSelektor = '';
        let eanSelektorScriptJson = '#product-data';
        let marka = 'Siemens';
        let modelSelektor = '.service-area h2.a-heading.product-code .fragment.std-header-6 ';
        let typSelektor = '.service-area .m-producttitle h1';
        let opisTekstowySelektorBezListy = '';
        let opisTekstowySelektorzLista = '';
        let opisTekstowySelektorzListaNaglowek = '';
        let opisTekstowySelektorzListaWartosc = '';
        
        let ostrzezenia = '';
        let opisListaZDanymiSelektor1Wiersza = '.g-layout-full.margin-xls .overview-warpper .m-overviewtile.overview-content';    
        let opisListaZDanymiSelektor1Naglowka = '';
        let opisListaZDanymiSelektor1Wartosci = '';
        
        //wyciąganie EANU ze skryptu json
        if(eanSelektorScriptJson != ''){
            let scriptElement = document.querySelector(eanSelektorScriptJson);
            let productData = JSON.parse(scriptElement.textContent);
            daneDoWyciagniecia.ean = productData.gtin;
        }
        //wyciąganie Eanu
        if(eanSelektor != '' && eanSelektorScriptJson == ''){
            if(document.querySelectorAll(eanSelektor).length>0){
                daneDoWyciagniecia.ean = document.querySelector(eanSelektor).innerText;
            }else{
                daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
            }
        }else if(eanSelektorScriptJson == ''){
            daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
        }
        
        //wyciąganie ceny
        if(cenaSelektor != ''){
            if(document.querySelectorAll(cenaSelektor).length > 0){
                daneDoWyciagniecia.cena = document.querySelector(cenaSelektor).innerText;
            }else{
                daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
            }
        }else{
            daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
        }
        
        
        //nazwaProduktu
        daneDoWyciagniecia.tytul = '<h3>'+document.querySelector('.service-area h2.a-heading.product-code .fragment.std-header-6 ').innerText + ' ' + document.querySelector('.service-area .m-producttitle h1').innerText + '</h3>';
        
        //wyciąganie opisu tekstowego
        if(opisTekstowySelektorBezListy != ''){
            if(document.querySelectorAll(opisTekstowySelektorBezListy).length > 0){
                daneDoWyciagniecia.opisTekstowy = '<p>'+ document.querySelector(opisTekstowySelektorBezListy).innerText + '</p>';
            }
        }
        
        //wyciąganie opisu tekstowego z listy
        if(opisTekstowySelektorzLista != ''){
            if(document.querySelectorAll(opisTekstowySelektorzLista).length > 0){
                document.querySelectorAll(opisTekstowySelektorzLista).forEach((el)=>{
                    let napisNaglowek = '';
                    let napisWartosc = '';
                    if(el.querySelectorAll(opisTekstowySelektorzListaNaglowek).length > 0){
                         napisNaglowek = el.querySelector(opisTekstowySelektorzListaNaglowek).innerText;
                    }
                    if(el.querySelectorAll(opisTekstowySelektorzListaWartosc).length > 0){
                         napisWartosc = el.querySelector(opisTekstowySelektorzListaWartosc).innerText;
                    }
                    daneDoWyciagniecia.opisTekstowy += '<p>' + '<h5>'+napisNaglowek+ '</h5><br>'+ napisWartosc +'<br>' + '</p>';
                })
            }
        }
        
        //wyciąganie opisu z listą danych technicznych
        if(opisListaZDanymiSelektor1Wiersza != ''){
            if(document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).length > 0){
                daneDoWyciagniecia.opisListaZDanymi += '<table style="width:100%;"><tbody style="width:100%;">';
                let llt = document.querySelectorAll('.g-layout-full.margin-xls .overview-warpper .m-overviewtile.overview-content');
                console.log(111111);
                daneDoWyciagniecia.opisListaZDanymi += '<p>Podstawowe dane:</p><table><tbody>';
                for (let i = 0; i < llt.length; i++) {
                    if (llt[i].querySelectorAll('.content > p:nth-child(2)').length > 0) {
                        daneDoWyciagniecia.opisListaZDanymi += '<tr><td>' + llt[i].querySelector('.content > p:nth-child(1)').innerText + '</td><td>' + llt[i].querySelector('.content > p:nth-child(2)').innerText + '</td></tr>';
                    } else if (llt[i].querySelectorAll('.content > .js-technicalText').length > 0) {
                        daneDoWyciagniecia.opisListaZDanymi += '<tr><td>' + llt[i].querySelector('.content > p:nth-child(1)').innerText + '</td><td>' + llt[i].querySelector('.content > p.js-technicalText').innerText + '</td></tr>';
                    }
                }
                if (document.querySelectorAll('.energy-label-wrapper .a-image [src="https://media3.bsh-group.com/Feature_Icons/120x120/21143877_ENERGY_CLASS_ICON_2010_A_PLUS.png"]').length > 0)
                    daneDoWyciagniecia.opisListaZDanymi += '<tr><td>Klasa energetyczna:</td><td>A+</td></tr>';
                if (document.querySelectorAll('.energy-label-wrapper .a-image [src="https://media3.bsh-group.com/Feature_Icons/120x120/21143877_ENERGY_CLASS_ICON_2010_A.png"]').length > 0)
                    daneDoWyciagniecia.opisListaZDanymi += '<tr><td>Klasa energetyczna:</td><td>A</td></tr>';
                if (document.querySelectorAll('.energy-label-wrapper .a-image [src="https://media3.bsh-group.com/Feature_Icons/120x120/21144041_ENERGY_CLASS_ICON_2010_B.png"]').length > 0)
                    daneDoWyciagniecia.opisListaZDanymi += '<tr><td>Klasa energetyczna:</td><td>B</td></tr>';
                daneDoWyciagniecia.opisListaZDanymi += '</tbody></table>';
        
                let ltt = document.querySelectorAll('#section-technicalspecs > .m-technical-info-rebrush > .js-technical-info-content-wrap > .js-technical-info-item-wrap .technical-info-item');
                daneDoWyciagniecia.opisListaZDanymi += '<p>Informacje o urządzeniu:</p><table><tbody>';
                for (let i = 0; i < ltt.length; i++) {
                    if (ltt[i].querySelectorAll('.technical-info-item-content').length > 0)
                        if (ltt[i].querySelector('.technical-info-item-content').innerText != 'Nie')
                            daneDoWyciagniecia.opisListaZDanymi += '<tr><td>' + ltt[i].querySelector('.technical-info-item-heading').innerText + '</td><td>' + ltt[i].querySelector('.technical-info-item-content').innerText + '</td></tr>';
                }
                daneDoWyciagniecia.opisListaZDanymi += '</table></tbody>';
            }
        }
        
        
        
        //TWORZENIE GOTOWEGO OPISU
        
        
        
        gotowyOpis += daneDoWyciagniecia.tytul + '\n\n';
        if(coChceszWyciagnac.cena === 1){
            gotowyOpis += daneDoWyciagniecia.cena + '\n';
        }
        if(coChceszWyciagnac.ean === 1){
            gotowyOpis += daneDoWyciagniecia.ean + '\n\n';
        }
        if(coChceszWyciagnac.opis === 1){
            gotowyOpis += daneDoWyciagniecia.opisTekstowy + '\n\n';
            gotowyOpis += daneDoWyciagniecia.opisListaZDanymi + '\n\n';
        }
       
        if (ostrzezenia != '') {
            gotowyOpis += 'UWAGA!!!!' + '\n';
            gotowyOpis += ostrzezenia + '\n';
        }
   
        daneDoWyciagniecia.tytul = document.querySelector('.service-area h2.a-heading.product-code .fragment.std-header-6 ').innerText + ' ' + document.querySelector('.service-area .m-producttitle h1').innerText;
        nazwaPoFormacie = daneDoWyciagniecia.tytul.toLowerCase();

        nazwaPoFormacie = nazwaPoFormacie.replace(/[^0-9a-zA-Z]+/g, "-");

        if (!/^[a-zA-Z]/.test(nazwaPoFormacie.charAt(0))) {
            nazwaPoFormacie = nazwaPoFormacie.slice(1);
        }
        maintext += gotowyOpis;


    } 
    
    
    
    
    
    
    else if (window.location.href.includes('www.bosch-home.pl')) {

        // function delay(ms) {
        //  return new Promise(resolve => setTimeout(resolve, ms));
        // }
        
        // function waitForInterval(conditionFn, intervalMs = 100, timeoutMs = 5000) {
        //     return new Promise((resolve, reject) => {
        //         const startTime = Date.now();
        //         const checkCondition = () => {
        //             if (conditionFn()) {
        //                 resolve(true);
        //             } else if (Date.now() - startTime > timeoutMs) {
        //                 reject(new Error('Timeout exceeded waiting for condition.'));
        //             } else {
        //                 setTimeout(checkCondition, intervalMs);
        //             }
        //         };
        //         checkCondition();
        //     });
        // }
        
        const daneDoWyciagniecia = {
            cena: '',
            ean: '',
            tytul: '',
            opisTekstowy: '',
            opisListaZDanymi: ''
        };
        let typ = '';
        let model = '';
        let gotowyOpis = '';
        
        //Dane to uzupełnienia
        let cenaSelektor = '';
        let eanSelektor = '';
        let eanSelektorScriptJson = 'script[type="application/ld+json"]:nth-of-type(3)';
        let marka = 'Bosch';
        let modelSelektor = '';
        let typSelektor = '';
        let opisTekstowySelektorBezListy = '';
        let opisTekstowySelektorzLista = 'div[data-testid="technical-overview-list"] div[data-testid="technical-overview-item"]'; //li
        let opisTekstowySelektorzListaNaglowek = 'div:nth-of-type(1)';
        let opisTekstowySelektorzListaWartosc = 'div:nth-of-type(2)';
        
        let ostrzezenia = '';
        let doRozwiniecia = 'div[data-state="closed"] button';
        let opisListaZDanymiSelektor1Wiersza = 'div[data-testid="feature-list"] .css-dbs51r';    
        let opisListaZDanymiSelektor1Naglowka = 'span[data-testid="feature-list-headline"]';
        let opisListaZDanymiSelektor1Wartosci = 'div[data-testid="feature-list-content"]';
        
        //wyciąganie EANU ze skryptu json
        // if(eanSelektorScriptJson != ''){
        //     let scriptElement = document.querySelector(eanSelektorScriptJson);
        //     let productData = JSON.parse(scriptElement.textContent);
        //     daneDoWyciagniecia.ean = productData.gtin;
        // }
        //wyciąganie Eanu
        // if(eanSelektor != '' && eanSelektorScriptJson == ''){
        //     if(document.querySelectorAll(eanSelektor).length>0){
        //         daneDoWyciagniecia.ean = document.querySelector(eanSelektor).innerText;
        //     }else{
        //         daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
        //     }
        // }else if(eanSelektorScriptJson == ''){
        //     daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
        // }
        
        //wyciąganie ceny
        // if(cenaSelektor != ''){
        //     if(document.querySelectorAll(cenaSelector).length > 0){
        //         daneDoWyciagniecia.cena = document.querySelector(cenaSelector).innerText;
        //     }else{
        //         daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
        //     }
        // }else{
        //     daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
        // }
        //tworzenie tutułu
        // if(typSelektor != ''){
        //     if(document.querySelectorAll(typSelektor).length >0){
        //         typ = document.querySelector(typSelektor).innerText;
        //     }
        // }
        // if(modelSelektor != ''){
        //     if(document.querySelectorAll(modelSelektor).length >0){
        //         model = document.querySelector(modelSelektor).innerText;
        //     }
        // }
        
        //nazwaProduktu
        //daneDoWyciagniecia.tytul = '<h3>'+typ + ' ' + marka + ' ' + model + ' ' + '[TU WPISZ SKU]</h3>';
        
        //daneDoWyciagniecia.tytul = document.querySelector('div[data-testid="product-title"] h1 > span').innerText + ' Bosch ' + document.querySelector('div[data-testid="product-title"] h1  span[data-testid="product-id-label"]').innerText;
        
        // if (document.querySelectorAll('.o-productdetail-rebrush .std-header-5').length > 0) {
        //     daneDoWyciagniecia.tytul += ' ' + document.querySelector('.o-productdetail-rebrush .std-header-5').innerText;
        // }
        
        //wyciąganie opisu tekstowego
    
        // if(opisTekstowySelektorBezListy != ''){
        //     if(document.querySelectorAll(opisTekstowySelektorBezListy).length > 0){
        //         daneDoWyciagniecia.opisTekstowy = '<p>'+ document.querySelector(opisTekstowySelektorBezListy).innerText + '</p>';
        //     }
        // }
        
        //wyciąganie opisu tekstowego z listy
        // if(opisTekstowySelektorzLista != ''){
        //     if(document.querySelectorAll(opisTekstowySelektorzLista).length > 0){
        //         document.querySelectorAll(opisTekstowySelektorzLista).forEach((el)=>{
        //             let napisNaglowek = '';
        //             let napisWartosc = '';
        //             if(el.querySelectorAll(opisTekstowySelektorzListaNaglowek).length > 0){
        //                  napisNaglowek = el.querySelector(opisTekstowySelektorzListaNaglowek).innerText;
        //             }
        //             if(el.querySelectorAll(opisTekstowySelektorzListaWartosc).length > 0){
        //                  napisWartosc = el.querySelector(opisTekstowySelektorzListaWartosc).innerText;
        //             }
        //             daneDoWyciagniecia.opisTekstowy += '<p>' + '<h5>'+napisNaglowek+ '</h5><br>'+ napisWartosc +'<br>' + '</p>';
        //         })
        //     }
        // }
        
        //wyciąganie opisu z listą danych technicznych
        // let rozwiniete = false; // Zmienna kontrolująca stan rozwinięcia
    
        // if (document.querySelectorAll(doRozwiniecia).length > 0) {
        //     document.querySelector(doRozwiniecia).scrollIntoView(); // Płynne przewinięcie ekranu do elementu
        //     setTimeout(() => {
        //         document.querySelectorAll(doRozwiniecia).forEach((el,index) => {
        //             if (el.offsetParent !== null) { // Sprawdzamy, czy element jest widoczny
        //                 setTimeout(() => {
        //                     el.click();
        //                      if (index === document.querySelectorAll(doRozwiniecia).length - 1) {
        //                         rozwiniete = true;
        //                         console.log('Wszystkie elementy kliknięte, rozwiniete = true');
        //                     }
    
        //                 }, 1000 * index); // Kliknięcie po 1 sekundzie
        //             }
        //         });
        //     }, 2000); // Kliknięcie po 1 sekundzie
        // }
    
        // let juzWykonano = false;
        // setInterval(()=>{
        //     if(rozwiniete && !juzWykonano){
        //         if(opisListaZDanymiSelektor1Wiersza != ''){
        //             if(document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).length > 0){
        //                 daneDoWyciagniecia.opisListaZDanymi += '<h4><strong>Dane techniczne:</strong></h4><table style="width:100%;"><tbody style="width:100%;">';
        //                 document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).forEach((el)=>{
        //                     console.log('poszloSrodek');
        //                     let t = el.querySelector(opisListaZDanymiSelektor1Naglowka);
        //                     let tt = el.querySelector(opisListaZDanymiSelektor1Wartosci);
                
        //                     // if (el.parentNode.querySelectorAll('p:nth-child(2)').length > 0) {
        //                     //     tt = el.parentNode.querySelector('p:nth-child(2)').innerText;
        //                     // } else {
        //                     //     tt = el.parentNode.querySelector('p:nth-child(1)').innerText;
        //                     // }
                
        //                     //t = t.split('$');
                
        //                         daneDoWyciagniecia.opisListaZDanymi += '<tr><td style="font-weight:600;vertical-align: top;padding-bottom: 6px;">' + t.innerText + '</td><td style="padding-bottom:6px;">' + tt.innerText + '</td></tr>';
    
        //                 })
        //                 daneDoWyciagniecia.opisListaZDanymi += '</table></tbody>';
        //             }
        //         }
                
                
                
        //         //TWORZENIE GOTOWEGO OPISU
                
                
                
        //         gotowyOpis += daneDoWyciagniecia.tytul + '\n\n';
        //         if(coChceszWyciagnac.cena === 1){
        //             gotowyOpis += daneDoWyciagniecia.cena + '\n';
        //         }
        //         if(coChceszWyciagnac.ean === 1){
        //             gotowyOpis += daneDoWyciagniecia.ean + '\n\n';
        //         }
        //         if(coChceszWyciagnac.opis === 1){
        //             gotowyOpis += daneDoWyciagniecia.opisTekstowy + '\n\n';
        //             gotowyOpis += daneDoWyciagniecia.opisListaZDanymi + '\n\n';
        //         }
               
        //         if (ostrzezenia != '') {
        //             gotowyOpis += 'UWAGA!!!!' + '\n';
        //             gotowyOpis += ostrzezenia + '\n';
        //         }
        //         nazwaPoFormacie = daneDoWyciagniecia.tytul.toLowerCase();
            
        //         nazwaPoFormacie = nazwaPoFormacie.replace(/[^0-9a-zA-Z]+/g, "-");
            
        //         if (!/^[a-zA-Z]/.test(nazwaPoFormacie.charAt(0))) {
        //             nazwaPoFormacie = nazwaPoFormacie.slice(1);
        //         }
            
        //         maintext += gotowyOpis;
        //         juzWykonano = true;
        //     }
        // })


        function formatTitleForFilename(title) {
            // Zamiana polskich znaków na ich odpowiedniki
            const polishChars = {
                'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ż': 'z', 'ź': 'z',
                'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ż': 'Z', 'Ź': 'Z'
            };
        
            // Usunięcie symboli, zamiana polskich znaków i spacji na "-"
            return title
                .replace(/[ąćęłńóśżźĄĆĘŁŃÓŚŻŹ]/g, char => polishChars[char] || char)
                .replace(/[^a-zA-Z0-9\s]/g, '')  // Usunięcie wszystkich znaków niealfanumerycznych oprócz spacji
                .trim()  // Usunięcie białych znaków z początku i końca
                .replace(/\s+/g, '-');  // Zamiana spacji na "-"
        }
        
        // Pobieranie tytułu z elementu i formatowanie go
        const title = document.querySelector('span[data-testid="buy-area-title-headline"]').innerText;
        const formattedTitle = formatTitleForFilename(title);
        
        console.log(formattedTitle)+'-'+document.querySelector('span[data-testid="product-id-label"]').innerText;
        nazwaPoFormacie = formattedTitle+'-'+document.querySelector('span[data-testid="product-id-label"]').innerText;

    } 






    else if (window.location.href.includes('www.miele.pl')) {
        const daneDoWyciagniecia = {
            cena: '',
            ean: '',
            tytul: '',
            opisTekstowy: '',
            opisListaZDanymi: ''
        };
        let typ = '';
        let model = '';
        let gotowyOpis = '';
        
        //Dane to uzupełnienia
        let cenaSelektor = '.hls-productpage-container .hls-product-price';
        let eanSelektor = '';
        let eanSelektorScriptJson = '';
        let marka = 'Miele';
        let modelSelektor = '';
        let typSelektor = '';
        let opisTekstowySelektorBezListy = '';
        let opisTekstowySelektorzLista = '';
        let opisTekstowySelektorzListaNaglowek = '';
        let opisTekstowySelektorzListaWartosc = '';
        
        let ostrzezenia = '';
        let opisListaZDanymiSelektor1Wiersza = '.dcf-accordion-content__body .dcf-tabs [data-testid="dcf-tabs-content__wrapper"] .dcf-tab-content';    
        let opisListaZDanymiSelektor1Naglowka = '';
        let opisListaZDanymiSelektor1Wartosci = '';
        
        //wyciąganie EANU ze skryptu json
        if(eanSelektorScriptJson != ''){
            let scriptElement = document.querySelector(eanSelektorScriptJson);
            let productData = JSON.parse(scriptElement.textContent);
            daneDoWyciagniecia.ean = productData.gtin;
        }
        //wyciąganie Eanu
        if(eanSelektor != '' && eanSelektorScriptJson == ''){
            if(document.querySelectorAll(eanSelektor).length>0){
                daneDoWyciagniecia.ean = document.querySelector(eanSelektor).innerText;
            }else{
                daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
            }
        }else if(eanSelektorScriptJson == ''){
            daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
        }
        
        //wyciąganie ceny
        if(cenaSelektor != ''){
            if(document.querySelectorAll(cenaSelektor).length > 0){
                daneDoWyciagniecia.cena = document.querySelector(cenaSelektor).innerText;
            }else{
                daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
            }
        }else{
            daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
        }
        
        
        //nazwaProduktu
        daneDoWyciagniecia.tytul = '<h3>'+document.querySelector('li[data-testid="dcf-breadcrumb"]:nth-child(3) .dcf-breadcrumbs__link').innerText.trim().replace('Lodówko-zamrażarki wolnostojące','Lodówko-zamrażarka wolnostojąca').replace('piekarniki-parowe','Piekarnik parowy')+' MIELE '+ document.querySelector('.dcf-h1.hls-product-title').innerText.trim() + '</h3>';
        
        //wyciąganie opisu tekstowego
        if(opisTekstowySelektorBezListy != ''){
            if(document.querySelectorAll(opisTekstowySelektorBezListy).length > 0){
                daneDoWyciagniecia.opisTekstowy = '<p>'+ document.querySelector(opisTekstowySelektorBezListy).innerText + '</p>';
            }
        }
        
        //wyciąganie opisu tekstowego z listy
        if(opisTekstowySelektorzLista != ''){
            if(document.querySelectorAll(opisTekstowySelektorzLista).length > 0){
                document.querySelectorAll(opisTekstowySelektorzLista).forEach((el)=>{
                    let napisNaglowek = '';
                    let napisWartosc = '';
                    if(el.querySelectorAll(opisTekstowySelektorzListaNaglowek).length > 0){
                         napisNaglowek = el.querySelector(opisTekstowySelektorzListaNaglowek).innerText;
                    }
                    if(el.querySelectorAll(opisTekstowySelektorzListaWartosc).length > 0){
                         napisWartosc = el.querySelector(opisTekstowySelektorzListaWartosc).innerText;
                    }
                    daneDoWyciagniecia.opisTekstowy += '<p>' + '<h5>'+napisNaglowek+ '</h5><br>'+ napisWartosc +'<br>' + '</p>';
                })
            }
        }
        
        //wyciąganie opisu z listą danych technicznych
        if(opisListaZDanymiSelektor1Wiersza != ''){
            if(document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).length > 0){
                daneDoWyciagniecia.opisListaZDanymi += '<table style="width:100%;"><tbody style="width:100%;">';
                let t1 = document.querySelectorAll(opisListaZDanymiSelektor1Wiersza);
                let t11 = document.querySelectorAll('.dcf-accordion-content__body .dcf-tabs .dcf-tabs-header__wrapper .dcf-tab-header');
                for(let i=0; i<t1.length;i++) {
                    if(t11[i].querySelector('.dcf-tab-header-button').innerText.trim()!='Kategoria urządzeń' && t11[i].querySelector('.dcf-tab-header-button').innerText.trim()!='Wyposażenie dostarczone wraz z urządzeniem' && t11[i].querySelector('.dcf-tab-header-button').innerText.trim()!='Dostępne języki wyświetlacza') {
                        daneDoWyciagniecia.opisListaZDanymi += '<tr><td><h4>'+ t11[i].querySelector('.dcf-tab-header-button').innerText.trim()+'</h4></td></tr>';
                        for(let j=0; j<t1[i].querySelectorAll('.dcf-table-item .dcf-table-item__label').length;j++) {
                            if(t1[i].querySelectorAll('.dcf-table-item .dcf-table-item__value')[j].querySelectorAll('svg').length==1) {
                                daneDoWyciagniecia.opisListaZDanymi += '<tr><td style="font-weight: 600; vertical-align: top; padding-bottom: 6px;">'+ t1[i].querySelectorAll('.dcf-table-item .dcf-table-item__label')[j].innerText.toLowerCase().trim()+'</td><td style="padding-bottom: 6px;">tak</td></tr>';
                            } else {
                                daneDoWyciagniecia.opisListaZDanymi += '<tr><td style="font-weight: 600; vertical-align: top; padding-bottom: 6px;">'+ t1[i].querySelectorAll('.dcf-table-item .dcf-table-item__label')[j].innerText.toLowerCase().trim()+'</td><td style="padding-bottom: 6px;">'+t1[i].querySelectorAll('.dcf-table-item .dcf-table-item__value')[j].innerText.toLowerCase().trim()+'</td></tr>';
                                if(t11[i].querySelector('.dcf-tab-header-button').innerText.trim()=='EAN')
                                    daneDoWyciagniecia.ean = t1[i].querySelectorAll('.dcf-table-item .dcf-table-item__value')[j].innerText.toLowerCase().trim();
                            }
                            
                        }
                    }
                }
                daneDoWyciagniecia.opisListaZDanymi += '</table></tbody>';
            }
        }
        
        
        
        //TWORZENIE GOTOWEGO OPISU
        
        
        
        gotowyOpis += daneDoWyciagniecia.tytul + '\n\n';
        if(coChceszWyciagnac.cena === 1){
            gotowyOpis += daneDoWyciagniecia.cena + '\n';
        }
        if(coChceszWyciagnac.ean === 1){
            gotowyOpis += daneDoWyciagniecia.ean + '\n\n';
        }
        if(coChceszWyciagnac.opis === 1){
            gotowyOpis += daneDoWyciagniecia.opisTekstowy + '\n\n';
            gotowyOpis += daneDoWyciagniecia.opisListaZDanymi + '\n\n';
        }
       
        if (ostrzezenia != '') {
            gotowyOpis += 'UWAGA!!!!' + '\n';
            gotowyOpis += ostrzezenia + '\n';
        }
        nazwaPoFormacie = daneDoWyciagniecia.tytul.replace(/ /g, "-").toLowerCase();
        nazwaPoFormacie = nazwaPoFormacie.split('.').join('');
        maintext += gotowyOpis;
        
    } 
    
    
    
    
    
    else if (window.location.href.includes('https://home.liebherr.com')) {
        const daneDoWyciagniecia = {
            cena: '',
            ean: '',
            tytul: '',
            opisTekstowy: '',
            opisListaZDanymi: ''
        };
        let typ = '';
        let model = '';
        let gotowyOpis = '';
        
        //Dane to uzupełnienia
        let cenaSelektor = '.shop .shop-price__current-price';
        let eanSelektor = '';
        let eanSelektorScriptJson = 'script[type="application/ld+json"]';
        let marka = 'Liebherr';
        let modelSelektor = '';
        let typSelektor = '';
        let opisTekstowySelektorBezListy = '';
        let opisTekstowySelektorzLista = '';
        let opisTekstowySelektorzListaNaglowek = '';
        let opisTekstowySelektorzListaWartosc = '';
        
        let ostrzezenia = '';
        let opisListaZDanymiSelektor1Wiersza = '.details .data_table_module .data_table_module__row';    
        let opisListaZDanymiSelektor1Naglowka = '';
        let opisListaZDanymiSelektor1Wartosci = '';
        
        //wyciąganie EANU ze skryptu json
        if(eanSelektorScriptJson != ''){
            let scriptElement = document.querySelector(eanSelektorScriptJson);
            let productData = JSON.parse(scriptElement.textContent);
            daneDoWyciagniecia.ean = productData.gtin13;
        }
        //wyciąganie Eanu
        if(eanSelektor != '' && eanSelektorScriptJson == ''){
            if(document.querySelectorAll(eanSelektor).length>0){
                daneDoWyciagniecia.ean = document.querySelector(eanSelektor).innerText;
            }else{
                daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
            }
        }else if(eanSelektorScriptJson == ''){
            daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
        }
        
        //wyciąganie ceny
        if(cenaSelektor != ''){
            if(document.querySelectorAll(cenaSelektor).length > 0){
                daneDoWyciagniecia.cena = document.querySelector(cenaSelektor).innerText;
            }else{
                daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
            }
        }else{
            daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
        }
        //tworzenie tutułu
        if(typSelektor != ''){
            if(document.querySelectorAll(typSelektor).length >0){
                let typArray = document.querySelectorAll(typSelektor);
                typArray.forEach((el)=>{
                    let kategoria = el.innerText;
        
                    if(kategoria == 'Okapy'){
                        typ = 'Okap';
                    }else if(kategoria == 'Płyty z wyciągiem'){
                        typ = 'Płyta z wyciągiem';
                    }
                })
            }
        }
        
        if(document.querySelector('.product_topinfo_module h1 em').innerText.toLowerCase().split('hłodziarko').length>1) {
            daneDoWyciagniecia.tytul+='<h3>Chłodziarko-zamrażarka '+'[SYMBOL]'+' '+'[LINIA]'+' '+document.querySelector('.product_topinfo_module h1 em').innerText.split('zamrażarka')[1]+'</h3>'+'<br><span>'+'[TECHNOLOGIE]'+'</span>';
        } else
        if(document.querySelector('.product_topinfo_module h1 em').innerText.toLowerCase().split('hłodziarka').length>1) {
            daneDoWyciagniecia.tytul+='<h3>Chłodziarka '+'[SYMBOL]'+' '+'[LINIA]'+' '+document.querySelector('.product_topinfo_module h1 em').innerText.split('hłodziarka')[1]+'</h3>'+'<br><span>'+'[TECHNOLOGIE]'+'</span>';
        } else
        if(document.querySelector('.product_topinfo_module h1 em').innerText.toLowerCase().split('amrażarka').length>1) {
            daneDoWyciagniecia.tytul+='<h3>Zamrażarka '+'[SYMBOL]'+' '+'[LINIA]'+' '+document.querySelector('.product_topinfo_module h1 em').innerText.split('amrażarka')[1]+'</h3>'+'<br><span>'+'[TECHNOLOGIE]'+'</span>';
        }
        
        
        //wyciąganie opisu tekstowego
        if(opisTekstowySelektorBezListy != ''){
            if(document.querySelectorAll(opisTekstowySelektorBezListy).length > 0){
                daneDoWyciagniecia.opisTekstowy = '<p>'+ document.querySelector(opisTekstowySelektorBezListy).innerText + '</p>';
            }
        }
        
        //wyciąganie opisu tekstowego z listy
        if(opisTekstowySelektorzLista != ''){
            if(document.querySelectorAll(opisTekstowySelektorzLista).length > 0){
                document.querySelectorAll(opisTekstowySelektorzLista).forEach((el)=>{
                    let napisNaglowek = '';
                    let napisWartosc = '';
                    if(el.querySelectorAll(opisTekstowySelektorzListaNaglowek).length > 0){
                         napisNaglowek = el.querySelector(opisTekstowySelektorzListaNaglowek).innerText;
                    }
                    if(el.querySelectorAll(opisTekstowySelektorzListaWartosc).length > 0){
                         napisWartosc = el.querySelector(opisTekstowySelektorzListaWartosc).innerText;
                    }
                    daneDoWyciagniecia.opisTekstowy += '<p>' + '<h5>'+napisNaglowek+ '</h5><br>'+ napisWartosc +'<br>' + '</p>';
                })
            }
        }
        
        //wyciąganie opisu z listą danych technicznych
        if(opisListaZDanymiSelektor1Wiersza != ''){
            if(document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).length > 0){
                let pdetails=document.querySelectorAll('.details .data_table_module .data_table_module__row');
                daneDoWyciagniecia.opisListaZDanymi+='<table style="width:100%;"><tbody style="width:100%;">';
                for(let i=0;i<pdetails.length;i++) {
                    daneDoWyciagniecia.opisListaZDanymi+='<tr style="width:100%;"><td style="width:50%;padding-right:10px;">'+pdetails[i].querySelector('.data_table_module__cell:nth-child(1)').innerText+'</td><td style="width:50%;font-weight:600;">'+pdetails[i].querySelector('.data_table_module__cell:nth-child(2)').innerText+'</td></tr>';
                }
                daneDoWyciagniecia.opisListaZDanymi+='</tbody></table>';
                let acordionitem=document.querySelectorAll('#accordion2 .accordionItem');
                for(let i=0;i<acordionitem.length;i++) {
                    let atitle=acordionitem[i].querySelector('.slideLink h4 a .text').innerText;
                    daneDoWyciagniecia.opisListaZDanymi+='<h4 style="font-weight:600;">'+atitle+'</h4><table style="width:100%;"><tbody style="width:100%;">';
                    let atresc=acordionitem[i].querySelectorAll('.technical_data_module tbody tr');
                    for(let j=0;j<atresc.length;j++) {
                        if(atresc[j].querySelector('td').innerText.trim()!='—' && atresc[j].querySelector('td').innerText.trim()!='0') {
                            let atrow='';
                            if(atresc[j].querySelector('td').innerHTML.replace('\n','').replace('✔','').length==0) {
                                atrow='<tr style="width:100%;"><td style="width:50%;padding-right:10px;">'+atresc[j].querySelector('th').innerText.trim()+'</td><td style="font-weight:600;">TAK</td></tr>';
                            } else {
                                atrow='<tr style="width:100%;"><td style="width:50%;padding-right:10px;">'+atresc[j].querySelector('th').innerText.trim()+'</td><td style="font-weight:600;">'+atresc[j].querySelector('td').innerText.trim().replace(/(\r\n\t|\n|\r\t)/g,' ')+'</td></tr>';
                            }
                            daneDoWyciagniecia.opisListaZDanymi+=atrow;
                        }
                        
                    }
                    daneDoWyciagniecia.opisListaZDanymi+='</tbody></table>';
                }
            }
        }
        
        
        
        //TWORZENIE GOTOWEGO OPISU
        
        
        
        gotowyOpis += daneDoWyciagniecia.tytul + '\n\n';
        if(coChceszWyciagnac.cena === 1){
            gotowyOpis += daneDoWyciagniecia.cena + '\n';
        }
        if(coChceszWyciagnac.ean === 1){
            gotowyOpis += daneDoWyciagniecia.ean + '\n\n';
        }
        if(coChceszWyciagnac.opis === 1){
            gotowyOpis += daneDoWyciagniecia.opisTekstowy + '\n\n';
            gotowyOpis += daneDoWyciagniecia.opisListaZDanymi + '\n\n';
        }
       
        if (ostrzezenia != '') {
            gotowyOpis += 'UWAGA!!!!' + '\n';
            gotowyOpis += ostrzezenia + '\n';
        }
        nazwaPoFormacie = daneDoWyciagniecia.tytul.replace(/ /g, "-").toLowerCase();
        nazwaPoFormacie = nazwaPoFormacie.split('.').join('');
        maintext += gotowyOpis;

        nazwaPoFormacie = document.querySelector('.shop h1').innerText.replace(/\s+/g, "-");
    }




    else if (window.location.href.includes('https://ciarko.com')) {
        const daneDoWyciagniecia = {
            cena: '',
            ean: '',
            tytul: '',
            opisTekstowy: '',
            opisListaZDanymi: ''
        };
        let typ = '';
        let model = '';
        let gotowyOpis = '';
        
        //Dane to uzupełnienia
        let cenaSelektor = '';
        let eanSelektor = '';
        let marka = 'CIARKO';
        let modelSelektor = '.wpb_column.vc_column_container.vc_col-sm-4 > .vc_column-inner .wpb_text_column.wpb_content_element:nth-of-type(3) span';
        let typSelektor = '.wpb_column.vc_column_container.vc_col-sm-4 > .vc_column-inner .wpb_text_column.wpb_content_element:nth-of-type(2) span';
        let opisTekstowySelektorBezListy = '.vc_row.wpb_row.vc_row-fluid:nth-of-type(3) .wpb_column.vc_column_container.vc_col-sm-8 > .vc_column-inner .vc_tta-panel:nth-last-of-type(1) p';
        let ostrzezenia = 'ZDJĘCIA POBRANE SĄ DLA WSZYSTKICH KOLORÓW DO TEGO PRODUKTU';
        
        let opisListaZDanymiSelektor1Wiersza = '.wpb_column.vc_column_container.vc_col-sm-8 .vc_tta-panels .vc_tta-panel.vc_active .vc_tta-panel-body .wpb_text_column.wpb_content_element';    
        let opisListaZDanymiSelektor1Naglowka = 'p > span';
        let opisListaZDanymiSelektor1Wartosci = '';
        
        
        //wyciąganie ceny
        if(cenaSelektor != ''){
            if(document.querySelectorAll(cenaSelector).length > 0){
                daneDoWyciagniecia.cena = document.querySelector(cenaSelector).innerText;
            }else{
                daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
            }
        }else{
            daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
        }
        //wyciąganie Eanu
        if(eanSelektor != ''){
            if(document.querySelectorAll(eanSelektor).length>0){
                daneDoWyciagniecia.ean = document.querySelector(eanSelektor).innerText;
            }else{
                daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
            }
        }else{
            daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
        }
        //tworzenie tutułu
        if(typSelektor != ''){
            if(document.querySelectorAll(typSelektor).length >0){
                typ = document.querySelector(typSelektor).innerText;
            }
        }
        if(modelSelektor != ''){
            if(document.querySelectorAll(modelSelektor).length >0){
                model = document.querySelector(modelSelektor).innerText;
            }
        }
        daneDoWyciagniecia.tytul = '<h3>'+typ + ' ' + marka + ' ' + model + ' ' + '[TU WPISZ SKU]</h3>';
        //wyciąganie opisu tekstowego
        if(opisTekstowySelektorBezListy != ''){
            if(document.querySelectorAll(opisTekstowySelektorBezListy).length > 0){
                daneDoWyciagniecia.opisTekstowy = '<p>'+ document.querySelector(opisTekstowySelektorBezListy).innerText + '</p>';
            }
        }
        //wyciąganie opisu z listą danych technicznych
        if(opisListaZDanymiSelektor1Wiersza != ''){
            if(document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).length > 0){
                daneDoWyciagniecia.opisListaZDanymi += '<table style="width:100%;"><tbody style="width:100%;">';
                document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).forEach((el)=>{
                    let napisOrg1 = el.querySelector(opisListaZDanymiSelektor1Naglowka).innerText;
                    let napisOrg2 = napisOrg1.split(':');
                
                    let napisFormatowany1 = napisOrg2[0].trim();
                    let napisFormatowany2 = napisOrg2[1].trim();
                
                    if(napisFormatowany1 != "" && napisFormatowany2 != ""){
                        daneDoWyciagniecia.opisListaZDanymi += '<tr><td>'+napisFormatowany1+ '</td><td style="font-weight: 600;">' +napisFormatowany2+ '</td></tr>';
                    }
                })
                daneDoWyciagniecia.opisListaZDanymi += '</table></tbody>';
            }
        }
        
        //TWORZENIE GOTOWEGO OPISU
        
        gotowyOpis += daneDoWyciagniecia.tytul + '\n\n';
        if(coChceszWyciagnac.cena === 1){
            gotowyOpis += daneDoWyciagniecia.cena + '\n';
        }
        if(coChceszWyciagnac.ean === 1){
            gotowyOpis += daneDoWyciagniecia.ean + '\n\n';
        }
        if(coChceszWyciagnac.opis === 1){
            gotowyOpis += daneDoWyciagniecia.opisTekstowy + '\n\n';
            gotowyOpis += daneDoWyciagniecia.opisListaZDanymi + '\n\n';
        }
       
        if (ostrzezenia != '') {
            gotowyOpis += 'UWAGA!!!!' + '\n';
            gotowyOpis += ostrzezenia + '\n';
        }
        nazwaPoFormacie = daneDoWyciagniecia.tytul.replace(/ /g, "-").toLowerCase();
        nazwaPoFormacie = nazwaPoFormacie.split('.').join('');
        maintext += gotowyOpis;
    }




    else if (window.location.href.includes('https://www.elica.com')) {
        
//https://www.elica.com/
//zmienne do przetrzymywania danych


const daneDoWyciagniecia = {
    cena: '',
    ean: '',
    tytul: '',
    opisTekstowy: '',
    opisListaZDanymi: ''
};
let typ = '';
let model = '';
let gotowyOpis = '';

//Dane to uzupełnienia
let cenaSelektor = '';
let eanSelektor = '';
let eanSelektorScriptJson = '';
let marka = 'Elica';
let modelSelektor = '.pt-navbar-height .breadcrumb__wrapper .breadcrumb .breadcrumb__item a';
let typSelektor = '.pt-navbar-height .breadcrumb__wrapper .breadcrumb .breadcrumb__item a';
let opisTekstowySelektorBezListy = '';
let opisTekstowySelektorzLista = '#technologies .columns-title-description';
let opisTekstowySelektorzListaNaglowek = 'h3.h4';
let opisTekstowySelektorzListaWartosc = 'div > p~p';

let ostrzezenia = 'PRODUKT Z WARJANTAMI!!';
let opisListaZDanymiSelektor1Wiersza = '.container .accordion-item .accordion-collapse .col-md-6.mb-3';    
let opisListaZDanymiSelektor1Naglowka = '.font-monospace.text-uppercase';
let opisListaZDanymiSelektor1Wartosci = 'span.fs-sm.font-monospace';

//wyciąganie EANU ze skryptu json
if(eanSelektorScriptJson != ''){
    let scriptElement = document.querySelector(eanSelektorScriptJson);
    let productData = JSON.parse(scriptElement.textContent);
    daneDoWyciagniecia.ean = productData.gtin;
}
//wyciąganie Eanu
if(eanSelektor != '' && eanSelektorScriptJson == ''){
    if(document.querySelectorAll(eanSelektor).length>0){
        daneDoWyciagniecia.ean = document.querySelector(eanSelektor).innerText;
    }else{
        daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
    }
}else if(eanSelektorScriptJson == ''){
    daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
}

//wyciąganie ceny
if(cenaSelektor != ''){
    if(document.querySelectorAll(cenaSelector).length > 0){
        daneDoWyciagniecia.cena = document.querySelector(cenaSelector).innerText;
    }else{
        daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
    }
}else{
    daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
}
//tworzenie tutułu
if(typSelektor != ''){
    if(document.querySelectorAll(typSelektor).length >0){
        let typArray = document.querySelectorAll(typSelektor);
        typArray.forEach((el)=>{
            let kategoria = el.innerText;

            if(kategoria == 'Okapy'){
                typ = 'Okap';
            }else if(kategoria == 'Płyty z wyciągiem'){
                typ = 'Płyta z wyciągiem';
            }
        })
    }
}
if(modelSelektor != ''){
    if(document.querySelectorAll(modelSelektor).length >0){
        let modelArray = document.querySelectorAll(modelSelektor);
        modelArray.forEach((el)=>{
            let kategoria = el.innerText;
            if(kategoria == 'Ściana'){
                model = 'ścienny';
            }else if(kategoria == 'Wyspa'){
                model = 'wyspowy';
            }else if(kategoria == 'Zawieszone'){
                model = 'zawieszane';
            }else if(kategoria == 'Sufit'){
                model = 'sufitowy';
            }else if(kategoria == 'Wsuwane'){
                model = 'wsuwany';
            }else if(kategoria == 'Zabudowa'){
                model = 'do zabudowy';
            }
        })
    }
}

//nazwaProduktu
daneDoWyciagniecia.tytul = '<h3>'+typ + ' ' + model + ' ' + marka + ' ' + '[TU WPISZ SKU]</h3>';

//wyciąganie opisu tekstowego
if(opisTekstowySelektorBezListy != ''){
    if(document.querySelectorAll(opisTekstowySelektorBezListy).length > 0){
        daneDoWyciagniecia.opisTekstowy = '<p>'+ document.querySelector(opisTekstowySelektorBezListy).innerText + '</p>';
    }
}

//wyciąganie opisu tekstowego z listy
if(opisTekstowySelektorzLista != ''){
    if(document.querySelectorAll(opisTekstowySelektorzLista).length > 0){
        document.querySelectorAll(opisTekstowySelektorzLista).forEach((el)=>{
            let napisNaglowek = '';
            let napisWartosc = '';
            if(el.querySelectorAll(opisTekstowySelektorzListaNaglowek).length > 0){
                 napisNaglowek = el.querySelector(opisTekstowySelektorzListaNaglowek).innerText;
            }
            if(el.querySelectorAll(opisTekstowySelektorzListaWartosc).length > 0){
                 napisWartosc = el.querySelector(opisTekstowySelektorzListaWartosc).innerText;
            }
            daneDoWyciagniecia.opisTekstowy += '<p>' + '<h5>'+napisNaglowek+ '</h5><br>'+ napisWartosc +'<br>' + '</p>';
        })
    }
}

//wyciąganie opisu z listą danych technicznych
if(opisListaZDanymiSelektor1Wiersza != ''){
    if(document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).length > 0){
        daneDoWyciagniecia.opisListaZDanymi += '<table style="width:100%;"><tbody style="width:100%;">';
        document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).forEach((el)=>{
            let napisOrg1 = el.querySelector(opisListaZDanymiSelektor1Naglowka).innerText;
            let napisOrg2 = el.querySelector(opisListaZDanymiSelektor1Wartosci).innerText;
        
            let napisFormatowany1 = napisOrg1.charAt(0).toUpperCase() + napisOrg1.slice(1).toLowerCase();
            let napisFormatowany2 = napisOrg2.charAt(0).toUpperCase() + napisOrg2.slice(1).toLowerCase();

        
            if(napisFormatowany1 != "" && napisFormatowany2 != ""){
                daneDoWyciagniecia.opisListaZDanymi += '<tr><td>'+napisFormatowany1+ '</td><td style="font-weight: 600;">' +napisFormatowany2+ '</td></tr>';
            }
        })
        daneDoWyciagniecia.opisListaZDanymi += '</table></tbody>';
    }
}



//TWORZENIE GOTOWEGO OPISU



gotowyOpis += daneDoWyciagniecia.tytul + '\n\n';
        if(coChceszWyciagnac.cena === 1){
            gotowyOpis += daneDoWyciagniecia.cena + '\n';
        }
        if(coChceszWyciagnac.ean === 1){
            gotowyOpis += daneDoWyciagniecia.ean + '\n\n';
        }
        if(coChceszWyciagnac.opis === 1){
            gotowyOpis += daneDoWyciagniecia.opisTekstowy + '\n\n';
            gotowyOpis += daneDoWyciagniecia.opisListaZDanymi + '\n\n';
        }
       
        if (ostrzezenia != '') {
            gotowyOpis += 'UWAGA!!!!' + '\n';
            gotowyOpis += ostrzezenia + '\n';
        }
nazwaPoFormacie = daneDoWyciagniecia.tytul.replace(/ /g, "-").toLowerCase();
        nazwaPoFormacie = nazwaPoFormacie.split('.').join('');
maintext += gotowyOpis;


    }



    else if (window.location.href.includes('https://www.aeg.pl')) {
        console.log('START');
        const daneDoWyciagniecia = {
            cena: '',
            ean: '',
            tytul: '',
            opisTekstowy: '',
            opisListaZDanymi: ''
        };
        let typ = '';
        let model = '';
        let gotowyOpis = '';
        
        // Dane do uzupełnienia
        let cenaSelektor = '';
        let eanSelektor = '';
        let marka = 'AEG';
        let modelSelektor = '';
        let typSelektor = '.product-landing__title h1';
        let opisTekstowySelektorBezListy = '';
        let opisTekstowySelektorzLista = '.grid-container .product_features';
        let opisTekstowySelektorzListaNaglowek = 'p.color-gold';
        let opisTekstowySelektorzListaWartosc = 'p.weight-normal';
        let ostrzezenia = '';
        
        let opisListaZDanymiSelektor1Wiersza = '.tech-specs__content .tech-specs__section-column-content-box';
        let opisListaZDanymiSelektor1Naglowka = 'p> span';
        let opisListaZDanymiSelektor1Wartosci = 'p:nth-of-type(2)';
        
        // Przewijanie do elementu
        const targetElement = document.querySelector('.product-description');
        targetElement.scrollIntoView({ behavior: 'smooth' });
        console.log('SCROLL');
        // Poczekaj, aż element stanie się widoczny
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Kliknięcie przycisku
        const buttonToClick = document.querySelector('.tech-specs__tab.swiper-slide button.tech-specs__tab-link[data-tech-spec="5"]');
        buttonToClick.click();
        console.log('CLICK');
        // Poczekaj na załadowanie danych
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Wykonanie dodatkowych operacji
        daneDoWyciagniecia.opisListaZDanymi = '';
        document.querySelectorAll('.tech-specs__section-column-content-box').forEach((section) => {
            let header = section.querySelector('.tech-specs__section-column-title').innerText;
            daneDoWyciagniecia.opisListaZDanymi += `<h3>${header}</h3><table style="width:100%;"><tbody style="width:100%;">`;
        
            section.querySelectorAll('.tech-specs__list-item').forEach((el) => {
                let strongLabel = el.querySelector('.tech-specs__list-item-label');
                let napisOrg1 = strongLabel ? strongLabel.innerText : el.innerText;
                let napisOrg2 = strongLabel ? el.innerText.replace(napisOrg1, '') : '';
                let napisFormatowany1 = napisOrg1.trim();
                let napisFormatowany2 = napisOrg2.trim();
        
                if (napisFormatowany1 != "" && napisFormatowany2 != "") {
                    daneDoWyciagniecia.opisListaZDanymi += `<tr><td>${napisFormatowany1}</td><td style="font-weight: 600;">${napisFormatowany2}</td></tr>`;
                }
            });
            daneDoWyciagniecia.opisListaZDanymi += '</tbody></table>';
        });
        
        // Wyciąganie ceny
        if (cenaSelektor != '') {
            if (document.querySelectorAll(cenaSelektor).length > 0) {
                daneDoWyciagniecia.cena = document.querySelector(cenaSelektor).innerText;
            } else {
                daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
            }
        } else {
            daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
        }
        
        // Wyciąganie EAN
        if (eanSelektor != '') {
            if (document.querySelectorAll(eanSelektor).length > 0) {
                daneDoWyciagniecia.ean = document.querySelector(eanSelektor).innerText;
            } else {
                daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
            }
        } else {
            daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
        }
        
        // Tworzenie tytułu
        if (typSelektor != '') {
            if (document.querySelectorAll(typSelektor).length > 0) {
                typ = document.querySelector(typSelektor).innerText;
            }
        }
        if (modelSelektor != '') {
            if (document.querySelectorAll(modelSelektor).length > 0) {
                model = document.querySelector(modelSelektor).innerText;
            }
        }
        daneDoWyciagniecia.tytul = `<h3>${typ} ${marka} ${model} [TU WPISZ SKU]</h3>`;
        
        // Wyciąganie opisu tekstowego
        if (opisTekstowySelektorBezListy != '') {
            if (document.querySelectorAll(opisTekstowySelektorBezListy).length > 0) {
                daneDoWyciagniecia.opisTekstowy = `<p>${document.querySelector(opisTekstowySelektorBezListy).innerText}</p>`;
            }
        }
        
        // Wyciąganie opisu tekstowego z listy
        if (opisTekstowySelektorzLista != '') {
            if (document.querySelectorAll(opisTekstowySelektorzLista).length > 0) {
                document.querySelectorAll(opisTekstowySelektorzLista).forEach((el) => {
                    let napisNaglowek = el.querySelector(opisTekstowySelektorzListaNaglowek).innerText;
                    let napisWartosc = el.querySelector(opisTekstowySelektorzListaWartosc).innerText;
                    daneDoWyciagniecia.opisTekstowy += `<p><h5>${napisNaglowek}</h5><br>${napisWartosc}<br></p>`;
                });
            }
        }
        
        // Tworzenie gotowego opisu
        gotowyOpis += daneDoWyciagniecia.tytul + '\n\n';
        if(coChceszWyciagnac.cena === 1){
            gotowyOpis += daneDoWyciagniecia.cena + '\n';
        }
        if(coChceszWyciagnac.ean === 1){
            gotowyOpis += daneDoWyciagniecia.ean + '\n\n';
        }
        if(coChceszWyciagnac.opis === 1){
            gotowyOpis += daneDoWyciagniecia.opisTekstowy + '\n\n';
            gotowyOpis += daneDoWyciagniecia.opisListaZDanymi + '\n\n';
        }
       
        if (ostrzezenia != '') {
            gotowyOpis += 'UWAGA!!!!' + '\n';
            gotowyOpis += ostrzezenia + '\n';
        }
        nazwaPoFormacie = daneDoWyciagniecia.tytul.replace(/ /g, "-").toLowerCase();
        nazwaPoFormacie = nazwaPoFormacie.split('.').join('');
        maintext += gotowyOpis;
        
    }
    
    
    
    else if (window.location.href.includes('https://www.bora.com/')){
        //https://bora.com/
//zmienne do przetrzymywania danych


const daneDoWyciagniecia = {
    cena: '',
    ean: '',
    tytul: '',
    opisTekstowy: '',
    opisListaZDanymi: ''
};
let typ = '';
let model = '';
let gotowyOpis = '';

//Dane to uzupełnienia
let cenaSelektor = '';
let eanSelektor = '';
let marka = 'Bora';
let modelSelektor = '';
let typSelektor = '.m-rangedetailpageproductname h1';
let opisTekstowySelektorBezListy = '';
let opisTekstowySelektorzLista = '.o-accordion__features li';
let opisTekstowySelektorzListaNaglowek = 'label';
let opisTekstowySelektorzListaWartosc = '.o-accordion__content';
let ostrzezenia = '';

let opisListaZDanymiSelektor1Wiersza = '.b-hide--md .m-producttechnical tbody tr';    
let opisListaZDanymiSelektor1Naglowka = 'td:nth-of-type(1)';
let opisListaZDanymiSelektor1Wartosci = 'td:nth-of-type(2)';


//wyciąganie ceny
if(cenaSelektor != ''){
    if(document.querySelectorAll(cenaSelector).length > 0){
        daneDoWyciagniecia.cena = document.querySelector(cenaSelector).innerText;
    }else{
        daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
    }
}else{
    daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
}
//wyciąganie Eanu
if(eanSelektor != ''){
    if(document.querySelectorAll(eanSelektor).length>0){
        daneDoWyciagniecia.ean = document.querySelector(eanSelektor).innerText;
    }else{
        daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
    }
}else{
    daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
}
//tworzenie tutułu
if(typSelektor != ''){
    if(document.querySelectorAll(typSelektor).length >0){
        typ = document.querySelector(typSelektor).innerText;
    }
}
if(modelSelektor != ''){
    if(document.querySelectorAll(modelSelektor).length >0){
        model = document.querySelector(modelSelektor).innerText;
    }
}
daneDoWyciagniecia.tytul = '<h3>'+typ + ' ' + marka + ' ' + model + ' ' + '[TU WPISZ SKU]</h3>';
//wyciąganie opisu tekstowego
if(opisTekstowySelektorBezListy != ''){
    if(document.querySelectorAll(opisTekstowySelektorBezListy).length > 0){
        daneDoWyciagniecia.opisTekstowy = '<p>'+ document.querySelector(opisTekstowySelektorBezListy).innerText + '</p>';
    }
}
//wyciąganie opisu tekstowego z listy
if(opisTekstowySelektorzLista != ''){
    if(document.querySelectorAll(opisTekstowySelektorzLista).length > 0){
        document.querySelectorAll(opisTekstowySelektorzLista).forEach((el)=>{
            let napisNaglowek = el.querySelector(opisTekstowySelektorzListaNaglowek).innerText;
            let napisWartosc = el.querySelector(opisTekstowySelektorzListaWartosc).innerText;
            daneDoWyciagniecia.opisTekstowy = '<p>' + '<h5>'+napisNaglowek+ '</h5><br>'+ napisWartosc +'<br>' + '</p>';
        })
    }
}

//wyciąganie opisu z listą danych technicznych
if(opisListaZDanymiSelektor1Wiersza != ''){
    if(document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).length > 0){
        daneDoWyciagniecia.opisListaZDanymi += '<table style="width:100%;"><tbody style="width:100%;">';
        document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).forEach((el)=>{
            let napisOrg1 = el.querySelector(opisListaZDanymiSelektor1Naglowka).innerText;
            let napisOrg2 = el.querySelector(opisListaZDanymiSelektor1Wartosci).innerText;
        
            let napisFormatowany1 = napisOrg1.charAt(0).toUpperCase() + napisOrg1.slice(1).toLowerCase();
            let napisFormatowany2 = napisOrg2.charAt(0).toUpperCase() + napisOrg2.slice(1).toLowerCase();

        
            if(napisFormatowany1 != "" && napisFormatowany2 != ""){
                daneDoWyciagniecia.opisListaZDanymi += '<tr><td>'+napisFormatowany1+ '</td><td style="font-weight: 600;">' +napisFormatowany2+ '</td></tr>';
            }
        })
        daneDoWyciagniecia.opisListaZDanymi += '</table></tbody>';
    }
}

//TWORZENIE GOTOWEGO OPISU

gotowyOpis += daneDoWyciagniecia.tytul + '\n\n';
        if(coChceszWyciagnac.cena === 1){
            gotowyOpis += daneDoWyciagniecia.cena + '\n';
        }
        if(coChceszWyciagnac.ean === 1){
            gotowyOpis += daneDoWyciagniecia.ean + '\n\n';
        }
        if(coChceszWyciagnac.opis === 1){
            gotowyOpis += daneDoWyciagniecia.opisTekstowy + '\n\n';
            gotowyOpis += daneDoWyciagniecia.opisListaZDanymi + '\n\n';
        }
       
        if (ostrzezenia != '') {
            gotowyOpis += 'UWAGA!!!!' + '\n';
            gotowyOpis += ostrzezenia + '\n';
        }
nazwaPoFormacie = daneDoWyciagniecia.tytul.replace(/ /g, "-").toLowerCase();
        nazwaPoFormacie = nazwaPoFormacie.split('.').join('');
maintext += gotowyOpis;

    }
    
    
    ///DO ZROBIENIA
    
    
    else if (window.location.href.includes('https://www.falmec.com/')) {
        const daneDoWyciagniecia = {
            cena: '',
            ean: '',
            tytul: '',
            opisTekstowy: '',
            opisListaZDanymi: ''
        };
        let typ = '';
        let model = '';
        let gotowyOpis = '';
        
        //Dane to uzupełnienia
        let cenaSelektor = '';
        let eanSelektor = '';
        let eanSelektorScriptJson = '';
        let marka = 'Falmec';
        let modelSelektor = '.p-product .o-article-data h4';
        let typSelektor = '.m-breadcrumbs .m-breadcrumbs__ol li:nth-last-of-type(2) a';
        let opisTekstowySelektorBezListy = '';
        let opisTekstowySelektorzLista = '';
        let opisTekstowySelektorzListaNaglowek = '';
        let opisTekstowySelektorzListaWartosc = '';
        
        let ostrzezenia = 'PRODUKT Z WARIANTAMI';
        let opisListaZDanymiSelektor1Wiersza = '.o-article-data .o-article-data__group';    
        let opisListaZDanymiSelektor1Naglowka = ' .o-article-data__area-label';
        let opisListaZDanymiSelektor1Wartosci = '.o-article-data__li';
        
        //wyciąganie EANU ze skryptu json
        if(eanSelektorScriptJson != ''){
            let scriptElement = document.querySelector(eanSelektorScriptJson);
            let productData = JSON.parse(scriptElement.textContent);
            daneDoWyciagniecia.ean = productData.gtin;
        }
        //wyciąganie Eanu
        if(eanSelektor != '' && eanSelektorScriptJson == ''){
            if(document.querySelectorAll(eanSelektor).length>0){
                daneDoWyciagniecia.ean = document.querySelector(eanSelektor).innerText;
            }else{
                daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
            }
        }else if(eanSelektorScriptJson == ''){
            daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
        }
        
        //wyciąganie ceny
        if(cenaSelektor != ''){
            if(document.querySelectorAll(cenaSelector).length > 0){
                daneDoWyciagniecia.cena = document.querySelector(cenaSelector).innerText;
            }else{
                daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
            }
        }else{
            daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
        }
        //tworzenie tutułu
        if(typSelektor != ''){
            if(document.querySelectorAll(typSelektor).length >0){
                typ = document.querySelector(typSelektor).innerText;

                if(typ == 'Okapy'){
                    typ = 'Okap';
                }
                else if(typ == 'Systemy zintegrowane i płyty indukcyjne'){
                    typ = 'Płyta indukcyjna';
                }
                else if(typ == 'Water'){
                    typ = 'Zlewozmywak';
                }
            }
        }
        if(modelSelektor != ''){
            if(document.querySelectorAll(modelSelektor).length >0){
                model = document.querySelector(modelSelektor).innerText;
            }
        }
        
        //nazwaProduktu
        daneDoWyciagniecia.tytul = '<h3>'+typ + ' ' + marka + ' ' + model + ' ' + '[TU WPISZ SKU]</h3>';
        
        
        //wyciąganie opisu tekstowego
        if(opisTekstowySelektorBezListy != ''){
            if(document.querySelectorAll(opisTekstowySelektorBezListy).length > 0){
                daneDoWyciagniecia.opisTekstowy = '<p>'+ document.querySelector(opisTekstowySelektorBezListy).innerText + '</p>';
            }
        }
        
        //wyciąganie opisu tekstowego z listy
        if(opisTekstowySelektorzLista != ''){
            if(document.querySelectorAll(opisTekstowySelektorzLista).length > 0){
                document.querySelectorAll(opisTekstowySelektorzLista).forEach((el)=>{
                    let napisNaglowek = '';
                    let napisWartosc = '';
                    if(el.querySelectorAll(opisTekstowySelektorzListaNaglowek).length > 0){
                         napisNaglowek = el.querySelector(opisTekstowySelektorzListaNaglowek).innerText;
                    }
                    if(el.querySelectorAll(opisTekstowySelektorzListaWartosc).length > 0){
                         napisWartosc = el.querySelector(opisTekstowySelektorzListaWartosc).innerText;
                    }
                    daneDoWyciagniecia.opisTekstowy += '<p>' + '<h5>'+napisNaglowek+ '</h5><br>'+ napisWartosc +'<br>' + '</p>';
                })
            }
        }
        
        //wyciąganie opisu z listą danych technicznych
        if(opisListaZDanymiSelektor1Wiersza != ''){
            if(document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).length > 0){
                document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).forEach((el)=>{
                    if(el.querySelector(opisListaZDanymiSelektor1Naglowka).innerText.toLowerCase() == 'dane techniczne' || el.querySelector(opisListaZDanymiSelektor1Naglowka).innerText.toLowerCase() == 'zużycie i podłączanie'){
                        daneDoWyciagniecia.opisListaZDanymi += '<h3>'+ el.querySelector(opisListaZDanymiSelektor1Naglowka).innerText +'</h3>'
                        daneDoWyciagniecia.opisListaZDanymi += '<table style="width:100%;"><tbody style="width:100%;">';
                        
                        let tt = el.querySelectorAll('.o-article-data__data-title');
                        
                        tt.forEach((el2)=>{
                            if(el2.innerText.toLowerCase() == 'dane ogólne'){
                                
                                let t = el2.parentNode.querySelectorAll('.o-article-data__data-value');
                                
                                daneDoWyciagniecia.opisListaZDanymi += '<tr><td style="font-weight:600;vertical-align: top;padding-bottom: 6px;">' + el2.innerText + '</td><td style="padding-bottom:6px;">';

                                t.forEach((el3)=>{
                                    if(el3.innerText != ''){
                                        daneDoWyciagniecia.opisListaZDanymi += '<ul><li style="padding-bottom:6px;">' + el3.innerText + '</li></ul>';
                                    }
                                })
                                daneDoWyciagniecia.opisListaZDanymi += '</td></tr>';
                            }else{
                                let t = el2.parentNode.querySelector('.o-article-data__data-value');
                            
                                if (tt != '' && t != '') {
                                    daneDoWyciagniecia.opisListaZDanymi += '<tr><td style="font-weight:600;vertical-align: top;padding-bottom: 6px;">' + el2.innerText + '</td><td style="padding-bottom:6px;">' + t.innerText + '</td></tr>';
                                }
                            }
                            
                        })
                        
                        daneDoWyciagniecia.opisListaZDanymi += '</table></tbody>';
                    }
                })
            }
        }
        
        
        
        //TWORZENIE GOTOWEGO OPISU
        
        
        
        gotowyOpis += daneDoWyciagniecia.tytul + '\n\n';
        if(coChceszWyciagnac.cena === 1){
            gotowyOpis += daneDoWyciagniecia.cena + '\n';
        }
        if(coChceszWyciagnac.ean === 1){
            gotowyOpis += daneDoWyciagniecia.ean + '\n\n';
        }
        if(coChceszWyciagnac.opis === 1){
            gotowyOpis += daneDoWyciagniecia.opisTekstowy + '\n\n';
            gotowyOpis += daneDoWyciagniecia.opisListaZDanymi + '\n\n';
        }
       
        if (ostrzezenia != '') {
            gotowyOpis += 'UWAGA!!!!' + '\n';
            gotowyOpis += ostrzezenia + '\n';
        }
        nazwaPoFormacie = daneDoWyciagniecia.tytul.replace(/ /g, "-").toLowerCase();
        nazwaPoFormacie = nazwaPoFormacie.split('.').join('');
        maintext += gotowyOpis;
    } 


    else if (window.location.href.includes('https://www.fulgor-milano.com/')) {
        const daneDoWyciagniecia = {
            cena: '',
            ean: '',
            tytul: '',
            opisTekstowy: '',
            opisListaZDanymi: ''
        };
        let typ = '';
        let model = '';
        let gotowyOpis = '';
        
        //Dane to uzupełnienia
        let cenaSelektor = '';
        let eanSelektor = '.desktop-title .field.field--name-field-product-code-ean .field__item';
        let eanSelektorScriptJson = '';
        let marka = 'Fulgor';
        let modelSelektor = '.container-fluid .product-media-left h2 .field.field--name-title.field--type-string font font';
        let typSelektor = '';
        let opisTekstowySelektorBezListy = '.desktop-body .clearfix.text-formatted.field.field--name-body.field--type-text-with-summary.field--label-hidden.field__item p';
        let opisTekstowySelektorzLista = '.container-fluid .paragraph.paragraph--type--title-text.paragraph--type--title-text-default.paragraph--view-mode--default';
        let opisTekstowySelektorzListaNaglowek = '.field--name-field-title font font';
        let opisTekstowySelektorzListaWartosc = '.field--name-field-text';
        
        let ostrzezenia = 'OPISY SĄ PO ANGIELSKU';
        let opisListaZDanymiSelektor1Wiersza = '';    
        let opisListaZDanymiSelektor1Naglowka = '';
        let opisListaZDanymiSelektor1Wartosci = '';
        
        //wyciąganie EANU ze skryptu json
        if(eanSelektorScriptJson != ''){
            let scriptElement = document.querySelector(eanSelektorScriptJson);
            let productData = JSON.parse(scriptElement.textContent);
            daneDoWyciagniecia.ean = productData.gtin;
        }
        //wyciąganie Eanu
        if(eanSelektor != '' && eanSelektorScriptJson == ''){
            if(document.querySelectorAll(eanSelektor).length>0){
                daneDoWyciagniecia.ean = document.querySelector(eanSelektor).innerText;
            }else{
                daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
            }
        }else if(eanSelektorScriptJson == ''){
            daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
        }
        
        //wyciąganie ceny
        if(cenaSelektor != ''){
            if(document.querySelectorAll(cenaSelector).length > 0){
                daneDoWyciagniecia.cena = document.querySelector(cenaSelector).innerText;
            }else{
                daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
            }
        }else{
            daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
        }
        //tworzenie tutułu
        if(typSelektor != ''){
            if(document.querySelectorAll(typSelektor).length >0){
                typ = document.querySelector(typSelektor).innerText;
            }
        }
        if(modelSelektor != ''){
            if(document.querySelectorAll(modelSelektor).length >0){
                model = document.querySelector(modelSelektor).innerText;
            }
        }
        
        //nazwaProduktu
        daneDoWyciagniecia.tytul = '<h3>'+typ + ' ' + marka + ' ' + model + ' ' + '[TU WPISZ SKU]</h3>';
        
        
        //wyciąganie opisu tekstowego
        if(opisTekstowySelektorBezListy != ''){
            if(document.querySelectorAll(opisTekstowySelektorBezListy).length > 0){
                daneDoWyciagniecia.opisTekstowy = '<p>'+ document.querySelector(opisTekstowySelektorBezListy).innerText + '</p>';
            }
        }
        
        //wyciąganie opisu tekstowego z listy
        if(opisTekstowySelektorzLista != ''){
            if(document.querySelectorAll(opisTekstowySelektorzLista).length > 0){
                document.querySelectorAll(opisTekstowySelektorzLista).forEach((el)=>{
                    let napisNaglowek = '';
                    let napisWartosc = '';
                    if(el.querySelectorAll(opisTekstowySelektorzListaNaglowek).length > 0){
                         napisNaglowek = el.querySelector(opisTekstowySelektorzListaNaglowek).innerText;
                    }
                    if(el.querySelectorAll(opisTekstowySelektorzListaWartosc).length > 0){
                         napisWartosc = el.querySelector(opisTekstowySelektorzListaWartosc).innerText;
                    }
                    daneDoWyciagniecia.opisTekstowy += '<p>' + '<h5>'+napisNaglowek+ '</h5><br>'+ napisWartosc +'<br>' + '</p>';
                })
            }
        }
        
        //wyciąganie opisu z listą danych technicznych
        if(opisListaZDanymiSelektor1Wiersza != ''){
            if(document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).length > 0){
                daneDoWyciagniecia.opisListaZDanymi += '<table style="width:100%;"><tbody style="width:100%;">';
                document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).forEach((el)=>{
                    let napisOrg1 = el.querySelector(opisListaZDanymiSelektor1Naglowka).innerText;
                    let napisOrg2 = el.querySelector(opisListaZDanymiSelektor1Wartosci).innerText;
                
                    let napisFormatowany1 = napisOrg1.charAt(0).toUpperCase() + napisOrg1.slice(1).toLowerCase();
                    let napisFormatowany2 = napisOrg2.charAt(0).toUpperCase() + napisOrg2.slice(1).toLowerCase();
        
                
                    if(napisFormatowany1 != "" && napisFormatowany2 != ""){
                        daneDoWyciagniecia.opisListaZDanymi += '<tr><td>'+napisFormatowany1+ '</td><td style="font-weight: 600;">' +napisFormatowany2+ '</td></tr>';
                    }
                })
                daneDoWyciagniecia.opisListaZDanymi += '</table></tbody>';
            }
        }
        
        
        
        //TWORZENIE GOTOWEGO OPISU
        
        
        
        gotowyOpis += daneDoWyciagniecia.tytul + '\n\n';
        if(coChceszWyciagnac.cena === 1){
            gotowyOpis += daneDoWyciagniecia.cena + '\n';
        }
        if(coChceszWyciagnac.ean === 1){
            gotowyOpis += daneDoWyciagniecia.ean + '\n\n';
        }
        if(coChceszWyciagnac.opis === 1){
            gotowyOpis += daneDoWyciagniecia.opisTekstowy + '\n\n';
            gotowyOpis += daneDoWyciagniecia.opisListaZDanymi + '\n\n';
        }
       
        if (ostrzezenia != '') {
            gotowyOpis += 'UWAGA!!!!' + '\n';
            gotowyOpis += ostrzezenia + '\n';
        }
        nazwaPoFormacie = daneDoWyciagniecia.tytul.replace(/ /g, "-").toLowerCase();
        nazwaPoFormacie = nazwaPoFormacie.split('.').join('');
        maintext += gotowyOpis;
    }
    
    
    
    else if (window.location.href.includes('https://www.franke.com/')) {
        const daneDoWyciagniecia = {
                cena: '',
                ean: '',
                tytul: '',
                opisTekstowy: '',
                opisListaZDanymi: ''
            };
            let typ = '';
            let model = '';
            let gotowyOpis = '';
            
            //Dane to uzupełnienia
            let cenaSelektor = '.cmp-product-hero__information .cmp-product-price-and-buy-container .cmp-product__price';
            let eanSelektor = '.cmp-product-information .cmp-product-information-table__section-list__item .cmp-product-information-table__section-list__item__name';
            let eanSelektorScriptJson = '';
            let marka = 'Franke';
            let modelSelektor = '.cmp-product-hero__information .cmp-product-hero__title';
            let typSelektor = '.cmp-product-hero__information .cmp-product-hero__category';
            let opisTekstowySelektorBezListy = '.productcomponents .cmp-product-hero__description';
            let opisTekstowySelektorzLista = '';
            let opisTekstowySelektorzListaNaglowek = '';
            let opisTekstowySelektorzListaWartosc = '';
            
            let ostrzezenia = 'PRODUKT Z WARJANTAMI';
            let opisListaZDanymiSelektor1Wiersza = '.cmp-product-information-table .cmp-product-information-table__section-list__item';    
            let opisListaZDanymiSelektor1Naglowka = '.cmp-product-information-table__section-list__item__name';
            let opisListaZDanymiSelektor1Wartosci = '.cmp-product-information-table__section-list__item__value';
            
            //wyciąganie EANU ze skryptu json
            if(eanSelektorScriptJson != ''){
                let scriptElement = document.querySelector(eanSelektorScriptJson);
                let productData = JSON.parse(scriptElement.textContent);
                daneDoWyciagniecia.ean = productData.gtin;
            }
            //wyciąganie Eanu
            if(eanSelektor != '' && eanSelektorScriptJson == ''){
                if(document.querySelectorAll(eanSelektor).length>0){
                    document.querySelectorAll(eanSelektor).forEach((el)=>{
                        if(el.innerText.toLowerCase() == 'ean/upc'){
                            daneDoWyciagniecia.ean = el.parentNode.querySelector('.cmp-product-information-table__section-list__item__value');
                        }
                    })
                }else{
                    daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
                }
            }else if(eanSelektorScriptJson == ''){
                daneDoWyciagniecia.ean = 'BRAK WYCIĄGNIĘTEGO EANU';
            }
            
            //wyciąganie ceny
            if(cenaSelektor != ''){
                if(document.querySelectorAll(cenaSelektor).length > 0){
                    daneDoWyciagniecia.cena = document.querySelector(cenaSelektor).innerText;
                }else{
                    daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
                }
            }else{
                daneDoWyciagniecia.cena = 'BRAK WYCIĄGNIĘTEJ CENY';
            }
            //tworzenie tutułu
            if(typSelektor != ''){
                if(document.querySelectorAll(typSelektor).length >0){
                    typ = document.querySelector(typSelektor).innerText;
    
                    if(typ.toLocaleLowerCase() == 'okapy kuchenne'){
                        typ ='Okap kuchanny';
                    }else if (typ.toLocaleLowerCase() == 'zmywarki'){
                        typ ='Zmywarka';
                    }else if (typ.toLocaleLowerCase() == 'chłodziarki'){
                        typ ='Chłodziarka';
                    }else if (typ.toLocaleLowerCase() == 'piekarniki'){
                        typ ='Piekarnik';
                    }else if (typ.toLocaleLowerCase() == 'płyty zintegrowane z okapem'){
                        typ ='Płyta zintegrowana z okapem';
                    }else if (typ.toLocaleLowerCase() == 'płyty grzewcze'){
                        typ ='Płyta grzewcza';
                    }else if (typ.toLocaleLowerCase() == 'baterie kuchenne'){
                        typ ='Bateria kuchenna';
                    }else if (typ.toLocaleLowerCase() == 'zlewozmywaki'){
                        typ ='Zlewozmywak';
                    }
                }
            }
            if(modelSelektor != ''){
                if(document.querySelectorAll(modelSelektor).length >0){
                    model = document.querySelector(modelSelektor).innerText;
                }
            }
            
            //nazwaProduktu
            daneDoWyciagniecia.tytul = '<h3>'+typ + ' ' + marka + ' ' + model + ' ' + '[TU WPISZ SKU]</h3>';
            
            
            //wyciąganie opisu tekstowego
            if(opisTekstowySelektorBezListy != ''){
                if(document.querySelectorAll(opisTekstowySelektorBezListy).length > 0){
                    daneDoWyciagniecia.opisTekstowy = '<p>'+ document.querySelector(opisTekstowySelektorBezListy).innerText + '</p>';
                }
            }
            
            //wyciąganie opisu tekstowego z listy
            if(opisTekstowySelektorzLista != ''){
                if(document.querySelectorAll(opisTekstowySelektorzLista).length > 0){
                    document.querySelectorAll(opisTekstowySelektorzLista).forEach((el)=>{
                        let napisNaglowek = '';
                        let napisWartosc = '';
                        if(el.querySelectorAll(opisTekstowySelektorzListaNaglowek).length > 0){
                             napisNaglowek = el.querySelector(opisTekstowySelektorzListaNaglowek).innerText;
                        }
                        if(el.querySelectorAll(opisTekstowySelektorzListaWartosc).length > 0){
                             napisWartosc = el.querySelector(opisTekstowySelektorzListaWartosc).innerText;
                        }
                        daneDoWyciagniecia.opisTekstowy += '<p>' + '<h5>'+napisNaglowek+ '</h5><br>'+ napisWartosc +'<br>' + '</p>';
                    })
                }
            }
            
            //wyciąganie opisu z listą danych technicznych
            if(opisListaZDanymiSelektor1Wiersza != ''){
                if(document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).length > 0){
                    daneDoWyciagniecia.opisListaZDanymi += '<h3>Dane techniczne</h3>';
                    daneDoWyciagniecia.opisListaZDanymi += '<table style="width:100%;"><tbody style="width:100%;">';
                    document.querySelectorAll(opisListaZDanymiSelektor1Wiersza).forEach((el)=>{
                        let napisOrg1 = el.querySelector(opisListaZDanymiSelektor1Naglowka).innerText;
                        let napisOrg2 = el.querySelector(opisListaZDanymiSelektor1Wartosci).innerText;
                    
                        let napisFormatowany1 = napisOrg1.charAt(0).toUpperCase() + napisOrg1.slice(1).toLowerCase();
                        let napisFormatowany2 = napisOrg2.charAt(0).toUpperCase() + napisOrg2.slice(1).toLowerCase();
            
                    
                        if(napisFormatowany1 != "" && napisFormatowany2 != ""){
                            daneDoWyciagniecia.opisListaZDanymi += '<tr><td>'+napisFormatowany1+ '</td><td style="font-weight: 600;">' +napisFormatowany2+ '</td></tr>';
                        }
                    })
                    daneDoWyciagniecia.opisListaZDanymi += '</table></tbody>';
                }
            }
            
            
            
            //TWORZENIE GOTOWEGO OPISU
            
            
            
            gotowyOpis += daneDoWyciagniecia.tytul + '\n\n';
            if(coChceszWyciagnac.cena === 1){
                gotowyOpis += daneDoWyciagniecia.cena + '\n';
            }
            if(coChceszWyciagnac.ean === 1){
                gotowyOpis += daneDoWyciagniecia.ean + '\n\n';
            }
            if(coChceszWyciagnac.opis === 1){
                gotowyOpis += daneDoWyciagniecia.opisTekstowy + '\n\n';
                gotowyOpis += daneDoWyciagniecia.opisListaZDanymi + '\n\n';
            }
           
            if (ostrzezenia != '') {
                gotowyOpis += 'UWAGA!!!!' + '\n';
                gotowyOpis += ostrzezenia + '\n';
            }
            nazwaPoFormacie = daneDoWyciagniecia.tytul.replace(/ /g, "-").toLowerCase();
            nazwaPoFormacie = nazwaPoFormacie.split('.').join('');
            maintext += gotowyOpis;
        }

    return {
        maintext: maintext,
        nazwaPoFormacie: nazwaPoFormacie
    }



}


function saveDataToLocalStorage(trescOpisu) {
    let allData = JSON.parse(localStorage.getItem('allData')) || [];
    allData.push(trescOpisu);
    localStorage.setItem('allData', JSON.stringify(allData));

    window.opener.postMessage('dataSaved', '*');
}


async function downloadImages(nazwaZdjec) {
    let limg = '';
    let tablicaZdjec = [];

    if (window.location.href.includes('www.bosch-home.pl')) {
            let zdj = document.querySelectorAll('.swiper-wrapper > div >div[data-testid="media-cloud-image-container-fill"] img');
            zdj.forEach((el)=>{
                let gotowyLink = el.getAttribute('src');
                tablicaZdjec.push(gotowyLink);
            })
    } else if(window.location.href.includes('www.siemens-home.bsh-group.com')){
        let zdj = document.querySelectorAll('[id^="slick-slide"] > div > picture .js_vp_1[type="image/jpeg"]');
            zdj.forEach((el)=>{
                let gotowyLink = el.getAttribute('srcset').split(',')[1].trim().split(' ')[0];
                tablicaZdjec.push('https:'+gotowyLink);
            })
    } else if (window.location.href.includes('www.miele.pl')) {
        limg = document.querySelectorAll('.hls-product-gallery__wrapper img');
    } else if (window.location.href.includes('https://www.liebherr.com')) {
        limg = document.querySelectorAll('section.content-container-padding .slick-slider.slick-initialized > .slick-list > .slick-track > .slick-slide picture > img');
    } else if (window.location.href.includes('https://ciarko.com')) {
        limg = document.querySelectorAll('.photoswipe-item a.rollover.dt-pswp-item.pspw-wrap-ready.this-ready:not(.vc_box_border_grey)');
    } else if (window.location.href.includes('https://www.elica.com')) {
        limg = document.querySelectorAll('.wide-carousel.lightbox.slick-initialized.slick-slider .slick-list .slick-slide:not(.slick-cloned) a');
    } else if (window.location.href.includes('https://www.aeg.pl')) {
        limg = document.querySelectorAll('.swiper-wrapper .product-gallery__main-item.swiper-slide a');
    } else if (window.location.href.includes('https://www.falmec.com')) {
        limg = document.querySelectorAll('.p-product .p-product__hero .swiper-container-vertical .swiper-wrapper .o-carousel__swiper-slide img');
    } else if (window.location.href.includes('https://www.franke.com')) {
        limg = document.querySelectorAll('.cmp-product-carousel .cmp-product-carousel__selected-image-container img');
    } else if (window.location.href.includes('https://www.bora.com')) {
        const limg1 = document.querySelectorAll('.p-rangedetail__technical.b-hide--xs .o-rangeslider__wrapper picture img');
        const limg2 = document.querySelectorAll('.a-container.a-container--nopadding picture img');
        
        limg = [...limg1, ...limg2];
    }else if(window.location.href.includes('https://www.fulgor-milano.com')){
        limg = document.querySelectorAll('.product-media-top .gallery-top picture img');
    }

    let imgl = limg.length;
    for (let i = 0; i < imgl; i++) {
        if (window.location.href.includes('https://www.elica.com') || window.location.href.includes('https://www.aeg.pl') || window.location.href.includes('https://ciarko.com')) {
            tablicaZdjec.push(limg[i].getAttribute('href'));
        } else if(!window.location.href.includes('www.bosch-home.pl') || window.location.href.includes('https://www.liebherr.com')){
            tablicaZdjec.push(limg[i].getAttribute('src'));
        }
    }

    let i = 0;
    for (const url of tablicaZdjec) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed');

            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = nazwaZdjec + '-' + i;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(downloadUrl);
            i++;
        } catch (error) {
            console.error('Error downloading file from ', error);
        }
    }
}

// Funkcja do zapisu danych do pliku txt
function zapisOpisuDoPliku(trescOpisu) {
    const tekst = trescOpisu.join("\n\n");
    const blob = new Blob([tekst], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "opis_produktow.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }


//zapis pdf

function pobierzPDF(nazwaPdfa){

            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const fileName = nazwaPdfa;
            url = '';

            if (window.location.href.includes('www.siemens-home.bsh-group.com')) {
                document.querySelectorAll('.m-togglebox .o-filelist > a .file-tile-heading').forEach((el)=>{
                    if(el.innerText == 'Karta produktu'){
                        url = el.parentElement.parentElement.parentElement.getAttribute('href');
                    }
                })
            } else if (window.location.href.includes('www.bosch-home.pl')) {
                document.querySelectorAll('.m-togglebox .o-filelist > a .file-tile-heading').forEach((el)=>{
                    if(el.innerText == 'Karta produktu'){
                        url = el.parentElement.parentElement.parentElement.getAttribute('href');
                    }
                })
            }

            if (window.location.href.includes('www.siemens-home.bsh-group.com') || window.location.href.includes('www.bosch-home.pl')) {
                fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch(error => console.error('Error downloading the PDF:', error));
            }else{
                fetch(proxyUrl + url)
                .then(response => response.blob())
                .then(blob => {
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch(error => console.error('Error downloading the PDF:', error));
            }
            
}
