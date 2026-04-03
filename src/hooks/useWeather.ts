//ここにあとから固定値や型を収集する
import { useState, useRef, useEffect } from 'react';
//天気の戻り値のデータ型が必要
import type { CurrentWeather } from '../types.ts';
//APIキーを固定値としてconstants.tsから持ってくる必要があるなって感じた。
import { WEATHER_API } from '../constants.ts';

export function useWeather() {
  const [time, setTime] = useState<Date>(new Date());
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);

  //まずはAPIを叩かないと何も恥まらない
  //ここでAPIを叩くために固定値が必要だとわかった
  useEffect(() => {
    setWeatherLoading(true);

    fetch(WEATHER_API)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setWeather(json.current_weather);
      })
      .catch((e) => {
        setWeatherError('データの取得に失敗しました');
      })
      .finally(() => {
        setWeatherLoading(false);
      });
  }, []);
  //タイマーも動かさないとね
  //まずタイマーといえばsetIntervalで、このIDを含めたuseRefが必要
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(
    () => {
      //この{}に中にsetIntervalも、returnも書く
      intervalRef.current = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => {
        clearInterval(intervalRef.current);
      };
      //returnここまで
    },
    //{}の後ろに依存配列を入れる
    []
  );

  return { time, weather, weatherError, weatherLoading };
}
//バックヤードで行う処理は基本returnに含めない
//でもバックヤードで行う処理のうち、コンポーネントが初めて表示されたときに発火
//かつ、コンポーネントがファーストビューじゃないときはreturnするっていう感じで行う
