-- Table: public.event

-- DROP TABLE IF EXISTS public.event;

CREATE SEQUENCE seq_event_id
  INCREMENT BY 1
  START WITH 20001
  NO MAXVALUE
  CACHE 1;

CREATE TABLE IF NOT EXISTS public.event (
    event_id int DEFAULT nextval('seq_event_id'::regclass) NOT NULL,
    user_id integer,
    title varchar(50),
    date date,
    "time" timestamp(2) without time zone,
    deadline date,
    CONSTRAINT "invite _pkey" PRIMARY KEY (event_id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.event
    OWNER to postgres;