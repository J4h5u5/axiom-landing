"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
dotenv_1.default.config({ path: './config.env' });
const DB = process.env.DATABASE?.replace('<PASSWORD>', process.env.DATABASE_PASSWORD || '') || '';
mongoose_1.default
    .connect(DB, { autoIndex: true })
    .then(() => console.log('DB connection successful!'));
const port = process.env.PORT || 3000;
app_1.app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
//# sourceMappingURL=server.js.map