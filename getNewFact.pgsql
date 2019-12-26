CREATE OR REPLACE FUNCTION getNewFact (theUserId integer)
  RETURNS varchar
  AS $$
DECLARE
  validFact varchar;
  validFactID integer;
BEGIN
  SELECT
    fact,
    factID INTO validFact,
    validFactID
  FROM
    facts
  WHERE
    factID NOT IN (
      SELECT
        facts.factID
      FROM
        facts
        INNER JOIN texts ON texts.factid = facts.factid
        INNER JOIN users ON texts.userid = theUserID)
  ORDER BY
    random()
  LIMIT 1;
  INSERT INTO texts (factID, userid)
  VALUES (validFactID, theUserID);
  RETURN validFact;
END;
$$
LANGUAGE plpgsql;

