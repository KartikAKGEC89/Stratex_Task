import { Sequelize } from "sequelize";
 
const db = new Sequelize('bookstore', 'root', 'root', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;