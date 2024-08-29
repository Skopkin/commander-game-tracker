import Commander from "../models/Commander.model";
import CommanderRepository from "../repositories/ICommanderRepository"
import CardPrintingRepository from "../repositories/ICardPrintingRepository"
import { keywords } from "../enums";
import CardPrinting from "../models/CardPrinting.model";

// Initiates query chain for all printings of all legal commanders on Scryfall.
// This query is large so it is broken down into smaller results that are
//  iterated through to insert into the db
// Search is restricted to:
//   "cards can be your commander and it’s legal in Commander and the cards aren’t digital prints and the cards are not Scryfall “extras”"
export async function initiateBulkCommandersUpdate() {
    var uri = "https://api.scryfall.com/cards/search?q=is%3Acommander+legal%3Acommander+include%3Aextras+-is%3Adigital+-is%3Aextra&unique=prints&order=name";
    var currentName = ""

    return fetch(uri)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then(data => {
            data.data.forEach((element: { name: any; }) => {
                if (currentName !== element.name) {
                    parseScryfallJSONtoCommander(element);
                    currentName = element.name
                }
                parseScryfallJSONtoCardPrinting(element);
            });
            if (data.has_more == true) {
                scryfallSearch(data.next_page, currentName)
            }
            return data.data
        })
}

// Recursive function that inserts each commander and printing from a scryfall query
async function scryfallSearch(uri: string, current: string) {
    await wait(2000);
    var currentName = current;
    return fetch(uri)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
    .then(data => {
        data.data.forEach((element: { name: any; }) => {
            if (currentName !== element.name) {
                parseScryfallJSONtoCommander(element);
                currentName = element.name
            }
            parseScryfallJSONtoCardPrinting(element);
        });
        if (data.has_more == true) {
           scryfallSearch(data.next_page, currentName) 
        }
        return data;
    })
}

// Parses relevant data from a Scryfall card entry and inserts it into the db
async function parseScryfallJSONtoCommander(json: any) {
    try {
        var parsed: any = {
            "name": json.name,
            "oracle_id": json.oracle_id,
            "keywords": json.keywords.filter((e: string) => keywords.includes(e))[0],
            "type_line": json.type_line,
            "gatherer": json.related_uris.gatherer,
            "edhrec": json.related_uris.edhrec
        }

        const commander: Commander = parsed;

        const savedCommander = CommanderRepository.save(commander);
    } catch (err) {
        console.log(err)
    }

}

// Parses relevant data from a Scryfall printing entry and inserts it into the db
// Scryfall formats the JSON differently for double faced cards
async function parseScryfallJSONtoCardPrinting( json: any) {
    try {
        if (json.hasOwnProperty("card_faces")) {
            var parsed: any = {
                "scryId": json.id,
                "uri": json.uri,
                "commanderOId": json.oracle_id,
                "png": json.card_faces[0].image_uris.png,
                "art_crop": json.card_faces[0].image_uris.art_crop,
                "border_crop": json.card_faces[0].image_uris.border_crop,
                "back_png": json.card_faces[1].image_uris.png,
                "back_art_crop": json.card_faces[1].image_uris.art_crop,
                "back_border_crop": json.card_faces[1].image_uris.border_crop,
                "set_code": json.set,
                "collector_number": json.collector_number
            }
            console.log(parsed);
        } else {
            var parsed: any = {
                "scryId": json.id,
                "uri": json.uri,
                "commanderOId": json.oracle_id,
                "png": json.image_uris.png,
                "art_crop": json.image_uris.art_crop,
                "border_crop": json.image_uris.border_crop,
                "back_png": null,
                "back_art_crop": null,
                "back_border_crop": null,
                "set_code": json.set,
                "collector_number": json.collector_number
            }
        }

        const printing: CardPrinting = parsed;

        const savedPrinting = CardPrintingRepository.save(printing);
    } catch (err) {
        console.log(err)
    }

}

// This wait function is used to pad out the time between Scryfall queries
function wait (milliseconds: number) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}