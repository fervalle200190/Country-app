import { NextPage } from "next";
import Link from "next/link";

interface Props {
  name: string;
}

export const BorderButton: NextPage<Props> = ({ name }) => {
  return (
    <Link href={`/country/${name}`}>
      <button>{name}</button>
    </Link>
  );
};
