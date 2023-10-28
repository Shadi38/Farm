CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    Day Date NOT NULL,
    Time VARCHAR(255) NOT NULL
);

INSERT INTO sessions (Day, Time)
VALUES ( '2023-10-01','Morning');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-01','Evening');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-02','Morning');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-02','Evening');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-03','Morning');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-03','Evening');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-04','Morning');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-04','Evening');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-05','Morning');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-05','Evening');


INSERT INTO sessions (Day, Time)
VALUES ('2023-10-06','Morning');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-06','Evening');


INSERT INTO sessions (Day, Time)
VALUES ('2023-10-07','Morning');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-07','Evening');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-08','Morning');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-08','Evening');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-09','Morning');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-09','Evening');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-10','Morning');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-10','Evening');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-11','Morning');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-11','Evening');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-12','Morning');

INSERT INTO sessions (Day, Time)
VALUES ('2023-10-12','Evening');

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


