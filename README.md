# Neophodni alati i paketi za pokretanje aplikacije
1. Instalacija Angular-a
     - Proverite da li imate instaliranu podržanu verziju Node.js za Angular:
        - Pokrenite sledeću komandu iz terminala: 'node --version'.
        - Potvrdite da li prikazana verzija ispunjava zahteve Angulara.
        - Ukoliko nemate instaliranu verziju node.js, može se skinuti na [sajtu](https://nodejs.org/en/download) .
     - Kada ste instalirali node.js i npm, sledeći korak je instalacija Angular CLI koji pruža alate za efikasan Angular razvoj.
        - Iz terminala pokrenite sledeću komandu 'npm install -g @angular/cli'.
     - Angular je sada instaliran na vašem računara i možete koristiti bilo koji alat za pravljenje aplikacija pomoću Angular'a. Mi smo koristili Visual Studio Code pa njega i preporučujemo.

2. .NET SDK 8 - potrebno je za razvoj i pokretanje bekenda. Treba otici na zvaničan .NET [sajt](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) , gde možemo da skinemo .NET okruženje za operativni sistem koji želimo. Nakon instalacije treba instalirati ovo okruženje po uputstvima u instalaciji.
3. Instalacija Visual studio code
    - Instalirati visual studio code sa zvaničnog sajta.
    - Intalirati ektenzije
        + C# Dev Kit
        + C# Extensions
        + NuGet Gallery
4. Potrebni paketi nakon instaliranja .NET SDK 8 za pokretanje (instalirati preko Nuget Gallerz ekstenzije u VS kodu, ako ne postoje)
    - Microsoft.AspNetCore.Authentication.JwtBearer
    - Microsoft.EntityFrameworkCore.Design
    - Microsoft.EntityFrameworkCore.Tools
    - Microsoft.EntityFrameworkCore.Sqlite


# Pokretanje projekta
1. Kreiranje baze podataka se radi tako što:
    - Otvori se terminal na računaru ili u editoru (preporuka VS code)
    - Postaviti putanju na terminala na folder server
    - Zatim pokrenuti komandu *dotnet ef migrations add ime_migracije*
    - Nakon toga treba pokrenuti komandu *dotnet ef database update*
    - Nakon ove komande baza će biti kreirana

2. Pokretanje bekenda
    - Otvori se terminal na računaru ili u editoru (preporuka VS code)
    - Postaviti putanju na terminala na folder server
    - Pokrenuti komandu *dotnet watch run*, može da se pokrene i komanda *dotnet watch run seed* koja će uneti već neke default podatke u bazu.
    - Nakon ovoga trebalo bi da se otvori Swagger preko kojeg možemo da komuniciramo sa bazom i on bi trebao da se nalazi na [adresi](http://localhost:5295) .

3. Pokretanje frontenda
    - Otvori se terminal na računaru ili u editoru (preporuka VS code)
    - Postaviti putanju na terminala na folder client
    - Zatim pokrenuti komandu *npm install* kako bi se instalirali svi potrebni paketi od koje aplikacija zavisi
    - Ukucati komandu *ng serve -o* koja ce pokrenuti frontend aplikacije i otvoriti je u default-nom browseru


# Pokretanje produkcione verzije projekta
Kada pokrećemo produkcioni server za naš projekat, važno je da imamo na umu da će aplikacija biti hostovana na udaljenom serveru, a ne lokalno na našem računaru. Evo koraka za pokretanje projekta:
1.	Pokretanje Angular projekta:
    - Prvo, uverite se da imate instaliran Docker na svom računaru.
    - Otvorite terminal i uđite u direktorijum vašeg Angular projekta.
    - Pokrenite sledeću komandu za izgradnju slike:
    ```
    docker build -t aleks2001/komakai:latest .
    ```
    - Nakon što se slika izgradi, pokrenite Docker kontejner za Angular klijent:
    ```
    docker run -d -p 10190:10190 aleks2001/komakai:latest
    ```
2.	Pokretanje serverske aplikacije:
    - U drugom terminalu, uđite u direktorijum vaše serverske aplikacije.
    - Izgradite Docker sliku za serversku aplikaciju pomoću sledeće komande:
    - docker build -t aleks2001/komakai_backend:latest .
    - Zatim, pokrenite Docker kontejner za serversku aplikaciju:
    ```
    docker run -p 10189:8080 aleks2001/komakai_backend:latest
    ```
3.	Pristup aplikaciji:
    - Nakon pokretanja obe komponente, vaša aplikacija će biti dostupna na adresi koju dobijete od vašeg provajdera hostinga. Uverite se da podesite odgovarajuće rute i konfiguraciju za pristupanje aplikaciji.

Napomena ukoliko zelite da pokrenete aplikaciju I da ugasite terminal dodati parameter -d  prilikom izvršavanja komande docker run.
Ovaj proces će vam omogućiti da pokrenete vašu aplikaciju u produkcioni režim i da je učinite dostupnom na udaljenom serveru. 

Slike za backend I frontend već kreirane nalaze se javno na docker hub-u na linkovima [frontend](https://hub.docker.com/r/aleks2001/komakai) i [backend](https://hub.docker.com/r/aleks2001/komakai_backend)

Na serveru fakulteta softeng.pmf.kg.ac.rs servisi frontend i backend su pokrenuti uz pomoć docker compose-a uz pomoć docker-compose up -d .

Ukoliko se na serveru ne nalaze ažurirane verzije slika potrebno je samo izvršiti komandu docker-compose pull 
Napomena: docker compose skripta se nalazi u direktorijumu komakai na serveru tako da prilikom izvršavanja komandi neophodno je da se nalazimo pozicionirani u tom direktorijumu.
 
Naša aplikacija se nalazi na sledećoj [adresi](http://softeng.pmf.kg.ac.rs:10190/)

# Korisnicki nalozi za testiranje:

1. Administrator
    - username:
        + ethanmoore
    - password:
        + password707

2. Project Manager
    - username:
        + aleksandra_stanic
    - password:
        + Boki037

3. Project Worker
    - username:
        + alexjohnson
    - password:
        + password789

4. User
    - username:
        + jessicalee
    - password:
        + password404

5. Guest
    - username:
        + oliviaanderson
    - password:
        + password606

# Tim
1. Aleksandra Stanić
2. Anastasija Iličić
3. Aleksa Kosovac
4. Damjan Pavlović
5. Stefan Vučićević