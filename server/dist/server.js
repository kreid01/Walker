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
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
const request = require("request");
const cheerio = __importStar(require("cheerio"));
app.get("/fusion", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { id1, id2 } = req.query;
    request(`https://infinitefusiondex.com/details/${id1}.${id2}`, (error, response, html) => __awaiter(this, void 0, void 0, function* () {
        if (!error && response.statusCode == 200) {
            const stats = (getStats(html));
            const image = getImage(html);
            const types = getTypes(html);
            const mon = { stats, image, types };
            res.status(200).json(mon);
        }
    }));
}));
const getTypes = (html) => {
    const $ = cheerio.load(html);
    const type1 = $("img.elementalType").first().attr("alt");
    const type2 = $("img.elementalType").first().next().attr("alt");
    return [type1, type2].filter(e => e);
};
const getImage = (html) => {
    const $ = cheerio.load(html);
    const image = $("img.sprite").first().attr("src");
    return image;
};
const getStats = (html) => {
    const $ = cheerio.load(html);
    const statContainer = $("div.container-fluid");
    const statCol = $(statContainer).find("div.d-sm-block");
    const stats = statCol.map((e, i) => {
        return parseInt($(i).html().toString().substring(0, 2));
    });
    return {
        hp: stats[0],
        attack: stats[1],
        defence: stats[2],
        specialAttack: stats[3],
        specialDefence: stats[4],
        speed: stats[5]
    };
};
app.listen(8080, () => {
    console.log("server started at 8080");
});
//# sourceMappingURL=server.js.map