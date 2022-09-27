-- Table: public.event_restaurants

-- DROP TABLE IF EXISTS public.event_restaurants;

CREATE TABLE IF NOT EXISTS public.event_restaurants
(
    event_id integer,
    restaurant_id varchar(22) COLLATE pg_catalog.default,
    restaurant_name varchar(100),
    image_url varchar(75),
    up_votes integer,
    down_votes integer,
    UNIQUE (event_id, restaurant_id),
    CONSTRAINT event_id FOREIGN KEY (event_id)
        REFERENCES public.event (event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.event_restaurants
    OWNER to postgres;