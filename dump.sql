--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: link; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.link (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" numeric DEFAULT 0
);


--
-- Name: link_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.link_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: link_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.link_id_seq OWNED BY public.link.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying(255) NOT NULL,
    "isValid" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password character varying(255) NOT NULL,
    "linksCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: link id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.link ALTER COLUMN id SET DEFAULT nextval('public.link_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: link; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.link VALUES (7, 9, '2023-03-02 08:41:58.178488', 'www.driven.com.dbr', '5BB7Ddkc', 0);
INSERT INTO public.link VALUES (8, 9, '2023-03-02 14:01:11.72009', 'https://www.npmjs.com/package/nanoid?activeTab=readmer', 'hBHadfdc', 4);
INSERT INTO public.link VALUES (10, 9, '2023-03-03 23:10:46.214397', 'https://hub.driven.com.br', 'MrRGO1rO', 0);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 9, '693d2260-3665-471f-987d-e32d7307b618', true, '2023-02-28 17:32:36.957322+09');
INSERT INTO public.sessions VALUES (2, 9, '55f49e14-95a9-454d-acbf-448e411d80f6', true, '2023-02-28 17:33:41.909487+09');
INSERT INTO public.sessions VALUES (3, 9, '6129bc39-7de4-420e-a8eb-a388da6e413a', true, '2023-02-28 17:36:50.736565+09');
INSERT INTO public.sessions VALUES (4, 9, '006a9be4-b24b-4829-81e3-30deabfbb534', true, '2023-02-28 17:38:55.908074+09');
INSERT INTO public.sessions VALUES (5, 9, 'c414e331-acfc-4141-896f-7b2264ff89da', true, '2023-03-01 10:35:22.665622+09');
INSERT INTO public.sessions VALUES (6, 9, 'ee0b8998-6780-43fd-b027-d6f86b3af1c1', true, '2023-03-01 15:57:55.840866+09');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'leonardo', 'leo@got.com', 'doritos', 0, '2023-03-02 00:00:00+09');
INSERT INTO public.users VALUES (2, 'leonarsdo', 'leo@gdot.com', 'doraitos', 0, '2023-03-02 00:00:00+09');
INSERT INTO public.users VALUES (3, 'leo', 'leo@bog.com', 'abdabd', 0, '2023-03-02 00:00:00+09');
INSERT INTO public.users VALUES (5, 'leo', 'leoa@bog.com', 'abdabd', 0, '2023-03-02 00:00:00+09');
INSERT INTO public.users VALUES (7, 'leo', 'leoa@boga.com', 'abdabd', 0, '2023-03-02 00:00:00+09');
INSERT INTO public.users VALUES (8, 'leo', 'leoad@boga.com', '$2b$10$puhTfs3I/kdjEN2n1zl6PuhHkZ9SBQm5Y/7PRkINcoSdSaiD9bahi', 0, '2023-03-02 00:00:00+09');
INSERT INTO public.users VALUES (9, 'João', 'joao@driven.com.br', '$2b$10$j16njP8/pXj5GHfK.4YPTOmnBDhhvHLT1FiNJDWwSrlPPGMVd1NFi', 0, '2023-03-02 00:00:00+09');


--
-- Name: link_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.link_id_seq', 11, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: link link_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.link
    ADD CONSTRAINT link_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: link link_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.link
    ADD CONSTRAINT "link_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

