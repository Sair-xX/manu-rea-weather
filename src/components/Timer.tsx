//データ型とか使うんだったら追記

interface Props {
  time: Date;
}

export function Timer({ time }: Props) {
  return (
    <>
      <p>{`${String(time.getHours()).padStart(2, '0')}:${String(
        time.getMinutes()
      ).padStart(2, '0')}`}</p>
    </>
  );
}
