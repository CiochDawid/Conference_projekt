# Dokumentacja techniczna projektu

# Cracow Data Science Conference

## 1. Opis projektu

Projekt **Cracow Data Science Conference** jest stroną internetową przygotowaną dla konferencji poświęconej tematyce data science. Aplikacja składa się z części publicznej, czyli strony widocznej dla zwykłego użytkownika, oraz z części administracyjnej, która pozwala zarządzać wybranymi treściami z poziomu panelu administratora.

Strona publiczna jest dostępna przez GitHub Pages. Backend został wykonany w technologii ASP.NET Core MVC i działa lokalnie.

Repozytorium projektu:

```txt
https://github.com/CiochDawid/Conference_projekt
```

Publiczna wersja strony:

```txt
https://ciochdawid.github.io/Conference_projekt/
```

## 2. Architektura aplikacji

Projekt ma klasyczną strukturę aplikacji ASP.NET Core MVC. Logika została podzielona na modele, kontrolery, widoki oraz warstwę dostępu do danych.

Najważniejsze katalogi:

```txt
Controllers/          - kontrolery głównej części aplikacji
Models/               - modele danych
Views/                - widoki Razor
Areas/Admin/          - panel administracyjny
Data/                 - kontekst bazy danych
Migrations/           - migracje Entity Framework Core
docs/                 - statyczna wersja strony dla GitHub Pages
wwwroot/              - zasoby aplikacji ASP.NET Core
```

Część publiczna strony znajduje się głównie w folderze `docs`, ponieważ z tego folderu korzysta GitHub Pages.

Backend MVC odpowiada za panel administratora, logowanie oraz operacje na danych zapisanych w bazie SQLite.

## 3. Frontend

Frontend został przygotowany jako wielostronicowa strona konferencyjna. Wykorzystuje HTML, CSS i JavaScript.

Najważniejsze pliki strony statycznej:

```txt
docs/index.html
docs/Edycja-I.html
docs/kontakt.html
docs/logo.html
docs/regulamin.html
docs/zapisy.html
docs/css/style.css
docs/js/app.js
```

Strona posiada kilka podstron, między innymi:

* stronę główną,
* opis pierwszej edycji konferencji,
* stronę kontaktową,
* regulamin,
* podstronę zapisów,
* podstronę z logo i materiałami graficznymi.

Podczas pracy poprawiono również błędy walidacji HTML, tak aby kod był bardziej zgodny ze standardem W3C.

## 4. Backend

Backend został napisany w ASP.NET Core MVC. Aplikacja uruchamiana jest lokalnie komendą:

```bash
dotnet run
```

Domyślny adres lokalny:

```txt
http://localhost:5183
```

Panel administratora:

```txt
http://localhost:5183/Admin
```

Do zabezpieczenia panelu wykorzystano ASP.NET Core Identity. Użytkownik niezalogowany nie może wejść do panelu administracyjnego.

Konto testowe administratora:

```txt
Email: admin@cdsc.local
Hasło: Admin123!
```

## 5. Panel administratora

Panel administratora znajduje się w katalogu:

```txt
Areas/Admin/
```

Został tam przygotowany osobny obszar aplikacji, który zawiera kontrolery i widoki związane z administracją.

W panelu administrator może zarządzać:

* partnerami konferencji,
* harmonogramem wydarzenia.

Dashboard panelu znajduje się pod adresem:

```txt
http://localhost:5183/Admin
```

## 6. Baza danych

W projekcie została użyta baza danych SQLite. Jest to lokalna baza plikowa, dzięki czemu projekt można łatwo uruchomić bez instalowania osobnego serwera baz danych.

Plik bazy danych:

```txt
conference.db
```

Połączenie z bazą jest skonfigurowane w `appsettings.json`:

```txt
Data Source=conference.db
```

Do obsługi bazy danych wykorzystano Entity Framework Core.

Kontekst bazy danych znajduje się w pliku:

```txt
Data/ApplicationDbContext.cs
```

## 7. Najważniejsze tabele w bazie danych

W bazie znajdują się tabele związane z Identity oraz tabele aplikacyjne.

Tabele Identity:

```txt
AspNetUsers
AspNetRoles
AspNetUserRoles
AspNetUserClaims
AspNetRoleClaims
AspNetUserLogins
AspNetUserTokens
```

Tabele aplikacyjne:

