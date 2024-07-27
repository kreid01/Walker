import express from "express"
import bodyParser from "body-parser"
import cors from "cors"


const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const request = require("request")
import * as cheerio from "cheerio"

app.get("/fusion", async (req, res) => {
    const { id1, id2 } = req.query
    request(`https://infinitefusiondex.com/details/${id1}.${id2}`, async (error: any, response: any, html: any) => {
        if (!error && response.statusCode == 200) {
            const stats = (getStats(html))
            const image = getImage(html)
            const types = getTypes(html)
            const mon = { stats, image, types }
            res.status(200).json(mon)
        }
    })
})

const getTypes = (html: any) => {
    const $ = cheerio.load(html)
    const type1 = $("img.elementalType").first().attr("alt")
    const type2 = $("img.elementalType").first().next().attr("alt")
    return [type1, type2].filter(e => e)
}

const getImage = (html: any) => {
    const $ = cheerio.load(html)
    const image = $("img.sprite").first().attr("src")
    return image;

}

const getStats = (html: any) => {
    const $ = cheerio.load(html)
    const statContainer = $("div.container-fluid")
    const statCol = $(statContainer).find("div.d-sm-block")
    const stats = statCol.map((e, i) => {
        return parseInt($(i).html().toString().substring(0, 2))
    })

    return {
        hp: stats[0],
        attack: stats[1],
        defence: stats[2],
        specialAttack: stats[3],
        specialDefence: stats[4],
        speed: stats[5]
    }
}

app.listen(8080, () => {
    console.log("server started at 8080")
})