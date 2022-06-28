export default function errorMiddleware(error, req, res, next) {
    res.status(500).send(error.message);
}