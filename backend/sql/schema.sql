BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT,
  password TEXT,
  first_name TEXT,
  last_name TEXT,
  country TEXT,
  city TEXT,
  phone_number TEXT,
  position TEXT,
  email_notif smallint DEFAULT 0,
  sms_notif smallint DEFAULT 0,
  picture bytea,
  picture_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS _index_users_email ON users (email);

COMMIT;