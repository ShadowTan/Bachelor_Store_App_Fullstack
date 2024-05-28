//Module imports
import mysql from "mysql2";

//JSON Imports
import file from "../config/db_connection.json";

export class Worker {
  connection: mysql.Connection;

  constructor() {
    console.log("+ New database worker has been created");
    this.connection = mysql.createConnection({
      host: `${file.host}`,
      user: `${file.user}`,
      password: `${file.password}`,
      database: `${file.database}`,
    });

    this.connection.connect(function (err: any) {
      if (err) {
        console.error("error connecting: " + err.stack);
        return;
      }
      console.log("Database connected successfully");
    });
  }

  /**
   * ends the database connection
   * @param connection `mysql.Connection`
   */
  public async end_connection(): Promise<void> {
    this.connection.end((err) => {
      if (err) {
        console.log(err);
      }
      console.log("- database closed");
    });
  }

  /**
   * An sql select query to the database
   * @param select example, "*" or "column1, column2"
   * @param table tableName, "table1"
   * @param extra WHERE, INNER JOIN... {WHERE: ["[Column1]", "NOT NULL", "OR", "[Column1], "IS NULL"]}
   * @returns all rows which fit the specified criteria
   */
  public async select_query(select: string, table: string, extra: { [key: string]: string[] } = {}): Promise<any> {
    let query: string = `SELECT ${select} FROM ${table}`;
    let insert_values: string[] = [];

    //Insert INNER JOIN into query
    if (extra.hasOwnProperty("INNER_JOIN")) {
      const inner_join_list: string[] = extra["INNER_JOIN"];
      const inner_join_string: string = inner_join_list.map((item) => item).join(" INNER JOIN ");
      query = query + " INNER JOIN " + inner_join_string + " ";
    }

    //Insert WHERE into query
    if (extra.hasOwnProperty("WHERE")) {
      const where_list: string[] = extra["WHERE"];
      const validWhereQuery: string[] = [
        "NOT NULL",
        "IS NULL",
        "&&",
        "AND",
        "||",
        "OR",
        "LIKE",
        "=",
        "<=>",
        "<>",
        "!=",
        ">",
        ">=",
        "<",
        "<=",
        "IN",
        "(",
        ")",
      ];
      let where_string: string = "";

      where_list.forEach((item) => {
        //Checks if item is a column
        if (`${item[0]}${item[item.length - 1]}` == "[]") {
          where_string = where_string + ` ${item.slice(1, item.length - 1)} `;
        } // check if it's a valid SQL item
        else if (validWhereQuery.includes(item)) {
          where_string = where_string + ` ${item} `;
        } // Inserts a ? as item is user submitted
        else {
          where_string = where_string + ` ? `;
          insert_values.push(item);
        }
      });
      query = query + " WHERE" + where_string;
    }

    if (extra.hasOwnProperty("LIMIT")) {
      query = query + ` LIMIT ${extra["LIMIT"][0]}`;
    }

    for (let i = 0; i < insert_values.length; i++) {
      insert_values[i] = insert_values[i].replace(/\"/g, "");
    }

    const response = await new Promise((resolve, reject) => {
      query = query + ";";

      this.connection.prepare(query, (error: any, statement: any) => {
        // console.log(statement);
        if (error || !statement) {
          console.log(error);
          console.log(statement);
          console.log(query);
          return resolve({ status: 500, message: "Internal Database Error" });
        }
        statement.execute(insert_values, (error: any, rows: any, columns: any) => {
          if (error) {
            console.log(error);
            return resolve({ status: 500, message: "Internal Database Error" });
          } else {
            return resolve(rows);
          }
        });
      });
    });

    return response;
  }

  /**
   * inserts item into table
   * @param table `string` - which table to insert into
   * @param columnsTable `string[]` - [column1, column2] gets converted to (column1, column2),
   * @param valuesTable `string[]` - [value1, value2] gets converted to (value1, value2)
   * @returns whether operation was successful
   */
  public async insert(
    table: string,
    columnsTable: string[],
    valuesTable: string[] //Userinput
  ): Promise<any> {
    console.log("entering Insert");
    const columns = columnsTable.join(", ");
    // const values = valuesTable.join(", ");
    let query = `INSERT INTO ${table} (${columns})`;

    for (let i = 0; i < valuesTable.length; i++) {
      valuesTable[i] = valuesTable[i].replace(/\"/g, "");
    }
    if (valuesTable) {
      query = query + " VALUES (" + valuesTable.map((values) => "?").join(" , ") + ")";
    }

    const message = await new Promise((resolve, reject) => {
      this.connection.prepare(query, (error, statement) => {
        if (error || !statement) {
          console.log(error);
          return resolve({ status: 500, message: "Internal Database Error" });
        }

        statement.execute(valuesTable, (error, rows, columns) => {
          if (error) {
            if (error.code === "ER_DUP_ENTRY") {
              resolve("Duplicate entry");
            } else if (error.code === "ER_NO_REFERENCED_ROW_2") {
              resolve("Foreign key constraint fails");
            } else {
              resolve(error);
            }
          } else {
            resolve("Success");
          }
        });
      });
    });

    return message;
  }

  /**
   * Update item in table
   * @param table `string` - which table to insert into
   * @param itemsTable `string[]` - Example: ["column1 = \\\"value1\\\"", "column2 = \\\"value2\\""]
   * @param whereTable `string[]` - Example: Column1 IS NULL
   * @returns string with how the operation went
   */
  public async update(table: string, itemsTable: string[], whereTable: string[]): Promise<any> {
    const items = itemsTable.join(", ");
    const where = whereTable.join(" && ");

    const message = await new Promise((resolve, reject) => {
      this.connection.query(`UPDATE ${table} SET ${items} WHERE ${where};`, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve("Success");
        }
      });
    });

    return message;
  }
}
