Part0--> Assignments

0.4-->
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET /notes
    Server-->>Browser: HTML page with form and notes

    Note right of Browser: User writes a note and clicks Save

    Browser->>Server: POST /notes (form data)
    Server-->>Browser: Redirect response

    Browser->>Server: GET /notes
    Server-->>Browser: Updated HTML page with new note


0.5-->
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET /spa
    Server-->>Browser: HTML + JavaScript

    Note right of Browser: JavaScript starts running

    Browser->>Server: GET /api/notes
    Server-->>Browser: JSON data (notes)

    Note right of Browser: Browser renders notes using JavaScript

0.6-->
sequenceDiagram
    participant Browser
    participant Server

    Note right of Browser: User types note and clicks Save

    Browser->>Server: POST /api/notes (JSON note data)
    Server-->>Browser: JSON response (saved note)

    Note right of Browser: JavaScript updates UI without page reload

Exercise--> 3.10 --> Deploying backend on render
Deployed backend:
https://phonebook-backend-pydz.onrender.com/api/persons
