# Cracow Data Science Conference

Projekt przedstawia stronę internetową konferencji **Cracow Data Science Conference**. Strona zawiera informacje o wydarzeniu, edycjach konferencji, organizatorach, partnerach, zapisach, regulaminie oraz kontakcie.

Projekt składa się z dwóch części:

* części frontendowej, dostępnej jako statyczna strona przez GitHub Pages,
* części backendowej napisanej w ASP.NET Core MVC, uruchamianej lokalnie.

Repozytorium projektu:

`https://github.com/CiochDawid/Conference_projekt`

Wersja statyczna strony:

`https://ciochdawid.github.io/Conference_projekt/`

## Technologie

W projekcie wykorzystano:

* HTML5,
* CSS3,
* JavaScript,
* ASP.NET Core MVC,
* Razor Views,
* Entity Framework Core,
* SQLite,
* ASP.NET Core Identity,
* Git i GitHub,
* GitHub Pages.

## Najważniejsze funkcjonalności

Frontend:

* wielostronicowa strona konferencji,
* responsywny układ,
* nawigacja między podstronami,
* sekcje informacyjne,
* podstrony kontaktu, regulaminu, zapisów i logo,
* publikacja przez GitHub Pages.

Backend:

* logowanie administratora,
* panel administracyjny,
* baza danych SQLite,
* obsługa migracji Entity Framework Core,
* zarządzanie partnerami konferencji,
* zarządzanie harmonogramem wydarzenia.

## Uruchomienie aplikacji lokalnie

Do uruchomienia projektu potrzebne jest zainstalowane środowisko .NET SDK.

### 1. Pobranie repozytorium

```bash
git clone https://github.com/CiochDawid/Conference_projekt.git
cd Conference_projekt
```

### 2. Przywrócenie zależności

```bash
dotnet restore
```

### 3. Zbudowanie projektu

```bash
dotnet build
```

Podczas budowania może pojawić się ostrzeżenie dotyczące paczki SQLite. Nie blokuje ono uruchomienia projektu.

### 4. Utworzenie lub aktualizacja bazy danych

```bash
dotnet ef database update
```

Komenda tworzy lokalną bazę SQLite na podstawie migracji.

### 5. Uruchomienie aplikacji

```bash
dotnet run
```

Po uruchomieniu aplikacja jest dostępna pod adresem:

`http://localhost:5183`

Panel administratora:

`http://localhost:5183/Admin`

## Konto administratora

Do testowania panelu administratora można użyć konta:

```txt
Email: admin@cdsc.local
Hasło: Admin123!
```

Po zalogowaniu administrator może zarządzać partnerami oraz harmonogramem konferencji.

## GitHub Pages

Część statyczna strony znajduje się w folderze `docs`, ponieważ GitHub Pages jest skonfigurowany tak, aby publikować stronę z tego katalogu.

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

## Dokumentacja

W repozytorium znajdują się dodatkowe pliki dokumentacyjne:

* `DOKUMENTACJA_TECHNICZNA.md` — opis techniczny projektu,
* `INSTRUKCJA_UZYTKOWNIKA.md` — instrukcja obsługi dla użytkownika nietechnicznego.

## Autorzy

Projekt został wykonany jako strona konferencyjna z prostym zapleczem administracyjnym w ASP.NET Core MVC.
