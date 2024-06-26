import { getServerSideCommonProps } from "@/libs/get-server-side-props";
import { Button } from "@yamada-ui/react";

export default function Home() {
  return (
    <div className="text-center">
      <Button>Click me!</Button>
    </div>
  );
}

export const getServerSideProps = getServerSideCommonProps
