import Todos from "@/components/Todos";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between w-full ">
    <h2 className="font-semibold text-2xl mt-20">THE MAIN HEADING</h2>
    <Todos />
      </main>
  );
}
