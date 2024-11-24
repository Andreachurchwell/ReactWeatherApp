export const celToFar = (celsius) => {
  return (celsius * 9 / 5) + 32;
}
const temperatureInCelsius = 25;
const temperatureInFahrenheit = celToFar(temperatureInCelsius);
console.log(`${temperatureInCelsius}°C is equal to ${temperatureInFahrenheit}°F`);
console.log(celToFar(32))