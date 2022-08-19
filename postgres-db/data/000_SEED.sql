CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    title varchar(50),
    number_of_sessions int,
    total_time_elapsed int,
    is_done boolean DEFAULT false
);

INSERT INTO tasks (title, number_of_sessions, total_time_elapsed, is_done) VALUES
    ('Wash the dishes', 3, 124, False),
    ('Walk with my dog', 3, 2414, False),
    ('Study PostgreSQL', 4, 5221, True),
    ('Study React', 3, 1252, True),
    ('Study Node', 3, 4215, False),
    ('Study Knex', 11, 23412, False),
    ('Connect docker containers', 23, 12321, True);