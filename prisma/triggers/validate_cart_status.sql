-- FUNCTION
CREATE OR REPLACE FUNCTION validate_cart_status()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT status FROM carts WHERE id = NEW.cart_id) <> 'pending' THEN
        RAISE EXCEPTION 'Cannot add products to a cart that is not pending.';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--TRIGGER
CREATE TRIGGER check_cart_status_before_insert_or_update
BEFORE INSERT OR UPDATE ON product_carts
FOR EACH ROW
EXECUTE FUNCTION validate_cart_status();
