import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
dotenv.config();
const app = express();
import csvtojson from "csvtojson";
import multer from "multer";
import BookDetail from './models/CsvModel.js';
import { verifyToken , authorizeSeller} from "./middleware/VerifyToken.js";


const upload = multer({ dest: 'uploads/' });
 
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);


app.post('/upload', verifyToken, authorizeSeller,upload.single('csvfile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = req.file.path;

    try {
        const jsonArray = await csvtojson().fromFile(filePath);

        await Promise.all(jsonArray.map(async (row, index) => {
            try {
                await BookDetail.create({
                    title: row.title,
                    author: row.author,
                    publishedDate: row.publishedDate,
                    price: row.price
                });
                console.log(`Item at row ${index + 1} inserted successfully`);
            } catch (error) {
                console.error(`Unable to insert item at row ${index + 1}:`, error);
            }
        }));

        res.send('File uploaded and data inserted successfully');
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).send('Error processing file');
    }
});
 
app.listen(5000, ()=> console.log('Server running at port 5000'));