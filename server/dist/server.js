"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const request = require("cheerio");
const cheerio = __importStar(require("cheerio"));
const getFusion = () => {
    request("https://infinitefusiondex.com/details/268.299", (error, response, html) => __awaiter(this, void 0, void 0, function* () {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const stats = $("div.container-fluid");
            console.log(stats.html);
        }
    }));
};
getFusion();
app.get("fusion", () => (req, res) => {
});
//# sourceMappingURL=server.js.map