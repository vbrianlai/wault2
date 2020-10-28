CREATE TABLE users (
  uid INT PRIMARY KEY,
  display_name VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  email_verified BOOLEAN,
  date_created DATE,
  last_login DATE,
  friends INT[],
  likedSongsByRoom json[]
);

CREATE TABLE rooms (
    rid INT PRIMARY KEY,
    users INT[],
    usersLikedSongs json[]
);