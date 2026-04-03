//基本stateとか関数はカスタムフックから受け取るからここではインポートしない
import { useWeather } from './hooks/useWeather.ts';
import { Weather } from './components/Weather.tsx';
import { Timer } from './components/Timer.tsx';

export function App() {
  const { time, weather, weatherError, weatherLoading } = useWeather();

  if (weatherLoading) {
    return <p>"情報取得中"</p>;
  } else if (weatherError) {
    return <p>"情報取得失敗"</p>;
  } else if (!weather) {
    return;
  } else {
    return (
      <>
        <Timer time={time} />
        <Weather weather={weather} />
      </>
    );
  }
}
