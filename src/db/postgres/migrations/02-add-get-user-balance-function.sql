-- Cria a função com nome dela e o nome do parametro (uid = userId)
CREATE OR REPLACE FUNCTION get_user_balance(uid UUID)
-- Informa a tabela que retorna
RETURNS TABLE (
	earnings NUMERIC(10,2),
	expenses NUMERIC(10,2),
	investments NUMERIC(10,2),
	balance NUMERIC(10,2)
) AS $$
BEGIN 
	RETURN QUERY
	SELECT 
	SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) AS earnings,
	SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS expenses,
	SUM(CASE WHEN type = 'INVESTIMENT' THEN amount ELSE 0 END) AS investments,
	(
		SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END)
		- SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END)
		+ SUM(CASE WHEN type = 'INVESTIMENT' THEN amount ELSE 0 END)
	) AS balance
from transactions where user_id = get_user_balance.uid;
END; $$

	LANGUAGE plpgsql;