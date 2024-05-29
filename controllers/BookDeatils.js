import BookDetail from '../models/CsvModel.js';

export const create = async(req, res) => {
    const { title, author, publishedDate, price } = req.body;
    try {
        await BookDetail.create({
            title: title,
            author: author,
            publishedDate: publishedDate,
            price: price
        });
        res.json({ msg: "Create new book details" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Not created" });
    }
}

export const getbook = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await BookDetail.findByPk(id);

        if (book) {
            res.json(book);
        } else {
            res.status(404).json("Invalid id");
        }
    } catch (error) {
        res.status(401).json(error);
    }
}

export const deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const record = await BookDetail.findByPk(id);

        if (record) {
            await record.destroy({
              where: {
                id: id
              },
            });
            res.json("delete successfully");
        } else {
            res.json("no record for id");
        }
    } catch (error) {
        res.json(error);
    }
}