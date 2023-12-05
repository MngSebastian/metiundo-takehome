import axios from "axios";
import { ElectricityReading, LoginResponse, MeteringPoint } from "./types";
import dotenv from "dotenv";
dotenv.config();

//Base url and creditentials
const baseUrl = "https://api.metiundo.de/v1";
const EMAIL = process.env.EMAIL || "";
const PASSWORD = process.env.PASSWORD || "";

async function login(): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(`${baseUrl}/auth/login`, {
      email: EMAIL,
      password: PASSWORD,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error && error.message ? error.message : "Unknown error";
    throw new Error(`Error logging in: ${errorMessage}`);
  }
}

async function listAllMeters(accessToken: string): Promise<MeteringPoint[]> {
  try {
    const response = await axios.get<MeteringPoint[]>(
      `${baseUrl}/meteringpoints`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Error listing meters: ${(error as Error).message}`);
  }
}

async function getJulyReadings(
  accessToken: string,
  meterId: string
): Promise<ElectricityReading[]> {
  try {
    const startDate = new Date("2023-07-01T00:00:00Z").getTime();
    const endDate = new Date("2023-07-31T23:59:59Z").getTime();
    const response = await axios.get<ElectricityReading[]>(
      `${baseUrl}/meteringpoints/${meterId}/readings`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          from: startDate,
          to: endDate,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error getting July readings: ${error.message}`);
  }
}

export { login, listAllMeters, getJulyReadings };
