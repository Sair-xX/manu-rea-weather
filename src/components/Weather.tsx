import type { CurrentWeather } from '../types.ts';

interface Props {
  weather: CurrentWeather;
}

export function Weather({ weather }: Props) {
  //あんまコンポーネント側でロジック書くことないと思っていたけど、
  //受け取ったステートの値によって表示を変えるときは、こっちでロジック書くことに気がついた。
  let wea: string;
  if (weather.weathercode < 2) {
    wea = '晴れ';
  } else if (weather.weathercode < 46) {
    wea = '曇り';
  } else {
    wea = '雨';
  }

  return (
    <>
      <p>{`天気：${wea}`}</p>
      <p>{`温度：${weather.temperature}℃`}</p>
      <p>{`風速：${weather.windspeed}m/s`}</p>
    </>
  );
}
