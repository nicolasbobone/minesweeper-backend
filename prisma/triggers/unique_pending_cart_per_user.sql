-- FUNCTION
CREATE OR REPLACE FUNCTION unique_pending_cart_per_user()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM carts
        WHERE user_id = NEW.user_id
          AND status = 'pending'
          AND id <> NEW.id
    ) THEN
        RAISE EXCEPTION 'There can only be one pending cart per user.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER
CREATE TRIGGER trigger_unique_pending_cart_per_user
BEFORE INSERT OR UPDATE ON carts
FOR EACH ROW
EXECUTE FUNCTION unique_pending_cart_per_user();
