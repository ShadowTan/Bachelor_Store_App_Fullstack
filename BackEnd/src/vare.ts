//Module imports
import sharp from "sharp";

//src imports
import * as database from "./db_connection";

export class Worker {
  constructor() {
    console.log("Vare Worker has been created!");
  }

  /**
   * Creates an image of store map, which contains the marker location of item
   * @param coordX X coordinate, left right
   * @param coordY Y Coordinate, top down
   * @returns an image which contains a marker
   */
  private async createItemMapImage(coordX: number, coordY: number): Promise<string> {
    // console.log("lagVarebilde cooords");
    // console.log("X = ", coordX);
    // console.log("Y = ", coordY);
    const circleSvg = `<svg width="100" height="100">
              <circle cx="40" cy="40" r="20" fill="red" />
          </svg>`;

    const marker = await sharp(Buffer.from(circleSvg)).toFormat("png").toBuffer();

    const value = await sharp("Example_Store.png")
      .composite([
        {
          input: marker,
          top: coordY - 40,
          left: coordX - 40,
        },
      ])
      .png()
      .toBuffer()
      .then((data) => {
        const base64Data = data.toString("base64");
        return base64Data;
      })
      .catch((err) => {
        console.error("Error:", err);
        return `X = ${coordX}, Y = ${coordY}`;
      });
    return value;
  }

  /**
   *
   * @param arrayString string ex "1000, 1243" or "1243"
   * @param totalItems total items in shelf
   * @param position position within total items in shelf
   * @returns number with coordinate
   */
  private async getCoordinate(arrayString: string, totalItems: number, position: number): Promise<number> {
    if (!arrayString.includes(",")) {
      return parseInt(arrayString);
    }
    const hylleSplit = arrayString.split(",");
    const [left, right] = [parseInt(hylleSplit[0]), parseInt(hylleSplit[1])];
    const diffDivItems = (right - left) / (totalItems - 1);
    const coord = Math.round(left + diffDivItems * (position - 1));

    //Because the circle normally goes outside of the area, some coordinate math is required
    if (left < right) {
      if (coord == right) {
        return coord - 20;
      } else {
        return coord + 20;
      }
    } else {
      if (coord == right) {
        return coord + 5;
      } else {
        return coord - 20;
      }
    }
  }

  public async getItemMapImage(varenummer: string): Promise<string> {
    const dbWorker = new database.Worker();
    const item = await dbWorker.select_query("*", "items", { WHERE: ["[barcode]", "=", `${varenummer}`] });
    console.log(item);
    const itemsInShelf = await dbWorker.select_query("ItemRelativePosition", "items", {
      WHERE: ["[shelf]", "=", `${item[0].shelf}`],
    });
    const hylle = await dbWorker.select_query("shelfX, shelfY", "shelves", {
      WHERE: [`[shelfId]`, `=`, `${item[0].shelf}`],
    });
    const [shelfY, shelfX] = [hylle[0].shelfY, hylle[0].shelfX];

    const ItemPosition = parseInt(item[0].itemRelativePosition);
    const coordY = await this.getCoordinate(shelfY, itemsInShelf.length, ItemPosition);
    const coordX = await this.getCoordinate(shelfX, itemsInShelf.length, ItemPosition);
    const image = await this.createItemMapImage(coordX, coordY);

    return image;
  }

  public async fetchItems(query: string): Promise<[{ itemName: string; itemTrademark: string; barcode: string }]> {
    const dbWorker = new database.Worker();
    const relatedItems = await dbWorker.select_query("itemName, itemTrademark, barcode", "items", {
      WHERE: [
        `[itemTrademark]`,
        `LIKE`,
        `%${query.toLowerCase()}%`,
        `OR`,
        `[itemName]`,
        `LIKE`,
        `%${query.toLowerCase()}%`,
      ],
    });
    return relatedItems;
  }

  public async fetchCommonlySearchedItems(): Promise<[{ itemName: string; itemTrademark: string; barcode: string }]> {
    const dbWorker = new database.Worker();
    const relatedItems = await dbWorker.select_query("itemName, itemTrademark, barcode", "items", {
      LIMIT: ["10"],
    });
    return relatedItems;
  }

  public async fetchAllItems(): Promise<[{ itemName: string; itemTrademark: string; barcode: string }]> {
    const dbWorker = new database.Worker();
    const relatedItems = await dbWorker.select_query("itemName, itemTrademark, barcode", "items", {});
    return relatedItems;
  }
}