```txt
Partners
AgendaItems
Speakers
NewsPosts
GalleryImages
ContactMessages
PageContents
```

Najważniejsze używane obecnie tabele to:

* `Partners`,
* `AgendaItems`.

## 8. Model Partner

Model `Partner` służy do przechowywania informacji o partnerach konferencji.

Najważniejsze pola:

```txt
Id              - identyfikator partnera
Name            - nazwa partnera
Description     - opis partnera
WebsiteUrl      - adres strony internetowej
LogoPath        - ścieżka do logo
DisplayOrder    - kolejność wyświetlania
```

Dla partnerów zaimplementowano pełny CRUD:

* dodawanie,
* wyświetlanie listy,
* wyświetlanie szczegółów,
* edycję,
* usuwanie.

Adres modułu:

```txt
http://localhost:5183/Admin/Partners
```

## 9. Model AgendaItem

Model `AgendaItem` służy do przechowywania punktów harmonogramu konferencji.

Najważniejsze pola:

```txt
Id              - identyfikator punktu harmonogramu
Title           - tytuł punktu programu
Description     - opis
StartTime       - data i godzina rozpoczęcia
EndTime         - data i godzina zakończenia
Location        - miejsce
SpeakerId       - opcjonalne powiązanie z prelegentem
```

Dla harmonogramu zaimplementowano pełny CRUD:

* dodawanie,
* wyświetlanie listy,
* wyświetlanie szczegółów,
* edycję,
* usuwanie.

Adres modułu:

```txt
http://localhost:5183/Admin/Agenda
```

W formularzu harmonogramu dodano prostą walidację: godzina zakończenia musi być późniejsza niż godzina rozpoczęcia.

## 10. Migracje

Do tworzenia i aktualizacji struktury bazy danych używane są migracje Entity Framework Core.

Przykładowe komendy:

```bash
dotnet ef migrations add InitialSqlite
dotnet ef database update
```

Migracje znajdują się w katalogu:

```txt
Migrations/
```

Dzięki migracjom można odtworzyć strukturę bazy danych na innym komputerze.

## 11. Logowanie i autoryzacja

Do logowania użyto ASP.NET Core Identity. W aplikacji tworzony jest testowy użytkownik administratora, który ma dostęp do panelu.

Panel administratora jest zabezpieczony atrybutem:

```csharp
[Authorize]
```

Oznacza to, że użytkownik musi być zalogowany, aby korzystać z funkcji administracyjnych.

## 12. Testowanie

Projekt był testowany ręcznie w przeglądarce. Sprawdzono:

* wejście na stronę publiczną,
* uruchomienie backendu lokalnie,
* logowanie do panelu administratora,
* dodawanie partnerów,
* edycję partnerów,
* usuwanie partnerów,
* dodawanie punktów harmonogramu,
* edycję harmonogramu,
* usuwanie punktów harmonogramu.

Dodatkowo sprawdzano dane bezpośrednio w bazie SQLite, np.:

```bash
sqlite3 conference.db "SELECT Id, Name FROM Partners;"
sqlite3 conference.db "SELECT Id, Title FROM AgendaItems;"
```

## 13. Znane ograniczenia

Projekt nie jest pełnym systemem produkcyjnym. Celem było przygotowanie strony konferencyjnej oraz prostego panelu administracyjnego pokazującego działanie backendu, bazy danych i operacji CRUD.

Obecnie panel pozwala zarządzać partnerami i harmonogramem. Pozostałe modele, takie jak wiadomości kontaktowe, aktualności czy galeria, są przygotowane w strukturze projektu, ale nie wszystkie mają osobne ekrany administracyjne.

Podczas budowania projektu może pojawić się ostrzeżenie dotyczące paczki SQLite. Nie blokuje ono działania aplikacji, ale w przyszłości warto zaktualizować zależności.

## 14. Podsumowanie

Projekt łączy statyczną stronę konferencyjną z lokalnym backendem ASP.NET Core MVC. Strona publiczna jest opublikowana przez GitHub Pages, a panel administracyjny działa lokalnie i zapisuje dane w bazie SQLite.

Najważniejsze elementy techniczne projektu to:

* ASP.NET Core MVC,
* Entity Framework Core,
* SQLite,
* ASP.NET Core Identity,
* panel administratora,
* CRUD partnerów,
* CRUD harmonogramu,
* publikacja frontendu przez GitHub Pages.
