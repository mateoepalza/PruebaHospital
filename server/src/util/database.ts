import mysql from 'mysql2';
import config from '../config/configdb';

const pool = mysql.createPool(config);

export default  pool.promise();