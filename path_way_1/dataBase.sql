CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    Day VARCHAR(255) NOT NULL,
    Morning VARCHAR(255) NOT NULL,
    Evening VARCHAR(255) NOT NULL
);

INSERT INTO sessions (Day, Morning, Evening)
VALUES ('Monday','available','available');

INSERT INTO sessions (Day, Morning, Evening)
VALUES ('Tuesday','available','available');

INSERT INTO sessions (Day, Morning, Evening)
VALUES ('Wednsday','available','available');

INSERT INTO sessions (Day, Morning, Evening)
VALUES ('Thursday','available','available');

INSERT INTO sessions (Day, Morning, Evening)
VALUES ('Friday','available','available');

INSERT INTO sessions (Day, Morning, Evening)
VALUES ('Saturday','available','available');

INSERT INTO sessions (Day, Morning, Evening)
VALUES ('Sunday','available','available');


CREATE TABLE volunteers (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Day VARCHAR(255) NOT NULL,
    Sessions VARCHAR(255) NOT NULL
);
INSERT INTO volunteers (Name,Day, Sessions)
VALUES ('shadi','Sunday','morning');
