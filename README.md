# Getting Started with Create React App

För att start denna app:
1: öppna terminalen
2: skriv "npm run json-server" för att starta databasen
3: öppna en ny terminal
4: skriv "npm start" i terminalen för att starta appen i default web browser

## Användning

För att beställa klickar man på de artiklar man vill beställa och i artikelns egna sida klickar på knappen för att lägga till sin varukorg. I varukorgen kan man sedan ändra antal av varje artikel man lagt till. När man är klar med sin varukorg går man vidare till betalningssidan med knappen "Pay". I Pay fyller man först i sin adress. När denna adress är ifylld korrekt dyker betalningsalternativen upp. För att betala skannar man Swish koden eller fyller i sina kortuppgifter. När kortuppgifterna är korrekta dyker betalningsknappen upp. Vid tryck på denna knapp hamnar man på bekräftelsesidan där man ser vad man beställt och ens order sparas till databasen.

## Val och varför

Jag har valt att göra menysidan till startsida för att snabbare visa maten för användaren och därför göra det enklare för användaren att se vad som kan beställas. Samtidigt har jag valt dova bakgrundsfärger för att locka användarens uppmärksamhet mot bilderna på maten.

Jag har valt att begränsa antalet produkter på startsidan till tre stycken åt gången per kategori för att minska scrollning och göra sidan mer lättöverskådlig. Detta innebar att jag var tvungen att implementera knappar för att se andra produkter. Dessa knappar var något kluriga att placera på lämplig plats men i slutändan kom jag fram till att placera dem till vänster och höger om produkterna på både stora och små skärmar.

Jag valde tidigt i processen att man skulle kunna beställa oavsett om man var inloggad eller inte, då detta är blir ett allt vanligare tillvägagångsätt inom e-handel. Detta skapade problem så till vida att information om vem som gjort beställningar inte alltid funnits tillgänglig. I slutändan blev lösningen att ordern sparas i database med property userId och ett object adress. Där userId sätts till 0 om ingen är inloggad. Då kan dessutom en inloggad användare beställa mat till en annan adress än sin egen.

Inloggningen ligger som en del i headern och inte som en egen sida. Genom att göra så kan användaren när som helst under sin beställningsprocess logga in utan hamna på en ny sida och bli avbruten i sin process. Detta ger enligt mig en mer användarvänlig upplevelse. Den inloggade användaren får sedan sin adress automatiskt ifylld i betalningsfönstret men kan ändra denna till en annan adress.

Inloggning fungerar med hjälp localStorage där användarens id sparas i localStorage. Här finns en säkerhetsbrist då det blir enkelt för användarens att komma åt någon annas inloggning.
