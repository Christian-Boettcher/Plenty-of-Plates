CREATE TABLE IF NOT EXISTS public.users_restaurants
(
    user_id integer,
    restaurant_id varchar(22),
    restaurant_name varchar(100),
    image_url varchar(75),
    isFavorite boolean,
    UNIQUE (user_id, restaurant_id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users_restaurants
    OWNER to postgres;