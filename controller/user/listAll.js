import query from "../../db/index.js";

const listAll = async(req, res) => {
    const dbRes = await query("SELECT id, username, email, created_at FROM users");
    const serverRes = {
        message: `${dbRes.rowCount} users are found`,
        data: dbRes.rows,
    };
    res.status(200).json(serverRes);
    console.log(serverRes)
};

export default listAll;

/*
-server response must have message and data
-message must be meaningful
-data must be sanitized, according to needs of frontend. Credential information,
such as password, should not be exposed to the public
*/