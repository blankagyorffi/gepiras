# Gépírás – Windowsra és Androidra telepíthető böngészős alkalmazás

Ez a csomag a legutóbbi teljes programot tartalmazza, a Google Sheetből olvasott tanári jelszó kezelésével együtt. A feladatválasztás, névajánló, osztálykitöltés, gyakorlási beállítások, tollbamondás mondatonként háromszori ismétlése, vészleállítás, eredménylap és exportok megmaradtak. A felolvasás saját tempó híján tollbamondáskor 10%-kal lassabb.

## 1. A webes változat elhelyezése

A ZIP-et csomagold ki. Az index.html, pwa.js, service-worker.js, manifest.webmanifest és az icons mappa együtt kerüljön egy HTTPS-webtárhely ugyanazon mappájába. Például:

https://iskola.example/gepiras/index.html

A példa nem működő webcím; a saját tárhelyed címe szükséges. HTTPS-webcím nélkül az androidos telepítés nem próbálható ki. A fájlok dupla kattintásos megnyitása nem telepíthető alkalmazás.

A csomag nem tartalmaz működő közzétett webcímet. A fájlokat a meglévő iskolai HTTPS-webtárhelyre vagy más statikus HTTPS-tárhelyre kell feltölteni. A tárhely közvetlenül szolgálja ki a fájlokat, ne beágyazott dokumentumelőnézetként. A service-worker.js valódi JavaScript-fájl legyen; a manifest.webmanifest megfelelő JSON/manifest tartalomtípussal legyen kiszolgálva.

Az Apps Script /exec végpont a háttérszolgáltatás. Ez nem helyettesíti a PWA statikus fájljait kiszolgáló webtárhelyet.

## 2. Google Sheets kapcsolat

Az index.html-ben az API_URL a jelenlegi programból átvett /exec cím. Ha saját új telepítést használsz, ezt az egy címet módosítsd.

A PWA miatt nem szükséges új háttérkód. A külön tanári jelszótáblázat használatához a korábban átadott gepiras_script_tanari_jelszo_sheet.gs legyen telepítve, az ahhoz adott útmutató szerint. Az alkalmazásikon és a telepítés nem változtatja meg a tanári jogosultságokat. A jelszótáblázatot és a háttérkódot ne tedd a nyilvános webtárhelyre.

## 3. Windows

Nyisd meg a feltöltött program HTTPS-címét Microsoft Edge-ben vagy Google Chrome-ban. Ha a böngésző felajánlja a telepítést, a kezdőlapon megjelenő „Alkalmazás telepítése” gombbal indítsd. A böngésző saját telepítési lehetősége is használható. A program saját alkalmazásablakot és indítóikont kap.

## 4. Android

Nyisd meg ugyanazt a HTTPS-címet Google Chrome-ban. Használd a kezdőlap „Alkalmazás telepítése” gombját, ha megjelenik, vagy a Chrome menüjében az alkalmazás telepítésére / kezdőképernyőhöz adásra szolgáló lehetőséget. A menü pontos felirata böngészőverziótól függ. A kezdőképernyő ikonjáról indítható a program.

A telepítési gomb csak akkor látható, amikor a böngésző a telepítést ténylegesen felajánlja. Már telepített alkalmazásban nem jelenik meg.

## 5. Internet és adatok

Az első sikeres megnyitás után a program felülete gyorsítótárból is megnyitható. A Google Sheets feladatbankjának frissítése, névsor, tanári jelszóellenőrzés és eredménybeküldés internetet igényel. A korábbi feladatbank-gyorsítótár és eredmény-újraküldés megmaradt; ez nem teljes offline vizsgarendszer. A felolvasás offline elérhetősége az eszköz hangjaitól függ.

A PWA gyorsítótára csak a program statikus fájljait tárolja. Nem gyorsítótárazza a Google API-válaszokat, jelszóellenőrzést vagy az eredménybeküldést. A már meglévő helyi adatmentés továbbra is működik.

A böngésző a helyi előzményeket, függő eredményeket és névbeállításokat a webcím eredetéhez köti. A helyi HTML-fájl vagy más webcím korábbi adatai nem kerülnek automatikusan át az új HTTPS-címre.

## 6. Frissítés

A program új változatát ugyanarra a webcímre kell feltölteni. A service-worker.js VERSION értékét minden közzétett változatnál módosítsd. Célszerű a programfájlokat előbb, a service-worker.js-t utoljára feltölteni. A böngésző frissítés észlelésekor a kezdőlapon „Új változat betöltése” gombot mutat; aktív teszt és függő mentés közben nem engedi a frissítés miatti újratöltést. A frissítés nem törli a program helyi adatait.

## Ellenőrzés

A csomag kódellenőrzése, a manifest és ikonok ellenőrzése, az offline felület működésének szimulációja, a Google/POST-kérések kizárása, valamint a korábbi tollbamondás- és jelszóellenőrzési tesztek sikeresek voltak. A tényleges Windows/Android telepítést és a saját Google-fiókkal való kapcsolatot még a közzétett HTTPS-címen kell kipróbálni.

Hivatalos technikai leírások:
https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable
https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/Secure_connection
