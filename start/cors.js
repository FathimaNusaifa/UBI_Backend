import cors from 'cors';

export default function CORS(app) {
    //Cross-oring-Resource-Sharing
    app.use(cors());
    app.options('*', cors());
}