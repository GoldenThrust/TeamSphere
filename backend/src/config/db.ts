import mongoose from 'mongoose';

class DB {
    constructor() {
        const db: string = process.env.DB_CONNECTION || 'mongodb';
        const host: string = process.env.DB_HOST || 'localhost';
        const port: string | number = process.env.DB_PORT || 27017;
        const database: string = process.env.DB_DATABASE || 'TeamSphere';
        const dbURL: string = `${db}://${host}:${port}/${database}`;
        mongoose.connect(dbURL, { autoIndex: !process.env.PROUCTION || false })
    }

    async connected(): Promise<boolean | Error> {
        return new Promise((resolve, reject) => {
            mongoose.connection.once('open', () => {
                resolve(true);
            });
            mongoose.connection.on('error', (err) => {
                reject(err);
            });
        })
    }
}

const mongoDB: DB = new DB();
export default mongoDB;