import React from 'react';
import ThemeSelector from '../ThemeSelector/ThemeSelector';

function AppInfo() {
  return (
    <div className="appinfo__container">
      <a className="appinfo__back" href="./..">
        &#129044;
      </a>
      <h1>
        O grze
      </h1>
      <h2>
        Wstęp
      </h2>
      <p>
        Projekt "Pasjans" jest zwieńczeniem pracy grupy studentów WZIM SGGW w kierunku zaliczenia przedmiotu "Inżynieria oprogramowania". Celem jej stworzenia było nauczenie się używania narzędzi umożliwiających współpracę większej grupy ludzi ze sobą przy tworzeniu projektów funkcjonalności i kodu oraz pielęgnowania naszych zdolności pracy w grupie.
      </p>
      <p>
        Aplikacja jest naszą implementacją gry Pasjans w wersji Klondike. Celami działania programu jest umożliwienie gry Pasjansa w zwykłym trybie jednoosobowym, ale też w kilka osób na raz przez Internet. Dostępna jest też możliwość porównania swoich statystyk z innymi graczami oraz dostosowanie w pewnym stopniu elementów graficznych do swoich preferencji
      </p>
      <h2>
        Zasady gry
      </h2>
      <p>
        Gra zaczyna się od wylosowania rozdania. Startowa plansza składa się z 4 pustych stosów wyjściowych (po prawej na górze), 7 stosów "przejściowych" układających się z kart w takich ilościach, żeby utworzyć odwrócone schodki (karty z wyjątkiem wierzchołków stosów są odsłonięte). W lewym górnym rogu znajduje się stos dobierania kart, składający się z 20 kart. 
      </p>
      <p>
        Celem gry jest zapełnienie stosów wyjściowych kartami ułożonymi odpowiednimi kolorami w kolejności od asa do króla. Tym samym oznacza to konieczność opróżnienia innych części planszy z kart.
      </p>
      <p>
        Ponadto, podczas gry obowiązują następujące zasady:
      </p>
      <ul>
        <li>na stosie wyjściowym karty można układać tylko tymi samymi kolorami, w rosnącej kolejności od asa do króla</li>
        <li>na stosach przejściowych karty można układać tylko kolorami na przemian (czarna na czerwonej i odwrotnie), w kolejności malejącej</li>
        <li>odsłonięte karty ze stosów przejściowych można przenosić w dowolnej liczbie kart (o ile karta umieszczona najgłębiej w tym stosie jest innego koloru niż pierwsza karta ze stosu, na który chcemy to przenieść)</li>
        <li>ze stosu dobierania karty można tylko dobierać - kładzenie na niego kart jest niemożliwe</li>
      </ul>
      <h3>
        Tryb jednoosobowy
      </h3>
      <p>
        Tryb single player jest dostępny bez rejestrowania, bądź logowania się na konto. Po grach w trybie jednoosobowym bez zalogowania statystyki gry nie zapisują się - przeciwnie jest w tym trybie po zalogowaniu się na konto. Wtedy statystyki gier dostępne są na profilu użytkownika. Pobieranymi statystykami są:
      </p>
      <ul>
        <li>czas trwania gry</li>
        <li>ilość zdobytych punktów</li>
        <li>ilość wykonanych ruchów</li>
        <li>ukończenie (bądź też nie) partii</li>
      </ul>
      <h3>
        Tryb wieloosobowy
      </h3>
      <p>
        Technicznie rzecz biorąc, tryb multiplayer jest rozszerzeniem trybu jednoosobowego. Gra wieloosobowa polega na tym, że kilku graczy zgromadzonych w pokoju układa to samo rozdanie pasjansa. Po grze zbierane są te same statystyki, co w grze jednoosobowej. Na tej podstawie liczone są przydziały punktów dla każdego z graczy. Po grze aplikacja daje możliwość analizy ruchów przeciwników.
      </p>
      <h3>
        Link do dokumentacji developerskiej
      </h3>
      <p><a href="https://klondikedocs.netlify.app/#/">https://klondikedocs.netlify.app/#/</a></p>
    </div>
  )
}

export default ThemeSelector(AppInfo);
