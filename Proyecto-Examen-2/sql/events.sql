DROP TABLE IF EXISTS Events;

CREATE TABLE Events (
    eventId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(256) NOT NULL,
    eventDate DATE NOT NULL,
    maxParticipants INT NOT NULL,
    place VARCHAR(256) NOT NULL,
    imageUrl VARCHAR(512),
    FOREIGN KEY (userId) REFERENCES Users(userId)
);

CREATE OR REPLACE VIEW EventsWithUsers AS 
    SELECT Events.*, Users.username, Users.fullName, Users.avatarUrl, Users.city, Users.age
    FROM Events
    JOIN Users ON Events.userId = Users.userId;

INSERT INTO Events (userId, name, eventDate, maxParticipants, place, imageUrl) VALUES
    (1, 'Reunión para estudiar física', '2023-05-12', 5, 'Sala de estudios', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/El_aula_como_espacio_educativo.jpg/220px-El_aula_como_espacio_educativo.jpg'),
    (1, 'Celebración del cumple de Rocío', '2023-04-02', 15, 'Casa de Rocío', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Tarta_de_cumplea%C3%B1os.svg/640px-Tarta_de_cumplea%C3%B1os.svg.png'),
    (2, 'Partido de pádel', '2023-08-21', 6, 'Pistas de casa de Paco', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Pala_de_padel.jpg/1200px-Pala_de_padel.jpg'),
    (2, 'Concierto de violín', '2020-01-01', 250, 'Salón de actos', 'https://upload.wikimedia.org/wikipedia/commons/6/66/Nconcert.jpg');
