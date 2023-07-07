interface IButton {
  children?: React.ReactNode;
}

export default function Button({ children }: IButton) {
  return <button className="mt-2">{children}</button>;
}
