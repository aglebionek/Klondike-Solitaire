# Database

Folder odpowiadający za połączenia, kwerendy i skrypty w bazie danych.

# connection

Za stworzenie i weryfikacje połączenia odpowiada `mysql_query.js`.

W razie błędnego połączenia z bazą mysql konsola wypisuje błąd.

W przypadku użycia kwerend obsługa błędu wypisuje w konsoli informacje o błędnej kwerendzie.

# queries

`account_select.sql` - odpowiada za znalezienie konta po ID.

`account_update.sql` - aktualizacja danych konta.

`check_if_user_exist_by_email.sql` - sprawdzenie czy użytkownik istnieje korzystając z jego emaila.

`get_settings.sql` - pobranie ustawień gry dla gracza o odpowiednim user_id.

`get_stats_player.sql` - pobranie wszystkich statystyk gracza.

`get_stats.sql` - pobranie wszystkich statystyk (globalnych).

`login.sql` - wybranie danych dla użytkownika o danym emailu.

`player_exists.sql` - sprawdzenie czy użytkownik istnieje.

`register.sql` - dodanie danych z rejestracji do bazy danych.

`test.sql?` i `test1.sql?` czeka na info o tym czy będzie usunięte.

`update_settings` - zaktualizowanie danych dla danego konta.

# scripts

czeka na info o tym czy będzie usunięte.

`db_create.sql`

`db_user_create.sql`

`sample_records.sql`

`starter.sql`

`table_create.sql`
