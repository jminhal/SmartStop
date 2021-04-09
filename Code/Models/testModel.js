var pool = require("./connection");

//recebe a informação de umacerta ação
module.exports.getTest = async function() {
    try {

        let sql = "SELECT COUNT(*) AS 'count', U.user_id, U.username "+
        "FROM acaoUtilizador AU, utilizador U "+
        "WHERE AU.user_id=U.user_id " +
        "GROUP BY U.user_id"

        
        
        let result = await pool.query(sql);
        console.log(sql);
        if (result.length > 0) {
            return {status: 200, data: result};
        }
        else {
            return {status: 404, data: {msg: "Açao não encontrada!"}};
        }

    } catch (err) {
        console.log(err);
        return {status: 500, data: err};
    } 
}; 