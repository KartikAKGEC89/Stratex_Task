import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const BookDetail = db.define('bookdetails', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publishedDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

export default BookDetail;