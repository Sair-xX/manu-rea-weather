//ネストの深いオブジェクトのデータ型は、内側から決める
export interface CurrentWeather{
  temperature:number;
  weathercode:number;
  windspeed:number;
};

export interface Res{
  current_weather:CurrentWeather;
}