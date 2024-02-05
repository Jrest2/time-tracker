export interface IConfig {
  host: string;
  port: number;
  accessTokenTtl: number;
  refreshTokenTtl: number;
}

export default () => {
  const config: IConfig = {
    host: process.env.APPLICATION_HOST || 'localhost',
    port: parseInt(process.env.APPLICATION_PORT, 10) || 3005,
    accessTokenTtl: parseInt(process.env.ACCESS_TOKEN_TTL, 10) || 60 * 60,
    refreshTokenTtl:
      parseInt(process.env.ACCESS_TOKEN_TTL, 10) || 30 * 24 * 60 * 60,
  };
  return config;
};
