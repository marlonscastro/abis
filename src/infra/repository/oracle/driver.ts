/* istanbul ignore file */
import oracledb from 'oracledb'
import { config } from './config';

oracledb.fetchAsString = [oracledb.CLOB]

export interface OracleResult {
  metadata: Array<{ name: string }>
  rows: Array<any>
}
export interface OracleDriver {
  execute: (statement: string, binds?: Array<any>, options?: any) => Promise<OracleResult | Error>
}

export default class Driver implements OracleDriver {
  execute = async (statement: string, binds: any = [], options?: any): Promise<OracleResult | Error> => {
    let conn: oracledb.Connection | null = null
    const opts = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      autoCommit: true
    }
    try {

      conn = await oracledb.getConnection(config.ABIS_DB);
      return await conn.execute<OracleResult>(statement, binds, { ...opts, ...options }) as OracleResult
      
    } catch (err) {
      console.log(err.message)
      return new Error(err.message)
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}

