import { login, listAllMeters, getJulyReadings } from "./scrips";

async function main(): Promise<void> {
  try {
    const loginResponse = await login();
    const accessToken = loginResponse.tokens.accessToken;
    const meters = await listAllMeters(accessToken);

    // Assuming there's a single meter provided.
    const meterId = meters[0]?.uuid;
    if (meterId) {
      const julyReadings = await getJulyReadings(accessToken, meterId);
      const overallConsumption = julyReadings.reduce(
        (total, reading) => total + reading.energyOut,
        0
      );

      const maxPower = Math.max(
        ...julyReadings.map((reading) => reading.energyOut)
      );

      //Convert W to KW
      const maxPowerInKw = maxPower / 1000;
      // days * hours in a day
      const timeInHours = 31 * 24;
      //Convert W to KWH
      const overallConsumptionInKWh = (overallConsumption / 1000) * timeInHours;

      console.log(
        "Overall Electricity Consumption for July 2023:",
        overallConsumptionInKWh,
        "KWH"
      );
      console.log("Maximum Power for July 2023:", maxPowerInKw, "KW");
    } else {
      console.log("No metering points found for the user.");
    }
  } catch (error) {
    console.log(error.message);
  }
}
main();
