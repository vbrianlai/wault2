CREATE TABLE users (
  uid INT PRIMARY KEY,
  display_name VARCHAR(255),
  email VARCHAR(255) UNIQUE
);

CREATE TABLE rooms (
    rid uuid PRIMARY KEY,
    rname VARCHAR(255),
    rownerId INT,
    usersLikedSongs json[]
);