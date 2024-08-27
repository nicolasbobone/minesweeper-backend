-- FUNCTION
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  IF (OLD.* IS DISTINCT FROM NEW.*) THEN
    NEW.updated_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT tablename
    FROM pg_catalog.pg_tables
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format(
      'CREATE TRIGGER update_%I_timestamp
       BEFORE UPDATE ON %I
       FOR EACH ROW
       EXECUTE FUNCTION update_timestamp();',
      r.tablename, r.tablename
    );
  END LOOP;
END $$;


