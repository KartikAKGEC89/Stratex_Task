import BookDeatil from '../models/CsvModel.js';

export const retrivebook = async (req, res) => {
    try {
        const details = await BookDeatil.findAll();
            if (details) {
                const titles = details.map(detail => detail.title);
                res.json(titles);
            } else {
                res.json("Not retrived");
            }
    } catch (error) {
        res.json(error);
    }
}

export const deepdetails = async (req, res) => {
    try {
            const title = req.params.title;
            const value = await BookDeatil.findOne({ where: { title: title } });

            if (value) {
                res.json(value)
            } else {
                res.json("Error");
            }
    } catch (error) {
        res.json(error);
    }
}