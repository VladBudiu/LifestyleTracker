LifestyleTracker

Această aplicație web permite monitorizarea stilului de viață al utilizatorului folosind inteligență artificială și tehnologii moderne web. Proiectul a fost realizat ca lucrare de licență și acoperă funcționalități precum urmărirea alimentației, exercițiilor fizice, somnului, aportului de apă și progresului personal.

Repository


Codul sursă complet este disponibil aici:
https://github.com/VladBudiu/LifestyleTracker

Notă: Repository-ul conține doar codul sursă.

Structura 

- Backend/ – aplicația Java Spring Boot, responsabilă de logica de business și interacțiunea cu baza de date PostgreSQL
- Frontend/ – aplicația Next.js (React), oferă o interfață modernă utilizatorului final
- Microservices/ – 3 APIs - nutrition_api.py, model_api.py + Model_API/model_api.py
- Database/ – schemele SQL pentru tabelele necesare rularii corecte a proiectului

Pașii de compilare

1. Backend (Spring Boot)

cd Backend
./mvnw clean install

Sau cu Maven instalat:

mvn clean install

Necesită Java 17+

Pașii de lansare a aplicației

1. Pornește baza de date PostgreSQL

Asigură-te că baza de date rulează și are schema corectă. Configurația este în application.properties.

Schema SQL se gaseste in folder-ul Database, unde se afla scriptul de creare pentru toate tabelele necesare din baza de date

2. Rulează backend-ul

cd Backend
./mvnw spring-boot:run

SAU

Deschide fisierul /Backend cu ajutorul IDE IntelliJ si rularea directa a backend-ului

API-ul va fi disponibil pe http://localhost:8080.

3. Rulează componentele AI (FastAPI)

cd Microservices
pip install -r requirements.txt

a) API pentru detecția alimentelor (model YOLO)
    cd Model_API
    
    python -m uvicorn model_api:app --host 127.0.0.1 --port 8001 --reload
    - Endpoint: POST /api/detect
    - Port: 8001
    - Primește imagini și returnează alimentele detectate.

b) API pentru căutarea alimentelor și valorilor nutriționale

    python -m uvicorn nutrition_api:app --host 0.0.0.0 --port 9091 --reload
    - Endpoint: GET /api/foods?q=<aliment>
    - Port: 9091
    - Suportă căutare fuzzy pentru alimente și returnează calorii, proteine etc.

c) API pentru rețete

    python -m uvicorn recipes_api:app --host 0.0.0.0 --port 9090 --reload
    - Endpoints:
        - GET /recipes/random
        - GET /recipes/all
    - Port: 9090
    - Returnează rețete cu imagini și informații relevante.


4. Rulează frontend-ul

cd \Frontend\fitness_tracker\
npm install
npm run dev

Aplicația va fi disponibilă pe http://localhost:3000.


Vlad-Adrian Budiu
Licență, Universitatea Politehnica Timișoara
Profesor coordonator: S.l. dr. ing. Raul Robu
