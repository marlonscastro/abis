export const config = {
  ABIS_DB: {
    user: process.env.ABIS_USERNAME,     // DB USER
    password: process.env.ABIS_PASSWORD, // DB SENHA
    connectionString: `${process.env.ABIS_HOST}:${process.env.ABIS_PORT}/${process.env.ABIS_SID}` // The db connection URI
  }  
};
