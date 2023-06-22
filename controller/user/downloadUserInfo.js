import query from "../../db/index.js";

const downloadUserInformation = async(req, res) => {
    const id = req.params.id;
    const dbRes = await query("SELECT * FROM users WHERE id=$1", [
        id,
    ]);
    if (dbRes.rows.length === 0) {
        const notFoundRes = {
            message: "No users found",
        };
        res.status(404).json(notFoundRes);
    }
    const successRes = {
        message: `${dbRes.rowCount} users are found`,
        data: dbRes.rows,
    };
    res.status(200).json(successRes);
};

export default downloadUserInformation;