CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    Day Date NOT NULL,
    Time VARCHAR(255) NOT NULL,
    Booked BOOLEAN
);

INSERT INTO sessions (Day, Time, Booked)
VALUES ('Oct 06, 2023','Morning',true);

INSERT INTO sessions (Day, Time, Booked)
VALUES ('Oct 06, 2023','Evening', true);


INSERT INTO sessions (Day, Time, Booked)
VALUES ('Oct 07, 2023','Morning',true);

INSERT INTO sessions (Day, Time, Booked)
VALUES ('Oct 07, 2023','Evening', false);

INSERT INTO sessions (Day, Time, Booked)
VALUES ('Oct 08, 2023','Morning', false);

INSERT INTO sessions (Day, Time, Booked)
VALUES ('Oct 08, 2023','Evening', false);

INSERT INTO sessions (Day, Time, Booked)
VALUES ('Oct 09, 2023','Morning', false);

INSERT INTO sessions (Day, Time, Booked)
VALUES ('Oct 09, 2023','Evening', false);

INSERT INTO sessions (Day, Time, Booked)
VALUES ('Oct 10, 2023','Morning', false);

INSERT INTO sessions (Day, Time, Booked)
VALUES ('Oct 10, 2023','Evening', false);

INSERT INTO sessions (Day, Time, Booked)
VALUES ('Oct 11, 2023','Morning', false);

INSERT INTO sessions (Day, Time, Booked)
VALUES ('Oct 11, 2023','Evening', false);

INSERT INTO sessions (Day, Time, Booked)
VALUES ('Oct 12, 2023','Morning', false);

INSERT INTO sessions (Day, Time, Booked)
VALUES ('Oct 12, 2023','Evening', false);

CREATE TABLE volunteers (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL
);
INSERT INTO volunteers (Name,LastName, Address)
VALUES ('shadi','fakhri','london');

INSERT INTO volunteers (Name,LastName, Address)
VALUES ('roya','afshar','birmingham');

INSERT INTO volunteers (Name,LastName, Address)
VALUES ('mehdi','ahadi','kent');



CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    sessions_id integer,
    volunteers_id integer,
    FOREIGN KEY (sessions_id) REFERENCES sessions(id),
    FOREIGN KEY (volunteers_id) REFERENCES volunteers(id)
);


INSERT INTO bookings (sessions_id,volunteers_id)
VALUES (1,1);

INSERT INTO bookings (sessions_id,volunteers_id)
VALUES (2,1);

INSERT INTO bookings (sessions_id,volunteers_id)
VALUES (3,2);


