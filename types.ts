export interface LoginResponse {
  user: any;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface MeteringPoint {
  uuid: string;
}

export interface ElectricityReading {
  readingTime: number;
  serverTime: number;
  energyOut: number;
  energyOutStatus: string;
  energyIn: number;
  energyInStatus: string;
}
